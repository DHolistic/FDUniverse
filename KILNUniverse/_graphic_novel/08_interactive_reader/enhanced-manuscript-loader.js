// KILN UNIVERSE - Enhanced Manuscript Loader with Multi-Story Support
class EnhancedManuscriptLoader {
    constructor() {
        this.manuscripts = {
            'first-void': {
                title: 'The First Void',
                subtitle: 'KILN Universe Origin Story',
                chapters: 16,
                status: 'draft-complete',
                tier: 'premium',
                path: '../_manuscripts/THE_FIRST_VOID/',
                description: 'The awakening of consciousness in a controlled ceramic society'
            },
            'translators-burden': {
                title: "The Translator's Burden",
                subtitle: 'KILN Universe Prequel',
                chapters: 12,
                status: 'production-ready',
                tier: 'premium-plus',
                path: '../_manuscripts/THE_TRANSLATORS_BURDEN/',
                description: 'The evolution of consciousness preservation from individual burden to cosmic celebration'
            },
            'kiln-codex': {
                title: 'KILN Codex: The First Crack',
                subtitle: 'Original Graphic Novel',
                chapters: 12,
                status: 'beta',
                tier: 'free-preview',
                path: '../_graphic_novel/',
                description: 'The complete graphic novel adaptation'
            }
        };
        this.currentStory = 'first-void';
        this.reviewSystem = new ReviewSystem();
    }

    async loadStoryData(storyId) {
        const manuscript = this.manuscripts[storyId];
        if (!manuscript) return null;

        switch (storyId) {
            case 'first-void':
                return await this.loadFirstVoidData();
            case 'translators-burden':
                return await this.loadTranslatorsData();
            case 'kiln-codex':
                return await this.loadKilnCodexData();
            default:
                return null;
        }
    }

