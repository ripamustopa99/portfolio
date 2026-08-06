// components/ui/Tag.tsx
import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded text-xs font-mono",
        "bg-background-hover border border-border text-foreground-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
