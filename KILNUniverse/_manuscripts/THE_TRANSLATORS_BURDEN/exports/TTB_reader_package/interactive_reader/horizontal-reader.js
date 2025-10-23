// KILN UNIVERSE - HORIZONTAL READER CONTROLLER
// Sacred scrolling experience for consciousness narratives

class HorizontalReader {
    constructor() {
        this.currentStoryId = 'first-void';
        this.currentChapter = 1;
        this.currentPanel = 0;
        this.totalPanels = 0;
        this.isScrolling = false;
        this.scrollHintDismissed = false;

        // Touch gesture tracking
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.touchStartY = 0;
        this.touchEndY = 0;

        // Markdown loader instance
        this.markdownLoader = new MarkdownLoader();

        // Story configurations (will be loaded from JSON)
        this.storyConfigs = null;

        // Current chapter data
        this.currentChapterData = null;

        this.init();
    }

    async init() {
        // Get story and chapter from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        this.currentStoryId = urlParams.get('story') || 'first-void';
        this.currentChapter = parseInt(urlParams.get('chapter')) || 1;

        // Load chapter data from JSON
        this.storyConfigs = await this.markdownLoader.loadChapterData();

        if (!this.storyConfigs) {
            this.showError('Failed to load story data');
            return;
        }

        // Initialize UI
        this.updateStoryInfo();
        await this.loadChapterPanels();
        this.setupEventListeners();

        // Only show scroll hint on chapter 1
        if (this.currentChapter === 1) {
            console.log('📌 Chapter 1 detected - showing scroll hint');
            this.showScrollHint();
            // Hide scroll hint after 5 seconds or first interaction
            setTimeout(() => this.hideScrollHint(), 5000);
        } else {
            console.log('📌 Chapter', this.currentChapter, '- NO scroll hint');
        }

        // Auto-focus the scroll wrapper so keyboard navigation works immediately
        setTimeout(() => {
            const wrapper = document.getElementById('chapterScrollWrapper');
            if (wrapper) {
                wrapper.focus();
                console.log('Scroll wrapper focused for keyboard navigation');
            }
        }, 300);
    }

