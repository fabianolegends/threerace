import { randomUUID } from "node:crypto";
import {
  chmodSync,
  closeSync,
  constants,
  existsSync,
  lstatSync,
  mkdirSync,
  openSync,
} from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import type { PriorityRegistration } from "./priority-list-schema";

const EVENT_ID = "threerace-brasil-2027";

export class PriorityStorageError extends Error {
  readonly code: "NOT_CONFIGURED" | "UNSUPPORTED_HOST" | "UNAVAILABLE";

  constructor(code: PriorityStorageError["code"]) {
    super("O armazenamento da lista prioritária está indisponível.");
    this.name = "PriorityStorageError";
    this.code = code;
  }
}

export type PriorityRegistrationRecord = Omit<PriorityRegistration, "consent"> & {
  id: string;
  eventId: string;
  submittedAt: string;
  consent: number;
  consentVersion: string;
};

/** No default path: a temporary/serverless filesystem cannot retain registrations. */
export function resolvePriorityDbPath(env: NodeJS.ProcessEnv = process.env): string {
  if (env.VERCEL) throw new PriorityStorageError("UNSUPPORTED_HOST");
  const configured = env.THREERACE_PRIORITY_DB_PATH?.trim();
  if (!configured || !isAbsolute(configured)) {
    throw new PriorityStorageError("NOT_CONFIGURED");
  }
  const path = resolve(configured);
  if (
    env.NODE_ENV !== "test" &&
    (/^\/(?:private\/)?(?:tmp|var\/tmp)(?:\/|$)/.test(path) ||
      /^\/(?:private\/)?var\/folders\//.test(path))
  ) {
    throw new PriorityStorageError("NOT_CONFIGURED");
  }
  return path;
}

function preparePrivateFile(path: string): void {
  const directory = dirname(path);
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  const directoryInfo = lstatSync(directory);
  if (!directoryInfo.isDirectory() || directoryInfo.isSymbolicLink()) {
    throw new PriorityStorageError("UNAVAILABLE");
  }
  chmodSync(directory, 0o700);
  const descriptor = openSync(
    path,
    constants.O_CREAT | constants.O_RDWR | constants.O_NOFOLLOW,
    0o600,
  );
  closeSync(descriptor);
  enforceFilePermissions(path);
}

function enforceFilePermissions(path: string): void {
  for (const file of [path, `${path}-wal`, `${path}-shm`, `${path}-journal`]) {
    if (!existsSync(file)) continue;
    const info = lstatSync(file);
    if (!info.isFile() || info.isSymbolicLink()) {
      throw new PriorityStorageError("UNAVAILABLE");
    }
    chmodSync(file, 0o600);
  }
}

function openWritableDatabase(path: string): DatabaseSync {
  preparePrivateFile(path);
  const database = new DatabaseSync(path);
  try {
    database.exec(`
      PRAGMA busy_timeout = 5000;
      PRAGMA journal_mode = WAL;
      PRAGMA synchronous = FULL;
      CREATE TABLE IF NOT EXISTS priority_registrations (
        id TEXT PRIMARY KEY NOT NULL,
        event_id TEXT NOT NULL,
        submitted_at TEXT NOT NULL,
        full_name TEXT NOT NULL,
        email TEXT COLLATE NOCASE NOT NULL,
        phone TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        modality TEXT NOT NULL CHECK (modality IN ('ultra', 'sport')),
        category TEXT NOT NULL,
        consent INTEGER NOT NULL CHECK (consent = 1),
        consent_version TEXT NOT NULL,
        UNIQUE (event_id, email)
      ) STRICT;
    `);
    enforceFilePermissions(path);
    return database;
  } catch (error) {
    database.close();
    throw error;
  }
}

/** Resolves only after COMMIT; repeated emails never overwrite an existing athlete. */
export function storePriorityRegistration(
  registration: PriorityRegistration,
  consentVersion: string,
): void {
  const path = resolvePriorityDbPath();
  let database: DatabaseSync | undefined;
  let transactionOpen = false;
  try {
    database = openWritableDatabase(path);
    database.exec("BEGIN IMMEDIATE");
    transactionOpen = true;
    database.prepare(`
      INSERT INTO priority_registrations (
        id, event_id, submitted_at, full_name, email, phone, city, state,
        modality, category, consent, consent_version
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(event_id, email) DO NOTHING
    `).run(
      randomUUID(),
      EVENT_ID,
      new Date().toISOString(),
      registration.fullName,
      registration.email.trim().toLowerCase(),
      registration.phone,
      registration.city,
      registration.state,
      registration.modality,
      registration.category,
      registration.consent === true ? 1 : 0,
      consentVersion,
    );
    enforceFilePermissions(path);
    database.exec("COMMIT");
    transactionOpen = false;
  } catch {
    if (database && transactionOpen) {
      try { database.exec("ROLLBACK"); } catch { /* Preserve the original failure. */ }
    }
    throw new PriorityStorageError("UNAVAILABLE");
  } finally {
    database?.close();
  }
}

/** Organizer CLI only. Never expose this through an unauthenticated HTTP route. */
export function readPriorityRegistrations(): PriorityRegistrationRecord[] {
  const path = resolvePriorityDbPath();
  let database: DatabaseSync | undefined;
  try {
    const info = lstatSync(path);
    if (!info.isFile() || info.isSymbolicLink()) {
      throw new PriorityStorageError("UNAVAILABLE");
    }
    database = new DatabaseSync(path, { readOnly: true });
    database.exec("PRAGMA busy_timeout = 5000");
    return database.prepare(`
      SELECT id, event_id AS eventId, submitted_at AS submittedAt,
        full_name AS fullName, email, phone, city, state, modality, category,
        consent, consent_version AS consentVersion
      FROM priority_registrations WHERE event_id = ? ORDER BY submitted_at, id
    `).all(EVENT_ID) as PriorityRegistrationRecord[];
  } catch {
    throw new PriorityStorageError("UNAVAILABLE");
  } finally {
    database?.close();
  }
}
