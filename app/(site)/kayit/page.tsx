import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AuthCard } from "@/components/auth/AuthCard";
import { getPerson } from "@/lib/person";

export const metadata: Metadata = {
  title: "Kayıt Ol",
  description: "Sinem Yazıcı topluluğuna ücretsiz katılın.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/kayit" },
};

export default function RegisterPage() {
  const { seo, profile, auth } = getPerson();
  const initials = `${profile.firstName[0]}${profile.lastName[0]}`;

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-panel py-16">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(45%_40%_at_50%_0%,rgba(26,29,34,0.05),transparent)]" />
      <Container className="relative">
        <AuthCard
          mode="register"
          siteName={seo.siteName}
          initials={initials}
          loginHref={auth.loginHref}
          registerHref={auth.registerHref}
        />
      </Container>
    </section>
  );
}
