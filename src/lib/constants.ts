export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  location: string;
}

export const SITE_CONFIG: SiteConfig = {
  name: "Bewket Mengie",
  title: "Full Stack Developer",
  description: "Fourth-year Software Engineering student and Full Stack Developer building robust web applications.",
  url: "https://yourportfolio.com",
  email: "mengiebewket@gmail.com",
  phone: "+251 918410399",
  location: "Injibara University, Injibara, Ethiopia",
};

export const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];