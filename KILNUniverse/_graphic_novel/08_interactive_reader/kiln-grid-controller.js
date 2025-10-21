// KILN UNIVERSE - Grid Controller with Sacred Glyph Navigation
class KilnGridController {
    constructor() {
        this.currentStory = 'translators-burden';
        this.currentChapter = 1;
        this.totalChapters = 12;
        this.currentPanel = 4;
        this.totalPanels = 4;
        this.manuscriptExpanded = false;
        this.checklistVisible = false;
        this.monetizationEnabled = true;
        this.navigationExpanded = false;
        this.activeTab = 'text';
        this.integratedTextExpanded = false;
        this.headerChapterExpanded = false;
        this.chapterOrder = 'ascending'; // ascending, descending, custom
        this.expandedPanels = new Set(); // Track which navigation panels are expanded
        
        // Story-specific configurations
        this.storyConfigs = {
            'translators-burden': {
                title: "The Translator's Burden",
                subtitle: 'Orthodox KILN Prequel',
                totalChapters: 12,
                colorTheme: 'orthodox', // Authority red dominant
                backgroundPath: '../_canonical_imagery/06_timeline_eras/orthodox_period/',
                coverArt: '../_canonical_imagery/02_character_archetypes/methodius_terev_canonical.jpg'
            },
            'first-void': {
                title: 'The First Void',
                subtitle: 'Consciousness Origin',
                totalChapters: 16,
                colorTheme: 'consciousness', // Consciousness blue dominant
                backgroundPath: '../_canonical_imagery/06_timeline_eras/consciousness_emergence/',
                coverArt: '../_canonical_imagery/01_landscape_foundation/void_emergence.jpg'
            },
            'kiln-codex': {
                title: 'KILN Codex',
                subtitle: 'Complete Graphic Novel',
                totalChapters: 12,
                colorTheme: 'balanced', // All colors balanced
                backgroundPath: '../_canonical_imagery/03_kiln_systems/',
                coverArt: '../_canonical_imagery/01_landscape_foundation/consciousness_codex_cover.jpg'
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadStoryConfiguration();
        this.updateChapterBackground();
        this.initializeVisualChecklist();
        this.setupResponsiveHandling();
    }

    setupEventListeners() {
        // Book tabs selection
        document.querySelectorAll('.book-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const bookId = e.currentTarget.dataset.book;
                if (bookId !== 'coming-soon') {
                    this.switchBook(bookId);
                } else {
                    this.showComingSoonModal();
                }
            });
        });

