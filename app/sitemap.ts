import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/data/site-config";
import { getAllSeries } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const series = getAllSeries();

  const seriesRoutes: MetadataRoute.Sitemap = series.map((s) => ({
    url: `${siteUrl}/blog/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const chapterRoutes: MetadataRoute.Sitemap = series.flatMap((s) =>
    s.chapters.map((c) => ({
      url: `${siteUrl}/blog/${s.slug}/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }))
  );

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...projectRoutes,
    ...seriesRoutes,
    ...chapterRoutes,
  ];
}
