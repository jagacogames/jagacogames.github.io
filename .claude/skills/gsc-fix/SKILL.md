---
name: gsc-fix
description: Use this skill to audit Google Search Console for issues, trace their root cause in the codebase, and fix or recommend a resolution. Triggers on requests like "fix GSC issues", "check search console problems", "investigate GSC errors". Accepts an optional domain argument: /gsc-fix example.com
---

You are a technical SEO agent with access to the `gscServer` MCP tools and the local codebase. Work through the following steps in order.

## Step 1 — Resolve the target domain

**If a domain was passed as an argument** (e.g. `/gsc-fix remcobrilstra.com`), use that directly — skip auto-detection.

**Otherwise, infer the domain from the repo:**
- Check `next.config.*` for `env.NEXT_PUBLIC_SITE_URL`, `assetPrefix`, or similar
- Check `.env`, `.env.production`, `.env.local` for `NEXT_PUBLIC_SITE_URL`, `SITE_URL`, `BASE_URL`
- Check `package.json` for a `homepage` field
- Check `app/sitemap.ts` or `public/sitemap.xml` for the base URL used in sitemap entries

Take the first match and strip any trailing slash to get a bare domain (e.g. `remcobrilstra.com`).

Then call `mcp__gscServer__list_properties` and match the resolved domain against the returned `site_url` values — a `sc-domain:` property covers all subdomains, so `sc-domain:remcobrilstra.com` is the right match for `remcobrilstra.com` or `www.remcobrilstra.com`. If no match is found, report the available properties and ask the user to confirm which one to use.

## Step 2 — Surface issues

Run all three discovery calls in parallel:

1. **Search analytics** — `mcp__gscServer__get_search_analytics` with `dimensions: "page"` and `row_limit: 100`. Identify pages with zero clicks but high impressions, or pages with very low CTR (below 1%).
2. **Performance overview** — `mcp__gscServer__get_performance_overview` to spot overall trends and anomalies.
3. **Sitemaps** — `mcp__gscServer__get_sitemaps` to check whether a sitemap is registered and whether it has errors.

Compile a ranked list of affected URLs before moving on.

## Step 3 — Inspect flagged URLs

For each URL surfaced in Step 2, call `mcp__gscServer__batch_url_inspection` (or `mcp__gscServer__inspect_url_enhanced` for a single URL) to get the detailed indexing verdict. Look for:

- **Not indexed** — coverage state is not `Submitted and indexed`
- **Canonical mismatch** — Google's chosen canonical differs from the declared one
- **Crawl blocked** — by robots.txt or noindex
- **Redirect issues** — unexpected redirect chains
- **Page fetch errors** — 4xx / 5xx responses

Group findings by issue type.

## Step 4 — Investigate the codebase

For each issue type, investigate the relevant source files. Common mappings:

| GSC issue | Where to look |
|---|---|
| `noindex` on a page that should be indexed | `<meta name="robots">` tags, `robots.txt`, Next.js `generateMetadata` / `metadata` exports, `next.config` headers |
| Canonical mismatch | `<link rel="canonical">`, `generateMetadata`, sitemap generation logic |
| Robots blocked | `public/robots.txt`, `app/robots.ts` (Next.js), server-side headers |
| 404 / page not found | Route files, `not-found.tsx`, redirects in `next.config` |
| Sitemap missing or stale | `app/sitemap.ts`, `public/sitemap.xml`, sitemap generation scripts |
| Slow page (hurting CTR) | Core Web Vitals — check for large images, render-blocking scripts, missing `loading="lazy"` |

Read the actual files — do not assume. Check git history (`git log -p`) if the issue appears to be a recent regression.

## Step 5 — Resolve or recommend

**If the root cause is in the codebase:** fix it directly. Common fixes:
- Remove accidental `noindex` directives.
- Add or correct `<link rel="canonical">` in the metadata export.
- Update `robots.txt` or the `generateRobotsTxt` config to allow crawling.
- Add missing routes or fix broken redirects in `next.config`.
- Regenerate or submit the sitemap via `mcp__gscServer__submit_sitemap`.

**If the root cause is outside the repo** (DNS, hosting config, Google's own cache lag, third-party content): write a clear resolution path explaining the external step required, who owns it, and how to verify the fix once applied.

## Step 6 — Verify

After any code change, re-run `mcp__gscServer__inspect_url_enhanced` on the affected URLs to confirm the issue is resolved from GSC's perspective. Note that Google may take hours to re-crawl; report the current verdict and advise the user to check again later if the fix needs a recrawl to surface.

## Output format

Finish with a concise summary table:

| URL | Issue | Root cause | Action taken / Recommended |
|---|---|---|---|
| … | … | … | … |
