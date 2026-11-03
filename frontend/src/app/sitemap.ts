import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
      images: [new URL(siteConfig.image, siteConfig.url).toString()],
    },
    {
      url: new URL("/about", siteConfig.url).toString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/projects", siteConfig.url).toString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}