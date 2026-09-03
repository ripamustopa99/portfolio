// components/ui/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X, FileText, ArrowUpRight, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/track-client";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

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
  const { language, setLanguage } = useLanguage();
  const t = translations[language].nav;

  const navLinks = [
    { href: "/", label: t.home },
    { href: "/projects/", label: t.projects },
    { href: "/notes/", label: t.notes },
    { href: "/about/", label: t.about },
    { href: "/contact/", label: t.contact },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
        setMobileMenuOpen(false);
        setLangDropdownOpen(false);
        setMobileLangOpen(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (mobileLangRef.current && !mobileLangRef.current.contains(event.target as Node)) {
        setMobileLangOpen(false);
      }
    };

    if (mobileMenuOpen || langDropdownOpen || mobileLangOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen, langDropdownOpen, mobileLangOpen]);

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

          {/* Desktop Navigation, Language Switcher & Resume Button */}
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

            <div className="pl-4 border-l border-border flex items-center gap-3">
              {/* Custom Language Selector Dropdown on the Left of Resume */}
              <div className="relative" ref={langRef}>
                <button
                  type="button"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="inline-flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-none bg-surface border border-border text-xs font-mono font-medium text-foreground hover:border-accent focus:border-accent focus:outline-none transition-all duration-200 shadow-sm cursor-pointer uppercase"
                  aria-label="Select Language"
                >
                  <Globe size={13} className="text-accent" />
                  <span>{language}</span>
                  <motion.span
                    animate={{ rotate: langDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[10px] text-foreground-muted ml-0.5"
                  >
                    ▼
                  </motion.span>
                </button>

                <AnimatePresence>
                  {langDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-1.5 w-36 bg-background/95 backdrop-blur-xl border border-border shadow-xl z-50 overflow-hidden"
                    >
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => {
                            setLanguage("en");
                            setLangDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2 text-xs font-mono text-left transition-colors",
                            language === "en"
                              ? "bg-accent/10 text-accent font-semibold"
                              : "text-foreground hover:bg-surface"
                          )}
                        >
                          <span className="whitespace-nowrap">English (EN)</span>
                          {language === "en" && <span className="text-accent text-[10px]">✓</span>}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setLanguage("id");
                            setLangDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2 text-xs font-mono text-left transition-colors",
                            language === "id"
                              ? "bg-accent/10 text-accent font-semibold"
                              : "text-foreground hover:bg-surface"
                          )}
                        >
                          <span className="whitespace-nowrap">Indonesia (ID)</span>
                          {language === "id" && <span className="text-accent text-[10px]">✓</span>}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Resume Button */}
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("resume_download")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-none bg-surface border border-border text-xs font-medium text-foreground hover:border-accent hover:text-accent transition-all duration-200 shadow-sm"
              >
                <FileText size={13} />
                <span>{t.resume}</span>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 top-0 h-[100vh] bg-background/80 backdrop-blur-md pointer-events-auto"
            />

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

              {/* Mobile Language Selector & Resume */}
              <div className="pt-6 flex items-center gap-3">
                <div className="relative flex-1" ref={mobileLangRef}>
                  <button
                    type="button"
                    onClick={() => setMobileLangOpen(!mobileLangOpen)}
                    className="w-full flex items-center justify-between px-3 py-3 rounded-none bg-surface border border-border text-xs font-mono font-medium text-foreground hover:border-accent focus:border-accent focus:outline-none transition-all duration-200 shadow-sm cursor-pointer uppercase"
                    aria-label="Select Language"
                  >
                    <div className="flex items-center gap-2">
                      <Globe size={14} className="text-accent" />
                      <span>{language === "en" ? "English (EN)" : "Indonesia (ID)"}</span>
                    </div>
                    <motion.span
                      animate={{ rotate: mobileLangOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[10px] text-foreground-muted"
                    >
                      ▼
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {mobileLangOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute bottom-full left-0 right-0 mb-1.5 bg-background/95 backdrop-blur-xl border border-border shadow-xl z-50 overflow-hidden"
                      >
                        <div className="py-1">
                          <button
                            type="button"
                            onClick={() => {
                              setLanguage("en");
                              setMobileLangOpen(false);
                              setMobileMenuOpen(false);
                            }}
                            className={cn(
                              "w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono text-left transition-colors",
                              language === "en"
                                ? "bg-accent/10 text-accent font-semibold"
                                : "text-foreground hover:bg-surface"
                            )}
                          >
                            <span className="whitespace-nowrap">English (EN)</span>
                            {language === "en" && <span className="text-accent text-[10px]">✓</span>}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setLanguage("id");
                              setMobileLangOpen(false);
                              setMobileMenuOpen(false);
                            }}
                            className={cn(
                              "w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono text-left transition-colors",
                              language === "id"
                                ? "bg-accent/10 text-accent font-semibold"
                                : "text-foreground hover:bg-surface"
                            )}
                          >
                            <span className="whitespace-nowrap">Indonesia (ID)</span>
                            {language === "id" && <span className="text-accent text-[10px]">✓</span>}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent("resume_download");
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-none bg-surface border border-border text-xs font-medium text-foreground hover:border-accent hover:text-accent transition-all duration-200 shadow-sm"
                >
                  <FileText size={15} />
                  <span>{t.resume}</span>
                  <ArrowUpRight size={13} className="text-foreground-muted" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
