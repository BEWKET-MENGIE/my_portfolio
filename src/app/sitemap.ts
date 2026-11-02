import type { MetadataRoute } from "next";
import { PROFILE } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: PROFILE.url,
      changeFrequency: "weekly",
      priority: 1,
      images: [new URL(PROFILE.image, PROFILE.url).toString()],
    },
    { url: new URL("/about", PROFILE.url).toString(), changeFrequency: "monthly", priority: 0.8 },
    {
      url: new URL("/projects", PROFILE.url).toString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}