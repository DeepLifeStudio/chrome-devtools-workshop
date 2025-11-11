# 开发指南

## 开发环境设置

### 1. 安装依赖
```bash
npm install
```

### 2. 开发模式（监听 CSS 变化）
```bash
npm run dev
```

### 3. 构建生产版本（压缩 CSS）
```bash
npm run build
```

### 4. 本地服务器
```bash
npm run serve
```
或者
```bash
python -m http.server 8000
```

## 生产部署

### 自动构建（GitHub Pages）
GitHub Pages 会自动使用构建好的文件，无需额外配置。

### 手动构建
1. 运行 `npm run build` 生成优化的 CSS
2. 确保所有 HTML 文件指向 `./assets/css/styles.css`

## 库依赖

### 生产依赖
- 无需外部 CDN 依赖

### 开发依赖
- Tailwind CSS 3.4.0+
- Autoprefixer 10.4.16+
- PostCSS 8.4.32+

### CDN 依赖（带降级）
- Parallax.js 3.1.0（优雅降级到 CSS 动画）
- AOS 2.3.4
- Typed.js 2.0.12
- Lucide Icons

## 文件结构
```
assets/
├── css/
│   ├── input.css        # Tailwind 输入文件
│   ├── styles.css       # 构建输出文件
│   └── variables.css    # 自定义 CSS 变量
├── js/
│   ├── main.js          # 主应用逻辑
│   ├── theme.js         # 主题管理
│   ├── i18n.js          # 国际化
│   └── parallax.js      # 视差效果（带降级）
```

## 性能优化

### 1. CSS 优化
- 使用生产构建压缩 CSS
- 移除未使用的 CSS 类
- 优化关键渲染路径

### 2. JavaScript 优化
- 异步模块加载
- 视差效果优雅降级
- 移动设备性能考虑

### 3. 资源优化
- 字体子集化
- 图片懒加载
- 资源压缩