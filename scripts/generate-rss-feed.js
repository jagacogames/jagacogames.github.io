const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');
const RSS_OUTPUT_PATH = path.join(process.cwd(), 'public', 'rss.xml');
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jagaco.com';

// Get all blog posts
function getAllBlogPosts() {
  const fileNames = fs.readdirSync(BLOG_CONTENT_DIR);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(BLOG_CONTENT_DIR, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      // Parse the date string
      const date = new Date(data.date);

      return {
        slug,
        title: data.title,
        date: date,
        author: data.author,
        excerpt: data.excerpt,
        tags: data.tags || [],
        featuredImage: data.featuredImage,
      };
    })
    .sort((a, b) => b.date - a.date); // Sort by date descending (newest first)
}

// Escape XML special characters
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate blog post URL from date and slug
function getBlogPostUrl(post) {
  const date = post.date;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${SITE_URL}/${year}/${month}/${day}/${post.slug}`;
}

// Generate RSS 2.0 feed
function generateRSSFeed(posts) {
  const latestPost = posts[0];
  const buildDate = new Date().toUTCString();
  const lastBuildDate = latestPost ? latestPost.date.toUTCString() : buildDate;

  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jagaco Games Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Follow our development journey, get behind-the-scenes insights, and learn about our process of creating indie games.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <ttl>1440</ttl>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
`;

  posts.forEach(post => {
    const postUrl = getBlogPostUrl(post);
    const pubDate = post.date.toUTCString();
    const description = escapeXml(post.excerpt || '');
    const title = escapeXml(post.title);
    const author = escapeXml(post.author);

    rss += `
    <item>
      <title>${title}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${author}</author>`;

    // Add categories (tags)
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach(tag => {
        rss += `
      <category>${escapeXml(tag)}</category>`;
      });
    }

    // Add enclosure for featured image
    if (post.featuredImage) {
      const imageUrl = `${SITE_URL}${post.featuredImage}`;
      rss += `
      <enclosure url="${imageUrl}" type="image/png" />`;
    }

    rss += `
    </item>`;
  });

  rss += `
  </channel>
</rss>`;

  return rss;
}

async function main() {
  console.log('Starting RSS feed generation...');

  const posts = getAllBlogPosts();
  console.log(`Found ${posts.length} blog posts`);

  const rssFeed = generateRSSFeed(posts);

  fs.writeFileSync(RSS_OUTPUT_PATH, rssFeed, 'utf8');

  console.log(`✓ RSS feed generated successfully at ${RSS_OUTPUT_PATH}`);
  console.log(`  Feed URL: ${SITE_URL}/rss.xml`);
  console.log(`  ${posts.length} posts included`);
}

main().catch(error => {
  console.error('Error generating RSS feed:', error);
  process.exit(1);
});
