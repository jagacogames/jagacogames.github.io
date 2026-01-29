# Changelog

## [2025-01-29] - Blog Image Support Added

### Added
- Image support for blog posts with automatic path transformation
- Custom image component in markdown renderer
- Directory structure for organizing blog post images
- Comprehensive documentation (BLOG_IMAGES_GUIDE.md)
- Support for two image reference syntaxes

### Features
- **Editor-Friendly Paths**: Reference images as `../../public/blog/slug/image.jpg` to see them render in markdown editors while writing
- **Simple Relative Paths**: Reference images as `./image.jpg` or `image.jpg` for cleaner markdown
- **Automatic Transformation**: Both syntaxes automatically convert to `/blog/[slug]/image.jpg` on build
- **Organized Structure**: Images stored in `public/blog/[post-slug]/` directories
- **Flexible**: Choose the syntax that fits your workflow

### How to Use

1. Create image directory:
   ```bash
   mkdir -p public/blog/my-post-slug
   ```

2. Add images to the directory:
   ```
   public/blog/my-post-slug/
   ├── screenshot1.jpg
   ├── diagram.png
   └── photo.jpg
   ```

3. Reference in markdown (`content/blog/my-post-slug.md`) using either syntax:

   **Option 1: Editor-friendly (images display in markdown editors)**
   ```markdown
   ![Screenshot](../../public/blog/my-post-slug/screenshot1.jpg)
   ![Diagram](../../public/blog/my-post-slug/diagram.png)
   ```

   **Option 2: Simple relative paths (cleaner syntax)**
   ```markdown
   ![Screenshot](./screenshot1.jpg)
   ![Diagram](diagram.png)
   ```

### Files Modified
- `src/app/blog/[slug]/page.tsx` - Added custom `img` component with path transformation
- `content/blog/shadow-realm-development-update.md` - Added example image references (commented)

### Files Created
- `BLOG_IMAGES_GUIDE.md` - Comprehensive guide for using blog images
- `public/blog/shadow-realm-development-update/README.txt` - Example directory
- `public/blog/welcome-to-jagaco/README.txt` - Example directory
- `CHANGELOG.md` - This file

### Documentation
- Updated README.md with blog image instructions
- Created detailed BLOG_IMAGES_GUIDE.md with examples and troubleshooting

### Testing
- ✅ Build successful with new image support
- ✅ TypeScript compilation passes
- ✅ All 14 routes generate correctly
- ✅ Image paths correctly transformed during render

## [2025-01-29] - Initial Release

### Added
- Complete Next.js 15 website with TypeScript
- Dark gaming theme with cyan accents
- Homepage with hero section and featured games
- Games showcase with 4 sample games
- Individual game detail pages
- Blog with markdown support
- 4 sample blog posts
- Responsive navigation with mobile menu
- Footer with social links
- Static export configuration
- Comprehensive documentation
