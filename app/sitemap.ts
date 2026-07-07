import type { MetadataRoute } from "next";
import { getPerson } from "@/lib/person";

export default function sitemap(): MetadataRoute.Sitemap {
  const { seo } = getPerson();
  const base = seo.url.replace(/\/$/, "");

  return ["", "/sinem-yazici-kimdir", "/iletisim"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
