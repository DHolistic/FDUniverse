# FDUniverse Project Documentation Index

Welcome! This folder contains complete documentation of the FDUniverse/KILNUniverse interactive platform.

## Documentation Files

### 1. EXPLORATION_SUMMARY.md (Start Here!)
**Quick overview of the entire exploration**
- Key findings summary
- File statistics
- Quick answers to all questions
- Development status
- How to use the other documents

**Best for**: Getting a 5-minute understanding of the project

### 2. QUICK_REFERENCE.md (Developer's Handbook)
**Fast lookup guide for common tasks**
- Quick navigation to all files
- Tables of key files and their purposes
- Keyboard shortcuts
- Color palette reference
- Code snippets and examples
- Git workflow examples

**Best for**: Day-to-day development work

### 3. ARCHITECTURE_MAP.txt (Visual Overview)
**ASCII diagram showing system structure**
- Entry point flow diagram
- Component relationships
- Data source connections
- Styling system overview
- JavaScript architecture
- Feature tier breakdown

**Best for**: Understanding how components connect

### 4. PROJECT_STRUCTURE_OVERVIEW.md (Comprehensive Reference)
**Complete detailed documentation**
- Full breakdown of all 7 HTML files
- Description of 10 JavaScript controllers
- Analysis of 12 CSS files
- Chapter data structures
- Image asset organization
- Directory structure with 40+ paths
- Technology stack details
- Browser compatibility

**Best for**: Deep dives and reference lookups

---

## Quick Navigation

### Need to understand...

**What is this project?**
→ Read: EXPLORATION_SUMMARY.md (first 2 sections)

**Where is the main entry point?**
→ Look: QUICK_REFERENCE.md → Quick Navigation section

**How do the files connect?**
→ Check: ARCHITECTURE_MAP.txt

**What does each file do?**
→ Study: PROJECT_STRUCTURE_OVERVIEW.md

**Where is [specific file]?**
→ Use: QUICK_REFERENCE.md → Key File Locations section

**How to add a new chapter?**
→ Find: QUICK_REFERENCE.md → Common Tasks section

**What keyboard shortcuts exist?**
→ See: QUICK_REFERENCE.md → Keyboard Shortcuts section

**What's the color system?**
→ Check: QUICK_REFERENCE.md → Color Palette section

---

## File Summary

| File | Size | Purpose | Audience |
|------|------|---------|----------|
| EXPLORATION_SUMMARY.md | 9KB | Overview & summary | Everyone |
| QUICK_REFERENCE.md | 6KB | Developer handbook | Developers |
| ARCHITECTURE_MAP.txt | 6KB | Visual structure | Architects |
| PROJECT_STRUCTURE_OVERVIEW.md | 22KB | Complete reference | Deep divers |

**Total Documentation**: 43KB of clear, organized reference material

---

## Key Facts About This Project

- **Location**: `KILNUniverse/_graphic_novel/08_interactive_reader/`
- **Language**: Vanilla JavaScript (no frameworks)
- **Styling**: CSS3 with custom properties
- **Data**: JSON + Markdown files
- **Entry Point**: `consciousness-codex-title.html`
- **Status**: Active development on `main` branch
- **Total Codebase**: ~650KB

---

## Project Highlights

### 7 Different Reader Interfaces
Each with different layouts and features

### 10 JavaScript Controllers
Clean class-based architecture

### 12 CSS Stylesheets
Fully themeable design system

### 3 Story Collections
With 16-40 chapters each

### No External Dependencies
Pure vanilla JavaScript - no npm, no frameworks

### Responsive Design
Works on desktop, tablet, and mobile

### Multi-Tier Subscription System
Free, Premium, and Master tiers

### Professional UI/UX
Account management, keyboard navigation, fullscreen support

---

## Most Important Files

If you can only look at a few files, start with:

1. `/KILNUniverse/_graphic_novel/08_interactive_reader/consciousness-codex-title.html`
   - Main entry point

2. `/KILNUniverse/_graphic_novel/08_interactive_reader/chapter-data.json`
   - Story metadata

3. `/KILNUniverse/_graphic_novel/08_interactive_reader/consciousness-codex-title.js`
   - Main controller

4. `/KILNUniverse/_graphic_novel/08_interactive_reader/consciousness-codex-title.css`
   - Styling system

---

## Common Development Tasks