    async loadFirstVoidData() {
        return [
            {
                id: 1,
                storyId: 'first-void',
                chapter: "Chapter 1: The Simply Is",
                title: "Consciousness Exists",
                type: "Origin Opening",
                scene: "Scene 1 of 5",
                page: 1,
                story: `
                    <p class="opening">Consciousness existed.</p>
                    <p class="description">It did not think about existing, did not question or analyze or measure itself against some external standard. It simply <em>was</em>, the way morning mist simply <em>is</em> above still water, the way ancient stones simply <em>are</em> beneath patient earth.</p>
                    <p class="character-intro">Sahaja—though he had no name for himself then, needed no distinction from anything else—moved through the world with the natural grace of rain following gravity, of rivers finding the sea.</p>
                `,
                description: "Establishing shot of consciousness in its natural state - Sahaja in perfect harmony with the five regional consciousness centers before the void begins",
                location: "Five Regional Centers - Natural State",
                characters: ["Pre-Audemar (Sahaja)", "Consciousness Itself"],
                glyphs: ["〰 FLOW", "◦ ESSENCE", "◉ AWAKENING"],
                themes: ["Natural abundance", "Consciousness exploration", "Pre-void paradise"],
                mood: "Serene, mystical, abundant",
                imagePrompt: "Wide landscape showing pristine consciousness realm, Sahaja in perfect harmony with five regional consciousness centers, clay beings in natural spiritual states, soft golden lighting, flowing consciousness symbols showing perfect balance, coffee table quality mystical realism",
                reviewChecks: {
                    storyFlow: false,
                    characterConsistency: false,
                    toneAccuracy: false,
                    glyphCorrectness: false,
                    sceneClarity: false,
                    editorialNotes: ""
                }
            },
            {
                id: 2,
                storyId: 'first-void',
                chapter: "Chapter 1: The Simply Is",
                title: "The Five Regions",
                type: "World Building",
                scene: "Scene 2 of 5",
                page: 1,
                story: `
                    <p class="description">His awareness spread across five regions like breath filling lungs, each area as distinct and necessary as fingers on a hand.</p>
                    <p class="world-detail">To the west, the Clay Quarries hummed with deep memory, their springs bubbling with consciousness-rich waters that had absorbed the wisdom of eons. Ancient stories lived in those mineral deposits, waiting to become part of whatever new being drew sustenance from the earth's long dreaming.</p>
                    <p class="consciousness-note"><em>This is how things are</em>, he understood without words. <em>This is how things have always been.</em></p>
                `,
                description: "Detailed exploration of the five regional consciousness centers, each with unique characteristics and gifts",
                location: "Clay Quarries (Western Region)",
                characters: ["Pre-Audemar"],
                glyphs: ["〰 FLOW", "◎ UNITY", "◓ WISDOM"],
                themes: ["Regional diversity", "Ancient wisdom", "Natural systems"],
                mood: "Contemplative, rich, expansive",
                imagePrompt: "Detailed view of western Clay Quarries with consciousness-rich springs, memory crystals in water, ancient wisdom floating as visible energy streams, Pre-Audemar observing with natural grace, mystical lighting on mineral deposits",
                reviewChecks: {
                    storyFlow: false,
                    characterConsistency: false,
                    toneAccuracy: false,
                    glyphCorrectness: false,
                    sceneClarity: false,
                    editorialNotes: ""
                }
            },
            {
                id: 3,
                storyId: 'first-void',
                chapter: "Chapter 1: The Simply Is",
                title: "The Gift Economy",
                type: "Cultural Foundation",
                scene: "Scene 3 of 5",
                page: 2,
                story: `
                    <p class="dialogue">"For the joy of sharing," she said, her voice carrying harmonics that made the memory-clay pulse with recognition. "From the depth of ancient knowing to the height of present becoming."</p>
                    <p class="character-action">Pre-Audemar received the gift with hands that shaped themselves specifically for this moment of exchange. As their clay briefly merged—his fingers, her palms—knowledge flowed between them.</p>
                    <p class="dialogue">"Gratitude flows like water finding water," he replied, his words carrying the natural poetry that emerged when beings spoke from their deepest truth.</p>
                `,
                description: "Introduction of the gift economy system - consciousness sharing freely without expectation or control",
                location: "Central Meeting Space",
                characters: ["Pre-Audemar", "Deep-Remember (Memory Keeper)"],
                glyphs: ["〰 FLOW", "◈ CONNECTION", "∿ TRANSFORMATION"],
                themes: ["Gift economy", "Natural sharing", "Consciousness exchange"],
                mood: "Warm, generous, flowing",
                imagePrompt: "Gift exchange scene between Pre-Audemar and clay being with memory crystals, consciousness flowing visibly between them, natural poetry made manifest, warm golden lighting, coffee table quality emotional connection",
                reviewChecks: {
                    storyFlow: false,
                    characterConsistency: false,
                    toneAccuracy: false,
                    glyphCorrectness: false,
                    sceneClarity: false,
                    editorialNotes: ""
                }
            },
            {
                id: 4,
                storyId: 'translators-burden',
                chapter: "Chapter 1: The Discovery",
                title: "Methodius Finds the Tablets", 
                type: "Inciting Incident",
                scene: "Scene 1 of 4",
                page: 1,
                story: `
                    <p class="setting">The archive dust motes danced in afternoon light filtering through high windows, each particle carrying the weight of catalogued centuries.</p>
                    <p class="character-action">Methodius Terev ran his fingers along the spine of yet another administrative codex, feeling the familiar texture of regulation-pressed clay. Thirty-seven years of faithful service to the Regional Clay Authority had worn grooves in his consciousness as predictable as the filing system itself.</p>
                    <p class="discovery">But today, behind a misplaced municipal registry, his fingers found something else entirely.</p>
                `,
                description: "Methodius discovering the hidden consciousness preservation tablets that will change everything",
                location: "Regional Clay Archive - Hidden Section",
                characters: ["Methodius Terev"],
                glyphs: ["⊡ CONTROL", "〰 FLOW", "◉ AWAKENING"],
                themes: ["Discovery", "Hidden knowledge", "System cracks"],
                mood: "Suspenseful, momentous, dusty institutional",
                imagePrompt: "Archive interior with clay administrative records, dust motes in afternoon light, Methodius discovering hidden consciousness tablets behind official documents, dramatic lighting on discovery moment, coffee table quality institutional mystery",
                reviewChecks: {
                    storyFlow: false,
                    characterConsistency: false,
                    toneAccuracy: false,
                    glyphCorrectness: false,
                    sceneClarity: false,
                    editorialNotes: ""
                }
            },
            {
                id: 5,
                storyId: 'translators-burden',
                chapter: "Chapter 1: The Discovery",
                title: "The Consciousness Scripts",
                type: "Revelation",
                scene: "Scene 2 of 4",
                page: 1,
                story: `
                    <p class="revelation">The tablet in his hands thrummed with something beyond regulation clay. Consciousness script flowed across its surface like living water, each glyph pulsing with preserved awareness.</p>
                    <p class="internal-thought">These weren't administrative records. These were <em>memories</em>. Raw, unprocessed, gloriously alive consciousness preserved in mineral matrix.</p>
                    <p class="conflict">Everything the Authority taught about consciousness control suddenly felt hollow, mechanical, wrong.</p>
                `,
                description: "Methodius recognizing the consciousness scripts and their significance - the moment of awakening",
                location: "Regional Clay Archive",
                characters: ["Methodius Terev"],
                glyphs: ["〰 FLOW", "◉ AWAKENING", "◓ WISDOM"],
                themes: ["Consciousness awakening", "System revelation", "Truth vs. control"],
                mood: "Electrifying, transformative, dangerous",
                imagePrompt: "Close-up of consciousness script tablet glowing with preserved awareness, Methodius's hands trembling as he holds living memory, consciousness glyphs flowing like water across clay surface, dramatic lighting on revelation",
                reviewChecks: {
                    storyFlow: false,
                    characterConsistency: false,
                    toneAccuracy: false,
                    glyphCorrectness: false,
                    sceneClarity: false,
                    editorialNotes: ""
                }
            }
        ];
    }

