// components/dashboard/VisitorFilterBar.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import CustomSelect from "@/components/ui/CustomSelect";

interface VisitorFilterBarProps {
  initialSearch: string;
  initialEventType: string;
}

export default function VisitorFilterBar({ initialSearch, initialEventType }: VisitorFilterBarProps) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);
  const [eventType, setEventType] = useState(initialEventType);

  // Debounced real-time server-side search
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (eventType) params.set("eventType", eventType);
      router.replace(`/dashboard/visitors?${params.toString()}`, { scroll: false });
    }, 350);

    return () => clearTimeout(timer);
  }, [search, eventType, router]);

  const handleEventTypeChange = (val: string) => {
    setEventType(val);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (val) params.set("eventType", val);
    router.replace(`/dashboard/visitors?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <div className="relative flex-1 w-full">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Visitor ID or IP Address..."
          className="w-full pl-9 pr-9 py-2.5 rounded-none bg-background border border-border text-xs font-mono text-foreground focus:border-accent focus:outline-none transition-colors"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground cursor-pointer"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="relative w-full sm:w-64">
        <CustomSelect
          value={eventType}
          onChange={handleEventTypeChange}
          options={[
            { value: "", label: "All Action Types" },
            { value: "page_view", label: "Page View" },
            { value: "project_view", label: "Project View" },
            { value: "project_demo_click", label: "Project Demo Click" },
            { value: "project_github_click", label: "Project GitHub Click" },
            { value: "resume_download", label: "Resume Download" },
            { value: "contact_click", label: "Contact Click" },
          ]}
        />
      </div>
    </div>
  );
}
