<template>
  <div class="article-manager">
    <div class="tabs">
      <button 
        :class="['tab-button', { active: activeTab === 'list' }]" 
        @click="activeTab = 'list'"
      >
        文章列表
      </button>
      <button 
        :class="['tab-button', { active: activeTab === 'add' }]" 
        @click="activeTab = 'add'"
      >
        添加文章
      </button>
      <button 
        :class="['tab-button', { active: activeTab === 'export' }]" 
        @click="activeTab = 'export'"
      >
        导出文章
      </button>
    </div>

    <!-- 文章列表 -->
    <div v-if="activeTab === 'list'" class="tab-content">
      <h3>现有文章</h3>
      <div v-if="articles.length === 0" class="empty-state">
        暂无文章，请添加新文章。
      </div>
      <div v-else class="article-list">
        <div v-for="(article, index) in articles" :key="index" class="article-item">
          <div class="article-info">
            <h4>{{ article.title }}</h4>
            <p>{{ article.description || '无描述' }}</p>
            <div class="article-meta">
              <span>文件名: {{ article.filename }}</span>
            </div>
          </div>
          <div class="article-actions">
            <button @click="editArticle(index)" class="edit-btn">编辑</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加/编辑文章 -->
    <div v-if="activeTab === 'add'" class="tab-content">
      <h3>{{ isEditing ? '编辑文章' : '添加新文章' }}</h3>
      <div class="form-group">
        <label for="title">标题</label>
        <input 
          type="text" 
          id="title" 
          v-model="currentArticle.title" 
          placeholder="文章标题"
        >
      </div>
      <div class="form-group">
        <label for="filename">文件名</label>
        <input 
          type="text" 
          id="filename" 
          v-model="currentArticle.filename" 
          placeholder="例如: my-post (不需要.md后缀)"
          :disabled="isEditing"
        >
      </div>
      <div class="form-group">
        <label for="description">描述</label>
        <input 
          type="text" 
          id="description" 
          v-model="currentArticle.description" 
          placeholder="文章简短描述"
        >
      </div>
      <div class="form-group">
        <label for="content">内容</label>
        <textarea 
          id="content" 
          v-model="currentArticle.content" 
          placeholder="使用Markdown格式编写文章内容"
          rows="10"
        ></textarea>
      </div>
      
      <!-- Markdown预览 -->
      <ArticlePreview :content="currentArticle.content" />
      <div class="form-actions">
        <button @click="resetForm" class="cancel-btn">取消</button>
        <button @click="saveArticle" class="save-btn">保存</button>
      </div>
    </div>
    
    <!-- 导出文章 -->
    <div v-if="activeTab === 'export'" class="tab-content">
      <ArticleExporter />
    </div>
  </div>
</template>

<script>
import ArticleExporter from './ArticleExporter.vue'
import ArticlePreview from './ArticlePreview.vue'

/**
 * 文章管理组件
 * 用于添加、编辑和管理博客文章
 */
export default {
  components: {
    ArticleExporter,
    ArticlePreview
  },
  data() {
    return {
      activeTab: 'list',
      articles: [],
      currentArticle: {
        title: '',
        filename: '',
        description: '',
        content: ''
      },
      isEditing: false,
      editIndex: -1
    }
  },
  mounted() {
    // 从localStorage加载文章数据
    this.loadArticles()
  },
  methods: {
    /**
     * 从localStorage加载文章数据
     */
    loadArticles() {
      const savedArticles = localStorage.getItem('blog-articles')
      if (savedArticles) {
        try {
          this.articles = JSON.parse(savedArticles)
        } catch (e) {
          console.error('加载文章失败:', e)
          this.articles = []
        }
      }
    },
    
    /**
     * 保存文章数据到localStorage
     */
    saveArticlesToStorage() {
      localStorage.setItem('blog-articles', JSON.stringify(this.articles))
    },
    
    /**
     * 重置表单数据
     */
    resetForm() {
      this.currentArticle = {
        title: '',
        filename: '',
        description: '',
        content: ''
      }
      this.isEditing = false
      this.editIndex = -1
      this.activeTab = 'list'
    },
    
    /**
     * 编辑文章
     * @param {Number} index - 要编辑的文章索引
     */
    editArticle(index) {
      const article = this.articles[index]
      this.currentArticle = { ...article }
      this.isEditing = true
      this.editIndex = index
      this.activeTab = 'add'
    },
    
    /**
     * 保存文章
     */
    saveArticle() {
      // 表单验证
      if (!this.currentArticle.title || !this.currentArticle.filename) {
        alert('标题和文件名不能为空')
        return
      }
      
      // 准备文章数据
      const articleData = {
        title: this.currentArticle.title,
        filename: this.currentArticle.filename,
        description: this.currentArticle.description,
        content: this.currentArticle.content,
        date: new Date().toISOString()
      }
      
      if (this.isEditing) {
        // 更新现有文章
        this.articles[this.editIndex] = articleData
      } else {
        // 添加新文章
        this.articles.push(articleData)
      }
      
      // 保存到localStorage
      this.saveArticlesToStorage()
      
      // 重置表单
      this.resetForm()
      
      // 显示成功消息
      alert(this.isEditing ? '文章已更新' : '文章已添加')
    }
  }
}
</script>

<style scoped>
.article-manager {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #eaecef;
}

.tab-button {
  padding: 10px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #2c3e50;
}

.tab-button.active {
  color: #3eaf7c;
  border-bottom: 2px solid #3eaf7c;
}

.tab-content {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.save-btn {
  background-color: #3eaf7c;
  color: white;
}

.cancel-btn {
  background-color: #f3f3f3;
  color: #666;
}

.edit-btn {
  background-color: #4a9cf5;
  color: white;
  padding: 5px 10px;
  font-size: 14px;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.article-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #eaecef;
  border-radius: 4px;
}

.article-info {
  flex: 1;
}

.article-info h4 {
  margin: 0 0 5px 0;
}

.article-info p {
  margin: 0 0 10px 0;
  color: #666;
}

.article-meta {
  font-size: 14px;
  color: #999;
}

.empty-state {
  text-align: center;
  padding: 30px;
  color: #999;
}
</style>