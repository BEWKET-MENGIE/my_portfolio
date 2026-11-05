
// src/data/profile.ts

// ============================================
// PERSONAL PROFILE INFORMATION
// Single source of truth for your portfolio
// ============================================

export const PROFILE = {
  // Personal identity
  name: "Bewket Mengie",

  // Professional information
  role: "Full Stack Developer",
  title: "Full Stack Developer",

  // Professional introduction
  description:
    "Bewket Mengie is a Software Engineering student and Full Stack Developer from Ethiopia, building modern, scalable, and responsive web applications using Next.js, React, TypeScript, NestJS, Prisma, and PostgreSQL.",

  // Website information
  url: "https://bewketmengie.com",

  // Contact information
  email: "mengiebewket@gmail.com",
  phone: "+251918410399",

  // Location and education
  location: "Injibara University, Injibara, Ethiopia",
  education: "Injibara University",

  // Profile image
  // File location: public/images/bewket-mengie.jpg
  image: "/images/bewket-mengie.jpg",

  // Image description for accessibility
  imageAlt: "Bewket Mengie - Full Stack Developer",

  // Curriculum Vitae
  // File location: public/cv.pdf
  cv: "/cv.pdf",
} as const;


// ============================================
// PROFESSIONAL DEVELOPMENT PRINCIPLES
// ============================================

export const PRINCIPLES = [
  "Performance",
  "Security",
  "Scalability",
  "Accessibility",
  "Reliability",
  "Maintainability",
] as const;


// ============================================
// PROFILE TYPE EXPORTS
// Useful for reusable components and props
// ============================================

export type Profile = typeof PROFILE;

export type Principle = (typeof PRINCIPLES)[number];
