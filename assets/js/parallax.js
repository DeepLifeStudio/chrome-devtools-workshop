/**
 * Parallax Effects Module
 * Handles mouse-based parallax scrolling for enhanced user experience
 */

class ParallaxManager {
  constructor(options = {}) {
    this.scenes = new Map();
    this.deviceInfo = this.detectDevice();

    // Adaptive options based on device
    this.options = this.getAdaptiveOptions(options);

    this.init();
  }

  /**
   * Initialize parallax functionality
   */
  init() {
    // Check if Parallax.js is available
    if (typeof Parallax === 'undefined') {
      console.warn('Parallax.js library not found. Parallax effects will be disabled.');
      return;
    }

    // Initialize all parallax scenes
    this.initializeScenes();

    // Setup global mouse movement listener
    this.setupGlobalMouseListener();

    // Handle window resize
    this.setupResizeListener();

    // Performance optimization
    this.setupPerformanceOptimizations();
  }

  /**
   * Initialize all parallax scenes
   */
  initializeScenes() {
    const sceneElements = document.querySelectorAll('[data-parallax]');

    sceneElements.forEach((element, index) => {
      try {
        // Create unique scene ID
        const sceneId = `parallax-scene-${index}`;
        element.setAttribute('data-parallax-id', sceneId);

        // Initialize Parallax.js instance
        const parallaxInstance = new Parallax(element, {
          scalarX: this.options.scalarX,
          scalarY: this.options.scalarY,
          frictionX: this.options.frictionX,
          frictionY: this.options.frictionY,
          originX: this.options.originX,
          originY: this.options.originY,
          pointerEvents: this.options.pointerEvents,
          limitX: this.options.limitX,
          limitY: this.options.limitY
        });

        // Store scene instance
        this.scenes.set(sceneId, {
          element,
          instance: parallaxInstance,
          isActive: true
        });

        console.log(`Parallax scene initialized: ${sceneId}`);
      } catch (error) {
        console.error(`Failed to initialize parallax scene ${index}:`, error);
      }
    });
  }

  /**
   * Setup global mouse movement listener for enhanced performance
   */
  setupGlobalMouseListener() {
    let mouseX = 0;
    let mouseY = 0;
    let rafId = null;

    const updateMousePosition = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animateMouseParallax = () => {
      // Update all scenes with current mouse position
      this.scenes.forEach((scene) => {
        if (scene.isActive && scene.instance) {
          const rect = scene.element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          // Calculate relative position
          const relativeX = (mouseX - centerX) / window.innerWidth;
          const relativeY = (mouseY - centerY) / window.innerHeight;

          // Manually update parallax elements
          this.updateParallaxElements(scene.element, relativeX, relativeY);
        }
      });

      rafId = requestAnimationFrame(animateMouseParallax);
    };

    // Mouse move listener
    document.addEventListener('mousemove', updateMousePosition);

    // Start animation loop
    animateMouseParallax();

    // Cleanup function
    this.cleanupMouseParallax = () => {
      document.removeEventListener('mousemove', updateMousePosition);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }

  /**
   * Update parallax elements manually
   * @param {HTMLElement} sceneElement - Scene element
   * @param {number} relativeX - Relative X position (-1 to 1)
   * @param {number} relativeY - Relative Y position (-1 to 1)
   */
  updateParallaxElements(sceneElement, relativeX, relativeY) {
    const elements = sceneElement.querySelectorAll('[data-depth]');

    elements.forEach(element => {
      const depth = parseFloat(element.getAttribute('data-depth')) || 0.5;
      const moveX = relativeX * depth * this.options.scalarX;
      const moveY = relativeY * depth * this.options.scalarY;

      // Apply transformation
      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
  }

  /**
   * Setup window resize listener
   */
  setupResizeListener() {
    let resizeTimeout;

    const handleResize = () => {
      // Debounce resize events
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Reinitialize scenes on resize
        this.scenes.forEach((scene) => {
          if (scene.instance && scene.instance.enable) {
            scene.instance.enable();
          }
        });
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    this.cleanupResize = () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }

  /**
   * Setup performance optimizations
   */
  setupPerformanceOptimizations() {
    // Log device information for debugging
    console.log('Parallax device info:', this.deviceInfo);

    // Disable parallax if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.disableAllScenes();
      console.log('Parallax effects disabled due to prefers-reduced-motion');
      return;
    }

    // Strict conditions for mobile devices
    if (this.deviceInfo.type === 'mobile') {
      // On mobile, only enable parallax if explicitly forced and device has good performance
      if (!this.options.forceMobile || !this.deviceInfo.hasGPU || this.deviceInfo.slowConnection) {
        this.disableAllScenes();
        console.log('Parallax effects disabled on mobile device (performance or preference)');
        return;
      }
    }

    // Setup touch-specific optimizations for mobile/tablet
    if (this.deviceInfo.hasTouch) {
      this.setupTouchOptimizations();
    }

    // Setup responsive behavior
    this.setupResponsiveBehavior();

    // Pause parallax when page is not visible
    this.setupVisibilityHandling();
  }

  /**
   * Setup touch-specific optimizations
   */
  setupTouchOptimizations() {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (event) => {
      if (event.touches.length === 1) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
      }
    };

    const handleTouchMove = (event) => {
      // Prevent default scroll behavior only if this is a parallax interaction
      if (event.touches.length === 1) {
        const touchX = event.touches[0].clientX;
        const touchY = event.touches[0].clientY;
        const deltaX = Math.abs(touchX - touchStartX);
        const deltaY = Math.abs(touchY - touchStartY);

        // Only block default if we detect a drag gesture (not scroll)
        if (deltaX < 50 && deltaY < 50) {
          event.preventDefault();
        }
      }
    };

    // Add touch listeners to parallax scenes
    this.scenes.forEach((scene) => {
      if (scene.element) {
        scene.element.addEventListener('touchstart', handleTouchStart, { passive: false });
        scene.element.addEventListener('touchmove', handleTouchMove, { passive: false });
      }
    });
  }

  /**
   * Setup responsive behavior for different screen sizes
   */
  setupResponsiveBehavior() {
    let resizeTimeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Re-detect device on resize
        this.deviceInfo = this.detectDevice();

        // Update options based on new device info
        const newOptions = this.getAdaptiveOptions();
        this.updateOptions(newOptions);

        console.log('Parallax updated for new device:', this.deviceInfo);
      }, 300); // Debounce resize events
    };

