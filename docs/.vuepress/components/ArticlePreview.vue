<template>
  <div class="article-preview">
    <h3>文章预览</h3>
    <div class="preview-container" v-if="content">
      <div class="rendered-content" v-html="renderedContent"></div>
    </div>
    <div class="empty-preview" v-else>
      <p>输入Markdown内容后将在此处显示预览</p>
    </div>
  </div>
</template>

<script>
/**
 * 文章预览组件
 * 用于实时预览Markdown内容
 */
export default {
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  computed: {
    /**
     * 将Markdown内容转换为HTML
     * 使用VuePress内置的markdown渲染器
     */
    renderedContent() {
      // 简单的Markdown转HTML实现
      // 在实际环境中，这里可以使用VuePress的markdown-it实例
      // 但在客户端组件中，我们使用简单的替换
      if (!this.content) return ''
      
      let html = this.content
        // 标题
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        // 段落
        .replace(/^(?!<h[1-6]|<ul|<ol|<li|<blockquote)(.+)$/gm, '<p>$1</p>')
        // 粗体
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // 斜体
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // 链接
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
        // 列表
        .replace(/^- (.+)$/gm, '<ul><li>$1</li></ul>')
        // 引用
        .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
        // 代码块
        .replace(/```([\s\S]+?)```/g, '<pre><code>$1</code></pre>')
        // 内联代码
        .replace(/`(.+?)`/g, '<code>$1</code>')
        // 修复重复的ul标签
        .replace(/<\/ul>\s*<ul>/g, '')
      
      return html
    }
  }
}
</script>

<style scoped>
.article-preview {
  margin-top: 30px;
  border-top: 1px solid #eaecef;
  padding-top: 20px;
}

.preview-container {
  background-color: #fff;
  border: 1px solid #eaecef;
  border-radius: 4px;
  padding: 20px;
  margin-top: 10px;
  min-height: 200px;
}

.empty-preview {
  background-color: #f8f8f8;
  border: 1px dashed #ddd;
  border-radius: 4px;
  padding: 20px;
  margin-top: 10px;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
}

/* 预览内容样式 */
.rendered-content :deep(h1) {
  font-size: 2em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.rendered-content :deep(h2) {
  font-size: 1.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.rendered-content :deep(h3) {
  font-size: 1.3em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.rendered-content :deep(p) {
  margin-bottom: 1em;
}

.rendered-content :deep(ul), .rendered-content :deep(ol) {
  padding-left: 2em;
  margin-bottom: 1em;
}

.rendered-content :deep(blockquote) {
  border-left: 4px solid #ddd;
  padding-left: 1em;
  color: #666;
  margin-left: 0;
  margin-right: 0;
}

.rendered-content :deep(code) {
  background-color: #f3f3f3;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}

.rendered-content :deep(pre) {
  background-color: #282c34;
  color: #abb2bf;
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
  margin: 1em 0;
}

.rendered-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
  color: inherit;
}

.rendered-content :deep(a) {
  color: #3eaf7c;
  text-decoration: none;
}

.rendered-content :deep(a:hover) {
  text-decoration: underline;
}
</style>