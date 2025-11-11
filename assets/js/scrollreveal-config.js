/**
 * ScrollReveal 配置文件
 * 专注于创建叙事性内容的滚动动画效果
 */

class ScrollRevealManager {
    constructor() {
        this.sr = null;
        this.init();
    }

    init() {
        // 等待 ScrollReveal 加载完成
        if (typeof ScrollReveal !== 'undefined') {
            this.sr = ScrollReveal();
            this.configureDefaults();
            this.setupPageAnimations();
        } else {
            // 如果库还没加载，等待后重试
            setTimeout(() => this.init(), 100);
        }
    }

    /**
     * 配置默认动画参数
     */
    configureDefaults() {
        this.sr.reveal('[data-sr-fade-up]', {
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 200,
            opacity: 0,
            scale: 0.9,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            interval: 300,
            reset: false
        });

        this.sr.reveal('[data-sr-fade-left]', {
            origin: 'left',
            distance: '80px',
            duration: 1200,
            delay: 300,
            opacity: 0,
            scale: 0.8,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false
        });

        this.sr.reveal('[data-sr-fade-right]', {
            origin: 'right',
            distance: '80px',
            duration: 1200,
            delay: 300,
            opacity: 0,
            scale: 0.8,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false
        });

        this.sr.reveal('[data-sr-zoom-in]', {
            distance: 0,
            scale: 0.3,
            duration: 800,
            delay: 400,
            opacity: 0,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false
        });

        this.sr.reveal('[data-sr-rotate-in]', {
            distance: 0,
            scale: 1,
            rotate: { z: 15 },
            duration: 1000,
            delay: 500,
            opacity: 0,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false
        });

        // 叙事性内容的渐入效果
        this.sr.reveal('[data-sr-narrative]', {
            origin: 'bottom',
            distance: '40px',
            duration: 1500,
            delay: 600,
            opacity: 0,
            scale: 1,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            interval: 400,
            reset: false
        });

        // 统计数字的动画效果
        this.sr.reveal('[data-sr-stats]', {
            origin: 'top',
            distance: '30px',
            duration: 1200,
            delay: 800,
            opacity: 0,
            scale: 0.8,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            interval: 200,
            reset: false,
            afterReveal: this.animateNumber
        });

        // 图片的滑动效果
        this.sr.reveal('[data-sr-slide-left]', {
            origin: 'left',
            distance: '120px',
            duration: 1400,
            delay: 400,
            opacity: 0,
            scale: 1,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false
        });

        this.sr.reveal('[data-sr-slide-right]', {
            origin: 'right',
            distance: '120px',
            duration: 1400,
            delay: 600,
            opacity: 0,
            scale: 1,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false
        });

        // 卡片翻转效果
        this.sr.reveal('[data-sr-card-flip]', {
            origin: 'bottom',
            distance: '20px',
            duration: 1000,
            delay: 300,
            opacity: 0,
            scale: 0.95,
            rotate: { x: 15 },
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            interval: 200,
            reset: false
        });

        // 引用文字的特殊效果
        this.sr.reveal('[data-sr-quote]', {
            origin: 'center',
            distance: '0px',
            duration: 2000,
            delay: 1000,
            opacity: 0,
            scale: 0.8,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        // 列表项的渐入效果
        this.sr.reveal('[data-sr-list-item]', {
            origin: 'left',
            distance: '50px',
            duration: 800,
            opacity: 0,
            scale: 1,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            interval: 150,
            reset: false
        });
    }

    /**
     * 根据不同页面设置专门的动画效果
     */
    setupPageAnimations() {
        // 首页动画
        this.setupHomeAnimations();

        // GDG DevFest 页面动画
        this.setupGDGAnimations();

        // DevTools MCP 页面动画
        this.setupDevToolsMCPAnimations();

        // 关于我页面动画
        this.setupAboutAnimations();

        // 通用动画
        this.setupCommonAnimations();
    }

    /**
     * GDG DevFest 页面的叙事性动画
     */
    setupGDGAnimations() {
        if (!window.location.pathname.includes('gdg-devfest')) return;

        // 英雄区域的渐入效果
        this.sr.reveal('.hero-title', {
            origin: 'top',
            distance: '80px',
            duration: 1600,
            delay: 400,
            opacity: 0,
            scale: 1.1,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        this.sr.reveal('.hero-subtitle', {
            origin: 'bottom',
            distance: '60px',
            duration: 1400,
            delay: 800,
            opacity: 0,
            scale: 1,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        this.sr.reveal('.hero-description', {
            origin: 'bottom',
            distance: '40px',
            duration: 1500,
            delay: 1200,
            opacity: 0,
            scale: 1,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        // 统计数据的交替动画
        this.sr.reveal('.stat-card:nth-child(1)', {
            origin: 'top',
            distance: '60px',
            duration: 1000,
            delay: 1600,
            opacity: 0,
            scale: 0.8,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            reset: false,
            afterReveal: (el) => this.animateCounter(el, '800K+')
        });

        this.sr.reveal('.stat-card:nth-child(2)', {
            origin: 'top',
            distance: '60px',
            duration: 1000,
            delay: 1800,
            opacity: 0,
            scale: 0.8,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            reset: false,
            afterReveal: (el) => this.animateCounter(el, '550+')
        });

        this.sr.reveal('.stat-card:nth-child(3)', {
            origin: 'top',
            distance: '60px',
            duration: 1000,
            delay: 2000,
            opacity: 0,
            scale: 0.8,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            reset: false,
            afterReveal: (el) => this.animateCounter(el, '100+')
        });

        this.sr.reveal('.stat-card:nth-child(4)', {
            origin: 'top',
            distance: '60px',
            duration: 1000,
            delay: 2200,
            opacity: 0,
            scale: 0.8,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            reset: false,
            afterReveal: (el) => this.animateCounter(el, '1000s')
        });

        // Why Attend 部分的动画
        this.sr.reveal('.why-attend-icon', {
            origin: 'scale',
            distance: '0px',
            duration: 800,
            delay: 400,
            opacity: 0,
            scale: 0.5,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            interval: 200,
            reset: false
        });

        this.sr.reveal('.why-attend-title', {
            origin: 'bottom',
            distance: '30px',
            duration: 1000,
            delay: 600,
            opacity: 0,
            scale: 1,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            interval: 150,
            reset: false
        });

        this.sr.reveal('.why-attend-description', {
            origin: 'bottom',
            distance: '20px',
            duration: 1200,
            delay: 800,
            opacity: 0,
            scale: 1,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            interval: 200,
            reset: false
        });

        // GDG 介绍部分的叙事动画
        this.sr.reveal('.gdg-intro-icon', {
            origin: 'top',
            distance: '60px',
            duration: 1200,
            delay: 400,
            opacity: 0,
            scale: 0.8,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        this.sr.reveal('.gdg-intro-text p:first-child', {
            origin: 'left',
            distance: '80px',
            duration: 1400,
            delay: 800,
            opacity: 0,
            scale: 0.9,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        this.sr.reveal('.gdg-intro-text p:last-child', {
            origin: 'right',
            distance: '80px',
            duration: 1400,
            delay: 1200,
            opacity: 0,
            scale: 0.9,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        // 影响力部分的动画
        this.sr.reveal('.impact-card:nth-child(1)', {
            origin: 'left',
            distance: '100px',
            duration: 1600,
            delay: 600,
            opacity: 0,
            scale: 0.85,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        this.sr.reveal('.impact-card:nth-child(2)', {
            origin: 'right',
            distance: '100px',
            duration: 1600,
            delay: 900,
            opacity: 0,
            scale: 0.85,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        // 引用文字的特殊动画
        this.sr.reveal('.impact-quote', {
            origin: 'center',
            distance: '0px',
            duration: 2200,
            delay: 1200,
            opacity: 0,
            scale: 0.7,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });
    }

    /**
     * 首页的叙事性动画
     */
    setupHomeAnimations() {
        // 只在首页应用
        if (window.location.pathname !== '/' &&
            !window.location.pathname.includes('index.html')) return;

        const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;

        // 英雄区域的渐进式动画
        this.sr.reveal('.home-hero-title', {
            origin: 'top',
            distance: '80px',
            duration: 1800,
            delay: 400,
            opacity: 0,
            scale: 0.9,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        this.sr.reveal('.home-hero-subtitle', {
            origin: 'bottom',
            distance: '60px',
            duration: 1600,
            delay: 800,
            opacity: 0,
            scale: 1,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        this.sr.reveal('.home-hero-description', {
            origin: 'bottom',
            distance: '40px',
            duration: 1700,
            delay: 1200,
            opacity: 0,
            scale: 1,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        // CTA 按钮的动画
        this.sr.reveal('.home-cta-button:nth-child(1)', {
            origin: 'bottom',
            distance: '50px',
            duration: 1400,
            delay: 1600,
            opacity: 0,
            scale: 0.8,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            reset: false
        });

        this.sr.reveal('.home-cta-button:nth-child(2)', {
            origin: 'bottom',
            distance: '50px',
            duration: 1400,
            delay: 1800,
            opacity: 0,
            scale: 0.8,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            reset: false
        });

        this.sr.reveal('.home-cta-button:nth-child(3)', {
            origin: 'bottom',
            distance: '50px',
            duration: 1400,
            delay: 2000,
            opacity: 0,
            scale: 0.8,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            reset: false
        });

        // 核心功能标题
        this.sr.reveal('.features-title', {
            origin: 'top',
            distance: '60px',
            duration: 1200,
            delay: 400,
            opacity: 0,
            scale: 0.95,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        // 主要功能卡片的动画
        this.sr.reveal('.feature-card-main:nth-child(1)', {
            origin: isMobileViewport ? 'bottom' : 'left',
            distance: isMobileViewport ? '60px' : '100px',
            duration: 1600,
            delay: 600,
            opacity: 0,
            scale: 0.85,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        this.sr.reveal('.feature-card-main:nth-child(2)', {
            origin: 'bottom',
            distance: '80px',
            duration: 1600,
            delay: 900,
            opacity: 0,
            scale: 0.85,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        this.sr.reveal('.feature-card-main:nth-child(3)', {
            origin: isMobileViewport ? 'bottom' : 'right',
            distance: isMobileViewport ? '60px' : '100px',
            duration: 1600,
            delay: 1200,
            opacity: 0,
            scale: 0.85,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        // 辅助功能卡片的动画
        this.sr.reveal('.feature-card-secondary', {
            origin: 'bottom',
            distance: '60px',
            duration: 1400,
            opacity: 0,
            scale: 0.9,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            interval: 200,
            delay: 400,
            reset: false
        });

        // AI 助手标题
        this.sr.reveal('.ai-tools-title', {
            origin: 'top',
            distance: '60px',
            duration: 1200,
            delay: 400,
            opacity: 0,
            scale: 0.95,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        // AI 助手卡片
        this.sr.reveal('.ai-tool-card:nth-child(1)', {
            origin: isMobileViewport ? 'bottom' : 'left',
            distance: isMobileViewport ? '50px' : '80px',
            duration: 1400,
            delay: 600,
            opacity: 0,
            scale: 0.85,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        this.sr.reveal('.ai-tool-card:nth-child(2)', {
            origin: 'top',
            distance: '60px',
            duration: 1400,
            delay: 900,
            opacity: 0,
            scale: 0.85,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        this.sr.reveal('.ai-tool-card:nth-child(3)', {
            origin: isMobileViewport ? 'bottom' : 'right',
            distance: isMobileViewport ? '50px' : '80px',
            duration: 1400,
            delay: 1200,
            opacity: 0,
            scale: 0.85,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        this.sr.reveal('.ai-tool-card:nth-child(4)', {
            origin: 'bottom',
            distance: '60px',
            duration: 1400,
            delay: 1500,
            opacity: 0,
            scale: 0.85,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        // 应用场景部分
        this.sr.reveal('.use-cases-title', {
            origin: 'top',
            distance: '60px',
            duration: 1200,
            delay: 400,
            opacity: 0,
            scale: 0.95,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        // 应用场景卡片
        this.sr.reveal('.use-case-item:nth-child(odd)', {
            origin: isMobileViewport ? 'bottom' : 'left',
            distance: isMobileViewport ? '60px' : '80px',
            duration: 1400,
            opacity: 0,
            scale: 0.9,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            interval: 300,
            delay: 600,
            reset: false
        });

        this.sr.reveal('.use-case-item:nth-child(even)', {
            origin: isMobileViewport ? 'bottom' : 'right',
            distance: isMobileViewport ? '60px' : '80px',
            duration: 1400,
            opacity: 0,
            scale: 0.9,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            interval: 300,
            delay: 800,
            reset: false
        });
    }

    /**
     * DevTools MCP 页面的叙事性动画
     */
    setupDevToolsMCPAnimations() {
        if (!window.location.pathname.includes('devtools-mcp')) return;

        // 英雄区域的标题动画
        this.sr.reveal('[data-barba-namespace="devtools"] .max-w-4xl', {
            origin: 'top',
            distance: '80px',
            duration: 1600,
            delay: 400,
            opacity: 0,
            scale: 0.9,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        // 统计数据的动画
        this.sr.reveal('[data-barba-namespace="devtools"] [data-sr-stats] > div', {
            origin: 'top',
            distance: '60px',
            duration: 1000,
            opacity: 0,
            scale: 0.8,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            interval: 200,
            delay: 800,
            reset: false
        });

        // 核心特性标题动画
        this.sr.reveal('[data-barba-namespace="devtools"] .text-center.mb-16', {
            origin: 'top',
            distance: '60px',
            duration: 1200,
            delay: 400,
            opacity: 0,
            scale: 0.95,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        // 技术卡片的翻转动画
        this.sr.reveal('[data-barba-namespace="devtools"] [data-sr-card-flip]', {
            origin: 'bottom',
            distance: '30px',
            duration: 1000,
            opacity: 0,
            scale: 0.95,
            rotate: { x: 10 },
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            interval: 200,
            delay: 600,
            reset: false
        });

        // 技术架构的叙事性动画
        this.sr.reveal('[data-barba-namespace="devtools"] [data-sr-narrative]', {
            origin: 'bottom',
            distance: '50px',
            duration: 1500,
            delay: 800,
            opacity: 0,
            scale: 1,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        // 技术栈详情的左右交替动画
        this.sr.reveal('[data-barba-namespace="devtools"] [data-sr-fade-left]', {
            origin: 'left',
            distance: '80px',
            duration: 1400,
            delay: 1000,
            opacity: 0,
            scale: 0.9,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        this.sr.reveal('[data-barba-namespace="devtools"] [data-sr-fade-right]', {
            origin: 'right',
            distance: '80px',
            duration: 1400,
            delay: 1200,
            opacity: 0,
            scale: 0.9,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        // 代码示例的缩放动画
        this.sr.reveal('[data-barba-namespace="devtools"] [data-sr-zoom-in]', {
            distance: 0,
            scale: 0.8,
            duration: 1200,
            delay: 1400,
            opacity: 0,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });
    }

    /**
     * 关于我页面的叙事性动画
     */
    setupAboutAnimations() {
        if (!window.location.pathname.includes('about')) return;

        // 个人介绍的渐入效果
        this.sr.reveal('.profile-section', {
            origin: 'left',
            distance: '100px',
            duration: 1500,
            delay: 400,
            opacity: 0,
            scale: 0.9,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        this.sr.reveal('.intro-section', {
            origin: 'right',
            distance: '100px',
            duration: 1500,
            delay: 600,
            opacity: 0,
            scale: 0.9,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        // 技能和兴趣的展示动画
        this.sr.reveal('.skill-item', {
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            opacity: 0,
            scale: 0.8,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            interval: 200,
            reset: false
        });

        // 时间线动画
        this.sr.reveal('.timeline-item:nth-child(odd)', {
            origin: 'left',
            distance: '80px',
            duration: 1200,
            opacity: 0,
            scale: 0.85,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            interval: 400,
            reset: false
        });

        this.sr.reveal('.timeline-item:nth-child(even)', {
            origin: 'right',
            distance: '80px',
            duration: 1200,
            opacity: 0,
            scale: 0.85,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            interval: 400,
            reset: false
        });
    }

    /**
     * 通用动画效果
     */
    setupCommonAnimations() {
        // 标题动画
        this.sr.reveal('h2.section-title', {
            origin: 'top',
            distance: '60px',
            duration: 1200,
            delay: 300,
            opacity: 0,
            scale: 0.95,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        });

        // 卡片容器动画
        this.sr.reveal('.card-container', {
            origin: 'bottom',
            distance: '40px',
            duration: 1000,
            delay: 400,
            opacity: 0,
            scale: 1,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            interval: 300,
            reset: false
        });
    }

    /**
     * 数字动画效果
     */
    animateCounter(el, targetText) {
        const counterEl = el.querySelector('.text-3xl');
        if (!counterEl) return;

        const text = counterEl.textContent;
        counterEl.style.display = 'inline-block';

        // 简单的数字滚动动画
        let current = 0;
        const increment = targetText.match(/\d+/) ? parseInt(targetText.match(/\d+/)[0]) / 30 : 1;
        const suffix = targetText.replace(/[0-9+]/g, '');

        const updateCounter = () => {
            current += increment;
            if (current < parseInt(targetText.match(/\d+/)[0])) {
                counterEl.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counterEl.textContent = targetText;
            }
        };

        updateCounter();
    }

    /**
     * 手动触发动画的方法
     */
    reveal(selector, options = {}) {
        if (this.sr) {
            const defaultOptions = {
                duration: 1000,
                distance: '50px',
                opacity: 0,
                scale: 1,
                easing: 'cubic-bezier(0.5, 0, 0, 1)',
                reset: false
            };

            this.sr.reveal(selector, { ...defaultOptions, ...options });
        }
    }

    /**
     * 重新同步动画
     */
    sync() {
        if (this.sr) {
            this.sr.sync();
        }
    }
}

// 初始化 ScrollReveal 管理器
document.addEventListener('DOMContentLoaded', () => {
    window.scrollRevealManager = new ScrollRevealManager();
});

// 导出给其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollRevealManager;
}
