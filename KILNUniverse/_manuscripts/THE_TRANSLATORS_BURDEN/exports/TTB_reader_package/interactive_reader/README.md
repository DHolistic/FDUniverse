# 🎭 KILN UNIVERSE - Interactive Graphic Novel Reader

Welcome to your personalized interactive reading experience for the KILN Universe! This web-based application brings your graphic novel to life with smooth transitions, editing capabilities, and an immersive presentation.

## 🚀 **Getting Started**

### **Quick Start**
1. Open `index.html` in any modern web browser
2. The reader will automatically load your story content
3. Use navigation controls or keyboard shortcuts to explore
4. Enter Edit Mode to make notes and corrections
5. Export your notes and changes when finished

### **Features Overview**
- **Smooth Image Transitions**: PowerPoint-style transitions between scenes
- **Interactive Story Text**: Read and edit story content in real-time
- **Note-Taking System**: Add corrections and notes to any scene
- **Keyboard Navigation**: Fast navigation with intuitive shortcuts
- **Chapter Navigation**: Quick access to any chapter or scene
- **Export Functionality**: Save your notes and edits as JSON files
- **Responsive Design**: Works on desktop, tablet, and mobile devices

---

## 🎮 **Navigation Controls**

### **Mouse/Touch Controls**
- **Next/Previous Scene**: Use arrow buttons in text area
- **Next/Previous Image**: Use arrow buttons in image area
- **Chapter Navigation**: Click the "≡" button to access chapter list
- **Edit Mode**: Click "✏️ Edit Mode" button in header

### **Keyboard Shortcuts**
| Shortcut | Action |
|----------|--------|
| `←` `→` | Navigate between scenes |
| `↑` `↓` | Navigate between images in current scene |
| `Space` | Next scene (quick progression) |
| `E` | Toggle Edit Mode on/off |
| `F` | Toggle fullscreen mode |
| `H` | Show/hide keyboard shortcuts help |
| `Esc` | Exit edit mode or close help |

---

## ✏️ **Edit Mode Features**

### **Activating Edit Mode**
1. Click the "✏️ Edit Mode" button in the header
2. Or press the `E` key (when not editing text)
3. The edit overlay will appear with options

### **What You Can Edit**
- **Story Text**: Click on story content to edit dialogue and descriptions
- **Scene Descriptions**: Modify DALL-E prompts and visual descriptions
- **Personal Notes**: Add your own notes, corrections, and ideas

### **Edit Mode Controls**
- **Save Changes**: Permanently apply your edits to the story
- **Discard Changes**: Revert back to original content
- **Export Notes**: Download all your notes and changes as a JSON file

### **Auto-Save Notes**
- Your personal notes are automatically saved to browser storage
- Notes persist between sessions
- Export regularly to backup your work

---

## 🎨 **Image System**

### **Current Image Support**
The reader automatically detects and displays images from your `06_generated_panels/` folder:
- `Scene 1A - Aude Defience.png`
- `Static Scene 1A - B.png`
- `Static Scene 1A C.png`

### **Adding New Images**
1. Place your generated images in the `06_generated_panels/` folder
2. Update the scene data in the manuscript loader
3. The reader will automatically detect and display them

### **Image Transitions**
- Smooth fade transitions between images
- Loading placeholders for missing images
- Support for multiple images per scene

---

## 📱 **Responsive Design**

### **Desktop Experience**
- Split-screen layout with image on left, text on right
- Full keyboard navigation support
- Chapter navigation sidebar
- Maximum screen utilization

### **Mobile/Tablet Experience**
- Stacked layout with image above text
- Touch-friendly navigation buttons
- Optimized text sizing
- Swipe gestures (coming soon)

---

## 💾 **Data Management**

### **Story Content**
The reader loads story content from your manuscript file structure. Current scenes include:
- Chapter 1: "Wet Clay" (7 scenes)
- Chapter 2: "The Scribe's Warning" (3 scenes)
- Additional chapters can be easily added

