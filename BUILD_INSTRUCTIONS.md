# 构建说明

## 生成生产版本

### 方法 1: 使用 npm 脚本（推荐）

1. 安装依赖：
```bash
npm install
```

2. 构建生产版本：
```bash
npm run build
```

3. 这会生成 `assets/css/styles.css`，包含所有优化的 CSS。

### 方法 2: 手动构建（临时方案）

如果不想安装 npm，可以临时使用 CDN 版本，但这不推荐用于生产环境：

```html
<!-- 临时方案 - 不推荐用于生产 -->
<script src="https://cdn.tailwindcss.com"></script>
```

## 验证构建

检查 `assets/css/styles.css` 文件是否存在：
```bash
ls -la assets/css/
```

应该包含：
- `input.css` - Tailwind 输入文件
- `styles.css` - 构建输出文件
- `variables.css` - 自定义变量

## CDN 依赖

以下是使用的外部 CDN 库，都有优雅降级：

### 必需库
- **Tailwind CSS**: 现在使用本地构建版本
- **AOS**: 动画库，可优雅降级
- **Typed.js**: 打字效果，可优雅降级
- **Lucide Icons**: 图标库

### 可选库
- **Parallax.js**: 视差效果，有 CSS 降级

## GitHub Pages 部署

1. 所有文件已经推送到 GitHub
2. 在仓库设置中启用 GitHub Pages
3. 选择 `main` 分支作为源
4. 选择 `/` 根目录作为发布目录

## 测试生产版本

1. 运行 `npm run build` 生成优化的 CSS
2. 使用本地服务器测试：
   ```bash
   python -m http.server 8000
   ```
3. 检查浏览器控制台，应该没有 CDN 警告
4. 测试所有功能和响应式设计

## 生产检查清单

- [ ] 没有 CDN Tailwind CSS 警告
- [ ] CSS 文件已压缩优化
- [ ] 所有页面正常显示
- [] 主题切换功能正常
- [] 语言切换功能正常
- [] 视差效果正常工作
- [ ] 移动设备响应式正常
- [ ] 性能测试通过