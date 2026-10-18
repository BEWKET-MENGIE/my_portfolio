// src/data/profile.ts
// One place for the details that appear on BOTH the home About section
// and the full /about page. Change it here and both update.

export const PROFILE = {
  name: "Bewket Mengie",
  role: "Full Stack Developer",
  education: "Injibara University",
  // Files live in the `public` folder: public/images/about/about.jpg
  image: "/images/about/about.jpg",
  // public/cv.pdf
  cv: "/cv.pdf",
} as const;

export const PRINCIPLES = [
  "Performance",
  "Security",
  "Scalability",
  "Accessibility",
  "Reliability",
  "Maintainability",
] as const;