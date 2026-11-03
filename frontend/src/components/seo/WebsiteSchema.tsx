import { siteConfig } from "@/lib/site";

export default function WebsiteSchema() {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} Portfolio`,
    alternateName: `${siteConfig.shortName} Portfolio`,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(website).replace(/</g, "\\u003c"),
      }}
    />
  );
}
