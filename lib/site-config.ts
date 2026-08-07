// lib/site-config.ts
export const siteConfig = {
  name: "Your Name",
  brand: "yourname.dev",
  tagline: "Building robust web applications and digital experiences with modern technologies.",
  url: "https://yourname.dev",
  version: "0.1.0",
  lastUpdated: "June 2026",
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
