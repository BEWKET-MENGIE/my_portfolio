// src/data/projects.ts

export type ProjectStatus = "completed" | "in-progress";

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  featured: boolean;
  /** Defaults to "completed". Use "in-progress" to show an In Progress badge. */
  status?: ProjectStatus;
  /** Tailwind gradient colors for the card banner, e.g. "from-blue-600/20 via-neutral-900 to-neutral-950" */
  linear: string;
  /** GitHub repository. Use "#" if there is no repo yet: the card shows "Coming soon". */
  github: string;
  /** Screenshot in the public folder. Optional: without it the card shows its gradient. */
  image?: string;
}

/* ---------------------------------------------------------------
   ORDER MATTERS
   The home page shows the FIRST THREE projects in this list.
   Every project appears on the /projects page.
   The "More Projects" button appears automatically when there are
   more than three projects.
---------------------------------------------------------------- */
export const projects: Project[] = [
  {
    id: 1,
    title: "Full-Stack Amazon Clone",
    category: "Full Stack",
    description:
      "A complete e-commerce platform replicating core Amazon functionality, featuring a React frontend, Node/Express backend, Firebase authentication, Firestore database state, and Stripe payment integration.",
    tags: ["React", "Node.js", "Express", "Firebase", "Stripe", "Tailwind CSS"],
    featured: true,
    linear: "from-amber-500/20 via-neutral-900 to-neutral-950",
    image: "/images/projects/amazon-clone.png",
    github: "https://github.com/BEWKET-MENGIE/amazone_clone",
  },
  {
    id: 2,
    title: "Netflix Clone",
    category: "Frontend",
    description:
      "A responsive Netflix streaming application UI clone featuring dynamic movie categories, Axios API data fetching from TMDB, and Material UI styling.",
    tags: ["React", "Vite", "Axios", "Material UI"],
    featured: false,
    linear: "from-red-600/20 via-neutral-900 to-neutral-950",
    image: "/images/projects/netflix-clone.png",
    github: "https://github.com/BEWKET-MENGIE", // TODO: link the Netflix clone repository
  },
  {
    id: 5,
    title: "Apple Website Clone",
    category: "Frontend",
    description:
      "A responsive recreation of the Apple website, built to practice clean layouts, typography and product sections.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    featured: false,
    linear: "from-neutral-400/20 via-neutral-900 to-neutral-950",
    image: "/images/projects/apple-clone.png",
    github: "https://github.com/BEWKET-MENGIE",
  },
  {
    id: 4,
    title: "iPhone Calculator",
    category: "Frontend",
    description:
      "A responsive recreation of the iPhone calculator with a clean layout, smooth button interactions and accurate arithmetic operations.",
    tags: ["HTML5", "CSS3", "JavaScript"], // EDIT to match your real stack
    featured: false,
    linear: "from-orange-500/20 via-neutral-900 to-neutral-950",
     image: "/images/projects/iphone-calculator.png",
    github: "https://github.com/BEWKET-MENGIE", // TODO: link the calculator repository
  },
  /* ---------------- IN PROGRESS ---------------- */
  {
    id: 6,
    title: "Job Application Tracker",
    category: "Full Stack",
    description:
      "A tool to track job applications, interview stages, deadlines and follow-ups in one dashboard. Currently under development.",
    tags: ["React", "Node.js", "Express", "MongoDB"], // EDIT to match your real stack
    featured: false,
    status: "in-progress",
    linear: "from-violet-600/20 via-neutral-900 to-neutral-950",
     image: "/images/projects/job-tracker.png",
    github: "#", // TODO: replace with your repo link once pushed
  },
  {
    id: 7,
    title: "School Management System",
    category: "Full Stack",
    description:
      "A system to manage students, teachers, classes, attendance and grades for a school. Currently under development.",
    tags: ["React", "Node.js", "Express", "MySQL"], // EDIT to match your real stack
    featured: false,
    status: "in-progress",
    linear: "from-cyan-600/20 via-neutral-900 to-neutral-950",
    image:"/images/projects/school-management.png",
    github: "#", // TODO: replace with your repo link once pushed
  },
];