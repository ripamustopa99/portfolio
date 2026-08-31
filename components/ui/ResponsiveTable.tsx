// components/ui/ResponsiveTable.tsx
"use client";

import React from "react";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface ResponsiveTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  keyExtractor: (item: T) => string;
  renderCard: (item: T) => React.ReactNode;
  emptyMessage?: string;
  skeletonCount?: number;
}

export function ResponsiveTable<T>({
  data,
  columns,
  loading = false,
  keyExtractor,
  renderCard,
  emptyMessage = "No data found.",
  skeletonCount = 3,
}: ResponsiveTableProps<T>) {
  if (loading) {
    return (
      <div className="space-y-4">
        {/* Desktop Skeleton Table */}
        <div className="hidden md:block bg-surface/30 border border-border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface/50 text-[11px] font-mono text-foreground-muted uppercase tracking-wider">
                {columns.map((col, i) => (
                  <th key={i} className={`p-4 ${col.className || ""}`}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {Array.from({ length: skeletonCount }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {columns.map((_, j) => (
                    <td key={j} className="p-4">
                      <div className="h-4 bg-surface/80 rounded w-3/4 mb-1" />
                      {j === 0 && <div className="h-3 bg-surface/50 rounded w-1/2" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Skeleton Cards */}
        <div className="block md:hidden space-y-3">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <div key={i} className="bg-surface/30 border border-border p-4 space-y-3 animate-pulse">
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-surface/80 rounded w-3/4" />
                  <div className="h-3 bg-surface/50 rounded w-1/2" />
                </div>
                <div className="h-5 bg-surface/60 rounded w-12" />
              </div>
              <div className="pt-2 border-t border-border flex justify-between items-center">
                <div className="h-3 bg-surface/50 rounded w-24" />
                <div className="flex gap-2">
                  <div className="w-7 h-7 bg-surface/60 rounded" />
                  <div className="w-7 h-7 bg-surface/60 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-surface/30 border border-border p-8 text-center text-xs font-mono text-foreground-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div>
      {/* Desktop Table View */}
      <div className="hidden md:block bg-surface/30 border border-border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-surface/50 text-[11px] font-mono text-foreground-muted uppercase tracking-wider">
              {columns.map((col, i) => (
                <th key={i} className={`p-4 ${col.className || ""}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs font-mono">
            {data.map((item) => (
              <tr key={keyExtractor(item)} className="hover:bg-surface/40 transition-colors">
                {columns.map((col, i) => (
                  <td key={i} className={`p-4 ${col.className || ""}`}>
                    {col.cell
                      ? col.cell(item)
                      : col.accessorKey
                      ? String(item[col.accessorKey] ?? "")
                      : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-3">
        {data.map((item) => (
          <React.Fragment key={keyExtractor(item)}>
            {renderCard(item)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
