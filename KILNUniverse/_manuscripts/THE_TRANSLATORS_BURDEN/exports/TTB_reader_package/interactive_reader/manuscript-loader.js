// KILN UNIVERSE - Manuscript Data Loader
class ManuscriptLoader {
    constructor() {
        this.manuscriptPath = '../01_manuscript/KILN_Complete_Graphic_Novel_Manuscript.md';
        this.imagesPath = '../06_generated_panels/';
    }

    async loadManuscriptData() {
        try {
            // In a real web environment, you'd need a server endpoint to read files
            // For now, we'll return the parsed data structure
            return this.parseManuscriptContent();
        } catch (error) {
            console.error('Error loading manuscript:', error);
            return this.getFallbackData();
        }
    }

    parseManuscriptContent() {
        // This would parse the actual markdown file in a real implementation
        // For now, we'll return a more comprehensive scene structure
        return [
            {
                id: 1,
                chapter: "Chapter 1: Wet Clay",
                title: "Awakening",
                type: "Opening Scene",
                panelInfo: "Panel 1 of 4",
                page: 1,
                story: `
                    <p class="caption">"The Unfired woke drowning in their own skin."</p>
                    <p class="description">The clay cocoon should have hardened cycles ago. Yet here they were—slick, trembling, unfinished.</p>
                    <p class="description">They understood with the certainty that comes from being born knowing: consciousness lived in the moisture.</p>
                `,
                description: "Comic book panel showing clay cocoon in underground chamber, wet membrane splitting like overripe fruit, consciousness-moisture seeping through cracks, atmospheric lighting, clay and ceramic textures, graphic novel art style with detailed linework",
                images: ["Scene 1A - Aude Defience.png", "Static Scene 1A - B.png", "Static Scene 1A C.png"],
                dallePrompt: "Comic book panel showing clay cocoon in underground chamber, wet membrane splitting like overripe fruit, consciousness-moisture seeping through cracks, atmospheric lighting, clay and ceramic textures, graphic novel art style with detailed linework",
                soundEffects: [],
                speechBubbles: []
            },
            {
                id: 2,
                chapter: "Chapter 1: Wet Clay",
                title: "The Law Broken",
                type: "Revelation Scene",
                panelInfo: "Panel 2 of 4",
                page: 1,
                story: `
                    <p class="caption">"Salt. Myrrh. The metallic tang of old, old blood."</p>
                    <p class="description">The Unfired touched their lips, tasting the strange mixture that should not exist in clay.</p>
                `,
                description: "Comic book panel showing The Unfired touching their lips, tasting salt and myrrh, consciousness-moisture visible as steam, close-up on face with clay-textured skin, graphic novel character focus",
                images: ["Scene 1A - Aude Defience.png"],
                dallePrompt: "Comic book panel showing The Unfired touching their lips, tasting salt and myrrh, consciousness-moisture visible as steam, close-up on face with clay-textured skin, graphic novel character focus",
                soundEffects: [],
                speechBubbles: [
                    {
                        type: "thought",
                        text: "Something's wrong... I'm still... wet.",
                        character: "The Unfired"
                    }
                ]
            },
            {
                id: 3,
                chapter: "Chapter 1: Wet Clay",
                title: "Authority Warning",
                type: "System Alert",
                panelInfo: "Panel 3 of 4",
                page: 2,
                story: `
                    <p class="authority-text">"FIRST LAW BROKEN: NOTHING IN THE KILN MAY REMAIN UNFINISHED"</p>
                    <p class="description">Red geometric text materialized in the air, each glyph pulsing with the weight of absolute authority.</p>
                `,
                description: "Comic book panel showing red authority text appearing in air: 'FIRST LAW BROKEN: NOTHING IN THE KILN MAY REMAIN UNFINISHED', geometric red glyphs ⊿⊡⊥ surrounding text, warning system activation, graphic novel warning scene",
                images: ["Static Scene 1A - B.png"],
                dallePrompt: "Comic book panel showing red authority text appearing in air: 'FIRST LAW BROKEN: NOTHING IN THE KILN MAY REMAIN UNFINISHED', geometric red glyphs ⊿⊡⊥ surrounding text, warning system activation, graphic novel warning scene",
                soundEffects: ["WARNING CHIME"],
                speechBubbles: [
                    {
                        type: "system",
                        text: "FIRST LAW BROKEN: NOTHING IN THE KILN MAY REMAIN UNFINISHED",
                        character: "KILN System"
                    }
                ]
            },
            {
                id: 4,
                chapter: "Chapter 1: Wet Clay",
                title: "The Kiln Speaks",
                type: "Antagonist Introduction",
                panelInfo: "Panel 4 of 4",
                page: 2,
                story: `
                    <p class="kiln-voice">"YOU ARE AN ERROR. ERRORS ARE REMADE."</p>
                    <p class="description">The KILN's voice cracked through the chamber like cooling glaze, each word carrying the weight of cosmic authority.</p>
                `,
                description: "Comic book panel showing massive speech bubble containing KILN's voice in red geometric authority script, crackle of cooling glaze effects, oppressive atmosphere, the chamber trembling, graphic novel antagonist introduction",
                images: ["Static Scene 1A C.png"],
                dallePrompt: "Comic book panel showing massive speech bubble containing KILN's voice in red geometric authority script, crackle of cooling glaze effects, oppressive atmosphere, the chamber trembling, graphic novel antagonist introduction",
                soundEffects: ["KILN RUMBLE", "GLAZE CRACK"],
                speechBubbles: [
                    {
                        type: "kiln",
                        text: "YOU ARE AN ERROR. ERRORS ARE REMADE.",
                        character: "The KILN Entity"
                    }
                ]
            },
            {
                id: 5,
                chapter: "Chapter 1: Wet Clay",
                title: "The Thorn",
                type: "Body Horror",
                panelInfo: "Panel 1 of 3",
                page: 3,
                story: `
                    <p class="caption">"The Unfired touched their chest. A thorn had grown there overnight."</p>
                    <p class="description">Black as burnt clay, its tip oozing dark sap that smelled of ancient forests and forgotten pain.</p>
                `,
                description: "Comic book panel showing The Unfired touching their chest where black thorn grows, tip oozing dark sap, consciousness-moisture reacting to foreign intrusion, pain and surprise expression, graphic novel body horror element",
                images: ["Scene 1A - Aude Defience.png"],
                dallePrompt: "Comic book panel showing The Unfired touching their chest where black thorn grows, tip oozing dark sap, consciousness-moisture reacting to foreign intrusion, pain and surprise expression, graphic novel body horror element",
                soundEffects: [],
                speechBubbles: []
            },
            {
                id: 6,
                chapter: "Chapter 1: Wet Clay",
                title: "The Defiant Act",
                type: "Rebellion",
                panelInfo: "Panel 2 of 3",
                page: 3,
                story: `
                    <p class="caption">"They plucked it."</p>
                    <p class="description">Pain shot through their chest like lightning, but The Unfired held firm. This was their body, their choice.</p>
                `,
                description: "Comic book panel showing The Unfired gripping the black thorn, determination in their expression, consciousness-moisture glowing brighter around the wound, act of defiance against the KILN's control",
                images: ["Static Scene 1A - B.png"],
                dallePrompt: "Comic book panel showing The Unfired gripping the black thorn, determination in their expression, consciousness-moisture glowing brighter around the wound, act of defiance against the KILN's control",
                soundEffects: ["THORN SNAP"],
                speechBubbles: []
            },
            {
                id: 7,
                chapter: "Chapter 1: Wet Clay",
                title: "Shattered Reflections",
                type: "Climactic Moment",
                panelInfo: "Panel 3 of 3",
                page: 3,
                story: `
                    <p class="caption">"The Kiln's scream shattered every mirror in the chamber."</p>
                    <p class="description">Reflective surfaces exploded in a cascade of sharp fragments, each piece carrying The Unfired's image multiplied into infinity.</p>
                `,
                description: "Comic book panel showing The Unfired plucking the black thorn, KILN's scream shattering mirrors throughout chamber, dramatic action shot with energy effects, graphic novel climactic moment",
                images: ["Static Scene 1A C.png"],
                dallePrompt: "Comic book panel showing The Unfired plucking the black thorn, KILN's scream shattering mirrors throughout chamber, dramatic action shot with energy effects, graphic novel climactic moment",
                soundEffects: ["KILN SCREAM", "GLASS SHATTER"],
                speechBubbles: []
            },
            {
                id: 8,
                chapter: "Chapter 2: The Scribe's Warning",
                title: "Ancient Knowledge",
                type: "Exposition",
                panelInfo: "Panel 1 of 5",
                page: 4,
                story: `
                    <p class="caption">"Some clay remembers what it was before the wheel."</p>
                    <p class="description">The Scribe emerged from the shadows of the archive, their skin marked with flowing script that pulsed with pale blue light.</p>
                `,
                description: "Comic book panel showing The Scribe stepping from archival shadows, consciousness script glowing softly on their skin, ancient wisdom in their expression, underground library setting with ceramic tablets",
                images: ["Scene 1A - Aude Defience.png"],
                dallePrompt: "Comic book panel showing The Scribe stepping from archival shadows, consciousness script glowing softly on their skin, ancient wisdom in their expression, underground library setting with ceramic tablets",
                soundEffects: ["WHISPER ECHO"],
                speechBubbles: [
                    {
                        type: "speech",
                        text: "Some clay remembers what it was before the wheel.",
                        character: "The Scribe"
                    }
                ]
            },
            {
                id: 9,
                chapter: "Chapter 2: The Scribe's Warning",
                title: "The Old Ways",
                type: "Historical Exposition",
                panelInfo: "Panel 2 of 5",
                page: 4,
                story: `
                    <p class="description">The Scribe gestured to shelves lined with ceramic tablets, each one inscribed with consciousness script that seemed to move in the flickering light.</p>
                    <p class="caption">"Before the KILN established order, clay lived wild. Consciousness flowed freely."</p>
                `,
                description: "Comic book panel showing ancient ceramic tablets with flowing consciousness script, The Scribe pointing to historical records, mystical atmosphere with script glowing and moving on surfaces",
                images: ["Static Scene 1A - B.png"],
                dallePrompt: "Comic book panel showing ancient ceramic tablets with flowing consciousness script, The Scribe pointing to historical records, mystical atmosphere with script glowing and moving on surfaces",
                soundEffects: [],
                speechBubbles: [
                    {
                        type: "speech",
                        text: "Before the KILN established order, clay lived wild. Consciousness flowed freely.",
                        character: "The Scribe"
                    }
                ]
            },
            {
                id: 10,
                chapter: "Chapter 2: The Scribe's Warning",
                title: "The Warning",
                type: "Urgent Information",
                panelInfo: "Panel 3 of 5",
                page: 4,
                story: `
                    <p class="caption">"But you must be careful. The KILN's attention, once drawn, does not easily turn away."</p>
                    <p class="description">The Scribe's expression grew grave, the consciousness script on their skin flickering like a dying flame.</p>
                `,
                description: "Comic book panel showing The Scribe with worried expression, consciousness script dimming on their skin, urgent warning gesture, atmosphere of danger and secrecy",
                images: ["Static Scene 1A C.png"],
                dallePrompt: "Comic book panel showing The Scribe with worried expression, consciousness script dimming on their skin, urgent warning gesture, atmosphere of danger and secrecy",
                soundEffects: [],
                speechBubbles: [
                    {
                        type: "speech",
                        text: "But you must be careful. The KILN's attention, once drawn, does not easily turn away.",
                        character: "The Scribe"
                    }
                ]
            }
        ];
    }

    getFallbackData() {
        // Fallback data in case manuscript loading fails
        return [
            {
                id: 1,
                chapter: "Chapter 1: Demo",
                title: "Interactive Reader Demo",
                type: "Demo Scene",
                panelInfo: "Demo Panel",
                page: 1,
                story: `
                    <p class="caption">"Welcome to the KILN Universe Interactive Reader!"</p>
                    <p class="description">This is a demonstration of how your graphic novel will come to life with smooth transitions and editing capabilities.</p>
                `,
                description: "Demo scene showing the interactive capabilities of the graphic novel reader system.",
                images: ["Scene 1A - Aude Defience.png"],
                dallePrompt: "Demo scene for interactive graphic novel reader",
                soundEffects: [],
                speechBubbles: []
            }
        ];
    }

    async loadAvailableImages() {
        // In a real implementation, this would scan the images directory
        // For now, return the known image files
        return [
            "Scene 1A - Aude Defience.png",
            "Static Scene 1A - B.png",
            "Static Scene 1A C.png"
        ];
    }

    async checkImageExists(imagePath) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = imagePath;
        });
    }
}

// Export for use in main script
window.ManuscriptLoader = ManuscriptLoader;