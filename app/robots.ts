import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/person";

/**
 * https://sinemyazici.com.tr/robots.txt
 * Not: /giris ve /kayit sayfaları kaldırıldı. Silinen sayfalar robots.txt ile
 * engellenmez — engellenirse Google 404'ü göremez ve URL'ler dizinde asılı
 * kalır. Doğru sinyal, sayfanın taranıp 404 döndürmesidir.
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
