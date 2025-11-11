/**
 * Parallax Effects Module
 * Handles mouse-based parallax scrolling for enhanced user experience
 */

class ParallaxManager {
  constructor(options = {}) {
    this.scenes = new Map();
    this.options = {
      scalarX: options.scalarX || 10,
      scalarY: options.scalarY || 10,
      frictionX: options.frictionX || 0.1,
      frictionY: options.frictionY || 0.1,
      originX: options.originX || 0.5,
      originY: options.originY || 0.5,
      pointerEvents: options.pointerEvents || false,
      limitX: options.limitX || false,
      limitY: options.limitY || false,
      ...options
    };

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
    // Disable parallax on slow connections
    if (navigator.connection && navigator.connection.effectiveType) {
      const connectionType = navigator.connection.effectiveType;
      if (connectionType === 'slow-2g' || connectionType === '2g') {
        this.disableAllScenes();
        console.log('Parallax effects disabled due to slow connection');
        return;
      }
    }

    // Disable parallax if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.disableAllScenes();
      console.log('Parallax effects disabled due to prefers-reduced-motion');
      return;
    }

    // Disable on mobile devices (optional, remove if you want mobile support)
    if (this.isMobileDevice() && !this.options.forceMobile) {
      this.disableAllScenes();
      console.log('Parallax effects disabled on mobile device');
      return;
    }

    // Pause parallax when page is not visible
    this.setupVisibilityHandling();
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
   * Check if device is mobile
   * @returns {boolean} Whether device is mobile
   */
  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 768 && 'ontouchstart' in window);
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