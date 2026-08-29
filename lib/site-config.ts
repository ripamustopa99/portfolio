// lib/site-config.ts
export const siteConfig = {
  name: "Ripa Mustopa A",
  brand: "ripamustopa99.dev",
  tagline: "Membangun aplikasi web yang tangguh dan pengalaman digital dengan teknologi modern.",
  url: "https://ripamustopa99.dev",
  version: "0.1.0",
  lastUpdated: "Juni 2026",
  resumeUrl: "/resume.pdf",
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/projects/", label: "Projects" },
    { href: "/notes/", label: "Notes" },
    { href: "/about/", label: "About" },
    { href: "/contact/", label: "Contact" },
  ],
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "hello@example.com",
    twitter: "https://twitter.com",
  },
};

export type SiteConfig = typeof siteConfig;
