// components/ui/Footer.tsx
import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-foreground-muted text-sm">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="https://github.com"
            target="_blank"
            className="text-foreground-muted hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            {/* <Github size={18} /> */}@
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="text-foreground-muted hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            {/* <Linkedin size={18} /> */}@
          </Link>
          <Link
            href="mailto:hello@example.com"
            className="text-foreground-muted hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
