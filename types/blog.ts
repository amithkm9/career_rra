// types/blog.ts
export interface Author {
    _id: string;
    name: string;
    slug: {
      current: string;
    };
    image?: any;
    bio?: any[];
    role?: string;
    posts?: Post[];
  }
  
  export interface Category {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    description?: string;
    color?: string;
  }
  
  export interface Post {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    body?: any[];
    excerpt?: string;
    mainImage?: any;
    categories?: (Category | string)[];
    publishedAt: string;
    author?: Author;
    readTime?: number;
    featured?: boolean;
    seo?: {
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string[];
    };
  }
  
  export interface PortableTextBlock {
    _key: string;
    _type: string;
    style?: string;
    children?: {
      _key: string;
      _type: string;
      text: string;
      marks?: string[];
    }[];
    markDefs?: any[];
    asset?: {
      _ref: string;
      _type: string;
    };
    code?: string;
    filename?: string;
    language?: string;
  }