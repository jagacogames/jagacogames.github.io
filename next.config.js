/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment
  // If deploying to username.github.io or custom domain, leave basePath empty
  // If deploying to username.github.io/repo-name, uncomment and set basePath
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

  // Ensure trailing slashes for proper routing
  trailingSlash: true,
}

module.exports = nextConfig