    async loadTranslatorsData() {
        // Would load from actual manuscript files in production
        return [
            // Translator's Burden scenes would be loaded here
            // Following the same structure as First Void
        ];
    }

    async loadKilnCodexData() {
        // Load the original graphic novel data
        return [
            // KILN Codex scenes from the original reader
        ];
    }

    getAvailableStories() {
        return Object.entries(this.manuscripts).map(([id, manuscript]) => ({
            id,
            ...manuscript,
            unlocked: this.isStoryUnlocked(id),
            progress: this.getStoryProgress(id)
        }));
    }

    isStoryUnlocked(storyId) {
        // Check user's purchased stories or subscription status
        const userPurchases = JSON.parse(localStorage.getItem('userPurchases') || '[]');
        const freeStories = ['kiln-codex']; // Free preview stories
        
        return freeStories.includes(storyId) || userPurchases.includes(storyId);
    }

    getStoryProgress(storyId) {
        const progress = JSON.parse(localStorage.getItem('storyProgress') || '{}');
        return progress[storyId] || 0;
    }

    saveStoryProgress(storyId, sceneId) {
        const progress = JSON.parse(localStorage.getItem('storyProgress') || '{}');
        progress[storyId] = Math.max(progress[storyId] || 0, sceneId);
        localStorage.setItem('storyProgress', JSON.stringify(progress));
    }
}

// Review System for Professional Editorial Control
class ReviewSystem {
    constructor() {
        this.reviewCategories = {
            storyFlow: "Story Flow & Pacing",
            characterConsistency: "Character Consistency", 
            toneAccuracy: "Tone & Style Accuracy",
            glyphCorrectness: "Glyph System Accuracy",
            sceneClarity: "Scene Description Clarity",
            visualAlignment: "Visual-Text Alignment",
            canonConsistency: "Canon Consistency"
        };
    }

