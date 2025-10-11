import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// Extract the first image from markdown content
function extractFirstImage(content: string): string | null {
  const markdownImageRegex = /!\[.*?\]\((.*?)\)/;
  const markdownMatch = content.match(markdownImageRegex);
  
  if (markdownMatch && markdownMatch[1]) {
    const imageUrl = markdownMatch[1].trim();
    return normalizeImageUrl(imageUrl);
  }
  
  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
  const htmlMatch = content.match(htmlImageRegex);
  
  if (htmlMatch && htmlMatch[1]) {
    const imageUrl = htmlMatch[1].trim();
    return normalizeImageUrl(imageUrl);
  }
  
  return null;
}

function normalizeImageUrl(imageUrl: string): string {
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }
  
  return `/${imageUrl}`;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
  image?: string;
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
}

export function getAllPosts(): BlogPostMetadata[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const readTime = data.readTime || calculateReadTime(content);
      const image = data.image || extractFirstImage(content);

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        readTime,
        tags: data.tags || [],
        image,
      };
    });

  return allPostsData.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const readTime = data.readTime || calculateReadTime(content);
    const image = data.image || extractFirstImage(content);

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      readTime,
      tags: data.tags || [],
      content,
      image,
    };
  } catch {
    return null;
  }
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      return {
        slug: fileName.replace(/\.mdx$/, ''),
      };
    });
}