export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  location?: string;
  description: string;
  highlights: string[];
  skills: string[];
  project?: string;
  team?: string;
  link?: string;
  projectsHref?: string;
  current?: boolean;
};

export const experienceData: ExperienceItem[] = [
  {
    id: "education",
    role: "Software Engineering Student",
    company: "Injibara University, Ethiopia",
    period: "Currently studying",
    type: "Education",
    location: "Injibara, Ethiopia",
    description:
      "Studying Software Engineering at Injibara University while building full-stack projects alongside my coursework.",
    highlights: [
      "Learning software engineering fundamentals, from programming and databases to system design.",
      "Applying coursework by building complete applications and documenting the work in my project portfolio.",
      "Using Git and GitHub to manage source code and track changes.",
    ],
    skills: ["Software Engineering", "Problem Solving", "Git", "GitHub"],
    project: "Software Engineering studies",
    current: true,
  },
  {
    id: "full-stack-projects",
    role: "Full-Stack Project Work",
    company: "Independent learning projects",
    period: "Completed projects",
    type: "Project work",
    description:
      "End-to-end applications built to explore how frontend interfaces, server-side logic, data, and authentication work together.",
    highlights: [
      "Full-Stack Amazon Clone: built a React storefront with a Node and Express backend, Firebase authentication, Firestore, and Stripe integration.",
      "Evangadi Forum: developed a question-and-answer experience with threaded answers, JWT authentication, and a MySQL database.",
      "StaffCore Employee Management: created employee registration workflows and status tracking.",
    ],
    skills: [
      "React",
      "Node.js",
      "Express",
      "Firebase",
      "Stripe",
      "MySQL",
      "JWT",
      "Java",
      "JavaFX",
    ],
    project: "Amazon Clone, Evangadi Forum, StaffCore",
    projectsHref: "/projects",
  },
  {
    id: "frontend-projects",
    role: "Frontend Project Work",
    company: "Independent learning projects",
    period: "Completed projects",
    type: "Project work",
    description:
      "Responsive web interfaces built to develop frontend skills in layout, API integration, visual hierarchy, and reusable UI.",
    highlights: [
      "Netflix Clone: built a responsive streaming interface with movie categories, TMDB data fetched using Axios, and Material UI styling.",
      "Apple Website Clone: recreated responsive product pages with a focus on clear layouts and typography.",
    ],
    skills: [
      "React",
      "Vite",
      "Axios",
      "Material UI",
      "HTML5",
      "CSS3",
      "JavaScript",
    ],
    project: "Netflix Clone, Apple Website Clone",
    projectsHref: "/projects",
  },
  {
    id: "current-builds",
    role: "Current Builds",
    company: "Independent learning projects",
    period: "In progress",
    type: "In progress",
    description:
      "Continuing to learn by designing and building tools around real organizational needs.",
    highlights: [
      "Job Application Tracker: exploring a clear way to organize applications and follow their progress.",
      "School Management System: developing a concept for managing school records such as students, teachers, and classes.",
    ],
    skills: [],
    project: "Job Application Tracker, School Management System",
    projectsHref: "/projects",
    current: true,
  },
];
