/**
 * Barba.js configuration for smooth page transitions
 * 创建页面间流畅过渡的 SPA 效果
 */

(function() {
    'use strict';

    /**
     * 等待依赖库加载
     */
    function waitForDependencies() {
        return Promise.all([
            waitForBarba(),
            waitForGSAP()
        ]);
    }

    function waitForBarba() {
        return new Promise((resolve) => {
            if (typeof barba !== 'undefined') {
                resolve(window.barba);
            } else {
                const checkInterval = setInterval(() => {
                    if (typeof window.barba !== 'undefined') {
                        clearInterval(checkInterval);
                        resolve(window.barba);
                    }
                }, 100);
            }
        });
    }

    function waitForGSAP() {
        return new Promise((resolve) => {
            if (typeof window.gsap !== 'undefined') {
                resolve(window.gsap);
            } else {
                const checkInterval = setInterval(() => {
                    if (typeof window.gsap !== 'undefined') {
                        clearInterval(checkInterval);
                        resolve(window.gsap);
                    }
                }, 100);
            }
        });
    }

    /**
     * 页面过渡动画定义
     */
    const transitions = {
        // 默认淡入淡出过渡
        fade: {
            name: 'fade-transition',
            sync: false,
            leave: (data) => {
                return new Promise((resolve) => {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(data.current.container, {
                            opacity: 0,
                            duration: 0.3,
                            onComplete: resolve
                        });
                    } else {
                        // Fallback: 简单的 CSS 过渡
                        data.current.container.style.opacity = '0';
                        data.current.container.style.transition = 'opacity 0.3s';
                        setTimeout(resolve, 300);
                    }
                });
            },
            enter: (data) => {
                return new Promise((resolve) => {
                    if (typeof gsap !== 'undefined') {
                        gsap.from(data.next.container, {
                            opacity: 0,
                            duration: 0.3,
                            onComplete: resolve
                        });
                    } else {
                        // Fallback: 简单的 CSS 过渡
                        data.next.container.style.opacity = '0';
                        data.next.container.style.transition = 'opacity 0.3s';
                        setTimeout(() => {
                            data.next.container.style.opacity = '1';
                        }, 10);
                        setTimeout(resolve, 300);
                    }
                });
            }
        },

        // 滑动过渡效果
        slide: {
            name: 'slide-transition',
            sync: false,
            leave: (data) => {
                return new Promise((resolve) => {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(data.current.container, {
                            x: -100,
                            opacity: 0,
                            duration: 0.4,
                            ease: "power2.inOut",
                            onComplete: resolve
                        });
                    } else {
                        // Fallback: CSS 动画
                        data.current.container.style.transform = 'translateX(-100px)';
                        data.current.container.style.opacity = '0';
                        data.current.container.style.transition = 'transform 0.4s, opacity 0.4s';
                        setTimeout(resolve, 400);
                    }
                });
            },
            enter: (data) => {
                return new Promise((resolve) => {
                    if (typeof gsap !== 'undefined') {
                        gsap.from(data.next.container, {
                            x: 100,
                            opacity: 0,
                            duration: 0.4,
                            ease: "power2.inOut",
                            onComplete: resolve
                        });
                    } else {
                        // Fallback: CSS 动画
                        data.next.container.style.transform = 'translateX(100px)';
                        data.next.container.style.opacity = '0';
                        data.next.container.style.transition = 'transform 0.4s, opacity 0.4s';
                        setTimeout(() => {
                            data.next.container.style.transform = 'translateX(0)';
                            data.next.container.style.opacity = '1';
                        }, 10);
                        setTimeout(resolve, 400);
                    }
                });
            }
        },

        // 缩放过渡效果
        zoom: {
            name: 'zoom-transition',
            sync: false,
            leave: (data) => {
                return new Promise((resolve) => {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(data.current.container, {
                            scale: 0.8,
                            opacity: 0,
                            duration: 0.3,
                            ease: "back.in(1.7)",
                            onComplete: resolve
                        });
                    } else {
                        // Fallback: CSS 动画
                        data.current.container.style.transform = 'scale(0.8)';
                        data.current.container.style.opacity = '0';
                        data.current.container.style.transition = 'transform 0.3s, opacity 0.3s';
                        setTimeout(resolve, 300);
                    }
                });
            },
            enter: (data) => {
                return new Promise((resolve) => {
                    if (typeof gsap !== 'undefined') {
                        gsap.from(data.next.container, {
                            scale: 1.2,
                            opacity: 0,
                            duration: 0.3,
                            ease: "back.out(1.7)",
                            onComplete: resolve
                        });
                    } else {
                        // Fallback: CSS 动画
                        data.next.container.style.transform = 'scale(1.2)';
                        data.next.container.style.opacity = '0';
                        data.next.container.style.transition = 'transform 0.3s, opacity 0.3s';
                        setTimeout(() => {
                            data.next.container.style.transform = 'scale(1)';
                            data.next.container.style.opacity = '1';
                        }, 10);
                        setTimeout(resolve, 300);
                    }
                });
            }
        }
    };

    /**
     * 初始化页面脚本
     */
    function initializePageScripts() {
        console.log('Initializing page scripts...');

        // 重新初始化 Lucide 图标
        try {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
                console.log('Lucide icons initialized');
            }
        } catch (error) {
            console.warn('Failed to initialize Lucide icons:', error);
        }

        // 重新初始化主题系统
        try {
            if (typeof initializeTheme === 'function') {
                initializeTheme();
                console.log('Theme system initialized');
            }
        } catch (error) {
            console.warn('Failed to initialize theme:', error);
        }

        // 重新初始化国际化
        try {
            if (typeof initializeI18n === 'function') {
                initializeI18n();
                console.log('i18n system initialized');
            }
        } catch (error) {
            console.warn('Failed to initialize i18n:', error);
        }

        // 重新初始化滚动显示动画
        try {
            if (typeof initializeScrollReveal === 'function') {
                initializeScrollReveal();
                console.log('ScrollReveal initialized');
            }
        } catch (error) {
            console.warn('Failed to initialize ScrollReveal:', error);
        }

        // 重新初始化视差效果
        try {
            if (typeof initializeParallax === 'function') {
                initializeParallax();
                console.log('Parallax initialized');
            }
        } catch (error) {
            console.warn('Failed to initialize parallax:', error);
        }

        // 重新初始化动画
        try {
            if (typeof initializeAnimations === 'function') {
                initializeAnimations();
                console.log('Animations initialized');
            }
        } catch (error) {
            console.warn('Failed to initialize animations:', error);
        }

        // 重新初始化主导航
        initializeMainNavigation();

        // 重新初始化滚动到顶部按钮
        initializeScrollToTop();

        // 隐藏加载屏幕
        hideLoadingScreen();

        console.log('Page scripts initialization completed');
    }

    /**
     * 初始化主导航功能
     */
    function initializeMainNavigation() {
        const header = document.querySelector('[data-header]');
        const mobileMenuToggle = document.querySelector('[data-mobile-menu-toggle]');
        const mobileMenu = document.querySelector('[data-mobile-menu]');

        if (!header) return;

        // 滚动时改变头部样式
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);

        // 移动端菜单切换
        if (mobileMenuToggle && mobileMenu) {
            const toggleMenu = () => {
                const isOpen = mobileMenu.classList.contains('open');
                mobileMenu.classList.toggle('open');
                mobileMenuToggle.setAttribute('aria-expanded', !isOpen);
            };

            mobileMenuToggle.addEventListener('click', toggleMenu);
        }

        console.log('Main navigation initialized');
    }

    /**
     * 初始化滚动到顶部按钮
     */
    function initializeScrollToTop() {
        const scrollToTopBtn = document.querySelector('[data-scroll-to-top]');

        if (!scrollToTopBtn) return;

        const showHideBtn = () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        };

        const scrollToTop = (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        window.addEventListener('scroll', showHideBtn);
        scrollToTopBtn.addEventListener('click', scrollToTop);

        console.log('Scroll to top initialized');
    }

    /**
     * 隐藏加载屏幕
     */
    function hideLoadingScreen() {
        const loader = document.querySelector('[data-loader]');
        if (loader) {
            if (typeof gsap !== 'undefined') {
                gsap.to(loader, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        loader.style.display = 'none';
                    }
                });
            } else {
                // Fallback: 简单的 CSS 隐藏
                loader.style.transition = 'opacity 0.3s';
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 300);
            }
        }
    }

    /**
     * Barba.js 配置
     */
    function initBarba(barba) {
        if (!barba) {
            console.error('Barba.js not available');
            return;
        }

        try {
            barba.init({
                // 启用预加载
                prefetchIgnore: false,

                // 调试模式
                debug: true,

                // 过渡定义
                transitions: [
                    transitions.fade,
                    transitions.slide,
                    transitions.zoom
                ],

                // 视图配置
                views: [
                    {
                        namespace: 'home',
                        beforeEnter() {
                            console.log('Entering home page');
                        }
                    },
                    {
                        namespace: 'about',
                        beforeEnter() {
                            console.log('Entering about page');
                        }
                    },
                    {
                        namespace: 'devtools',
                        beforeEnter() {
                            console.log('Entering devtools page');
                        }
                    },
                    {
                        namespace: 'gdg',
                        beforeEnter() {
                            console.log('Entering GDG page');
                        }
                    }
                ],

                // 全局钩子
                before: ({ current }) => {
                    console.log(`Leaving: ${current.namespace}`);
                },

                beforeEnter: ({ next }) => {
                    // 更新页面标题
                    document.title = next.html.title || document.title;

                    // 更新 HTML 属性
                    const html = next.html;
                    const lang = html.querySelector('html').getAttribute('lang');
                    const theme = html.querySelector('html').getAttribute('data-theme');

                    if (lang) document.documentElement.setAttribute('lang', lang);
                    if (theme) document.documentElement.setAttribute('data-theme', theme);

                    // 滚动到顶部
                    window.scrollTo(0, 0);
                },

                afterEnter: () => {
                    // 初始化页面脚本
                    initializePageScripts();
                },

                after: () => {
                    console.log('Page transition completed');
                }
            });

            console.log('Barba.js initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Barba.js:', error);
        }
    }

    /**
     * 初始化应用
     */
    function initApp() {
        console.log('Initializing Barba transitions...');

        waitForDependencies()
            .then(([barba]) => {
                console.log('Dependencies loaded, initializing Barba...');
                initBarba(barba);

                // 初始化当前页面
                initializePageScripts();
            })
            .catch((error) => {
                console.error('Failed to load dependencies:', error);

                // 即使 Barba 失败，也初始化基本页面功能
                initializePageScripts();
            });
    }

    // DOM 加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }

})();