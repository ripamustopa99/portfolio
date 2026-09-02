// components/ui/Pagination.tsx
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  itemName?: string;
  onPageChange?: (page: number) => void;
  buildHref?: (page: number) => string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalCount,
  itemName = "items",
  onPageChange,
  buildHref,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const renderButton = (direction: "prev" | "next") => {
    const isPrev = direction === "prev";
    const targetPage = isPrev ? currentPage - 1 : currentPage + 1;
    const isDisabled = isPrev ? currentPage <= 1 : currentPage >= totalPages;

    const content = (
      <>
        {isPrev && <ChevronLeft size={14} />}
        <span>{isPrev ? "Previous" : "Next"}</span>
        {!isPrev && <ChevronRight size={14} />}
      </>
    );

    if (isDisabled) {
      return (
        <span className="px-3 py-1.5 rounded-none bg-surface/50 border border-border/50 text-foreground-muted cursor-not-allowed flex items-center gap-1">
          {content}
        </span>
      );
    }

    if (onPageChange) {
      return (
        <button
          onClick={() => onPageChange(targetPage)}
          className="px-3 py-1.5 rounded-none bg-surface border border-border text-foreground hover:border-accent transition-colors flex items-center gap-1 cursor-pointer"
        >
          {content}
        </button>
      );
    }

    if (buildHref) {
      return (
        <Link
          href={buildHref(targetPage)}
          className="px-3 py-1.5 rounded-none bg-surface border border-border text-foreground hover:border-accent transition-colors flex items-center gap-1"
        >
          {content}
        </Link>
      );
    }

    return null;
  };

  return (
    <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
      <div className="text-foreground-muted">
        Showing page {currentPage} of {totalPages} ({totalCount} total {itemName})
      </div>
      <div className="flex items-center gap-2">
        {renderButton("prev")}
        {renderButton("next")}
      </div>
    </div>
  );
}
