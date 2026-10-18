export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  linear: string;
  demo: string;
  source: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  featured?: boolean;
}

export interface Service {
  title: string;
  category: string;
  desc: string;
  image: string;
  technologies: string[];
  featured?: boolean;
}