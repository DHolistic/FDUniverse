// KILN UNIVERSE - Enhanced Interactive Reader with Professional Platform
class EnhancedGraphicNovelReader {
    constructor() {
        this.currentScene = 0;
        this.currentImageIndex = 0;
        this.currentStory = 'first-void';
        this.editMode = false;
        this.reviewMode = false;
        this.scenes = [];
        this.images = [];
        this.notes = {};
        this.reviews = {};
        this.originalContent = {};
        
        // Initialize systems
        this.manuscriptLoader = new EnhancedManuscriptLoader();
        this.reviewSystem = new ReviewSystem();
        this.platform = new KilnUniversePlatform();
        
        this.init();
    }

    async init() {
        await this.loadCurrentStory();
        this.setupEventListeners();
        this.createEnhancedInterface();
        this.displayCurrentScene();
        this.preloadImages();
        this.loadSavedReviews();
    }

    async loadCurrentStory() {
        this.scenes = await this.manuscriptLoader.loadStoryData(this.currentStory);
        if (!this.scenes || this.scenes.length === 0) {
            this.showError('Story data could not be loaded');
        }
    }

    createEnhancedInterface() {
        // Update header with story selector
        this.updateHeader();
        
        // Add review panel if user has access
        if (this.platform.hasAccess('premium')) {
            this.addReviewPanel();
        }
        
        // Add upgrade prompts for free users
        if (!this.platform.currentUser || this.platform.currentUser.subscription === 'free') {
            this.addUpgradePrompts();
        }
        
        // Update chapter navigation with multi-story support
        this.createMultiStoryNavigation();
    }

    updateHeader() {
        const header = document.querySelector('.app-header');
        const storySelector = document.createElement('div');
        storySelector.className = 'story-selector-dropdown';
        storySelector.innerHTML = `
            <select id="storySelector" class="story-select">
                ${Object.entries(this.manuscriptLoader.manuscripts).map(([id, manuscript]) => `
                    <option value="${id}" ${id === this.currentStory ? 'selected' : ''} 
                            ${!this.platform.hasAccess(manuscript.tier) ? 'disabled' : ''}>
                        ${manuscript.title} ${!this.platform.hasAccess(manuscript.tier) ? '🔒' : ''}
                    </option>
                `).join('')}
            </select>
        `;
        
        // Insert after volume title
        const volumeTitle = header.querySelector('.volume-title');
        volumeTitle.after(storySelector);
        
        // Add review mode toggle for premium users
        if (this.platform.hasAccess('premium')) {
            const reviewToggle = document.createElement('button');
            reviewToggle.id = 'reviewModeBtn';
            reviewToggle.className = 'control-btn';
            reviewToggle.innerHTML = '<span class="review-icon">📋</span> Review Mode';
            
            const controls = header.querySelector('.controls');
            controls.insertBefore(reviewToggle, controls.firstChild);
        }
    }

    addReviewPanel() {
        const textContainer = document.querySelector('.text-container');
        const reviewContainer = document.createElement('div');
        reviewContainer.id = 'reviewContainer';
        reviewContainer.className = 'review-container';
        reviewContainer.style.display = 'none';
        
        textContainer.appendChild(reviewContainer);
    }

    addUpgradePrompts() {
        const textContainer = document.querySelector('.text-container');
        const upgradePrompt = document.createElement('div');
        upgradePrompt.className = 'upgrade-prompt';
        upgradePrompt.innerHTML = `
            <div class="upgrade-banner">
                <h4>🌟 Unlock Professional Features</h4>
                <p>Get editorial review tools, additional stories, and enhanced reading experience</p>
                <button class="upgrade-btn" onclick="this.platform.showUpgradeOptions()">
                    Upgrade to Consciousness Keeper - $9.99/month
                </button>
            </div>
        `;
        
        textContainer.insertBefore(upgradePrompt, textContainer.firstChild);
    }

