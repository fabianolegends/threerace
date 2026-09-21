import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { registerHooks } from "node:module";
import { DatabaseSync } from "node:sqlite";
import { after, before, test } from "node:test";
import {
  PriorityStorageError,
  readPriorityRegistrations,
  resolvePriorityDbPath,
  storePriorityRegistration,
} from "../lib/priority-list-store.ts";
import { exportPriorityList, priorityRegistrationsCsv } from "../scripts/export-priority-list.ts";

const originalEnv = { ...process.env };
const directory = mkdtempSync(join(tmpdir(), "tr3-priority-tests-"));
const databasePath = join(directory, "private", "priority.sqlite");
const consentVersion = "test-consent-v1";
const registration = {
  fullName: "Pessoa de Teste",
  email: "pessoa@example.test",
  phone: "+5554999999999",
  city: "São Francisco de Paula",
  state: "RS",
  modality: "ultra" as const,
  category: "ultra.solo-masculino.sub-23",
  consent: true as const,
};

// Resolve the app's bundler aliases only for the directly tested Route Handler.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "@/lib/priority-list-schema" || specifier === "@/lib/priority-list-store") {
      return nextResolve(new URL(`../${specifier.slice(2)}.ts`, import.meta.url).href, context);
    }
    if (specifier === "../app/threerace-brasil/content") {
      return nextResolve(new URL("../app/threerace-brasil/content.ts", import.meta.url).href, context);
    }
    return nextResolve(specifier, context);
  },
});
const { POST } = await import("../app/api/brasil/priority-list/route.ts");

