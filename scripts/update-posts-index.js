/**
 * 自动更新博客文章索引脚本
 * 此脚本会扫描docs/posts目录下的所有Markdown文件（除README.md外）
 * 并提取文章标题，然后更新docs/posts/README.md和docs/README.md文件中的文章列表
 */

const fs = require('fs');
const path = require('path');

// 配置项
const POSTS_DIR = path.join(__dirname, '..', 'docs', 'posts');
const POSTS_README_PATH = path.join(POSTS_DIR, 'README.md');
const MAIN_README_PATH = path.join(__dirname, '..', 'docs', 'README.md');
const POSTS_README_HEADER = '# 博客文章\n\n这里是所有博客文章的索引页面。\n\n## 文章列表';
const MAIN_README_HEADER = '# 欢迎来到我的博客\n\n最新文章：';

/**
 * 从Markdown文件中提取标题
 * @param {string} filePath - Markdown文件路径
 * @returns {string} 文件的标题
 */
function extractTitleFromMarkdown(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // 查找第一个 # 开头的行作为标题
    const titleMatch = content.match(/^\s*#\s+(.+)$/m);
    if (titleMatch && titleMatch[1]) {
      return titleMatch[1].trim();
    }
    // 如果没有找到标题，使用文件名（不含扩展名）
    return path.basename(filePath, '.md');
  } catch (error) {
    console.error(`无法读取文件 ${filePath}:`, error);
    return path.basename(filePath, '.md');
  }
}

/**
 * 更新文章索引文件
 */
function updateReadme() {
  try {
    // 获取所有Markdown文件
    const files = fs.readdirSync(POSTS_DIR)
      .filter(file => file.endsWith('.md') && file !== 'README.md')
      .sort(); // 按文件名排序

    // 生成文章列表（用于posts目录下的README.md）
    let postsArticleList = '';
    // 生成文章列表（用于主README.md）
    let mainArticleList = '';
    
    for (const file of files) {
      const filePath = path.join(POSTS_DIR, file);
      const title = extractTitleFromMarkdown(filePath);
      postsArticleList += `- [${title}](./${file})\n`;
      mainArticleList += `- [${title}](/posts/${file.replace('.md', '.html')})\n`;
    }

    // 更新posts目录下的README.md
    const postsReadmeContent = `${POSTS_README_HEADER}\n${postsArticleList}`;
    fs.writeFileSync(POSTS_README_PATH, postsReadmeContent);
    
    // 更新主目录下的README.md
    // 先读取现有的README.md文件，保留front matter
    let mainReadmeContent = '';
    try {
      const existingContent = fs.readFileSync(MAIN_README_PATH, 'utf8');
      // 检查是否有front matter
      const frontMatterMatch = existingContent.match(/^---\n([\s\S]*?)\n---\n/);
      if (frontMatterMatch) {
        // 保留front matter，并在slot posts中更新文章列表
        const frontMatter = frontMatterMatch[0];
        mainReadmeContent = `${frontMatter}\n::: slot posts\n${mainArticleList}:::\n`;
      } else {
        // 如果没有front matter，使用默认格式
        mainReadmeContent = `${MAIN_README_HEADER}\n${mainArticleList}`;
      }
    } catch (error) {
      // 如果文件不存在或读取失败，使用默认格式
      mainReadmeContent = `${MAIN_README_HEADER}\n${mainArticleList}`;
    }
    fs.writeFileSync(MAIN_README_PATH, mainReadmeContent);

    console.log('文章索引已更新！');
    console.log(`共找到 ${files.length} 篇文章，已更新两个README.md文件。`);
  } catch (error) {
    console.error('更新README.md文件时出错:', error);
  }
}

// 执行更新
updateReadme();