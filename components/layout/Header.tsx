"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { NavLink, Person } from "@/lib/person";

export function Header({
  siteName,
  brandText,
  nav,
  auth,
}: {
  siteName: string;
  brandText: string;
  nav: NavLink[];
  auth: Person["auth"];
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : href.startsWith("/#")
        ? false
        : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-hairline bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-white"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label={siteName}>
          {/* <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand font-display text-sm font-bold text-white">
            {initials(siteName)}
          </span> */}
          <span className="font-display text-[1.1rem] font-bold tracking-tight text-ink">
            {brandText}
          </span>
        </Link>

        {/* Masaüstü menü */}
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors",
                isActive(item.href)
                  ? "font-semibold text-brand"
                  : "text-muted hover:text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1.5 lg:flex">
          <Link
            href={auth.loginHref}
            className="rounded-lg px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-brand"
          >
            {auth.loginLabel}
          </Link>
          <Button href={auth.registerHref} size="md">
            {auth.registerLabel}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-md border border-border text-ink lg:hidden"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {/* Mobil menü */}
      <div
        className={cn(
          "overflow-hidden border-hairline bg-white transition-all duration-300 lg:hidden",
          open ? "max-h-96 border-b" : "max-h-0"
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-4 py-3 text-base transition-colors",
                isActive(item.href)
                  ? "bg-panel font-semibold text-brand"
                  : "text-muted hover:bg-panel hover:text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              href={auth.loginHref}
              className="rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
            >
              {auth.loginLabel}
            </Link>
            <Button href={auth.registerHref} size="md" className="w-full">
              {auth.registerLabel}
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
