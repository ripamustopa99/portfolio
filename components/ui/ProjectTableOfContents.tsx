// components/ui/ProjectTableOfContents.tsx
"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  title: string;
}

interface Props {
  contentSelector?: string;
  title?: string;
  minHeadings?: number;
  onHasHeadings?: (hasHeadings: boolean) => void;
}

export default function ProjectTableOfContents({
  contentSelector = ".prose",
  title = "Daftar Isi",
  minHeadings = 2,
  onHasHeadings,
}: Props) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const container = document.querySelector(contentSelector);
    if (!container) return;

    const h2Elements = container.querySelectorAll("h2");
    const items: TocItem[] = [];

    h2Elements.forEach((h2, index) => {
      const text = h2.textContent || `section-${index}`;
      let id = h2.id;
      if (!id) {
        id = text
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
        h2.id = id;
      }
      items.push({ id, title: text });
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(items);
    const hasEnough = items.length >= minHeadings;
    if (onHasHeadings) {
      onHasHeadings(hasEnough);
    }

    if (items.length > 0) {
      setActiveId(items[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0% -60% 0%" }
    );

    h2Elements.forEach((h2) => observer.observe(h2));

    return () => {
      observer.disconnect();
    };
  }, [contentSelector, minHeadings, onHasHeadings]);

  if (headings.length < minHeadings) return null;

  return (
    <nav className="space-y-3 pr-4">
      <p className="font-mono text-xs uppercase tracking-wider text-accent mb-4">
        {title}
      </p>
      <ul className="space-y-2 border-l border-border/60 pl-4">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(heading.id);
                  if (el) {
                    const yOffset = -100;
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                    setActiveId(heading.id);
                  }
                }}
                className={`text-sm transition-all block py-1 font-mono ${
                  isActive
                    ? "text-accent font-semibold pl-1"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {heading.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
