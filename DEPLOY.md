# GitHub Pages 部署指南

本文档提供了将此 VuePress 博客部署到 GitHub Pages 的详细步骤。

## 准备工作

1. 确保你有一个 GitHub 账号
2. 创建一个名为 `username.github.io` 或 `blog` 的仓库（其中 `username` 是你的 GitHub 用户名）

## 部署步骤

### 1. 初始化 Git 仓库（如果尚未初始化）

```bash
git init
git add .
git commit -m "初始提交"
```

### 2. 连接到 GitHub 仓库

```bash
git remote add origin https://github.com/你的用户名/blog.git
```

### 3. 推送代码到 GitHub

```bash
git push -u origin main
```

> 注意：如果你的默认分支是 `master` 而不是 `main`，请相应地调整上述命令。

### 4. 配置 GitHub Pages

部署完成后，GitHub Actions 会自动创建一个名为 `gh-pages` 的分支。你需要在仓库设置中将 GitHub Pages 的源设置为此分支：

1. 进入你的 GitHub 仓库
2. 点击 "Settings" 标签
3. 在左侧菜单中点击 "Pages"
4. 在 "Source" 下拉菜单中选择 "gh-pages" 分支
5. 点击 "Save"

### 5. 访问你的博客

部署完成后，你可以通过以下 URL 访问你的博客：

```
https://你的用户名.github.io/blog/
```

## 更新博客

每次你对博客内容进行更改并推送到 GitHub 的 `main` 分支时，GitHub Actions 会自动触发构建和部署过程：

```bash
git add .
git commit -m "更新博客内容"
git push
```

## 故障排除

如果部署失败，请检查：

1. GitHub Actions 日志中的错误信息
2. 确保 VuePress 配置文件中的 `base` 设置正确（当前设置为 `/blog/`）
3. 确保仓库设置中的 GitHub Pages 源设置为 `gh-pages` 分支

## 自定义域名（可选）

如果你想使用自定义域名：

1. 在你的域名提供商处添加 DNS 记录，指向 GitHub Pages
2. 在 `.github/workflows/deploy.yml` 文件中的 `cname` 字段填写你的域名
3. 推送更改到 GitHub

完成上述步骤后，你的博客将通过自定义域名访问。