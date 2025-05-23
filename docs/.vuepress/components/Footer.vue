<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>关于博客</h3>
        <p>Binbim Blog 是一个基于 VuePress 构建的个人博客系统，专注于简洁、优雅的内容展示。</p>
      </div>
      
      <div class="footer-section">
        <h3>联系方式</h3>
        <ul class="contact-list">
          <li><span class="icon">📧</span> <a href="mailto:binbim_promax@163.com">binbim_promax@163.com</a></li>
          <li><span class="icon">💬</span> <a href="https://qm.qq.com/q/x8P9eycxUI" target="_blank">QQ交流群: 1036011225</a></li>
          <li><span class="icon">🐙</span> <a href="https://github.com/BB0813" target="_blank">GitHub: BB0813</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h3>快速链接</h3>
        <ul class="quick-links">
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/posts/">文章列表</router-link></li>
          <li><router-link to="/admin/">管理页面</router-link></li>
          <li><router-link to="/admin/help.html">使用帮助</router-link></li>
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>© {{ new Date().getFullYear() }} Binbim Blog. 基于 <a href="https://vuepress.vuejs.org/" target="_blank">VuePress</a> 构建</p>
      <p class="license">使用 <a href="https://github.com/BB0813/Binbim-Blog/blob/main/LICENSE" target="_blank">MIT 许可证</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="stylus" scoped>
.footer
  background #f8f9fa
  padding 3rem 2rem 1.5rem
  margin-top 4rem
  border-top 1px solid #eaecef

.footer-content
  max-width 1200px
  margin 0 auto
  display grid
  grid-template-columns repeat(auto-fit, minmax(250px, 1fr))
  gap 2rem
  margin-bottom 2rem

.footer-section
  h3
    font-size 1.2rem
    color #2c3e50
    margin-top 0
    margin-bottom 1rem
    font-weight 600
  
  p
    color #4e6e8e
    line-height 1.6
  
  ul
    list-style none
    padding 0
    margin 0
    
    li
      margin-bottom 0.5rem
      
      a
        color #3eaf7c
        text-decoration none
        transition color 0.2s ease
        
        &:hover
          color darken(#3eaf7c, 10%)
          text-decoration underline

.contact-list
  li
    display flex
    align-items center
    
    .icon
      margin-right 0.5rem
      font-size 1.1rem

.footer-bottom
  text-align center
  padding-top 1.5rem
  border-top 1px solid #eaecef
  color #8e8e8e
  font-size 0.9rem
  
  p
    margin 0.5rem 0
  
  a
    color #3eaf7c
    text-decoration none
    
    &:hover
      text-decoration underline
  
  .license
    font-size 0.8rem
</style>