import type { MetadataRoute } from "next";
import { getPerson } from "@/lib/person";

export default function robots(): MetadataRoute.Robots {
  const { seo } = getPerson();
  const base = seo.url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/giris", "/kayit"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
