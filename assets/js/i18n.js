/**
 * Internationalization Module
 * Handles language switching and translation management
 */

class I18nManager {
  constructor(options = {}) {
    this.defaultLanguage = options.defaultLanguage || 'cn';
    this.currentLanguage = this.getSavedLanguage() || this.defaultLanguage;
    this.translations = {};
    this.storageKey = 'chrome-devtools-language';
    this.localesPath = options.localesPath || '/locales/';

    this.init();
  }

  /**
   * Initialize i18n system
   */
  async init() {
    // Load default language translations
    await this.loadTranslations(this.defaultLanguage);

    // If current language is different from default, load it
    if (this.currentLanguage !== this.defaultLanguage) {
      await this.loadTranslations(this.currentLanguage);
    }

    // Apply translations to the page
    this.applyTranslations();

    // Set document language attribute
    this.setDocumentLanguage();

    // Setup language switchers
    this.setupLanguageSwitchers();

    // Listen for language change events
    this.setupEventListeners();
  }

  /**
   * Load translation file
   * @param {string} language - Language code ('cn' or 'en')
   * @returns {Promise} Translation data
   */
  async loadTranslations(language) {
    try {
      const response = await fetch(`${this.localesPath}${language}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${language} translations`);
      }

      const translations = await response.json();
      this.translations[language] = translations;

      return translations;
    } catch (error) {
      console.error(`Error loading ${language} translations:`, error);

      // Fallback to default language if available
      if (language !== this.defaultLanguage && this.translations[this.defaultLanguage]) {
        this.translations[language] = this.translations[this.defaultLanguage];
      }

      return this.translations[language] || {};
    }
  }

  /**
   * Get saved language from localStorage
   * @returns {string|null} Saved language code
   */
  getSavedLanguage() {
    try {
      return localStorage.getItem(this.storageKey);
    } catch (error) {
      console.warn('Failed to read language from localStorage:', error);
      return null;
    }
  }

  /**
   * Save language preference to localStorage
   * @param {string} language - Language code to save
   */
  saveLanguage(language) {
    try {
      localStorage.setItem(this.storageKey, language);
    } catch (error) {
      console.warn('Failed to save language to localStorage:', error);
    }
  }

  /**
   * Get user's preferred language from browser
   * @returns {string} Browser language code
   */
  getBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;

    // Map browser language codes to our supported languages
    const langMap = {
      'zh': 'cn',
      'zh-CN': 'cn',
      'zh-TW': 'cn',
      'en': 'en',
      'en-US': 'en',
      'en-GB': 'en'
    };

    return langMap[browserLang] || this.defaultLanguage;
  }

  /**
   * Get translation by key
   * @param {string} key - Translation key (supports dot notation)
   * @param {Object} params - Parameters for interpolation
   * @returns {string} Translated text
   */
  t(key, params = {}) {
    const translation = this.getNestedValue(this.translations[this.currentLanguage], key);

    if (!translation) {
      // Fallback to default language
      const fallbackTranslation = this.getNestedValue(this.translations[this.defaultLanguage], key);
      if (fallbackTranslation) {
        console.warn(`Translation missing for ${key} in ${this.currentLanguage}, using ${this.defaultLanguage}`);
        return this.interpolate(fallbackTranslation, params);
      }

      // Return key if no translation found
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }

    return this.interpolate(translation, params);
  }

  /**
   * Get nested value from object using dot notation
   * @param {Object} obj - Object to search
   * @param {string} path - Dot notation path
   * @returns {*} Value or undefined
   */
  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  }

  /**
   * Interpolate parameters into translation string
   * @param {string} text - Text with placeholders
   * @param {Object} params - Parameters to interpolate
   * @returns {string} Interpolated text
   */
  interpolate(text, params) {
    if (typeof text !== 'string') {
      return text;
    }

    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match;
    });
  }

  /**
   * Switch to a different language
   * @param {string} language - Language code to switch to
   * @returns {Promise} Promise that resolves when language is switched
   */
  async switchLanguage(language) {
    if (language === this.currentLanguage) {
      return;
    }

    // Load translations if not already loaded
    if (!this.translations[language]) {
      await this.loadTranslations(language);
    }

    const previousLanguage = this.currentLanguage;
    this.currentLanguage = language;

    // Save preference
    this.saveLanguage(language);

    // Apply translations to the page
    this.applyTranslations();

    // Update document language
    this.setDocumentLanguage();

    // Update language switcher buttons
    this.updateLanguageSwitchers();

    // Dispatch language change event
    this.dispatchLanguageChangeEvent(language, previousLanguage);
  }

  /**
   * Apply translations to all elements with data-i18n attribute
   */
  applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);

      if (translation && translation !== key) {
        // Handle different element types
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else if (element.tagName === 'IMG') {
          element.alt = translation;
        } else if (element.tagName === 'TITLE') {
          element.textContent = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = this.currentLanguage;
  }

  /**
   * Set document language and direction
   */
  setDocumentLanguage() {
    document.documentElement.lang = this.currentLanguage;

    // Set text direction for RTL languages (if needed in future)
    if (this.currentLanguage === 'ar' || this.currentLanguage === 'he') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }

  /**
   * Setup language switcher buttons
   */
  setupLanguageSwitchers() {
    const switchers = document.querySelectorAll('[data-language-switcher]');

    switchers.forEach(switcher => {
      const targetLanguage = switcher.getAttribute('data-language') ||
                           (this.currentLanguage === 'cn' ? 'en' : 'cn');

      switcher.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchLanguage(targetLanguage);
      });

      // Update initial state
      this.updateLanguageSwitcher(switcher);
    });
  }

  /**
   * Update all language switcher buttons
   */
  updateLanguageSwitchers() {
    const switchers = document.querySelectorAll('[data-language-switcher]');
    switchers.forEach(switcher => {
      this.updateLanguageSwitcher(switcher);
    });
  }

  /**
   * Update individual language switcher button
   * @param {Element} switcher - Language switcher element
   */
  updateLanguageSwitcher(switcher) {
    const targetLanguage = switcher.getAttribute('data-language') ||
                         (this.currentLanguage === 'cn' ? 'en' : 'cn');

    // Update ARIA label
    switcher.setAttribute('aria-label', this.t(`navigation.${targetLanguage === 'cn' ? 'languageToggle' : 'languageToggle'}`));

    // Update button state
    switcher.setAttribute('data-current-language', this.currentLanguage);
    switcher.setAttribute('data-target-language', targetLanguage);

    // Update button text if it has a data-i18n attribute
    const textElement = switcher.querySelector('[data-i18n]');
    if (textElement) {
      const key = textElement.getAttribute('data-i18n');
      textElement.textContent = this.t(key);
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Listen for custom events to force translation updates
    document.addEventListener('forceTranslationUpdate', () => {
      this.applyTranslations();
    });

    // Listen for DOM changes to translate new elements
    if (window.MutationObserver) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const elements = node.querySelectorAll ?
                node.querySelectorAll('[data-i18n]') : [];

              if (node.hasAttribute && node.hasAttribute('data-i18n')) {
                elements.push(node);
              }

              elements.forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = this.t(key);
                if (translation && translation !== key) {
                  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                  } else {
                    element.textContent = translation;
                  }
                }
              });
            }
          });
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }

  /**
   * Dispatch language change event
   * @param {string} newLanguage - New language code
   * @param {string} previousLanguage - Previous language code
   */
  dispatchLanguageChangeEvent(newLanguage, previousLanguage) {
    const event = new CustomEvent('languagechange', {
      detail: {
        newLanguage,
        previousLanguage,
        translations: this.translations[newLanguage]
      },
      bubbles: true,
      cancelable: true
    });

    document.dispatchEvent(event);
  }

  /**
   * Get current language
   * @returns {string} Current language code
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Get available languages
   * @returns {Array} Array of available language codes
   */
  getAvailableLanguages() {
    return Object.keys(this.translations);
  }

  /**
   * Check if a language is available
   * @param {string} language - Language code to check
   * @returns {boolean} True if language is available
   */
  isLanguageAvailable(language) {
    return language in this.translations;
  }

  /**
   * Format date according to current locale
   * @param {Date|string} date - Date to format
   * @param {Object} options - Formatting options
   * @returns {string} Formatted date
   */
  formatDate(date, options = {}) {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const localeMap = {
      'cn': 'zh-CN',
      'en': 'en-US'
    };

    return dateObj.toLocaleDateString(localeMap[this.currentLanguage] || 'en-US', options);
  }

  /**
   * Format number according to current locale
   * @param {number} number - Number to format
   * @param {Object} options - Formatting options
   * @returns {string} Formatted number
   */
  formatNumber(number, options = {}) {
    const localeMap = {
      'cn': 'zh-CN',
      'en': 'en-US'
    };

    return number.toLocaleString(localeMap[this.currentLanguage] || 'en-US', options);
  }
}

// Initialize i18n manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.i18n = new I18nManager({
    localesPath: '/locales/',
    defaultLanguage: 'cn'
  });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = I18nManager;
}