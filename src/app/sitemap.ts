import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { caseStudies } from "@/content/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    { path: "", priority: 1 },
    { path: "/music", priority: 0.9 },
    { path: "/data", priority: 0.9 },
    { path: "/booking", priority: 0.8 },
    { path: "/about", priority: 0.7 },
  ];

  return [
    ...routes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
    ...caseStudies.map((s) => ({
      url: `${site.url}/data/${s.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
