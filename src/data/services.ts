
import type { Service } from "@/types";

export const services: Service[] = [
  {
    title: "Frontend Development",
    // category: "Web Development",
    image: "/images/services/frontend-development.jpg",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    featured: true,
  },
  {
    title: "UI/UX Design",
    // category: "Product Design",
    image: "/images/services/ui-ux-design.jpg",
    technologies: ["Figma", "Wireframing", "Prototyping", "Responsive UI"],
  },
  {
    title: "Backend Development",
    // category: "API & Architecture",
    image: "/images/services/backend-development.jpg",
    technologies: ["NestJS", "Node.js", "Prisma", "PostgreSQL"],
    featured: true,
  },
  {
    title: "Full-Stack Applications",
    image: "/images/services/fullstack-development.jpg",
    technologies: ["Next.js", "TypeScript", "REST APIs", "PostgreSQL"],
  },
  {
    title: "Performance & SEO",
    image: "/images/services/web-optimization.jpg",
    technologies: ["Next.js", "SEO", "Accessibility", "Lighthouse"],
  },
  {
    title: "Maintenance & Support",
    image: "/images/services/maintenance-support.jpg",
    technologies: ["Git", "Testing", "Debugging", "Deployment"],
  },
];