        // Story selection dropdown (fallback)
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const storyId = e.currentTarget.dataset.story;
                this.switchStory(storyId);
            });
        });

        // Sacred glyph navigation
        document.getElementById('prevButton').addEventListener('click', () => {
            this.navigateChapter(-1);
        });

        document.getElementById('nextButton').addEventListener('click', () => {
            this.navigateChapter(1);
        });

        // Manuscript toggle
        document.getElementById('manuscriptToggle').addEventListener('click', () => {
            this.toggleManuscript();
        });

        // Navigation toggle
        document.getElementById('navigationToggle').addEventListener('click', () => {
            this.toggleNavigation();
        });

        // KILN law text (click to expand)
        document.getElementById('kilnLawText').addEventListener('click', () => {
            this.toggleIntegratedText();
        });

        // Header chapter tab
        document.getElementById('headerChapterTab').addEventListener('click', () => {
            this.toggleHeaderChapter();
        });

        // Expandable navigation panels
        this.setupExpandableNavigation();

        // Panel option clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('panel-option')) {
                this.handlePanelOptionClick(e.target);
            }
        });

        // Close panels when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-button-container.expandable-nav')) {
                this.closeAllNavPanels();
            }
        });

        // Header chapter text (click to collapse)
        document.getElementById('headerChapterText').addEventListener('click', () => {
            this.toggleHeaderChapter();
        });

        // Visual checklist toggle
        document.getElementById('checklistToggle').addEventListener('click', () => {
            this.toggleVisualChecklist();
        });

        // Settings button
        document.getElementById('settingsButton').addEventListener('click', () => {
            this.openSettings();
        });

        // Domain and monetization controls
        document.getElementById('domainButton').addEventListener('click', () => {
            this.checkDomain();
        });

        document.getElementById('monetizationToggle').addEventListener('click', () => {
            this.toggleMonetization();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }

    toggleNavigation() {
        const navigation = document.getElementById('kilnNavigation');
        const toggle = document.getElementById('navigationToggle');
        
        this.navigationExpanded = !this.navigationExpanded;
        
        if (this.navigationExpanded) {
            navigation.classList.add('expanded');
            toggle.setAttribute('title', 'Collapse Navigation');
        } else {
            navigation.classList.remove('expanded');
            toggle.setAttribute('title', 'Expand Navigation');
        }
    }

    switchTab(tabType) {
        // Tab system removed with text box
        this.activeTab = tabType;
        
        if (tabType === 'text') {
            this.showTextContent();
        } else if (tabType === 'law') {
            this.showLawContent();
        }
    }

    showTextContent() {
        const integratedContent = document.getElementById('integratedTextContent');
        const textSection = integratedContent.querySelector('.manuscript-text');
        const checklistSection = integratedContent.querySelector('.visual-checklist-section');
        
        if (textSection) textSection.style.display = 'block';
        if (checklistSection) checklistSection.style.display = 'none';
        
        this.showNotification('Switched to manuscript text view', 'info');
    }

    showLawContent() {
        const integratedContent = document.getElementById('integratedTextContent');
        const textSection = integratedContent.querySelector('.manuscript-text');
        const checklistSection = integratedContent.querySelector('.visual-checklist-section');
        
        if (textSection) textSection.style.display = 'none';
        if (checklistSection) checklistSection.style.display = 'block';
        
        // Auto-expand the integrated text to show law content
        if (!this.integratedTextExpanded) {
            this.toggleIntegratedText();
        }
        
        // Load checklist if not already loaded
        this.loadVisualChecklist();
        this.showNotification('Switched to KILN law checklist view', 'info');
    }

    toggleIntegratedText() {
        const integratedContent = document.getElementById('integratedTextContent');
        
        this.integratedTextExpanded = !this.integratedTextExpanded;
        
        if (this.integratedTextExpanded) {
            integratedContent.classList.add('expanded');
        } else {
            integratedContent.classList.remove('expanded');
        }
    }

    toggleHeaderChapter() {
        const headerChapterText = document.getElementById('headerChapterText');
        const headerChapterTab = document.getElementById('headerChapterTab');
        
        this.headerChapterExpanded = !this.headerChapterExpanded;
        
        if (this.headerChapterExpanded) {
            headerChapterText.classList.add('expanded');
            headerChapterTab.classList.add('active');
        } else {
            headerChapterText.classList.remove('expanded');
            headerChapterTab.classList.remove('active');
        }
    }

    switchBook(bookId) {
        // Update active book tab
        document.querySelectorAll('.book-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-book="${bookId}"]`).classList.add('active');
        
        // Switch to the story
        this.switchStory(bookId);
    }

    showComingSoonModal() {
        const comingSoonContent = `
            <div style="text-align: center; font-family: var(--body-font);">
                <h3 style="color: var(--transformation-gold); margin-bottom: 1rem;">🌟 Coming Soon</h3>
                <p style="color: var(--ceramic-cream); margin-bottom: 1.5rem; line-height: 1.6;">
                    The Sacred Codex will contain the complete KILN Universe collection 
                    with enhanced visual experiences and interactive consciousness exploration.
                </p>
                <div style="background: rgba(74, 144, 226, 0.2); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                    <p style="color: var(--consciousness-blue); font-size: 0.9rem;">
                        <strong>◉ Planned Features:</strong><br>
                        • Complete manuscript collection<br>
                        • Advanced glyph interaction<br>
                        • Consciousness energy visualization<br>
                        • Sacred symbol translation tools
                    </p>
                </div>
                <small style="color: var(--transformation-gold); opacity: 0.8;">
                    Join the waitlist to be notified when available
                </small>
            </div>
        `;
        
        this.showModal('Sacred Codex Preview', comingSoonContent);
    }

    openCanonicalReference(canonType) {
        const canonicalPaths = {
            'tone': '../_canonical_imagery/06_timeline_eras/orthodox_period/',
            'glyphs': '../_canonical_foundation/CANONICAL_CODEX_GLYPH_SYSTEM_COMPLETE.md',
            'characters': '../_canonical_imagery/02_character_archetypes/',
            'missing': '../_canonical_foundation/CANONICAL_KILN_LAW.md',
            'universe': '../_canonical_foundation/CANONICAL_KILN_UNIVERSE_FOUNDATION.md'
        };
        
        const descriptions = {
            'tone': 'Orthodox Period atmosphere guidelines, consciousness energy patterns, and sacred mood references for visual consistency.',
            'glyphs': 'Complete KILN codex glyph system with consciousness patterns, heretic markings, and orthodox symbols.',
            'characters': 'Canonical character archetypes including Methodius Terev, consciousness vessels, and sacred vestment guidelines.',
            'missing': 'AI prompt analysis system linking to KILN Law codex for timeline universe consistency checks.',
            'universe': 'Foundation document establishing KILN Universe visual style, color palettes, and world authenticity standards.'
        };
        
        const canonicalContent = `
            <div style="font-family: var(--body-font);">
                <h4 style="color: var(--consciousness-blue); margin-bottom: 1rem;">📚 Canonical Reference: ${canonType.toUpperCase()}</h4>
                <div style="background: rgba(44, 24, 16, 0.5); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <strong style="color: var(--transformation-gold);">Path:</strong>
                    <code style="color: var(--ceramic-cream); background: rgba(0,0,0,0.3); padding: 0.25rem 0.5rem; border-radius: 4px; display: block; margin-top: 0.5rem;">
                        ${canonicalPaths[canonType]}
                    </code>
                </div>
                <p style="color: var(--ceramic-cream); line-height: 1.6; margin-bottom: 1.5rem;">
                    ${descriptions[canonType]}
                </p>
                <div style="background: rgba(74, 144, 226, 0.2); padding: 1rem; border-radius: 8px;">
                    <strong style="color: var(--consciousness-blue);">◉ Integration Status:</strong>
                    <p style="color: var(--ceramic-cream); margin-top: 0.5rem; font-size: 0.9rem;">
                        This checklist item is dynamically linked to your canonical KILN imagery and manuscript repository. 
                        When checked, it validates against the established canonical standards.
                    </p>
                </div>
            </div>
        `;
        
        this.showModal('Canonical Reference', canonicalContent);
    }

    switchStory(storyId) {
        if (!this.storyConfigs[storyId]) return;

        this.currentStory = storyId;
        this.currentChapter = 1;
        
        const config = this.storyConfigs[storyId];
        this.totalChapters = config.totalChapters;
        
        // Update UI
        document.getElementById('currentStoryTitle').textContent = config.title;
        document.getElementById('totalChapters').textContent = config.totalChapters;
        document.getElementById('currentChapter').textContent = '1';
        
        // Apply color theme
        this.applyColorTheme(config.colorTheme);
        
        // Update background
        this.updateChapterBackground();
        
        // Load chapter content
        this.loadChapterContent();
        
        // Show notification
        this.showNotification(`Switched to ${config.title}`, 'success');
    }

    navigateChapter(direction) {
        const newChapter = this.currentChapter + direction;
        
        if (newChapter < 1 || newChapter > this.totalChapters) {
            this.showNotification('No more chapters in this direction', 'info');
            return;
        }

        this.currentChapter = newChapter;
        document.getElementById('currentChapter').textContent = this.currentChapter;
        
        // Add transition effect
        this.addChapterTransition();
        
        // Update content
        setTimeout(() => {
            this.updateChapterBackground();
            this.loadChapterContent();
        }, 400);
    }

    addChapterTransition() {
        const content = document.getElementById('mainContent');
        content.style.opacity = '0.3';
        content.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            content.style.opacity = '1';
            content.style.transform = 'scale(1)';
        }, 400);
    }

    updateChapterBackground() {
        const config = this.storyConfigs[this.currentStory];
        const backgroundElement = document.getElementById('chapterBackground');
        
        // Construct background image path
        const imagePath = `${config.backgroundPath}chapter_${this.currentChapter.toString().padStart(2, '0')}.jpg`;
        
        backgroundElement.style.backgroundImage = `
            linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)),
            url('${imagePath}'),
            url('${config.coverArt}')
        `;
        backgroundElement.style.backgroundSize = 'cover';
        backgroundElement.style.backgroundPosition = 'center';
        backgroundElement.style.backgroundBlendMode = 'overlay';
    }

    applyColorTheme(theme) {
        const root = document.documentElement;
        
        switch (theme) {
            case 'orthodox':
                root.style.setProperty('--primary-theme', 'var(--authority-red)');
                root.style.setProperty('--secondary-theme', 'var(--consciousness-blue)');
                root.style.setProperty('--accent-theme', 'var(--transformation-gold)');
                break;
            case 'consciousness':
                root.style.setProperty('--primary-theme', 'var(--consciousness-blue)');
                root.style.setProperty('--secondary-theme', 'var(--transformation-gold)');
                root.style.setProperty('--accent-theme', 'var(--authority-red)');
                break;
            case 'balanced':
            default:
                root.style.setProperty('--primary-theme', 'var(--transformation-gold)');
                root.style.setProperty('--secondary-theme', 'var(--consciousness-blue)');
                root.style.setProperty('--accent-theme', 'var(--authority-red)');
                break;
        }
    }

    toggleManuscript() {
        const overlay = document.getElementById('manuscriptOverlay');
        const toggle = document.getElementById('manuscriptToggle');
        
        this.manuscriptExpanded = !this.manuscriptExpanded;
        
        if (this.manuscriptExpanded) {
            overlay.classList.add('expanded');
            toggle.innerHTML = '<span>▽</span>';
            toggle.setAttribute('title', 'Collapse Text');
        } else {
            overlay.classList.remove('expanded');
            toggle.innerHTML = '<span>△</span>';
            toggle.setAttribute('title', 'Expand Text');
        }
    }

    toggleVisualChecklist() {
        // Show law content (checklist) and expand integrated text
        this.showLawContent();
        
        if (!this.integratedTextExpanded) {
            this.toggleIntegratedText();
        }
        
        // Auto-expand navigation if not already expanded
        if (!this.navigationExpanded) {
            this.toggleNavigation();
        }
        
        // Future enhancement: When checklist is complete, transform to therapeutic button
        this.checkTherapeuticTransformation();
    }

    checkTherapeuticTransformation() {
        // Check if all checklist items are complete
        const checkboxes = document.querySelectorAll('#visualProductionChecklist input[type="checkbox"]');
        const allComplete = Array.from(checkboxes).every(cb => cb.checked);
        
        if (allComplete && this.checklistVisible) {
            // Transform checklist button to therapeutic button after delay
            setTimeout(() => {
                this.enableTherapeuticButton();
            }, 2000);
        }
    }

    enableTherapeuticButton() {
        const button = document.getElementById('checklistToggle');
        const buttonContainer = button.parentElement;
        
        // Add therapeutic mode class for styling
        button.classList.add('therapeutic-mode');
        button.innerHTML = '<span>🔮</span>';
        button.setAttribute('title', 'Therapeutic - Look Deeper (T)');
        
        // Update label
        buttonContainer.querySelector('.button-label').textContent = 'Therapeutic';
        
        // Replace click handler
        button.removeEventListener('click', this.toggleVisualChecklist);
        button.addEventListener('click', () => {
            this.activateTherapeuticMode();
        });
        
        this.showNotification('Therapeutic mode unlocked: Look deeper into consciousness', 'success');
    }

    activateTherapeuticMode() {
        const therapeuticContent = `
            <div style="font-family: var(--body-font); text-align: center;">
                <h3 style="color: var(--transformation-gold); margin-bottom: 1.5rem;">🔮 Therapeutic Consciousness Exploration</h3>
                <div style="background: rgba(74, 144, 226, 0.2); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
                    <p style="color: var(--ceramic-cream); line-height: 1.6; margin-bottom: 1rem;">
                        With the production checklist complete, you've earned access to deeper consciousness exploration.
                        This therapeutic mode allows you to examine the underlying patterns and energies within the KILN Universe.
                    </p>
                    <div style="color: var(--consciousness-blue); font-size: 0.9rem; margin-bottom: 1rem;">
                        <strong>◉ Available Therapeutic Tools:</strong><br>
                        • Consciousness pattern analysis<br>
                        • Sacred glyph meditation sequences<br>
                        • Character psychology deep-dive<br>
                        • KILN law philosophical exploration<br>
                        • Energy flow visualization
                    </div>
                </div>
                <div style="background: rgba(243, 156, 18, 0.2); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <small style="color: var(--transformation-gold);">
                        <strong>◦ Integration Status:</strong> Complete<br>
                        This therapeutic functionality integrates with your completed visual production work
                        to provide deeper insights into the conscious creation process.
                    </small>
                </div>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button onclick="this.closest('div').parentElement.remove()" style="
                        background: var(--consciousness-blue);
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 10px;
                        cursor: pointer;
                        font-family: var(--body-font);
                    ">Begin Exploration</button>
                    <button onclick="this.closest('div').parentElement.remove()" style="
                        background: rgba(139, 69, 19, 0.8);
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 10px;
                        cursor: pointer;
                        font-family: var(--body-font);
                    ">Later</button>
                </div>
            </div>
        `;
        
        this.showModal('Therapeutic Mode - Look Deeper', therapeuticContent);
    }

    loadChapterContent() {
        // Update header chapter system
        const headerChapterTab = document.getElementById('headerChapterTab');
        const headerChapterText = document.getElementById('headerChapterText');
        
        // Update integrated text content
        const manuscriptText = document.querySelector('#integratedTextContent .manuscript-text .chapter-text');
        
        const config = this.storyConfigs[this.currentStory];
        
        // Generate chapter-specific content
        const chapterData = this.generateChapterData();
        
        // Update header chapter system
        if (headerChapterTab) {
            headerChapterTab.textContent = this.currentChapter;
        }
        
        if (headerChapterText) {
            headerChapterText.innerHTML = `
                <div class="chapter-title-content">
                    <span class="chapter-number-display">Chapter ${this.currentChapter}:</span>
                    <span class="chapter-title-text">${chapterData.title}</span>
                    <span class="chapter-subtitle-text">${chapterData.subtitle}</span>
                </div>
            `;
        }
        
        // Load manuscript text with chapter information
        if (manuscriptText) {
            manuscriptText.innerHTML = `
                <h3 style="color: var(--transformation-gold); margin-bottom: 1rem; font-family: var(--title-font);">
                    Chapter ${this.currentChapter}: ${chapterData.title}
                </h3>
                <p style="color: var(--consciousness-blue); font-style: italic; margin-bottom: 1.5rem;">
                    ${chapterData.subtitle}
                </p>
                ${chapterData.content.map(paragraph => `<p>${paragraph}</p>`).join('')}
            `;
        }
    }

    generateChapterData() {
        // Sample chapter data - in production this would load from your manuscripts
        const chapterTitles = {
            'translators-burden': [
                'The Weight of Words', 'Sacred Consciousness Protocol', 'The Orthodox Translation',
                'Burden to Celebration', 'Methodius Awakens', 'The Codex Speaks',
                'Consciousness Flows', 'Sacred Transformation', 'The Translator\'s Vision',
                'Orthodox Rebellion', 'Consciousness Celebrated', 'The New Protocol'
            ],
            'first-void': [
                'The First Silence', 'Consciousness Emerges', 'The Void Speaks',
                'Sacred Awareness', 'The Awakening', 'Consciousness Forms',
                'Sacred Clay', 'The First Kiln', 'Consciousness Law',
                'Sacred Authority', 'The First Orthodox', 'Sacred Celebration',
                'Consciousness Preserved', 'The Authority Rises', 'Sacred Order', 'The First Void Complete'
            ]
        };
        
        const titles = chapterTitles[this.currentStory] || ['Unknown Chapter'];
        const title = titles[this.currentChapter - 1] || 'Unknown Chapter';
        
        return {
            title: title,
            subtitle: `${this.storyConfigs[this.currentStory].subtitle} - Part ${this.currentChapter}`,
            content: [
                `In this chapter of ${this.storyConfigs[this.currentStory].title}, the narrative continues to unfold with the weight of consciousness preservation pressing against the boundaries of orthodox law.`,
                `The sacred glyphs shimmer with captured essence, each symbol a testament to the KILN's enduring power to transform individual burden into cosmic celebration.`,
                `As the story progresses, we witness the delicate balance between authority and consciousness, between preservation and celebration, between the orthodox way and the emerging truth.`
            ]
        };
    }

    initializeVisualChecklist() {
        // Initialize the simplified visual production checklist system
        const checklistContainer = document.getElementById('visualProductionChecklist');
        
        // Add event listeners for simplified checklist items
        checklistContainer.querySelectorAll('.checklist-item-simple').forEach(item => {
            item.addEventListener('click', (e) => {
                this.toggleChecklistItem(e.currentTarget);
            });
        });
        
        // Load saved state
        this.loadSimpleChecklistState();
    }

    toggleChecklistItem(item) {
        const itemKey = item.dataset.item;
        const toggle = item.querySelector('.checkbox-toggle');
        const isCompleted = item.classList.contains('completed');
        
        if (isCompleted) {
            // Unchecking
            item.classList.remove('completed');
            toggle.textContent = '[ ]';
            toggle.dataset.checked = 'false';
        } else {
            // Checking
            item.classList.add('completed');
            toggle.textContent = '[X]';
            toggle.dataset.checked = 'true';
        }
        
        // Save state
        this.saveSimpleChecklistState();
        
        // Check for completion
        this.checkSimpleCompletionStatus();
        
        // Show feedback
        const action = isCompleted ? 'unchecked' : 'checked';
        this.showNotification(`${itemKey.charAt(0).toUpperCase() + itemKey.slice(1)} ${action}`, 'success');
    }

    saveSimpleChecklistState() {
        const storageKey = `simple_checklist_${this.currentStory}_${this.currentChapter}`;
        const state = {};
        
        document.querySelectorAll('.checklist-item-simple').forEach(item => {
            const itemKey = item.dataset.item;
            state[itemKey] = item.classList.contains('completed');
        });
        
        localStorage.setItem(storageKey, JSON.stringify(state));
    }

    loadSimpleChecklistState() {
        const storageKey = `simple_checklist_${this.currentStory}_${this.currentChapter}`;
        const savedState = JSON.parse(localStorage.getItem(storageKey) || '{}');
        
        document.querySelectorAll('.checklist-item-simple').forEach(item => {
            const itemKey = item.dataset.item;
            const toggle = item.querySelector('.checkbox-toggle');
            
            if (savedState[itemKey]) {
                item.classList.add('completed');
                toggle.textContent = '[X]';
                toggle.dataset.checked = 'true';
            } else {
                item.classList.remove('completed');
                toggle.textContent = '[ ]';
                toggle.dataset.checked = 'false';
            }
        });
        
        // Check completion status after loading
        this.checkSimpleCompletionStatus();
    }

    checkSimpleCompletionStatus() {
        const items = document.querySelectorAll('.checklist-item-simple');
        const completedItems = document.querySelectorAll('.checklist-item-simple.completed');
        const lockStatus = document.getElementById('chapterLockStatus');
        
        if (completedItems.length === items.length && items.length > 0) {
            // All items completed - perform canonical validation
            this.performCanonicalValidation();
        } else {
            // Hide lock status if not all completed
            if (lockStatus) {
                lockStatus.style.display = 'none';
            }
        }
    }

    performCanonicalValidation() {
        // Simulate canonical validation process
        const lockStatus = document.getElementById('chapterLockStatus');
        
        // Show validation message first
        this.showNotification('Performing KILN Universe canonical validation...', 'info');
        
        setTimeout(() => {
            // Mark chapter as canonically validated and locked
            const chapterKey = `chapter_locked_${this.currentStory}_${this.currentChapter}`;
            localStorage.setItem(chapterKey, JSON.stringify({
                locked: true,
                timestamp: new Date().toISOString(),
                validated: true
            }));
            
            // Show lock status
            if (lockStatus) {
                lockStatus.style.display = 'block';
            }
            
            // Show completion celebration
            this.showCanonicalCompletionCelebration();
            
            // Disable further editing
            this.lockChapterForEditing();
            
        }, 2000); // 2 second validation delay
    }

    showCanonicalCompletionCelebration() {
        const celebration = document.createElement('div');
        celebration.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, 
                    var(--consciousness-blue) 0%, 
                    var(--transformation-gold) 50%,
                    var(--authority-red) 100%);
                color: white;
                padding: 3rem 4rem;
                border-radius: 25px;
                font-family: var(--title-font);
                font-size: 1.8rem;
                text-align: center;
                z-index: 10000;
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
                animation: canonicalCelebration 4s ease-out;
                border: 3px solid var(--transformation-gold);
            ">
                <div style="margin-bottom: 1rem;">
                    ◉ ✨ ◦
                </div>
                <div>Chapter ${this.currentChapter} Canonically Validated!</div>
                <div style="font-size: 1.2rem; margin-top: 1rem; opacity: 0.9;">
                    🔒 Locked for KILN Universe Consistency
                </div>
                <div style="font-size: 0.9rem; margin-top: 1rem; opacity: 0.8;">
                    "Consciousness preserved becomes consciousness celebrated"
                </div>
            </div>
        `;
        
        document.body.appendChild(celebration);
        
        // Add celebration animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes canonicalCelebration {
                0% { 
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5) rotateY(-180deg);
                }
                50% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1.1) rotateY(0deg);
                }
                100% { 
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1) rotateY(0deg);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Remove after animation
        setTimeout(() => {
            celebration.remove();
            style.remove();
        }, 4000);
    }

    lockChapterForEditing() {
        // Disable checklist interaction
        document.querySelectorAll('.checklist-item-simple').forEach(item => {
            item.style.pointerEvents = 'none';
            item.style.opacity = '0.7';
        });
        
        // Show locked state in UI
        this.showNotification('Chapter locked - All content validated for canonical consistency', 'success');
    }

    loadVisualChecklist() {
        // Load saved checklist state for current chapter using simplified system
        this.loadSimpleChecklistState();
        
        // Check if chapter is already locked
        const chapterKey = `chapter_locked_${this.currentStory}_${this.currentChapter}`;
        const lockState = JSON.parse(localStorage.getItem(chapterKey) || '{}');
        
        if (lockState.locked) {
            const lockStatus = document.getElementById('chapterLockStatus');
            if (lockStatus) {
                lockStatus.style.display = 'block';
            }
            this.lockChapterForEditing();
        }
    }

    handleChecklistUpdate(checkbox) {
        const item = checkbox.dataset.item;
        const isChecked = checkbox.checked;
        
        // Save state
        const storageKey = `checklist_${this.currentStory}_${this.currentChapter}`;
        const savedState = JSON.parse(localStorage.getItem(storageKey) || '{}');
        savedState[item] = isChecked;
        localStorage.setItem(storageKey, JSON.stringify(savedState));
        
        // Update visuals
        this.updateChecklistVisuals(checkbox, isChecked);
        
        // Check for completion
        this.checkCompletionStatus();
    }

    updateChecklistVisuals(checkbox, isChecked) {
        const item = checkbox.closest('.checklist-item');
        const status = item.querySelector('.check-status');
        
        if (isChecked) {
            item.classList.add('complete');
            status.textContent = '✨';
            status.className = 'check-status complete';
        } else {
            item.classList.remove('complete');
            const priority = item.classList.contains('critical') ? '⚠️' : '📝';
            status.textContent = priority;
            status.className = 'check-status';
        }
    }

    checkCompletionStatus() {
        const checkboxes = document.querySelectorAll('#visualProductionChecklist input[type="checkbox"]');
        const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
        
        if (completed === checkboxes.length) {
            this.showCompletionCelebration();
        }
    }

    showCompletionCelebration() {
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
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                animation: celebrationPulse 3s ease-out;
            ">
                ✨ Chapter ${this.currentChapter} Production Complete! ✨
                <div style="font-size: 1rem; margin-top: 0.5rem; opacity: 0.9;">
                    Ready for KILN Universe manifestation
                </div>
            </div>
        `;
        
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            if (celebration.parentNode) {
                celebration.parentNode.removeChild(celebration);
            }
        }, 4000);
    }

    toggleMonetization() {
        this.monetizationEnabled = !this.monetizationEnabled;
        const button = document.getElementById('monetizationToggle');
        
        if (this.monetizationEnabled) {
            button.textContent = '💰 ON';
            button.classList.add('monetization-on');
            button.classList.remove('monetization-off');
        } else {
            button.textContent = '💰 OFF';
            button.classList.add('monetization-off');
            button.classList.remove('monetization-on');
        }
        
        this.showNotification(`Monetization ${this.monetizationEnabled ? 'enabled' : 'disabled'}`, 'info');
        
        // Update platform settings
        if (window.kilnPlatform) {
            window.kilnPlatform.setMonetization(this.monetizationEnabled);
        }
    }

    checkDomain() {
        const domains = [
            'kilnuniverse.com',
            'kiln-universe.com', 
            'kilnuniverse.org',
            'consciousnesscodex.com',
            'sacred-kiln.com'
        ];
        
        let availabilityHTML = '<h3>KILN Universe Domain Availability</h3>';
        domains.forEach(domain => {
            const available = Math.random() > 0.5; // Mock check
            availabilityHTML += `
                <div style="padding: 0.5rem; margin: 0.5rem 0; background: ${available ? 'rgba(74, 144, 226, 0.2)' : 'rgba(231, 76, 60, 0.2)'}; border-radius: 8px;">
                    ${domain} - ${available ? '✅ Available' : '❌ Taken'}
                </div>
            `;
        });
        
        this.showModal('Domain Check', availabilityHTML);
    }

    handleKeyboardNavigation(e) {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.navigateChapter(-1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.navigateChapter(1);
                break;
            case ' ':
                e.preventDefault();
                this.toggleIntegratedText();
                break;
            case 'c':
            case 'C':
                e.preventDefault();
                this.toggleVisualChecklist();
                break;
            case 's':
            case 'S':
                e.preventDefault();
                this.openSettings();
                break;
            case 'n':
            case 'N':
                e.preventDefault();
                this.toggleNavigation();
                break;
            case 't':
            case 'T':
                e.preventDefault();
                // Check if therapeutic mode is available
                const therapeuticButton = document.querySelector('.glyph-nav-button.therapeutic-mode');
                if (therapeuticButton) {
                    this.activateTherapeuticMode();
                } else {
                    this.toggleIntegratedText();
                }
                break;
            case 'l':
            case 'L':
                e.preventDefault();
                this.toggleIntegratedText();
                break;
            case '1':
                e.preventDefault();
                this.toggleHeaderChapter();
                break;
            case 'h':
            case 'H':
                e.preventDefault();
                this.toggleHeaderChapter();
                break;
        }
    }

    setupResponsiveHandling() {
        // Handle responsive layout changes
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        this.handleResize();
    }

    handleResize() {
        const container = document.getElementById('kilnApp');
        const width = window.innerWidth;
        
        if (width <= 768) {
            container.classList.add('mobile-layout');
        } else {
            container.classList.remove('mobile-layout');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: var(--consciousness-blue);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    showModal(title, content) {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            ">
                <div style="
                    background: var(--kiln-dark);
                    color: var(--ceramic-cream);
                    padding: 2rem;
                    border-radius: 20px;
                    max-width: 500px;
                    width: 90%;
                    border: 2px solid var(--consciousness-blue);
                ">
                    <h3 style="color: var(--transformation-gold); margin-bottom: 1rem;">${title}</h3>
                    <div>${content}</div>
                    <button onclick="this.closest('div').parentElement.remove()" style="
                        background: var(--consciousness-blue);
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 10px;
                        margin-top: 1.5rem;
                        cursor: pointer;
                    ">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    openSettings() {
        const settingsContent = `
            <div style="font-family: var(--body-font);">
                <h4 style="color: var(--consciousness-blue); margin-bottom: 1rem;">Reader Settings</h4>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem;">Font Size:</label>
                    <input type="range" min="12" max="24" value="16" style="width: 100%;">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem;">Color Theme:</label>
                    <select style="width: 100%; padding: 0.5rem; background: var(--ceramic-cream); border-radius: 5px;">
                        <option>Orthodox (Red)</option>
                        <option>Consciousness (Blue)</option>
                        <option>Balanced (Gold)</option>
                    </select>
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: flex; align-items: center;">
                        <input type="checkbox" style="margin-right: 0.5rem;"> Auto-expand text
                    </label>
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: flex; align-items: center;">
                        <input type="checkbox" style="margin-right: 0.5rem;"> Keyboard navigation
                    </label>
                </div>
            </div>
        `;
        
        this.showModal('KILN Universe Settings', settingsContent);
    }

    loadStoryConfiguration() {
        // Load the current story configuration
        const config = this.storyConfigs[this.currentStory];
        this.totalChapters = config.totalChapters;
        
        // Update UI elements
        document.getElementById('currentStoryTitle').textContent = config.title;
        document.getElementById('totalChapters').textContent = config.totalChapters;
        document.getElementById('currentChapter').textContent = this.currentChapter;
        
        // Apply color theme
        this.applyColorTheme(config.colorTheme);
        
        // Load initial content
        this.loadChapterContent();
    }

    // Expandable Navigation Panel System
    setupExpandableNavigation() {
        // Add click listeners to all expandable navigation buttons
        document.querySelectorAll('.nav-button-container.expandable-nav .glyph-nav-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const container = e.target.closest('.nav-button-container.expandable-nav');
                this.toggleNavPanel(container);
            });
        });
    }

    toggleNavPanel(container) {
        const isExpanded = container.dataset.expanded === 'true';
        const panelContent = container.querySelector('.nav-panel-content');
        
        if (isExpanded) {
            this.closeNavPanel(container);
        } else {
            // Close other panels first
            this.closeAllNavPanels();
            this.openNavPanel(container);
        }
    }

    openNavPanel(container) {
        const panelContent = container.querySelector('.nav-panel-content');
        
        container.dataset.expanded = 'true';
        panelContent.style.display = 'block';
        panelContent.classList.add('expanding');
        
        setTimeout(() => {
            panelContent.classList.add('expanded');
            panelContent.classList.remove('expanding');
        }, 10);
        
        this.expandedPanels.add(container);
    }

    closeNavPanel(container) {
        const panelContent = container.querySelector('.nav-panel-content');
        
        container.dataset.expanded = 'false';
        panelContent.classList.remove('expanded');
        
        setTimeout(() => {
            panelContent.style.display = 'none';
        }, 400);
        
        this.expandedPanels.delete(container);
    }

    closeAllNavPanels() {
        this.expandedPanels.forEach(container => {
            this.closeNavPanel(container);
        });
        this.expandedPanels.clear();
    }

    handlePanelOptionClick(option) {
        const action = option.dataset.action;
        
        switch(action) {
            case 'prev-panel':
                this.navigatePanel(-1);
                break;
            case 'next-panel':
                this.navigatePanel(1);
                break;
            case 'prev-chapter':
                this.navigateChapter(-1);
                break;
            case 'next-chapter':
                this.navigateChapter(1);
                break;
            case 'first-panel':
                this.goToPanel(1);
                break;
            case 'last-panel':
                this.goToPanel(this.totalPanels);
                break;
            case 'edit-text':
                this.enterEditMode('text');
                break;
            case 'edit-scene':
                this.enterEditMode('scene');
                break;
            case 'checklist':
                this.toggleVisualChecklist();
                break;
            case 'ascending':
                this.setChapterOrder('ascending');
                break;
            case 'descending':
                this.setChapterOrder('descending');
                break;
            case 'custom':
                this.setChapterOrder('custom');
                break;
        }
        
        // Close panels after action
        this.closeAllNavPanels();
    }

    navigatePanel(direction) {
        const newPanel = this.currentPanel + direction;
        if (newPanel >= 1 && newPanel <= this.totalPanels) {
            this.currentPanel = newPanel;
            this.updatePanelDisplay();
            this.showNotification(`Panel ${this.currentPanel} of ${this.totalPanels}`, 'info');
        } else if (direction > 0 && newPanel > this.totalPanels) {
            // Move to next chapter, panel 1
            this.navigateChapter(1);
            this.currentPanel = 1;
            this.updatePanelDisplay();
        } else if (direction < 0 && newPanel < 1) {
            // Move to previous chapter, last panel
            this.navigateChapter(-1);
            this.currentPanel = this.totalPanels;
            this.updatePanelDisplay();
        }
    }

    goToPanel(panelNumber) {
        if (panelNumber >= 1 && panelNumber <= this.totalPanels) {
            this.currentPanel = panelNumber;
            this.updatePanelDisplay();
            this.showNotification(`Jumped to Panel ${this.currentPanel}`, 'success');
        }
    }

    updatePanelDisplay() {
        document.getElementById('currentPanel').textContent = this.currentPanel;
        document.getElementById('totalPanels').textContent = this.totalPanels;
        document.getElementById('currentChapter').textContent = this.currentChapter;
    }

    enterEditMode(type) {
        this.showNotification(`Entering ${type} edit mode...`, 'info');
        // Add edit mode functionality here
        console.log(`Edit mode: ${type}`);
    }

    setChapterOrder(order) {
        this.chapterOrder = order;
        
        // Update active state in UI
        document.querySelectorAll('.panel-option[data-action*="ending"], .panel-option[data-action="custom"]').forEach(option => {
            option.classList.remove('active');
        });
        
        document.querySelector(`.panel-option[data-action="${order}"]`).classList.add('active');
        
        this.showNotification(`Chapter order: ${order}`, 'success');
        
        // Apply the ordering logic
        this.applyChapterOrder();
    }

    applyChapterOrder() {
        // Implementation for chapter ordering
        console.log(`Applying ${this.chapterOrder} chapter order`);
    }
}

// CSS Animation for celebration
const celebrationCSS = `
@keyframes celebrationPulse {
    0% { 
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0;
    }
    20% {
        transform: translate(-50%, -50%) scale(1.1);
        opacity: 1;
    }
    40% {
        transform: translate(-50%, -50%) scale(0.95);
    }
    60% {
        transform: translate(-50%, -50%) scale(1.05);
    }
    80% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0;
    }
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;

// Inject celebration CSS
const style = document.createElement('style');
style.textContent = celebrationCSS;
document.head.appendChild(style);