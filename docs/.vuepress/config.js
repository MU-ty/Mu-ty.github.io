module.exports = {
  title: 'Binbim Blog',
  description: '一个简洁优雅的个人博客系统',
  base: '/Binbim-Blog/',
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Posts', link: '/posts/' },
      { text: '管理', link: '/admin/' }
    ],
    sidebar: 'auto',
    // 自定义404页面
    notFound: ['页面未找到'],
    backToHome: '返回首页'
  },
  plugins: [
    ['@vuepress/rss', {
      base_url: '/',
      site_url: 'https://yourusername.github.io/Binbim-Blog',
      filter: frontmatter => frontmatter.date,
      count: 20
    }]
  ],
  // 配置别名，确保路由正确
  alias: {
    '/posts/first-post.html': '/posts/first-post.md'
  }
}