// Theme Switcher for Portfolio
class ThemeSwitcher {
    constructor() {
        this.currentTheme = 'default';
        this.themes = {
            'default': 'styles.css',
            'cyber-blue': 'styles-cyber-blue.css',
            'matrix-purple': 'styles-matrix-purple.css',
            'neon-orange': 'styles-neon-orange.css'
        };
        this.init();
    }

    init() {
        this.createThemeSelector();
        this.loadSavedTheme();
        this.bindEvents();
    }

    createThemeSelector() {
        // Create theme selector container
        const themeContainer = document.createElement('div');
        themeContainer.className = 'theme-selector';
        themeContainer.innerHTML = `
            <div class="theme-selector-toggle">
                <i class="fas fa-palette"></i>
                <span>Theme</span>
            </div>
            <div class="theme-options">
                <div class="theme-option" data-theme="default">
                    <div class="theme-preview default-preview"></div>
                    <span>Default</span>
                </div>
                <div class="theme-option" data-theme="cyber-blue">
                    <div class="theme-preview cyber-blue-preview"></div>
                    <span>Cyber Blue</span>
                </div>
                <div class="theme-option" data-theme="matrix-purple">
                    <div class="theme-preview matrix-purple-preview"></div>
                    <span>Matrix Purple</span>
                </div>
                <div class="theme-option" data-theme="neon-orange">
                    <div class="theme-preview neon-orange-preview"></div>
                    <span>Neon Orange</span>
                </div>
            </div>
        `;

        // Add styles for theme selector
        const style = document.createElement('style');
        style.textContent = `
            .theme-selector {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 1000;
                font-family: 'Fira Code', monospace;
            }

            .theme-selector-toggle {
                background: rgba(0, 0, 0, 0.8);
                color: #fff;
                padding: 10px 15px;
                border-radius: 25px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                border: 1px solid #333;
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
            }

            .theme-selector-toggle:hover {
                background: rgba(0, 0, 0, 0.9);
                border-color: #00ff41;
            }

            .theme-options {
                position: absolute;
                top: 100%;
                right: 0;
                background: rgba(0, 0, 0, 0.95);
                border: 1px solid #333;
                border-radius: 10px;
                padding: 10px;
                margin-top: 10px;
                backdrop-filter: blur(20px);
                display: none;
                min-width: 200px;
            }

            .theme-selector:hover .theme-options {
                display: block;
            }

            .theme-option {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px 12px;
                cursor: pointer;
                border-radius: 5px;
                transition: all 0.3s ease;
                color: #fff;
            }

            .theme-option:hover {
                background: rgba(255, 255, 255, 0.1);
            }

            .theme-option.active {
                background: rgba(0, 255, 65, 0.2);
                border: 1px solid #00ff41;
            }

            .theme-preview {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border: 2px solid #333;
            }

            .default-preview {
                background: linear-gradient(45deg, #00ff41, #ff0040);
            }

            .cyber-blue-preview {
                background: linear-gradient(45deg, #00d4ff, #ff6b35);
            }

            .matrix-purple-preview {
                background: linear-gradient(45deg, #00ff88, #ff0080);
            }

            .neon-orange-preview {
                background: linear-gradient(45deg, #ff6600, #00ffff);
            }

            @media (max-width: 768px) {
                .theme-selector {
                    top: 80px;
                    right: 10px;
                }
                
                .theme-selector-toggle span {
                    display: none;
                }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(themeContainer);
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme && this.themes[savedTheme]) {
            this.switchTheme(savedTheme);
        }
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-option')) {
                const themeOption = e.target.closest('.theme-option');
                const theme = themeOption.dataset.theme;
                this.switchTheme(theme);
            }
        });

        // Close theme selector when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.theme-selector')) {
                const themeOptions = document.querySelector('.theme-options');
                if (themeOptions) {
                    themeOptions.style.display = 'none';
                }
            }
        });
    }

    switchTheme(themeName) {
        if (!this.themes[themeName]) return;

        // Remove existing theme stylesheets
        const existingThemes = document.querySelectorAll('link[href*="styles-"]');
        existingThemes.forEach(link => {
            if (link.href.includes('styles.css') && !link.href.includes('styles-')) return;
            link.remove();
        });

        // Add new theme stylesheet
        if (themeName !== 'default') {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = this.themes[themeName];
            document.head.appendChild(link);
        }

        // Update active state
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
        });
        document.querySelector(`[data-theme="${themeName}"]`)?.classList.add('active');

        // Save theme preference
        localStorage.setItem('portfolio-theme', themeName);
        this.currentTheme = themeName;

        // Add theme transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);

        // Show theme change notification
        this.showThemeNotification(themeName);
    }

    showThemeNotification(themeName) {
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.innerHTML = `
            <i class="fas fa-check"></i>
            <span>Theme changed to ${themeName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
        `;

        // Add notification styles
        const style = document.createElement('style');
        style.textContent = `
            .theme-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 255, 65, 0.9);
                color: #000;
                padding: 12px 20px;
                border-radius: 25px;
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 1001;
                animation: slideIn 0.3s ease;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(0, 255, 65, 0.3);
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

            .theme-notification i {
                color: #000;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);

        // Add slideOut animation
        const slideOutStyle = document.createElement('style');
        slideOutStyle.textContent = `
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(slideOutStyle);
    }
}

// Initialize theme switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitcher();
}); 