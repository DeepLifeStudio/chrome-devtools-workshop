/**
 * Internationalization Module
 * Handles language switching and translation management
 */

class I18nManager {
  constructor(options = {}) {
    this.defaultLanguage = options.defaultLanguage || 'cn';
    this.storageKey = options.storageKey || 'chrome-devtools-language';
    this.translations = {};

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
            "tagline": "AI赋能的浏览器调试与自动化工具",
            "description": "Chrome DevTools MCP Server 是一个基于 MCP 协议的服务程序，为 AI 编程助手提供完整的浏览器控制能力。通过它，你的 AI 助手可以进行可靠的自动化、深度调试和性能分析。",
            "cta": "立即探索",
            "learnMore": "了解更多",
            "viewSource": "查看源码",
            "documentation": "详细文档",
            "coreFeatures": "核心功能"
          },
          "features": {
            "title": "核心功能特性",
            "subtitle": "为 AI 编程助手提供完整的浏览器控制、调试和自动化能力",
            "main": {
              "automation": {
                "title": "浏览器自动化控制",
                "description": "提供点击、拖拽、填充表单、键盘操作等完整的用户交互能力，使用 Puppeteer 实现可靠的自动化操作"
              },
              "debugging": {
                "title": "高级调试能力",
                "description": "分析网络请求、获取控制台信息、执行 JavaScript、截取屏幕快照，为 AI 提供完整的调试工具箱"
              },
              "performance": {
                "title": "性能分析洞察",
                "description": "记录性能追踪，提取可操作的性能洞察，帮助 AI 识别性能瓶颈并提供优化建议"
              }
            },
            "secondary": {
              "navigation": {
                "title": "导航控制",
                "description": "多页面管理、导航、等待功能"
              },
              "network": {
                "title": "网络分析",
                "description": "监控网络请求，分析响应数据"
              },
              "device": {
                "title": "设备模拟",
                "description": "模拟不同设备和屏幕尺寸"
              },
              "script": {
                "title": "脚本执行",
                "description": "在页面上下文中执行 JavaScript"
              }
            }
          },
          "aiTools": {
            "title": "支持的 AI 助手",
            "subtitle": "Chrome DevTools MCP Server 兼容所有支持 MCP 协议的 AI 编程助手",
            "gemini": "Google AI 助手",
            "claude": "Anthropic AI 助手",
            "cursor": "AI 代码编辑器",
            "copilot": "GitHub AI 助手"
          },
          "useCases": {
            "title": "典型应用场景",
            "debugging": {
              "title": "AI 生成代码调试",
              "description": "AI 可以直接在浏览器中测试和调试它生成的代码"
            },
            "testing": {
              "title": "自动化测试",
              "description": "AI 可以自动执行用户交互测试并分析结果"
            },
            "optimization": {
              "title": "性能优化",
              "description": "AI 分析性能指标并提供具体的优化建议"
            },
            "security": {
              "title": "安全检测",
              "description": "AI 可以自动检测网页中的安全漏洞和问题"
            }
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
          "hero": {
              "title": "Google Developer Groups & DevFest",
              "subtitle": "通过社区主导的活动连接全球开发者",
              "description": "DevFest 是由 Google Developer Groups 组织的年度全球性、社区主导的技术会议。这是对开发者社区、创新和学习的庆典。",
              "stats": {
                  "globalDevelopers": "全球开发者",
                  "devfestEvents": "DevFest 活动",
                  "countries": "国家",
                  "sessions": "会议"
              }
          },
          "whyAttend": {
              "title": "为什么要参加 DevFest？",
              "learn": {
                  "title": "学习",
                  "description": "最新的 Google 技术和开源工具"
              },
              "network": {
                  "title": "交流",
                  "description": "与开发者和行业专家建立联系"
              },
              "handsOn": {
                  "title": "实践",
                  "description": "通过工作坊和编码实验室获得经验"
              },
              "discover": {
                  "title": "发现",
                  "description": "创新解决方案和最佳实践"
              },
              "connect": {
                  "title": "连接",
                  "description": "建立持久的开发者社区关系"
              }
          },
          "whatAreGDGs": {
              "title": "什么是 Google Developer Groups？",
              "description": "Google Developer Groups (GDGs) 是由开发者组成的本地社区，他们围绕 Google 技术聚集在一起学习、分享和连接。这些团体组织定期聚会、工作坊和活动，帮助开发者构建解决方案并提升技能。",
              "description2": "GDGs 不隶属于 Google，但是由开发者主导的团体，热衷于技术并帮助他人在开发之旅中取得成功。它们为开发者提供了一个网络、协作和相互学习的平台。",
              "globalImpact": {
                  "title": "DevFest 的全球影响",
                  "communityCelebration": {
                      "title": "社区庆典",
                      "description": "DevFest 将来自不同背景、技能水平和行业的开发者聚集在一起。这是对多样性、创新和社区力量的庆典。"
                  },
                  "buildingFutureLeaders": {
                      "title": "培养未来领导者",
                      "description": "许多 DevFest 参与者后来成为演讲者、组织者、开源贡献者和他们社区的技术领导者。这是为了培养下一代开发者和创新者。"
                  },
                  "quote": "其影响超越了活动本身——这是为了创建一个由充满热情的开发者组成的全球网络，他们相互支持成长，并为应对未来挑战的创新解决方案做出贡献。"
              }
          },
          "footer": {
              "description": "全球开发者社区，连接技术、创新与未来"
          },
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
          "stats": {
              "protocolStandard": "协议标准",
              "aiIntegration": "智能集成",
              "openAPI": "开放接口"
          },
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
            "architecture": "系统架构图",
            "techStack": "技术栈",
            "security": "安全特性",
            "codeExample": {
                "title": "示例代码",
                "language": "JavaScript - MCP Server 初始化",
                "registerTool": "// 注册自定义工具",
                "implementLogic": "// 实现元素检查逻辑",
                "checkResult": "/* 检查结果 */"
            },
            "architectureDetails": {
                "protocol": "基于 MCP 协议的通信层",
                "server": "高性能 Node.js 服务器",
                "bridge": "Chrome DevTools 扩展桥接",
                "api": "RESTful API 设计",
                "client": "客户端",
                "serverSide": "服务端",
                "commProtocol": "通信协议",
                "mcpClient": "MCP Client Extension",
                "websocketConnection": "WebSocket Connection",
                "uiComponents": "UI Components",
                "nodejsRuntime": "Node.js Runtime",
                "mcpProtocolHandler": "MCP Protocol Handler",
                "pluginSystem": "Plugin System"
            },
            "techStackItems": {
                "frontend": "前端：Chrome Extension API, WebSocket Client",
                "backend": "后端：Node.js, Express, WebSocket Server",
                "protocolTitle": "协议：Model Context Protocol (MCP) 1.0",
                "storage": "存储：SQLite, Redis (可选)"
            },
            "securityItems": {
                "authentication": "认证：OAuth 2.0 / JWT Token",
                "encryption": "加密：WSS / TLS 1.3",
                "permissions": "权限：Chrome Extension Manifest V3",
                "isolation": "隔离：Sandbox Execution Environment"
            }
          },
          "realTimeFeatures": {
              "collaborators": "协作者",
              "latency": "延迟",
              "encryption": "加密"
          },
          "extensibleFeatures": {
              "customCommands": "自定义命令",
              "pluginSystem": "插件系统",
              "apiExtensions": "API 扩展"
          },
          "footer": {
              "description": "革新浏览器调试体验，让开发更加智能高效"
          }
        },
        "about": {
          "title": "关于我",
          "subtitle": "AI 开发者与产品创造者",
          "introduction": "我是一名专注于 AI 产品开发的开发者，热衷于创造能够解决真实用户问题的创新产品。",
          "navigation": {
            "backHome": "返回首页"
          },
          "profile": {
            "name": "liuzx",
            "role": "AI 开发者",
            "introduction": "我是一名专注于 AI 产品开发的开发者，热衷于创造能够解决真实用户问题的创新产品。专注于 Agent 产品开发研究，喜欢各种有趣的、能解决用户真实存在的问题的小产品。",
            "focus": "Agent 产品开发研究",
            "passion": "喜欢各种有趣的、能解决用户真实存在的问题的小产品"
          },
          "skills": {
            "ai": "AI",
            "focus": "专注领域",
            "product": "产品",
            "orientation": "创造导向",
            "innovation": "创新",
            "drive": "核心驱动"
          },
          "interests": {
            "title": "我的兴趣",
            "ai": "人工智能与机器学习",
            "aiDescription": "深入研究 AI 技术在各种场景中的应用，特别是大语言模型和智能代理系统的开发。",
            "product": "产品设计与用户体验",
            "productDescription": "从用户需求出发，设计简洁高效的产品界面，追求极致的用户体验。",
            "innovation": "技术创新与探索",
            "innovationDescription": "持续关注前沿技术趋势，探索新技术在实际产品中的应用可能性。",
            "community": "开源社区贡献",
            "communityDescription": "积极参与开源项目，分享技术经验，与开发者社区共同成长。"
          },
          "tags": {
            "userResearch": "用户研究",
            "edgeComputing": "边缘计算",
            "newTech": "新技术",
            "techSharing": "技术分享",
            "communityActivities": "社区活动"
          },
          "contact": {
            "title": "联系方式",
            "description": "欢迎与我交流技术、产品想法或合作机会。我始终保持开放的态度，期待与有趣的人建立联系。",
            "emailLabel": "邮箱",
            "email": "1024jianghu@gmail.com",
            "wechatLabel": "微信",
            "wechat": "DeepLifeStudio",
            "wechatHint": "点击复制微信号",
            "githubLabel": "GitHub",
            "github": "开源项目",
            "linkedinLabel": "LinkedIn",
            "linkedin": "职业档案"
          },
          "footer": {
            "description": "AI 开发者与产品创造者，专注于构建有趣且实用的产品"
          }
        },
        "footer": {
            "description": "探索浏览器调试的未来，通过 Chrome DevTools MCP Server 革新开发者体验。",
            "quickLinks": "快速链接",
            "backToHome": "返回首页",
            "aboutMe": "关于我",
            "themeSupport": "主题支持",
            "multilingual": "多语言",
            "copyright": "© 2025 Chrome DevTools MCP Server Workshop."
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
          "toggleLanguage": "切换语言",
          "toggleTheme": "切换主题",
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
            "tagline": "AI-Powered Browser Debugging and Automation Tools",
            "description": "Chrome DevTools MCP Server is a MCP protocol-based service that provides complete browser control capabilities for AI programming assistants. Through it, your AI assistant can perform reliable automation, deep debugging, and performance analysis.",
            "cta": "Explore Now",
            "learnMore": "Learn More",
            "viewSource": "View Source",
            "documentation": "Documentation",
            "coreFeatures": "Core Features"
          },
          "features": {
            "title": "Core Features",
            "subtitle": "Providing complete browser control, debugging, and automation capabilities for AI programming assistants",
            "main": {
              "automation": {
                "title": "Browser Automation Control",
                "description": "Complete user interaction capabilities including clicking, dragging, form filling, keyboard operations, using Puppeteer for reliable automation"
              },
              "debugging": {
                "title": "Advanced Debugging Capabilities",
                "description": "Analyze network requests, get console information, execute JavaScript, take screenshots, providing a complete debugging toolkit for AI"
              },
              "performance": {
                "title": "Performance Analysis Insights",
                "description": "Record performance traces, extract actionable performance insights, helping AI identify performance bottlenecks and provide optimization suggestions"
              }
            },
            "secondary": {
              "navigation": {
                "title": "Navigation Control",
                "description": "Multi-page management, navigation, waiting functions"
              },
              "network": {
                "title": "Network Analysis",
                "description": "Monitor network requests and analyze response data"
              },
              "device": {
                "title": "Device Emulation",
                "description": "Simulate different devices and screen sizes"
              },
              "script": {
                "title": "Script Execution",
                "description": "Execute JavaScript in page context"
              }
            }
          },
          "aiTools": {
            "title": "Supported AI Assistants",
            "subtitle": "Chrome DevTools MCP Server is compatible with all MCP protocol-supported AI programming assistants",
            "gemini": "Google AI Assistant",
            "claude": "Anthropic AI Assistant",
            "cursor": "AI Code Editor",
            "copilot": "GitHub AI Assistant"
          },
          "useCases": {
            "title": "Typical Application Scenarios",
            "debugging": {
              "title": "AI-Generated Code Debugging",
              "description": "AI can directly test and debug code it generates in the browser"
            },
            "testing": {
              "title": "Automated Testing",
              "description": "AI can automatically execute user interaction tests and analyze results"
            },
            "optimization": {
              "title": "Performance Optimization",
              "description": "AI analyzes performance metrics and provides specific optimization suggestions"
            },
            "security": {
              "title": "Security Detection",
              "description": "AI can automatically detect security vulnerabilities and issues in web pages"
            }
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
          "hero": {
              "title": "Google Developer Groups & DevFest",
              "subtitle": "Connecting developers through community-led events worldwide",
              "description": "DevFest is an annual, global, community-led tech conference organized by Google Developer Groups. It's a celebration of developer community, innovation, and learning.",
              "stats": {
                  "globalDevelopers": "Global Developers",
                  "devfestEvents": "DevFest Events",
                  "countries": "Countries",
                  "sessions": "Sessions"
              }
          },
          "whyAttend": {
              "title": "Why Attend DevFest?",
              "learn": {
                  "title": "Learn",
                  "description": "Latest in Google technologies and open-source tools"
              },
              "network": {
                  "title": "Network",
                  "description": "With developers and industry experts"
              },
              "handsOn": {
                  "title": "Hands-on",
                  "description": "Experience through workshops and code labs"
              },
              "discover": {
                  "title": "Discover",
                  "description": "Innovative solutions and best practices"
              },
              "connect": {
                  "title": "Connect",
                  "description": "Build lasting developer community relationships"
              }
          },
          "whatAreGDGs": {
              "title": "What are Google Developer Groups?",
              "description": "Google Developer Groups (GDGs) are local communities of developers who come together to learn, share, and connect around Google technologies. These groups organize regular meetups, workshops, and events to help developers build solutions and grow their skills.",
              "description2": "GDGs are not affiliated with Google but are developer-led groups passionate about technology and helping others succeed in their development journey. They provide a platform for developers to network, collaborate, and learn from each other.",
              "globalImpact": {
                  "title": "DevFest's Global Impact",
                  "communityCelebration": {
                      "title": "Community Celebration",
                      "description": "DevFest brings together developers from all backgrounds, skill levels, and industries. It's a celebration of diversity, innovation, and the power of community."
                  },
                  "buildingFutureLeaders": {
                      "title": "Building Future Leaders",
                      "description": "Many DevFest attendees go on to become speakers, organizers, open-source contributors, and tech leaders in their communities. It's about building the next generation of developers and innovators."
                  },
                  "quote": "The impact extends beyond the events themselves – it's about creating a global network of passionate developers who support each other's growth and contribute to building innovative solutions for tomorrow's challenges."
              }
          },
          "footer": {
              "description": "Global developer community, connecting technology, innovation, and the future"
          },
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
          "stats": {
              "protocolStandard": "Protocol Standard",
              "aiIntegration": "AI Integration",
              "openAPI": "Open API"
          },
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
            "architecture": "System Architecture Diagram",
            "techStack": "Tech Stack",
            "security": "Security Features",
            "codeExample": {
                "title": "Example Code",
                "language": "JavaScript - MCP Server Initialization",
                "registerTool": "// Register custom tool",
                "implementLogic": "// Implement element inspection logic",
                "checkResult": "/* inspection result */"
            },
            "architectureDetails": {
                "protocol": "Communication layer based on MCP protocol",
                "server": "High-performance Node.js server",
                "bridge": "Chrome DevTools extension bridge",
                "api": "RESTful API design",
                "client": "Client",
                "serverSide": "Server",
                "commProtocol": "Communication Protocol",
                "mcpClient": "MCP Client Extension",
                "websocketConnection": "WebSocket Connection",
                "uiComponents": "UI Components",
                "nodejsRuntime": "Node.js Runtime",
                "mcpProtocolHandler": "MCP Protocol Handler",
                "pluginSystem": "Plugin System"
            },
            "techStackItems": {
                "frontend": "Frontend: Chrome Extension API, WebSocket Client",
                "backend": "Backend: Node.js, Express, WebSocket Server",
                "protocolTitle": "Protocol: Model Context Protocol (MCP) 1.0",
                "storage": "Storage: SQLite, Redis (Optional)"
            },
            "securityItems": {
                "authentication": "Authentication: OAuth 2.0 / JWT Token",
                "encryption": "Encryption: WSS / TLS 1.3",
                "permissions": "Permissions: Chrome Extension Manifest V3",
                "isolation": "Isolation: Sandbox Execution Environment"
            }
          },
          "realTimeFeatures": {
              "collaborators": "Collaborators",
              "latency": "Latency",
              "encryption": "Encryption"
          },
          "extensibleFeatures": {
              "customCommands": "Custom Commands",
              "pluginSystem": "Plugin System",
              "apiExtensions": "API Extensions"
          },
          "footer": {
              "description": "Revolutionizing browser debugging experience, making development more intelligent and efficient"
          }
        },
        "about": {
          "title": "About Me",
          "subtitle": "AI Developer & Product Creator",
          "introduction": "I am a developer focused on AI product development, passionate about creating innovative products that solve real user problems.",
          "navigation": {
            "backHome": "Back to Home"
          },
          "profile": {
            "name": "liuzx",
            "role": "AI Developer",
            "introduction": "I am a developer focused on AI product development, passionate about creating innovative products that solve real user problems. Focused on Agent product development research, I love various interesting and small products that can solve real user problems.",
            "focus": "Research on Agent product development",
            "passion": "Love interesting small products that can solve real user problems"
          },
          "skills": {
            "ai": "AI",
            "focus": "Focus Area",
            "product": "Product",
            "orientation": "Creation Oriented",
            "innovation": "Innovation",
            "drive": "Core Driver"
          },
          "interests": {
            "title": "My Interests",
            "ai": "Artificial Intelligence & Machine Learning",
            "aiDescription": "Deep research into AI technology applications in various scenarios, especially large language models and intelligent agent system development.",
            "product": "Product Design & User Experience",
            "productDescription": "Start from user needs, design simple and efficient product interfaces, pursuing the ultimate user experience.",
            "innovation": "Technology Innovation & Exploration",
            "innovationDescription": "Continuously monitor frontier technology trends, exploring the application possibilities of new technologies in actual products.",
            "community": "Open Source Community Contribution",
            "communityDescription": "Actively participate in open source projects, share technical experience, and grow together with the developer community."
          },
          "tags": {
            "userResearch": "User Research",
            "edgeComputing": "Edge Computing",
            "newTech": "New Technologies",
            "techSharing": "Technical Sharing",
            "communityActivities": "Community Activities"
          },
          "contact": {
            "title": "Contact Information",
            "description": "Feel free to reach out to discuss technology, product ideas, or collaboration opportunities. I always maintain an open attitude and look forward to connecting with interesting people.",
            "emailLabel": "Email",
            "email": "1024jianghu@gmail.com",
            "wechatLabel": "WeChat",
            "wechat": "DeepLifeStudio",
            "wechatHint": "Click to copy WeChat ID",
            "githubLabel": "GitHub",
            "github": "Open Source Projects",
            "linkedinLabel": "LinkedIn",
            "linkedin": "Professional Profile"
          },
          "footer": {
            "description": "AI Developer & Product Creator, focused on building fun and practical products"
          }
        },
        "footer": {
            "description": "Explore the future of browser debugging and revolutionize the developer experience through Chrome DevTools MCP Server.",
            "quickLinks": "Quick Links",
            "backToHome": "Back to Home",
            "aboutMe": "About Me",
            "themeSupport": "Theme Support",
            "multilingual": "Multilingual",
            "copyright": "© 2025 Chrome DevTools MCP Server Workshop."
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
          "toggleLanguage": "Toggle Language",
          "toggleTheme": "Toggle Theme",
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
    // Set current language from saved preference or default
    const savedLanguage = this.getSavedLanguage();
    this.currentLanguage = savedLanguage || this.defaultLanguage;

    console.log('I18n: Initializing with language:', this.currentLanguage, '(saved:', savedLanguage, ')');

    // Load default language translations first
    await this.loadTranslations(this.defaultLanguage);

    // If current language is different from default, load it
    if (this.currentLanguage !== this.defaultLanguage) {
      await this.loadTranslations(this.currentLanguage);
    }

    // Apply initial translations and set document language
    this.applyTranslations();
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
      console.log('I18n: Saved language to localStorage:', language);
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
      switcher.addEventListener('click', (e) => {
        e.preventDefault();
        // Simply toggle between 'cn' and 'en'
        const newLanguage = this.currentLanguage === 'cn' ? 'en' : 'cn';
        this.switchLanguage(newLanguage);
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
    const nextLanguage = this.currentLanguage === 'cn' ? 'en' : 'cn';

    // Update ARIA label with descriptive text
    const labelText = this.currentLanguage === 'cn' ?
      'Switch to English' :
      '切换到中文';
    switcher.setAttribute('aria-label', labelText);
    switcher.setAttribute('title', labelText);

    // Update button visual state
    switcher.setAttribute('data-current-language', this.currentLanguage);
    switcher.setAttribute('data-next-language', nextLanguage);

    // Always toggle the active state class based on current language
    // Remove active state for Chinese, add for English
    if (this.currentLanguage === 'en') {
      switcher.classList.add('language-active');
    } else {
      switcher.classList.remove('language-active');
    }

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
