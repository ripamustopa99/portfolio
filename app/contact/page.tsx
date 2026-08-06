// app/contact/page.tsx
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowButton from "@/components/ui/GlowButton";
import { Mail } from "lucide-react";

export const metadata = {
  title: "Contact — Your Name",
  description:
    "Get in touch for opportunities, collaborations, or just to say hello.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 min-h-[80vh] flex items-center">
      <div className="container-custom max-w-[720px] text-center">
        <ScrollReveal>
          <p className="font-mono text-sm text-accent mb-6">GET IN TOUCH</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let&apos;s work together
          </h1>
          <p className="text-lg text-foreground-muted mb-12 max-w-lg mx-auto">
            I&apos;m currently open for new opportunities and interesting
            projects. If you have something in mind, let&apos;s talk.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <GlowButton href="mailto:hello@example.com" variant="primary">
              <Mail size={18} className="mr-2" />
              hello@example.com
            </GlowButton>
            <GlowButton href="https://github.com" external variant="secondary">
              {/* <Github size={18} className="mr-2" /> */}@ GitHub
            </GlowButton>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="pt-12 border-t border-border">
            <p className="text-sm text-foreground-subtle mb-4">Or find me on</p>
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors text-sm"
              >
                {/* <Linkedin size={16} /> */}@ LinkedIn
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
