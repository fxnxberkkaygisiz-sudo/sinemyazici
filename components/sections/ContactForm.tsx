"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm({ endpoint }: { endpoint?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("failed");
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-up/30 bg-up/10 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-up" />
        <h3 className="mt-4 font-display text-lg font-semibold text-fg">
          Mesajınız gönderildi
        </h3>
        <p className="mt-2 text-sm text-muted">
          En kısa sürede size geri dönüş yapacağım. Teşekkürler!
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-fg placeholder:text-faint focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink/15";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-muted">
            Ad Soyad
          </label>
          <input id="name" name="name" required placeholder="Adınız" className={inputCls} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted">
            E-posta
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="ornek@eposta.com"
            className={inputCls}
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mb-1.5 block text-xs font-medium text-muted">
          Konu
        </label>
        <input id="subject" name="subject" placeholder="Konu başlığı" className={inputCls} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-muted">
          Mesajınız
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Mesajınızı yazın…"
          className={`${inputCls} resize-none`}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-ink-soft disabled:opacity-60"
      >
        {status === "loading" ? "Gönderiliyor…" : "Mesajı Gönder"}
        <Send className="h-4 w-4" />
      </button>
      {status === "error" ? (
        <p className="text-sm text-down">
          Bir hata oluştu, lütfen tekrar deneyin.
        </p>
      ) : null}
    </form>
  );
}
