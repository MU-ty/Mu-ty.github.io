# VuePress 博客项目

这是一个使用 VuePress 构建的轻量级博客系统，已配置好 GitHub Pages 自动部署流程。

## 联系方式

- 邮箱：binbim_promax@163.com
- QQ：1721822150
- 交流群：1036011225 [跳转](https://qm.qq.com/q/x8P9eycxUI)

## 项目特点

- 简洁的界面设计
- Markdown 支持
- 自动生成目录
- 响应式设计
- GitHub Pages 自动部署

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 部署说明

本项目已配置 GitHub Actions 自动部署到 GitHub Pages。详细的部署步骤请参考 [部署指南](./DEPLOY.md)。

## 目录结构

```
├── docs/                # 文档目录
│   ├── .vuepress/      # VuePress 配置
│   ├── README.md       # 首页
│   ├── admin/          # 管理页面
│   └── posts/          # 博客文章
├── .github/workflows/  # GitHub Actions 配置
└── package.json        # 项目依赖
```

## 许可证

MIT