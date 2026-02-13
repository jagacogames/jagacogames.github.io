/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://jagaco.com',
  generateRobotsTxt: false, // We have a custom robots.txt
  generateIndexSitemap: false, // Don't need index sitemap for small sites
  outDir: './out', // Next.js static export directory
  exclude: ['/api/*'], // Exclude any API routes if present
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    // Customize priority based on path
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/games')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.startsWith('/blog')) {
      priority = 0.8;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
