/**
 * Anime.js 微交互动画库
 * 为按钮、菜单等UI元素提供丰富的微交互效果
 */

class MicroAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.waitForAnimeJS().then(() => {
            this.initButtonAnimations();
            this.initMenuAnimations();
            this.initCardAnimations();
            this.initIconAnimations();
            this.initThemeAnimations();
        });
    }

    // 等待 Anime.js 加载完成
    waitForAnimeJS() {
        return new Promise((resolve) => {
            const checkAnime = () => {
                if (typeof anime !== 'undefined') {
                    resolve();
                } else {
                    setTimeout(checkAnime, 100);
                }
            };
            checkAnime();
        });
    }

    // 按钮微交互动画
    initButtonAnimations() {
        // 为所有按钮添加点击波纹效果
        this.addRippleEffect();

        // 按钮悬停动画
        this.initButtonHoverEffects();

        // 按钮点击反馈
        this.initButtonClickFeedback();
    }

    // 添加波纹效果
    addRippleEffect() {
        const buttons = document.querySelectorAll('button, .btn, [role="button"]');

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // 创建波纹元素
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    width: 0;
                    height: 0;
                    left: ${x}px;
                    top: ${y}px;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                `;

                // 确保按钮有相对定位
                button.style.position = 'relative';
                button.style.overflow = 'hidden';

                button.appendChild(ripple);

                // 使用 anime.js 创建波纹动画
                anime({
                    targets: ripple,
                    width: Math.max(rect.width, rect.height) * 2,
                    height: Math.max(rect.width, rect.height) * 2,
                    opacity: [0.6, 0],
                    duration: 800,
                    easing: 'easeOutQuart',
                    complete: () => {
                        ripple.remove();
                    }
                });
            });
        });
    }

    // 按钮悬停效果
    initButtonHoverEffects() {
        const buttons = document.querySelectorAll('button, .btn, [role="button"]');

        buttons.forEach(button => {
            // 鼠标进入
            button.addEventListener('mouseenter', () => {
                anime({
                    targets: button,
                    scale: [1, 1.05],
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });

            // 鼠标离开
            button.addEventListener('mouseleave', () => {
                anime({
                    targets: button,
                    scale: [1.05, 1],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    // 按钮点击反馈
    initButtonClickFeedback() {
        const buttons = document.querySelectorAll('button, .btn, [role="button"]');

        buttons.forEach(button => {
            button.addEventListener('mousedown', () => {
                anime({
                    targets: button,
                    scale: [1, 0.95],
                    duration: 100,
                    easing: 'easeInQuad'
                });
            });

            button.addEventListener('mouseup', () => {
                anime({
                    targets: button,
                    scale: [0.95, 1.05],
                    duration: 100,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    // 菜单动画
    initMenuAnimations() {
        // 移动端菜单切换动画
        this.initMobileMenuAnimation();

        // 导航链接悬停动画
        this.initNavLinkAnimations();

        // 语言切换器动画
        this.initLanguageSwitcherAnimation();
    }

    // 移动端菜单动画
    initMobileMenuAnimation() {
        const menuToggle = document.querySelector('[data-mobile-menu-toggle]');
        const mobileMenu = document.querySelector('[data-mobile-menu]');
        const menuIcon = menuToggle?.querySelector('i');

        if (!menuToggle || !mobileMenu) return;

        let isOpen = false;

        menuToggle.addEventListener('click', () => {
            isOpen = !isOpen;

            // 菜单滑动动画
            anime({
                targets: mobileMenu,
                translateY: isOpen ? ['-16px', '0px'] : ['0px', '-16px'],
                scaleY: isOpen ? [0.95, 1] : [1, 0.95],
                opacity: isOpen ? [0, 1] : [1, 0],
                duration: 300,
                easing: 'easeOutQuart'
            });

            // 图标旋转动画
            if (menuIcon) {
                anime({
                    targets: menuIcon,
                    rotate: isOpen ? [0, 90] : [90, 0],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }

            // 菜单项依次进入动画
            if (isOpen) {
                const menuItems = mobileMenu.querySelectorAll('a');
                anime({
                    targets: menuItems,
                    translateX: [20, 0],
                    opacity: [0, 1],
                    duration: 200,
                    delay: anime.stagger(50),
                    easing: 'easeOutQuad'
                });
            }
        });
    }

    // 导航链接动画
    initNavLinkAnimations() {
        const navLinks = document.querySelectorAll('[data-nav-link]');

        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                anime({
                    targets: link,
                    translateY: [-2, 0],
                    color: '#3b82f6',
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });

            link.addEventListener('mouseleave', () => {
                anime({
                    targets: link,
                    translateY: [0, 0],
                    color: '',
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    // 语言切换器动画
    initLanguageSwitcherAnimation() {
        const languageSwitcher = document.querySelector('[data-language-switcher]');

        if (!languageSwitcher) return;

        languageSwitcher.addEventListener('click', () => {
            anime({
                targets: languageSwitcher,
                rotate: [0, 360],
                duration: 600,
                easing: 'easeInOutQuad'
            });
        });
    }

    // 卡片动画
    initCardAnimations() {
        const cards = document.querySelectorAll('[data-card]');

        cards.forEach(card => {
            // 卡片悬停时的3D效果
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                anime({
                    targets: card,
                    rotateX: -rotateX,
                    rotateY: rotateY,
                    duration: 100,
                    easing: 'easeOutQuad'
                });
            });

            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    rotateX: 0,
                    rotateY: 0,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    // 图标动画
    initIconAnimations() {
        // 主题切换图标动画
        const themeToggle = document.querySelector('[data-theme-toggle]');

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                anime({
                    targets: themeToggle,
                    scale: [1, 0.8, 1],
                    rotate: [0, 360],
                    duration: 600,
                    easing: 'easeInOutQuad'
                });
            });
        }

        // 滚动到顶部按钮动画
        const scrollToTop = document.querySelector('[data-scroll-to-top]');

        if (scrollToTop) {
            scrollToTop.addEventListener('mouseenter', () => {
                anime({
                    targets: scrollToTop,
                    translateY: [-2, 0],
                    scale: [1, 1.1],
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });

            scrollToTop.addEventListener('mouseleave', () => {
                anime({
                    targets: scrollToTop,
                    translateY: [0, 0],
                    scale: [1.1, 1],
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
        }
    }

    // 主题切换动画
    initThemeAnimations() {
        // 监听主题变化，添加过渡动画
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    this.animateThemeTransition();
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

    // 主题切换过渡动画
    animateThemeTransition() {
        anime({
            targets: 'body',
            opacity: [1, 0.9, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });
    }

    // 页面加载时的入场动画
    initPageLoadAnimations() {
        // 标题动画
        anime({
            targets: '.gradient-text',
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: anime.stagger(100, {start: 300}),
            easing: 'easeOutQuad'
        });

        // 卡片依次进入
        anime({
            targets: '[data-card]',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(150, {start: 500}),
            easing: 'easeOutQuad'
        });

        // 按钮弹跳进入
        anime({
            targets: 'button, .btn',
            scale: [0, 1],
            opacity: [0, 1],
            duration: 600,
            delay: anime.stagger(100, {start: 700}),
            easing: 'easeOutElastic(1, .5)'
        });
    }

    // 文字打字机效果（替代 Typed.js 的轻量级版本）
    typewriterEffect(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;

        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };

        type();
    }

    // 数字滚动动画
    countUpAnimation(element, target, duration = 1000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const update = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        };

        update();
    }

    // 创建自定义动画
    createCustomAnimation(selector, animation) {
        anime({
            targets: selector,
            ...animation
        });
    }

    // 批量动画效果
    staggeredAnimation(selector, animation, staggerDelay = 100) {
        anime({
            targets: selector,
            ...animation,
            delay: anime.stagger(staggerDelay)
        });
    }
}

// 创建全局实例
window.microAnimations = new MicroAnimations();

// 导出类供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MicroAnimations;
}
