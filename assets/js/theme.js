/**
 * Theme Management Module
 * Handles dark/light theme switching with localStorage persistence
 */

class ThemeManager {
  constructor() {
    this.storageKey = 'chrome-devtools-theme';
    this.darkClass = 'dark';
    this.init();
  }

  /**
   * Initialize theme system
   */
  init() {
    // Set initial theme based on system preference or saved preference
    this.setTheme(this.getSavedTheme() || this.getSystemTheme());

    // Listen for system theme changes
    this.watchSystemTheme();

    // Add keyboard shortcut (Ctrl/Cmd + Shift + D) for theme toggle
    this.setupKeyboardShortcut();

    // Setup theme toggle buttons
    this.setupThemeToggleButtons();
  }

  /**
   * Get saved theme from localStorage
   * @returns {string|null} Saved theme ('light', 'dark', or null)
   */
  getSavedTheme() {
    try {
      return localStorage.getItem(this.storageKey);
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error);
      return null;
    }
  }

  /**
   * Save theme preference to localStorage
   * @param {string} theme - Theme to save ('light' or 'dark')
   */
  saveTheme(theme) {
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }

  /**
   * Get system preferred theme
   * @returns {string} System theme ('light' or 'dark')
   */
  getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  /**
   * Watch for system theme changes
   */
  watchSystemTheme() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        // Only change theme if user hasn't explicitly set a preference
        if (!this.getSavedTheme()) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  /**
   * Apply theme to document
   * @param {string} theme - Theme to apply ('light' or 'dark')
   */
  setTheme(theme) {
    const html = document.documentElement;

    if (theme === 'dark') {
      html.classList.add(this.darkClass);
      html.setAttribute('data-theme', 'dark');
    } else {
      html.classList.remove(this.darkClass);
      html.setAttribute('data-theme', 'light');
    }

    // Update theme toggle buttons
    this.updateThemeToggleButtons(theme);

    // Dispatch custom event for theme change
    this.dispatchThemeChangeEvent(theme);
  }

  /**
   * Toggle between light and dark themes
   * @returns {string} New theme ('light' or 'dark')
   */
  toggleTheme() {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    this.setTheme(newTheme);
    this.saveTheme(newTheme);

    return newTheme;
  }

  /**
   * Get current theme
   * @returns {string} Current theme ('light' or 'dark')
   */
  getCurrentTheme() {
    const html = document.documentElement;
    return html.classList.contains(this.darkClass) ? 'dark' : 'light';
  }

  /**
   * Update theme toggle buttons UI
   * @param {string} theme - Current theme
   */
  updateThemeToggleButtons(theme) {
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');

    toggleButtons.forEach(button => {
      // Update ARIA label with descriptive text
      const labelText = theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题';
      button.setAttribute('aria-label', labelText);
      button.setAttribute('title', labelText);

      // Update button visual state
      button.setAttribute('data-current-theme', theme);

      // Remove all theme state classes (buttons should not have persistent active states)
      button.classList.remove('theme-dark-active');
      button.classList.remove('theme-light-active');

      // Update icon if present
      const icon = button.querySelector('[data-theme-icon]');
      if (icon) {
        this.updateThemeIcon(icon, theme);
      }
    });
  }

  /**
   * Update theme toggle icon
   * @param {Element} icon - Icon element
   * @param {string} theme - Current theme
   */
  updateThemeIcon(icon, theme) {
    // You can customize this based on your icon library
    // For example, using Lucide icons or Font Awesome
    if (theme === 'dark') {
      icon.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z">
          </path>
        </svg>
      `;
    } else {
      icon.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z">
          </path>
        </svg>
      `;
    }
  }

  /**
   * Setup keyboard shortcut for theme toggle
   */
  setupKeyboardShortcut() {
    document.addEventListener('keydown', (event) => {
      // Ctrl/Cmd + Shift + D
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        this.toggleTheme();
      }
    });
  }

  /**
   * Dispatch theme change event
   * @param {string} theme - New theme
   */
  dispatchThemeChangeEvent(theme) {
    const event = new CustomEvent('themechange', {
      detail: { theme },
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(event);
  }

  /**
   * Get translation for theme-related strings
   * @param {string} key - Translation key
   * @returns {string} Translated string
   */
  getTranslation(key) {
    // This would integrate with your i18n system
    const translations = {
      switchToLight: 'Switch to light theme',
      switchToDark: 'Switch to dark theme'
    };
    return translations[key] || key;
  }

  /**
   * Reset theme to system preference
   */
  resetToSystemTheme() {
    localStorage.removeItem(this.storageKey);
    this.setTheme(this.getSystemTheme());
  }

  /**
   * Setup theme toggle buttons with event listeners
   */
  setupThemeToggleButtons() {
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');

    toggleButtons.forEach(button => {
      // Add click event listener
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Add temporary visual feedback
        button.classList.add('theme-clicking');
        setTimeout(() => {
          button.classList.remove('theme-clicking');
        }, 200);

        this.toggleTheme();
      });

      // Update initial button state
      this.updateThemeToggleButtons(this.getCurrentTheme());
    });
  }

  /**
   * Get theme statistics (for analytics or debugging)
   * @returns {Object} Theme information
   */
  getThemeInfo() {
    return {
      current: this.getCurrentTheme(),
      system: this.getSystemTheme(),
      saved: this.getSavedTheme(),
      supportsSystemTheme: window.matchMedia !== undefined
    };
  }
}

// Initialize theme manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}