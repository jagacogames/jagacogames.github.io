#!/usr/bin/env node
/**
 * Fetches sitemap.xml from a locally running site, runs Lighthouse on each URL,
 * and exits after the first page whose scores fall below the threshold.
 *
 * Usage:
 *   node lighthouse-scan.js [options]
 *
 * Options:
 *   --url <base>          Base URL of the local server   (default: http://localhost:3000)
 *   --threshold <n>       Minimum acceptable score 0-100 (default: 90)
 *   --categories <list>   Comma-separated Lighthouse categories
 *                         (default: performance,accessibility,best-practices,seo)
 *   --skip <patterns>     Comma-separated URL substrings to skip
 *   --concurrency <n>     Number of parallel Lighthouse runs (default: min(cpus, 4))
 *   --memory <path>       Path to cache file (default: <script-dir>/lighthouse-memory.md)
 *   --no-cache            Ignore cache and audit all pages
 */

const { execSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const http  = require('http');
const https = require('https');
const os = require('os');
const path = require('path');

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);

function getArg(name, defaultValue) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : defaultValue;
}

const BASE_URL    = getArg('url',        'http://localhost:3000');
const THRESHOLD   = parseInt(getArg('threshold', '90'), 10);
const CATEGORIES  = getArg('categories', 'performance,accessibility,best-practices,seo').split(',');
const SKIP        = getArg('skip', '').split(',').filter(Boolean);
const CONCURRENCY = parseInt(getArg('concurrency', String(Math.min(os.cpus().length, 8))), 10);
const MEMORY_PATH = getArg('memory', path.join(__dirname, 'lighthouse-memory.md'));
const NO_CACHE    = args.includes('--no-cache');
const MAX_RETRIES = 3;
const RETRY_DELAYS_MS = [1500, 4000];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function fetchText(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseSitemapUrls(xml) {
  const urls = [];
  const re = /<loc>([\s\S]*?)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) urls.push(m[1].trim());
  return urls;
}

function rebaseUrl(pageUrl, baseUrl) {
  try {
    const base   = new URL(baseUrl);
    const parsed = new URL(pageUrl);
    parsed.protocol = base.protocol;
    parsed.host     = base.host;
    return parsed.toString();
  } catch {
    return pageUrl;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeOutputText(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (Buffer.isBuffer(value)) return value.toString('utf8');
  return String(value);
}

function isTransientLighthouseError(message) {
  return /EPERM|Permission denied|chrome could not be killed|Target closed|ECONNREFUSED|socket hang up/i.test(message);
}

function isKnownCleanupError(message) {
  return /EPERM|Permission denied/i.test(message) && /lighthouse\.[^\\\s'"/]+/i.test(message);
}

function parseLighthouseReport(output) {
  const trimmed = output.trim();
  if (!trimmed) {
    throw new Error('Lighthouse produced no JSON output.');
  }

  const jsonStart = trimmed.indexOf('{');
  if (jsonStart === -1) {
    throw new Error('Lighthouse output did not contain JSON.');
  }

  return JSON.parse(trimmed.slice(jsonStart));
}

function createAttemptTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'lighthouse-scan-'));
}

function readReportFile(outputPath) {
  if (!fs.existsSync(outputPath)) return '';
  return fs.readFileSync(outputPath, 'utf8');
}

function cleanupAttemptTempDir(tempDir) {
  try {
    fs.rmSync(tempDir, { recursive: true, force: true, maxRetries: 5 });
  } catch {
    // Best effort only. A stale wrapper temp dir is preferable to failing the audit.
  }
}

