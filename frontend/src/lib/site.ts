import { PROFILE } from "@/data/profile";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteConfig = {
  name: PROFILE.name,
  shortName: "Bewket",
  title: `${PROFILE.name} | ${PROFILE.role}`,
  description: PROFILE.description,
  url: (configuredUrl || PROFILE.url).replace(/\/+$/, ""),
  author: PROFILE.name,
  jobTitle: PROFILE.role,
  image: PROFILE.image,
  email: PROFILE.email,
  location: PROFILE.location,
  education: PROFILE.education,
  socialLinks: {
    github: "https://github.com/BEWKET-MENGIE",
    instagram: "https://www.instagram.com/bewket.sr",
    telegram: "https://t.me/BEWKET1500671",
    facebook: "https://www.facebook.com/bewket27dev",
  },
  keywords: [
    "Bewket",
    "Bewket Mengie",
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
  ],
} as const;

export const socialProfiles = Object.values(siteConfig.socialLinks).filter(
  (url) => url.trim() !== "",
);