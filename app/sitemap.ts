import type { MetadataRoute } from "next";

const siteUrl = "https://wc26.solalab.cn";

const routes = ["", "/schedule", "/predictions", "/export", "/stats"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8
  }));
}
