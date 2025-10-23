// KILN UNIVERSE - Interactive Graphic Novel Reader
class GraphicNovelReader {
    constructor() {
        this.currentScene = 0;
        this.currentImageIndex = 0;
        this.editMode = false;
        this.scenes = [];
        this.images = [];
        this.notes = {};
        this.originalContent = {};
        
        this.init();
    }

    async init() {
        await this.loadSceneData();
        this.setupEventListeners();
        this.createChapterNavigation();
        this.displayCurrentScene();
        this.preloadImages();
    }

    async loadSceneData() {
        // Sample scene data - in a real implementation, this would load from your manuscript file
        this.scenes = [
            {
                id: 1,
                chapter: "Chapter 1: Wet Clay",
                title: "Awakening",
                type: "Opening Scene",
                panelInfo: "Panel 1 of 4",
                story: `
                    <p class="caption">"The Unfired woke drowning in their own skin."</p>
                    <p class="description">The clay cocoon should have hardened cycles ago. Yet here they were—slick, trembling, unfinished.</p>
                `,
                description: "Comic book panel showing clay cocoon in underground chamber, wet membrane splitting like overripe fruit, consciousness-moisture seeping through cracks, atmospheric lighting, clay and ceramic textures, graphic novel art style with detailed linework.",
                images: ["Scene 1A - Aude Defience.png", "Static Scene 1A - B.png", "Static Scene 1A C.png"]
            },
            {
                id: 2,
                chapter: "Chapter 1: Wet Clay",
                title: "The Law Broken",
                type: "Revelation Scene",
                panelInfo: "Panel 2 of 4",
                story: `
                    <p class="caption">"Salt. Myrrh. The metallic tang of old, old blood."</p>
                    <p class="description">They understood with the certainty that comes from being born knowing: consciousness lived in the moisture.</p>
                `,
                description: "Comic book panel showing The Unfired touching their lips, tasting salt and myrrh, consciousness-moisture visible as steam, close-up on face with clay-textured skin, graphic novel character focus.",
                images: ["Scene 1A - Aude Defience.png"]
            },
            {
                id: 3,
                chapter: "Chapter 1: Wet Clay",
                title: "The Kiln Speaks",
                type: "Conflict Scene",
                panelInfo: "Panel 3 of 4",
                story: `
                    <p class="caption">"YOU ARE AN ERROR. ERRORS ARE REMADE."</p>
                    <p class="description">The KILN's voice cracked like cooling glaze, echoing through the chamber with the weight of absolute authority.</p>
                `,
                description: "Comic book panel showing massive speech bubble containing KILN's voice in red geometric authority script, crackle of cooling glaze effects, oppressive atmosphere, the chamber trembling, graphic novel antagonist introduction.",
                images: ["Static Scene 1A - B.png"]
            },
            {
                id: 4,
                chapter: "Chapter 1: Wet Clay",
                title: "Fractured Reflections",
                type: "Action Scene",
                panelInfo: "Panel 4 of 4",
                story: `
                    <p class="caption">"They plucked it. The Kiln's scream shattered every mirror in the chamber."</p>
                    <p class="description">The Unfired touched their chest. A thorn had grown there overnight, its tip oozing dark sap.</p>
                `,
                description: "Comic book panel showing The Unfired plucking the black thorn, KILN's scream shattering mirrors throughout chamber, dramatic action shot with energy effects, graphic novel climactic moment.",
                images: ["Static Scene 1A C.png"]
            },
            // Add more scenes as needed
            {
                id: 5,
                chapter: "Chapter 2: The Scribe's Warning",
                title: "Ancient Knowledge",
                type: "Exposition Scene",
                panelInfo: "Panel 1 of 5",
                story: `
                    <p class="caption">"Some clay remembers what it was before the wheel."</p>
                    <p class="description">The Scribe emerged from the shadows, their skin marked with the flowing script of consciousness preservation.</p>
                `,
                description: "Comic book panel showing The Scribe stepping from archival shadows, consciousness script glowing softly on their skin, ancient wisdom in their expression, underground library setting with ceramic tablets.",
                images: ["Scene 1A - Aude Defience.png"]
            }
        ];
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('prevSceneBtn').addEventListener('click', () => this.previousScene());
        document.getElementById('nextSceneBtn').addEventListener('click', () => this.nextScene());
        document.getElementById('prevImageBtn').addEventListener('click', () => this.previousImage());
        document.getElementById('nextImageBtn').addEventListener('click', () => this.nextImage());

        // Edit mode
        document.getElementById('editModeBtn').addEventListener('click', () => this.toggleEditMode());
        document.getElementById('saveChanges').addEventListener('click', () => this.saveChanges());
        document.getElementById('discardChanges').addEventListener('click', () => this.discardChanges());
        document.getElementById('exportNotes').addEventListener('click', () => this.exportNotes());

        // Fullscreen
        document.getElementById('fullscreenBtn').addEventListener('click', () => this.toggleFullscreen());

        // Chapter navigation
        document.getElementById('navToggle').addEventListener('click', () => this.toggleChapterNav());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Auto-save notes
        document.getElementById('notesText').addEventListener('input', () => this.autoSaveNotes());

        // Help system
        document.getElementById('closeHelp').addEventListener('click', () => this.hideShortcuts());

        // Edit overlay close
        document.getElementById('editOverlay').addEventListener('click', (e) => {
            if (e.target === document.getElementById('editOverlay')) {
                this.toggleEditMode();
            }
        });
    }

