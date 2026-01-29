# GitHub Pages Deployment Guide

## Overview

The Jagaco Studios website is configured for automatic deployment to GitHub Pages with proper SEO metadata and the original URL structure (`/YYYY/MM/DD/post-slug`).

## Prerequisites

1. A GitHub account
2. A GitHub repository for this project
3. GitHub Pages enabled in repository settings

## Deployment Methods

### Method 1: Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow that automatically builds and deploys the site when you push to the main branch.

#### Steps:

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Enable GitHub Pages in repository settings:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Build and deployment":
     - Source: **GitHub Actions**
   - Click **Save**

3. **Wait for deployment:**
   - Go to **Actions** tab
   - Watch the "Deploy to GitHub Pages" workflow
   - Once complete, your site will be live!

4. **Access your site:**
   - For username.github.io: `https://YOUR_USERNAME.github.io/`
   - For custom domain: Configure in repository settings (see below)

### Method 2: Manual Deployment

If you prefer manual deployment:

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **The `out/` directory contains your static site**

3. **Deploy the `out/` directory to GitHub Pages** using one of these methods:
   - Use `gh-pages` npm package
   - Push to `gh-pages` branch manually
   - Use GitHub Desktop

## Configuration Options

### Custom Domain

To use a custom domain (e.g., `jagaco.com`):

1. **Add CNAME file:**
   ```bash
   # In public/ directory
   echo "your-domain.com" > public/CNAME
   ```

2. **Configure DNS:**
   - Add A records pointing to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - OR add CNAME record: `YOUR_USERNAME.github.io`

3. **Update in GitHub:**
   - Settings → Pages → Custom domain
   - Enter your domain and save

4. **Update environment variable:**
   - In `.github/workflows/deploy.yml`, add:
     ```yaml
     env:
       NEXT_PUBLIC_SITE_URL: https://your-domain.com
     ```

### Repository Subdirectory (username.github.io/repo-name)

If deploying to `username.github.io/repo-name` (not root):

1. **Update `next.config.js`:**
   ```javascript
   const nextConfig = {
     output: 'export',
     basePath: '/repo-name',  // Uncomment and set
     // ... rest of config
   }
   ```

2. **Update environment variable:**
   ```bash
   export NEXT_PUBLIC_BASE_PATH=/repo-name
   ```

## SEO Configuration

### Metadata

The site includes comprehensive SEO metadata:

✅ **Homepage:**
- Open Graph tags
- Twitter Cards
- Structured data ready
- Robots meta tags

✅ **Blog Posts:**
- Dynamic meta titles
- Descriptions from excerpts
- Featured images for social sharing
- Author attribution
- Publication dates
- Canonical URLs
- Keywords from tags

### Verifying SEO

After deployment, test your SEO:

1. **Open Graph:** https://www.opengraph.xyz/
2. **Twitter Cards:** https://cards-dev.twitter.com/validator
3. **Google Rich Results:** https://search.google.com/test/rich-results

## URL Structure

Blog posts use the original Jagaco URL structure:

```
/2025/07/31/the-controversy-of-using-generative-ai-in-game-development/
/2025/05/22/a-living-world/
/2022/11/26/town-update/
```

This matches the original site and maintains SEO continuity.

## Build Verification

Before deploying, verify your build:

```bash
# Build the site
npm run build

# Check output
ls -la out/

# Verify routes were generated
find out/ -name "*.html" | wc -l
```

Expected output:
- **53 routes** total
- **43 blog post pages** at `/YYYY/MM/DD/slug/`
- **4 game pages** at `/games/slug/`
- Homepage, blog listing, games listing
- 404 page

## Files for GitHub Pages

These files ensure proper GitHub Pages deployment:

### `.github/workflows/deploy.yml`
Automatic deployment workflow using GitHub Actions.

### `public/.nojekyll`
Prevents Jekyll processing (GitHub's default static site generator).

### `public/CNAME` (optional)
Custom domain configuration.

### `next.config.js`
- `output: 'export'` - Enables static export
- `trailingSlash: true` - Ensures proper routing
- `images.unoptimized: true` - Required for static export

## Troubleshooting

### Images Not Loading

**Issue:** Images show broken links after deployment.

**Solution:**
- Ensure images are in `public/` directory
- Check paths start with `/` (e.g., `/blog/_featured/image.png`)
- Verify basePath is set correctly if using subdirectory

### 404 Errors on Blog Posts

**Issue:** Blog post URLs return 404.

**Solution:**
- Ensure `trailingSlash: true` in next.config.js
- Check that build generated HTML files in correct structure
- Verify GitHub Pages is using "GitHub Actions" as source

### Custom Domain Not Working

**Issue:** Custom domain shows 404 or redirects incorrectly.

**Solution:**
- Check DNS configuration (allow 24-48 hours for propagation)
- Ensure CNAME file exists in `public/` directory
- Verify domain is configured in repository settings
- Check HTTPS is enforced in Pages settings

### Build Fails in GitHub Actions

**Issue:** Workflow fails with errors.

**Solution:**
- Check Node version in workflow (should be 18+)
- Ensure `package-lock.json` is committed
- Review error logs in Actions tab
- Test build locally first: `npm run build`

## Environment Variables

Set these in your environment or GitHub Actions:

```bash
# Required for SEO metadata
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional: for subdirectory deployment
NEXT_PUBLIC_BASE_PATH=/repo-name
```

In GitHub Actions, add to workflow:

```yaml
- name: Build Next.js
  env:
    NEXT_PUBLIC_SITE_URL: https://your-domain.com
  run: npm run build
```

## Monitoring Deployment

### Check Deployment Status

1. **Actions Tab:**
   - View workflow runs
   - See build logs
   - Monitor deployment progress

2. **Pages Settings:**
   - Shows current deployment status
   - Displays site URL
   - Shows custom domain configuration

### Performance

- **Build time:** ~3-4 seconds compilation
- **Generation time:** ~1.5 seconds for 53 routes
- **Deploy time:** ~30 seconds (GitHub Actions)
- **Total:** ~2-3 minutes from push to live

## Post-Deployment Checklist

After deployment, verify:

- [ ] Homepage loads correctly
- [ ] Blog listing shows all 43 posts
- [ ] Blog post URLs work (`/YYYY/MM/DD/slug/`)
- [ ] Featured images display on blog cards
- [ ] In-content images load correctly
- [ ] Games showcase works
- [ ] Navigation links function
- [ ] Mobile responsiveness
- [ ] SEO meta tags present (view source)
- [ ] Social sharing previews work
- [ ] 404 page displays for invalid URLs

## Updating Content

To add new blog posts:

1. **Create markdown file** in `content/blog/`
2. **Add featured image** in `public/blog/_featured/`
3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add new blog post"
   git push
   ```
4. **GitHub Actions will automatically deploy**

## Support

For issues with:
- **Next.js:** https://nextjs.org/docs
- **GitHub Pages:** https://docs.github.com/en/pages
- **GitHub Actions:** https://docs.github.com/en/actions

## Summary

✅ Automatic deployment configured
✅ SEO metadata optimized
✅ Original URL structure preserved
✅ Static site generation
✅ Custom domain support
✅ Mobile responsive
✅ Fast build times

Your site is ready for GitHub Pages deployment!
