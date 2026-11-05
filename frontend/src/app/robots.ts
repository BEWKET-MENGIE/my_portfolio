// src/app/robots.ts
import type { MetadataRoute } from "next";
import { siteConfig, abs } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/", // keeps images (profile photo) crawlable
      disallow: ["/admin", "/api/"],
    },
    sitemap: abs("/sitemap.xml"),
    host: siteConfig.url,
  };
}