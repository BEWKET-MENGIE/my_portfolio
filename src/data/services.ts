// src/data/services.ts
import type { Service } from "@/types";

/* EDIT THE WORDING: the descriptions, features and steps below are
   starting text based on each service's name and technologies.
   Change anything that doesn't match how you really work. */

export const services: Service[] = [
  {
    title: "Frontend Development",
    category: "Web Development",
    desc: "Fast, responsive interfaces built with modern tools and clean, maintainable code.",
    image: "/images/services/frontend-development.jpg",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    featured: true,

    longDescription:
      "I turn designs and ideas into polished, responsive websites and web apps. Every page is built to load quickly, work on any screen size and stay easy to update later.",
    features: [
      "Responsive layouts for phones, tablets and desktops",
      "Clean, reusable component code",
      "Fast loading and smooth interactions",
      "Accessible, keyboard-friendly interfaces",
    ],
    process: [
      { title: "Discuss", text: "We go through your goals, audience, content and any designs you already have." },
      { title: "Build", text: "I build the interface step by step and share progress along the way." },
      { title: "Launch", text: "Testing on real devices, deployment, and a handover so you can manage it." },
    ],
  },
  {
    title: "UI/UX Design",
    category: "Product Design",
    desc: "Clear, user-friendly designs that look good and are easy to use.",
    image: "/images/services/ui-ux-design.jpg",
    technologies: ["Figma", "Wireframing", "Prototyping", "Responsive UI"],

    longDescription:
      "I design interfaces around the people who will use them. From first sketches to clickable prototypes, the goal is a product that feels simple and clear.",
    features: [
      "Wireframes that map out structure and flow",
      "Interactive prototypes you can click through",
      "Consistent layouts and visual style",
      "Designs that work on every screen size",
    ],
    process: [
      { title: "Understand", text: "We talk about your users, their goals and what the product needs to do." },
      { title: "Design", text: "I create wireframes, then refine them into a full visual design in Figma." },
      { title: "Prototype", text: "You review a clickable prototype and I adjust it based on your feedback." },
    ],
  },
  {
    title: "Backend Development",
    category: "API & Architecture",
    desc: "Reliable APIs and databases that power your application behind the scenes.",
    image: "/images/services/backend-development.jpg",
    technologies: ["NestJS", "Node.js", "Prisma", "PostgreSQL"],
    featured: true,

    longDescription:
      "I build the server side of applications: the APIs, business logic and database that everything else depends on. The focus is on clear structure, security and reliability.",
    features: [
      "Well-structured REST APIs",
      "Database design and migrations",
      "Authentication and secure data handling",
      "Clear code that is easy to extend",
    ],
    process: [
      { title: "Plan", text: "We define the data, the endpoints and the rules your application needs." },
      { title: "Build", text: "I implement the API and database, with testing as I go." },
      { title: "Deploy", text: "The service is deployed, documented and ready for your frontend to use." },
    ],
  },
  {
    title: "Full-Stack Applications",
    category: "Full-Stack",
    desc: "Complete web applications, from the interface to the database, in one place.",
    image: "/images/services/fullstack-development.jpg",
    technologies: ["Next.js", "TypeScript", "REST APIs", "PostgreSQL"],

    longDescription:
      "I take a project from idea to working product: the interface, the server and the database, designed to work together. One person who understands the whole system keeps things simple.",
    features: [
      "Frontend, backend and database in one project",
      "User accounts and protected pages where needed",
      "Type-safe code from end to end",
      "Deployment and handover included",
    ],
    process: [
      { title: "Scope", text: "We agree on what the application must do and what comes first." },
      { title: "Build", text: "I develop the whole stack in small steps, so you can try each part early." },
      { title: "Release", text: "Testing, deployment and documentation so the app is ready to use." },
    ],
  },
  {
    title: "Performance & SEO",
    category: "Optimization",
    desc: "Faster, more accessible websites that are easier for people and search engines to find.",
    image: "/images/services/web-optimization.jpg",
    technologies: ["Next.js", "SEO", "Accessibility", "Lighthouse"],

    longDescription:
      "I review how your site loads, behaves and appears in search, then fix what slows it down or holds it back. Better speed and accessibility help both visitors and rankings.",
    features: [
      "Lighthouse audit with clear findings",
      "Faster loading through image and code improvements",
      "On-page SEO basics: titles, descriptions and structure",
      "Accessibility checks and fixes",
    ],
    process: [
      { title: "Audit", text: "I measure your site's speed, SEO and accessibility and list the problems." },
      { title: "Improve", text: "I fix the biggest issues first and measure again after each change." },
      { title: "Report", text: "You get a short summary of what changed and what to watch next." },
    ],
  },
  {
    title: "Maintenance & Support",
    category: "Ongoing Support",
    desc: "Ongoing fixes, updates and improvements to keep your project running smoothly.",
    image: "/images/services/maintenance-support.jpg",
    technologies: ["Git", "Testing", "Debugging", "Deployment"],

    longDescription:
      "Software needs care after launch. I fix bugs, keep dependencies up to date and add small improvements, so your project stays stable and keeps working as your needs grow.",
    features: [
      "Bug fixing and debugging",
      "Dependency and security updates",
      "Small feature additions and improvements",
      "Safe deployments with version control",
    ],
    process: [
      { title: "Review", text: "I look at the current state of the project and what needs attention." },
      { title: "Fix & update", text: "I work through the issues in small, tested changes tracked in Git." },
      { title: "Deploy", text: "Changes go live carefully, with a note on what was done." },
    ],
  },
];