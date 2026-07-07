import { ImageResponse } from "next/og";
import { getPerson } from "@/lib/person";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sinem Yazıcı — Profesyonel Borsacı & Yatırım Stratejisti";

export default async function OpengraphImage() {
  const { profile, seo } = getPerson();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#1a1d22",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            {profile.firstName[0]}
            {profile.lastName[0]}
          </div>
          <div style={{ fontSize: 26, opacity: 0.85 }}>
            {seo.url.replace(/^https?:\/\//, "")}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, opacity: 0.8, marginBottom: 12 }}>
            {profile.title}
          </div>
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: -2 }}>
            {profile.fullName}
          </div>
          <div style={{ fontSize: 30, opacity: 0.82, marginTop: 20, maxWidth: 900 }}>
            {profile.tagline}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
