<template>
  <div class="posts-container">
    <div class="posts-header">
      <h1>博客文章</h1>
      <p>这里是所有博客文章的索引页面</p>
    </div>
    
    <ul class="posts-list">
      <li v-for="(post, index) in posts" :key="index" class="post-item">
        <div class="post-card">
          <router-link :to="post.path" class="post-title">{{ post.title }}</router-link>
          <div class="post-meta">
            <span v-if="post.frontmatter.date" class="post-date">
              📅 {{ formatDate(post.frontmatter.date) }}
            </span>
            <span v-if="post.frontmatter.tags && post.frontmatter.tags.length" class="post-tags">
              🏷️ 
              <span v-for="(tag, tagIndex) in post.frontmatter.tags" :key="tagIndex" class="post-tag">
                {{ tag }}
              </span>
            </span>
          </div>
          <p v-if="post.frontmatter.description" class="post-description">{{ post.frontmatter.description }}</p>
          <router-link :to="post.path" class="read-more">阅读全文 →</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PostsList',
  computed: {
    posts() {
      return this.$site.pages
        .filter(page => page.path.startsWith('/posts/') && page.path !== '/posts/' && !page.path.endsWith('README.md'))
        .map(page => ({
          title: page.title || page.path.split('/').pop().replace('.html', ''),
          path: page.path,
          frontmatter: page.frontmatter
        }))
        .sort((a, b) => {
          const dateA = a.frontmatter.date ? new Date(a.frontmatter.date) : new Date(0);
          const dateB = b.frontmatter.date ? new Date(b.frontmatter.date) : new Date(0);
          return dateB - dateA;
        });
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }
  }
};
</script>

<style lang="stylus" scoped>
.posts-container
  max-width 800px
  margin 0 auto
  padding 2rem 1.5rem

.posts-header
  text-align center
  margin-bottom 3rem
  
  h1
    font-size 2.5rem
    color #2c3e50
    margin-bottom 0.5rem
  
  p
    color #6a8bad
    font-size 1.2rem

.posts-list
  list-style none
  padding 0
  
  .post-item
    margin-bottom 2rem
  
  .post-card
    background #fff
    border-radius 8px
    box-shadow 0 4px 10px rgba(0, 0, 0, 0.05)
    padding 1.5rem
    transition all 0.3s ease
    
    &:hover
      transform translateY(-5px)
      box-shadow 0 8px 15px rgba(0, 0, 0, 0.1)
    
    .post-title
      display block
      font-size 1.5rem
      font-weight 600
      color #2c3e50
      margin-bottom 0.8rem
      text-decoration none
      
      &:hover
        color #3eaf7c
    
    .post-meta
      display flex
      flex-wrap wrap
      gap 1rem
      margin-bottom 1rem
      font-size 0.9rem
      color #8e8e8e
      
      .post-tags
        display flex
        gap 0.5rem
        
        .post-tag
          background #f3f5f7
          padding 0.2rem 0.5rem
          border-radius 3px
          color #476582
    
    .post-description
      color #476582
      margin-bottom 1.2rem
      line-height 1.6
    
    .read-more
      display inline-block
      color #3eaf7c
      font-weight 500
      text-decoration none
      transition all 0.2s ease
      
      &:hover
        transform translateX(5px)
</style>