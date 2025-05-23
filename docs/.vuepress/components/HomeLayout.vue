<template>
  <div class="home-container">
    <div class="hero">
      <img class="hero-image" src="/logo.svg" alt="Binbim Blog Logo">
      <h1 class="hero-title">Binbim Blog</h1>
      <p class="hero-subtitle">一个简洁优雅的个人博客系统</p>
      <div class="hero-buttons">
        <a class="action-button primary" href="/Binbim-Blog/posts/">浏览文章</a>
        <a class="action-button secondary" href="/Binbim-Blog/admin/">管理博客</a>
      </div>
    </div>
    
    <div class="features">
      <div class="feature-item">
        <div class="feature-icon">📝</div>
        <h2>Markdown 支持</h2>
        <p>使用 Markdown 语法轻松编写文章，支持代码高亮、表格、列表等丰富功能</p>
      </div>
      
      <div class="feature-item">
        <div class="feature-icon">🚀</div>
        <h2>快速部署</h2>
        <p>配置好 GitHub Actions 自动部署到 GitHub Pages，一次提交即可更新博客</p>
      </div>
      
      <div class="feature-item">
        <div class="feature-icon">📱</div>
        <h2>响应式设计</h2>
        <p>完美适配各种设备，从手机到桌面电脑，随时随地访问博客</p>
      </div>
    </div>
    
    <div class="latest-posts">
      <h2 class="section-title">最新文章</h2>
      <Content slot-key="posts" />
    </div>
    
    <div class="footer">
      <p>© {{ new Date().getFullYear() }} Binbim Blog. 基于 <a href="https://vuepress.vuejs.org/" target="_blank">VuePress</a> 构建</p>
      <div class="social-links">
        <a href="mailto:binbim_promax@163.com" title="邮箱">📧</a>
        <a href="https://qm.qq.com/q/x8P9eycxUI" target="_blank" title="QQ交流群">💬</a>
        <a href="https://github.com/BB0813" target="_blank" title="GitHub">🐙</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeLayout'
}
</script>

<style lang="stylus" scoped>
.home-container
  padding 3rem 2rem
  max-width 960px
  margin 0 auto

.hero
  text-align center
  margin-bottom 4rem
  
  .hero-image
    max-width 150px
    height auto
    margin-bottom 1.5rem
    animation float 3s ease-in-out infinite
  
  .hero-title
    font-size 3rem
    color #2c3e50
    margin 0.5rem 0
  
  .hero-subtitle
    font-size 1.5rem
    color #6a8bad
    margin-bottom 2rem
  
  .hero-buttons
    display flex
    justify-content center
    gap 1rem
    flex-wrap wrap
    
    .action-button
      display inline-block
      padding 0.8rem 1.6rem
      border-radius 4px
      font-size 1.1rem
      font-weight 500
      text-decoration none
      transition all 0.3s ease
      
      &.primary
        background-color #3eaf7c
        color #fff
        
        &:hover
          background-color darken(#3eaf7c, 10%)
          transform translateY(-2px)
          box-shadow 0 4px 8px rgba(0, 0, 0, 0.1)
      
      &.secondary
        background-color #f3f5f7
        color #476582
        
        &:hover
          background-color darken(#f3f5f7, 5%)
          transform translateY(-2px)

.features
  display grid
  grid-template-columns repeat(auto-fit, minmax(300px, 1fr))
  gap 2rem
  margin-bottom 4rem
  
  .feature-item
    background #fff
    padding 2rem
    border-radius 8px
    box-shadow 0 4px 10px rgba(0, 0, 0, 0.05)
    transition all 0.3s ease
    text-align center
    
    &:hover
      transform translateY(-5px)
      box-shadow 0 8px 15px rgba(0, 0, 0, 0.1)
    
    .feature-icon
      font-size 3rem
      margin-bottom 1rem
    
    h2
      font-size 1.4rem
      color #3a5169
      margin-bottom 1rem
      font-weight 600
    
    p
      color #476582
      line-height 1.6

.latest-posts
  background #fff
  padding 2rem
  border-radius 8px
  box-shadow 0 4px 10px rgba(0, 0, 0, 0.05)
  margin-bottom 4rem
  
  .section-title
    font-size 1.8rem
    color #2c3e50
    margin-top 0
    margin-bottom 1.5rem
    padding-bottom 0.5rem
    border-bottom 1px solid #eaecef

.footer
  text-align center
  padding-top 2rem
  color #4e6e8e
  
  p
    margin-bottom 1rem
  
  a
    color #3eaf7c
    text-decoration none
    
    &:hover
      text-decoration underline
  
  .social-links
    display flex
    justify-content center
    gap 1.5rem
    
    a
      font-size 1.5rem
      transition transform 0.3s ease
      
      &:hover
        transform scale(1.2)

@keyframes float
  0%
    transform translateY(0px)
  50%
    transform translateY(-10px)
  100%
    transform translateY(0px)
</style>