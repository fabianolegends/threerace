import type { PriorityRegistration } from "./priority-list-schema";

const EVENT_ID = "threerace-brasil-2027";

type NeonSql = (strings: TemplateStringsArray, ...values: unknown[]) => Promise<unknown[]>;

export class PriorityStorageError extends Error {
  readonly code: "NOT_CONFIGURED" | "UNAVAILABLE";

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

let cachedSql: NeonSql | null = null;
let schemaReady: Promise<void> | null = null;

async function getSql(): Promise<NeonSql> {
  if (cachedSql) return cachedSql;
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) throw new PriorityStorageError("NOT_CONFIGURED");
  try {
    const { neon } = await import("@neondatabase/serverless");
    cachedSql = neon(connectionString) as NeonSql;
    return cachedSql;
  } catch {
    throw new PriorityStorageError("UNAVAILABLE");
  }
}

async function ensureSchema(sql: NeonSql): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS priority_registrations (
          id UUID PRIMARY KEY,
          event_id TEXT NOT NULL,
          submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          full_name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          city TEXT NOT NULL,
          state TEXT NOT NULL,
          modality TEXT NOT NULL CHECK (modality IN ('ultra', 'sport')),
          category TEXT NOT NULL,
          consent BOOLEAN NOT NULL CHECK (consent = TRUE),
          consent_version TEXT NOT NULL
        )
      `;
      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS priority_registrations_event_email_idx
        ON priority_registrations (event_id, lower(email))
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS priority_registrations_event_submitted_idx
        ON priority_registrations (event_id, submitted_at)
      `;
    })().catch((error) => {
      schemaReady = null;
      throw error;
    });
  }
  await schemaReady;
}

/** Resolves only after the database confirms the insert. Repeated emails never overwrite an existing athlete. */
export async function storePriorityRegistration(
  registration: PriorityRegistration,
  consentVersion: string,
): Promise<void> {
  try {
    const sql = await getSql();
    await ensureSchema(sql);
    await sql`
      INSERT INTO priority_registrations (
        id, event_id, full_name, email, phone, city, state,
        modality, category, consent, consent_version
      ) VALUES (
        gen_random_uuid(), ${EVENT_ID}, ${registration.fullName},
        ${registration.email.trim().toLowerCase()}, ${registration.phone}, ${registration.city},
        ${registration.state}, ${registration.modality}, ${registration.category},
        ${registration.consent === true}, ${consentVersion}
      )
      ON CONFLICT (event_id, lower(email)) DO NOTHING
    `;
  } catch (error) {
    if (error instanceof PriorityStorageError) throw error;
    throw new PriorityStorageError("UNAVAILABLE");
  }
}

/** Organizer CLI only. Never expose this through an unauthenticated HTTP route. */
export async function readPriorityRegistrations(): Promise<PriorityRegistrationRecord[]> {
  try {
    const sql = await getSql();
    await ensureSchema(sql);
    const rows = await sql`
      SELECT id::text, event_id AS "eventId", submitted_at AS "submittedAt",
        full_name AS "fullName", email, phone, city, state, modality, category,
        CASE WHEN consent THEN 1 ELSE 0 END AS consent,
        consent_version AS "consentVersion"
      FROM priority_registrations
      WHERE event_id = ${EVENT_ID}
      ORDER BY submitted_at, id
    `;
    return rows as PriorityRegistrationRecord[];
  } catch (error) {
    if (error instanceof PriorityStorageError) throw error;
    throw new PriorityStorageError("UNAVAILABLE");
  }
}