    showError(message) {
        const wrapper = document.getElementById('chapterScrollWrapper');
        wrapper.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; color: var(--ceramic-cream);">
                <div style="text-align: center; padding: 2rem;">
                    <h2 style="font-family: var(--title-font); color: var(--transformation-gold); margin-bottom: 1rem;">Error Loading Chapter</h2>
                    <p>${message}</p>
                    <p style="margin-top: 1rem;"><a href="consciousness-codex-title.html" style="color: var(--consciousness-blue);">Return to Title Screen</a></p>
                </div>
            </div>
        `;
    }

    updateStoryInfo() {
        if (!this.storyConfigs) return;

        const config = this.storyConfigs[this.currentStoryId];
        if (!config) return;

        document.getElementById('storyTitle').textContent = config.title;
        document.getElementById('chapterIndicator').textContent =
            `Chapter ${this.currentChapter} of ${config.totalChapters}`;

        // Update back link
        const backLink = document.getElementById('backLink');
        backLink.href = `story-view.html?id=${this.currentStoryId}`;
    }

    async loadChapterPanels() {
        // Load chapter from markdown
        const chapterData = await this.markdownLoader.loadChapter(this.currentStoryId, this.currentChapter);

        if (!chapterData) {
            this.showError(`Failed to load chapter ${this.currentChapter}`);
            return;
        }

        this.currentChapterData = chapterData;

        // Update chapter info in navigation
        document.getElementById('navChapterTitle').textContent = chapterData.chapter.title;
        document.getElementById('navChapterSubtitle').textContent = chapterData.chapter.subtitle || '';

        // Load panels
        const wrapper = document.getElementById('chapterScrollWrapper');
        wrapper.innerHTML = '';

        chapterData.panels.forEach((panelData, index) => {
            const panel = this.createPanel(panelData, index);
            wrapper.appendChild(panel);
        });

        this.totalPanels = chapterData.panels.length;
        this.currentPanel = 0;

        // Create progress indicators
        this.createProgressIndicators();

        // Update navigation buttons
        this.updateNavigationButtons();

        // Re-focus wrapper after loading panels
        setTimeout(() => {
            wrapper.focus();
            console.log('Wrapper re-focused after loading panels');
        }, 100);
    }

    createPanel(panelData, index) {
        const panel = document.createElement('section');
        panel.className = 'chapter-panel';
        panel.dataset.panel = index;
        panel.dataset.type = panelData.type || 'image-text';

        // Create background
        const background = document.createElement('div');
        background.className = 'panel-background';
        // Use backgroundImage property from markdown data
        const bgImage = panelData.backgroundImage || panelData.image;
        if (bgImage) {
            background.style.backgroundImage = `url('${bgImage}')`;
        }
        panel.appendChild(background);

        // Create content overlay
        if (panelData.type !== 'image-only') {
            const content = document.createElement('div');
            content.className = 'panel-content';

            let html = '';
            if (panelData.title) {
                html += `<h2>${panelData.title}</h2>`;
            }
            if (panelData.subtitle) {
                html += `<h3>${panelData.subtitle}</h3>`;
            }
            if (panelData.content) {
                html += panelData.content;
            }

            content.innerHTML = html;
            panel.appendChild(content);
        }

        return panel;
    }

    createProgressIndicators() {
        const progressGlyphs = document.getElementById('progressGlyphs');
        progressGlyphs.innerHTML = '';

        const glyphs = ['◦', '◉', '◈', '∿', '⟐', '⚡', '〰', '⟆'];

        for (let i = 0; i < this.totalPanels; i++) {
            const glyph = document.createElement('span');
            glyph.className = 'progress-glyph';
            glyph.dataset.panel = i;
            glyph.textContent = glyphs[i % glyphs.length];

            if (i === 0) {
                glyph.classList.add('active');
            }

            // Click to navigate
            glyph.addEventListener('click', () => {
                this.scrollToPanel(i);
            });

            progressGlyphs.appendChild(glyph);
        }

        this.updateProgressText();
    }

    updateProgressText() {
        const progressText = document.getElementById('progressText');
        progressText.textContent = `Panel ${this.currentPanel + 1} of ${this.totalPanels}`;
    }

    setupEventListeners() {
        const wrapper = document.getElementById('chapterScrollWrapper');

        // Scroll event - update current panel
        wrapper.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Touch gestures
        wrapper.addEventListener('touchstart', (e) => {
            this.handleTouchStart(e);
        });

        wrapper.addEventListener('touchend', (e) => {
            this.handleTouchEnd(e);
        });

        // Keyboard navigation: prefer wrapper when focused for panel navigation
        wrapper.addEventListener('keydown', (e) => {
            console.log('Wrapper keydown:', e.key);
            // Only handle navigation keys here
            const navKeys = ['ArrowLeft','ArrowRight','Home','End','PageUp','PageDown'];
            if (navKeys.includes(e.key)) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Handling navigation key:', e.key);
                this.handleKeyboard(e);
            }
        });

        // Ensure wrapper receives focus when clicked or touched so keyboard works
        wrapper.addEventListener('click', () => {
            wrapper.focus();
            console.log('Wrapper focused via click');
        });
        wrapper.addEventListener('touchstart', () => {
            wrapper.focus();
            console.log('Wrapper focused via touch');
        });

        // Global keyboard handler for ALL navigation keys as fallback
        document.addEventListener('keydown', (e) => {
            console.log('Document keydown:', e.key);
            const navKeys = ['ArrowLeft','ArrowRight','Home','End','PageUp','PageDown'];
            if (navKeys.includes(e.key)) {
                e.preventDefault();
                console.log('Global handler - navigating with:', e.key);
                this.handleKeyboard(e);
            } else if (e.key === '?' || e.key === 'Escape') {
                this.handleKeyboard(e);
            }
        });

        // Chapter navigation buttons
        document.getElementById('prevChapterBtn').addEventListener('click', () => {
            this.navigateChapter(-1);
        });

        document.getElementById('nextChapterBtn').addEventListener('click', () => {
            this.navigateChapter(1);
        });

        // Keyboard help
        document.getElementById('closeHelp').addEventListener('click', () => {
            this.toggleKeyboardHelp(false);
        });

        // Chapter end modal buttons
        document.getElementById('modalContinueBtn').addEventListener('click', () => {
            this.handleModalContinue();
        });

        document.getElementById('modalStayBtn').addEventListener('click', () => {
            this.handleModalStay();
        });

        // Dismiss scroll hint on first scroll
        wrapper.addEventListener('scroll', () => {
            if (!this.scrollHintDismissed) {
                this.hideScrollHint();
            }
        }, { once: true });
    }

    handleScroll() {
        if (this.isScrolling) return;

        const wrapper = document.getElementById('chapterScrollWrapper');
        const scrollLeft = wrapper.scrollLeft;
        const panelWidth = wrapper.offsetWidth;

        // Calculate current panel (with threshold for snap)
        const newPanel = Math.round(scrollLeft / panelWidth);

        if (newPanel !== this.currentPanel && newPanel >= 0 && newPanel < this.totalPanels) {
            this.currentPanel = newPanel;
            this.updateActivePanel();
            this.updateProgressIndicator();
            this.updateProgressText();
        }
    }

    updateActivePanel() {
        // Update visual state of active panel
        document.querySelectorAll('.chapter-panel').forEach((panel, index) => {
            if (index === this.currentPanel) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    }

    updateProgressIndicator() {
        document.querySelectorAll('.progress-glyph').forEach((glyph, index) => {
            if (index === this.currentPanel) {
                glyph.classList.add('active');
            } else {
                glyph.classList.remove('active');
            }
        });
    }

    scrollToPanel(panelIndex) {
        console.log('scrollToPanel called:', panelIndex, 'of', this.totalPanels);

        if (panelIndex < 0 || panelIndex >= this.totalPanels) {
            console.log('Panel index out of bounds, ignoring');
            return;
        }

        const wrapper = document.getElementById('chapterScrollWrapper');
        if (!wrapper) {
            console.error('Scroll wrapper not found!');
            return;
        }

        const panelWidth = wrapper.offsetWidth;
        const targetScroll = panelIndex * panelWidth;

        console.log('Scrolling to position:', targetScroll, '(panel width:', panelWidth + ')');

        this.isScrolling = true;

        // Use scrollTo with smooth behavior
        wrapper.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });

        // Update current panel immediately for better UX
        this.currentPanel = panelIndex;
        this.updateProgressIndicator();
        this.updateProgressText();
        this.updateActivePanel();

        // Reset scrolling flag after animation
        setTimeout(() => {
            this.isScrolling = false;
        }, 800);
    }

    handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
        this.touchStartY = e.changedTouches[0].screenY;
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].screenX;
        this.touchEndY = e.changedTouches[0].screenY;
        this.handleSwipe();
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const swipeXDistance = Math.abs(this.touchStartX - this.touchEndX);
        const swipeYDistance = Math.abs(this.touchStartY - this.touchEndY);

        // Only handle horizontal swipes (ignore vertical)
        if (swipeXDistance > swipeYDistance && swipeXDistance > swipeThreshold) {
            if (this.touchStartX > this.touchEndX) {
                // Swipe left (next panel)
                // Check if we're on the last panel
                if (this.currentPanel === this.totalPanels - 1) {
                    // On last panel - show chapter end modal
                    console.log('🎯 Swiped on last panel, checking for next chapter...');
                    const totalChapters = this.getTotalChapters();
                    if (this.currentChapter < totalChapters) {
                        // Not the last chapter - show next chapter prompt
                        this.showNextChapterPrompt();
                    } else {
                        // Last chapter - show story completed prompt
                        this.showStoryCompletedPrompt();
                    }
                } else {
                    // Normal navigation
                    this.scrollToPanel(this.currentPanel + 1);
                }
            } else {
                // Swipe right (previous panel)
                this.scrollToPanel(this.currentPanel - 1);
            }

            this.hideScrollHint();
        }
    }

    handleKeyboard(e) {
        console.log('handleKeyboard called with:', e.key, 'Current panel:', this.currentPanel, 'Total:', this.totalPanels);

        // Check if modal is open for modal-specific keyboard handling
        const modal = document.getElementById('chapterEndModal');
        const isModalOpen = !modal.classList.contains('hidden');

        if (isModalOpen) {
            // Modal keyboard handling
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleModalContinue();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                this.closeChapterEndModal();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.handleModalContinue();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.handleModalStay();
            }
            return; // Don't process other keyboard events when modal is open
        }

        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                const prevPanel = Math.max(0, this.currentPanel - 1);
                console.log('Scrolling to previous panel:', prevPanel);
                this.scrollToPanel(prevPanel);
                this.hideScrollHint();
                break;

            case 'ArrowRight':
                e.preventDefault();
                // Check if we're on the last panel
                if (this.currentPanel === this.totalPanels - 1) {
                    // On last panel - show chapter end modal
                    console.log('🎯 On last panel, checking for next chapter...');
                    const totalChapters = this.getTotalChapters();
                    if (this.currentChapter < totalChapters) {
                        // Not the last chapter - show next chapter prompt
                        this.showNextChapterPrompt();
                    } else {
                        // Last chapter - show story completed prompt
                        this.showStoryCompletedPrompt();
                    }
                } else {
                    // Normal navigation
                    const nextPanel = this.currentPanel + 1;
                    console.log('Scrolling to next panel:', nextPanel);
                    this.scrollToPanel(nextPanel);
                    this.hideScrollHint();
                }
                break;

            case 'Home':
                e.preventDefault();
                this.scrollToPanel(0);
                break;

            case 'End':
                e.preventDefault();
                this.scrollToPanel(this.totalPanels - 1);
                break;

            case 'PageUp':
                e.preventDefault();
                this.navigateChapter(-1);
                break;

            case 'PageDown':
                e.preventDefault();
                this.navigateChapter(1);
                break;

            case '?':
                e.preventDefault();
                this.toggleKeyboardHelp();
                break;

            case 'Escape':
                e.preventDefault();
                if (!document.getElementById('keyboardHelp').classList.contains('hidden')) {
                    this.toggleKeyboardHelp(false);
                } else {
                    window.location.href = `story-view.html?id=${this.currentStoryId}`;
                }
                break;
        }
    }

    navigateChapter(direction) {
        if (!this.storyConfigs) return;

        const config = this.storyConfigs[this.currentStoryId];
        if (!config) return;

        const newChapter = this.currentChapter + direction;

        if (newChapter < 1 || newChapter > config.totalChapters) {
            return;
        }

        // Update URL and reload
        const url = new URL(window.location.href);
        url.searchParams.set('chapter', newChapter);
        window.location.href = url.toString();
    }

    updateNavigationButtons() {
        if (!this.storyConfigs) return;

        const config = this.storyConfigs[this.currentStoryId];
        if (!config) return;

        const prevBtn = document.getElementById('prevChapterBtn');
        const nextBtn = document.getElementById('nextChapterBtn');

        // Update disabled state
        prevBtn.disabled = this.currentChapter <= 1;
        nextBtn.disabled = this.currentChapter >= config.totalChapters;

        // Update button text
        if (this.currentChapter > 1) {
            prevBtn.querySelector('.nav-text').textContent = `Chapter ${this.currentChapter - 1}`;
        }
        if (this.currentChapter < config.totalChapters) {
            nextBtn.querySelector('.nav-text').textContent = `Chapter ${this.currentChapter + 1}`;
        }
    }

    showScrollHint() {
        const hint = document.getElementById('scrollHint');
        hint.classList.remove('hidden');
        hint.classList.add('visible');
        console.log('✨ Scroll hint shown (Chapter 1 only)');
    }

    hideScrollHint() {
        const hint = document.getElementById('scrollHint');
        hint.classList.remove('visible');
        hint.classList.add('hidden');
        this.scrollHintDismissed = true;
        console.log('🚫 Scroll hint hidden');
    }

    toggleKeyboardHelp(show = null) {
        const help = document.getElementById('keyboardHelp');

        if (show === null) {
            help.classList.toggle('hidden');
        } else if (show) {
            help.classList.remove('hidden');
        } else {
            help.classList.add('hidden');
        }
    }

    // ==========================================
    // CHAPTER END MODAL FUNCTIONS
    // ==========================================

    showNextChapterPrompt() {
        if (!this.storyConfigs || !this.currentChapterData) return;

        const config = this.storyConfigs[this.currentStoryId];
        const nextChapter = this.currentChapter + 1;

        // Get chapter titles from loaded data
        const currentChapterTitle = this.currentChapterData.chapter.title || `Chapter ${this.currentChapter}`;

        const modal = document.getElementById('chapterEndModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const modalChapterName = document.getElementById('modalChapterName');
        const modalPrompt = document.getElementById('modalPrompt');
        const modalNextChapter = document.getElementById('modalNextChapter');

        modalTitle.textContent = `End of Chapter ${this.currentChapter}`;
        modalMessage.innerHTML = `You've reached the end of<br><span class="modal-chapter-name">"${currentChapterTitle}"</span>`;
        modalPrompt.innerHTML = `Continue to Chapter ${nextChapter}?`;
        modalNextChapter.textContent = ''; // We don't know next chapter title yet

        modal.classList.remove('hidden');
        console.log('📌 Chapter end modal shown');
    }

