import { Home, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(45%_40%_at_50%_35%,rgba(31,90,99,0.08),transparent)]" />
      <Container className="relative text-center">
        <p className="font-display text-7xl font-extrabold tracking-tight text-brand sm:text-8xl">
          404
        </p>
        <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Sayfa bulunamadı
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">
            <Home className="h-4 w-4" />
            Anasayfaya dön
          </Button>
          <Button href="/#paylasimlar" variant="outline">
            Paylaşımlara göz at
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
