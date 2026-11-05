// src/app/sitemap.ts
// Only list URLs that really return 200. Your site is a single page, so only
// "/" is listed. If /about or /projects become real pages, add them below.
import type { MetadataRoute } from "next";
import { siteConfig, abs } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [abs(siteConfig.image)], // image sitemap entry for your profile photo
    },
    // { url: abs("/about"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // { url: abs("/projects"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}