// ---------------------------------------------------------------------------
// Cache (lighthouse-memory.md)
// ---------------------------------------------------------------------------
// Key is URL pathname so the cache survives base URL changes (localhost port, etc.)
function urlToKey(url) {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

function loadMemory() {
  if (NO_CACHE || !fs.existsSync(MEMORY_PATH)) return {};
  const content = fs.readFileSync(MEMORY_PATH, 'utf8');
  const memory = {};
  // Lines: - /path | <sha256> | pass | 2026-05-13
  const re = /^- (.+?) \| ([a-f0-9]{64}) \| (pass|fail) \| (\S+)$/gm;
  let m;
  while ((m = re.exec(content)) !== null) {
    memory[m[1]] = { checksum: m[2], passed: m[3] === 'pass', date: m[4] };
  }
  return memory;
}

function saveMemory(memory) {
  const today = new Date().toISOString().slice(0, 10);
  const lines = [
    '# Lighthouse Memory',
    '<!-- Auto-generated by lighthouse-scan.js — do not edit manually -->',
    '',
  ];
  for (const [key, entry] of Object.entries(memory)) {
    lines.push(`- ${key} | ${entry.checksum} | ${entry.passed ? 'pass' : 'fail'} | ${entry.date || today}`);
  }
  lines.push('');
  fs.writeFileSync(MEMORY_PATH, lines.join('\n'), 'utf8');
}

async function computeChecksum(url) {
  const html = await fetchText(url);
  return crypto.createHash('sha256').update(html).digest('hex');
}

// ---------------------------------------------------------------------------
// Lighthouse runner
// ---------------------------------------------------------------------------
async function runLighthouse(url) {
  const chromeFlags = '"--headless --no-sandbox --disable-gpu"';
  const cats        = CATEGORIES.join(',');

  let lastError;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    const tempDir = createAttemptTempDir();
    const outputPath = path.join(tempDir, 'report.json');
    const cmd = `lighthouse "${url}" --output=json --output-path="${outputPath}" --quiet --only-categories=${cats} --chrome-flags=${chromeFlags}`;
    let stdout = '';
    let stderr = '';

    try {
      try {
        stdout = execSync(cmd, { encoding: 'utf8', timeout: 120_000, stdio: ['pipe', 'pipe', 'pipe'] });
      } catch (e) {
        // Lighthouse exits non-zero on low scores but may still have written a valid JSON report.
        stdout = normalizeOutputText(e.stdout);
        stderr = normalizeOutputText(e.stderr);
        const errorText = [e.message, stderr].filter(Boolean).join('\n');
        const fileOutput = readReportFile(outputPath);

        if (fileOutput || stdout) {
          try {
            return parseLighthouseReport(fileOutput || stdout);
          } catch (parseError) {
            lastError = new Error(`Lighthouse returned invalid JSON for ${url}: ${parseError.message}`);
          }
        } else {
          lastError = new Error(`Lighthouse failed for ${url}: ${errorText || 'Unknown error'}`);
        }

        const shouldRetry = attempt < MAX_RETRIES && isTransientLighthouseError(errorText);
        if (!shouldRetry) {
          if (isKnownCleanupError(errorText)) {
            throw new Error(`Lighthouse hit a Windows temp cleanup failure for ${url}. Re-run usually succeeds, but this script exhausted its retries. Details: ${errorText}`);
          }

          throw lastError;
        }

        const delayMs = RETRY_DELAYS_MS[Math.min(attempt - 1, RETRY_DELAYS_MS.length - 1)];
        process.stdout.write(`retry ${attempt}/${MAX_RETRIES - 1} after transient launcher error … `);
        await sleep(delayMs);
        continue;
      }

      return parseLighthouseReport(readReportFile(outputPath) || stdout);
    } finally {
      cleanupAttemptTempDir(tempDir);
    }
  }

  throw lastError || new Error(`Lighthouse failed for ${url}.`);
}