    setupEventListeners() {
        // Original navigation
        document.getElementById('prevSceneBtn').addEventListener('click', () => this.previousScene());
        document.getElementById('nextSceneBtn').addEventListener('click', () => this.nextScene());
        document.getElementById('prevImageBtn').addEventListener('click', () => this.previousImage());
        document.getElementById('nextImageBtn').addEventListener('click', () => this.nextImage());

        // Enhanced features
        document.getElementById('editModeBtn').addEventListener('click', () => this.toggleEditMode());
        
        // Review mode (premium feature)
        const reviewModeBtn = document.getElementById('reviewModeBtn');
        if (reviewModeBtn) {
            reviewModeBtn.addEventListener('click', () => this.toggleReviewMode());
        }
        
        // Story selector
        document.getElementById('storySelector').addEventListener('change', (e) => this.switchStory(e.target.value));
        
        // Platform features
        document.getElementById('fullscreenBtn').addEventListener('click', () => this.toggleFullscreen());
        document.getElementById('navToggle').addEventListener('click', () => this.toggleChapterNav());

        // Keyboard shortcuts (enhanced)
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Auto-save enhancements
        document.getElementById('notesText').addEventListener('input', () => this.autoSaveNotes());
        
        // Review system events
        document.addEventListener('reviewChanged', (e) => this.handleReviewChange(e));
    }

    async switchStory(storyId) {
        if (!this.platform.hasAccess(this.manuscriptLoader.manuscripts[storyId].tier)) {
            this.platform.showUpgradeModal(storyId);
            return;
        }
        
        // Save current progress
        this.manuscriptLoader.saveStoryProgress(this.currentStory, this.currentScene);
        
        // Switch to new story
        this.currentStory = storyId;
        this.currentScene = 0;
        this.currentImageIndex = 0;
        
        await this.loadCurrentStory();
        this.displayCurrentScene();
        this.updateChapterNavigation();
        
        // Update URL for bookmarking
        window.history.pushState({}, '', `?story=${storyId}&scene=${this.currentScene}`);
    }

    displayCurrentScene() {
        const scene = this.scenes[this.currentScene];
        if (!scene) {
            console.warn('No scene data available. Current scene:', this.currentScene, 'Total scenes:', this.scenes.length);
            // Show a fallback visual checklist
            this.displayFallbackChecklist();
            return;
        }

        // Update scene information
        document.getElementById('sceneTitle').textContent = scene.title || 'Untitled Scene';
        document.getElementById('sceneType').textContent = scene.type || 'Scene';
        document.getElementById('panelInfo').textContent = scene.scene || 'Panel';
        document.getElementById('currentScene').textContent = this.currentScene + 1;
        document.getElementById('totalScenes').textContent = this.scenes.length;

        // Update content with enhanced formatting
        this.displayStoryContent(scene);
        this.displaySceneDescription(scene);
        this.displayCharacterInfo(scene);
        this.displayGlyphInfo(scene);

        // Load notes and reviews
        this.loadSceneNotes(scene);
        if (this.reviewMode) {
            this.displayReviewPanel(scene);
        }

        // Update navigation
        this.updateNavigationButtons();
        
        // Display current image
        this.displayCurrentImage();
        
        // Update progress tracking
        this.updateProgress();
    }

