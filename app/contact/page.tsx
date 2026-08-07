// app/contact/page.tsx
import ContactForm from "@/components/sections/ContactForm";

export const metadata = {
  title: "Contact — Your Name",
  description:
    "Get in touch for opportunities, collaborations, or just to say hello.",
};

export default function ContactPage() {
  return <ContactForm />;
}
