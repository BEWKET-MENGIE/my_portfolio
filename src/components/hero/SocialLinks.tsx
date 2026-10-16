"use client";

import React from "react";
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

export default function SocialLinks() {
  return (
    // `absolute` keeps the icons inside the hero (the <section> is `relative`).
    // Change to `fixed` if you want them to follow the user down the page.
    <nav
      aria-label="Social links"
      className="absolute bottom-7 right-6 z-30 hidden flex-col items-center gap-4 md:flex lg:right-10"
    >
      {links.map(({ label, href, Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700/50 bg-neutral-900/40 text-neutral-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
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