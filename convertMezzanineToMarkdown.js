import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import TurndownService from 'turndown';

// Initialize Turndown
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
  strongDelimiter: '**',
  linkStyle: 'inlined',
  linkReferenceStyle: 'full',
  br: '  \n' // Double space followed by newline for markdown line breaks
});

// Get the current directory in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const INPUT_FILE = path.join(__dirname, 'posts.json');
const OUTPUT_DIR = path.join(__dirname, 'content', 'blog');

// Convert HTML to Markdown with Turndown
function htmlToMarkdown(html) {
  if (!html) return '';
  
  try {
    // Convert HTML to Markdown
    let markdown = turndownService.turndown(html);
    
    // Clean up the markdown
    markdown = markdown
      .replace(/\n{3,}/g, '\n\n') // Remove multiple empty lines
      .replace(/\u00A0/g, ' ') // Replace non-breaking spaces with regular spaces
      .replace(/\s+\n/g, '\n') // Remove trailing spaces before newlines
      .trim();
      
    return markdown;
  } catch (error) {
    console.error('Error converting HTML to Markdown:', error);
    return '';
  }
}

// Extract first paragraph for description
function extractFirstParagraph(html) {
  if (!html) return '';
  
  try {
    // Simple regex to extract content from the first <p> tag
    const match = /<p[^>]*>([\s\S]*?)<\/p>/i.exec(html);
    if (match && match[1]) {
      // Remove HTML tags from the matched content
      return match[1].replace(/<[^>]*>/g, '').trim();
    }
    return '';
  } catch (error) {
    console.error('Error extracting first paragraph:', error);
    return '';
  }
}

// Format date to YYYY-MM-DD
function formatDate(isoDate) {
  if (!isoDate) return new Date().toISOString().split('T')[0];
  
  try {
    // Handle different date formats
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date:', error);
    return new Date().toISOString().split('T')[0];
  }
}

// Process a single post
async function processPost(post) {
  const frontmatter = {
    title: post.title || 'Untitled',
    description: post.summary || extractFirstParagraph(post.content || ''),
    publishedAt: formatDate(post.publish_date),
    tags: post.tags || [],
    categories: post.categories || [],
    author: post.author || ''
  };

  // Generate frontmatter YAML
  let frontmatterYaml = '---\n';
  
  for (const [key, value] of Object.entries(frontmatter)) {
    if (value === undefined || value === null) continue;
    
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      frontmatterYaml += `${key}:\n`;
      value.forEach(item => {
        frontmatterYaml += `  - ${item}\n`;
      });
    } else if (typeof value === 'string') {
      // Escape colons and quotes in YAML strings
      const escapedValue = value
        .replace(/"/g, '\\"')
        .replace(/: /g, ': ');
      frontmatterYaml += `${key}: "${escapedValue}"\n`;
    } else {
      frontmatterYaml += `${key}: ${value}\n`;
    }
  }
  
  frontmatterYaml += '---\n\n';

  // Convert content to markdown
  const content = htmlToMarkdown(post.content || '');
  
  return {
    filename: `${post.slug || 'untitled'}.md`,
    content: frontmatterYaml + content
  };
}

// Main function
async function main() {
  try {
    // Read and parse the JSON file
    const data = await fs.readFile(INPUT_FILE, 'utf8');
    const posts = JSON.parse(data);
    
    // Create output directory if it doesn't exist
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    
    // Process each post
    let successCount = 0;
    for (const [index, post] of posts.entries()) {
      try {
        const { filename, content } = await processPost(post);
        const outputPath = path.join(OUTPUT_DIR, filename);
        await fs.writeFile(outputPath, content, 'utf8');
        console.log(`✅ Processed: ${filename}`);
        successCount++;
      } catch (error) {
        console.error(`❌ Error processing post ${index + 1}:`, error.message);
      }
    }
    
    console.log(`\n🎉 Conversion complete! Successfully converted ${successCount} out of ${posts.length} posts.`);
  } catch (error) {
    console.error('❌ An error occurred:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
