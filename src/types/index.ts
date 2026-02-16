export interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  genre: string[];
  platforms: string[];
  releaseDate: string;
  thumbnail: string;
  screenshots: string[];
  featuredImage?: string;
  storeLinks?: {
    steam?: string;
    itch?: string;
    gog?: string;
    web?: string;
  };
  features: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  content: string;
  featuredImage?: string;
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  featuredImage?: string;
}

export interface GameMetadata {
  id: string;
  slug: string;
  title: string;
  description: string;
  genre: string[];
  platforms: string[];
  releaseDate: string;
  thumbnail: string;
  screenshots: string[];
  featuredImage?: string;
  storeLinks?: {
    steam?: string;
    itch?: string;
    gog?: string;
    web?: string;
  };
  features: string[];
}