    displayFallbackChecklist() {
        const sceneDescription = document.getElementById('sceneDescription');
        if (!sceneDescription) return;

        sceneDescription.innerHTML = `
            <div class="visual-checklist-container">
                <div class="checklist-header">
                    <h5>
                        <span class="consciousness-glyph">◉</span>
                        Visual Production Checklist
                    </h5>
                    <div class="checklist-progress">
                        <div class="progress-text">0/5 Complete</div>
                        <div class="mini-progress-bar">
                            <div class="mini-progress-fill" style="width: 0%"></div>
                        </div>
                    </div>
                </div>
                <div class="visual-checklist">
                    <div class="checklist-item critical">
                        <label class="mini-checkbox">
                            <input type="checkbox">
                            <span class="mini-checkmark"></span>
                            <span class="check-label">
                                <strong>👤 Character Design & Placement</strong>
                                <br>
                                <small style="opacity: 0.8; font-size: 0.85rem;">Character positioning, facial expressions, body language</small>
                            </span>
                        </label>
                        <span class="check-status critical">⚠️</span>
                    </div>
                    <div class="checklist-item important">
                        <label class="mini-checkbox">
                            <input type="checkbox">
                            <span class="mini-checkmark"></span>
                            <span class="check-label">
                                <strong>💡 Lighting & Atmosphere</strong>
                                <br>
                                <small style="opacity: 0.8; font-size: 0.85rem;">Consciousness energy effects, shadows, mood</small>
                            </span>
                        </label>
                        <span class="check-status important">📝</span>
                    </div>
                    <div class="checklist-item critical">
                        <label class="mini-checkbox">
                            <input type="checkbox">
                            <span class="mini-checkmark"></span>
                            <span class="check-label">
                                <strong>🎨 Scene Composition & Framing</strong>
                                <br>
                                <small style="opacity: 0.8; font-size: 0.85rem;">Panel layout, perspective, visual flow</small>
                            </span>
                        </label>
                        <span class="check-status critical">⚠️</span>
                    </div>
                    <div class="checklist-item important">
                        <label class="mini-checkbox">
                            <input type="checkbox">
                            <span class="mini-checkmark"></span>
                            <span class="check-label">
                                <strong>⚡ Sacred Glyphs & Symbols</strong>
                                <br>
                                <small style="opacity: 0.8; font-size: 0.85rem;">KILN codex symbols, heretic markings</small>
                            </span>
                        </label>
                        <span class="check-status important">📝</span>
                    </div>
                    <div class="checklist-item critical">
                        <label class="mini-checkbox">
                            <input type="checkbox">
                            <span class="mini-checkmark"></span>
                            <span class="check-label">
                                <strong>🌌 KILN Universe Visual Style</strong>
                                <br>
                                <small style="opacity: 0.8; font-size: 0.85rem;">Color palette consistency, world authenticity</small>
                            </span>
                        </label>
                        <span class="check-status critical">⚠️</span>
                    </div>
                </div>
                <div class="scene-details-collapsed">
                    <p style="text-align: center; padding: 1rem; color: var(--authority-red); font-style: italic;">
                        📚 Loading story content... Please wait for manuscripts to initialize.
                    </p>
                </div>
            </div>
        `;
    }

    displayStoryContent(scene) {
        const storyText = document.getElementById('storyText');
        storyText.innerHTML = scene.story;
        
        // Add glyph tooltips
        this.addGlyphTooltips(storyText);
        
        // Add character highlighting
        this.highlightCharacters(storyText, scene.characters);
    }

