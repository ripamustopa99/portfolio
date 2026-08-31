// app/not-found.tsx
import GlowButton from "@/components/ui/GlowButton";
import { getLang } from "@/lib/get-lang";
import { translations } from "@/lib/translations";

export async function generateMetadata() {
  const lang = await getLang();
  return {
    title: lang === "en" ? "404 — Page Not Found" : "404 — Halaman Tidak Ditemukan",
  };
}

export default async function NotFound() {
  const lang = await getLang();
  const t = translations[lang as "en" | "id"].notFound;
  const navT = translations[lang as "en" | "id"].nav;

  return (
    <div className="pt-32 pb-24 min-h-[80vh] flex items-center">
      <div className="container-custom text-center max-w-lg">
        <p className="font-mono text-sm text-accent mb-4">404</p>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {t.title}
        </h1>
        <p className="text-foreground-muted mb-8">
          {t.desc}
        </p>
        <GlowButton href="/" variant="secondary">
          {navT.home}
        </GlowButton>
      </div>
    </div>
  );
}
