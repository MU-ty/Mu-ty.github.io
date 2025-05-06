/**
 * 博客文章管理API服务
 * 提供文章的增删改查功能
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 确保数据目录存在
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 文章数据文件路径
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json');

// 中间件配置
app.use(cors());
app.use(bodyParser.json());

/**
 * 获取所有文章
 */
app.get('/api/articles', (req, res) => {
  try {
    if (fs.existsSync(ARTICLES_FILE)) {
      const articlesData = fs.readFileSync(ARTICLES_FILE, 'utf8');
      const articles = JSON.parse(articlesData);
      res.json(articles);
    } else {
      // 如果文件不存在，返回空数组
      res.json([]);
    }
  } catch (error) {
    console.error('获取文章失败:', error);
    res.status(500).json({ error: '获取文章失败' });
  }
});

/**
 * 保存所有文章
 */
app.post('/api/articles', (req, res) => {
  try {
    const articles = req.body;
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2), 'utf8');
    res.json({ success: true, message: '文章保存成功' });
  } catch (error) {
    console.error('保存文章失败:', error);
    res.status(500).json({ error: '保存文章失败' });
  }
});

/**
 * 添加单篇文章
 */
app.post('/api/article', (req, res) => {
  try {
    const newArticle = req.body;
    let articles = [];
    
    // 如果文件存在，读取现有文章
    if (fs.existsSync(ARTICLES_FILE)) {
      const articlesData = fs.readFileSync(ARTICLES_FILE, 'utf8');
      articles = JSON.parse(articlesData);
    }
    
    // 添加新文章
    articles.push(newArticle);
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2), 'utf8');
    
    res.json({ success: true, message: '文章添加成功', article: newArticle });
  } catch (error) {
    console.error('添加文章失败:', error);
    res.status(500).json({ error: '添加文章失败' });
  }
});

/**
 * 更新单篇文章
 */
app.put('/api/article/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const updatedArticle = req.body;
    
    // 读取现有文章
    if (fs.existsSync(ARTICLES_FILE)) {
      const articlesData = fs.readFileSync(ARTICLES_FILE, 'utf8');
      let articles = JSON.parse(articlesData);
      
      // 查找并更新文章
      const index = articles.findIndex(article => article.filename === filename);
      if (index !== -1) {
        articles[index] = updatedArticle;
        fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2), 'utf8');
        res.json({ success: true, message: '文章更新成功', article: updatedArticle });
      } else {
        res.status(404).json({ error: '文章不存在' });
      }
    } else {
      res.status(404).json({ error: '文章数据不存在' });
    }
  } catch (error) {
    console.error('更新文章失败:', error);
    res.status(500).json({ error: '更新文章失败' });
  }
});

/**
 * 删除单篇文章
 */
app.delete('/api/article/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    
    // 读取现有文章
    if (fs.existsSync(ARTICLES_FILE)) {
      const articlesData = fs.readFileSync(ARTICLES_FILE, 'utf8');
      let articles = JSON.parse(articlesData);
      
      // 过滤掉要删除的文章
      const filteredArticles = articles.filter(article => article.filename !== filename);
      
      if (filteredArticles.length < articles.length) {
        fs.writeFileSync(ARTICLES_FILE, JSON.stringify(filteredArticles, null, 2), 'utf8');
        res.json({ success: true, message: '文章删除成功' });
      } else {
        res.status(404).json({ error: '文章不存在' });
      }
    } else {
      res.status(404).json({ error: '文章数据不存在' });
    }
  } catch (error) {
    console.error('删除文章失败:', error);
    res.status(500).json({ error: '删除文章失败' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`博客API服务运行在 http://localhost:${PORT}`);
});