import type { CSSProperties } from "react";
import { siteConfig } from "@/lib/site";

type SocialIconProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};

function GithubIcon({
  size = 24,
  className,
  style,
}: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function InstagramIcon({
  size = 24,
  className,
  style,
}: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({
  size = 24,
  className,
  style,
}: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={style}
    >
      <path d="M24 12a12 12 0 1 0-13.875 11.85v-8.38H7.078V12h3.047V9.356c0-3.007 1.792-4.669 4.532-4.669 1.313 0 2.686.235 2.686.235v2.953h-1.513c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.47h-2.796v8.38A12 12 0 0 0 24 12Z" />
    </svg>
  );
}

function TelegramIcon({
  size = 24,
  className,
  style,
}: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={style}
    >
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path
        fill="white"
        d="m19.78 4.21-17.7 4.65c-.3.08-.31.5-.02.62l4.8 1.87 2.02 6.68c.08.27.44.35.63.14l2.82-3.31 4.92 3.34c.25.17.6.02.66-.28l2.39-13.11c.06-.32-.23-.62-.52-.52ZM8.1 11.12l8.99-5.56c.14-.09.3.11.17.22l-7.22 6.39-.3 4.13-1.65-5.18Z"
      />
    </svg>
  );
}

const profiles = [
  { key: "github", label: "GitHub", icon: GithubIcon, color: "#f8fafc" },
  { key: "instagram", label: "Instagram", icon: InstagramIcon, color: "#e4405f" },
  { key: "telegram", label: "Telegram", icon: TelegramIcon, color: "#26a5e4" },
  { key: "facebook", label: "Facebook", icon: FacebookIcon, color: "#1877f2" },
] as const;

type SocialLinksProps = {
  className?: string;
  variant?: "hero" | "footer";
};

export default function SocialLinks({
  className = "",
  variant = "hero",
}: SocialLinksProps) {
  const isFooter = variant === "footer";

  return (
    <nav
      aria-label="Social links"
      className={`${isFooter ? "flex flex-wrap justify-center gap-2" : "flex flex-row items-center gap-3"} ${className}`}
    >
      {profiles
        .filter(({ key }) => Boolean(siteConfig.socialLinks[key]?.trim()))
        .map(({ key, label, icon: Icon, color }) => (
          <a
            key={key}
            href={siteConfig.socialLinks[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit my ${label}`}
            title={label}
            className={
              isFooter
                ? "group flex h-9 w-9 items-center justify-center rounded-lg border border-(--border) bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-(--border-bright) hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
                : "group flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700/50 bg-neutral-900/40 text-neutral-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-(--accent) hover:text-(--accent-light) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            }
          >
            <Icon
              aria-hidden="true"
              size={isFooter ? 16 : 18}
              className="transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
              style={isFooter ? { color } : undefined}
            />
          </a>
        ))}
    </nav>
  );
}
