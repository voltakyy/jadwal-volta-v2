import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import { dirname } from 'node:path';

const SITE = process.env.HEARTBEAT_URL ?? 'https://voltakyy.github.io/jadwal-volta-v2/';
const OUT = 'status/heartbeat.json';
const README = 'status/README.md';
const KEEP = 30;
const TIMEOUT_MS = 20000;

async function readExisting() {
  try {
    const parsed = JSON.parse(await readFile(OUT, 'utf8'));
    return Array.isArray(parsed.checks) ? parsed.checks : [];
  } catch {
    return [];
  }
}

const started = performance.now();
let httpStatus = 0;
let title = '';
let bytes = 0;
let error = null;

try {
  const url = new URL(SITE);
  url.searchParams.set('heartbeat', String(Date.now()));
  const res = await fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: {
      'user-agent': 'jadwal-volta-heartbeat/1.0',
      'cache-control': 'no-cache',
    },
  });
  httpStatus = res.status;
  const body = await res.text();
  bytes = Buffer.byteLength(body);
  const match = body.match(/<title>([^<]*)<\/title>/i);
  title = match ? match[1].trim() : '';
} catch (err) {
  error = err instanceof Error ? err.message : String(err);
}

const responseMs = Math.round(performance.now() - started);
const ok = httpStatus === 200 && /Jadwal Kuliah/i.test(title);

function currentCommit() {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA.slice(0, 7);
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

const entry = {
  checked_at: new Date().toISOString(),
  ok,
  http_status: httpStatus,
  response_ms: responseMs,
  content_bytes: bytes,
  title,
  commit: currentCommit(),
  run_id: process.env.GITHUB_RUN_ID ?? null,
  ...(error ? { error } : {}),
};

const checks = [...(await readExisting()), entry].slice(-KEEP);
const payload = {
  site: SITE,
  updated_at: entry.checked_at,
  retention: KEEP,
  checks,
};

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(payload, null, 2) + '\n', 'utf8');

const rows = checks
  .slice(-10)
  .reverse()
  .map((check) => {
    const when = check.checked_at.replace('T', ' ').replace(/\.\d+Z$/, ' UTC');
    const status = check.ok ? 'ok' : 'gagal';
    const checkTitle = (check.title || '-').replace(/\|/g, '\\|');
    return `| ${when} | ${check.http_status || '-'} | ${check.response_ms} ms | ${checkTitle} | ${status} |`;
  });

const markdown = `# Status deploy

Dicek otomatis setiap hari oleh workflow \`.github/workflows/heartbeat.yml\`.

- Situs: ${SITE}
- Pengecekan terakhir: ${entry.checked_at}
- Hasil: ${ok ? 'sehat' : 'gagal'}

| Dicek (UTC) | HTTP | Respons | Judul | Status |
| --- | --- | --- | --- | --- |
${rows.join('\n')}

Riwayat lengkap (maksimal ${KEEP} entri): [\`heartbeat.json\`](./heartbeat.json).
`;

await writeFile(README, markdown, 'utf8');

console.log(`${ok ? 'OK' : 'GAGAL'} ${httpStatus} ${responseMs}ms ${title}`);