    showStoryCompletedPrompt() {
        if (!this.storyConfigs || !this.currentChapterData) return;

        const config = this.storyConfigs[this.currentStoryId];
        const currentChapterTitle = this.currentChapterData.chapter.title || `Chapter ${this.currentChapter}`;

        const modal = document.getElementById('chapterEndModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const modalPrompt = document.getElementById('modalPrompt');
        const modalContinueBtn = document.getElementById('modalContinueBtn');
        const modalStayBtn = document.getElementById('modalStayBtn');

        modalTitle.textContent = `Story Complete!`;
        modalMessage.innerHTML = `You've completed<br><span class="modal-chapter-name">"${config.title}"</span>`;
        modalPrompt.textContent = `Congratulations on finishing the journey!`;

        // Change button labels for story completion
        modalContinueBtn.textContent = 'Return to Stories';
        modalStayBtn.textContent = 'Restart Chapter 1';

        modal.classList.remove('hidden');
        console.log('📌 Story completed modal shown');
    }

    closeChapterEndModal() {
        const modal = document.getElementById('chapterEndModal');
        modal.classList.add('hidden');

        // Reset button labels
        document.getElementById('modalContinueBtn').textContent = 'Continue →';
        document.getElementById('modalStayBtn').textContent = 'Stay Here';

        console.log('📌 Chapter end modal closed');
    }

    handleModalContinue() {
        if (!this.storyConfigs) return;

        const config = this.storyConfigs[this.currentStoryId];

        if (this.currentChapter >= config.totalChapters) {
            // Last chapter - return to story selection
            window.location.href = 'consciousness-codex-title.html';
        } else {
            // Navigate to next chapter
            this.navigateToNextChapter();
        }
    }

    handleModalStay() {
        const config = this.storyConfigs[this.currentStoryId];

        if (this.currentChapter >= config.totalChapters) {
            // Restart chapter 1
            const url = new URL(window.location.href);
            url.searchParams.set('chapter', 1);
            window.location.href = url.toString();
        } else {
            // Just close modal
            this.closeChapterEndModal();
        }
    }

    navigateToNextChapter() {
        if (!this.storyConfigs) return;

        const config = this.storyConfigs[this.currentStoryId];
        const nextChapter = this.currentChapter + 1;

        if (nextChapter > config.totalChapters) {
            return;
        }

        // Update URL and navigate
        const url = new URL(window.location.href);
        url.searchParams.set('chapter', nextChapter);
        window.location.href = url.toString();
    }

    getTotalChapters() {
        if (!this.storyConfigs) return 0;
        const config = this.storyConfigs[this.currentStoryId];
        return config ? config.totalChapters : 0;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.horizontalReader = new HorizontalReader();
});
