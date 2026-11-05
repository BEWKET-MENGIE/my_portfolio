
// src/lib/site.ts

import { PROFILE } from "@/data/profile";

// ============================================
// WEBSITE CONFIGURATION
// ============================================

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

const url = (configuredUrl || PROFILE.url).replace(/\/+$/, "");

// ============================================
// SOCIAL MEDIA TYPES
// ============================================

export type SocialKey =
  | "github"
  | "linkedin"
  | "x"
  | "facebook"
  | "instagram"
  | "telegram";

// ============================================
// SOCIAL MEDIA LINKS
// ============================================

export const socialLinks: Record<SocialKey, string> = {
  github: "https://github.com/BEWKET-MENGIE",

  linkedin: "", // Add your actual LinkedIn profile URL

  x: "", // Add your actual X profile URL

  facebook: "https://www.facebook.com/bewket27dev",

  instagram: "https://www.instagram.com/bewket.sr",

  telegram: "https://t.me/BEWKET1500671",
};

// ============================================
// MAIN WEBSITE CONFIGURATION
// ============================================

export const siteConfig = {
  // Personal identity
  name: PROFILE.name,
  shortName: "Bewket",

  alternateNames: [
    "Bewket Mengie",
    "Bewket",
    "Bewket Mengie Developer",
  ],

  // Website metadata
  title: `${PROFILE.name} | ${PROFILE.role}`,

  description: PROFILE.description,

  url,

  author: PROFILE.name,

  jobTitle: PROFILE.role,

  // Profile image
  image: PROFILE.image,

  imageAlt: `${PROFILE.name} - ${PROFILE.role}`,

  // Contact information
  email: PROFILE.email,

  location: PROFILE.location,

  education: PROFILE.education,

  // X / Twitter
  twitterHandle: "",

  // Professional skills and expertise
  knowsAbout: [
    "Full Stack Development",
    "Software Engineering",
    "Frontend Development",
    "Backend Development",
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "NestJS",
    "Prisma",
    "PostgreSQL",
    "Tailwind CSS",
    "REST API Development",
    "Web Development",
  ],

  // Social profiles
  socialLinks,

  // SEO keywords
  keywords: [
    "Bewket Mengie",
    "Bewket",
    "Bewket Mengie Portfolio",
    "Bewket Mengie Full Stack Developer",
    "Bewket Mengie Software Engineer",
    "Full Stack Developer Ethiopia",
    "Software Engineer Ethiopia",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "NestJS Developer",
    "Prisma Developer",
    "PostgreSQL Developer",
    "Frontend Developer",
    "Backend Developer",
  ],

  // ============================================
  // STRUCTURED DATA IDENTIFIERS
  // ============================================

  get personId() {
    return `${url}/#person`;
  },

  get websiteId() {
    return `${url}/#website`;
  },

  get profilePageId() {
    return `${url}/#profilepage`;
  },

  get imageId() {
    return `${url}/#primaryimage`;
  },
};

// ============================================
// FILTERED PUBLIC SOCIAL PROFILES
// ============================================

export const socialProfiles = Object.values(socialLinks).filter(
  (link) => link.trim().length > 0
);

// ============================================
// ABSOLUTE URL HELPER
// ============================================

/**
 * Converts a relative path or URL into an absolute URL.
 *
 * Example:
 * abs("/images/logo.jpg")
 * -> https://bewketmengie.com/images/logo.jpg
 */

export const abs = (path: string): string => {
  return new URL(path, `${url}/`).toString();
};
