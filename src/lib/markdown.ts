import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostMetadata, Game, GameMetadata } from '@/types';

const postsDirectory = path.join(process.cwd(), 'content/blog');
const gamesDirectory = path.join(process.cwd(), 'content/games');

export function getAllBlogPosts(): BlogPostMetadata[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        author: data.author as string,
        excerpt: data.excerpt as string,
        tags: (data.tags as string[]) || [],
        featuredImage: data.featuredImage as string | undefined,
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      author: data.author as string,
      excerpt: data.excerpt as string,
      tags: (data.tags as string[]) || [],
      content,
      featuredImage: data.featuredImage as string | undefined,
    };
  } catch {
    return null;
  }
}

export function getAllBlogSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

// Game functions
export function getAllGames(): GameMetadata[] {
  if (!fs.existsSync(gamesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(gamesDirectory);
  const allGamesData = fileNames
    .filter(fileName =>
      fileName.endsWith('.md') &&
      !fileName.startsWith('_') &&
      fileName.toUpperCase() !== 'README.MD'
    )
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(gamesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        id: slug,
        slug,
        title: data.title as string,
        description: data.description as string,
        genre: (data.genre as string[]) || [],
        platforms: (data.platforms as string[]) || [],
        releaseDate: data.releaseDate as string,
        thumbnail: data.thumbnail as string,
        screenshots: (data.screenshots as string[]) || [],
        storeLinks: data.storeLinks as { steam?: string; itch?: string; gog?: string } | undefined,
        features: (data.features as string[]) || [],
      };
    });

  return allGamesData.sort((a, b) => (a.releaseDate < b.releaseDate ? 1 : -1));
}

export function getGameBySlug(slug: string): Game | null {
  try {
    const fullPath = path.join(gamesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id: slug,
      slug,
      title: data.title as string,
      description: data.description as string,
      fullDescription: content,
      genre: (data.genre as string[]) || [],
      platforms: (data.platforms as string[]) || [],
      releaseDate: data.releaseDate as string,
      thumbnail: data.thumbnail as string,
      screenshots: (data.screenshots as string[]) || [],
      storeLinks: data.storeLinks as { steam?: string; itch?: string; gog?: string } | undefined,
      features: (data.features as string[]) || [],
    };
  } catch {
    return null;
  }
}

export function getAllGameSlugs(): string[] {
  if (!fs.existsSync(gamesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(gamesDirectory);
  return fileNames
    .filter(fileName =>
      fileName.endsWith('.md') &&
      !fileName.startsWith('_') &&
      fileName.toUpperCase() !== 'README.MD'
    )
    .map(fileName => fileName.replace(/\.md$/, ''));
}
