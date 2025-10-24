# FDUniverse Project - Quick Reference Guide

## Quick Navigation

### Where Everything Is:
- **Main Web Platform**: `/home/matt/projects/DProjects/FDUniverse/KILNUniverse/_graphic_novel/08_interactive_reader/`
- **Manuscripts**: `/home/matt/projects/DProjects/FDUniverse/KILNUniverse/_manuscripts/`
- **Images**: `/home/matt/projects/DProjects/FDUniverse/KILNUniverse/_graphic_novel/06_generated_panels/`

## Entry Points (Pick One)

1. **consciousness-codex-title.html** - Main platform (story selection screen)
2. **horizontal-reader.html** - Long-form reading experience
3. **index.html** - Basic two-column reader
4. **kiln-grid-index.html** - Comic book grid layout

## Key Files to Know

### HTML Entry Points
| File | Purpose | Location |
|------|---------|----------|
| consciousness-codex-title.html | Title screen & story selection | 08_interactive_reader/ |
| horizontal-reader.html | Horizontal scroll reader | 08_interactive_reader/ |
| index.html | Basic reader | 08_interactive_reader/ |

### JavaScript Controllers (Most Important)
| File | Size | Purpose |
|------|------|---------|
| consciousness-codex-title.js | 18KB | Title screen logic |
| horizontal-reader.js | 24KB | Horizontal scroll control |
| script.js | 20KB | Basic reader logic |
| kiln-grid-controller.js | 77KB | Comic grid system |
| platform-system.js | 17KB | Account/subscription management |

### Styling
| File | Size | Purpose |
|------|------|---------|
| consciousness-codex-title.css | 21KB | Title screen styling |
| horizontal-reader.css | 18KB | Horizontal reader styling |
| styles.css | 14KB | Basic reader styling |
| kiln-grid-layout.css | 56KB | Comic grid layout |

### Data Files
| File | Purpose |
|------|---------|
| chapter-data.json | Story metadata & chapter references |
| _manuscripts/*/chapters/*.md | Actual manuscript content |

## Keyboard Shortcuts (Universal)

```
← →    Navigate between scenes/chapters
↑ ↓    Navigate between images
Space  Next scene
E      Toggle edit mode
F      Toggle fullscreen
H      Show/hide keyboard help
Esc    Close dialogs/exit edit mode
```

## Color Palette (CSS Variables)

```css
--consciousness-blue: #4A90E2     (Blue - awareness/consciousness)
--authority-red: #E74C3C          (Red - control/authority)
--transformation-gold: #F39C12    (Gold - change/evolution)
--ceramic-cream: #F5F5DC          (Cream - light text)
--clay-brown: #8B4513             (Brown - earth)
--kiln-dark: #2C1810              (Dark - backgrounds)
```

## Fonts

- **Headers**: Cinzel (serif, elegant)
- **Body**: Crimson Text (serif, readable)
- **Both from**: Google Fonts

## Stories in the System

1. **The First Void** 
   - ID: `first-void`
   - Chapters: 16
   - Theme: Blue (consciousness)
   - Status: Active

2. **The Translator's Burden**
   - ID: `translators-burden`
   - Chapters: 12+
   - Theme: Prequel story
   - Status: Active

3. **KILN Codex**
   - ID: `kiln-codex`
   - Chapters: 12 panels
   - Theme: Graphic novel
   - Status: Active

## Data Structure Example

```javascript
// Scene object (in manuscript-loader.js)
{
  id: 1,
  chapter: "Chapter 1: Wet Clay",
  title: "Awakening",
  type: "Opening Scene",
  story: "<p>Story text here</p>",
  description: "DALL-E prompt here",
  images: ["Scene 1A - Aude Defience.png"],
  soundEffects: [],
  speechBubbles: []
}
```

## Common Tasks

### Add a New Image
1. Place image in `_graphic_novel/06_generated_panels/`
2. Add to images array in scene data
3. Test in reader

### Add a New Chapter
1. Create markdown file in `_manuscripts/STORY_NAME/chapters/`
2. Update chapter-data.json with reference
3. Reload reader

### Modify Colors
1. Edit CSS variables in `:root` section
2. All components automatically update
3. Check all pages still look good

### Change Fonts
1. Update font import in CSS `@import`
2. Update `--title-font` and `--body-font` variables
3. Test at different sizes

### Add Keyboard Shortcut
1. Find keyboard event listener in controller JS
2. Add new case to key handler
3. Test the shortcut works

## Browser Compatibility

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Development Setup

No build process needed! Just:
1. Edit files in 08_interactive_reader/
2. Open HTML in browser
3. Press F5 to reload
4. Use browser console for debugging (F12)

## Git Workflow

```bash
# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "Your message here"

# View history
git log --oneline -10
```

## Subscription Tiers

- **Free**: Basic story reading
- **Premium**: Edit mode, reviews, exports
- **Master**: All features + collaboration

Implemented in: `platform-system.js`

## Key Concepts

- **Classes**: Each interface is a class (OOP pattern)
- **localStorage**: Persists user data between sessions
- **Markdown**: Manuscripts stored as .md files
- **JSON**: Metadata and configuration
- **Vanilla JS**: No frameworks, pure JavaScript
- **CSS Variables**: Theme system is fully customizable

## Important Notes

- No living-codex/ folder in current version (that's old)
- Active development in KILNUniverse/ only
- All paths are relative (can work offline)
- Test responsiveness on mobile/tablet
- Git is on main branch

## Quick Links to Main Files

**To start**:
```
/home/matt/projects/DProjects/FDUniverse/KILNUniverse/_graphic_novel/08_interactive_reader/consciousness-codex-title.html
```

**To edit stories**:
```
/home/matt/projects/DProjects/FDUniverse/KILNUniverse/_manuscripts/[STORY_NAME]/
```

**To change styling**:
```
/home/matt/projects/DProjects/FDUniverse/KILNUniverse/_graphic_novel/08_interactive_reader/styles.css
```

**To modify data loading**:
```
/home/matt/projects/DProjects/FDUniverse/KILNUniverse/_graphic_novel/08_interactive_reader/chapter-data.json
```

## File Size Limits

- Most JS files: 15-80KB
- Most CSS files: 14-56KB
- HTML files: 5-20KB
- Total codebase: ~330KB (manageable)

## Performance Tips

- Images lazy-load with placeholders
- CSS animations use transforms (GPU accelerated)
- localStorage is async-safe
- URL parameters avoid full page reloads
- Mobile-first responsive design

---

**Last Updated**: Based on Oct 24, 2025 codebase
**Status**: Active development on main branch
**No external dependencies**: Fully vanilla JavaScript