    displaySceneDescription(scene) {
        console.log('displaySceneDescription called with:', scene);
        
        const sceneDescription = document.getElementById('sceneDescription');
        if (!sceneDescription) {
            console.error('sceneDescription element not found');
            return;
        }
        
        if (!scene) {
            console.error('No scene data provided');
            sceneDescription.innerHTML = '<p class="error-text">No scene data available</p>';
            return;
        }
        
        // Create visual production checklist
        const visualChecklist = this.generateVisualChecklist(scene);
        console.log('Generated visual checklist:', visualChecklist);
        
        sceneDescription.innerHTML = `
            <div class="visual-checklist-container">
                <div class="checklist-header">
                    <h5>
                        <span class="consciousness-glyph">◉</span>
                        Visual Production Checklist
                    </h5>
                    <div class="checklist-progress">
                        <div class="progress-text">${visualChecklist.completed}/${visualChecklist.total} Complete</div>
                        <div class="mini-progress-bar">
                            <div class="mini-progress-fill" style="width: ${(visualChecklist.completed/visualChecklist.total)*100}%"></div>
                        </div>
                    </div>
                </div>
                <div class="visual-checklist">
                    ${visualChecklist.items.map(item => `
                        <div class="checklist-item ${item.status}" data-item-id="${item.id}">
                            <label class="mini-checkbox" onclick="window.enhancedReader.updateVisualCheck('${scene.id}', '${item.id}', this.querySelector('input').checked)">
                                <input type="checkbox" ${item.completed ? 'checked' : ''} 
                                       onchange="window.enhancedReader.updateVisualCheck('${scene.id}', '${item.id}', this.checked)">
                                <span class="mini-checkmark"></span>
                                <span class="check-label">
                                    <strong>${item.icon} ${item.label}</strong>
                                    <br>
                                    <small style="opacity: 0.8; font-size: 0.85rem;">${item.description}</small>
                                </span>
                            </label>
                            <span class="check-status ${item.status}">${item.completed ? '✨' : (item.status === 'critical' ? '⚠️' : (item.status === 'important' ? '�' : '🔮'))}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="scene-details-collapsed">
                    <button class="details-toggle" onclick="window.enhancedReader.toggleSceneDetails(this)">
                        <span>📖</span>
                        Show Scene Context
                        <span class="toggle-arrow">▼</span>
                    </button>
                    <div class="scene-details-content" style="display: none;">
                        <p><strong>Scene Context:</strong> ${scene.text ? scene.text.substring(0, 200) + '...' : 'No scene text available'}</p>
                        <p><strong>Visual Focus:</strong> Key elements that need visual representation in this scene.</p>
                        <p><strong>KILN Elements:</strong> Sacred symbols, consciousness effects, character interactions to emphasize.</p>
                        <p><strong>Production Notes:</strong> Consider panel transitions, dialogue placement, and visual storytelling flow.</p>
                    </div>
                </div>
            </div>
        `;
    }

    generateVisualChecklist(scene) {
        // Load saved visual checks
        const visualChecks = JSON.parse(localStorage.getItem('kilnVisualChecks') || '{}');
        const sceneChecks = visualChecks[scene.id] || {};
        
        const items = [
            {
                id: 'characters',
                label: 'Character Design & Placement',
                description: 'Character positioning, facial expressions, body language, sacred vestments',
                completed: sceneChecks.characters ?? (scene.characters && scene.characters.length > 0),
                status: (sceneChecks.characters ?? (scene.characters && scene.characters.length > 0)) ? 'complete' : 'critical',
                priority: 1,
                icon: '👤'
            },
            {
                id: 'lighting',
                label: 'Lighting & Atmosphere',
                description: 'Consciousness energy effects, shadows, ambient lighting, mood',
                completed: sceneChecks.lighting ?? (scene.mood && scene.mood !== 'undefined'),
                status: (sceneChecks.lighting ?? (scene.mood && scene.mood !== 'undefined')) ? 'complete' : 'important',
                priority: 2,
                icon: '💡'
            },
            {
                id: 'composition',
                label: 'Scene Composition & Framing',
                description: 'Panel layout, perspective, visual flow, focal points',
                completed: sceneChecks.composition ?? (scene.imagePrompt && scene.imagePrompt.length > 50),
                status: (sceneChecks.composition ?? (scene.imagePrompt && scene.imagePrompt.length > 50)) ? 'complete' : 'critical',
                priority: 3,
                icon: '🎨'
            },
            {
                id: 'glyphs',
                label: 'Sacred Glyphs & Symbols',
                description: 'KILN codex symbols, heretic markings, consciousness patterns',
                completed: sceneChecks.glyphs ?? (scene.glyphs && scene.glyphs.length > 0),
                status: (sceneChecks.glyphs ?? (scene.glyphs && scene.glyphs.length > 0)) ? 'complete' : 'important',
                priority: 4,
                icon: '⚡'
            },
            {
                id: 'kiln-aesthetic',
                label: 'KILN Universe Visual Style',
                description: 'Color palette consistency, texture details, world authenticity',
                completed: sceneChecks['kiln-aesthetic'] ?? (scene.description && (scene.description.includes('clay') || scene.description.includes('consciousness') || scene.description.includes('ceramic'))),
                status: (sceneChecks['kiln-aesthetic'] ?? (scene.description && (scene.description.includes('clay') || scene.description.includes('consciousness') || scene.description.includes('ceramic')))) ? 'complete' : 'critical',
                priority: 5,
                icon: '🌌'
            }
        ];

        const completed = items.filter(item => item.completed).length;
        
        return {
            items: items.sort((a, b) => a.priority - b.priority),
            completed,
            total: 5,
            readyForProduction: completed === 5
        };
    }

    updateVisualCheck(sceneId, checkId, completed) {
        // Save visual check state
        const visualChecks = JSON.parse(localStorage.getItem('kilnVisualChecks') || '{}');
        if (!visualChecks[sceneId]) visualChecks[sceneId] = {};
        visualChecks[sceneId][checkId] = completed;
        localStorage.setItem('kilnVisualChecks', JSON.stringify(visualChecks));
        
        // Update UI immediately without full refresh
        const checklistItem = document.querySelector(`[data-item-id="${checkId}"]`);
        if (checklistItem) {
            if (completed) {
                checklistItem.className = 'checklist-item complete';
                checklistItem.querySelector('.check-status').innerHTML = '✨';
                checklistItem.querySelector('.check-status').className = 'check-status complete';
                
                // Add consciousness energy effect
                this.addConsciousnessEffect(checklistItem);
            } else {
                // Reset to original priority class
                const originalPriority = this.getItemPriority(checkId);
                checklistItem.className = `checklist-item ${originalPriority}`;
                const statusIcon = this.getStatusIcon(checkId, originalPriority);
                checklistItem.querySelector('.check-status').innerHTML = statusIcon;
                checklistItem.querySelector('.check-status').className = `check-status ${originalPriority}`;
            }
        }
        
        // Update progress bar
        this.updateProgressDisplay();
        
        // Show completion celebration if all items are checked
        const allChecks = Object.values(visualChecks[sceneId] || {});
        if (allChecks.filter(Boolean).length === 5) {
            this.showCompletionCelebration();
        }
        
        // Show notification
        this.showNotification(`Visual check ${completed ? 'completed' : 'cleared'}: ${checkId}`, completed ? 'success' : 'info');
    }

    addConsciousnessEffect(element) {
        // Add a brief consciousness energy glow effect
        element.style.transform = 'scale(1.02)';
        element.style.boxShadow = '0 0 20px rgba(74, 144, 226, 0.4)';
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.boxShadow = '';
        }, 600);
    }

    getItemPriority(itemId) {
        const priorities = {
            'characters': 'critical',
            'lighting': 'important',
            'composition': 'critical',
            'glyphs': 'important',
            'kiln-aesthetic': 'critical'
        };
        return priorities[itemId] || 'important';
    }

    getStatusIcon(itemId, priority) {
        if (priority === 'critical') return '⚠️';
        if (priority === 'important') return '📝';
        return '🔮';
    }

    updateProgressDisplay() {
        const progressText = document.querySelector('.progress-text');
        const progressFill = document.querySelector('.mini-progress-fill');
        
        if (progressText && progressFill) {
            const sceneId = this.currentScene?.id;
            if (sceneId) {
                const visualChecks = JSON.parse(localStorage.getItem('kilnVisualChecks') || '{}');
                const sceneChecks = visualChecks[sceneId] || {};
                const completedCount = Object.values(sceneChecks).filter(Boolean).length;
                const progressPercentage = Math.round((completedCount / 5) * 100);
                
                progressText.textContent = `${completedCount}/5 Complete`;
                progressFill.style.width = `${progressPercentage}%`;
            }
        }
    }

    showCompletionCelebration() {
        // Create a temporary celebration element
        const celebration = document.createElement('div');
        celebration.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, var(--consciousness-blue), var(--transformation-gold));
                color: white;
                padding: 2rem 3rem;
                border-radius: 20px;
                font-family: var(--title-font);
                font-size: 1.5rem;
                text-align: center;
                z-index: 10000;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                animation: celebrationPulse 2s ease-out;
            ">
                ✨ Visual Production Complete! ✨
                <div style="font-size: 1rem; margin-top: 0.5rem; opacity: 0.9;">
                    Ready for KILN Universe manifestation
                </div>
            </div>
        `;
        
        document.body.appendChild(celebration);
        
        // Remove after animation
        setTimeout(() => {
            if (celebration.parentNode) {
                celebration.parentNode.removeChild(celebration);
            }
        }, 3000);
    }

