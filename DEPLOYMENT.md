# 个人品牌站部署指南 (GitHub Pages Deployment Guide)

本项目（**Personal Website · 赋范空间**）采用 React 19 + Vite + TypeScript + Tailwind CSS v4 构建，已配置并成功部署至 **GitHub Pages**。本文档记录完整的部署流程、技术细节及后续更新维护步骤。

---

## 🌐 线上访问地址

- **网站主页**：[https://jular6684.github.io/my-website/](https://jular6684.github.io/my-website/)
- **GitHub 仓库**：[https://github.com/jular6684/my-website](https://github.com/jular6684/my-website)
- **爬虫协议**：[https://jular6684.github.io/my-website/robots.txt](https://jular6684.github.io/my-website/robots.txt)

---

## 1. 核心关键配置

### 1.1 Vite 基础路径 (`base`)
由于 GitHub Pages 默认将项目托管在二级子路径下（`/<repo-name>/`），在构建静态资源时必须显式指定相对基准路径，否则会导致打包后的 JS、CSS 和图片静态文件出现 404 白屏。

- **配置文件**：`my-website/vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/my-website/', // 必须以斜杠开头和结尾
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

### 1.2 部署脚本与依赖
使用 `gh-pages` 工具包快速将构建完成的 `dist` 目录推送到远端的 `gh-pages` 分支。

- **依赖安装**：
```bash
npm install -D gh-pages
```

- **配置文件**：`my-website/package.json`
```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### 1.3 SEO 与社交卡片路径
在 `my-website/index.html` 中，规范化链接（`canonical`）、Open Graph 以及 Twitter Card 的 URL 地址已全量对齐公网域名：
```html
<link rel="canonical" href="https://jular6684.github.io/my-website/" />
<meta property="og:url" content="https://jular6684.github.io/my-website/" />
<meta name="twitter:url" content="https://jular6684.github.io/my-website/" />
```

---

## 2. 部署方案详解

项目目前支持**两种互不冲突**的高可用部署方式，您可以按需选用：

### 方案 A：使用 `npm run deploy` 命令行一键发布（最简单直接）

适用于在本地修改代码后，快速构建并手动同步至生产环境：

1. **执行部署命令**：
   ```bash
   cd my-website
   npm run deploy
   ```
2. **底层执行逻辑**：
   - 自动触发 `predeploy`（即 `tsc -b && vite build`）完成生产打包。
   - `gh-pages` 将新生成的 `dist` 目录自动推送到远端仓库的 `gh-pages` 分支。
3. **GitHub Pages 配置**（首次部署需确认一次）：
   - 打开仓库：`https://github.com/jular6684/my-website/settings/pages`
   - **Build and deployment -> Source** 选择：**`Deploy from a branch`**
   - **Branch** 选择：**`gh-pages`** / `/(root)`
   - 点击 **Save**，稍等 1-2 分钟即可上线。

---

### 方案 B：使用 GitHub Actions 自动持续集成（推荐规范）

仓库已内置配置好官方推荐的 CI/CD 配置文件 [`.github/workflows/deploy.yml`](file:///mnt/AI_DATA/Projects/antigravity/openspec/my-website/.github/workflows/deploy.yml)。

1. **自动触发机制**：
   - 只要有新的代码推送到 `main` 分支（`git push origin main`），GitHub 就会自动启动云端 Ubuntu 容器。
   - 自动化容器将完成：代码拉取 → Node 环境配置 → 依赖安装 → 生产构建 → 原生发布至 GitHub Pages。
2. **GitHub Pages 配置**：
   - 打开仓库：`https://github.com/jular6684/my-website/settings/pages`
   - **Build and deployment -> Source** 改为：**`GitHub Actions`**
   - 切换后，每次更新源码只需正常提交 `git push`，无需在本地执行任何额外打包命令。

---

## 3. GitHub 鉴权凭据配置说明

在终端执行代码推送或调用 Git 命令时，GitHub 要求使用 **Personal Access Token (PAT)**：

1. 打开 Token 生成页：[https://github.com/settings/tokens/new](https://github.com/settings/tokens/new)
2. **Note**：例如填写 `my-website-deploy`
3. **关键权限勾选**：
   - ✅ **`repo`**（必须勾选！包含代码推送到仓库的核心读写权限）
   - ✅ **`workflow`**（可选勾选，允许更新 `.github/workflows/` 下的 CI/CD 配置）
4. 点击 **Generate token** 并复制保存。
5. 在终端执行 `git push` 时：
   - **Username**：输入 GitHub 用户名（`jular6684`）
   - **Password**：粘贴生成的 `ghp_...` 访问令牌。

> **安全提示**：请勿将包含 Token 的完整带密码 URL 提交到开源仓库的 `.git/config` 或代码文件中。

---

## 4. 日常更新维护流程

后续需要更新网站内容时，推荐的标准工作流程如下：

```bash
# 1. 切换到网站工作目录
cd my-website

# 2. 本地开发调试
npm run dev

# 3. 提交源代码更新
git add .
git commit -m "feat: 更新项目经历与个人介绍"
git push origin main

# 4. 发布到线上 (若使用 gh-pages 模式)
npm run deploy
```

---

## 5. 常见问题排查 (FAQ)

| 现象 | 排查方向与解决方式 |
| :--- | :--- |
| **上线后页面白屏，控制台报错 404** | 检查 `vite.config.ts` 中的 `base` 是否配置为 `'/my-website/'`。若为根路径 `'/'` 会导致资源定位错误。 |
| **Git 推送时报 403 Forbidden** | 说明 Token 权限不足。重新在 GitHub Settings 中生成 Token 时，确认勾选了最顶部的 `repo` 作用域。 |
| **修改了代码并重新部署，但页面未变** | 属于浏览器缓存（特别是 Service Worker 或强缓存）。可尝试使用无痕模式访问，或在浏览器按下 `Ctrl + F5` 强制刷新。 |
