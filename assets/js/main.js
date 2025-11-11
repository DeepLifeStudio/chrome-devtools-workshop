/**
 * Main Application Module
 * Core functionality and application initialization
 */

class App {
  constructor() {
    this.modules = {};
    this.isInitialized = false;
    this.components = {};
    this.config = {
      animations: {
        enabled: true,
        duration: 300
      },
      breakpoints: {
        mobile: 768,
        tablet: 1024,
        desktop: 1280
      }
    };

    this.init();
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      // Show loading state
      this.showLoading();

      // Initialize core modules
      await this.initializeModules();

      // Initialize components
      this.initializeComponents();

      // Setup event listeners
      this.setupEventListeners();

      // Initialize animations
      this.initializeAnimations();

      // Setup responsive behavior
      this.setupResponsiveBehavior();

      // Handle initial routing
      this.handleInitialRouting();

      // Hide loading state
      this.hideLoading();

      this.isInitialized = true;
      this.dispatchAppEvent('app:initialized');

      console.log('Application initialized successfully');
    } catch (error) {
      console.error('Failed to initialize application:', error);
      this.showErrorMessage('Application initialization failed');
    }
  }

  /**
   * Initialize core modules
   */
  async initializeModules() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve);
      });
    }

    // Modules are already loaded via script tags
    // Just register references if available
    if (window.themeManager) {
      this.modules.theme = window.themeManager;
    }

    if (window.i18n) {
      this.modules.i18n = window.i18n;
    }
  }

  /**
   * Initialize UI components
   */
  initializeComponents() {
    // Navigation Component
    this.components.navigation = new NavigationComponent({
      container: '[data-navigation]',
      mobileBreakpoint: this.config.breakpoints.mobile
    });

    // Card Component
    this.components.cards = document.querySelectorAll('[data-card]');
    this.components.cards.forEach((card, index) => {
      card.dataset.cardId = index;
    });

    // Modal Component (if needed)
    this.components.modals = new ModalComponent({
      container: '[data-modal-container]',
      closeOnEscape: true,
      closeOnBackdrop: true
    });

    // Scroll to top button
    this.initializeScrollToTop();

    // Copy buttons
    this.initializeCopyButtons();

    // Smooth scrolling for anchor links
    this.initializeSmoothScrolling();
  }

  /**
   * Setup global event listeners
   */
  setupEventListeners() {
    // Listen for theme changes
    document.addEventListener('themechange', (event) => {
      this.handleThemeChange(event.detail.theme);
    });

    // Listen for language changes
    document.addEventListener('languagechange', (event) => {
      this.handleLanguageChange(event.detail.newLanguage);
    });

    // Listen for page visibility changes
    document.addEventListener('visibilitychange', () => {
      this.handleVisibilityChange();
    });

    // Listen for online/offline status
    window.addEventListener('online', () => this.handleConnectionChange(true));
    window.addEventListener('offline', () => this.handleConnectionChange(false));

    // Listen for resize events (throttled)
    window.addEventListener('resize', this.throttle(() => {
      this.handleResize();
    }, 250));

    // Listen for scroll events (throttled for performance, but also immediate for navigation)
    window.addEventListener('scroll', this.throttle(() => {
      this.handleScroll();
    }, 16)); // ~60fps for general scroll handling

    // Immediate scroll handling for navigation header
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const header = document.querySelector('[data-header]');
      if (header) {
        header.classList.toggle('scrolled', scrollY > 20);
      }
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', (event) => {
      this.handleKeyboardNavigation(event);
    });
  }

  /**
   * Initialize animations
   */
  initializeAnimations() {
    if (!this.config.animations.enabled) return;

    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: this.config.animations.duration,
        once: true,
        offset: 100,
        delay: 0
      });
    }

    // Initialize Typed.js if element exists
    this.initializeTypedAnimation();
  }

  /**
   * Initialize typed animation for hero text
   */
  initializeTypedAnimation() {
    const typedElement = document.querySelector('[data-typed]');
    if (typedElement && typeof Typed !== 'undefined') {
      const strings = this.getTypedStrings();

      // Store the typed instance
      this.typedInstance = new Typed(typedElement, {
        strings: strings,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
      });
    }
  }

  /**
   * Reinitialize typed animation with new language strings
   */
  reinitializeTypedAnimation() {
    const typedElement = document.querySelector('[data-typed]');

    // Destroy existing typed instance if it exists
    if (this.typedInstance && typeof this.typedInstance.destroy === 'function') {
      this.typedInstance.destroy();
      this.typedInstance = null;
    }

    // Create new typed instance with updated strings
    if (typedElement && typeof Typed !== 'undefined') {
      const strings = this.getTypedStrings();

      this.typedInstance = new Typed(typedElement, {
        strings: strings,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
      });
    }
  }

  /**
   * Get typed strings based on current language
   */
  getTypedStrings() {
    if (this.modules.i18n) {
      const currentLang = this.modules.i18n.getCurrentLanguage();

      if (currentLang === 'en') {
        return [
          'AI-Powered Browser Debugging',
          'Explore the Future of Browser Debugging',
          'Revolutionizing Developer Experience',
          'Next-Generation Debugging Tools',
          'Automated Testing Made Simple'
        ];
      } else {
        return [
          'AI赋能的浏览器调试与自动化工具',
          '探索浏览器调试的未来',
          '革新开发者体验',
          '下一代调试工具',
          '自动化测试如此简单'
        ];
      }
    }

    // Fallback strings if i18n is not available
    return [
      '探索浏览器调试的未来',
      '革新开发者体验',
      'AI赋能的浏览器调试工具'
    ];
  }

  /**
   * Setup responsive behavior
   */
  setupResponsiveBehavior() {
    // Add responsive classes to body
    this.updateResponsiveClasses();

    // Listen for breakpoint changes
    this.setupBreakpointListener();
  }

  /**
   * Update responsive classes on body
   */
  updateResponsiveClasses() {
    const width = window.innerWidth;
    const body = document.body;

    // Remove existing breakpoint classes
    body.classList.remove('mobile', 'tablet', 'desktop');

    // Add current breakpoint class
    if (width < this.config.breakpoints.mobile) {
      body.classList.add('mobile');
    } else if (width < this.config.breakpoints.desktop) {
      body.classList.add('tablet');
    } else {
      body.classList.add('desktop');
    }
  }

  /**
   * Setup breakpoint listener
   */
  setupBreakpointListener() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.updateResponsiveClasses();
        this.dispatchAppEvent('app:breakpoint-changed', {
          width: window.innerWidth,
          breakpoint: this.getCurrentBreakpoint()
        });
      }, 250);
    });
  }

  /**
   * Get current breakpoint
   */
  getCurrentBreakpoint() {
    const width = window.innerWidth;
    if (width < this.config.breakpoints.mobile) return 'mobile';
    if (width < this.config.breakpoints.desktop) return 'tablet';
    return 'desktop';
  }

  /**
   * Handle initial routing
   */
  handleInitialRouting() {
    // Handle hash navigation
    if (window.location.hash) {
      this.scrollToHash(window.location.hash);
    }

    // Handle navigation state
    this.updateNavigationState();
  }

  /**
   * Initialize scroll to top button
   */
  initializeScrollToTop() {
    const scrollButton = document.querySelector('[data-scroll-to-top]');
    if (scrollButton) {
      scrollButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  /**
   * Initialize copy buttons
   */
  initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('[data-copy]');
    copyButtons.forEach(button => {
      button.addEventListener('click', async () => {
        const text = button.getAttribute('data-copy') ||
                   button.previousElementSibling?.textContent ||
                   '';

        try {
          await navigator.clipboard.writeText(text);
          this.showCopyFeedback(button);
        } catch (error) {
          console.error('Failed to copy text:', error);
        }
      });
    });
  }

  /**
   * Show copy feedback
   */
  showCopyFeedback(button) {
    const originalText = button.textContent;
    const feedbackText = this.modules.i18n ?
      this.modules.i18n.t('common.copied') : '已复制';

    button.textContent = feedbackText;
    button.classList.add('copied');

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }

  /**
   * Initialize smooth scrolling for anchor links
   */
  initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (href !== '#') {
          event.preventDefault();
          this.scrollToHash(href);
        }
      });
    });
  }

  /**
   * Scroll to hash element
   */
  scrollToHash(hash) {
    const element = document.querySelector(hash);
    if (element) {
      const header = document.querySelector('[data-header]');
      const headerHeight = header ? header.offsetHeight : 0;
      const elementTop = element.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Handle theme change
   */
  handleThemeChange(theme) {
    document.body.setAttribute('data-theme', theme);
    this.dispatchAppEvent('app:theme-changed', { theme });
  }

  /**
   * Handle language change
   */
  handleLanguageChange(language) {
    document.documentElement.lang = language;
    this.dispatchAppEvent('app:language-changed', { language });

    // Reinitialize typed animation with new language strings
    this.reinitializeTypedAnimation();
  }

  /**
   * Handle visibility change
   */
  handleVisibilityChange() {
    if (document.hidden) {
      this.dispatchAppEvent('app:hidden');
    } else {
      this.dispatchAppEvent('app:visible');
    }
  }

  /**
   * Handle connection change
   */
  handleConnectionChange(isOnline) {
    document.body.classList.toggle('offline', !isOnline);
    this.dispatchAppEvent('app:connection-changed', { isOnline });

    if (!isOnline) {
      this.showOfflineMessage();
    } else {
      this.hideOfflineMessage();
    }
  }

  /**
   * Handle resize events
   */
  handleResize() {
    this.updateResponsiveClasses();
  }

  /**
   * Handle scroll events
   */
  handleScroll() {
    const scrollY = window.scrollY;
    const header = document.querySelector('[data-header]');

    // Add sticky header behavior
    if (header) {
      header.classList.toggle('scrolled', scrollY > 20);
    }

    // Show/hide scroll to top button
    const scrollButton = document.querySelector('[data-scroll-to-top]');
    if (scrollButton) {
      scrollButton.classList.toggle('visible', scrollY > 300);
    }
  }

  /**
   * Handle keyboard navigation
   */
  handleKeyboardNavigation(event) {
    // Escape key to close modals
    if (event.key === 'Escape') {
      this.closeAllModals();
    }

    // Ctrl/Cmd + K for search (if search functionality exists)
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      this.openSearch();
    }
  }

  /**
   * Throttle function
   */
  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;

    return function (...args) {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  /**
   * Show loading state
   */
  showLoading() {
    const loader = document.querySelector('[data-loader]');
    if (loader) {
      loader.style.display = 'flex';
    }
  }

  /**
   * Hide loading state
   */
  hideLoading() {
    const loader = document.querySelector('[data-loader]');
    if (loader) {
      loader.style.display = 'none';
    }
  }

  /**
   * Show error message
   */
  showErrorMessage(message) {
    console.error(message);
    // You could implement a toast notification here
  }

  /**
   * Show offline message
   */
  showOfflineMessage() {
    let offlineMessage = document.querySelector('[data-offline-message]');
    if (!offlineMessage) {
      offlineMessage = document.createElement('div');
      offlineMessage.setAttribute('data-offline-message', '');
      offlineMessage.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-2 rounded-lg z-50';
      offlineMessage.textContent = 'You are currently offline';
      document.body.appendChild(offlineMessage);
    }
  }

  /**
   * Hide offline message
   */
  hideOfflineMessage() {
    const offlineMessage = document.querySelector('[data-offline-message]');
    if (offlineMessage) {
      offlineMessage.remove();
    }
  }

  /**
   * Close all modals
   */
  closeAllModals() {
    const modals = document.querySelectorAll('[data-modal].active');
    modals.forEach(modal => {
      modal.classList.remove('active');
    });
  }

  /**
   * Open search (placeholder for search functionality)
   */
  openSearch() {
    console.log('Search functionality not implemented yet');
  }

  /**
   * Update navigation state
   */
  updateNavigationState() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('[data-nav-link]');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');

      // Handle different path scenarios
      let isActive = false;

      if (href === '#home' && (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('/'))) {
        isActive = true;
      } else if (href !== '#home' && currentPath.includes(href.replace('../', ''))) {
        isActive = true;
      }

      if (isActive) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * Dispatch custom app event
   */
  dispatchAppEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      detail: { ...detail, timestamp: Date.now() },
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(event);
  }

  /**
   * Get application info
   */
  getInfo() {
    return {
      version: '1.0.0',
      initialized: this.isInitialized,
      modules: Object.keys(this.modules),
      components: Object.keys(this.components),
      breakpoint: this.getCurrentBreakpoint(),
      theme: this.modules.theme?.getCurrentTheme(),
      language: this.modules.i18n?.getCurrentLanguage(),
      online: navigator.onLine
    };
  }
}

