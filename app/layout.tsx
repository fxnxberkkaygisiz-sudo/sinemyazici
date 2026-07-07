import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { getPerson } from "@/lib/person";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

// Başlıklar — dostane, yuvarlak geometrik sans
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export function generateMetadata(): Metadata {
  const { seo, profile } = getPerson();
  return {
    metadataBase: new URL(seo.url),
    title: {
      default: seo.titleDefault,
      template: seo.titleTemplate,
    },
    description: seo.description,
    keywords: seo.keywords,
    applicationName: seo.siteName,
    authors: [{ name: profile.fullName, url: seo.url }],
    creator: profile.fullName,
    publisher: profile.fullName,
    category: "finance",
    alternates: { canonical: "/" },
    formatDetection: { telephone: false, email: false, address: false },
    manifest: "/manifest.webmanifest",
    openGraph: {
      type: "website",
      locale: seo.locale,
      url: seo.url,
      siteName: seo.siteName,
      title: seo.titleDefault,
      description: seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.titleDefault,
      description: seo.description,
      creator: seo.twitterHandle || undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen bg-bg text-fg antialiased">{children}</body>
    </html>
  );
}
