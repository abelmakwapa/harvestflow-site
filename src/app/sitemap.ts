import type { MetadataRoute } from "next";
import { CANONICAL_ROUTES, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return CANONICAL_ROUTES.filter((path) => !path.startsWith("/company/press")).map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    changeFrequency: path === "/" ? "weekly" : path.includes("press") || path.includes("blog") ? "monthly" : "yearly",
    priority: path === "/" ? 1 : path.split("/").filter(Boolean).length === 1 ? 0.8 : 0.6,
  }));
}
