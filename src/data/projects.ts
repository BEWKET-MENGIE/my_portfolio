import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    slug: "nexus-analytics",
    title: "Nexus Analytics",
    category: "SaaS",
    description: "A real-time analytics platform designed for teams that need clear insights from large amounts of application data.",
    longDescription: "Nexus Analytics helps high-growth product teams aggregate, process, and visualize millions of event logs in real time. Built with performance and minimal latency in mind, it provides interactive dashboards and automated alert triggers.",
    tags: ["React", "Node.js", "PostgreSQL", "AWS"],
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    featured: true,
    demo: "https://example.com/nexus",
    source: "https://github.com/BEWKET-MENGIE/nexus-analytics",
    features: [
      "Real-time streaming data visualizer with sub-second latency.",
      "Customizable widgets with export options (CSV, JSON, PDF).",
      "Role-based access control (RBAC) and team workspaces.",
      "Automated event notification system via Webhooks and Slack."
    ],
    challenges: [
      "Processing high-volume incoming telemetry streams without dropping events during traffic bursts."
    ],
    solutions: [
      "Implemented Message Queuing with Redis and worker processes to decouple event ingestion from database writes."
    ]
  },
  {
    id: 2,
    slug: "orion-commerce",
    title: "Orion Commerce",
    category: "E-Commerce",
    description: "A modern commerce platform with product management, secure payments, inventory workflows and a high-performance storefront.",
    longDescription: "Orion Commerce is an end-to-end e-commerce solution offering headless storefront capabilities, lightning-fast product search, dynamic cart management, and seamless Stripe checkout integrations.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    demo: "https://example.com/orion",
    source: "https://github.com/BEWKET-MENGIE/orion-commerce",
    features: [
      "Headless architecture powered by Next.js App Router for instant page transitions.",
      "Integrated Stripe webhooks for secure payment processing and order status updates.",
      "Instant multi-attribute product search and filter engine."
    ],
    challenges: [
      "Preventing layout shifts and ensuring fast load times for image-heavy product galleries."
    ],
    solutions: [
      "Utilized Next.js Image optimization with responsive blur placeholders and WebP delivery."
    ]
  },
  {
    id: 3,
    slug: "pulse-health",
    title: "Pulse Health",
    category: "HealthTech",
    description: "A digital healthcare platform connecting users and service providers through scheduling, communication and secure workflows.",
    longDescription: "Pulse Health bridges the gap between patients and medical professionals with appointment booking, encrypted teleconsultation video calls, and HIPAA-compliant patient medical history logs.",
    tags: ["Vue.js", "Python", "Docker", "WebRTC"],
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    demo: "https://example.com/pulse",
    source: "https://github.com/BEWKET-MENGIE/pulse-health",
    features: [
      "Peer-to-peer encrypted video consultations using WebRTC.",
      "Interactive appointment scheduler with real-time calendar syncing.",
      "Secure document and medical record upload workflow."
    ],
    challenges: [
      "Ensuring real-time video connection stability over variable network speeds."
    ],
    solutions: [
      "Implemented dynamic bitrate adaptation and TURN/STUN server fallbacks."
    ]
  },
  {
    id: 4,
    slug: "devflow-cli",
    title: "DevFlow CLI",
    category: "Open Source",
    description: "A developer-focused command-line toolkit that simplifies project setup, Git workflows and deployment automation.",
    longDescription: "DevFlow CLI simplifies local development environments by automating boilerplate creation, staging environment provisioning, and automated release tagging.",
    tags: ["TypeScript", "Node.js", "GitHub API", "CLI"],
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    demo: "#",
    source: "https://github.com/BEWKET-MENGIE/devflow-cli",
    features: [
      "One-command workspace setup with customizable scaffolding templates.",
      "Automated semantic versioning and GitHub Release generation.",
      "Built-in interactive prompt interface for environment variable management."
    ],
    challenges: [
      "Maintaining cross-platform compatibility across Windows, macOS, and Linux terminals."
    ],
    solutions: [
      "Standardized path resolutions and OS signal handling using Node.js core abstractions."
    ]
  }
];