function apiRequest(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request("http://127.0.0.1:3001/api/brasil/priority-list", {
    method: "POST",
    headers: { origin: "http://127.0.0.1:3001", "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

before(() => {
  process.env.NODE_ENV = "test";
  process.env.THREERACE_PRIORITY_DB_PATH = databasePath;
  delete process.env.VERCEL;
  delete process.env.THREERACE_PRIORITY_ORIGIN;
});
after(() => {
  process.env = originalEnv;
  rmSync(directory, { recursive: true, force: true });
});

function isolatedWrite(value: typeof registration): Promise<void> {
  const storeUrl = new URL("../lib/priority-list-store.ts", import.meta.url).href;
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["--no-warnings", "--input-type=module", "-e",
      `import {storePriorityRegistration} from ${JSON.stringify(storeUrl)};storePriorityRegistration(JSON.parse(process.env.TEST_REGISTRATION), ${JSON.stringify(consentVersion)});`,
    ], { env: { ...process.env, TEST_REGISTRATION: JSON.stringify(value) }, stdio: ["ignore", "ignore", "pipe"] });
    let errors = "";
    child.stderr.on("data", chunk => { errors += chunk; });
    child.on("error", reject);
    child.on("close", code => code === 0 ? resolve() : reject(new Error(errors)));
  });
}

test("requires an explicit persistent database and rejects serverless/temporary production storage", () => {
  assert.throws(() => resolvePriorityDbPath({}), PriorityStorageError);
  assert.throws(() => resolvePriorityDbPath({ THREERACE_PRIORITY_DB_PATH: "relative.sqlite" }), PriorityStorageError);
  assert.throws(() => resolvePriorityDbPath({ THREERACE_PRIORITY_DB_PATH: databasePath, VERCEL: "1" }), PriorityStorageError);
  assert.throws(() => resolvePriorityDbPath({ THREERACE_PRIORITY_DB_PATH: "/tmp/priority.sqlite", NODE_ENV: "production" }), PriorityStorageError);
});

test("persists consent and identity across an independent process and reopened connection", async () => {
  await isolatedWrite(registration);
  const [stored] = readPriorityRegistrations();
  assert.equal(stored.fullName, registration.fullName);
  assert.equal(stored.email, registration.email);
  assert.equal(stored.consent, 1);
  assert.equal(stored.consentVersion, consentVersion);
  assert.equal(stored.eventId, "threerace-brasil-2027");
  assert.match(stored.id, /^[a-f0-9-]{36}$/);
  assert.ok(!Number.isNaN(Date.parse(stored.submittedAt)));
  assert.equal(statSync(databasePath).mode & 0o777, 0o600);
  assert.equal(statSync(join(directory, "private")).mode & 0o777, 0o700);
});

test("concurrent writers retain unique participants and duplicates cannot overwrite stored data", async () => {
  await Promise.all([
    ...Array.from({ length: 4 }, (_, index) => isolatedWrite({ ...registration, email: `concurrent-${index}@example.test` })),
    ...Array.from({ length: 4 }, () => isolatedWrite({ ...registration, email: " PESSOA@EXAMPLE.TEST ", fullName: "Nome que não deve substituir" })),
  ]);
  const records = readPriorityRegistrations();
  assert.equal(records.length, 5);
  assert.equal(records.find(row => row.email === registration.email)?.fullName, registration.fullName);
});

test("write failure is reported and cannot claim persistence", () => {
  const blockedPath = join(directory, "not-a-directory");
  writeFileSync(blockedPath, "blocked");
  process.env.THREERACE_PRIORITY_DB_PATH = join(blockedPath, "priority.sqlite");
  try {
    assert.throws(() => storePriorityRegistration(registration, consentVersion), PriorityStorageError);
  } finally {
    process.env.THREERACE_PRIORITY_DB_PATH = databasePath;
  }
});

test("failed transaction rolls back without losing prior records", () => {
  const database = new DatabaseSync(databasePath);
  database.exec("CREATE TRIGGER reject_test BEFORE INSERT ON priority_registrations BEGIN SELECT RAISE(ABORT, 'test failure'); END");
  database.close();
  try {
    assert.throws(() => storePriorityRegistration({ ...registration, email: "failure@example.test" }, consentVersion), PriorityStorageError);
    assert.equal(readPriorityRegistrations().length, 5);
  } finally {
    const cleanup = new DatabaseSync(databasePath);
    cleanup.exec("DROP TRIGGER reject_test");
    cleanup.close();
  }
});

test("CSV preserves accents/quoting and neutralizes formula injection", () => {
  const [record] = readPriorityRegistrations();
  const csv = priorityRegistrationsCsv([{ ...record, fullName: '=HYPERLINK("https://example.test")', city: 'São; "Francisco"\nPaula' }]);
  assert.ok(csv.startsWith("\uFEFF"));
  assert.ok(csv.includes(`"'=HYPERLINK(""https://example.test"")"`));
  assert.ok(csv.includes(`"'${registration.phone}"`));
  assert.ok(csv.includes('"São; ""Francisco""\nPaula"'));
  assert.ok(csv.endsWith("\r\n"));
});

test("organizer export is private, contains all saved records, and refuses to overwrite", () => {
  const output = join(directory, "list.csv");
  assert.equal(exportPriorityList(output), 5);
  assert.equal(statSync(output).mode & 0o777, 0o600);
  assert.match(readFileSync(output, "utf8"), /pessoa@example\.test/);
  assert.throws(() => exportPriorityList(output));
});

test("API validates request origin, content type, size and fields before storage", async () => {
  assert.equal((await POST(apiRequest(registration, { origin: "https://other.example.test" }))).status, 403);
  assert.equal((await POST(apiRequest(registration, { origin: "" }))).status, 403);
  assert.equal((await POST(apiRequest(registration, { "content-type": "text/plain" }))).status, 415);
  assert.equal((await POST(apiRequest(registration, { "content-length": "20000" }))).status, 413);
  assert.equal((await POST(apiRequest({ ignored: "x".repeat(17000) }))).status, 413);
  const invalid = await POST(apiRequest({ ...registration, email: "invalid", consent: false, category: "not-a-category" }));
  assert.equal(invalid.status, 400);
  const payload = await invalid.json();
  assert.ok(payload.errors.email);
  assert.ok(payload.errors.category);
  assert.ok(payload.errors.consent);
  assert.equal(readPriorityRegistrations().length, 5);
});

test("API acknowledges committed writes without exposing PII or duplicate status", async () => {
  const input = { ...registration, email: "api@example.test" };
  const initial = await POST(apiRequest(input));
  const repeat = await POST(apiRequest({ ...input, fullName: "Outro Nome" }));
  assert.equal(initial.status, 200);
  assert.equal(repeat.status, 200);
  assert.equal(initial.headers.get("cache-control"), "no-store");
  const firstPayload = await initial.json();
  assert.deepEqual(firstPayload, await repeat.json());
  assert.deepEqual(Object.keys(firstPayload).sort(), ["message", "ok"]);
  assert.equal(firstPayload.ok, true);
  assert.equal(readPriorityRegistrations().find(row => row.email === input.email)?.fullName, registration.fullName);
});

test("API fails closed if persistence is unconfigured instead of returning a false success", async () => {
  delete process.env.THREERACE_PRIORITY_DB_PATH;
  try {
    const response = await POST(apiRequest({ ...registration, email: "not-saved@example.test" }));
    assert.equal(response.status, 503);
    assert.equal((await response.json()).ok, false);
  } finally {
    process.env.THREERACE_PRIORITY_DB_PATH = databasePath;
  }
  assert.ok(!readPriorityRegistrations().some(row => row.email === "not-saved@example.test"));
});

test("configured public origin supports internal localhost URLs without trusting forwarded hosts", async () => {
  process.env.THREERACE_PRIORITY_ORIGIN = "http://127.0.0.1:3001";
  const internalRequest = (origin: string, extraHeaders: Record<string, string> = {}) => new Request(
    "http://localhost:3001/api/brasil/priority-list",
    {
      method: "POST",
      headers: { "content-type": "application/json", origin, ...extraHeaders },
      body: JSON.stringify({ ...registration, email: "configured-origin@example.test" }),
    },
  );
  try {
    assert.equal((await POST(internalRequest("http://127.0.0.1:3001"))).status, 200);
    assert.equal((await POST(internalRequest("https://evil.example.test", {
      host: "evil.example.test", "x-forwarded-host": "evil.example.test", "x-forwarded-proto": "https",
    }))).status, 403);
    assert.equal((await POST(internalRequest("http://127.0.0.1:3001", { "sec-fetch-site": "cross-site" }))).status, 403);
    assert.equal((await POST(internalRequest("http://127.0.0.1:3002"))).status, 403);
    assert.equal((await POST(internalRequest(""))).status, 403);
    process.env.THREERACE_PRIORITY_ORIGIN = "http://127.0.0.1:3001/unexpected-path";
    assert.equal((await POST(internalRequest("http://127.0.0.1:3001"))).status, 503);
    process.env.THREERACE_PRIORITY_ORIGIN = "";
    assert.equal((await POST(internalRequest("http://127.0.0.1:3001"))).status, 503);
  } finally {
    delete process.env.THREERACE_PRIORITY_ORIGIN;
  }
  assert.equal((await POST(internalRequest("http://127.0.0.1:3001"))).status, 403);
});
