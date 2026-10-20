// src/components/hero/SocialLinks.tsx
"use client";

import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/BEWKET-MENGIE",
    Icon: FaGithub,
    external: true,
  },
  {
    label: "LinkedIn",
    // TODO: replace with your real LinkedIn profile URL.
    href: "https://linkedin.com/in/yourusername",
    Icon: FaLinkedin,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:mengiebewket@gmail.com",
    Icon: Mail,
    external: false,
  },
];

/* A horizontal row of social icons. Where it sits is decided by the parent
   (HeroContent) through `className`, so this file only describes the row. */
export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <nav
      aria-label="Social links"
      className={`flex flex-row items-center gap-3 ${className}`}
    >
      {links.map(({ label, href, Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700/50 bg-neutral-900/40 text-neutral-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-(--accent) hover:text-(--accent-light) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <Icon
            size={18}
            className="transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
          />
        </a>
      ))}
    </nav>
  );
}