/**
 * Navigation Component
 */
class NavigationComponent {
  constructor(options) {
    this.container = document.querySelector(options.container);
    this.mobileBreakpoint = options.mobileBreakpoint || 768;
    this.isOpen = false;

    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupAccessibility();
  }

  setupMobileMenu() {
    const toggleButton = this.container.querySelector('[data-mobile-menu-toggle]');
    const mobileMenu = this.container.querySelector('[data-mobile-menu]');

    if (toggleButton && mobileMenu) {
      toggleButton.addEventListener('click', () => {
        this.toggleMobileMenu();
      });

      // Close menu when clicking outside
      document.addEventListener('click', (event) => {
        if (!this.container.contains(event.target) && this.isOpen) {
          this.closeMobileMenu();
        }
      });
    }
  }

  toggleMobileMenu() {
    this.isOpen = !this.isOpen;
    const mobileMenu = this.container.querySelector('[data-mobile-menu]');
    const toggleButton = this.container.querySelector('[data-mobile-menu-toggle]');

    if (mobileMenu) {
      mobileMenu.classList.toggle('open', this.isOpen);
    }

    if (toggleButton) {
      toggleButton.setAttribute('aria-expanded', this.isOpen);
    }

    document.body.classList.toggle('mobile-menu-open', this.isOpen);
  }

