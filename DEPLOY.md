# 部署指南

## 一次性配置

### 1. 在 GitHub 创建仓库

1. 访问 https://github.com/new
2. 填写：
   - **Repository name**: `portfolio-site`（必须和 `vite.config.ts` 里的 `REPO_NAME` 一致）
   - **Description**: 个人作品集
   - **Public** ✅
   - **不要**勾选 "Add a README" / ".gitignore" / "license"（本地已有）
3. 点击 **Create repository**

### 2. 推送代码到 GitHub

在项目根目录执行（把 `YOUR_USERNAME` 替换成你的 GitHub 用户名）：

```powershell
cd "e:\vs code daima\portfolio-site"
git remote add origin https://github.com/YOUR_USERNAME/portfolio-site.git
git branch -M main
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 进入 GitHub 仓库页面
2. **Settings** → **Pages**
3. **Source** 选择：**GitHub Actions**
4. 等待 1-2 分钟，第一次部署会自动触发

### 4. 访问网站

部署成功后访问：

```
https://YOUR_USERNAME.github.io/portfolio-site/
```

---

## 后续更新

每次修改代码后：

```powershell
cd "e:\vs code daima\portfolio-site"
git add .
git commit -m "描述你的修改"
git push
```

GitHub Actions 会自动构建并部署，1-2 分钟后生效。

---

## 常见问题

### Q: 部署后页面 404？
A: 检查 `vite.config.ts` 里的 `REPO_NAME` 是否和 GitHub 仓库名一致。

### Q: 部署后样式丢失？
A: 检查浏览器控制台，确认资源路径是否带 `/portfolio-site/` 前缀。

### Q: 想用自定义域名？
A: 在 `vite.config.ts` 里把 `REPO_NAME` 改成你的域名，然后在 GitHub 仓库 Settings → Pages → Custom domain 填写。

### Q: 想换 Vercel/Netlify？
A: 这两个平台不需要 `base` 配置，构建时设置环境变量 `VITE_BASE=/` 即可。
