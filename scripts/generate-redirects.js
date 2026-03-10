const fs = require('fs');
const path = require('path');

const REDIRECTS_CONFIG = path.join(process.cwd(), 'redirects.config.json');
const OUT_DIR = path.join(process.cwd(), 'out');
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jagaco.com';

function generateRedirectHtml(destination) {
  const absoluteDest = destination.startsWith('http')
    ? destination
    : `${SITE_URL}${destination}`;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=${destination}" />
    <link rel="canonical" href="${absoluteDest}" />
    <title>Redirecting...</title>
    <script>window.location.replace("${destination}");</script>
  </head>
  <body>
    <p>This page has moved. <a href="${destination}">Click here if you are not redirected.</a></p>
  </body>
</html>
`;
}

function main() {
  if (!fs.existsSync(REDIRECTS_CONFIG)) {
    console.log('No redirects.config.json found, skipping redirect generation.');
    return;
  }

  const redirects = JSON.parse(fs.readFileSync(REDIRECTS_CONFIG, 'utf8'));

  if (!Array.isArray(redirects) || redirects.length === 0) {
    console.log('No redirects configured.');
    return;
  }

  let count = 0;

  for (const redirect of redirects) {
    const { from, to } = redirect;

    if (!from || !to) {
      console.warn(`Skipping invalid redirect entry: ${JSON.stringify(redirect)}`);
      continue;
    }

    // Normalise: strip leading slash, then resolve to out/<path>/index.html
    const normalised = from.replace(/^\//, '').replace(/\/$/, '');
    const outputDir = normalised ? path.join(OUT_DIR, normalised) : OUT_DIR;
    const outputFile = path.join(outputDir, 'index.html');

    // Do not overwrite a real page that Next.js already generated
    if (fs.existsSync(outputFile)) {
      console.warn(`Skipping redirect for "${from}" — file already exists: ${outputFile}`);
      continue;
    }

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputFile, generateRedirectHtml(to), 'utf8');
    console.log(`  ${from}  →  ${to}`);
    count++;
  }

  console.log(`✓ Generated ${count} redirect(s).`);
}

main();