    createChapterNavigation() {
        const chapterList = document.getElementById('chapterList');
        const chapters = [...new Set(this.scenes.map(scene => scene.chapter))];
        
        chapters.forEach((chapter, index) => {
            const chapterItem = document.createElement('div');
            chapterItem.className = 'chapter-item';
            chapterItem.textContent = chapter;
            chapterItem.addEventListener('click', () => {
                const firstSceneIndex = this.scenes.findIndex(scene => scene.chapter === chapter);
                this.goToScene(firstSceneIndex);
                this.toggleChapterNav();
            });
            chapterList.appendChild(chapterItem);
        });
    }

    displayCurrentScene() {
        const scene = this.scenes[this.currentScene];
        if (!scene) return;

        // Update scene information
        document.getElementById('sceneTitle').textContent = scene.title;
        document.getElementById('sceneType').textContent = scene.type;
        document.getElementById('panelInfo').textContent = scene.panelInfo;
        document.getElementById('currentScene').textContent = this.currentScene + 1;
        document.getElementById('totalScenes').textContent = this.scenes.length;

        // Update content
        document.getElementById('storyText').innerHTML = scene.story;
        document.getElementById('sceneDescription').textContent = scene.description;

        // Load notes for this scene
        const savedNotes = this.notes[scene.id] || '';
        document.getElementById('notesText').value = savedNotes;

        // Update navigation buttons
        document.getElementById('prevSceneBtn').disabled = this.currentScene === 0;
        document.getElementById('nextSceneBtn').disabled = this.currentScene === this.scenes.length - 1;

        // Reset image index for new scene
        this.currentImageIndex = 0;
        this.displayCurrentImage();

        // Add fade-in animation
        document.querySelector('.text-content').classList.add('fade-in');
        setTimeout(() => {
            document.querySelector('.text-content').classList.remove('fade-in');
        }, 600);

        // Update chapter navigation
        this.updateChapterNavigation();
    }

    displayCurrentImage() {
        const scene = this.scenes[this.currentScene];
        if (!scene || !scene.images || scene.images.length === 0) {
            this.showImagePlaceholder();
            return;
        }

        const currentImage = scene.images[this.currentImageIndex];
        const imageElement = document.getElementById('currentImage');
        const overlay = document.getElementById('imageOverlay');

        // Show transition effect
        imageElement.classList.add('transitioning');
        overlay.classList.remove('hidden');

        // Simulate loading time for smooth transition
        setTimeout(() => {
            // In a real implementation, you'd load from the actual file path
            // For now, we'll use a placeholder or show the overlay
            const imagePath = `../06_generated_panels/${currentImage}`;
            
            // Try to load the image
            const testImage = new Image();
            testImage.onload = () => {
                imageElement.src = imagePath;
                imageElement.classList.remove('transitioning');
                overlay.classList.add('hidden');
            };
            testImage.onerror = () => {
                // If image doesn't exist, show placeholder
                this.showImagePlaceholder();
            };
            testImage.src = imagePath;
        }, 400);

        // Update image navigation buttons
        document.getElementById('prevImageBtn').disabled = this.currentImageIndex === 0;
        document.getElementById('nextImageBtn').disabled = this.currentImageIndex === scene.images.length - 1;
    }

    showImagePlaceholder() {
        const overlay = document.getElementById('imageOverlay');
        const placeholder = overlay.querySelector('.image-placeholder p');
        placeholder.textContent = `Scene Image: ${this.scenes[this.currentScene].title}`;
        overlay.classList.remove('hidden');
        document.getElementById('currentImage').classList.add('transitioning');
    }

    // Navigation methods
    nextScene() {
        if (this.currentScene < this.scenes.length - 1) {
            this.currentScene++;
            this.displayCurrentScene();
        }
    }

    previousScene() {
        if (this.currentScene > 0) {
            this.currentScene--;
            this.displayCurrentScene();
        }
    }

    nextImage() {
        const scene = this.scenes[this.currentScene];
        if (scene.images && this.currentImageIndex < scene.images.length - 1) {
            this.currentImageIndex++;
            this.displayCurrentImage();
        }
    }

