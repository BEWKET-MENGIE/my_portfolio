// src/types/index.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  linear: string;
  tags: string[];
  githubUrl?: string;
  featured?: boolean;
  highlights: string[];
}

export interface Service {
  title: string;
  category: string;
  desc: string;
  image: string;
  technologies: string[];
  featured?: boolean;
  longDescription?: string;
  features?: string[];
  process?: { title: string; text: string }[];
}

export interface SkillItem {
  name: string;
  category?: string;
  level?: number;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface Profile {
  name: string;
  role: string;
  title?: string;
  description?: string;
  url?: string;
  email: string;
  location: string;
  phone: string;
  education: string;
  image: string;
  cv: string;
}