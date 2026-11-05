// src/components/seo/PersonSchema.tsx
// Render ONLY on the home page (it is your profile page).
import { siteConfig, socialProfiles, abs } from "@/lib/site";

export default function PersonSchema() {
  const { location, education, email } = siteConfig;
  const imageUrl = abs(siteConfig.image);

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": siteConfig.profilePageId,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: "en",
        isPartOf: { "@id": siteConfig.websiteId },
        primaryImageOfPage: { "@id": siteConfig.imageId },
        mainEntity: { "@id": siteConfig.personId },
      },
      {
        "@type": "Person",
        "@id": siteConfig.personId,
        name: siteConfig.name,
        alternateName: siteConfig.alternateNames,
        url: siteConfig.url,
        mainEntityOfPage: { "@id": siteConfig.profilePageId },
        image: {
          "@type": "ImageObject",
          "@id": siteConfig.imageId,
          url: imageUrl,
          contentUrl: imageUrl,
          caption: siteConfig.imageAlt,
          representativeOfPage: true,
        },
        jobTitle: siteConfig.jobTitle,
        description: siteConfig.description,
        knowsAbout: siteConfig.knowsAbout,
        sameAs: socialProfiles,
        ...(email && {
          email: email.startsWith("mailto:") ? email : `mailto:${email}`,
        }),
        ...(typeof location === "string" &&
          location && { homeLocation: { "@type": "Place", name: location } }),
        ...(typeof education === "string" &&
          education && {
            alumniOf: { "@type": "EducationalOrganization", name: education },
          }),
      },
    ],
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