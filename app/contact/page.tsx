// app/contact/page.tsx
import ContactForm from "@/components/sections/ContactForm";
import { getLang } from "@/lib/get-lang";

export async function generateMetadata() {
  const lang = await getLang();
  return {
    title: lang === "en" ? "Contact — Ripa Mustopa A" : "Kontak — Ripa Mustopa A",
    description: lang === "en" ? "Get in touch for opportunities, collaborations, or just to say hello." : "Hubungi saya untuk peluang, kolaborasi, atau sekadar menyapa.",
  };
}

export default function ContactPage() {
  return <ContactForm />;
}