### Add a new story chapter
1. Create markdown file in `_manuscripts/[STORY]/chapters/`
2. Update `chapter-data.json` with reference
3. Test in reader

### Change the color scheme
1. Edit CSS variables in `:root` in any CSS file
2. All components automatically update
3. Test across all pages

### Add a keyboard shortcut
1. Find keyboard event listener in JavaScript file
2. Add new case to key handler
3. Test the shortcut

### Deploy/Run the application
1. Open `consciousness-codex-title.html` in browser
2. Or use development server for markdown loading
3. No build process required

---

## Technology Stack

- HTML5 (semantic markup)
- CSS3 (custom properties, grid, flexbox)
- JavaScript ES6+ (vanilla, no dependencies)
- Google Fonts (Cinzel, Crimson Text)
- Markdown (for manuscripts)
- JSON (for configuration)

---

## Keyboard Shortcuts (Universal)

```
← →    Navigate scenes/chapters
↑ ↓    Navigate images
Space  Next scene
E      Edit mode
F      Fullscreen
H      Help/shortcuts
Esc    Close dialogs
```

---

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

---

## Questions Answered

All six exploration questions are fully documented:

1. ✓ **Main HTML Entry Points** - QUICK_REFERENCE.md section 2
2. ✓ **JavaScript Files** - PROJECT_STRUCTURE_OVERVIEW.md section 2
3. ✓ **CSS Files and Styling** - PROJECT_STRUCTURE_OVERVIEW.md section 3
4. ✓ **Chapter Data Structure** - PROJECT_STRUCTURE_OVERVIEW.md section 4
5. ✓ **Image Assets** - PROJECT_STRUCTURE_OVERVIEW.md section 5
6. ✓ **Project Organization** - PROJECT_STRUCTURE_OVERVIEW.md section 6

---

## Where to Find Things

### To understand the platform
→ ARCHITECTURE_MAP.txt

### To get started developing
→ QUICK_REFERENCE.md

### To understand everything
→ PROJECT_STRUCTURE_OVERVIEW.md

### To get a quick overview
→ EXPLORATION_SUMMARY.md

---

## Development Workflow

### Basic workflow
1. Edit files in `08_interactive_reader/`
2. Open HTML in browser
3. Test changes (F5 to reload)
4. Git commit when done

### Adding content
1. Create manuscript files
2. Update chapter-data.json
3. Add images to `06_generated_panels/`
4. Test in reader

### Debugging
1. Open browser developer tools (F12)
2. Check console for errors
3. Use debugger for step-through
4. Check localStorage in Application tab

---

## File Locations Reference

| Purpose | Location |
|---------|----------|
| Main platform | `_graphic_novel/08_interactive_reader/` |
| Story content | `_manuscripts/` |
| Images | `_graphic_novel/06_generated_panels/` |
| Character refs | `Images/Characters/` |
| Background art | `_canonical_imagery/` |
| Production docs | `_production/` |
| References | `_references/` |

---

## Getting Help

For specific information, search the documentation files:

- **QUICK_REFERENCE.md** - Fastest answers for common questions
- **ARCHITECTURE_MAP.txt** - Visual/structural questions
- **PROJECT_STRUCTURE_OVERVIEW.md** - In-depth details
- **EXPLORATION_SUMMARY.md** - Quick overview and summary

---

## Project Statistics

| Metric | Count |
|--------|-------|
| HTML Files | 7 |
| JavaScript Files | 10 |
| CSS Files | 12 |
| Stories | 3 |
| Total Chapters | 40+ |
| Color Variables | 7 |
| Keyboard Shortcuts | 7 |
| Subscription Tiers | 3 |

---

## Last Updated

**Exploration Date**: October 24, 2025
**Documentation Status**: Complete and comprehensive
**All files reviewed and documented**
**Ready for development**

---

## Notes

- All documentation is in markdown format for easy reading
- No external tools needed to view
- Relative paths shown where applicable
- All file sizes documented
- All code snippets included
- Complete feature list provided

---

## Happy Exploring!

The documentation is designed to answer every question about this project structure and implementation. Start with EXPLORATION_SUMMARY.md for a quick overview, then dive into the other documents as needed.

If you're a developer: QUICK_REFERENCE.md is your go-to guide.
If you're an architect: ARCHITECTURE_MAP.txt shows the system design.
If you need details: PROJECT_STRUCTURE_OVERVIEW.md has everything.

Good luck with your development!

