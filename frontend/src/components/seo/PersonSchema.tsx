import { siteConfig, socialProfiles } from "@/lib/site";

export default function PersonSchema() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    image: new URL(siteConfig.image, siteConfig.url).toString(),
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.description,
    email: siteConfig.email,
    sameAs: socialProfiles,
    knowsAbout: [
      "Full Stack Development",
      "Software Engineering",
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Web Development",
    ],
    affiliation: {
      "@type": "EducationalOrganization",
      name: siteConfig.education,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(person).replace(/</g, "\\u003c"),
      }}
    />
  );
}