    toggleSceneDetails(button) {
        const content = button.nextElementSibling;
        const arrow = button.querySelector('.toggle-arrow');
        
        if (content.style.display === 'none') {
            content.style.display = 'block';
            button.querySelector('span:first-child').textContent = '�';
            button.querySelector('span:last-child').textContent = 'Hide Scene Context';
            arrow.style.transform = 'rotate(180deg)';
        } else {
            content.style.display = 'none';
            button.querySelector('span:last-child').textContent = 'Show Scene Context';
            arrow.style.transform = 'rotate(0deg)';
        }
    }

    displayCharacterInfo(scene) {
        if (!scene.characters || scene.characters.length === 0) return;
        
        const textContent = document.querySelector('.text-content');
        let characterSection = textContent.querySelector('.character-section');
        
        if (!characterSection) {
            characterSection = document.createElement('div');
            characterSection.className = 'character-section';
            textContent.appendChild(characterSection);
        }
        
        characterSection.innerHTML = `
            <h4 class="section-title">Characters in Scene</h4>
            <div class="character-tags">
                ${scene.characters.map(character => `
                    <span class="character-tag" title="Click for character details">
                        ${character}
                    </span>
                `).join('')}
            </div>
        `;
    }

    displayGlyphInfo(scene) {
        if (!scene.glyphs || scene.glyphs.length === 0) return;
        
        const textContent = document.querySelector('.text-content');
        let glyphSection = textContent.querySelector('.glyph-section');
        
        if (!glyphSection) {
            glyphSection = document.createElement('div');
            glyphSection.className = 'glyph-section';
            textContent.appendChild(glyphSection);
        }
        
        glyphSection.innerHTML = `
            <h4 class="section-title">Sacred Glyphs Present</h4>
            <div class="glyph-display">
                ${scene.glyphs.map(glyph => {
                    const [symbol, meaning] = glyph.split(' ');
                    return `
                        <div class="glyph-item" title="${meaning} - Click for full glyph reference">
                            <span class="glyph-symbol">${symbol}</span>
                            <span class="glyph-meaning">${meaning}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    toggleReviewMode() {
        this.reviewMode = !this.reviewMode;
        const reviewContainer = document.getElementById('reviewContainer');
        const reviewBtn = document.getElementById('reviewModeBtn');
        
        if (this.reviewMode) {
            reviewContainer.style.display = 'block';
            reviewBtn.innerHTML = '<span class="review-icon">📖</span> Reading Mode';
            this.displayReviewPanel(this.scenes[this.currentScene]);
        } else {
            reviewContainer.style.display = 'none';
            reviewBtn.innerHTML = '<span class="review-icon">📋</span> Review Mode';
        }
    }

    displayReviewPanel(scene) {
        const reviewContainer = document.getElementById('reviewContainer');
        if (!reviewContainer) return;
        
        const reviewPanel = this.reviewSystem.createReviewInterface(scene);
        reviewContainer.innerHTML = '';
        reviewContainer.appendChild(reviewPanel);
        
        // Add event listeners for review actions
        this.setupReviewEventListeners(scene);
    }

    setupReviewEventListeners(scene) {
        // Checkbox changes
        const checkboxes = document.querySelectorAll('.review-item input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                scene.reviewChecks[e.target.id] = e.target.checked;
                this.saveReviewData(scene);
                this.updateReviewStats(scene);
            });
        });
        
        // Editorial notes
        const notesTextarea = document.getElementById('editorialNotes');
        if (notesTextarea) {
            notesTextarea.addEventListener('input', (e) => {
                scene.reviewChecks.editorialNotes = e.target.value;
                this.saveReviewData(scene);
            });
        }
        
        // Review actions
        const approveBtn = document.querySelector('.approve-btn');
        const flagBtn = document.querySelector('.flag-btn');
        const exportBtn = document.querySelector('.export-btn');
        
        if (approveBtn) {
            approveBtn.addEventListener('click', () => this.approveScene(scene));
        }
        if (flagBtn) {
            flagBtn.addEventListener('click', () => this.flagScene(scene));
        }
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.reviewSystem.exportReview(scene));
        }
    }

    approveScene(scene) {
        // Mark all checks as approved
        Object.keys(scene.reviewChecks).forEach(key => {
            if (typeof scene.reviewChecks[key] === 'boolean') {
                scene.reviewChecks[key] = true;
            }
        });
        
        this.saveReviewData(scene);
        this.displayReviewPanel(scene);
        this.showNotification(`Scene "${scene.title}" approved for production!`, 'success');
    }

    flagScene(scene) {
        const reason = prompt('Enter reason for flagging this scene:');
        if (reason) {
            scene.reviewChecks.editorialNotes = (scene.reviewChecks.editorialNotes || '') + 
                `\n🚩 FLAGGED: ${reason} (${new Date().toLocaleDateString()})`;
            
            this.saveReviewData(scene);
            this.displayReviewPanel(scene);
            this.showNotification(`Scene "${scene.title}" flagged for revision`, 'warning');
        }
    }

    updateReviewStats(scene) {
        const qualityElement = document.getElementById('sceneQuality');
        if (qualityElement) {
            qualityElement.textContent = this.reviewSystem.calculateSceneQuality(scene) + '%';
        }
        
        const statusElements = document.querySelectorAll('.stat-value');
        statusElements.forEach(element => {
            if (element.textContent.includes('Production') || element.textContent.includes('Revisions') || element.textContent.includes('Needs')) {
                element.textContent = this.reviewSystem.getSceneStatusLabel(scene);
                element.className = `stat-value ${this.reviewSystem.getSceneStatus(scene)}`;
            }
        });
    }

    saveReviewData(scene) {
        this.reviews[scene.id] = scene.reviewChecks;
        localStorage.setItem('kilnUniverseReviews', JSON.stringify(this.reviews));
    }

    loadSavedReviews() {
        const savedReviews = localStorage.getItem('kilnUniverseReviews');
        if (savedReviews) {
            try {
                this.reviews = JSON.parse(savedReviews);
                // Apply saved reviews to scenes
                this.scenes.forEach(scene => {
                    if (this.reviews[scene.id]) {
                        scene.reviewChecks = { ...scene.reviewChecks, ...this.reviews[scene.id] };
                    }
                });
            } catch (e) {
                console.warn('Could not load saved reviews:', e);
            }
        }
    }

    addGlyphTooltips(container) {
        const glyphPattern = /[〰◦◉∿◈◎○◑◒◓⊿⊡⊤⊢⊞⊟⟐⟑⟒⟓]/g;
        const glyphMeanings = {
            '〰': 'FLOW - Natural consciousness movement',
            '◦': 'ESSENCE - Pure authentic self',
            '◉': 'AWAKENING - Consciousness expansion',
            '∿': 'TRANSFORMATION - Change and evolution',
            '◈': 'CONNECTION - Unity between beings',
            '⊿': 'LAW - Rigid authority structure',
            '⊡': 'CONTROL - Containment and limitation',
            '⊤': 'HIERARCHY - Top-down power',
            '⊢': 'ENFORCEMENT - Force and compliance'
        };
        
        container.innerHTML = container.innerHTML.replace(glyphPattern, (match) => {
            const meaning = glyphMeanings[match] || 'Sacred glyph';
            return `<span class="glyph-tooltip" title="${meaning}">${match}</span>`;
        });
    }

    highlightCharacters(container, characters) {
        if (!characters) return;
        
        characters.forEach(character => {
            const regex = new RegExp(`\\b${character}\\b`, 'gi');
            container.innerHTML = container.innerHTML.replace(regex, 
                `<span class="character-highlight" title="Character: ${character}">$&</span>`);
        });
    }

    addSceneTransitionEffects() {
        const textContent = document.querySelector('.text-content');
        textContent.classList.add('scene-transition');
        
        setTimeout(() => {
            textContent.classList.remove('scene-transition');
        }, 800);
    }

    updateProgress() {
        // Update local progress
        this.manuscriptLoader.saveStoryProgress(this.currentStory, this.currentScene);
        
        // Update progress bar in story selector
        const progressBar = document.querySelector(`[data-story="${this.currentStory}"] .progress-fill`);
        if (progressBar) {
            const progress = ((this.currentScene + 1) / this.scenes.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
        
        // Send analytics if user is signed in
        if (this.platform.currentUser) {
            this.sendProgressAnalytics();
        }
    }

    sendProgressAnalytics() {
        // Mock analytics - replace with real analytics service
        const analyticsData = {
            userId: this.platform.currentUser.id,
            storyId: this.currentStory,
            sceneId: this.currentScene,
            timestamp: new Date().toISOString(),
            sessionDuration: Date.now() - this.sessionStartTime
        };
        
        // In production, send to analytics service
        console.log('Analytics:', analyticsData);
    }

    exportStoryReview() {
        const storyReview = {
            story: this.manuscriptLoader.manuscripts[this.currentStory].title,
            exportDate: new Date().toISOString(),
            scenes: this.scenes.map(scene => ({
                id: scene.id,
                title: scene.title,
                chapter: scene.chapter,
                quality: this.reviewSystem.calculateSceneQuality(scene),
                status: this.reviewSystem.getSceneStatus(scene),
                reviews: scene.reviewChecks,
                recommendations: this.reviewSystem.generateRecommendations(scene)
            })),
            overallStats: this.calculateOverallStats()
        };
        
        const dataStr = JSON.stringify(storyReview, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `${this.currentStory}-review-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showNotification('Story review exported successfully!', 'success');
    }

    calculateOverallStats() {
        const totalScenes = this.scenes.length;
        const completedReviews = this.scenes.filter(scene => 
            this.reviewSystem.calculateSceneQuality(scene) === 100).length;
        const avgQuality = this.scenes.reduce((sum, scene) => 
            sum + this.reviewSystem.calculateSceneQuality(scene), 0) / totalScenes;
        
        return {
            totalScenes,
            completedReviews,
            reviewProgress: `${completedReviews}/${totalScenes}`,
            averageQuality: Math.round(avgQuality),
            productionReady: completedReviews === totalScenes
        };
    }

    // Enhanced keyboard shortcuts
    handleKeyboard(e) {
        // Prevent default for our shortcuts
        const shortcuts = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'KeyE', 'KeyF', 'KeyH', 'KeyR', 'KeyS'];
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
            case 'KeyR':
                if (this.platform.hasAccess('premium')) {
                    this.toggleReviewMode();
                }
                break;
            case 'KeyS':
                if (e.ctrlKey || e.metaKey) {
                    this.quickSave();
                }
                break;
            case 'KeyF':
                this.toggleFullscreen();
                break;
            case 'KeyH':
                this.showShortcuts();
                break;
            case 'Escape':
                this.handleEscape();
                break;
        }
    }

    quickSave() {
        // Save current progress, notes, and reviews
        this.autoSaveNotes();
        if (this.reviewMode) {
            this.saveReviewData(this.scenes[this.currentScene]);
        }
        this.showNotification('Progress saved', 'success');
    }

    handleEscape() {
        if (document.getElementById('shortcutsHelp').classList.contains('active')) {
            this.hideShortcuts();
        } else if (this.editMode) {
            this.toggleEditMode();
        } else if (this.reviewMode) {
            this.toggleReviewMode();
        }
    }

    showNotification(message, type = 'info') {
        this.platform.showNotification(message, type);
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    // Initialize session tracking
    initializeSession() {
        this.sessionStartTime = Date.now();
        this.sessionId = 'session-' + this.sessionStartTime;
        
        // Track session start
        if (this.platform.currentUser) {
            this.sendSessionAnalytics('start');
        }
    }

    // Cleanup on page unload
    cleanup() {
        // Save final progress
        this.quickSave();
        
        // Track session end
        if (this.platform.currentUser) {
            this.sendSessionAnalytics('end');
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check for authentication first
    const platform = new KilnUniversePlatform();
    
    if (!platform.currentUser) {
        // Show authentication modal
        document.body.innerHTML += platform.createAuthInterface();
        document.getElementById('authOverlay').style.display = 'flex';
    } else {
        // Initialize reader
        window.enhancedReader = new EnhancedGraphicNovelReader();
    }
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.enhancedReader) {
        window.enhancedReader.cleanup();
    }
});