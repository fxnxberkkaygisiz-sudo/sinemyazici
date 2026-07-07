"use client";

import { useState } from "react";
import Link from "next/link";
import { Info } from "lucide-react";

/**
 * Giriş / Kayıt formu — GÖRSEL amaçlıdır, gerçek kimlik doğrulama yapmaz.
 * Gönderimde hesap açmaz; yalnızca sistemin henüz aktif olmadığını bildirir.
 */
export function AuthCard({
  mode,
  siteName,
  initials,
  loginHref,
  registerHref,
}: {
  mode: "login" | "register";
  siteName: string;
  initials: string;
  loginHref: string;
  registerHref: string;
}) {
  const [notice, setNotice] = useState(false);
  const isLogin = mode === "login";

  const inputCls =
    "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-fg placeholder:text-faint focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/20";

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="card p-8 shadow-md sm:p-10">
        <div className="flex flex-col items-center text-center">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand font-display text-base font-bold text-white">
            {initials}
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink">
            {isLogin ? "Tekrar hoş geldin" : "Aramıza katıl"}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {isLogin
              ? `${siteName} hesabına giriş yap.`
              : "Birkaç adımda ücretsiz hesabını oluştur."}
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setNotice(true);
          }}
          className="mt-8 space-y-4"
        >
          {!isLogin ? (
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-muted">
                Ad Soyad
              </label>
              <input id="name" name="name" placeholder="Adınız" className={inputCls} />
            </div>
          ) : null}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted">
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ornek@eposta.com"
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-muted">
              Şifre
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className={inputCls}
            />
          </div>

          {isLogin ? (
            <div className="flex justify-end">
              <span className="cursor-default text-xs text-muted">Şifreni mi unuttun?</span>
            </div>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-deep"
          >
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </button>

          {notice ? (
            <p className="flex items-start gap-2 rounded-lg border border-accent/60 bg-accent/15 px-4 py-3 text-xs leading-relaxed text-ink">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep" />
              Üyelik sistemi şu an demo aşamasındadır; giriş/kayıt henüz aktif
              değildir. Bize ulaşmak için iletişim sayfasını kullanabilirsiniz.
            </p>
          ) : null}
        </form>

        <p className="mt-8 text-center text-sm text-muted">
          {isLogin ? "Hesabın yok mu? " : "Zaten üye misin? "}
          <Link
            href={isLogin ? registerHref : loginHref}
            className="font-semibold text-brand hover:text-brand-deep"
          >
            {isLogin ? "Kayıt ol" : "Giriş yap"}
          </Link>
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-faint">
        <Link href="/" className="hover:text-ink">
          ← Anasayfaya dön
        </Link>
      </p>
    </div>
  );
}
