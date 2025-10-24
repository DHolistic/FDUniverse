// KILN UNIVERSE - MARKDOWN LOADER
// Loads and parses chapter markdown files into horizontal panels

class MarkdownLoader {
    constructor() {
        this.chapterData = null;
    }

    /**
     * Load chapter data from JSON
     */
    async loadChapterData() {
        // Prefer a package-local override manifest if present. Try chapter-data.local.json then fall back.
        const candidates = ['chapter-data.local.json', 'chapter-data.json'];
        for (const file of candidates) {
            try {
                const response = await fetch(file, { cache: 'no-store' });
                if (!response.ok) {
                    // Try next candidate
                    console.warn(`Could not load ${file}: ${response.status} ${response.statusText}`);
                    continue;
                }
                this.chapterData = await response.json();
                console.info(`Loaded chapter data from ${file}`);
                return this.chapterData;
            } catch (error) {
                console.warn(`Error loading ${file}:`, error);
                // continue to next candidate
            }
        }

        console.error('Error loading chapter data: no manifest found');
        return null;
    }

    /**
     * Get story configuration
     */
    getStoryConfig(storyId) {
        if (!this.chapterData) {
            console.error('Chapter data not loaded');
            return null;
        }
        return this.chapterData[storyId];
    }

    /**
     * Get specific chapter data
     */
    getChapter(storyId, chapterNumber) {
        const story = this.getStoryConfig(storyId);
        if (!story) return null;

        return story.chapters.find(ch => ch.number === chapterNumber);
    }

