// components/ui/VisitorActivityCard.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Activity, Clock, Shield } from "lucide-react";

interface VisitorEvent {
  id: string;
  eventType: string;
  target: string | null;
  createdAt: Date | string;
}

interface VisitorItem {
  visitorId: string;
  ipAddress: string | null;
  lastActive: Date | string;
  events: VisitorEvent[];
}

interface VisitorActivityCardProps {
  visitor: VisitorItem;
  visitorNumber: number;
}

export function VisitorActivityCard({ visitor, visitorNumber }: VisitorActivityCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-background/50 border border-border p-4 space-y-3 text-xs font-mono transition-colors hover:border-accent/40">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 text-accent font-bold shrink-0">
            Visitor #{visitorNumber}
          </span>
          <div>
            <div className="text-foreground font-medium text-[11px] truncate max-w-[220px] sm:max-w-[320px]">
              ID: {visitor.visitorId}
            </div>
            <div className="text-foreground-subtle text-[10px] flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-1">
                <Shield size={12} className="text-accent" />
                {visitor.ipAddress || "Unknown IP"}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Activity size={12} className="text-accent" />
                {visitor.events.length} action{visitor.events.length === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
          <div className="text-foreground-muted text-[11px] flex items-center gap-1">
            <Clock size={12} />
            <span>{new Date(visitor.lastActive).toLocaleString()}</span>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border text-foreground hover:text-accent hover:border-accent transition-colors shrink-0 cursor-pointer"
          >
            <span>{expanded ? "Hide Details" : "View Details"}</span>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="space-y-2 pt-3 border-t border-border animate-slide-down">
          <div className="text-[11px] font-mono uppercase tracking-wider text-foreground-muted flex items-center justify-between">
            <span>Full Actions Timeline ({visitor.events.length}):</span>
            {visitor.events.length > 4 && (
              <span className="text-[10px] text-foreground-subtle">Scroll for more</span>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto pr-1 space-y-1.5 md:space-y-0 md:grid md:grid-cols-2 md:gap-2">
            {visitor.events.map((ev) => (
              <div
                key={ev.id}
                className="p-2.5 rounded-none bg-surface/40 border border-border text-xs font-mono flex flex-col justify-between gap-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span className="text-foreground font-medium uppercase text-[11px] truncate">
                      {ev.eventType.replace(/_/g, " ")}
                    </span>
                  </div>
                  <span className="text-foreground-subtle text-[10px] shrink-0">
                    {new Date(ev.createdAt).toLocaleString()}
                  </span>
                </div>
                {ev.target && (
                  <span className="text-foreground-muted truncate text-[11px] pl-3.5" title={ev.target}>
                    → {ev.target}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
