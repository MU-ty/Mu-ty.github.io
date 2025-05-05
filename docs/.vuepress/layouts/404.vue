<template>
  <div class="theme-container">
    <div class="content">
      <h1>404</h1>
      <blockquote>{{ getMsg() }}</blockquote>
      <router-link to="/">返回首页</router-link>
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

<style scoped>
.content {
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}
h1 {
  font-size: 5rem;
  margin: 2rem 0;
}
blockquote {
  font-size: 1.5rem;
  color: #666;
  margin: 1rem 0;
}
a {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #3eaf7c;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}
a:hover {
  background-color: #2c8f63;
}
</style>