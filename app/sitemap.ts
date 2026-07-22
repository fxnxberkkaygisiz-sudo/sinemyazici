import type { MetadataRoute } from "next";
import { getPerson, siteUrl } from "@/lib/person";

/**
 * https://sinemyazici.com.tr/sitemap.xml
 * Sayfa listesi person.json > sitemap alanından yönetilir.
 * İlgili sayfaların görselleri de <image:image> olarak yayınlanır — bu sayede
 * eğitim/medya kareleri Google Görseller'de sayfayla ilişkilendirilir.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const { sitemap: pages, media, gallery, education, profile } = getPerson();
  const base = siteUrl();
  const lastModified = new Date();

  const abs = (src: string) => (src.startsWith("http") ? src : `${base}${src}`);

  /** Hangi sayfada hangi görsellerin listeleneceği. */
  const imagesByPath: Record<string, string[]> = {
    "/": [profile.avatar, ...gallery.images.slice(0, 6).map((i) => i.src)],
    "/medya": media.images.map((i) => i.src),
    "/egitim": education.items.map((i) => i.image),
    "/sinem-yazici-kimdir": [
      profile.avatar,
      ...education.items.map((i) => i.image),
    ],
  };

  return pages.map((page) => {
    const images = [
      ...new Set((imagesByPath[page.path] ?? []).filter(Boolean).map(abs)),
    ];

    return {
      url: `${base}${page.path === "/" ? "" : page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      ...(images.length ? { images } : {}),
    };
  });
}
