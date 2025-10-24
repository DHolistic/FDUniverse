import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Pagination } from 'swiper/modules';
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

    // Auto-hide footer state
    const [footerVisible, setFooterVisible] = useState(true);
    const hideFooterTimer = useRef(null);

    // Track slide transition state to hide scrollbars during animation
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Lightbox state for enlarged images
    const [lightboxImage, setLightboxImage] = useState(null);
    const [lightboxCaption, setLightboxCaption] = useState(null);

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

    // Auto-hide footer after 3 seconds, reset on panel change
    useEffect(() => {
        // Show footer when panel changes
        setFooterVisible(true);

        // Clear existing timer
        if (hideFooterTimer.current) {
            clearTimeout(hideFooterTimer.current);
        }

        // Hide footer after 3 seconds
        hideFooterTimer.current = setTimeout(() => {
            setFooterVisible(false);
        }, 3000);

        return () => {
            if (hideFooterTimer.current) {
                clearTimeout(hideFooterTimer.current);
            }
        };
    }, [currentPanel]);

    // Mouse move detection - show footer when mouse near bottom
    useEffect(() => {
        const handleMouseMove = (e) => {
            const windowHeight = window.innerHeight;
            const mouseY = e.clientY;

            // Show footer if mouse in bottom 20% of screen
            if (mouseY > windowHeight * 0.8) {
                setFooterVisible(true);

                // Reset hide timer
                if (hideFooterTimer.current) {
                    clearTimeout(hideFooterTimer.current);
                }

                hideFooterTimer.current = setTimeout(() => {
                    setFooterVisible(false);
                }, 3000);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Show footer on keyboard navigation (arrow keys)
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Close lightbox on ESC key
            if (e.key === 'Escape' && lightboxImage) {
                setLightboxImage(null);
                setLightboxCaption(null);
                return;
            }

            setFooterVisible(true);

            // Reset hide timer
            if (hideFooterTimer.current) {
                clearTimeout(hideFooterTimer.current);
            }

            hideFooterTimer.current = setTimeout(() => {
                setFooterVisible(false);
            }, 3000);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lightboxImage]);

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
            {/* Merged Header - combines app title + story info */}
            <header className="app-header">
                <div className="app-title-section">
                    <h1 className="app-title">KILN CODEX</h1>
                    <span className="header-divider">|</span>
                    <h2 className="story-title">
                        {title} Ch.{chapter} <span className="chapter-indicator">[{currentPanel + 1}/{totalPanels}]</span>
                    </h2>
                </div>
                <div className="controls">
                    <button className="control-btn" onClick={() => window.location.href = '/'}>
                        <span className="home-icon">⌂</span> Home
                    </button>
                    <button className="control-btn" onClick={() => document.documentElement.requestFullscreen()}>
                        <span className="fullscreen-icon">⛶</span> Fullscreen
                    </button>
                </div>
            </header>

            {/* Back Link (using existing CSS classes) */}
            <div className="back-link-container">
                <a href="/" className="back-link">
                    <span className="back-glyph">←</span>
                    Back to Stories
                </a>
            </div>

            {/* SWIPER HORIZONTAL READER (replaces chapter-scroll-wrapper) */}
            <div className={`horizontal-reader-container ${isTransitioning ? 'transitioning' : ''}`}>
                <Swiper
                    modules={[Keyboard, Navigation, Pagination]}
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

                    // Smooth transitions
                    speed={800}
                    effect="slide"

                    // Touch gestures (built-in, replaces 100 lines!)
                    touchRatio={1}
                    threshold={5}

                    // Disable mousewheel for slide navigation - allow natural vertical scroll
                    mousewheel={false}

                    // Only respond to horizontal touch/swipe gestures
                    touchEventsTarget="container"
                    touchAngle={45}

                    // Callbacks
                    onSlideChangeTransitionStart={() => {
                        setIsTransitioning(true);
                    }}

                    onSlideChangeTransitionEnd={() => {
                        setIsTransitioning(false);
                    }}

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
                            <div
                                className="chapter-panel"
                                data-type={panel.type}
                                data-layout={panel.layout}
                            >
                                {/* Background image */}
                                {panel.type !== 'full-bleed-image' && (
                                    <div
                                        className="panel-background"
                                        style={{
                                            backgroundImage: panel.backgroundImage
                                                ? `url(${panel.backgroundImage})`
                                                : 'none'
                                        }}
                                    />
                                )}

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
                                    {panel.type === 'full-bleed-image' ? (
                                        // Full bleed image layout
                                        <>
                                            <img
                                                src={panel.image}
                                                alt={panel.title}
                                                className="full-bleed-image clickable-image"
                                                onClick={() => {
                                                    setLightboxImage(panel.image);
                                                    setLightboxCaption(panel.caption || panel.title);
                                                }}
                                                title="Click to enlarge"
                                            />
                                            {panel.caption && (
                                                <div className="image-caption">
                                                    {panel.caption}
                                                </div>
                                            )}
                                        </>
                                    ) : panel.type === 'text-image-side-by-side' ? (
                                        // Side-by-side layout
                                        <>
                                            <div className="side-by-side-image">
                                                <img
                                                    src={panel.image}
                                                    alt={panel.title}
                                                    className="clickable-image"
                                                    onClick={() => {
                                                        setLightboxImage(panel.image);
                                                        setLightboxCaption(panel.title);
                                                    }}
                                                    title="Click to enlarge"
                                                />
                                            </div>
                                            <div className="side-by-side-content">
                                                <h2>{panel.title}</h2>
                                                {panel.subtitle && <h3>{panel.subtitle}</h3>}
                                                {panel.content.map((paragraph, i) => (
                                                    <p
                                                        key={i}
                                                        className={i === 0 ? 'opening-paragraph' : ''}
                                                    >
                                                        {paragraph}
                                                    </p>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        // Standard text-only or text-and-image layout
                                        <>
                                            <h2>{panel.title}</h2>
                                            {panel.subtitle && <h3>{panel.subtitle}</h3>}
                                            {panel.content && panel.content.map((paragraph, i) => (
                                                <p
                                                    key={i}
                                                    className={i === 0 ? 'opening-paragraph' : ''}
                                                >
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </>
                                    )}
                                </motion.div>

                                {/* Progress indicator at bottom of each panel */}
                                <div className="panel-progress"></div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Chapter Navigation Bar with auto-hide */}
            <div className={`chapter-navigation ${!footerVisible ? 'hidden' : ''}`}>
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

            {/* Image Lightbox Modal */}
            {lightboxImage && (
                <motion.div
                    className="image-lightbox"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                        setLightboxImage(null);
                        setLightboxCaption(null);
                    }}
                >
                    <button
                        className="lightbox-close"
                        onClick={() => {
                            setLightboxImage(null);
                            setLightboxCaption(null);
                        }}
                        aria-label="Close lightbox"
                    >
                        ✕
                    </button>
                    <motion.div
                        className="lightbox-content"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={lightboxImage}
                            alt={lightboxCaption || 'Enlarged image'}
                            className="lightbox-image"
                        />
                        {lightboxCaption && (
                            <div className="lightbox-caption">
                                {lightboxCaption}
                            </div>
                        )}
                    </motion.div>
                    <div className="lightbox-hint">
                        Click outside image or press ESC to close
                    </div>
                </motion.div>
            )}
        </>
    );
}