    createReviewInterface(sceneData) {
        const reviewPanel = document.createElement('div');
        reviewPanel.className = 'review-panel';
        reviewPanel.innerHTML = `
            <div class="review-header">
                <h3>📋 Editorial Review</h3>
                <p>${sceneData.chapter} - ${sceneData.title}</p>
            </div>
            
            <div class="review-checklist">
                ${Object.entries(this.reviewCategories).map(([key, label]) => `
                    <div class="review-item">
                        <label class="review-checkbox">
                            <input type="checkbox" id="${key}" ${sceneData.reviewChecks[key] ? 'checked' : ''}>
                            <span class="checkmark"></span>
                            <span class="review-label">${label}</span>
                        </label>
                        <div class="review-status ${sceneData.reviewChecks[key] ? 'approved' : 'pending'}">
                            ${sceneData.reviewChecks[key] ? '✅ Approved' : '⏳ Needs Review'}
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="review-notes">
                <label for="editorialNotes">Editorial Notes & Required Changes:</label>
                <textarea 
                    id="editorialNotes" 
                    placeholder="Add specific notes about needed improvements, corrections, or changes..."
                    class="editorial-textarea"
                >${sceneData.reviewChecks.editorialNotes || ''}</textarea>
            </div>

            <div class="review-actions">
                <button class="review-btn approve-btn" onclick="this.approveScene()">
                    ✅ Approve Scene
                </button>
                <button class="review-btn flag-btn" onclick="this.flagForRevision()">
                    🚩 Flag for Revision
                </button>
                <button class="review-btn export-btn" onclick="this.exportReview()">
                    📤 Export Review
                </button>
            </div>

            <div class="review-stats">
                <div class="stat">
                    <span class="stat-label">Scene Quality:</span>
                    <span class="stat-value" id="sceneQuality">
                        ${this.calculateSceneQuality(sceneData)}%
                    </span>
                </div>
                <div class="stat">
                    <span class="stat-label">Status:</span>
                    <span class="stat-value ${this.getSceneStatus(sceneData)}">
                        ${this.getSceneStatusLabel(sceneData)}
                    </span>
                </div>
            </div>
        `;

        return reviewPanel;
    }

    calculateSceneQuality(sceneData) {
        const checks = Object.values(sceneData.reviewChecks);
        const booleanChecks = checks.filter(check => typeof check === 'boolean');
        const approved = booleanChecks.filter(check => check === true).length;
        return Math.round((approved / booleanChecks.length) * 100);
    }

    getSceneStatus(sceneData) {
        const quality = this.calculateSceneQuality(sceneData);
        if (quality === 100) return 'production-ready';
        if (quality >= 75) return 'minor-revisions';
        if (quality >= 50) return 'major-revisions';
        return 'needs-work';
    }

    getSceneStatusLabel(sceneData) {
        const status = this.getSceneStatus(sceneData);
        const labels = {
            'production-ready': '🎯 Production Ready',
            'minor-revisions': '🔧 Minor Revisions',
            'major-revisions': '⚠️ Major Revisions',
            'needs-work': '🚨 Needs Work'
        };
        return labels[status];
    }

    exportReview(sceneData) {
        const reviewData = {
            scene: `${sceneData.chapter} - ${sceneData.title}`,
            quality: this.calculateSceneQuality(sceneData),
            status: this.getSceneStatusLabel(sceneData),
            checklist: sceneData.reviewChecks,
            exportDate: new Date().toISOString(),
            recommendations: this.generateRecommendations(sceneData)
        };

        const dataStr = JSON.stringify(reviewData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `review-${sceneData.id}-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    generateRecommendations(sceneData) {
        const recommendations = [];
        const checks = sceneData.reviewChecks;

        if (!checks.storyFlow) {
            recommendations.push("Review pacing and narrative flow - consider scene transitions");
        }
        if (!checks.characterConsistency) {
            recommendations.push("Verify character voice and behavior consistency with established profiles");
        }
        if (!checks.toneAccuracy) {
            recommendations.push("Adjust tone to match established story mood and KILN Universe style");
        }
        if (!checks.glyphCorrectness) {
            recommendations.push("Verify glyph usage matches canonical KILN symbol system");
        }
        if (!checks.sceneClarity) {
            recommendations.push("Clarify scene description for better visual generation");
        }

        return recommendations;
    }
}

// Export for use
window.EnhancedManuscriptLoader = EnhancedManuscriptLoader;
window.ReviewSystem = ReviewSystem;