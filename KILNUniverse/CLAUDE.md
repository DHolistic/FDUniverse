# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KILNUniverse is a multi-media speculative fiction project centered on sentient ceramic beings in a universe controlled by an authoritarian entity called the Kiln. The project encompasses:

- A 5-book narrative series exploring consciousness, freedom, and transformation
- Graphic novel adaptations with professional production standards
- Interactive web-based reading platform (active development)
- Physical book designs with UV ink, tactile elements, and spine riddles
- Extensive world-building with canonical reference systems

## Development Commands

### Interactive Reader Platform (Primary Active Development)

**Location**: `_graphic_novel/08_interactive_reader/`

**Run Development Server**:
```powershell
# From the interactive_reader directory
.\open.ps1
```
Or open `consciousness-codex-title.html` directly in a browser.

**Development Sandbox**:
```bash
# Quick prototyping environment
cd _db_attempt
# Open HTML files directly in browser for testing
```

**No Build Process**: Pure HTML/CSS/JavaScript - no compilation or build steps required.

### Version Control

**Current Branch**: `main`

**Common Git Workflow**:
```bash
git status                    # Check current changes
git add .                     # Stage changes
git commit -m "description"   # Commit with message
git log --oneline -10        # View recent commits
```

## Code Architecture

### Interactive Reader Platform

**Technology Stack**:
- Vanilla JavaScript (no frameworks)
- CSS3 with custom properties
- HTML5 semantic markup
- Local storage for persistence

**Key Components**:

1. **Title Screen System** (`consciousness-codex-title.*`)
   - Entry point for the interactive platform
   - Story selection interface with three cards:
     - "The First Void" (16 chapters)
     - "The Translator's Burden" (12 chapters)
     - "KILN Codex" (12 panels)
   - Sacred geometry animations and glyph systems
   - View/Edit mode toggles

2. **Grid Layout System** (`kiln-grid-controller.js`, `kiln-grid-layout.css`)
   - Sophisticated grid-based comic panel arrangement
   - Responsive design for mobile/tablet/desktop
   - Professional graphic novel formatting
   - Multiple layout variants (check git history for iterations)

3. **Story Interfaces** (New Development)
   - `story-view.html` - Reading interface
   - `story-edit.html` - Annotation/editing interface

**Architecture Pattern**:
```javascript
// Class-based component structure
class ConsciousnessCodexTitle {
    constructor() {
        this.initializeElements();
        this.attachEventListeners();
        this.loadStoryData();
    }

    // Event-driven interactions
    // localStorage for state persistence
    // JSON for data management
}
```

**CSS Organization**:
- CSS custom properties for theming
- Component-scoped styles
- Animation/transition libraries
- Responsive breakpoints

**Color System** (CSS Variables):
```css
--consciousness-blue: #4A90E2    /* Consciousness/awareness */
--authority-red: #E74C3C          /* Kiln control/authority */
--transformation-gold: #F39C12    /* Change/evolution */
--ceramic-cream: #F5F5DC          /* Clay base */
--clay-brown: #8B4513             /* Earth tones */
--kiln-dark: #2C1810              /* Dark backgrounds */
```

**Typography**:
- Headers: Cinzel (serif, elegant)
- Body: Crimson Text (serif, readable)
- Loaded via Google Fonts

## Repository Structure

### Content Directories

**`_manuscripts/`** - Complete story manuscripts
- 5 main book directories (Book 1-5)
- Prequel: `THE_TRANSLATORS_BURDEN/`
- Origin story: `THE_FIRST_VOID/`
- Use markdown format for all writing

**`_graphic_novel/`** - Production pipeline (7 phases + interactive)
- `01_manuscript/` - Scripts and story content
- `02_character_references/` - Character bio cards with AI prompts
- `03_world_maps/` - Environmental references
- `04_style_guides/` - Visual consistency guidelines
- `05_production_assets/` - Assembly workflows
- `06_generated_panels/` - AI-generated comic panels
- `07_final_assembly/` - Print-ready files
- `08_interactive_reader/` - Web platform (ACTIVE DEVELOPMENT)

**`_canonical_foundation/`** - Authoritative universe references
- `CANONICAL_KILN_UNIVERSE_FOUNDATION.md` - Master reference (v5.0)
- `CANONICAL_CHARACTER_NAMES_LOCKED.md` - Character naming authority
- Always check these before making changes to universe content

**`_references/`** - Story bible and development guides
- `THE KILN CODEX- STORY MASTER DOC V1.md` - PRIMARY STORY BIBLE (use this first)
- Complete series overview and plot arcs

**`_world_building/`** - Cultural and geographic systems
- Regional consciousness systems (5 pathways)
- Social structures and daily life
- Maps and timeline documentation

**`_production/`** - Production coordination
- Physical book specifications
- Visual style guides
- AI generation prompts (DALL-E 3)
- Business model documentation

**`_sacred_texts/`** - Canonical narratives
- Heretic Codex (philosophy)
- Kiln Codex manuscripts (English + Glyphs)
- Three-language glyph system

**`_archive/`** - Historical versions
- Superseded manuscripts
- Development conversation logs
- Production concept evolution

## Essential Reference Files

### Must-Read Before Making Content Changes

1. **`_references/THE KILN CODEX- STORY MASTER DOC V1.md`**
   - Core narrative mechanics and character arcs
   - All plot developments across 5 books
   - Production notes and design specs

