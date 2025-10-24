# FDUniverse Project - Comprehensive Overview

## Project Structure Summary

The FDUniverse project is organized under `/home/matt/projects/DProjects/FDUniverse/` with three main folders:

1. **FDUniverse/** - Original manuscript documentation (reference material)
2. **KILNUniverse/** - ACTIVE DEVELOPMENT (primary working directory)
3. **living-codex/** - Earlier iteration (not current version)

The currently active development is in **KILNUniverse**.

---

## 1. HTML Entry Points

### Primary Entry Points:

**Main Location:** `/home/matt/projects/DProjects/FDUniverse/KILNUniverse/_graphic_novel/08_interactive_reader/`

#### Core HTML Files:

1. **consciousness-codex-title.html** (Main Title Screen)
   - Path: `08_interactive_reader/consciousness-codex-title.html`
   - Purpose: Entry point for the interactive platform
   - Features: Story selection with three story cards
   - Story options: "The First Void", "The Translator's Burden", "KILN Codex"
   - Contains: Loading screen, hero cover art, story selection menu
   - Integrated with: Account/auth system (Sign in/out buttons)
   - Fullscreen support via ⛶ button
   - Home mode button (⌂) for navigation

2. **index.html** (Basic Interactive Reader)
   - Path: `08_interactive_reader/index.html`
   - Purpose: Simple graphic novel reader
   - Layout: Image display (left) + Text content (right)
   - Features: Scene navigation, edit mode, keyboard shortcuts
   - Chapter navigation sidebar with toggle button

3. **horizontal-reader.html** (Horizontal Scrolling Reader)
   - Path: `08_interactive_reader/horizontal-reader.html`
   - Purpose: Long-form horizontal scrolling experience
   - Implementation: Chapter panels load from markdown files
   - Navigation: Arrow keys for horizontal scrolling, next/previous chapter buttons
   - Progress tracking: Panel indicators and chapter info
   - Touch gesture support for mobile

4. **story-view.html** (Story Viewing Interface)
   - Path: `08_interactive_reader/story-view.html`
   - Purpose: Read-only story interface
   - Designed for: Content consumption
   - Integrates with: Story selector, chapter navigation

5. **story-edit.html** (Annotation/Editing Interface)
   - Path: `08_interactive_reader/story-edit.html`
   - Purpose: Edit and annotate story content
   - Features: Inline editing, note-taking capability
   - Integration: Automatic save to localStorage

6. **kiln-grid-index.html** (Comic Panel Grid Layout)
   - Path: `08_interactive_reader/kiln-grid-index.html`
   - Purpose: Professional comic book panel arrangement
   - Features: Responsive grid system for panels
   - Multiple layout variants available (git history shows 4+ versions)

7. **enhanced-index.html** (Enhanced Platform Interface)
   - Path: `08_interactive_reader/enhanced-index.html`
   - Purpose: Premium features interface
   - Features: Multi-story support, subscription tier display
   - Integration: Review system, account management

---

## 2. JavaScript Files

### Location: `/home/matt/projects/DProjects/FDUniverse/KILNUniverse/_graphic_novel/08_interactive_reader/`

#### Core JavaScript Files:

1. **consciousness-codex-title.js** (Title Screen Controller)
   - Manages: Title screen animations, story selection, account integration
   - Features: Loading screen management, glyph animations, sacred geometry
   - Loads: Chapter data from JSON
   - Handles: Navigation to story views with URL parameters
   - Size: ~18KB

2. **horizontal-reader.js** (Horizontal Reader Controller)
   - Class: `HorizontalReader`
   - Manages: Chapter panel loading and horizontal scrolling
   - Features: Markdown-based chapter loading, touch gesture tracking
   - Keyboard navigation: Arrow keys for movement
   - Functions: 
     - `loadChapterPanels()` - Loads panels from markdown
     - `createPanel()` - Creates panel DOM elements
     - `updateNavigationButtons()` - Updates chapter navigation
   - Size: ~24KB
   - Special: Scroll hint display for Chapter 1

3. **script.js** (Main Reader Logic)
   - Class: `GraphicNovelReader`
   - Manages: Scene display, image navigation, edit mode
   - Features: 
     - Scene progression (next/previous)
     - Image switching within scenes
     - Edit mode toggle
     - Note-taking system (localStorage backed)
   - Keyboard shortcuts:
     - `←` `→` - Navigate scenes
     - `↑` `↓` - Navigate images
     - `Space` - Next scene
     - `E` - Toggle edit mode
     - `F` - Toggle fullscreen
     - `H` - Show/hide keyboard help
   - Size: ~20KB

4. **enhanced-reader.js** (Enhanced Platform Features)
   - Class: `EnhancedGraphicNovelReader`
   - Extends: Basic GraphicNovelReader with platform features
   - Features:
     - Multi-story support with story selector
     - Subscription tier management
     - Review mode for premium users
     - Upgrade prompts for free users
   - Integrations: `EnhancedManuscriptLoader`, `ReviewSystem`, `KilnUniversePlatform`
   - Size: ~40KB

5. **manuscript-loader.js** (Content Loading System)
   - Class: `ManuscriptLoader`
   - Functions:
     - `loadManuscriptData()` - Load manuscript structure
     - `parseManuscriptContent()` - Parse markdown content
   - Data structure: Scene objects with:
     - `id`, `chapter`, `title`, `type`
     - `story`, `description`, `images`
     - `dallePrompt`, `soundEffects`, `speechBubbles`
   - Size: ~15KB

6. **enhanced-manuscript-loader.js** (Advanced Content Loading)
   - Class: `EnhancedManuscriptLoader`
   - Features:
     - Multi-manuscript support
     - Chapter data caching
     - Story tier management
   - Size: ~19KB

7. **markdown-loader.js** (Markdown File Parser)
   - Class: `MarkdownLoader`
   - Functions:
     - `loadChapterData()` - Load chapter.json
     - `loadChapter()` - Parse markdown chapter files
   - Handles: Panel extraction from markdown
   - Size: ~10KB

8. **header-controls.js** (Header Navigation Controller)
   - Functions:
     - `goHome()` - Navigate to title screen
     - `toggleFullscreen()` - Fullscreen toggle
     - `createAccountUI()` - Build account menu
   - Features: Home button navigation, fullscreen support, account management
   - Size: ~7KB

9. **kiln-grid-controller.js** (Comic Grid Layout Manager)
   - Class: `KilnGridController`
   - Manages: Professional comic panel layouts
   - Features: 
     - Responsive grid arrangement
     - Panel size calculation
     - Layout variant switching
   - Size: ~77KB (largest controller file)

10. **platform-system.js** (Platform & Account Management)
    - Class: `KilnUniversePlatform`
    - Features:
      - User authentication
      - Subscription tier management
      - Access control (free, premium, master tiers)
    - Size: ~17KB

---

## 3. CSS Files and Styling

### Location: `/home/matt/projects/DProjects/FDUniverse/KILNUniverse/_graphic_novel/08_interactive_reader/`

#### CSS Files (12 total):

1. **consciousness-codex-title.css** (Title Screen Styling)
   - Features: Loading screen animations, title screen layout
   - Animations: Consciousness awakening pulse, progress bar flow
   - Responsive design for story selection cards
   - Size: ~21KB

2. **consciousness-codex-overrides.css** (Title Screen Overrides)
   - Purpose: Additional styling for title screen
   - Customizations: Theme overrides, layout adjustments
   - Size: ~737 bytes

3. **horizontal-reader.css** (Horizontal Reader Styling)
   - Features: Horizontal scroll layout, panel styling
   - Panel design: Professional comic book formatting
   - Navigation buttons and progress indicators
   - Size: ~18KB

4. **enhanced-styles.css** (Platform Enhancement Styling)
   - Features: Multi-story dropdown, review panel styling
   - Upgrade prompts and premium feature indicators
   - Size: ~22KB

5. **styles.css** (Main Reader Styling)
   - Features: Two-column layout (image + text)
   - Components:
     - Image container with navigation
     - Text content area with scene description
     - Chapter navigation sidebar
     - Edit mode overlay
     - Keyboard shortcuts help panel
   - Responsive breakpoints for mobile/tablet/desktop
   - Size: ~14KB

6. **kiln-grid-layout.css** (Main Grid Layout Stylesheet)
   - Features: Professional comic panel arrangements
   - Multiple layout variants support
   - Responsive grid system
   - Size: ~56KB

7. **kiln-grid-layout.*.css** (Layout Variants)
   - Files: 
     - `kiln-grid-layout.11d3ee7.css` (55KB)
     - `kiln-grid-layout.30c9c70.css` (44KB)
     - `kiln-grid-layout.92a65f2.css` (46KB)
     - `kiln-grid-layout.aa83fa1.css` (35KB)
   - Purpose: Different panel layout configurations
   - Used for: A/B testing and responsive variations

### Color System (CSS Variables):

```css
--consciousness-blue: #4A90E2;    /* Consciousness/awareness */
--authority-red: #E74C3C;          /* Kiln control/authority */
--transformation-gold: #F39C12;   /* Change/evolution */
--ceramic-cream: #F5F5DC;         /* Light text/background */
--clay-brown: #8B4513;             /* Earth tones */
--kiln-dark: #2C1810;              /* Dark backgrounds */
--moisture-cyan: #17A2B8;          /* Special effects */
```

### Typography:

- **Title Font**: `Cinzel` (serif, elegant) - Google Fonts
- **Body Font**: `Crimson Text` (serif, readable) - Google Fonts
- **Transition Speed**: 0.8s cubic-bezier(0.4, 0, 0.2, 1)
- **Sacred Ease**: cubic-bezier(0.23, 1, 0.32, 1)

### Key CSS Patterns:

- CSS custom properties for theming
- Backdrop filter blur effects
- Flex and grid layouts for responsiveness
- Smooth transitions on all interactive elements
- Animation keyframes for loading and consciousness effects
- Mobile-first responsive design

---

## 4. Chapter Data Structure

### Primary Data File:

**Location**: `/home/matt/projects/DProjects/FDUniverse/KILNUniverse/_graphic_novel/08_interactive_reader/chapter-data.json`

**Structure**:
```json
{
  "story-id": {
    "id": "first-void",
    "title": "The First Void",
    "subtitle": "Consciousness Origin",
    "totalChapters": 16,
    "colorTheme": "consciousness",
    "coverArt": "path/to/image.png",
    "chapters": [
      {
        "number": 1,
        "title": "The Simply Is",
        "subtitle": "Opening Chapter",
        "markdownPath": "../../_manuscripts/PATH/CHAPTER.md",
        "backgroundImage": "path/to/bg.png"
      }
    ]
  }
}
```

**Story Collections**:

1. **The First Void** (16 chapters)
   - ID: `first-void`
   - Theme: Consciousness origin/awakening
   - Color theme: Blue (consciousness)
   - Manuscripts path: `_manuscripts/THE_FIRST_VOID/chapters/`
   - Chapter files: `FIRST_VOID_CHAPTER_01_DRAFT.md` through `FIRST_VOID_CHAPTER_16_DRAFT.md`

2. **The Translator's Burden** (12+ chapters)
   - ID: `translators-burden`
   - Manuscripts path: `_manuscripts/THE_TRANSLATORS_BURDEN/`
   - Includes visual design and animation pilots

3. **KILN Codex** (12 panels)
   - ID: `kiln-codex`
   - Format: Graphic novel panels
   - Integrates with: Grid layout system

### Additional Data Files:

**chapter-data.local.json** (Empty Template)
- Location: `_graphic_novel/08_interactive_reader/` and `_manuscripts/`
- Purpose: Local chapter data override
- Status: Currently empty, awaiting implementation

**Manuscript Structure**:
- Location: `/home/matt/projects/DProjects/FDUniverse/KILNUniverse/_manuscripts/`
- Structure:
  - `manuscript_sources/` - Raw manuscript content
  - `KILN_BOOK_1_THE_FIRST_CRACK/` - Book 1 manuscript
  - `KILN_BOOK_2_THE_DRIPPING_REBELLION/` - Book 2
  - ... (Books 3-5)
  - `THE_TRANSLATORS_BURDEN/` - Prequel novel
  - `series_planning/` - Series planning documents

### Scene/Panel Data Format:

Scene objects contain:
- `id`: Unique scene identifier
- `chapter`: Chapter assignment
- `title`: Scene title
- `type`: Scene type (Opening, Revelation, Conflict, etc.)
- `panelInfo`: Panel position info ("Panel 1 of 4")
- `page`: Page number
- `story`: Story text/narrative (HTML)
- `description`: Scene description (for DALL-E prompts)
- `images`: Array of image filenames
- `dallePrompt`: DALL-E 3 generation prompt
- `soundEffects`: Array of sound effect labels
- `speechBubbles`: Array of dialogue objects with:
  - `type`: (thought, dialogue, system, kiln)
  - `text`: Bubble content
  - `character`: Speaker

---

## 5. Image Assets

### Primary Image Locations:

1. **Generated Panels**
   - Path: `/home/matt/projects/DProjects/FDUniverse/KILNUniverse/_graphic_novel/06_generated_panels/`
   - Current panels:
     - `Scene 1A - Aude Defience.png`
     - `Static Scene 1A - B.png`
     - `Static Scene 1A C.png`
   - Status: Initial panel set (expanded as project continues)

2. **Canonical Imagery**
   - Path: `/home/matt/projects/DProjects/FDUniverse/KILNUniverse/_canonical_imagery/`
   - Subdirectories:
     - `01_landscape_foundation/` - Landscape reference images
     - `_canonical_prequel/` - Prequel visual references
   - Usage: Cover art, background images, visual references

3. **Character Images**
   - Path: `/home/matt/projects/DProjects/FDUniverse/Images/Characters/`
   - Organization: By story (THE_FIRST_VOID, etc.)
   - Content: Character reference sheets and visual designs

4. **Visual Design Assets**
   - Paths:
     - `_graphic_novel/01_manuscript/*/visual_design/`
     - `_manuscripts/*/visual_design/`
     - `_manuscripts/*/visual_design/assets/`
   - Purpose: Style guides, animation references

5. **Cover Art**
   - Path: `/home/matt/projects/DProjects/FDUniverse/KILNUniverse/Images/Cover art/`
   - Purpose: Book covers and title screen artwork

### Image Loading Implementation:

**In HTML**: 
```html
<img src="../../_canonical_imagery/01_landscape_foundation/LANDSCAPE_2850AF_AudeAwakening_Systems_Shattering_v1.0.png" alt="Cover art" />
```

**In JavaScript**:
- Path referenced through chapter-data.json
- Dynamic loading via `loadChapterPanels()`
- Fallback placeholder if image missing (🎨 icon)
- Fade transition effects on load

---

## 6. Project Organization & Key Directories

### Directory Structure:

```
/home/matt/projects/DProjects/FDUniverse/KILNUniverse/
├── _graphic_novel/                    # Main interactive platform
│   ├── 01_manuscript/                 # Scripts and content
│   ├── 02_character_references/       # Character bio cards
│   ├── 03_world_maps/                 # Environmental references
│   ├── 04_style_guides/               # Visual consistency guides
│   ├── 05_production_assets/          # Assembly workflows
│   ├── 06_generated_panels/           # AI-generated comic panels
│   ├── 07_final_assembly/             # Print-ready files
│   └── 08_interactive_reader/         # WEB PLATFORM (ACTIVE)
│       ├── *.html                     # Entry points
│       ├── *.js                       # Controllers/loaders
│       ├── *.css                      # Styling
│       ├── chapter-data.json          # Story metadata
│       ├── sandbox/                   # Development testing
│       └── README.md                  # Documentation
├── _manuscripts/                      # Story content
│   ├── manuscript_sources/            # Raw manuscripts
│   ├── KILN_BOOK_1-5/                 # Main book series
│   ├── THE_TRANSLATORS_BURDEN/        # Prequel novel
│   └── series_planning/               # Story planning
├── _canonical_imagery/                # Authoritative art assets
│   ├── 01_landscape_foundation/
│   ├── _canonical_prequel/
│   └── _canonical_imagery/
├── _canonical_foundation/             # Authoritative references
│   └── CANONICAL_*.md                 # Universe rules (locked)
├── _production/                       # Production coordination
│   ├── generation_prompts/            # DALL-E 3 prompts
│   └── landscape_specifications/      # Visual specs
├── _references/                       # Story bible & guides
│   └── THE KILN CODEX- STORY MASTER DOC V1.md
├── _world_building/                   # Cultural systems
├── _sacred_texts/                     # Canonical narratives
├── _archive/                          # Historical versions
├── Images/                            # Character/cover art
├── tools/                             # Utility scripts
├── chapter-data.local.json            # Local data (empty)
└── CLAUDE.md                          # Development guidance

```

### Key Reference Documents:

1. **CLAUDE.md** 
   - Path: `/home/matt/projects/DProjects/FDUniverse/KILNUniverse/CLAUDE.md`
   - Purpose: Development guidance for Claude Code
   - Content: Architecture, commands, standards, business model

2. **Story Bible** (`_references/`)
   - File: `THE KILN CODEX- STORY MASTER DOC V1.md`
   - Content: Complete narrative mechanics, character arcs, plot outline

3. **Canonical Foundation** (`_canonical_foundation/`)
   - Files: 
     - `CANONICAL_KILN_UNIVERSE_FOUNDATION.md` (v5.0)
     - `CANONICAL_CHARACTER_NAMES_LOCKED.md`
   - Status: Locked reference (check before content changes)

---

## 7. Current Implementation Overview

### Active Components:

#### 1. **Title Screen System** (consciousness-codex-title.*)
- Entry point for the platform
- Story selection with three cards
- Sacred geometry animations with glyphs
- Account/authentication UI
- Loading screen with progress bar
- Fullscreen and home mode buttons

#### 2. **Horizontal Reader** (horizontal-reader.*)
- Long-form scrolling interface
- Markdown-based chapter loading
- Chapter panel system with progress tracking
- Touch gesture support
- Keyboard navigation (arrow keys)
- Scroll hint on Chapter 1

#### 3. **Grid Layout System** (kiln-grid-controller.js, kiln-grid-layout.css)
- Professional comic book panel arrangement
- Responsive grid-based layout
- Multiple layout variants
- Mobile/tablet/desktop optimization

#### 4. **Story View/Edit System** (story-view.html, story-edit.html)
- Read-only and editable story interfaces
- Related to enhanced reader system
- Integrates with localStorage persistence

#### 5. **Platform Features**
- Account system (Sign in/out)
- Subscription tier management (Free, Premium, Master)
- Multi-story support with selector dropdown
- Review mode for premium users
- Upgrade prompts for free users

### Keyboard Navigation:

| Key | Function |
|-----|----------|
| `←` `→` | Navigate between scenes/chapters |
| `↑` `↓` | Navigate between images in scene |
| `Space` | Next scene/panel |
| `E` | Toggle edit mode |
| `F` | Toggle fullscreen |
| `H` | Show/hide keyboard shortcuts |
| `Esc` | Exit edit mode or close help |

### Data Persistence:

- **localStorage**: Notes, edit state, user preferences
- **sessionStorage**: Navigation state (preferred home page)
- **URL Parameters**: Story ID, chapter number, scene reference
- **JSON Files**: Story metadata, chapter data

### Browser Compatibility:

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+
- Requires: JavaScript enabled, local file access (for development)

---

## 8. Technology Stack

### Frontend:
- **HTML5**: Semantic markup, data attributes
- **CSS3**: Custom properties, flexbox, grid, animations
- **JavaScript**: Vanilla ES6+ (no frameworks)
- **Fonts**: Google Fonts (Cinzel, Crimson Text)

### Architecture:
- Class-based components (OOP pattern)
- Event-driven interactions
- localStorage for persistence
- JSON for data management
- Markdown for manuscript content

### Development:
- No build process required
- Pure HTML/CSS/JavaScript
- Direct file editing and browser testing
- Git version control
- Windows PowerShell scripts for automation

---

## 9. File Sizes Summary

| Component | Size |
|-----------|------|
| consciousness-codex-title.js | ~18KB |
| kiln-grid-controller.js | ~77KB |
| enhanced-reader.js | ~40KB |
| horizontal-reader.js | ~24KB |
| script.js | ~20KB |
| kiln-grid-layout.css | ~56KB |
| consciousness-codex-title.css | ~21KB |
| enhanced-styles.css | ~22KB |
| horizontal-reader.css | ~18KB |
| styles.css | ~14KB |

**Total JS (core files)**: ~200KB
**Total CSS (core files)**: ~130KB

---

## 10. Development Status

### Current Branch: `main`

### Recent Commits:
- Refactor chapter titles and structure in "THE FIRST VOID" manuscript
- Script and nav edits
- Story cache fix
- Navigation and story board edit
- Expanded chapter and navigation updates

### In-Progress/Planned:
- Grid layout CSS optimization
- Page content updates
- File organization
- Story view/edit interface development
- Animation system enhancements

### Untracked Files (Not in Repository):
- `/home/matt/projects/DProjects/FDUniverse/living-codex/` (previous version)
- `/home/matt/projects/DProjects/FDUniverse/opencodetmp/` (temporary)

---

## 11. Deployment & Hosting

### Running the Application:

**Method 1: Direct Browser Opening**
```
Open: consciousness-codex-title.html
Location: KILNUniverse/_graphic_novel/08_interactive_reader/
```

**Method 2: PowerShell (Windows)**
```powershell
# From interactive_reader directory
.\open.ps1
```

**Method 3: Development Server** (for enhanced features)
```bash
# Serves from _graphic_novel/08_interactive_reader/
# Enables markdown file loading from relative paths
```

### File Structure Notes:
- Self-contained HTML, CSS, JS in single directory
- Relative paths for images and data files
- No external API dependencies
- Can work offline once loaded

---

## Summary

The FDUniverse/KILNUniverse project is a **sophisticated interactive platform** for presenting a multi-media graphic novel and story experience. It combines:

- **Professional UI** with title screen, story selection, and reading interfaces
- **Flexible Navigation** supporting horizontal scrolling, scene progression, and grid-based comic layouts
- **Rich Content System** with markdown-based manuscripts, image galleries, and metadata
- **Platform Features** including account management, subscription tiers, and review systems
- **Responsive Design** working across desktop, tablet, and mobile devices
- **Zero External Dependencies** - pure vanilla JavaScript implementation

The platform is actively being developed, with recent focus on refactoring chapter structures, improving grid layouts, and enhancing the story viewing/editing interfaces.

