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

    // Inline translations to avoid path issues
    this.inlineTranslations = {
      cn: {
        "navigation": {
          "home": "首页",
          "gdgDevFest": "GDG DevFest",
          "devToolsMCP": "DevTools MCP",
          "about": "关于我",
          "themeToggle": "切换主题",
          "languageToggle": "切换语言"
        },
        "home": {
          "hero": {
            "title": "Chrome DevTools MCP Server",
            "subtitle": "探索浏览器调试的未来",
            "description": "加入我们，深入了解 Chrome DevTools MCP Server 如何革新开发者体验",
            "cta": "立即探索",
            "learnMore": "了解更多"
          },
          "highlights": {
            "title": "工作坊亮点",
            "technical": {
              "title": "深度技术分享",
              "description": "深入了解 MCP 协议与 Chrome DevTools 的集成原理"
            },
            "practical": {
              "title": "实战演示",
              "description": "现场演示 MCP Server 的实际应用场景"
            },
            "interactive": {
              "title": "互动体验",
              "description": "动手体验最新的开发者工具功能"
            }
          },
          "schedule": {
            "title": "活动时间",
            "date": "2024年12月",
            "location": "Google Developer Groups DevFest",
            "duration": "2小时深度工作坊"
          }
        },
        "gdgDevFest": {
          "title": "GDG DevFest 2024",
          "subtitle": "全球开发者节日",
          "about": "Google Developer Groups DevFest 是全球性的开发者社区活动，汇聚了来自各地的技术爱好者和专业人士。",
          "highlights": {
            "title": "活动亮点",
            "community": "强大的技术社区",
            "learning": "前沿技术学习",
            "networking": "行业人脉拓展",
            "innovation": "创新思维碰撞"
          }
        },
        "devToolsMCP": {
          "title": "Chrome DevTools MCP Server",
          "subtitle": "浏览器调试的下一个突破",
          "overview": "MCP (Model Context Protocol) Server 为 Chrome DevTools 带来了前所未有的扩展能力，让开发者工具更加智能和可定制。",
          "features": {
            "title": "核心特性",
            "protocol": {
              "title": "MCP 协议支持",
              "description": "完全兼容 Model Context Protocol 标准"
            },
            "integration": {
              "title": "无缝集成",
              "description": "与现有 Chrome DevTools 工作流程完美融合"
            },
            "extensible": {
              "title": "高度可扩展",
              "description": "支持自定义工具和第三方插件开发"
            },
            "realTime": {
              "title": "实时协作",
              "description": "支持多人协作调试和知识分享"
            }
          },
          "technical": {
            "title": "技术架构",
            "protocol": "基于 MCP 协议的通信层",
            "server": "高性能 Node.js 服务器",
            "bridge": "Chrome DevTools 扩展桥接",
            "api": "RESTful API 设计"
          }
        },
        "about": {
          "title": "关于我",
          "subtitle": "AI 开发者与产品创造者",
          "introduction": "我是一名专注于 AI 产品开发的开发者，热衷于创造能够解决真实用户问题的创新产品。",
          "profile": {
            "name": "liuzx",
            "role": "AI 开发者",
            "focus": "Agent 产品开发研究",
            "passion": "喜欢各种有趣的、能解决用户真实存在的问题的小产品"
          },
          "interests": {
            "title": "我的兴趣",
            "ai": "人工智能与机器学习",
            "product": "产品设计与用户体验",
            "innovation": "技术创新与探索",
            "community": "开源社区贡献"
          },
          "contact": {
            "title": "联系方式",
            "email": "邮箱：xx@gmail.com",
            "github": "GitHub 开源项目",
            "linkedin": "LinkedIn 职业档案"
          }
        },
        "common": {
          "loading": "加载中...",
          "error": "出错了",
          "notFound": "页面未找到",
          "backToHome": "返回首页",
          "readMore": "阅读更多",
          "viewDetails": "查看详情",
          "close": "关闭",
          "open": "打开",
          "save": "保存",
          "cancel": "取消",
          "confirm": "确认",
          "search": "搜索",
          "filter": "筛选",
          "sort": "排序",
          "next": "下一个",
          "previous": "上一个",
          "page": "页面",
          "of": "共",
          "items": "项"
        }
      },
      en: {
        "navigation": {
          "home": "Home",
          "gdgDevFest": "GDG DevFest",
          "devToolsMCP": "DevTools MCP",
          "about": "About",
          "themeToggle": "Toggle Theme",
          "languageToggle": "Switch Language"
        },
        "home": {
          "hero": {
            "title": "Chrome DevTools MCP Server",
            "subtitle": "Explore the Future of Browser Debugging",
            "description": "Join us to dive deep into how Chrome DevTools MCP Server revolutionizes the developer experience",
            "cta": "Explore Now",
            "learnMore": "Learn More"
          },
          "highlights": {
            "title": "Workshop Highlights",
            "technical": {
              "title": "Deep Technical Sharing",
              "description": "Deep dive into MCP protocol and Chrome DevTools integration principles"
            },
            "practical": {
              "title": "Live Demonstrations",
              "description": "Real-time demonstrations of MCP Server in practical applications"
            },
            "interactive": {
              "title": "Interactive Experience",
              "description": "Hands-on experience with the latest developer tool features"
            }
          },
          "schedule": {
            "title": "Event Schedule",
            "date": "December 2024",
            "location": "Google Developer Groups DevFest",
            "duration": "2-hour intensive workshop"
          }
        },
        "gdgDevFest": {
          "title": "GDG DevFest 2024",
          "subtitle": "Global Developer Festival",
          "about": "Google Developer Groups DevFest is a worldwide developer community event that brings together tech enthusiasts and professionals from around the globe.",
          "highlights": {
            "title": "Event Highlights",
            "community": "Strong Tech Community",
            "learning": "Cutting-edge Technology Learning",
            "networking": "Industry Networking",
            "innovation": "Innovative Thinking Collision"
          }
        },
        "devToolsMCP": {
          "title": "Chrome DevTools MCP Server",
          "subtitle": "The Next Breakthrough in Browser Debugging",
          "overview": "MCP (Model Context Protocol) Server brings unprecedented extensibility to Chrome DevTools, making developer tools more intelligent and customizable.",
          "features": {
            "title": "Core Features",
            "protocol": {
              "title": "MCP Protocol Support",
              "description": "Fully compliant with Model Context Protocol standards"
            },
            "integration": {
              "title": "Seamless Integration",
              "description": "Perfect integration with existing Chrome DevTools workflows"
            },
            "extensible": {
              "title": "Highly Extensible",
              "description": "Support for custom tools and third-party plugin development"
            },
            "realTime": {
              "title": "Real-time Collaboration",
              "description": "Support for multi-person collaborative debugging and knowledge sharing"
            }
          },
          "technical": {
            "title": "Technical Architecture",
            "protocol": "Communication layer based on MCP protocol",
            "server": "High-performance Node.js server",
            "bridge": "Chrome DevTools extension bridge",
            "api": "RESTful API design"
          }
        },
        "about": {
          "title": "About Me",
          "subtitle": "AI Developer & Product Creator",
          "introduction": "I am a developer focused on AI product development, passionate about creating innovative products that solve real user problems.",
          "profile": {
            "name": "liuzx",
            "role": "AI Developer",
            "focus": "Research on Agent product development",
            "passion": "Love interesting small products that can solve real user problems"
          },
          "interests": {
            "title": "My Interests",
            "ai": "Artificial Intelligence & Machine Learning",
            "product": "Product Design & User Experience",
            "innovation": "Technology Innovation & Exploration",
            "community": "Open Source Community Contribution"
          },
          "contact": {
            "title": "Contact Information",
            "email": "Email: xx@gmail.com",
            "github": "GitHub Open Source Projects",
            "linkedin": "LinkedIn Professional Profile"
          }
        },
        "common": {
          "loading": "Loading...",
          "error": "Error occurred",
          "notFound": "Page not found",
          "backToHome": "Back to Home",
          "readMore": "Read More",
          "viewDetails": "View Details",
          "close": "Close",
          "open": "Open",
          "save": "Save",
          "cancel": "Cancel",
          "confirm": "Confirm",
          "search": "Search",
          "filter": "Filter",
          "sort": "Sort",
          "next": "Next",
          "previous": "Previous",
          "page": "Page",
          "of": "of",
          "items": "items"
        }
      }
    };

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
   * Load translation (now using inline data)
   * @param {string} language - Language code ('cn' or 'en')
   * @returns {Promise} Translation data
   */
  async loadTranslations(language) {
    try {
      // Use inline translations to avoid file loading issues
      if (this.inlineTranslations[language]) {
        this.translations[language] = this.inlineTranslations[language];
        console.log(`Successfully loaded inline ${language} translations`);
        return this.translations[language];
      } else {
        throw new Error(`No inline translations available for language: ${language}`);
      }
    } catch (error) {
      console.error(`Error loading ${language} translations:`, error);

      // Fallback to default language if available
      if (language !== this.defaultLanguage && this.inlineTranslations[this.defaultLanguage]) {
        this.translations[language] = this.inlineTranslations[this.defaultLanguage];
        console.log(`Using ${this.defaultLanguage} as fallback for ${language}`);
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