2. **`_canonical_foundation/CANONICAL_KILN_UNIVERSE_FOUNDATION.md`**
   - Timeline system (BF/AF eras)
   - Character system documentation
   - Visual and landscape standards

3. **`_references/KILN_CANONICAL_CHARACTER_NAMES.md`**
   - Authoritative character naming
   - Prevents conflicts and inconsistencies

### Quick Reference Guides

4. **`_implementation_logs/KILN_QUICK_START_GUIDE.md`**
   - Manuscript locations and status
   - Writer's workflow guide

5. **`_graphic_novel/README.md`**
   - Production pipeline explanation
   - Consistency checklist

## Universe Core Concepts

### The Kiln's Laws (Designed to Be Broken)
1. Recycled Clay: "Nothing new can be made—only reused"
2. Perfect Firing: "All stories must be smoothed of flaws"
3. Whispered Obeyance: "To reshape others, you must silence yourself"

### 60/30/10 Universal Ratio
Key mechanic that shifts across eras:
- **Original Era**: 60% Flow, 30% Structure, 10% Mystery
- **Kiln Control**: 60% Control, 30% Silence, 10% Efficiency
- **Awakening Era**: 60% Questioning, 30% Exploration, 10% Courage
- **New Codex**: 60% Wisdom, 30% Flexibility, 10% Evolution

Visual: |||| )) ⚡ (Memory/Silence/Hunger)

### Timeline System
- **BF Era**: Before Firing (original consciousness evolution)
- **1-847 AF**: The Great Harm (suffering and protection)
- **848-2,847 AF**: Kiln Control (rigid systems)
- **2,848-2,854 AF**: The Awakening (consciousness rediscovery)
- **2,855+ AF**: New Codex (wisdom integration)

### Three Glyph Systems
- **Authority/Orthodox**: ⊿⊡⊥⊢⊤
- **Consciousness/Heretic**: 〰◦◉∿◈
- **Transformation/Tideforge**: ┤├┬┴┼

### Ten-Character Consciousness Cycle
Main archetypes: Aude (The Unfired), The Scribe, Ruin (The Thrown Vessel), Enforcer VII, Glaze-Eyed Seer, Salt-Singers, Slip, The Kiln Entity, Recycling Foundry Workers, Scribe Territories Collective

## Development Patterns and Best Practices

### Interactive Reader Development

**File Modification Pattern**:
- Always test changes in browser before committing
- Check responsive behavior (mobile/tablet/desktop)
- Validate keyboard navigation still works
- Ensure localStorage persistence functions

**CSS Changes**:
- Use CSS custom properties for colors and spacing
- Maintain existing animation performance
- Keep responsive breakpoints consistent
- Test backdrop filters and blend modes across browsers

**JavaScript Changes**:
- Maintain class-based architecture
- Keep event listeners centralized
- Use localStorage for state (check existing patterns)
- Handle keyboard shortcuts consistently

**Grid System Updates**:
- Multiple layout variants exist (check git history)
- Test panel arrangements at different viewport sizes
- Maintain professional comic formatting standards

### Content Development

**Manuscript Writing**:
1. Check `CANONICAL_CHARACTER_NAMES.md` for proper names
2. Reference Story Master Doc for plot consistency
3. Use markdown format
4. Track chapter completion in TODO lists

**Graphic Novel Production**:
1. Follow 7-phase pipeline structure
2. Use DALL-E 3 prompts from production guides
3. Maintain visual style guide compliance
4. Check character reference sheets for consistency

**Documentation Updates**:
- Use markdown format
- Cross-reference related documents
- Update version numbers on major changes
- Add status indicators (Complete/In Progress)

### Quality Standards

**Character Consistency**:
- Verify names against canonical reference
- Check visual descriptions in character references
- Maintain personality traits across books

**Visual Consistency**:
- Clay/ceramic textures on all surfaces
- Energy color system: Blue (consciousness), Red (authority), Gold (transformation)
- Warm earthy lighting with energy accents

**Code Quality**:
- Vanilla JavaScript (no external dependencies)
- Semantic HTML5 markup
- Accessible design patterns
- Performant animations (use CSS transforms)

## Current Development Status

**Active Work** (as of git status):
- Interactive reader grid layout refinement
- Title screen UI enhancements
- Story view/edit interface development

**Modified Files**:
- `consciousness-codex-title.css/html/js` - Core title screen
- `kiln-grid-controller.js` - Grid system
- `kiln-grid-layout.css` - Layout styling

**New Features**:
- `story-edit.html` - Editing interface
- `story-view.html` - Reading interface
- `_db_attempt/` - Development sandbox

**Recent Focus Areas**:
- Grid layout CSS optimization
- Page content updates
- File organization

## Business Context

The interactive platform follows a three-tier subscription model:
- Clay Reader (Free) - Preview access
- Consciousness Keeper ($9.99/mo) - Full library + tools
- Kiln Master ($19.99/mo) - AI features + collaboration

Revenue projections: $31,200+ annually (Year 1)

## Additional Notes

- No external JavaScript frameworks - keep it vanilla
- Physical book production includes UV ink and tactile elements
- Spine riddle system forms image when books shelved together
- Project is Windows-based (PowerShell scripts)
- Version control via git on main branch
