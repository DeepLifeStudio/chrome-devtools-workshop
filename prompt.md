请根据以下要求，为我设计一个关于 Google DevFest Workshop：Chrome DevTools MCP Server 的活动官网。网站技术栈限定为 HTML、CSS（Tailwind CSS）和 Vanilla JavaScript。

I. 网站核心功能与架构
技术栈： 网站必须使用 HTML5, Tailwind CSS, 和 Vanilla JavaScript。禁止使用 React, Vue, Next.js 等前端框架。

样式框架： 必须使用 Tailwind CSS，以确保快速响应式开发和统一的样式管理。

响应式设计： 网站必须完全支持响应式多设备端适配（手机、平板、桌面）。

主题切换：

必须支持 亮/暗主题切换模式。

通过 Tailwind CSS 的 dark: 变体 和 CSS 变量 实现，并使用 Vanilla JS 控制切换逻辑。

请提供一套语义化的 CSS 变量命名规范（如 --color-primary, --color-surface-base）。

国际化 (i18n)：

必须支持 中文和英文 切换（默认中文）。

i18n 方案须采用 Vanilla JS 配合外部 JSON 语言文件 (cn.json, en.json) 来替换内容。

II. 设计风格与动效要求
整体风格： 网站应具有强烈的设计感和现代科技感，突出 DevTools MCP Server 的技术主题。请在设计中大量运用简洁的排版和适度的留白。

动画库使用： 允许使用轻量级的动画库来增强体验：

typed.js： 用于首页的 Slogan 或标题的打字效果。

AOS 或 wow.js： 用于滚动时触发组件的入场动画。

字体与图标：

请使用 Google Fonts CDN 引入现代且清晰的中文字体（如 Noto Sans SC）和英文字体（如 Inter/Outfit）。

图标库使用 Font Awesome 或 Lucide。

III. 网站内容与页面结构
网站模式： 活动官网模式，记录本次 Workshop。

页面结构：

首页 (index.html)： 总体信息展示（Workshop 主题、时间、关键信息）。

子页面 1 (gdg-devfest.html)： 介绍 GDG 和 DevFest 的背景。

子页面 2 (devtools-mcp.html)： 深入介绍 DevTools MCP 的技术内容。

子页面 3 (about-me.html)： 介绍我自己。

IV. 个人信息与组件化规范
个人信息：

姓名： liuzx

身份： AI 开发者，目前研究 Agent 产品的开发。

兴趣点： 喜欢各种有趣的、能解决用户真实存在的问题的小产品。

联系方式： xx@gmail.com

开发规范：

必须遵循最佳编程指南，严格实现组件化开发（例如，将 Header/Footer/Card/Toggle 等视为独立组件，并使用 Vanilla JS 模板化或注入）。

提供清晰的 JS 模块化文件划分（例如 main.js, i18n.js, theme.js）。

V. UI/UX 设计与认知科学约束
设计思维： 严格从理解产品知识、心理学、认知科学的 UI/UX 设计师角度思考问题。

目标体验： 致力于给用户一个 高效、清晰、愉悦 的产品使用体验，让用户低成本地操作使用本产品（即低认知负荷）。

框架任务： 现阶段任务是搭建 UI & UX 框架（线框图/高保真原型框架），尤其要考虑到用户的体验痛点并进行改善（例如：导航层级清晰、信息分块合理、操作反馈明确）。

视觉符号： 不允许使用表情符号（Emoji）。图形元素和图标应考虑使用 SVG 格式，以确保在不同分辨率和主题切换下的清晰度和一致性。

清晰度原则： 核心信息必须遵循格式塔原则（如临近性、相似性）进行组织，以确保用户快速理解信息的层次和关联性。