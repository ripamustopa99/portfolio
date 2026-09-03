// components/dashboard/VisitorFilterBar.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import CustomSelect from "@/components/ui/CustomSelect";

interface VisitorFilterBarProps {
  initialSearch: string;
  initialEventType: string;
}

export default function VisitorFilterBar({ initialSearch, initialEventType }: VisitorFilterBarProps) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);
  const [eventType, setEventType] = useState(initialEventType);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (eventType) params.set("eventType", eventType);
      router.push(`/dashboard/visitors?${params.toString()}`);
    }
  };

  const handleEventTypeChange = (val: string) => {
    setEventType(val);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (val) params.set("eventType", val);
    router.push(`/dashboard/visitors?${params.toString()}`);
  };

  return (
    <div className="bg-surface/30 border border-border p-4 flex flex-col sm:flex-row items-center gap-3">
      <div className="relative flex-1 w-full">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder="Search by Visitor ID or IP Address..."
          className="w-full pl-9 pr-4 py-2.5 rounded-none bg-background border border-border text-xs font-mono text-foreground focus:border-accent focus:outline-none transition-colors"
        />
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
