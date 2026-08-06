// types/index.ts
export interface Project {
  slug: string;
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  tags: string[];
  techStack: {
    category: string;
    items: string[];
  }[];
  links: {
    live?: string;
    github?: string;
  };
  featured: boolean;
  content: string; // HTML content
}

export interface Note {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string; // HTML content
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
}
