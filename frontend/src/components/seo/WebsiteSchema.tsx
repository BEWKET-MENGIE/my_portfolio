// src/components/seo/WebsiteSchema.tsx
import { siteConfig } from "@/lib/site";

export default function WebsiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteConfig.websiteId,
    name: `${siteConfig.name} Portfolio`,
    alternateName: [siteConfig.name, `${siteConfig.shortName} Portfolio`],
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": siteConfig.personId },
    author: { "@id": siteConfig.personId },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}