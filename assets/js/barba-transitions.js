// Barba.js page transitions configuration
document.addEventListener('DOMContentLoaded', () => {
    // Function to reinitialize theme manager after page transitions
    function reinitializeThemeManager() {
        // Re-setup theme toggle buttons for the new page
        if (window.themeManager) {
            window.themeManager.setupThemeToggleButtons();
            // Update button states to match current theme
            window.themeManager.updateThemeToggleButtons(window.themeManager.getCurrentTheme());
        }
    }

    // Function to reinitialize ScrollReveal after page transitions
    function reinitializeScrollReveal() {
        // Clean up existing ScrollReveal instance
        if (window.scrollRevealManager) {
            // Remove any existing reveal effects to prevent conflicts
            if (window.scrollRevealManager.sr) {
                // Destroy old instance
                window.scrollRevealManager.sr.destroy();
            }
        }

        // Create new ScrollReveal instance for the new page
        setTimeout(() => {
            window.scrollRevealManager = new ScrollRevealManager();
        }, 100);
    }

    // Function to reinitialize AOS animations
    function reinitializeAOS() {
        if (typeof AOS !== 'undefined') {
            // Refresh AOS for new content
            AOS.refresh();
        }
    }

    // Function to reinitialize all animations
    function reinitializeAnimations() {
        reinitializeScrollReveal();
        reinitializeAOS();

        // Reinitialize Typed.js if it exists
        if (window.app && typeof window.app.reinitializeTypedAnimation === 'function') {
            window.app.reinitializeTypedAnimation();
        }
    }

    // Check if Barba is available
    if (typeof barba !== 'undefined') {
        // 随机选择切换效果
        function getRandomTransition() {
            const transitions = ['default-transition', 'slide-transition', 'fade-scale-transition', 'flip-transition'];
            return transitions[Math.floor(Math.random() * transitions.length)];
        }

        // 创建进度指示器
        function createProgressIndicator() {
            const indicator = document.createElement('div');
            indicator.id = 'barba-progress';
            indicator.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
                z-index: 10000;
                transition: width 0.3s ease;
                pointer-events: none;
            `;
            document.body.appendChild(indicator);
            return indicator;
        }

        // 更新进度指示器
        function updateProgress(progress) {
            let indicator = document.getElementById('barba-progress');
            if (!indicator) {
                indicator = createProgressIndicator();
            }
            indicator.style.width = progress + '%';
        }

        // 隐藏进度指示器
        function hideProgress() {
            const indicator = document.getElementById('barba-progress');
            if (indicator) {
                indicator.style.opacity = '0';
                setTimeout(() => {
                    indicator.remove();
                }, 300);
            }
        }

        // 为导航链接添加过渡效果类
        function addTransitionClasses() {
            const navLinks = document.querySelectorAll('a[href^="./"], a[href^="../"]');
            navLinks.forEach((link, index) => {
                if (!link.classList.contains('no-barba')) {
                    // 根据索引分配不同的过渡效果
                    const transitionTypes = ['default-transition', 'slide-transition', 'fade-scale-transition', 'flip-transition'];
                    const transitionType = transitionTypes[index % transitionTypes.length];
                    link.setAttribute('data-barba-transition', transitionType);
                }
            });
        }

        // 初始化时添加过渡类
        addTransitionClasses();

        barba.init({
            transition: {
                name: ({ trigger }) => {
                    // 根据触发器的属性选择过渡效果
                    const transitionType = trigger.getAttribute('data-barba-transition');
                    return transitionType || getRandomTransition();
                }
            },
            // 添加生命周期钩子
            request: ({ trigger }) => {
                updateProgress(10);
            },
            response: ({ response }) => {
                updateProgress(60);
            },
            completed: () => {
                updateProgress(100);
                setTimeout(hideProgress, 300);
                // 重新为导航链接添加过渡类
                addTransitionClasses();
                // 确保主题状态同步
                if (window.themeManager) {
                    window.themeManager.updateThemeToggleButtons(window.themeManager.getCurrentTheme());
                }
                // 重新初始化所有动画效果
                reinitializeAnimations();
            },
            transitions: [{
                name: 'default-transition',
                sync: true,
                leave(data) {
                    return new Promise(resolve => {
                        // 更新进度
                        updateProgress(30);

                        // 创建全屏遮罩层，带渐变和模糊效果
                        const overlay = document.createElement('div');
                        overlay.style.cssText = `
                            position: fixed;
                            top: 0;
                            left: -100%;
                            width: 100%;
                            height: 100%;
                            background: linear-gradient(135deg,
                                rgba(102, 126, 234, 0.95) 0%,
                                rgba(118, 75, 162, 0.95) 50%,
                                rgba(240, 147, 251, 0.95) 100%);
                            backdrop-filter: blur(10px);
                            -webkit-backdrop-filter: blur(10px);
                            z-index: 9999;
                            pointer-events: none;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        `;

                        // 添加加载指示器
                        const loader = document.createElement('div');
                        loader.style.cssText = `
                            width: 60px;
                            height: 60px;
                            border: 4px solid rgba(255, 255, 255, 0.3);
                            border-top: 4px solid #ffffff;
                            border-radius: 50%;
                            animation: spin 1s linear infinite;
                        `;
                        overlay.appendChild(loader);

                        // 添加旋转动画样式
                        const style = document.createElement('style');
                        style.textContent = `
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `;
                        document.head.appendChild(style);

                        document.body.appendChild(overlay);

                        // 滑入动画 - 更慢更明显
                        overlay.animate([
                            {
                                left: '-100%',
                                opacity: 0
                            },
                            {
                                left: '0%',
                                opacity: 1
                            }
                        ], {
                            duration: 600,
                            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            fill: 'forwards'
                        });

                        // 当前页面淡出并缩放
                        data.current.container.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        data.current.container.style.opacity = '0';
                        data.current.container.style.transform = 'scale(0.95) translateY(10px)';

                        setTimeout(() => {
                            updateProgress(50);
                            resolve();
                        }, 600);
                    });
                },
                enter(data) {
                    return new Promise(resolve => {
                        // 设置新页面初始状态
                        data.next.container.style.opacity = '0';
                        data.next.container.style.transform = 'scale(1.05) translateY(30px)';
                        data.next.container.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        data.next.container.style.filter = 'blur(2px)';

                        setTimeout(() => {
                            // 新页面淡入、缩放和移动
                            data.next.container.style.opacity = '1';
                            data.next.container.style.transform = 'scale(1) translateY(0)';
                            data.next.container.style.filter = 'blur(0)';

                            // 移除遮罩层
                            const overlay = document.querySelector('div[style*="position: fixed"]');
                            if (overlay) {
                                overlay.animate([
                                    {
                                        left: '0%',
                                        opacity: 1
                                    },
                                    {
                                        left: '100%',
                                        opacity: 0
                                    }
                                ], {
                                    duration: 600,
                                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                                    fill: 'forwards'
                                });

                                setTimeout(() => {
                                    overlay.remove();
                                    // 清理动画样式
                                    const styleElement = document.querySelector('style[data-barba-transition]');
                                    if (styleElement) styleElement.remove();
                                }, 600);
                            }

                            setTimeout(() => {
                                resolve();
                            }, 400);
                        }, 200);
                    });
                }
            },
            {
                name: 'slide-transition',
                sync: true,
                leave(data) {
                    return new Promise(resolve => {
                        updateProgress(30);

                        // 创建分割线效果
                        const splitter = document.createElement('div');
                        splitter.style.cssText = `
                            position: fixed;
                            top: 0;
                            left: 50%;
                            width: 4px;
                            height: 100%;
                            background: linear-gradient(180deg,
                                transparent 0%,
                                rgba(102, 126, 234, 0.8) 20%,
                                rgba(240, 147, 251, 0.8) 80%,
                                transparent 100%);
                            transform: translateX(-50%);
                            z-index: 10000;
                            pointer-events: none;
                            box-shadow: 0 0 20px rgba(102, 126, 234, 0.6);
                        `;
                        document.body.appendChild(splitter);

                        // 当前页面滑出，带旋转效果
                        data.current.container.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
                        data.current.container.style.transform = 'translateX(-120%) rotateY(-15deg) scale(0.9)';
                        data.current.container.style.opacity = '0.8';

                        setTimeout(() => {
                            updateProgress(50);
                            resolve();
                        }, 700);
                    });
                },
                enter(data) {
                    return new Promise(resolve => {
                        // 设置新页面初始状态
                        data.next.container.style.transform = 'translateX(120%) rotateY(15deg) scale(0.9)';
                        data.next.container.style.opacity = '0.8';
                        data.next.container.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        data.next.container.style.filter = 'blur(1px)';

                        setTimeout(() => {
                            // 新页面滑入，带反向旋转
                            data.next.container.style.transform = 'translateX(0) rotateY(0) scale(1)';
                            data.next.container.style.opacity = '1';
                            data.next.container.style.filter = 'blur(0)';

                            // 移除分割线
                            const splitter = document.querySelector('div[style*="position: fixed"]');
                            if (splitter) {
                                splitter.style.transition = 'opacity 0.3s ease-out';
                                splitter.style.opacity = '0';
                                setTimeout(() => splitter.remove(), 300);
                            }

                            updateProgress(80);
                            resolve();
                        }, 100);
                    });
                }
            },
            {
                name: 'fade-scale-transition',
                sync: true,
                leave(data) {
                    return new Promise(resolve => {
                        updateProgress(30);

                        // 创建圆形扩散遮罩
                        const overlay = document.createElement('div');
                        overlay.style.cssText = `
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            width: 0;
                            height: 0;
                            border-radius: 50%;
                            background: radial-gradient(circle,
                                rgba(102, 126, 234, 0.9) 0%,
                                rgba(118, 75, 162, 0.9) 70%,
                                rgba(240, 147, 251, 0.9) 100%);
                            transform: translate(-50%, -50%);
                            z-index: 9999;
                            pointer-events: none;
                        `;
                        document.body.appendChild(overlay);

                        // 圆形扩散动画
                        const maxRadius = Math.max(window.innerWidth, window.innerHeight) * 1.5;
                        overlay.animate([
                            {
                                width: '0',
                                height: '0',
                                opacity: 0
                            },
                            {
                                width: maxRadius + 'px',
                                height: maxRadius + 'px',
                                opacity: 1,
                                offset: 0.7
                            },
                            {
                                width: maxRadius + 'px',
                                height: maxRadius + 'px',
                                opacity: 1
                            }
                        ], {
                            duration: 800,
                            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            fill: 'forwards'
                        });

                        // 当前页面缩放消失
                        data.current.container.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        data.current.container.style.transform = 'scale(0.8)';
                        data.current.container.style.opacity = '0';

                        setTimeout(() => {
                            updateProgress(50);
                            resolve();
                        }, 800);
                    });
                },
                enter(data) {
                    return new Promise(resolve => {
                        // 设置新页面初始状态
                        data.next.container.style.transform = 'scale(1.2)';
                        data.next.container.style.opacity = '0';
                        data.next.container.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
                        data.next.container.style.filter = 'blur(3px) brightness(1.2)';

                        setTimeout(() => {
                            // 新页面缩放出现
                            data.next.container.style.transform = 'scale(1)';
                            data.next.container.style.opacity = '1';
                            data.next.container.style.filter = 'blur(0) brightness(1)';

                            // 移除遮罩
                            const overlay = document.querySelector('div[style*="position: fixed"]');
                            if (overlay) {
                                overlay.style.transition = 'opacity 0.4s ease-out';
                                overlay.style.opacity = '0';
                                setTimeout(() => overlay.remove(), 400);
                            }

                            setTimeout(() => {
                                resolve();
                            }, 300);
                        }, 100);
                    });
                }
            },
            {
                name: 'flip-transition',
                sync: true,
                leave(data) {
                    return new Promise(resolve => {
                        updateProgress(30);

                        // 当前页面翻转消失
                        data.current.container.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        data.current.container.style.transform = 'rotateY(-90deg) scale(0.9)';
                        data.current.container.style.opacity = '0';

                        setTimeout(() => {
                            updateProgress(50);
                            resolve();
                        }, 800);
                    });
                },
                enter(data) {
                    return new Promise(resolve => {
                        // 设置新页面初始状态
                        data.next.container.style.transform = 'rotateY(90deg) scale(0.9)';
                        data.next.container.style.opacity = '0';
                        data.next.container.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        data.next.container.style.transformOrigin = 'center center';
                        data.next.container.style.backfaceVisibility = 'hidden';

                        setTimeout(() => {
                            // 新页面翻转出现
                            data.next.container.style.transform = 'rotateY(0deg) scale(1)';
                            data.next.container.style.opacity = '1';

                            setTimeout(() => {
                                resolve();
                            }, 200);
                        }, 50);
                    });
                }
            }],
            views: [{
                namespace: 'home',
                beforeEnter() {
                    // Ensure theme is correctly applied before page content appears
                    if (window.themeManager) {
                        const currentTheme = window.themeManager.getCurrentTheme();
                        window.themeManager.applyTheme(currentTheme);
                    }
                    // Re-initialize home page specific scripts
                    if (typeof initializeHomeAnimations === 'function') {
                        initializeHomeAnimations();
                    }
                    // Re-initialize theme manager for new page
                    reinitializeThemeManager();
                },
                afterEnter() {
                    // Re-initialize animations after page has fully entered
                    setTimeout(() => {
                        reinitializeAnimations();
                    }, 200);
                }
            }, {
                namespace: 'about',
                beforeEnter() {
                    // Ensure theme is correctly applied before page content appears
                    if (window.themeManager) {
                        const currentTheme = window.themeManager.getCurrentTheme();
                        window.themeManager.applyTheme(currentTheme);
                    }
                    // Re-initialize about page specific scripts
                    if (typeof initializeAboutAnimations === 'function') {
                        initializeAboutAnimations();
                    }
                    // Re-initialize theme manager for new page
                    reinitializeThemeManager();
                },
                afterEnter() {
                    // Re-initialize animations after page has fully entered
                    setTimeout(() => {
                        reinitializeAnimations();
                    }, 200);
                }
            }, {
                namespace: 'devtools-mcp',
                beforeEnter() {
                    // Ensure theme is correctly applied before page content appears
                    if (window.themeManager) {
                        const currentTheme = window.themeManager.getCurrentTheme();
                        window.themeManager.applyTheme(currentTheme);
                    }
                    // Re-initialize devtools-mcp page specific scripts
                    if (typeof initializeDevToolsAnimations === 'function') {
                        initializeDevToolsAnimations();
                    }
                    // Re-initialize theme manager for new page
                    reinitializeThemeManager();
                },
                afterEnter() {
                    // Re-initialize animations after page has fully entered
                    setTimeout(() => {
                        reinitializeAnimations();
                    }, 200);
                }
            }, {
                namespace: 'gdg',
                beforeEnter() {
                    // Ensure theme is correctly applied before page content appears
                    if (window.themeManager) {
                        const currentTheme = window.themeManager.getCurrentTheme();
                        window.themeManager.applyTheme(currentTheme);
                    }
                    // Re-initialize gdg-devfest page specific scripts
                    if (typeof initializeGDGAnimations === 'function') {
                        initializeGDGAnimations();
                    }
                    // Re-initialize theme manager for new page
                    reinitializeThemeManager();
                },
                afterEnter() {
                    // Re-initialize animations after page has fully entered
                    setTimeout(() => {
                        reinitializeAnimations();
                    }, 200);
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