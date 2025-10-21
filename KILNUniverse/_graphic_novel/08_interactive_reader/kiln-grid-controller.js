// KILN UNIVERSE - Grid Controller with Sacred Glyph Navigation
class KilnGridController {
    constructor() {
        this.currentStory = 'translators-burden';
        this.currentChapter = 1;
        this.totalChapters = 12;
        this.manuscriptExpanded = false;
        this.checklistVisible = false;
        this.monetizationEnabled = true;
        this.navigationExpanded = false;
        
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
            toggle.innerHTML = '<span>◦</span>';
            toggle.setAttribute('title', 'Collapse Navigation');
        } else {
            navigation.classList.remove('expanded');
            toggle.innerHTML = '<span>◉</span>';
            toggle.setAttribute('title', 'Expand Navigation');
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
        const section = document.getElementById('visualChecklistSection');
        const button = document.getElementById('checklistToggle');
        
        this.checklistVisible = !this.checklistVisible;
        
        if (this.checklistVisible) {
            section.style.display = 'block';
            this.loadVisualChecklist();
            // Auto-expand manuscript if not already expanded
            if (!this.manuscriptExpanded) {
                this.toggleManuscript();
            }
            // Auto-expand navigation if not already expanded
            if (!this.navigationExpanded) {
                this.toggleNavigation();
            }
        } else {
            section.style.display = 'none';
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
        const chapterTitle = document.getElementById('chapterTitle');
        const chapterSubtitle = document.getElementById('chapterSubtitle');
        const manuscriptText = document.getElementById('manuscriptText');
        
        const config = this.storyConfigs[this.currentStory];
        
        // Generate chapter-specific content
        const chapterData = this.generateChapterData();
        
        chapterTitle.textContent = `Chapter ${this.currentChapter}: ${chapterData.title}`;
        chapterSubtitle.textContent = chapterData.subtitle;
        
        // Load manuscript text with water flow effect
        manuscriptText.innerHTML = `
            <div class="chapter-text">
                ${chapterData.content.map(paragraph => `<p>${paragraph}</p>`).join('')}
            </div>
        `;
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
        // Initialize the visual production checklist system with canonical KILN integration
        const checklistContainer = document.getElementById('visualProductionChecklist');
        
        checklistContainer.innerHTML = `
            <div class="visual-checklist-container">
                <div class="checklist-header">
                    <h5 style="color: var(--transformation-gold); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="color: var(--consciousness-blue);">◉</span>
                        Visual Production Checklist
                        <span style="color: var(--transformation-gold);">◦</span>
                    </h5>
                </div>
                <div class="checklist-items">
                    <div class="checklist-item critical">
                        <label class="mini-checkbox">
                            <input type="checkbox" data-item="tone">
                            <span class="mini-checkmark"></span>
                            <span class="check-label">
                                <strong>🎵 Tone & Atmosphere</strong>
                                <br><small>Orthodox KILN mood, consciousness energy, sacred atmosphere</small>
                                <div class="canonical-link" data-canon="tone">
                                    <span style="color: var(--consciousness-blue); font-size: 0.7rem;">◦ Linked to: Orthodox Period Atmosphere</span>
                                </div>
                            </span>
                        </label>
                        <div class="glyph-space" data-item="tone">
                            <span class="sacred-glyph">◦</span>
                        </div>
                        <span class="check-status">⚠️</span>
                    </div>
                    
                    <div class="checklist-item important">
                        <label class="mini-checkbox">
                            <input type="checkbox" data-item="glyphs">
                            <span class="mini-checkmark"></span>
                            <span class="check-label">
                                <strong>⚡ Sacred Glyphs</strong>
                                <br><small>KILN codex symbols, consciousness patterns, orthodox markings</small>
                                <div class="canonical-link" data-canon="glyphs">
                                    <span style="color: var(--transformation-gold); font-size: 0.7rem;">◉ Linked to: KILN Codex Glyph System</span>
                                </div>
                            </span>
                        </label>
                        <div class="glyph-space" data-item="glyphs">
                            <span class="sacred-glyph">◉</span>
                        </div>
                        <span class="check-status">📝</span>
                    </div>
                    
                    <div class="checklist-item critical">
                        <label class="mini-checkbox">
                            <input type="checkbox" data-item="characters">
                            <span class="mini-checkmark"></span>
                            <span class="check-label">
                                <strong>👤 Character Images</strong>
                                <br><small>Accurate representation, canonical appearance, sacred vestments</small>
                                <div class="canonical-link" data-canon="characters">
                                    <span style="color: var(--authority-red); font-size: 0.7rem;">◦ Linked to: Character Archetypes Canonical</span>
                                </div>
                            </span>
                        </label>
                        <div class="glyph-space" data-item="characters">
                            <span class="sacred-glyph">◦</span>
                        </div>
                        <span class="check-status">⚠️</span>
                    </div>
                    
                    <div class="checklist-item important">
                        <label class="mini-checkbox">
                            <input type="checkbox" data-item="missing">
                            <span class="mini-checkmark"></span>
                            <span class="check-label">
                                <strong>🔍 Missing Elements</strong>
                                <br><small>Completeness check, visual consistency, story continuity</small>
                                <div class="canonical-link" data-canon="missing">
                                    <span style="color: var(--consciousness-blue); font-size: 0.7rem;">◉ AI Prompt Analysis: KILN Law Codex Timeline</span>
                                </div>
                            </span>
                        </label>
                        <div class="glyph-space" data-item="missing">
                            <span class="sacred-glyph">◉</span>
                        </div>
                        <span class="check-status">📝</span>
                    </div>
                    
                    <div class="checklist-item critical">
                        <label class="mini-checkbox">
                            <input type="checkbox" data-item="universe">
                            <span class="mini-checkmark"></span>
                            <span class="check-label">
                                <strong>🌌 KILN Universe Style</strong>
                                <br><small>Color palette, world authenticity, canonical consistency</small>
                                <div class="canonical-link" data-canon="universe">
                                    <span style="color: var(--transformation-gold); font-size: 0.7rem;">◦ Linked to: Universe Foundation Complete</span>
                                </div>
                            </span>
                        </label>
                        <div class="glyph-space" data-item="universe">
                            <span class="sacred-glyph">◦</span>
                        </div>
                        <span class="check-status">⚠️</span>
                    </div>
                </div>
                
                <!-- Canonical Reference Panel -->
                <div class="canonical-reference-panel" style="margin-top: 1.5rem; padding: 1rem; background: rgba(74, 144, 226, 0.1); border-radius: 8px; border: 1px solid var(--consciousness-blue);">
                    <h6 style="color: var(--transformation-gold); margin-bottom: 0.5rem; font-family: var(--title-font);">📚 Canonical References Active:</h6>
                    <div class="active-references">
                        <small style="color: var(--ceramic-cream); opacity: 0.8;">
                            ◉ _canonical_imagery/02_character_archetypes/<br>
                            ◦ _canonical_foundation/CANONICAL_CODEX_GLYPH_SYSTEM_COMPLETE.md<br>
                            ◉ _canonical_imagery/06_timeline_eras/orthodox_period/
                        </small>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners for checklist items
        checklistContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleChecklistUpdate(e.target);
            });
        });
        
        // Add canonical link clicks
        checklistContainer.querySelectorAll('.canonical-link').forEach(link => {
            link.addEventListener('click', (e) => {
                this.openCanonicalReference(e.target.dataset.canon);
            });
        });
    }

    loadVisualChecklist() {
        // Load saved checklist state for current chapter
        const storageKey = `checklist_${this.currentStory}_${this.currentChapter}`;
        const savedState = JSON.parse(localStorage.getItem(storageKey) || '{}');
        
        document.querySelectorAll('#visualProductionChecklist input[type="checkbox"]').forEach(checkbox => {
            const item = checkbox.dataset.item;
            if (savedState[item]) {
                checkbox.checked = true;
                this.updateChecklistVisuals(checkbox, true);
            }
        });
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
                this.toggleManuscript();
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
                    this.toggleVisualChecklist();
                }
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