// components/ui/Footer.tsx
"use client";

import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/track-client";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const t = translations[language].footer;
  const navT = translations[language].nav;

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-border">
          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="text-foreground font-mono text-lg font-bold tracking-tight hover:text-accent transition-colors inline-block"
            >
              {siteConfig.brand}
            </Link>
            <p className="text-foreground-muted text-sm leading-relaxed max-w-sm">
              {language === "en"
                ? "Building robust web applications and digital experiences with modern technologies."
                : siteConfig.tagline}
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="text-xs font-mono text-foreground-muted hover:text-foreground transition-colors inline-flex items-center gap-1.5"
              >
                <span>{navT.analytics}</span>
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold">
              {t.navTitle}
            </h3>
            <ul className="space-y-2.5">
              {siteConfig.navLinks.map((link) => {
                let label = link.label;
                if (link.href === "/") label = navT.home;
                if (link.href === "/projects/") label = navT.projects;
                if (link.href === "/notes/") label = navT.notes;
                if (link.href === "/about/") label = navT.about;
                if (link.href === "/contact/") label = navT.contact;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground-muted hover:text-foreground transition-colors inline-flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Social Icons & Contact */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold">
              {t.connectTitle}
            </h3>
            <p className="text-sm text-foreground-muted">
              {t.connectDesc}
            </p>
            <div className="flex items-center gap-3 pt-1">
              {/* GitHub SVG */}
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("contact_click", "GitHub")}
                className="w-9 h-9 rounded-none bg-surface border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-accent transition-all duration-200"
                aria-label="GitHub"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>

              {/* LinkedIn SVG */}
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("contact_click", "LinkedIn")}
                className="w-9 h-9 rounded-none bg-surface border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-accent transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Twitter SVG */}
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-none bg-surface border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-accent transition-all duration-200"
                aria-label="Twitter"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Email */}
              <a
                href={`mailto:${siteConfig.social.email}`}
                onClick={() => trackEvent("contact_click", "Email")}
                className="w-9 h-9 rounded-none bg-surface border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-accent transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Version, Last Updated */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground-muted font-mono">
          <div>
            © {currentYear} {siteConfig.name}. {t.allRights}
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded-none bg-surface border border-border text-[11px]">
              v{siteConfig.version}
            </span>
            <span>•</span>
            <span>{t.lastUpdated}: {siteConfig.lastUpdated}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
