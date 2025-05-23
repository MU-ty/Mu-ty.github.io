<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="not-found-icon">404</div>
      <h1 class="not-found-title">页面未找到</h1>
      <blockquote class="not-found-message">{{ getMsg() }}</blockquote>
      
      <div class="not-found-actions">
        <router-link to="/" class="action-button primary">返回首页</router-link>
        <router-link to="/posts/" class="action-button secondary">浏览文章</router-link>
      </div>
      
      <div class="not-found-suggestions">
        <h3>您可能想要访问：</h3>
        <ul>
          <li><router-link to="/posts/">文章列表</router-link></li>
          <li><router-link to="/admin/">管理页面</router-link></li>
          <li><router-link to="/admin/help.html">使用帮助</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const msgs = [
  '这个页面不存在。',
  '我们找不到您要访问的页面。',
  '您是否输入了错误的URL？',
  '页面可能已被移动或删除。'
]

export default {
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  }
}
</script>

<style lang="stylus" scoped>
.not-found-container
  min-height 80vh
  display flex
  justify-content center
  align-items center
  padding 2rem

.not-found-content
  text-align center
  max-width 600px
  padding 3rem
  background #fff
  border-radius 8px
  box-shadow 0 10px 30px rgba(0, 0, 0, 0.1)

.not-found-icon
  font-size 6rem
  font-weight 700
  color #3eaf7c
  margin-bottom 1rem
  text-shadow 2px 2px 0 rgba(0, 0, 0, 0.1)

.not-found-title
  font-size 2.5rem
  color #2c3e50
  margin-bottom 1rem

.not-found-message
  font-size 1.2rem
  color #6a8bad
  margin-bottom 2rem
  border-left 4px solid #3eaf7c
  background-color rgba(62, 175, 124, 0.05)
  padding 1rem
  text-align left

.not-found-actions
  display flex
  justify-content center
  gap 1rem
  margin-bottom 2.5rem
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

.not-found-suggestions
  text-align left
  border-top 1px solid #eaecef
  padding-top 1.5rem
  
  h3
    font-size 1.2rem
    color #2c3e50
    margin-bottom 1rem
  
  ul
    list-style none
    padding 0
    
    li
      margin-bottom 0.5rem
      
      a
        color #3eaf7c
        text-decoration none
        transition color 0.2s ease
        
        &:hover
          text-decoration underline
</style>