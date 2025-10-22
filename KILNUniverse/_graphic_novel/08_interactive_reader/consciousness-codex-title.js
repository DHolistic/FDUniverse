// CONSCIOUSNESS CODEX TITLE SCREEN CONTROLLER
// KILN Universe Foundation - Sacred Gateway Experience

class ConsciousnessCodexTitle {
    constructor() {
        this.isLoading = true;
        this.selectedStory = null;
        this.animationStates = {
            loadingComplete: false,
            titleRevealed: false,
            interactionEnabled: false
        };
        
        // Story configurations matching the main interface
        this.storyConfigs = {
            'translators-burden': {
                title: "The Translator's Burden",
                subtitle: 'Orthodox KILN Prequel',
                targetPage: 'kiln-grid-index.html',
                backgroundImage: '../_canonical_imagery/02_character_archetypes/methodius_terev_canonical.jpg',
                description: 'Methodius Terev navigates the dangerous waters of translating consciousness concepts while maintaining KILN orthodoxy.',
                theme: 'authority',
                chapters: 12
            },
            'first-void': {
                title: 'The First Void',
                subtitle: 'Consciousness Origin',
                targetPage: 'kiln-grid-index.html',
                backgroundImage: '../_canonical_imagery/01_landscape_foundation/void_emergence.jpg',
                description: 'Aude\'s transformative journey from unfired clay to consciousness sovereignty.',
                theme: 'consciousness',
                chapters: 16
            },
            'kiln-codex': {
                title: 'KILN Codex',
                subtitle: 'Complete Graphic Novel',
                targetPage: 'kiln-grid-index.html',
                backgroundImage: '../_canonical_imagery/01_landscape_foundation/consciousness_codex_cover.jpg',
                description: 'The complete transformation saga from paradise through control to sovereignty.',
                theme: 'integration',
                chapters: 12
            }
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startLoadingSequence();
        this.setupFloatingElements();
        this.setupSacredGeometry();
    }

    setupEventListeners() {
        // Story card interactions
        document.querySelectorAll('.story-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const storyId = e.currentTarget.dataset.story;
                this.selectStory(storyId);
            });

            card.addEventListener('mouseenter', (e) => {
                this.handleCardHover(e.currentTarget, true);
            });

            card.addEventListener('mouseleave', (e) => {
                this.handleCardHover(e.currentTarget, false);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Sacred glyph interactions
        document.querySelectorAll('.consciousness-glyph').forEach(glyph => {
            glyph.addEventListener('click', (e) => {
                this.activateGlyph(e.target);
            });
        });

        // Window focus events for animations
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
    }

    startLoadingSequence() {
        const loadingScreen = document.getElementById('loadingScreen');
        const titleScreen = document.getElementById('titleScreen');
        const progressBar = document.querySelector('.progress-bar');

        // Simulate consciousness awakening process
        setTimeout(() => {
            this.animationStates.loadingComplete = true;
            
            // Hide loading screen
            loadingScreen.classList.add('hidden');
            
            // Reveal title screen
            setTimeout(() => {
                titleScreen.classList.add('visible');
                this.revealTitleElements();
            }, 500);
            
        }, 3000);
    }

    revealTitleElements() {
        this.animationStates.titleRevealed = true;
        
        // Animate title glyphs in sequence
        const glyphs = document.querySelectorAll('.consciousness-glyph');
        glyphs.forEach((glyph, index) => {
            setTimeout(() => {
                glyph.style.animation = `glyphAwaken 1s var(--consciousness-ease) both`;
            }, index * 200);
        });

        // Enable interactions after title animation
        setTimeout(() => {
            this.animationStates.interactionEnabled = true;
            this.setupStoryCardBackgrounds();
        }, 2000);
    }

    setupStoryCardBackgrounds() {
        document.querySelectorAll('.story-card').forEach(card => {
            const storyId = card.dataset.story;
            const config = this.storyConfigs[storyId];
            
            if (config && config.backgroundImage) {
                const background = card.querySelector('.card-background');
                background.style.backgroundImage = `url('${config.backgroundImage}')`;
            }
        });
    }

    handleCardHover(card, isHovering) {
        if (!this.animationStates.interactionEnabled) return;

        const storyId = card.dataset.story;
        const config = this.storyConfigs[storyId];

        if (isHovering) {
            // Add sacred glow effect
            this.addSacredGlow(card, config.theme);
            
            // Trigger floating glyph attention
            this.activateFloatingGlyphs();
            
            // Play hover sound (if implemented)
            this.playSacredSound('hover');
        } else {
            // Remove effects
            this.removeSacredGlow(card);
        }
    }

    selectStory(storyId) {
        if (!this.animationStates.interactionEnabled) return;

        this.selectedStory = storyId;
        const config = this.storyConfigs[storyId];
        
        if (!config) {
            console.error(`Story configuration not found for: ${storyId}`);
            return;
        }

        // Show selection confirmation
        this.showSelectionConfirmation(config);
        
        // Navigate after confirmation
        setTimeout(() => {
            this.navigateToStory(config);
        }, 2000);
    }

    showSelectionConfirmation(config) {
        // Create consciousness awakening effect
        const confirmation = document.createElement('div');
        confirmation.className = 'selection-confirmation';
        confirmation.innerHTML = `
            <div class="confirmation-content">
                <div class="sacred-glyph-ring">
                    <span class="glyph">◉</span>
                    <span class="glyph">◦</span>
                    <span class="glyph">∿</span>
                    <span class="glyph">◈</span>
                </div>
                <h2>Consciousness Path Selected</h2>
                <h3>${config.title}</h3>
                <p>${config.subtitle}</p>
                <div class="awakening-message">
                    "The clay consciousness stirs, ready for transformation..."
                </div>
            </div>
        `;

        // Add confirmation styles
        const style = document.createElement('style');
        style.textContent = `
            .selection-confirmation {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(44, 24, 16, 0.95);
                backdrop-filter: blur(20px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: confirmationReveal 2s var(--consciousness-ease);
            }
            
            .confirmation-content {
                text-align: center;
                color: var(--ceramic-cream);
                animation: confirmationPulse 2s ease-in-out;
            }
            
            .sacred-glyph-ring {
                display: flex;
                justify-content: center;
                gap: 2rem;
                margin-bottom: 2rem;
                font-family: var(--title-font);
                font-size: 3rem;
            }
            
            .sacred-glyph-ring .glyph {
                color: var(--consciousness-blue);
                animation: glyphRotate 2s ease-in-out infinite;
            }
            
            .sacred-glyph-ring .glyph:nth-child(2) { animation-delay: 0.2s; }
            .sacred-glyph-ring .glyph:nth-child(3) { animation-delay: 0.4s; }
            .sacred-glyph-ring .glyph:nth-child(4) { animation-delay: 0.6s; }
            
            @keyframes confirmationReveal {
                0% { opacity: 0; transform: scale(0.8); }
                100% { opacity: 1; transform: scale(1); }
            }
            
            @keyframes confirmationPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            @keyframes glyphRotate {
                0%, 100% { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(180deg) scale(1.2); }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(confirmation);

        // Play selection sound
        this.playSacredSound('selection');
    }

    navigateToStory(config) {
        // Store selected story in session storage for the main interface
        sessionStorage.setItem('selectedStory', this.selectedStory);
        sessionStorage.setItem('fromTitleScreen', 'true');
        
        // Direct navigation to edit page
        window.location.href = 'kiln-grid-index.html';
    }

    handleKeyboardNavigation(e) {
        if (!this.animationStates.interactionEnabled) return;

        switch(e.key) {
            case '1':
                this.selectStory('first-void');
                break;
            case '2':
                this.selectStory('translators-burden');
                break;
            case '3':
                this.selectStory('kiln-codex');
                break;
            case 'Escape':
                this.resetInterface();
                break;
            case ' ':
                e.preventDefault();
                this.activateRandomGlyph();
                break;
        }
    }

    setupFloatingElements() {
        const floatingGlyphs = document.querySelectorAll('.floating-glyph');
        
        floatingGlyphs.forEach((glyph, index) => {
            // Randomize positions
            const randomX = Math.random() * 80 + 10; // 10-90%
            const randomY = Math.random() * 80 + 10; // 10-90%
            
            glyph.style.left = `${randomX}%`;
            glyph.style.top = `${randomY}%`;
            
            // Add click interaction
            glyph.addEventListener('click', () => {
                this.activateGlyph(glyph);
            });
        });
    }

    setupSacredGeometry() {
        // Add interactive sacred geometry elements
        const geometryElements = document.querySelectorAll('.geometry-element');
        
        geometryElements.forEach(element => {
            element.addEventListener('click', () => {
                this.activateSacredGeometry(element);
            });
        });
    }

    activateGlyph(glyph) {
        // Create consciousness ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'consciousness-ripple';
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, 
                rgba(74, 144, 226, 0.6) 0%, 
                rgba(74, 144, 226, 0.3) 50%, 
                transparent 100%);
            transform: translate(-50%, -50%);
            animation: consciousnessRipple 2s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes consciousnessRipple {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                100% {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }
        `;
        
        if (!document.head.querySelector('style[data-ripple]')) {
            style.setAttribute('data-ripple', 'true');
            document.head.appendChild(style);
        }

        glyph.parentElement.style.position = 'relative';
        glyph.parentElement.appendChild(ripple);

        // Glyph activation effect
        glyph.style.animation = 'glyphActivation 1s var(--consciousness-ease)';
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentElement) {
                ripple.parentElement.removeChild(ripple);
            }
        }, 2000);