// ---------------------------------------------------------------------------
// Report builder
// ---------------------------------------------------------------------------
function buildFailureReport(url, report) {
  const lines = [`\n${'='.repeat(72)}`, `FAIL  ${url}`, `${'='.repeat(72)}`];

  // Category scores
  lines.push('\nCategory scores:');
  for (const [id, cat] of Object.entries(report.categories)) {
    const score = Math.round((cat.score ?? 0) * 100);
    const mark  = score < THRESHOLD ? '✗' : '✓';
    lines.push(`  ${mark} ${cat.title.padEnd(24)} ${score}`);
  }

  // Failed audits per category (score < 1, informational excluded)
  for (const [catId, cat] of Object.entries(report.categories)) {
    const catScore = Math.round((cat.score ?? 0) * 100);
    if (catScore >= THRESHOLD) continue;

    const failedAuditIds = (cat.auditRefs || [])
      .filter((ref) => {
        const a = report.audits[ref.id];
        return a && a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'informative' && a.scoreDisplayMode !== 'not-applicable';
      })
      .sort((a, b) => {
        // Sort by weight desc, then score asc
        const wa = a.weight ?? 0;
        const wb = b.weight ?? 0;
        if (wb !== wa) return wb - wa;
        return (report.audits[a.id].score ?? 0) - (report.audits[b.id].score ?? 0);
      });

    if (failedAuditIds.length === 0) continue;

    lines.push(`\nFailing audits in [${cat.title}]:`);
    for (const ref of failedAuditIds) {
      const audit = report.audits[ref.id];
      const score = audit.score !== null ? `score=${Math.round(audit.score * 100)}` : 'n/a';
      lines.push(`\n  • ${audit.title} (${score})`);
      if (audit.description) {
        // Trim markdown links for readability
        const desc = audit.description.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').slice(0, 200);
        lines.push(`    ${desc}`);
      }
      // Show top offending items
      const items = audit.details?.items;
      if (Array.isArray(items) && items.length > 0) {
        const sample = items.slice(0, 5);
        for (const item of sample) {
          const label = item.url || item.node?.nodeLabel || item.label || item.description || JSON.stringify(item).slice(0, 120);
          if (label) lines.push(`    - ${label}`);
        }
        if (items.length > 5) lines.push(`    … and ${items.length - 5} more`);
      }
    }
  }

  lines.push('');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  // 1. Fetch sitemap
  const sitemapUrl = `${BASE_URL.replace(/\/$/, '')}/sitemap.xml`;
  console.log(`Fetching sitemap: ${sitemapUrl}`);

  let xml;
  try {
    xml = await fetchText(sitemapUrl);
  } catch (e) {
    console.error(`ERROR: Could not fetch sitemap — ${e.message}`);
    console.error('Is the local dev server running?');
    process.exit(2);
  }

  let urls = parseSitemapUrls(xml);
  if (urls.length === 0) {
    console.error('ERROR: No <loc> entries found in sitemap.');
    process.exit(2);
  }

  // Rebase to local server
  urls = urls.map((u) => rebaseUrl(u, BASE_URL));

  // Apply skip patterns
  if (SKIP.length > 0) {
    urls = urls.filter((u) => !SKIP.some((pat) => u.includes(pat)));
  }

  const memory = loadMemory();
  const cacheNote = NO_CACHE ? ' (cache disabled)' : '';
  console.log(`Found ${urls.length} URL(s) to audit (threshold: ${THRESHOLD}, concurrency: ${CONCURRENCY}${cacheNote})\n`);

  // 2. Audit URLs in parallel — stop at the first failure.
  // JS is single-threaded so urlIndex++ is race-free across awaits.
  let urlIndex = 0;
  let aborted = false;
  let firstFailure = null; // { url, report }
  let fatalError   = null; // Error
  const today = new Date().toISOString().slice(0, 10);

  async function worker() {
    while (true) {
      if (aborted) break;

      const url = urls[urlIndex++];
      if (!url) break;

      const key = urlToKey(url);

      // Check cache: fetch page checksum and compare against stored entry
      if (!NO_CACHE) {
        let checksum;
        try {
          checksum = await computeChecksum(url);
        } catch {
          // If we can't fetch the page, fall through to Lighthouse (it will fail too)
        }

        if (checksum) {
          const cached = memory[key];
          if (cached && cached.checksum === checksum && cached.passed) {
            console.log(`Auditing ${url} … SKIP  [unchanged since ${cached.date}]`);
            continue;
          }
          // Store checksum so we don't re-fetch it; lighthouse will determine pass/fail
          memory[key] = { checksum, passed: false, date: today };
        }
      }

      let report;
      try {
        report = await runLighthouse(url);
      } catch (e) {
        if (!aborted) {
          aborted = true;
          fatalError = e;
        }
        break;
      }

      if (aborted) break;

      const scores = Object.entries(report.categories).map(([id, cat]) => ({
        id,
        title: cat.title,
        score: Math.round((cat.score ?? 0) * 100),
      }));

      const passing = scores.every((s) => s.score >= THRESHOLD);
      const summary = scores.map((s) => `${s.title}=${s.score}`).join(', ');

      // Update cache entry with audit result
      if (memory[key]) {
        memory[key].passed = passing;
      } else {
        memory[key] = { checksum: '', passed: passing, date: today };
      }

      // Print result atomically so parallel workers don't interleave lines.
      if (passing) {
        console.log(`Auditing ${url} … PASS  [${summary}]`);
      } else {
        console.log(`Auditing ${url} … FAIL  [${summary}]`);
        if (!aborted) {
          aborted = true;
          firstFailure = { url, report };
        }
        break;
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  // Persist cache regardless of outcome so completed audits are not wasted
  saveMemory(memory);

  if (fatalError) {
    console.error(`\nERROR running Lighthouse: ${fatalError.message}`);
    process.exit(2);
  }

  if (firstFailure) {
    console.log(buildFailureReport(firstFailure.url, firstFailure.report));
    console.log(`\nFix the issues above, then re-run this script.`);
    process.exit(1);
  }

  console.log('\nAll pages passed Lighthouse checks.');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
