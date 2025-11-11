// Barba.js page transitions configuration
document.addEventListener('DOMContentLoaded', () => {
    // Check if Barba is available
    if (typeof barba !== 'undefined') {
        barba.init({
            transitions: [{
                name: 'default-transition',
                leave(data) {
                    return gsap.to(data.current.container, {
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.inOut"
                    });
                },
                enter(data) {
                    return gsap.from(data.next.container, {
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.inOut"
                    });
                }
            }],
            views: [{
                namespace: 'home',
                beforeEnter() {
                    // Re-initialize home page specific scripts
                    if (typeof initializeHomeAnimations === 'function') {
                        initializeHomeAnimations();
                    }
                }
            }, {
                namespace: 'about',
                beforeEnter() {
                    // Re-initialize about page specific scripts
                    if (typeof initializeAboutAnimations === 'function') {
                        initializeAboutAnimations();
                    }
                }
            }, {
                namespace: 'devtools-mcp',
                beforeEnter() {
                    // Re-initialize devtools-mcp page specific scripts
                    if (typeof initializeDevToolsAnimations === 'function') {
                        initializeDevToolsAnimations();
                    }
                }
            }, {
                namespace: 'gdg-devfest',
                beforeEnter() {
                    // Re-initialize gdg-devfest page specific scripts
                    if (typeof initializeGDGAnimations === 'function') {
                        initializeGDGAnimations();
                    }
                }
            }],
            prevent: ({ el }) => {
                // Prevent Barba from handling external links or specific attributes
                return el.classList.contains('no-barba') ||
                       el.hostname !== window.location.hostname ||
                       el.getAttribute('target') === '_blank';
            }
        });
    } else {
        console.warn('Barba.js is not loaded');
    }
});