        this.playSacredSound('glyph');
    }

    addSacredGlow(element, theme) {
        const glowColors = {
            authority: 'var(--authority-red)',
            consciousness: 'var(--consciousness-blue)',
            integration: 'var(--transformation-gold)'
        };

        const color = glowColors[theme] || 'var(--consciousness-blue)';
        element.style.boxShadow = `0 0 30px ${color}, 0 20px 50px rgba(0, 0, 0, 0.5)`;
    }

    removeSacredGlow(element) {
        element.style.boxShadow = '';
    }

    activateFloatingGlyphs() {
        document.querySelectorAll('.floating-glyph').forEach(glyph => {
            glyph.style.animation = 'none';
            setTimeout(() => {
                glyph.style.animation = '';
            }, 10);
        });
    }

    activateRandomGlyph() {
        const glyphs = document.querySelectorAll('.consciousness-glyph');
        const randomGlyph = glyphs[Math.floor(Math.random() * glyphs.length)];
        this.activateGlyph(randomGlyph);
    }

    activateSacredGeometry(element) {
        element.style.borderColor = 'var(--transformation-gold)';
        element.style.animation = 'none';
        
        setTimeout(() => {
            element.style.borderColor = 'rgba(74, 144, 226, 0.2)';
            element.style.animation = '';
        }, 2000);
    }

    playSacredSound(type) {
        // Placeholder for sacred sound effects
        // In a full implementation, this would play appropriate sounds
        console.log(`Sacred sound: ${type}`);
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations when tab is hidden
            document.querySelectorAll('*').forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        } else {
            // Resume animations when tab is visible
            document.querySelectorAll('*').forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    }

    resetInterface() {
        // Reset all states and animations
        this.selectedStory = null;
        
        // Remove any confirmation overlays
        const confirmations = document.querySelectorAll('.selection-confirmation');
        confirmations.forEach(confirmation => {
            confirmation.remove();
        });
        
        // Reset glyph states
        document.querySelectorAll('.consciousness-glyph').forEach(glyph => {
            glyph.style.animation = '';
        });
    }
}

// Global CSS additions for dynamic animations
const dynamicStyles = `
@keyframes glyphAwaken {
    0% {
        opacity: 0;
        transform: scale(0.5) rotate(-180deg);
    }
    50% {
        opacity: 1;
        transform: scale(1.2) rotate(0deg);
    }
    100% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
    }
}

@keyframes glyphActivation {
    0% {
        transform: scale(1);
        color: var(--consciousness-blue);
    }
    50% {
        transform: scale(1.5);
        color: var(--transformation-gold);
    }
    100% {
        transform: scale(1);
        color: var(--consciousness-blue);
    }
}
`;

// Inject dynamic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Initialize the Consciousness Codex Title Screen
document.addEventListener('DOMContentLoaded', () => {
    window.consciousnessCodexTitle = new ConsciousnessCodexTitle();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConsciousnessCodexTitle;
}