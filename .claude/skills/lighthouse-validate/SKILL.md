---
name: lighthouse-validate
description: Use this skill to run Lighthouse audits on your web applications. Provides performance, accessibility, best practices, SEO, and PWA insights.
---

## Overview

Runs `lighthouse-scan.js` against every URL in `sitemap.xml` of the locally running site.  
The script exits after the **first page that fails** the score threshold. A subagent then fixes that page, the main agent re-runs the scan, and the loop continues — one page at a time.

**Context design:** the main agent only holds scan output and brief subagent summaries. All file reads and edits happen inside the subagent and are discarded after each iteration.

---

## Prerequisites

`lighthouse` must be available on the PATH:

```
npm install -g lighthouse
```

The local dev server must be running before the script is called.

---

## Script

`.claude/skills/lighthouse-validate/lighthouse-scan.js`

**Options:**

| Flag | Default | Description |
|---|---|---|
| `--url` | `http://localhost:3000` | Base URL of the local server |
| `--threshold` | `90` | Minimum acceptable score (0–100) |
| `--categories` | `performance,accessibility,best-practices,seo` | Lighthouse categories to check |
| `--skip` | _(none)_ | Comma-separated URL substrings to exclude |

**Exit codes:**

| Code | Meaning |
|---|---|
| `0` | All pages pass |
| `1` | First failing page printed — spawn a fix subagent, then re-run |
| `2` | Script error (server not running, bad sitemap, etc.) |

---

## Agent loop protocol

The default max iterations is **5** unless the user specifies otherwise.

### Step 1 — Ensure dev server is running

Check if a process is already listening on the target port.  
If not, start it in the background and wait ~10 s:

```bash
npm run dev &
```

### Step 2 — Run the scan

```bash
node .claude/skills/lighthouse-validate/lighthouse-scan.js --url http://localhost:3000 --threshold 90
```

Adjust `--threshold`, `--categories`, or `--skip` as instructed by the user.

### Step 3 — Interpret the result

- **Exit 0**: All pages pass. Report success to the user. Done.
- **Exit 2**: Configuration error. Fix the underlying problem (wrong port, server not ready, no sitemap) and retry Step 2 once before giving up.
- **Exit 1**: One page failed. Capture the full script output and proceed to Step 4.

### Step 4 — Spawn a fix subagent

Spawn a **general-purpose** subagent. Pass it:

- The full failure report from Step 3 (URL, category scores, failing audits with descriptions and offending items)
- The project stack: Next.js, TypeScript, static site, content in `/content/`, public assets in `/public/`
- These exact instructions:

> Fix the Lighthouse audit failures listed above.
> Rules:
> - Apply the minimal change needed. Do not refactor or touch unrelated code.
> - Do not fix audits on pages other than the one reported.
> - Do not re-run the Lighthouse scan — the parent agent handles that.
> - After your edits, run `npm run build && npm run lint` to confirm the build passes.
> - Return a one-paragraph summary: what you changed and why.

Wait for the subagent to complete. If the build fails inside the subagent, it should fix the build error before returning.

### Step 5 — Re-run

Go back to Step 2. Count this as one iteration.

### Step 6 — Stop conditions

- **All pages pass** → report success to the user.
- **Max iterations reached** → report which pages still fail, paste the last failure report, and tell the user manual intervention is needed.
- **Same page and same audit fail twice in a row** → the issue likely cannot be automatically fixed. Explain why and stop.

---

## Example invocations

Audit with default settings:

```bash
node .claude/skills/lighthouse-validate/lighthouse-scan.js
```

SEO-only audit with a lower threshold:

```bash
node .claude/skills/lighthouse-validate/lighthouse-scan.js --categories seo --threshold 80
```

Skip tag and category pages:

```bash
node .claude/skills/lighthouse-validate/lighthouse-scan.js --skip /tags/,/categories/
```