  closeMobileMenu() {
    this.isOpen = false;
    const mobileMenu = this.container.querySelector('[data-mobile-menu]');
    const toggleButton = this.container.querySelector('[data-mobile-menu-toggle]');

    if (mobileMenu) {
      mobileMenu.classList.remove('open');
    }

    if (toggleButton) {
      toggleButton.setAttribute('aria-expanded', 'false');
    }

    document.body.classList.remove('mobile-menu-open');
  }

  setupAccessibility() {
    // Add keyboard navigation support
    this.container.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        // Handle focus trap when mobile menu is open
        if (this.isOpen) {
          this.handleFocusTrap(event);
        }
      }
    });
  }

  handleFocusTrap(event) {
    const focusableElements = this.container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
}

/**
 * Modal Component (placeholder)
 */
class ModalComponent {
  constructor(options) {
    this.options = options;
    this.activeModal = null;
    this.init();
  }

  init() {
    this.setupModalTriggers();
    this.setupModalClose();
  }

  setupModalTriggers() {
    const triggers = document.querySelectorAll('[data-modal-trigger]');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const modalId = trigger.getAttribute('data-modal-trigger');
        this.openModal(modalId);
      });
    });
  }

  setupModalClose() {
    // Close buttons
    document.addEventListener('click', (event) => {
      if (event.target.hasAttribute('data-modal-close') ||
          event.target.closest('[data-modal-close]')) {
        this.closeModal();
      }
    });

    // Escape key
    if (this.options.closeOnEscape) {
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && this.activeModal) {
          this.closeModal();
        }
      });
    }

    // Backdrop click
    if (this.options.closeOnBackdrop) {
      document.addEventListener('click', (event) => {
        if (event.target.hasAttribute('data-modal-backdrop')) {
          this.closeModal();
        }
      });
    }
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      this.activeModal = modal;
      modal.classList.add('active');
      document.body.classList.add('modal-open');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  closeModal() {
    if (this.activeModal) {
      this.activeModal.classList.remove('active');
      document.body.classList.remove('modal-open');
      this.activeModal.setAttribute('aria-hidden', 'true');
      this.activeModal = null;
    }
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { App, NavigationComponent, ModalComponent };
}