### **Notes Storage**
- Notes are stored in browser's localStorage
- Automatic backup on every change
- Export functionality for external backup
- JSON format for easy editing and sharing

### **Customization**
All content can be customized by editing the scene data in `manuscript-loader.js`

---

## 🛠 **Technical Details**

### **Browser Requirements**
- Modern web browser (Chrome 70+, Firefox 65+, Safari 12+, Edge 79+)
- JavaScript enabled
- Local file access (for loading images)

### **File Structure**
```
08_interactive_reader/
├── index.html          # Main application file
├── styles.css          # All styling and animations
├── script.js           # Core application logic
├── manuscript-loader.js # Data loading and parsing
└── README.md           # This documentation
```

### **Dependencies**
- No external JavaScript libraries required
- Uses Google Fonts (Cinzel, Crimson Text)
- Pure HTML5, CSS3, and vanilla JavaScript

---

## 🎯 **Usage Scenarios**

### **Story Review**
1. Read through your story scene by scene
2. View associated images for each scene
3. Take notes on pacing, dialogue, and visual flow

### **Editorial Review**
1. Enter Edit Mode to make corrections
2. Edit story text directly in the interface
3. Update scene descriptions and DALL-E prompts
4. Export changes for implementation

### **Visual Planning**
1. Review existing images against scene descriptions
2. Identify scenes needing new images
3. Use scene descriptions as DALL-E prompts
4. Plan image generation workflow

### **Presentation Mode**
1. Use fullscreen mode for presentations
2. Navigate smoothly between scenes
3. Present your story to editors, collaborators, or readers
4. Professional reading experience

---

## 🔧 **Customization Options**

### **Color Themes**
The reader uses the KILN Universe color palette:
- **Consciousness Blue**: `#4A90E2`
- **Authority Red**: `#E74C3C`
- **Transformation Gold**: `#F39C12`
- **Clay Brown**: `#8B4513`
- **Ceramic Cream**: `#F5F5DC`

Colors can be customized in the CSS `:root` variables.

### **Typography**
- **Headers**: Cinzel (serif, elegant)
- **Body Text**: Crimson Text (serif, readable)
- Fonts can be changed in CSS font variables

### **Animation Speed**
- Transition speed: `0.8s` (customizable in CSS)
- Fade effects, slide animations, and hover effects
- All animations use `cubic-bezier(0.4, 0, 0.2, 1)` easing

---

## 📊 **Export Formats**

### **Notes Export (JSON)**
```json
{
  "exportDate": "2025-10-21T...",
  "scenes": [
    {
      "id": 1,
      "title": "Awakening",
      "chapter": "Chapter 1: Wet Clay",
      "notes": "Your personal notes here",
      "story": "Updated story content",
      "description": "Updated scene description"
    }
  ]
}
```

### **Future Export Options** (Planned)
- PDF export of complete story with notes
- Markdown export for easy editing
- DALL-E prompt batch export
- Print-ready layout export

---

## 🚀 **Next Steps**

### **Immediate Use**
1. Review your current story content
2. Add images to scenes as you generate them
3. Take notes on improvements and changes
4. Export your work regularly

### **Enhancement Opportunities**
1. **Auto-load from manuscript file**: Parse your actual markdown manuscript
2. **Batch image processing**: Automatically detect new images
3. **Audio integration**: Add sound effects and narration
4. **Animation support**: GIF or video support for dynamic scenes
5. **Collaboration features**: Share notes with editors
6. **Version control**: Track changes over time

### **Integration with Your Workflow**
1. Use for daily story review sessions
2. Present to collaborators and editors
3. Export notes for implementation in source files
4. Track visual consistency across scenes
5. Plan image generation priorities

---

## 🎉 **Enjoy Your Interactive Story Experience!**

Your KILN Universe graphic novel now has a professional, interactive presentation system that grows with your creative process. The reader combines the immediacy of digital interaction with the thoughtful pacing of traditional reading.

**Happy reading and editing!** ✨

---

*For technical support or feature requests, modify the source files or create additional scenes in the manuscript loader.*