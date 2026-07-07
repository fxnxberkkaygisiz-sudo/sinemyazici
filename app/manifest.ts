import type { MetadataRoute } from "next";
import { getPerson } from "@/lib/person";

export default function manifest(): MetadataRoute.Manifest {
  const { seo } = getPerson();
  return {
    name: seo.siteName,
    short_name: seo.siteName,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1a1d22",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
