# Games Content Structure

This directory contains markdown files for each game displayed on the website.

## File Naming

- Each game should have its own `.md` file
- The filename (without `.md`) becomes the game's URL slug
- Example: `shadow-realm.md` → `/games/shadow-realm`
- **Ignored files:**
  - Files starting with `_` (underscore) - Example: `_TEMPLATE.md`
  - `README.md` - This documentation file

## Frontmatter Structure

Each game file must have YAML frontmatter with these fields:

### Required Fields

- **title**: Game title (displayed on cards and detail page)
- **description**: Short description (1-2 sentences, used for cards)
- **genre**: Array of genre tags (e.g., `["Action", "RPG"]`)
- **platforms**: Array of platforms (e.g., `["PC", "PlayStation"]`)
- **releaseDate**: Release date or quarter (e.g., `"2025-Q1"` or `"2024-12-15"`)
- **thumbnail**: Path to thumbnail image for game cards
- **screenshots**: Array of screenshot image paths
- **features**: Array of key features (bullet points)

### Optional Fields

- **storeLinks**: Object with store links
  - `steam`: Steam store URL
  - `itch`: Itch.io URL
  - `gog`: GOG.com URL

## Content (Markdown Body)

After the frontmatter, write the full game description using markdown.
This content appears on the game's detail page under "About the Game".

You can use:
- Headings (`#`, `##`, `###`)
- **Bold** and *italic* text
- Lists (bulleted and numbered)
- Links
- Images
- Code blocks
- And any other markdown features

## Example Structure

See `_TEMPLATE.md` for a complete example.

## Tips

- Keep descriptions concise but engaging
- Use high-quality images for thumbnails and screenshots
- List features that make your game unique
- Update store links when they become available
- Sort by release date (newest first) automatically