    window.addEventListener('resize', handleResize);

    // Handle orientation changes for mobile devices
    if (this.deviceInfo.hasTouch) {
      window.addEventListener('orientationchange', () => {
        setTimeout(() => {
          handleResize();
        }, 500); // Wait for orientation change to complete
      });
    }
  }

  /**
   * Setup visibility change handling for performance
   */
  setupVisibilityHandling() {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;

      this.scenes.forEach((scene) => {
        if (scene.instance) {
          if (isVisible) {
            scene.instance.enable();
            scene.isActive = true;
          } else {
            scene.instance.disable();
            scene.isActive = false;
          }
        }
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
  }

  /**
   * Detect device information and capabilities
   * @returns {Object} Device information
   */
  detectDevice() {
    const userAgent = navigator.userAgent;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Device type detection
    const isMobile = width <= 768 || /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = (width > 768 && width <= 1024) || /iPad|Android(?!.*Mobile)/i.test(userAgent);
    const isDesktop = width > 1024;

    // Touch capability detection
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Performance detection
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.effectiveType === '3g');

    // GPU capability detection
    const hasGPU = this.detectGPUCapability();

    return {
      type: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
      width,
      height,
      hasTouch,
      slowConnection,
      hasGPU,
      pixelRatio: window.devicePixelRatio || 1,
      landscape: width > height
    };
  }

  /**
   * Detect GPU capability
   * @returns {boolean} Whether device has GPU acceleration
   */
  detectGPUCapability() {
    try {
      // Check for WebGL support
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        return true;
      }

      // Check for CSS 3D transforms support
      const testEl = document.createElement('div');
      testEl.style.transform = 'translateZ(0)';
      testEl.style.webkitTransform = 'translateZ(0)';
      return testEl.style.transform !== '';
    } catch (e) {
      return false;
    }
  }

  /**
   * Get adaptive options based on device capabilities
   * @param {Object} userOptions - User provided options
   * @returns {Object} Adaptive options
   */
  getAdaptiveOptions(userOptions = {}) {
    const defaultOptions = {
      scalarX: 8,
      scalarY: 8,
      frictionX: 0.08,
      frictionY: 0.08,
      originX: 0.5,
      originY: 0.5,
      pointerEvents: false,
      limitX: false,
      limitY: false,
      forceMobile: false
    };

    let adaptiveOptions = { ...defaultOptions, ...userOptions };

    // Adaptive based on device type
    switch (this.deviceInfo.type) {
      case 'mobile':
        adaptiveOptions = {
          ...adaptiveOptions,
          scalarX: 4,        // Reduced intensity for mobile
          scalarY: 4,
          frictionX: 0.12,  // More friction for smoother feel
          frictionY: 0.12,
          limitX: 0.3,      // Limit movement range
          limitY: 0.3,
          ...userOptions.mobile
        };
        break;

      case 'tablet':
        adaptiveOptions = {
          ...adaptiveOptions,
          scalarX: 6,        // Moderate intensity for tablet
          scalarY: 6,
          frictionX: 0.1,
          frictionY: 0.1,
          limitX: 0.5,
          limitY: 0.5,
          ...userOptions.tablet
        };
        break;

      case 'desktop':
        adaptiveOptions = {
          ...adaptiveOptions,
          scalarX: 10,       // Full intensity for desktop
          scalarY: 10,
          frictionX: 0.08,
          frictionY: 0.08,
          ...userOptions.desktop
        };
        break;
    }

    // Adaptive based on connection speed
    if (this.deviceInfo.slowConnection) {
      adaptiveOptions.scalarX *= 0.5;
      adaptiveOptions.scalarY *= 0.5;
    }

    // Adaptive based on GPU capability
    if (!this.deviceInfo.hasGPU) {
      adaptiveOptions.scalarX *= 0.7;
      adaptiveOptions.scalarY *= 0.7;
    }

    // Adaptive based on pixel ratio (for high-DPI displays)
    if (this.deviceInfo.pixelRatio > 2) {
      adaptiveOptions.scalarX *= 1.2;
      adaptiveOptions.scalarY *= 1.2;
    }

    // Adaptive based on orientation
    if (this.deviceInfo.landscape) {
      adaptiveOptions.scalarX *= 1.1;
      adaptiveOptions.scalarY *= 0.9;
    } else {
      adaptiveOptions.scalarX *= 0.9;
      adaptiveOptions.scalarY *= 1.1;
    }

    return adaptiveOptions;
  }

  /**
   * Check if device is mobile (legacy method for compatibility)
   * @returns {boolean} Whether device is mobile
   */
  isMobileDevice() {
    return this.deviceInfo.type === 'mobile';
  }

  /**
   * Disable all parallax scenes
   */
  disableAllScenes() {
    this.scenes.forEach((scene) => {
      if (scene.instance) {
        scene.instance.disable();
        scene.isActive = false;
      }
    });
  }

  /**
   * Enable all parallax scenes
   */
  enableAllScenes() {
    this.scenes.forEach((scene) => {
      if (scene.instance) {
        scene.instance.enable();
        scene.isActive = true;
      }
    });
  }

  /**
   * Update parallax options
   * @param {Object} newOptions - New options to merge
   */
  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };

    // Reinitialize scenes with new options
    this.scenes.forEach((scene) => {
      if (scene.instance) {
        Object.assign(scene.instance, newOptions);
      }
    });
  }

  /**
   * Get scene information
   * @returns {Object} Scene information
   */
  getSceneInfo() {
    return {
      totalScenes: this.scenes.size,
      activeScenes: Array.from(this.scenes.values()).filter(scene => scene.isActive).length,
      options: this.options,
      supportsParallax: typeof Parallax !== 'undefined'
    };
  }

  /**
   * Destroy parallax manager and cleanup
   */
  destroy() {
    // Disable all scenes
    this.disableAllScenes();

    // Destroy all instances
    this.scenes.forEach((scene) => {
      if (scene.instance && scene.instance.destroy) {
        scene.instance.destroy();
      }
    });

    // Clear scenes map
    this.scenes.clear();

    // Cleanup event listeners
    if (this.cleanupMouseParallax) {
      this.cleanupMouseParallax();
    }
    if (this.cleanupResize) {
      this.cleanupResize();
    }

    console.log('Parallax manager destroyed');
  }
}

// Initialize parallax manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.parallaxManager = new ParallaxManager({
    scalarX: 8,        // Reduce intensity for subtler effect
    scalarY: 8,
    frictionX: 0.08,  // Smoother movement
    frictionY: 0.08,
    originX: 0.5,    // Center origin
    originY: 0.5,
    pointerEvents: false, // Don't interfere with other interactions
    limitX: false,    // No limit on movement
    limitY: false,
    forceMobile: false // Disable on mobile by default
  });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ParallaxManager;
}