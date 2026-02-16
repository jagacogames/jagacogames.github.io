const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');
const OG_OUTPUT_DIR = path.join(process.cwd(), 'public', 'og');
const LOGO_PATH = path.join(process.cwd(), 'public', 'images', 'jagaco-logo.png');

// Ensure output directory exists
if (!fs.existsSync(OG_OUTPUT_DIR)) {
  fs.mkdirSync(OG_OUTPUT_DIR, { recursive: true });
}

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

      return {
        slug,
        title: data.title,
        date: data.date,
        author: data.author,
        featuredImage: data.featuredImage,
      };
    });
}

// Wrap text to fit within a specific width
function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

async function generateOGImage(post) {
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Load and draw background image if exists
  let hasBackground = false;
  if (post.featuredImage) {
    try {
      const bgPath = path.join(process.cwd(), 'public', post.featuredImage);
      if (fs.existsSync(bgPath)) {
        const bgImage = await loadImage(bgPath);

        // Draw background with blur effect (we'll darken it)
        ctx.drawImage(bgImage, 0, 0, width, height);

        // Apply dark overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, width, height);
        hasBackground = true;
      }
    } catch (error) {
      console.error(`Error loading background for ${post.slug}:`, error.message);
    }
  }

  // If no background, use gradient
  if (!hasBackground) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#FDB614');
    gradient.addColorStop(1, '#E91E63');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  // Load and draw logo
  try {
    const logo = await loadImage(LOGO_PATH);
    const logoHeight = 80;
    const logoWidth = (logo.width / logo.height) * logoHeight;
    ctx.drawImage(logo, 60, 60, logoWidth, logoHeight);
  } catch (error) {
    console.error(`Error loading logo for ${post.slug}:`, error.message);
  }

  // Draw title
  const titleY = 300;
  const fontSize = post.title.length > 50 ? 52 : 72;
  ctx.font = `bold ${fontSize}px Arial, sans-serif`;
  ctx.fillStyle = 'white';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 4;

  const lines = wrapText(ctx, post.title, width - 120);
  const lineHeight = fontSize * 1.2;
  const maxLines = 3;
  const displayLines = lines.slice(0, maxLines);

  displayLines.forEach((line, index) => {
    const y = titleY + (index * lineHeight);
    ctx.fillText(line, 60, y);
  });

  // Reset shadow for footer
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  // Draw author and date at the bottom
  ctx.font = '24px Arial, sans-serif';
  ctx.fillStyle = 'white';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;

  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const footerText = `${post.author} • ${formattedDate}`;
  ctx.fillText(footerText, 60, height - 60);

  // Save image
  const outputPath = path.join(OG_OUTPUT_DIR, `${post.slug}.png`);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);

  console.log(`Generated OG image for: ${post.slug}`);
}

async function main() {
  console.log('Starting OG image generation...');
  const posts = getAllBlogPosts();

  for (const post of posts) {
    try {
      await generateOGImage(post);
    } catch (error) {
      console.error(`Failed to generate OG image for ${post.slug}:`, error);
    }
  }

  console.log(`\nGenerated ${posts.length} OG images successfully!`);
}

main().catch(console.error);