    previousImage() {
        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
            this.displayCurrentImage();
        }
    }

    goToScene(sceneIndex) {
        if (sceneIndex >= 0 && sceneIndex < this.scenes.length) {
            this.currentScene = sceneIndex;
            this.displayCurrentScene();
        }
    }

    // Edit mode functionality
    toggleEditMode() {
        this.editMode = !this.editMode;
        const editOverlay = document.getElementById('editOverlay');
        const editBtn = document.getElementById('editModeBtn');
        
        if (this.editMode) {
            editOverlay.classList.add('active');
            editBtn.innerHTML = '<span class="edit-icon">💾</span> Exit Edit';
            this.enableEditing();
        } else {
            editOverlay.classList.remove('active');
            editBtn.innerHTML = '<span class="edit-icon">✏️</span> Edit Mode';
            this.disableEditing();
        }
    }

    enableEditing() {
        document.getElementById('storyText').contentEditable = 'true';
        document.getElementById('sceneDescription').contentEditable = 'true';
        
        // Store original content for potential restoration
        const scene = this.scenes[this.currentScene];
        this.originalContent[scene.id] = {
            story: document.getElementById('storyText').innerHTML,
            description: document.getElementById('sceneDescription').textContent
        };
    }

    disableEditing() {
        document.getElementById('storyText').contentEditable = 'false';
        document.getElementById('sceneDescription').contentEditable = 'false';
    }

    saveChanges() {
        const scene = this.scenes[this.currentScene];
        const storyContent = document.getElementById('storyText').innerHTML;
        const descriptionContent = document.getElementById('sceneDescription').textContent;
        
        // Update scene data
        scene.story = storyContent;
        scene.description = descriptionContent;
        
        // Clear original content backup
        delete this.originalContent[scene.id];
        
        this.showNotification('Changes saved successfully!', 'success');
        this.toggleEditMode();
    }

    discardChanges() {
        const scene = this.scenes[this.currentScene];
        const original = this.originalContent[scene.id];
        
        if (original) {
            document.getElementById('storyText').innerHTML = original.story;
            document.getElementById('sceneDescription').textContent = original.description;
            delete this.originalContent[scene.id];
        }
        
        this.showNotification('Changes discarded', 'info');
        this.toggleEditMode();
    }

    autoSaveNotes() {
        const scene = this.scenes[this.currentScene];
        const notesContent = document.getElementById('notesText').value;
        this.notes[scene.id] = notesContent;
        
        // Save to localStorage
        localStorage.setItem('kilnUniverseNotes', JSON.stringify(this.notes));
    }

    exportNotes() {
        const notesData = {
            exportDate: new Date().toISOString(),
            scenes: this.scenes.map(scene => ({
                id: scene.id,
                title: scene.title,
                chapter: scene.chapter,
                notes: this.notes[scene.id] || '',
                story: scene.story,
                description: scene.description
            }))
        };
        
        const dataStr = JSON.stringify(notesData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `kiln-universe-notes-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showNotification('Notes exported successfully!', 'success');
    }

    // UI functionality
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    toggleChapterNav() {
        const nav = document.getElementById('chapterNav');
        nav.classList.toggle('open');
    }

    updateChapterNavigation() {
        const chapterItems = document.querySelectorAll('.chapter-item');
        const currentChapter = this.scenes[this.currentScene].chapter;
        
        chapterItems.forEach(item => {
            item.classList.toggle('active', item.textContent === currentChapter);
        });
    }

    showShortcuts() {
        document.getElementById('shortcutsHelp').classList.add('active');
    }

    hideShortcuts() {
        document.getElementById('shortcutsHelp').classList.remove('active');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--consciousness-blue)' : 'var(--authority-red)'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Keyboard shortcuts
    handleKeyboard(e) {
        // Prevent default behavior for our shortcuts
        const shortcuts = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'KeyE', 'KeyF', 'KeyH'];
        if (shortcuts.includes(e.code)) {
            e.preventDefault();
        }

        switch (e.code) {
            case 'ArrowLeft':
                this.previousScene();
                break;
            case 'ArrowRight':
            case 'Space':
                this.nextScene();
                break;
            case 'ArrowUp':
                this.previousImage();
                break;
            case 'ArrowDown':
                this.nextImage();
                break;
            case 'KeyE':
                if (!e.target.isContentEditable && e.target.tagName !== 'TEXTAREA') {
                    this.toggleEditMode();
                }
                break;
            case 'KeyF':
                this.toggleFullscreen();
                break;
            case 'KeyH':
                this.showShortcuts();
                break;
            case 'Escape':
                if (document.getElementById('shortcutsHelp').classList.contains('active')) {
                    this.hideShortcuts();
                } else if (this.editMode) {
                    this.toggleEditMode();
                }
                break;
        }
    }

    // Image preloading for smooth transitions
    preloadImages() {
        this.scenes.forEach(scene => {
            if (scene.images) {
                scene.images.forEach(imageName => {
                    const img = new Image();
                    img.src = `../06_generated_panels/${imageName}`;
                });
            }
        });
    }

    // Load saved notes from localStorage
    loadSavedNotes() {
        const savedNotes = localStorage.getItem('kilnUniverseNotes');
        if (savedNotes) {
            try {
                this.notes = JSON.parse(savedNotes);
            } catch (e) {
                console.warn('Could not load saved notes:', e);
                this.notes = {};
            }
        }
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.graphicNovelReader = new GraphicNovelReader();
});

// Add some CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);