    /**
     * Fetch markdown file content
     */
    async fetchMarkdown(path) {
        try {
            const response = await fetch(path, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`Failed to fetch markdown: ${response.statusText}`);
            }
            return await response.text();
        } catch (error) {
            console.error('Error fetching markdown:', error);
            return null;
        }
    }

    /**
     * Parse prose chapter (The First Void style) into scrollable panels
     * Splits long text into readable chunks
     */
        parseProseChapter(markdown, backgroundImage) {
            const panels = [];
            // Remove frontmatter and extract title
            const lines = markdown.split('\n');
            let title = '';
            let subtitle = '';
            let content = [];
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line.startsWith('# ') && !title) {
                    title = line.replace('# ', '').replace(/📖|📜/g, '').trim();
                    continue;
                }
                if (line.startsWith('*') && line.endsWith('*') && !subtitle) {
                    subtitle = line.replace(/\*/g, '');
                    continue;
                }
                if (line.startsWith('---') || line.startsWith('**[Word Count:')) {
                    continue;
                }
                if (line.startsWith('## **CHAPTER')) {
                    continue;
                }
                if (line.length > 0) {
                    content.push(line);
                }
            }
            // Split content at glyphs (◦, ◉, etc.)
            const glyphRegex = /^(?:\s*)([◦◉◆◇▪▫•○●□■⬟⬢⬣⬤⬥⬦⬧⬨⬩⬪⬫⬬⬭⬮⬯⬰⬱⬲⬳⬴⬵⬶⬷⬸⬹⬺⬻⬼⬽⬾⬿])/;
            let panelChunks = [];
            let currentChunk = [];
            for (let i = 0; i < content.length; i++) {
                const line = content[i];
                if (glyphRegex.test(line)) {
                    if (currentChunk.length > 0) {
                        panelChunks.push(currentChunk);
                        currentChunk = [];
                    }
                    // Optionally, include the glyph line as a visual marker in the panel
                    currentChunk.push(`<div class="glyph-break">${line}</div>`);
                    continue;
                }
                currentChunk.push(line);
            }
            if (currentChunk.length > 0) {
                panelChunks.push(currentChunk);
            }
            for (let i = 0; i < panelChunks.length; i++) {
                const chunk = panelChunks[i];
                const html = chunk.map(p => {
                    // If it's a glyph-break, keep as is
                    if (p.startsWith('<div class="glyph-break">')) return p;
                    // Convert italic markdown
                    p = p.replace(/\*(.*?)\*/g, '<em>$1</em>');
                    return `<p>${p}</p>`;
                }).join('\n');
                panels.push({
                    type: 'text-only',
                    title: i === 0 ? title : '',
                    subtitle: i === 0 ? subtitle : '',
                    content: html,
                    backgroundImage: backgroundImage
                });
            }
            return panels;
        }

    /**
     * Parse script chapter (Translator's Burden style) into scene panels
     * Each major scene becomes a panel
     */
        parseScriptChapter(markdown, chapterData) {
            const panels = [];
            const lines = markdown.split('\n');
            let title = '';
            let subtitle = '';
            let currentPanel = null;
            // Regex for glyphs (◦, ◉, etc.)
            const glyphRegex = /^(?:\s*)([◦◉◆◇▪▫•○●□■⬟⬢⬣⬤⬥⬦⬧⬨⬩⬪⬫⬬⬭⬮⬯⬰⬱⬲⬳⬴⬵⬶⬷⬸⬹⬺⬻⬼⬽⬾⬿])/;
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                // Extract main title
                if (line.startsWith('# ') && !title) {
                    title = line.replace('# ', '').replace(/📜|📖/g, '').trim();
                    subtitle = lines[i + 1]?.replace('## ', '').replace(/\*/g, '').trim() || '';
                    continue;
                }
                // Glyph-based page break
                if (glyphRegex.test(line)) {
                    // Save previous panel
                    if (currentPanel && currentPanel.content.length > 0) {
                        panels.push({
                            type: 'image-text',
                            title: currentPanel.title || title,
                            subtitle: currentPanel.subtitle || subtitle,
                            content: currentPanel.content.join('\n'),
                            backgroundImage: currentPanel.image || chapterData.backgroundImage
                        });
                    }
                    // Start new panel, optionally include glyph line
                    currentPanel = {
                        title: '',
                        subtitle: '',
                        content: [`<div class="glyph-break">${line}</div>`],
                        image: null
                    };
                    continue;
                }
                // Detect page breaks - match any line with ## followed by emoji and **PAGE
                const pageMatch = line.match(/^##\s+.*\*\*PAGE\s+(\d+)/i);
                if (pageMatch) {
                    if (currentPanel && currentPanel.content.length > 0) {
                        panels.push({
                            type: 'image-text',
                            title: currentPanel.title || `Page ${pageMatch[1]}`,
                            subtitle: currentPanel.subtitle,
                            content: currentPanel.content.join('\n'),
                            backgroundImage: currentPanel.image || chapterData.backgroundImage
                        });
                    }
                    currentPanel = {
                        title: line.replace(/^##\s+/, '').replace(/\*\*/g, '').trim(),
                        subtitle: '',
                        content: [],
                        image: null
                    };
                    continue;
                }
                // Detect panel/scene breaks
                if (line.startsWith('### **PANEL')) {
                    if (currentPanel) {
                        currentPanel.title = line.replace('### **PANEL', 'Panel').replace('**', '').trim();
                    }
                    continue;
                }
                // Extract setting info
                if (line.startsWith('**SETTING:**')) {
                    if (currentPanel) {
                        currentPanel.subtitle = line.replace('**SETTING:**', '').trim();
                    }
                    continue;
                }
                // Extract dialogue and captions
                if (line.startsWith('**CAPTION:**') ||
                    line.startsWith('**DIALOGUE') ||
                    line.startsWith('**METHODIUS THOUGHT:**')) {
                    const content = line.replace(/\*\*/g, '').replace(/CAPTION:|DIALOGUE.*:|.*THOUGHT:/, '').trim();
                    if (content && currentPanel) {
                        currentPanel.content.push(`<p class="dialogue">${content}</p>`);
                    }
                    continue;
                }
                // Regular content
                if (line.length > 0 && currentPanel && !line.startsWith('**') && !line.startsWith('---')) {
                    currentPanel.content.push(`<p>${line}</p>`);
                }
            }
            // Save last panel
            if (currentPanel && currentPanel.content.length > 0) {
                panels.push({
                    type: 'image-text',
                    title: currentPanel.title || title,
                    subtitle: currentPanel.subtitle || subtitle,
                    content: currentPanel.content.join('\n'),
                    backgroundImage: currentPanel.image || chapterData.backgroundImage
                });
            }
            if (panels.length === 0) {
                panels.push({
                    type: 'text-only',
                    title: title,
                    subtitle: subtitle,
                    content: `<p>${markdown.substring(0, 2000)}...</p>`,
                    backgroundImage: chapterData.backgroundImage
                });
            }
            return panels;
        }

    /**
     * Load and parse a chapter into panels
     */
    async loadChapter(storyId, chapterNumber) {
        const chapterData = this.getChapter(storyId, chapterNumber);
        if (!chapterData) {
            console.error(`Chapter ${chapterNumber} not found for story ${storyId}`);
            return null;
        }

        // Check if this chapter has variants (multiple versions)
        if (chapterData.variants && chapterData.variants.length > 0) {
            console.log(`📚 Loading chapter ${chapterNumber} with ${chapterData.variants.length} variants`);
            return await this.loadChapterWithVariants(storyId, chapterData);
        }

        // Standard single-version chapter loading
        const markdown = await this.fetchMarkdown(chapterData.markdownPath);
        if (!markdown) {
            console.error(`Failed to load markdown from ${chapterData.markdownPath}`);
            return null;
        }

        // Determine parsing strategy based on story type
        let panels;
        if (storyId === 'first-void') {
            // Prose novel - split into readable chunks
            panels = this.parseProseChapter(markdown, chapterData.backgroundImage);
        } else if (storyId === 'translators-burden') {
            // Script - parse by scenes/panels
            panels = this.parseScriptChapter(markdown, chapterData);
        } else {
            // Default - simple text panel
            panels = [{
                type: 'text-only',
                title: chapterData.title,
                subtitle: chapterData.subtitle,
                content: this.simpleMarkdownToHTML(markdown),
                backgroundImage: chapterData.backgroundImage
            }];
        }

        return {
            chapter: chapterData,
            panels: panels
        };
    }

    /**
     * Load a chapter that has multiple variants (like Chapter 13 with 3 epilogues)
     */
    async loadChapterWithVariants(storyId, chapterData) {
        const allPanels = [];

        for (let i = 0; i < chapterData.variants.length; i++) {
            const variant = chapterData.variants[i];
            console.log(`📄 Loading variant ${i + 1}: ${variant.name}`);

            const markdown = await this.fetchMarkdown(variant.markdownPath);
            if (!markdown) {
                console.error(`Failed to load variant markdown from ${variant.markdownPath}`);
                continue;
            }

            // Create a temporary chapter data object for this variant
            const variantChapterData = {
                ...chapterData,
                title: `${chapterData.title} - ${variant.name}`,
                subtitle: variant.subtitle,
                markdownPath: variant.markdownPath
            };

            // Parse this variant
            let variantPanels;
            if (storyId === 'first-void') {
                variantPanels = this.parseProseChapter(markdown, chapterData.backgroundImage);
            } else if (storyId === 'translators-burden') {
                variantPanels = this.parseScriptChapter(markdown, variantChapterData);
            } else {
                variantPanels = [{
                    type: 'text-only',
                    title: variantChapterData.title,
                    subtitle: variantChapterData.subtitle,
                    content: this.simpleMarkdownToHTML(markdown),
                    backgroundImage: chapterData.backgroundImage
                }];
            }

            // Add variant identifier to each panel
            variantPanels.forEach(panel => {
                panel.variantName = variant.name;
                panel.variantIndex = i;
            });

            allPanels.push(...variantPanels);
        }

        console.log(`✅ Loaded ${allPanels.length} total panels from ${chapterData.variants.length} variants`);

        return {
            chapter: chapterData,
            panels: allPanels,
            hasVariants: true
        };
    }

    /**
     * Simple markdown to HTML converter
     * Handles basic formatting
     */
    simpleMarkdownToHTML(markdown) {
        let html = markdown;

        // Remove frontmatter
        html = html.replace(/^---[\s\S]*?---/m, '');

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

        // Emphasis
        html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Paragraphs
        html = html.split('\n\n').map(para => {
            if (para.trim().startsWith('<')) return para;
            if (para.trim().length === 0) return '';
            return `<p>${para.trim()}</p>`;
        }).join('\n');

        return html;
    }
}

// Export for use in other scripts
window.MarkdownLoader = MarkdownLoader;
