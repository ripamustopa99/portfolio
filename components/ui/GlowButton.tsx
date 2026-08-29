// components/ui/GlowButton.tsx
"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface GlowButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
}

export default function GlowButton({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: GlowButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-none transition-all duration-200",
    variant === "primary"
      ? "bg-foreground text-background hover:bg-foreground/90"
      : "border border-border bg-background hover:border-accent hover:shadow-[0_0_30px_-5px_rgba(56,189,248,0.2)]",
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseStyles}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={baseStyles}>
      {children}
    </Link>
  );
}
