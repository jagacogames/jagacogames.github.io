# Blog Images Guide

This guide explains how to add images to your blog posts.

## Directory Structure

Images for blog posts should be organized by post slug:

```
public/
└── blog/
    ├── welcome-to-jagaco/
    │   ├── team-photo.jpg
    │   └── studio-logo.png
    ├── shadow-realm-development-update/
    │   ├── combat-screenshot.jpg
    │   ├── ethereal-gardens.jpg
    │   └── frozen-citadel.jpg
    └── your-post-slug/
        └── your-image.jpg
```

## How to Add Images

### Step 1: Create Image Directory

For a blog post with slug `my-awesome-post`, create a directory:

```bash
mkdir -p public/blog/my-awesome-post
```

The slug is derived from the markdown filename. For example:
- `content/blog/my-awesome-post.md` → slug is `my-awesome-post`
- `content/blog/game-announcement.md` → slug is `game-announcement`

### Step 2: Add Images to Directory

Place your images in the directory you just created:

```bash
public/blog/my-awesome-post/
├── screenshot1.jpg
├── gameplay.png
└── team-photo.jpg
```

### Step 3: Reference Images in Markdown

In your markdown file (`content/blog/my-awesome-post.md`), you have two options for referencing images:

#### Option 1: Editor-Friendly Paths (Recommended)

Images will render in your markdown editor while you're writing:

```markdown
---
title: "My Awesome Post"
date: "2025-01-29"
author: "Your Name"
excerpt: "An example post with images"
tags: ["tutorial"]
---

# My Awesome Post

Here's some text before the image.

![Screenshot of gameplay](../../public/blog/my-awesome-post/screenshot1.jpg)

![Team photo](../../public/blog/my-awesome-post/team-photo.jpg)
```

**Benefits:** Images display correctly in markdown editors (VS Code, Obsidian, etc.) while editing.

#### Option 2: Simple Relative Paths

Cleaner syntax but images won't display in editors:

```markdown
![Screenshot of gameplay](./screenshot1.jpg)
![Team photo](team-photo.jpg)
```

**Benefits:** Cleaner markdown, less verbose.

**Both options produce the same result in the built website!**

## Image Formats

The following markdown image formats are supported:

### Editor-friendly paths (images render in editors while editing)
```markdown
![Alt text](../../public/blog/post-slug/image.jpg)
![Alt text](../../public/blog/post-slug/screenshot.png)
```
→ Transforms to: `/blog/post-slug/image.jpg`

### Simple relative paths (cleaner but don't render in editors)
```markdown
![Alt text](./image.jpg)
![Alt text](image.png)
```
→ Transforms to: `/blog/post-slug/image.jpg`

### Absolute paths (for shared images)
```markdown
![Alt text](/images/logo.png)
```
→ No transformation needed

### External URLs
```markdown
![Alt text](https://example.com/image.jpg)
```
→ No transformation needed

## How It Works

### Editor-Friendly Path
When you write:
```markdown
![Combat system](../../public/blog/my-post/combat.jpg)
```

The system automatically transforms it to:
```html
<img src="/blog/my-post/combat.jpg" alt="Combat system" />
```

### Simple Relative Path
When you write:
```markdown
![Combat system](./combat.jpg)
```

The system automatically transforms it to:
```html
<img src="/blog/your-post-slug/combat.jpg" alt="Combat system" />
```

This ensures:
1. ✅ Images load correctly in the built static site
2. ✅ Images render in markdown editors while editing (with editor-friendly paths)
3. ✅ Images are organized by blog post
4. ✅ No conflicts between posts with similar image names
5. ✅ You can choose the syntax that works best for your workflow

## Best Practices

### 1. Image Organization
- Keep all images for a post in its dedicated directory
- Use descriptive filenames: `combat-system.jpg` not `img1.jpg`

### 2. Image Optimization
- Compress images before adding them
- Recommended formats: WebP > JPEG > PNG
- Keep file sizes reasonable (< 500KB for photos, < 100KB for screenshots)

### 3. Alt Text
Always include descriptive alt text for accessibility:

```markdown
✅ Good:
![The Ethereal Gardens showing mystical lighting effects](./gardens.jpg)

❌ Bad:
![](./gardens.jpg)
```

### 4. Naming Conventions
- Use lowercase filenames
- Use hyphens instead of spaces: `my-image.jpg` not `my image.jpg`
- Use descriptive names: `combat-system.jpg` not `image1.jpg`

## Example Blog Post with Images

```markdown
---
title: "Shadow Realm Development Update"
date: "2025-01-20"
author: "Alex Chen"
excerpt: "New screenshots and gameplay details"
tags: ["shadow-realm", "update"]
---

# Shadow Realm Development Update

We're excited to share our progress!

## Combat System

Here's the new combat system in action:

![New tactical combat positioning system](./combat-screenshot.jpg)

The combat feels much more dynamic now.

## New Environments

Check out the Ethereal Gardens realm:

![The Ethereal Gardens with mystical fog effects](./ethereal-gardens.jpg)

And the imposing Frozen Citadel:

![Ice-covered Frozen Citadel entrance](./frozen-citadel.jpg)

## Next Steps

Stay tuned for more updates!
```

## Troubleshooting

### Images not showing up?

1. **Check the directory structure**: Images must be in `public/blog/[your-post-slug]/`
2. **Check the slug**: The slug is the filename without `.md` extension
3. **Check image paths**: Use relative paths (`./image.jpg` or `image.jpg`)
4. **Rebuild the site**: Run `npm run build` after adding new images
5. **Check file extensions**: Ensure image files have the correct extension

### Common mistakes:

❌ Wrong directory:
```
public/images/my-image.jpg  (images are in wrong location)
```

✅ Correct directory:
```
public/blog/my-post-slug/my-image.jpg
```

❌ Wrong reference:
```markdown
![Alt text](/images/my-image.jpg)  (wrong path in markdown)
```

✅ Correct reference:
```markdown
![Alt text](./my-image.jpg)
```

## Testing

To verify your images work:

1. **Development mode**:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000/blog/your-post-slug

2. **Production build**:
   ```bash
   npm run build
   ```
   Check the `out/` directory to ensure images are included

## Adding Images for Existing Posts

For the sample blog posts included in the project:

1. **welcome-to-jagaco**: Add images to `public/blog/welcome-to-jagaco/`
2. **shadow-realm-development-update**: Add images to `public/blog/shadow-realm-development-update/`
3. **indie-game-development-lessons**: Add images to `public/blog/indie-game-development-lessons/`
4. **pixel-pioneers-release-announcement**: Add images to `public/blog/pixel-pioneers-release-announcement/`

Then reference them in the corresponding markdown files using relative paths.

## Summary

1. Create directory: `public/blog/[post-slug]/`
2. Add images to that directory
3. Reference in markdown: `![Alt text](./image.jpg)`
4. Build: `npm run build`

That's it! Your images will be properly included in the static build.
