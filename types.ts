
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

export interface SiteSettings {
  primaryColor: string;
  accentColor: string;
  fontFamily: 'Inter' | 'Outfit' | 'system-ui';
  siteName: string;
  tagline: string;
  logo: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  layout: {
    showStats: boolean;
    showTestimonials: boolean;
    showNewsletter: boolean;
  };
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    title: string;
    text: string;
    mission: string;
    vision: string;
  };
}

export interface AppState {
  settings: SiteSettings;
  content: SiteContent;
  posts: BlogPost[];
  services: Service[];
  products: Product[];
  isLoggedIn: boolean;
}
