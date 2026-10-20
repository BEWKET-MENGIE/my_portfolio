// src/data/experience.ts

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
  project?: string;
  team?: string;
  /** Optional: shows a "View project" button in the pop-up. */
  link?: string;
  current?: boolean;
};

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Full-Stack Developer & Senior Undergraduate",
    company: "University Software Engineering Program",
    period: "2022 - Present (Expected Graduation 2026)",
    type: "Academic & Leadership",
    location: "Campus / Remote",
    description:
      "Advancing through a rigorous 4th-year Software Engineering curriculum, balancing advanced computer science theory with end-to-end production-grade software development, system analysis, and team architecture design.",
    highlights: [
      "Serving as lead developer for major 4th-year capstone and graduation software engineering projects.",
      "Architecting scalable full-stack applications integrating modern frontend frameworks with robust microservices and relational databases.",
      "Applying advanced software engineering patterns, object-oriented design, test-driven development, and clean architecture principles.",
      "Collaborating closely with multidisciplinary student engineering teams using Agile/Scrum methodologies, Git workflows, and CI/CD pipelines.",
    ],
    skills: [
      "Software Architecture",
      "System Design",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Algorithms",
      "Agile / Scrum",
    ],
    project: "Final Year Capstone Project",
    team: "Lead Student Architect",
    current: true,
  },
  {
    id: "exp-2",
    role: "Full-Stack Developer",
    company: "Freelance / Project-Based",
    period: "2025 - Present",
    type: "Freelance",
    location: "Remote",
    description:
      "Developing modern full-stack web applications for real-world business and academic requirements, covering the complete development lifecycle from requirements analysis and system design to implementation, testing, and deployment.",
    highlights: [
      "Built responsive and accessible interfaces using Next.js, React, TypeScript, and Tailwind CSS.",
      "Developed RESTful backend APIs and business logic using NestJS and Node.js.",
      "Designed relational databases using PostgreSQL and Prisma ORM.",
      "Implemented authentication, authorization, validation, and role-based access control.",
      "Applied reusable architecture and component-based development to improve maintainability.",
    ],
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    project: "Full-Stack Web Applications",
    team: "Independent",
    current: true,
  },
  {
    id: "exp-3",
    role: "Full-Stack Developer",
    company: "Management System Projects",
    period: "2024 - 2025",
    type: "Project-Based",
    location: "Remote",
    description:
      "Designed and developed management systems as practical software engineering projects, applying real-world development practices across frontend, backend, database, authentication, and system architecture.",
    highlights: [
      "Developed responsive dashboards and management interfaces with reusable React and Next.js components.",
      "Created backend APIs for users, authentication, records, and business workflows.",
      "Designed normalized database schemas and relationships for structured application data.",
      "Implemented form validation, error handling, and role-based application workflows.",
      "Used Git and GitHub for source control, version management, and project organization.",
    ],
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "MySQL",
      "Git",
      "GitHub",
    ],
    project: "Management System Applications",
    team: "Individual / Academic",
  },
  {
    id: "exp-4",
    role: "Frontend Developer",
    company: "Personal & Open Source Projects",
    period: "2023 - 2024",
    type: "Development",
    location: "Remote",
    description:
      "Focused on building modern, responsive, and user-friendly web interfaces while developing a strong foundation in frontend engineering, UI implementation, and reusable component architecture.",
    highlights: [
      "Converted design concepts and UI requirements into responsive React interfaces.",
      "Created reusable components to improve consistency and development speed.",
      "Implemented responsive layouts for desktop, tablet, and mobile devices.",
      "Improved interface usability through clear navigation and consistent visual patterns.",
      "Used Git and GitHub to manage source code and development history.",
    ],
    skills: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Git",
      "GitHub",
    ],
    project: "Frontend Applications",
    team: "Individual",
  },
];