# Quick Start: Adding Images to Blog Posts

## TL;DR

1. **Create directory**: `public/blog/[your-post-slug]/`
2. **Add images**: Place your `.jpg`, `.png`, `.gif` files there
3. **Reference in markdown**: Choose your preferred syntax

## Two Syntax Options

### Option 1: Editor-Friendly ⭐ Recommended
Images render in your markdown editor while you write:

```markdown
![My Screenshot](../../public/blog/my-post-slug/screenshot.jpg)
```

✅ Images display in VS Code, Obsidian, etc. while editing
✅ Transformed to `/blog/my-post-slug/screenshot.jpg` on build

### Option 2: Simple Relative
Cleaner syntax but images don't render in editors:

```markdown
![My Screenshot](./screenshot.jpg)
```

✅ Cleaner markdown
✅ Transformed to `/blog/my-post-slug/screenshot.jpg` on build

## Complete Example

**File structure:**
```
content/blog/game-update.md
public/blog/game-update/
├── screenshot1.jpg
├── gameplay.png
└── banner.jpg
```

**In `content/blog/game-update.md`:**

```markdown
---
title: "Game Update"
date: "2025-01-29"
author: "Dev Team"
excerpt: "New features!"
tags: ["update"]
---

# Game Update

Check out our new features!

![Main banner](../../public/blog/game-update/banner.jpg)

## New Combat System

Here's the combat in action:

![Combat screenshot](../../public/blog/game-update/screenshot1.jpg)

## Gameplay Video

![Gameplay footage](../../public/blog/game-update/gameplay.png)
```

**Result:** All images load correctly on the website at `/blog/game-update/`

## Troubleshooting

**Images not showing?**
1. Check directory: Must be `public/blog/[exact-post-slug]/`
2. Check slug: Filename without `.md` (e.g., `game-update.md` → slug is `game-update`)
3. Rebuild: Run `npm run build` after adding images

**Wrong path?**
- ❌ `public/images/screenshot.jpg` - Wrong location
- ✅ `public/blog/my-post-slug/screenshot.jpg` - Correct!

## That's It!

See [BLOG_IMAGES_GUIDE.md](./BLOG_IMAGES_GUIDE.md) for more details.
