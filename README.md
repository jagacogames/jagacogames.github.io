# Jagaco Studios Website

A modern, professional, responsive Next.js website for Jagaco indie game studio featuring a games showcase and markdown-powered blog.

## Features

- **Modern Design**: Dark gaming theme with cyan accents
- **Responsive Layout**: Mobile-first design that works on all devices
- **Games Showcase**: Display your game portfolio with detailed pages
- **Markdown Blog**: Write blog posts in markdown with frontmatter support
- **Static Export**: Fully static site generation for easy deployment
- **TypeScript**: Type-safe development experience
- **Tailwind CSS**: Utility-first styling for rapid development

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Inter (via Next.js font optimization)
- **Markdown**: gray-matter, react-markdown, remark-gfm
- **Deployment**: Static export ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd jagaco-website
```

2. Install dependencies (already installed):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
jagaco-website/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── layout.tsx          # Root layout with navigation
│   │   ├── page.tsx            # Homepage
│   │   ├── games/              # Games showcase pages
│   │   └── blog/               # Blog pages
│   ├── components/             # React components
│   │   ├── Navigation.tsx      # Header navigation
│   │   ├── Footer.tsx          # Footer component
│   │   ├── GameCard.tsx        # Game card component
│   │   └── BlogCard.tsx        # Blog card component
│   ├── lib/                    # Utility functions
│   │   └── markdown.ts         # Markdown parsing utilities
│   ├── data/                   # Static data
│   │   └── games.ts            # Games data
│   └── types/                  # TypeScript types
│       └── index.ts            # Type definitions
├── content/
│   └── blog/                   # Markdown blog posts
├── public/
│   └── images/                 # Game images and assets
└── next.config.js              # Next.js configuration
```

## Adding Content

### Adding a New Game

Edit `src/data/games.ts` and add a new game object to the array:

```typescript
{
  id: '5',
  slug: 'your-game-slug',
  title: 'Your Game Title',
  description: 'Short description',
  fullDescription: 'Detailed description',
  genre: ['Action', 'Adventure'],
  platforms: ['PC', 'Console'],
  releaseDate: '2025-Q4',
  thumbnail: '/images/your-game-thumb.jpg',
  screenshots: ['/images/screenshot1.jpg'],
  storeLinks: {
    steam: 'https://store.steampowered.com/...',
  },
  features: [
    'Feature 1',
    'Feature 2',
  ],
}
```

### Adding a Blog Post

1. Create a new markdown file in `content/blog/`:

```markdown
---
title: "Your Post Title"
date: "2025-01-29"
author: "Your Name"
excerpt: "A brief summary of your post"
tags: ["tag1", "tag2"]
---

# Your Post Title

Your content here...
```

2. The post will automatically appear on the blog page, sorted by date

### Adding Images

#### Game Images
Place game image files in the `public/images/` directory. Reference them in your code using paths like `/images/your-game.jpg`.

#### Blog Post Images
For blog post images, create a directory matching your post slug:

1. Create directory: `public/blog/your-post-slug/`
2. Add images to that directory
3. Reference in markdown using one of two syntax options:

**Option 1: Editor-Friendly (images render in markdown editors)**
```markdown
![Image description](../../public/blog/your-post-slug/image.jpg)
```

**Option 2: Simple Relative Paths (cleaner syntax)**
```markdown
![Image description](./image.jpg)
![Image description](image.jpg)
```

Both options produce the same result on the website! Choose based on your preference.

**Example:**
For a blog post at `content/blog/my-post.md`, place images in `public/blog/my-post/`:

```markdown
# Editor-friendly (displays in VS Code/editors while writing)
![Screenshot](../../public/blog/my-post/screenshot.jpg)

# Simple relative path (cleaner but doesn't display in editors)
![Diagram](./diagram.png)
```

See [BLOG_IMAGES_GUIDE.md](./BLOG_IMAGES_GUIDE.md) for detailed instructions.

## Building for Production

### Static Export

```bash
npm run build
```

This generates a static site in the `out/` directory that can be deployed to any static hosting service.

### Deployment Options

The static export can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any static hosting service

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build static export
- `npm run lint` - Run ESLint

## Customization

### Colors

The site uses a dark theme with cyan accents. To customize colors, edit the Tailwind classes in components:
- Primary: `cyan-400`, `cyan-500`, `cyan-600`
- Background: `gray-950`, `gray-900`, `gray-800`
- Text: `white`, `gray-300`, `gray-400`

### Fonts

The site uses the Inter font. To change fonts, edit `src/app/layout.tsx`.

## Sample Content

The site includes sample content:
- 4 example games (Shadow Realm, Pixel Pioneers, Cosmic Drift, Rogue Circuit)
- 4 blog posts covering various topics
- Placeholder components for images

Replace this content with your actual games and blog posts.

## Learn More

To learn more about Next.js:
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
