/**
 * 自动更新博客文章索引脚本
 * 此脚本会扫描docs/posts目录下的所有Markdown文件（除README.md外）
 * 并提取文章标题，然后更新README.md文件中的文章列表
 */

const fs = require('fs');
const path = require('path');

// 配置项
const POSTS_DIR = path.join(__dirname, '..', 'docs', 'posts');
const README_PATH = path.join(POSTS_DIR, 'README.md');
const README_HEADER = '# 博客文章\n\n这里是所有博客文章的索引页面。\n\n## 文章列表';

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
 * 更新README.md文件
 */
function updateReadme() {
  try {
    // 获取所有Markdown文件
    const files = fs.readdirSync(POSTS_DIR)
      .filter(file => file.endsWith('.md') && file !== 'README.md')
      .sort(); // 按文件名排序

    // 生成文章列表
    let articleList = '';
    for (const file of files) {
      const filePath = path.join(POSTS_DIR, file);
      const title = extractTitleFromMarkdown(filePath);
      articleList += `- [${title}](./${file})\n`;
    }

    // 更新README.md
    const readmeContent = `${README_HEADER}\n${articleList}`;
    fs.writeFileSync(README_PATH, readmeContent);

    console.log('文章索引已更新！');
    console.log(`共找到 ${files.length} 篇文章。`);
  } catch (error) {
    console.error('更新README.md时出错:', error);
  }
}

// 执行更新
updateReadme();