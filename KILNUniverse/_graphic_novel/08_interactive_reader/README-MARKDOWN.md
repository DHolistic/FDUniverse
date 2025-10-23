# Markdown Chapter System

The horizontal reader now loads chapters directly from your markdown manuscript files!

## How It Works

The system consists of three components:

### 1. **chapter-data.json**
Maps stories and chapters to their markdown files and background images.

```json
{
  "first-void": {
    "chapters": [
      {
        "number": 1,
        "title": "The Simply Is",
        "markdownPath": "../../_manuscripts/THE_FIRST_VOID/chapters/FIRST_VOID_CHAPTER_01_DRAFT.md",
        "backgroundImage": "../../_canonical_imagery/..."
      }
    ]
  }
}
```

### 2. **markdown-loader.js**
Fetches and parses markdown files into horizontal panels.

**Prose Chapters** (The First Void):
- Splits long text into readable chunks (6 paragraphs per panel)
- Each panel becomes a scrollable screen
- Preserves italic formatting

**Script Chapters** (Translator's Burden):
- Parses panel-by-panel structure
- Extracts scenes, captions, and dialogue
- Associates panels with background images

### 3. **horizontal-reader.js**
Displays the parsed panels with horizontal scrolling.

## File Structure

```
_manuscripts/
  THE_FIRST_VOID/
    chapters/
      FIRST_VOID_CHAPTER_01_DRAFT.md
      FIRST_VOID_CHAPTER_02_DRAFT.md
      ...
  THE_TRANSLATORS_BURDEN/
    chapters/
      THE_TRANSLATORS_BURDEN_Chapter_1_Script.md
      Chapter 1 SCENE 1 THE GREAT ARCHIVE.png
      ...

_graphic_novel/
  08_interactive_reader/
    chapter-data.json          ← Chapter mappings
    markdown-loader.js         ← Parser
    horizontal-reader.js       ← Display engine
    horizontal-reader.html     ← Main page
```

## Adding New Chapters

### Step 1: Add the Markdown File
Place your chapter markdown in the appropriate folder:
- The First Void: `_manuscripts/THE_FIRST_VOID/chapters/`
- Translator's Burden: `_manuscripts/THE_TRANSLATORS_BURDEN/chapters/`

### Step 2: Update chapter-data.json

Add entry to the `chapters` array:

```json
{
  "number": 3,
  "title": "Your Chapter Title",
  "subtitle": "Optional subtitle",
  "markdownPath": "../../_manuscripts/YOUR_STORY/chapters/CHAPTER_03.md",
  "backgroundImage": "../../_canonical_imagery/your-image.png"
}
```

### Step 3: Test
Open the horizontal reader:
```
horizontal-reader.html?story=first-void&chapter=3
```

## Markdown Formatting

### Prose Chapters (The First Void)
The parser automatically handles:
- `# Heading` → Chapter title
- `*Italic text*` → `<em>Italic text</em>`
- Paragraph breaks → Separate `<p>` tags
- Splits every 6 paragraphs into a new panel

**Example:**
```markdown
# THE FIRST VOID: CHAPTER 1 - "THE SIMPLY IS"
*Opening Chapter of the Prequel Novel*

---

## **CHAPTER 1: THE SIMPLY IS**

Consciousness existed.

It did not think about existing...
```

### Script Chapters (Translator's Burden)
The parser looks for:
- `## PAGE` → New page/panel
- `### PANEL` → Panel title
- `**CAPTION:**` → Extract caption text
- `**DIALOGUE:**` → Extract dialogue
- `**SETTING:**` → Panel subtitle

**Example:**
```markdown
## 🎨 **PAGE 1: THE GREAT ARCHIVE**

### **PANEL 1** *(Full Page Splash)*
**SETTING:** The Great Archive interior
**CAPTION:** *"Fifteen thousand scribes. One truth."*
**DIALOGUE:** "This is the way..."
```

## Customizing Panel Breaks

### For Prose
Edit `markdown-loader.js:parseProseChapter()`:
```javascript
const panelsPerPage = 6; // Change this number
```

### For Scripts
The parser automatically creates panels from `## PAGE` markers.

## Background Images

Images are specified in `chapter-data.json`:

```json
"backgroundImage": "../../_canonical_imagery/01_landscape_foundation/LANDSCAPE_BF_OriginalCodex_SpiritualPaths_Natural_v1.0.png"
```

**Path is relative to:** `_graphic_novel/08_interactive_reader/`

## Troubleshooting

### Chapter not loading?
1. Check browser console for errors (F12)
2. Verify markdown file path is correct
3. Ensure file exists at the specified path
4. Check for JSON syntax errors in chapter-data.json

### Images not showing?
1. Verify image path is relative to the reader directory
2. Check that image file exists
3. Use forward slashes `/` not backslashes `\`

### Text formatting issues?
1. Check markdown syntax
2. The parser uses simple regex - complex formatting may not work
3. HTML can be used directly in markdown content

## Advanced: Custom Panel Types

You can add custom panel types by modifying `parseProseChapter()` or `parseScriptChapter()`:

```javascript
panels.push({
    type: 'custom-type',  // Add to CSS: .chapter-panel[data-type="custom-type"]
    title: 'Panel Title',
    subtitle: 'Panel Subtitle',
    content: '<p>Your HTML content</p>',
    backgroundImage: 'path/to/image.png'
});
```

Then add CSS styling in `horizontal-reader.css`:
```css
.chapter-panel[data-type="custom-type"] .panel-content {
    /* Your custom styling */
}
```

## Quick Reference

| Component | Purpose |
|-----------|---------|
| `chapter-data.json` | Maps chapters to markdown files |
| `markdown-loader.js` | Parses markdown → panels |
| `horizontal-reader.js` | Displays panels |
| `horizontal-reader.html` | Entry point |

## URL Parameters

```
horizontal-reader.html?story=STORY_ID&chapter=NUMBER
```

**Story IDs:**
- `first-void` - The First Void
- `translators-burden` - The Translator's Burden
- `kiln-codex` - KILN Codex

**Examples:**
```
horizontal-reader.html?story=first-void&chapter=1
horizontal-reader.html?story=translators-burden&chapter=5
```

---

**Questions?** Check the code comments in `markdown-loader.js` for detailed parsing logic.
