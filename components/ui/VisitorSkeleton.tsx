// components/ui/VisitorSkeleton.tsx
import React from "react";

interface VisitorSkeletonProps {
  count?: number;
}

export function VisitorSkeleton({ count = 3 }: VisitorSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-surface/30 border border-border p-4 space-y-3 animate-pulse">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-surface/80 rounded w-3/4" />
              <div className="h-3 bg-surface/50 rounded w-1/2" />
            </div>
            <div className="h-5 bg-surface/60 rounded w-16" />
          </div>
          <div className="pt-2 border-t border-border flex justify-between items-center">
            <div className="h-3 bg-surface/50 rounded w-28" />
            <div className="w-20 h-7 bg-surface/60 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
