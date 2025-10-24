import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Pagination, Lazy, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Import existing CSS (preserves all her design!)
import '../../styles/styles.css';
import '../../styles/horizontal-reader.css';

export function HorizontalReader({ storyId = 'first-void', chapter = 1 }) {
    const [chapterData, setChapterData] = useState(null);
    const [currentPanel, setCurrentPanel] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load chapter data
    useEffect(() => {
        async function loadChapter() {
            try {
                setLoading(true);
                const response = await fetch(`/data/${storyId}-chapter-${chapter}.json`);

                if (!response.ok) {
                    throw new Error(`Failed to load chapter: ${response.statusText}`);
                }

                const data = await response.json();
                setChapterData(data);
                setError(null);
            } catch (err) {
                console.error('Error loading chapter:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadChapter();
    }, [storyId, chapter]);

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="consciousness-loader">
                    <div className="loader-glyph">◉</div>
                    <div className="loader-text">Loading Chapter...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                color: 'var(--ceramic-cream)',
                fontFamily: 'var(--body-font)',
                textAlign: 'center',
                padding: '2rem'
            }}>
                <div>
                    <h2 style={{
                        fontFamily: 'var(--title-font)',
                        color: 'var(--transformation-gold)',
                        marginBottom: '1rem'
                    }}>
                        Error Loading Chapter
                    </h2>
                    <p>{error}</p>
                    <p style={{ marginTop: '1rem' }}>
                        <a href="/" style={{ color: 'var(--consciousness-blue)' }}>
                            Return to Title Screen
                        </a>
                    </p>
                </div>
            </div>
        );
    }

    if (!chapterData || !chapterData.panels) {
        return null;
    }

    const { panels, title, subtitle } = chapterData;
    const totalPanels = panels.length;

    return (
        <>
            {/* Header (using existing CSS classes) */}
            <header className="app-header">
                <h1 className="app-title">KILN CODEX</h1>
                <div className="controls">
                    <button className="control-btn" onClick={() => window.location.href = '/'}>
                        <span className="home-icon">⌂</span> Home
                    </button>
                    <button className="control-btn" onClick={() => document.documentElement.requestFullscreen()}>
                        <span className="fullscreen-icon">⛶</span> Fullscreen
                    </button>
                </div>
            </header>

            {/* Story Info Bar (using existing CSS classes) */}
            <div className="story-info-bar">
                <h1 className="story-title">{title}</h1>
                <span className="chapter-indicator">
                    Chapter {chapter} • Panel {currentPanel + 1} of {totalPanels}
                </span>
            </div>

            {/* Back Link (using existing CSS classes) */}
            <div className="back-link-container">
                <a href="/" className="back-link">
                    <span className="back-glyph">←</span>
                    Back to Stories
                </a>
            </div>

            {/* SWIPER HORIZONTAL READER (replaces chapter-scroll-wrapper) */}
            <div className="horizontal-reader-container">
                <Swiper
                    modules={[Keyboard, Navigation, Pagination, Lazy]}
                    slidesPerView={1}
                    spaceBetween={0}

                    // Keyboard navigation (replaces 150 lines of buggy code!)
                    keyboard={{
                        enabled: true,
                        onlyInViewport: false,
                    }}

                    // Navigation arrows
                    navigation={{
                        nextEl: '.nav-button-next',
                        prevEl: '.nav-button-prev',
                    }}

                    // Pagination dots
                    pagination={{
                        el: '.panel-progress',
                        clickable: true,
                        renderBullet: (index, className) => {
                            return `<span class="${className} progress-glyph" aria-label="Panel ${index + 1}">◦</span>`;
                        },
                    }}

                    // Lazy loading images (NEW feature!)
                    lazy={{
                        loadPrevNext: true,
                    }}

                    // Smooth transitions
                    speed={800}
                    effect="slide"

                    // Touch gestures (built-in, replaces 100 lines!)
                    touchRatio={1}
                    threshold={5}

                    // Callbacks
                    onSlideChange={(swiper) => {
                        setCurrentPanel(swiper.activeIndex);
                        console.log(`Panel ${swiper.activeIndex + 1} of ${totalPanels}`);
                    }}

                    onReachEnd={() => {
                        console.log('Reached end of chapter - could show modal here');
                    }}

                    // Enable touch on desktop
                    simulateTouch={true}

                    // Accessibility
                    a11y={{
                        prevSlideMessage: 'Previous panel',
                        nextSlideMessage: 'Next panel',
                    }}
                >
                    {panels.map((panel, index) => (
                        <SwiperSlide key={panel.id}>
                            {/* Using existing CSS classes! */}
                            <div className="chapter-panel" data-type={panel.type}>
                                {/* Background image */}
                                <div
                                    className="panel-background"
                                    style={{
                                        backgroundImage: panel.backgroundImage
                                            ? `url(${panel.backgroundImage})`
                                            : 'none'
                                    }}
                                />

                                {/* Panel content with Framer Motion */}
                                <motion.div
                                    className="panel-content"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.4, 0, 0.2, 1] // Same as existing --transition-ease
                                    }}
                                >
                                    <h2>{panel.title}</h2>
                                    <h3>{panel.subtitle}</h3>

                                    {panel.content.map((paragraph, i) => (
                                        <p
                                            key={i}
                                            className={i === 0 ? 'opening-paragraph' : ''}
                                        >
                                            {paragraph}
                                        </p>
                                    ))}
                                </motion.div>

                                {/* Progress indicator at bottom of each panel */}
                                <div className="panel-progress"></div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Chapter Navigation Bar (using existing CSS classes) */}
            <div className="chapter-navigation">
                <button className="nav-button nav-button-prev">
                    <span className="nav-glyph">◀</span> Previous
                </button>

                <div className="chapter-info">
                    <div className="chapter-title">
                        {panels[currentPanel]?.title || 'Loading...'}
                    </div>
                    <div className="chapter-subtitle">
                        Panel {currentPanel + 1} of {totalPanels}
                    </div>
                </div>

                <button className="nav-button nav-button-next">
                    Next <span className="nav-glyph">▶</span>
                </button>
            </div>

            {/* Keyboard Help Hint */}
            {currentPanel === 0 && (
                <motion.div
                    className="scroll-hint visible"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <div className="hint-content">
                        <div className="hint-icon">→</div>
                        <div className="hint-text">
                            Use arrow keys or swipe to navigate
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
}
