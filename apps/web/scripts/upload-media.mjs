// Uploads a folder of media to the R2 bucket, keeping the folder structure as
// the object keys (media/images/a.jpg -> images/a.jpg in the bucket).
//
//   node scripts/upload-media.mjs [folder]      default folder: ./media
//
// Reads the bucket details from the repo's git-ignored .env.local:
//   R2_BUCKET_NAME, R2_S3_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY
// No dependencies: requests are signed here with AWS Signature V4, which is
// what R2's S3-compatible API expects.
import { createHash, createHmac } from 'node:crypto';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const envFile = [resolve(here, '../../../.env.local'), resolve(here, '../.env.local')].find(existsSync);
if (!envFile) throw new Error('No .env.local found (looked in the repo root and apps/web).');
const env = Object.fromEntries(
  readFileSync(envFile, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.match(/^([A-Z0-9_]+)=(.*)$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].trim()]),
);
for (const key of ['R2_BUCKET_NAME', 'R2_S3_ENDPOINT', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY']) {
  if (!env[key]) throw new Error(`${key} is missing from ${envFile}`);
}

const types = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif',
  '.svg': 'image/svg+xml', '.gif': 'image/gif', '.mp4': 'video/mp4', '.webm': 'video/webm', '.pdf': 'application/pdf',
};
// Filenames are not fingerprinted, so a replaced photo must show up within a
// reasonable time: a week in the browser, revalidated in the background.
const cacheControl = 'public, max-age=604800, stale-while-revalidate=2592000';

const sha256 = (data) => createHash('sha256').update(data).digest('hex');
const hmac = (key, data) => createHmac('sha256', key).update(data).digest();
const encodeKey = (key) => key.split('/').map(encodeURIComponent).join('/');

async function put(key, body, contentType) {
  const endpoint = new URL(env.R2_S3_ENDPOINT);
  const path = `/${env.R2_BUCKET_NAME}/${encodeKey(key)}`;
  const now = new Date().toISOString().replace(/[:-]|\.\d{3}/g, ''); // 20261008T101500Z
  const date = now.slice(0, 8);
  const payloadHash = sha256(body);
  const headers = {
    'cache-control': cacheControl,
    'content-type': contentType,
    host: endpoint.host,
    'x-amz-content-sha256': payloadHash,
    'x-amz-date': now,
  };
  const signedHeaders = Object.keys(headers).sort().join(';');
  const canonical = ['PUT', path, '', ...Object.keys(headers).sort().map((h) => `${h}:${headers[h]}`), '', signedHeaders, payloadHash].join('\n');
  const scope = `${date}/auto/s3/aws4_request`;
  const toSign = ['AWS4-HMAC-SHA256', now, scope, sha256(canonical)].join('\n');
  const signingKey = hmac(hmac(hmac(hmac(`AWS4${env.R2_SECRET_ACCESS_KEY}`, date), 'auto'), 's3'), 'aws4_request');
  const signature = createHmac('sha256', signingKey).update(toSign).digest('hex');
  const response = await fetch(`${endpoint.origin}${path}`, {
    method: 'PUT',
    headers: { ...headers, authorization: `AWS4-HMAC-SHA256 Credential=${env.R2_ACCESS_KEY_ID}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}` },
    body,
  });
  if (!response.ok) throw new Error(`${key}: ${response.status} ${(await response.text()).slice(0, 200)}`);
}

const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const full = join(dir, name);
  return statSync(full).isDirectory() ? walk(full) : [full];
});

const folder = resolve(process.argv[2] ?? 'media');
if (!existsSync(folder)) throw new Error(`Folder not found: ${folder}`);
const files = walk(folder).filter((file) => types[extname(file).toLowerCase()]);

let bytes = 0;
for (const file of files) {
  const key = relative(folder, file).split('\\').join('/');
  const body = readFileSync(file);
  await put(key, body, types[extname(file).toLowerCase()]);
  bytes += body.length;
  console.log(`uploaded ${key}`);
}
console.log(`\n${files.length} files, ${(bytes / 1024 / 1024).toFixed(1)} MB -> bucket "${env.R2_BUCKET_NAME}"`);
