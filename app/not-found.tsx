// app/not-found.tsx
// import Link from "next/link";
import GlowButton from "@/components/ui/GlowButton";

export const metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <div className="pt-32 pb-24 min-h-[80vh] flex items-center">
      <div className="container-custom text-center max-w-lg">
        <p className="font-mono text-sm text-accent mb-4">404</p>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Page not found
        </h1>
        <p className="text-foreground-muted mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <GlowButton href="/" variant="secondary">
          Back to Home
        </GlowButton>
      </div>
    </div>
  );
}
