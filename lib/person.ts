import { z } from "zod";
import personJson from "@/person.json";

/* ------------------------------------------------------------------
   person.json — TEK veri kaynağı.
   Bu dosya Zod ile valide edilir; tüm site verisi buradan (getPerson)
   okunur. Hiçbir bileşen person.json'ı doğrudan import etmemeli.
------------------------------------------------------------------- */

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const personSchema = z.object({
  profile: z.object({
    firstName: z.string(),
    lastName: z.string(),
    fullName: z.string(),
    title: z.string(),
    tagline: z.string(),
    shortBio: z.string(),
    location: z.string(),
    yearsOfExperience: z.number(),
    avatar: z.string(),
    coverImage: z.string().optional().default(""),
    resumeUrl: z.string().optional().default(""),
    availableForWork: z.boolean().optional().default(false),
    availabilityText: z.string().optional().default(""),
    languages: z.array(z.string()).default([]),
  }),
  seo: z.object({
    siteName: z.string(),
    titleDefault: z.string(),
    titleTemplate: z.string(),
    description: z.string(),
    keywords: z.array(z.string()).default([]),
    ogImage: z.string().optional().default(""),
    url: z.string(),
    locale: z.string().optional().default("tr_TR"),
    twitterHandle: z.string().optional().default(""),
  }),
  theme: z
    .object({
      accent: z.string().optional(),
      positive: z.string().optional(),
      mode: z.enum(["dark", "light"]).optional().default("dark"),
    })
    .optional()
    .default({ mode: "dark" }),
  hero: z
    .object({
      eyebrow: z.string().optional().default(""),
      primaryCta: linkSchema.optional(),
      secondaryCta: linkSchema.optional(),
    })
    .optional()
    .default({}),
  stats: z
    .array(
      z.object({
        label: z.string(),
        value: z.number(),
        suffix: z.string().optional().default(""),
        prefix: z.string().optional().default(""),
      })
    )
    .default([]),
  expertise: z.array(z.string()).default([]),
  about: z
    .object({
      heading: z.string().optional().default(""),
      body: z.array(z.string()).default([]),
      highlights: z.array(z.string()).default([]),
    })
    .optional()
    .default({}),
  experience: z
    .array(
      z.object({
        role: z.string(),
        org: z.string(),
        period: z.string(),
        description: z.string().optional().default(""),
      })
    )
    .default([]),
  certifications: z
    .array(
      z.object({
        name: z.string(),
        issuer: z.string(),
        year: z.number(),
      })
    )
    .default([]),
  achievements: z
    .array(
      z.object({
        title: z.string(),
        description: z.string().optional().default(""),
      })
    )
    .default([]),
  services: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional().default("sparkles"),
      })
    )
    .default([]),
  markets: z
    .array(
      z.object({
        symbol: z.string(),
        label: z.string(),
      })
    )
    .default([]),
  testimonials: z
    .array(
      z.object({
        name: z.string(),
        role: z.string().optional().default(""),
        quote: z.string(),
        avatar: z.string().optional().default(""),
      })
    )
    .default([]),
  faq: z
    .array(
      z.object({
        q: z.string(),
        a: z.string(),
      })
    )
    .default([]),
  socials: z
    .array(
      z.object({
        platform: z.string(),
        url: z.string(),
        handle: z.string().optional().default(""),
      })
    )
    .default([]),
  contact: z
    .object({
      email: z.string().optional().default(""),
      phone: z.string().optional().default(""),
      address: z.string().optional().default(""),
      mapEmbedUrl: z.string().optional().default(""),
      formEndpoint: z.string().optional().default(""),
    })
    .optional()
    .default({}),
  newsletter: z
    .object({
      heading: z.string().optional().default(""),
      description: z.string().optional().default(""),
      telegramUrl: z.string().optional().default(""),
      buttonLabel: z.string().optional().default("Telegram Kanalına Abone Ol"),
    })
    .optional()
    .default({}),
  feed: z
    .object({
      twitterHandle: z.string().optional().default(""),
      heading: z.string().optional().default("Güncel paylaşımlar"),
      description: z.string().optional().default(""),
    })
    .optional()
    .default({}),
  auth: z
    .object({
      loginLabel: z.string().optional().default("Giriş Yap"),
      loginHref: z.string().optional().default("/giris"),
      registerLabel: z.string().optional().default("Kayıt Ol"),
      registerHref: z.string().optional().default("/kayit"),
    })
    .optional()
    .default({}),
  brokers: z
    .object({
      heading: z.string().optional().default(""),
      description: z.string().optional().default(""),
      items: z
        .array(
          z.object({
            name: z.string(),
            logo: z.string().optional().default(""),
            description: z.string().optional().default(""),
            registerLabel: z.string().optional().default("Kayıt Ol"),
            registerHref: z.string().optional().default(""),
          })
        )
        .default([]),
    })
    .optional()
    .default({}),
  education: z
    .object({
      heading: z.string().optional().default(""),
      description: z.string().optional().default(""),
      items: z
        .array(
          z.object({
            image: z.string(),
            title: z.string(),
            date: z.string().optional().default(""),
            description: z.string().optional().default(""),
          })
        )
        .default([]),
    })
    .optional()
    .default({}),
  gallery: z
    .object({
      heading: z.string().optional().default(""),
      description: z.string().optional().default(""),
      images: z
        .array(
          z.object({
            src: z.string(),
            caption: z.string().optional().default(""),
            href: z.string().optional().default(""),
            tall: z.boolean().optional().default(false),
          })
        )
        .default([]),
    })
    .optional()
    .default({}),
  media: z
    .object({
      heading: z.string().optional().default(""),
      description: z.string().optional().default(""),
      images: z
        .array(
          z.object({
            src: z.string(),
            caption: z.string().optional().default(""),
            href: z.string().optional().default(""),
          })
        )
        .default([]),
    })
    .optional()
    .default({}),
  liveBroadcast: z
    .object({
      eyebrow: z.string().optional().default("Canlı Yayın"),
      badge: z.string().optional().default("Canlı Yayın"),
      subtitle: z.string().optional().default(""),
      title: z.string().optional().default(""),
      date: z.string().optional().default(""),
      time: z.string().optional().default(""),
      platform: z.string().optional().default(""),
      description: z.string().optional().default(""),
      poster: z.string().optional().default(""),
      ctaLabel: z.string().optional().default("İzle"),
      ctaHref: z.string().optional().default(""),
    })
    .optional()
    .default({}),
  navigation: z.array(linkSchema).default([]),
  legal: z
    .object({
      disclaimer: z.string().optional().default(""),
      copyright: z.string().optional().default(""),
    })
    .optional()
    .default({}),
  sections: z.record(z.string(), z.boolean()).default({}),
});

export type Person = z.infer<typeof personSchema>;
export type SocialLink = Person["socials"][number];
export type NavLink = Person["navigation"][number];
export type Service = Person["services"][number];
export type Stat = Person["stats"][number];

let cached: Person | null = null;

/**
 * person.json'ı valide ederek döndürür (build-time cache'li).
 * Hatalı/eksik veri build'i anlamlı bir mesajla durdurur.
 */
export function getPerson(): Person {
  if (cached) return cached;
  const parsed = personSchema.safeParse(personJson);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  • ${i.path.join(".") || "(kök)"}: ${i.message}`)
      .join("\n");
    throw new Error(
      `person.json doğrulanamadı. Lütfen aşağıdaki alanları düzeltin:\n${issues}`
    );
  }
  cached = parsed.data;
  return cached;
}

/** Belirli bir bölümün açık olup olmadığını döndürür (varsayılan: açık). */
export function isSectionEnabled(key: string): boolean {
  const { sections } = getPerson();
  return sections[key] !== false;
}
