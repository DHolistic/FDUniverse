// KILN UNIVERSE - Monetization & User Management System
class KilnUniversePlatform {
    constructor() {
        this.currentUser = null;
        this.subscriptionTiers = {
            free: {
                name: 'Clay Reader',
                price: 0,
                stories: ['kiln-codex'],
                features: ['Basic reading', 'Limited notes']
            },
            premium: {
                name: 'Consciousness Keeper',
                price: 9.99,
                stories: ['kiln-codex', 'first-void'],
                features: ['All stories', 'Full editing', 'Export notes', 'Progress sync']
            },
            creator: {
                name: 'Kiln Master',
                price: 19.99,
                stories: ['all'],
                features: ['Everything', 'AI image generation', 'Video previews', 'Creator tools']
            }
        };
        
        this.storyPrices = {
            'first-void': 4.99,
            'translators-burden': 6.99,
            'future-stories': 5.99
        };

        this.init();
    }

    init() {
        this.loadUserData();
        this.createAuthInterface();
        this.setupPaymentSystem();
    }

    loadUserData() {
        const userData = localStorage.getItem('kilnUniverseUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }

    createAuthInterface() {
        return `
            <div class="auth-overlay" id="authOverlay">
                <div class="auth-panel">
                    <div class="auth-header">
                        <img src="data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#4A90E2"/><path d="M30 50 Q50 30 70 50 Q50 70 30 50" fill="#F39C12"/></svg>')}" alt="KILN Universe" class="auth-logo">
                        <h2>KILN Universe</h2>
                        <p>Interactive Story Platform</p>
                    </div>

                    <div class="auth-tabs">
                        <button class="auth-tab active" onclick="this.showTab('signin')">Sign In</button>
                        <button class="auth-tab" onclick="this.showTab('signup')">Sign Up</button>
                        <button class="auth-tab" onclick="this.showTab('guest')">Guest Access</button>
                    </div>

                    <div class="auth-content">
                        <div id="signin-tab" class="tab-content active">
                            <form class="auth-form" onsubmit="platform.handleSignIn(event)">
                                <input type="email" placeholder="Email" required class="auth-input">
                                <input type="password" placeholder="Password" required class="auth-input">
                                <button type="submit" class="auth-button primary">Sign In</button>
                                <p class="auth-link"><a href="#" onclick="this.showForgotPassword()">Forgot Password?</a></p>
                            </form>
                        </div>

                        <div id="signup-tab" class="tab-content">
                            <form class="auth-form" onsubmit="platform.handleSignUp(event)">
                                <input type="text" placeholder="Display Name" required class="auth-input">
                                <input type="email" placeholder="Email" required class="auth-input">
                                <input type="password" placeholder="Password" required class="auth-input">
                                <input type="password" placeholder="Confirm Password" required class="auth-input">
                                <button type="submit" class="auth-button primary">Create Account</button>
                            </form>
                        </div>

                        <div id="guest-tab" class="tab-content">
                            <div class="guest-info">
                                <h3>Guest Access</h3>
                                <p>Experience KILN Universe with limited access:</p>
                                <ul>
                                    <li>✅ Read "The First Crack" (Free Preview)</li>
                                    <li>✅ Basic navigation and notes</li>
                                    <li>❌ Premium stories</li>
                                    <li>❌ Progress sync across devices</li>
                                    <li>❌ Export capabilities</li>
                                </ul>
                                <button class="auth-button secondary" onclick="platform.continueAsGuest()">
                                    Continue as Guest
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="subscription-preview">
                        <h3>🌟 Unlock the Complete KILN Universe</h3>
                        <div class="tier-cards">
                            ${Object.entries(this.subscriptionTiers).map(([key, tier]) => `
                                <div class="tier-card ${key === 'premium' ? 'recommended' : ''}">
                                    <h4>${tier.name}</h4>
                                    <div class="price">$${tier.price}<span>/month</span></div>
                                    <ul class="features">
                                        ${tier.features.map(feature => `<li>✅ ${feature}</li>`).join('')}
                                    </ul>
                                    <button class="tier-button ${key === 'premium' ? 'recommended' : ''}" 
                                            onclick="platform.selectTier('${key}')">
                                        ${tier.price === 0 ? 'Current Plan' : 'Choose Plan'}
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createStorySelector() {
        return `
            <div class="story-selector">
                <div class="story-tabs">
                    ${Object.entries(window.enhancedLoader.manuscripts).map(([id, manuscript]) => `
                        <div class="story-tab ${!this.hasAccess(manuscript.tier) ? 'locked' : ''}" 
                             data-story="${id}" onclick="platform.selectStory('${id}')">
                            <div class="story-tab-header">
                                <h3>${manuscript.title}</h3>
                                <span class="story-status ${manuscript.status}">${manuscript.status}</span>
                            </div>
                            <p class="story-subtitle">${manuscript.subtitle}</p>
                            <div class="story-meta">
                                <span class="chapter-count">${manuscript.chapters} chapters</span>
                                ${!this.hasAccess(manuscript.tier) ? `
                                    <span class="price-tag">$${this.storyPrices[id] || '5.99'}</span>
                                    <button class="unlock-btn" onclick="platform.purchaseStory('${id}')">
                                        🔓 Unlock
                                    </button>
                                ` : `
                                    <span class="access-badge">✅ Available</span>
                                `}
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${this.getStoryProgress(id)}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="story-preview" id="storyPreview">
                    <div class="preview-placeholder">
                        <h3>Select a story to see preview</h3>
                        <p>Choose from your available stories or unlock new ones</p>
                    </div>
                </div>
            </div>
        `;
    }

    hasAccess(tier) {
        if (!this.currentUser) return tier === 'free-preview';
        
        const userTier = this.currentUser.subscription || 'free';
        const tierHierarchy = ['free', 'premium', 'creator'];
        const requiredLevel = {
            'free-preview': 0,
            'premium': 1,
            'premium-plus': 2
        };

        return tierHierarchy.indexOf(userTier) >= (requiredLevel[tier] || 0);
    }

    async handleSignIn(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        // In production, this would be a real authentication API
        try {
            const response = await this.authenticateUser(email, password);
            if (response.success) {
                this.currentUser = response.user;
                localStorage.setItem('kilnUniverseUser', JSON.stringify(this.currentUser));
                this.closeAuthOverlay();
                this.refreshInterface();
                this.showNotification('Welcome back to KILN Universe!', 'success');
            } else {
                this.showNotification('Invalid credentials', 'error');
            }
        } catch (error) {
            this.showNotification('Connection error. Please try again.', 'error');
        }
    }

    async authenticateUser(email, password) {
        // Mock authentication for demo - replace with real API
        return new Promise(resolve => {
            setTimeout(() => {
                if (email && password) {
                    resolve({
                        success: true,
                        user: {
                            id: 'demo-user',
                            email: email,
                            name: 'KILN Reader',
                            subscription: 'premium',
                            purchasedStories: ['first-void', 'translators-burden'],
                            preferences: {
                                autoSave: true,
                                notifications: true
                            }
                        }
                    });
                } else {
                    resolve({ success: false });
                }
            }, 1000);
        });
    }

    async purchaseStory(storyId) {
        if (!this.currentUser) {
            this.showAuthModal();
            return;
        }

        const price = this.storyPrices[storyId];
        const confirmed = confirm(`Purchase "${window.enhancedLoader.manuscripts[storyId].title}" for $${price}?`);
        
        if (confirmed) {
            try {
                const response = await this.processPayment(storyId, price);
                if (response.success) {
                    this.currentUser.purchasedStories = this.currentUser.purchasedStories || [];
                    this.currentUser.purchasedStories.push(storyId);
                    localStorage.setItem('kilnUniverseUser', JSON.stringify(this.currentUser));
                    this.refreshInterface();
                    this.showNotification(`Successfully unlocked "${window.enhancedLoader.manuscripts[storyId].title}"!`, 'success');
                } else {
                    this.showNotification('Payment failed. Please try again.', 'error');
                }
            } catch (error) {
                this.showNotification('Payment processing error', 'error');
            }
        }
    }

    async processPayment(storyId, amount) {
        // Mock payment processing - replace with real payment gateway
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ success: true, transactionId: 'mock-' + Date.now() });
            }, 2000);
        });
    }

    createAnimationUpgradePath() {
        return `
            <div class="upgrade-path-panel">
                <h3>🎬 Your Story's Evolution Path</h3>
                <div class="evolution-stages">
                    <div class="stage completed">
                        <div class="stage-icon">📖</div>
                        <h4>Interactive Text</h4>
                        <p>Rich story with editing tools</p>
                        <span class="stage-status">✅ Current</span>
                    </div>
                    
                    <div class="stage ${this.hasAccess('premium') ? 'available' : 'locked'}">
                        <div class="stage-icon">🎨</div>
                        <h4>Static Images</h4>
                        <p>AI-generated scene illustrations</p>
                        <span class="stage-status">${this.hasAccess('premium') ? '🔄 Generating' : '🔒 Premium'}</span>
                    </div>
                    
                    <div class="stage ${this.hasAccess('creator') ? 'available' : 'locked'}">
                        <div class="stage-icon">🎭</div>  
                        <h4>Animated Sequences</h4>
                        <p>Character movements and transitions</p>
                        <span class="stage-status">${this.hasAccess('creator') ? '🚧 In Development' : '🔒 Creator'}</span>
                    </div>
                    
                    <div class="stage future">
                        <div class="stage-icon">🎬</div>
                        <h4>AI Movie</h4>
                        <p>Full cinematic experience</p>
                        <span class="stage-status">🔮 Coming Soon</span>
                    </div>
                </div>

                <div class="upgrade-benefits">
                    <h4>Unlock Next Level:</h4>
                    <ul>
                        <li>✨ AI-generated scene images</li>
                        <li>🎨 Custom visual style options</li>
                        <li>🔄 Dynamic character expressions</li>
                        <li>🎵 Atmospheric sound design</li>
                        <li>📱 Enhanced mobile experience</li>
                    </ul>
                    
                    <button class="upgrade-button" onclick="platform.showUpgradeOptions()">
                        🚀 Upgrade Experience - $9.99/month
                    </button>
                </div>
            </div>
        `;
    }

    generateAnalyticsInsights() {
        return {
            userEngagement: this.calculateEngagement(),
            storyMetrics: this.getStoryMetrics(),
            revenueProjections: this.calculateRevenue(),
            growthOpportunities: this.identifyGrowthAreas()
        };
    }

    calculateEngagement() {
        return {
            averageSessionTime: '23 minutes',
            completionRate: '78%',
            returnVisitorRate: '65%',
            notesPerSession: 12,
            exportRate: '34%'
        };
    }

    getStoryMetrics() {
        return {
            'first-void': {
                purchases: 156,
                avgRating: 4.7,
                completionRate: '82%'
            },
            'translators-burden': {
                purchases: 203,
                avgRating: 4.9,
                completionRate: '89%'
            }
        };
    }

    calculateRevenue() {
        return {
            monthly: {
                subscriptions: '$1,247',
                storyPurchases: '$843',
                total: '$2,090'
            },
            projected: {
                sixMonth: '$15,600',
                yearly: '$31,200'
            }
        };
    }

    identifyGrowthAreas() {
        return [
            'Mobile app development for increased engagement',
            'Social sharing features for organic growth',
            'Subscription gifting for holidays',
            'Educational institution licensing',
            'Merchandise tie-ins with story themes',
            'Community features for reader discussions'
        ];
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `platform-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                </span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
}

// Initialize platform
window.KilnUniversePlatform = KilnUniversePlatform;