// components/ui/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X, FileText, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/track-client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects/", label: "Projects" },
  { href: "/notes/", label: "Notes" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

const headerVariants: Variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  hidden: {
    y: -100,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state for glassmorphism and height adjustment
      setIsScrolled(currentScrollY > 20);

      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
        setMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        variants={headerVariants}
        animate={isVisible ? "visible" : "hidden"}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm py-3.5"
            : "bg-transparent border-transparent py-5"
        )}
      >
        <div className="container-custom flex items-center justify-between">
          <Link
            href="/"
            className="text-foreground font-mono text-sm tracking-tight hover:text-accent transition-colors font-bold"
          >
            {siteConfig.brand}
          </Link>

          {/* Desktop Navigation & Resume Button */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors duration-200 relative",
                      pathname === link.href
                        ? "text-foreground"
                        : "text-foreground-muted hover:text-foreground",
                    )}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pl-4 border-l border-border">
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("resume_download")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-none bg-surface border border-border text-xs font-medium text-foreground hover:border-accent hover:text-accent transition-all duration-200 shadow-sm"
              >
                <FileText size={13} />
                <span>Resume</span>
                <ArrowUpRight size={11} className="text-foreground-muted" />
              </a>
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-none text-foreground-muted hover:text-foreground hover:bg-surface transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-16 z-40 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 top-0 h-[100vh] bg-background/80 backdrop-blur-md pointer-events-auto"
            />

            {/* Drawer Content */}
            <motion.div
              ref={menuRef}
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full bg-background/95 backdrop-blur-xl border-b border-border px-6 py-6 shadow-2xl overflow-hidden z-50"
            >
              <ul className="flex flex-col gap-2 pb-6 border-b border-border">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block py-3 text-base font-medium transition-colors rounded-none px-3",
                        pathname === link.href
                          ? "text-foreground bg-surface font-semibold"
                          : "text-foreground-muted hover:text-foreground hover:bg-surface/50",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile Resume Button */}
              <div className="pt-6">
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent("resume_download");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-none bg-surface border border-border text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-all duration-200 shadow-sm"
                >
                  <FileText size={16} />
                  <span>Download Resume</span>
                  <ArrowUpRight size={14} className="text-foreground-muted" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
