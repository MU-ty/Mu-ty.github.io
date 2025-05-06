# 博客文章管理API服务

这是一个简单的Node.js API服务，用于管理博客文章。它提供了文章的增删改查功能，可以与前端的文章管理组件集成，实现文章的在线存储和管理。

## 功能特点

- 提供RESTful API接口，支持文章的增删改查
- 数据持久化存储在服务器文件系统中
- 支持在GitHub Codespaces中部署和运行
- 与前端文章管理组件无缝集成

## 在GitHub Codespaces中部署

1. 在GitHub上创建一个仓库，并将博客代码推送到该仓库
2. 在GitHub仓库页面，点击「Code」按钮，然后选择「Open with Codespaces」
3. 创建一个新的Codespace，系统会自动配置环境并安装依赖
4. Codespace启动后，后端服务会自动运行在端口3000上

## API接口说明

### 获取所有文章

```
GET /api/articles
```

### 保存所有文章

```
POST /api/articles
Content-Type: application/json

[文章数组]
```

### 添加单篇文章

```
POST /api/article
Content-Type: application/json

{
  "title": "文章标题",
  "filename": "article-filename",
  "description": "文章描述",
  "content": "文章内容（Markdown格式）",
  "date": "2023-01-01"
}
```

### 更新单篇文章

```
PUT /api/article/:filename
Content-Type: application/json

{
  "title": "更新后的标题",
  "filename": "article-filename",
  "description": "更新后的描述",
  "content": "更新后的内容",
  "date": "2023-01-01"
}
```

### 删除单篇文章

```
DELETE /api/article/:filename
```

## 本地开发

1. 安装依赖：

```bash
cd server
npm install
```

2. 启动开发服务器：

```bash
npm run dev
```

服务器将在 http://localhost:3000 上运行。

## 与前端集成

前端组件已经配置为连接到 `http://localhost:3000/api` 接口。如果需要修改API地址，请在以下文件中更新 `apiBaseUrl` 变量：

- `docs/.vuepress/components/ArticleManager.vue`
- `docs/.vuepress/components/ArticleExporter.vue`

## 注意事项

- 文章数据存储在 `server/data/articles.json` 文件中
- 在Codespaces环境中，数据会随Codespace一起保存
- 建议定期备份重要的文章数据
- 如果需要在生产环境部署，建议使用更可靠的数据库存储方案