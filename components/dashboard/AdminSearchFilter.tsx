// components/dashboard/AdminSearchFilter.tsx
"use client";

import { Search } from "lucide-react";
import CustomSelect from "@/components/ui/CustomSelect";

interface OptionItem {
  value: string;
  label: string;
}

interface AdminSearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  selectValue?: string;
  onSelectChange?: (value: string) => void;
  languageFilter?: string;
  onLanguageChange?: (value: string) => void;
  options?: OptionItem[];
  uppercase?: boolean;
}

export default function AdminSearchFilter({
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
  selectValue,
  onSelectChange,
  languageFilter,
  onLanguageChange,
  options = [
    { value: "en", label: "English (EN)" },
    { value: "id", label: "Indonesian (ID)" },
  ],
  uppercase = true,
}: AdminSearchFilterProps) {
  const finalValue = selectValue !== undefined ? selectValue : (languageFilter !== undefined ? languageFilter : "en");
  const finalOnChange = onSelectChange !== undefined ? onSelectChange : (onLanguageChange !== undefined ? onLanguageChange : () => {});

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <div className="relative flex-1 w-full">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-9 pr-4 py-2.5 rounded-none bg-background border border-border text-xs font-mono text-foreground focus:border-accent focus:outline-none transition-colors"
        />
      </div>

      <div className="w-full sm:w-48">
        <CustomSelect
          value={finalValue}
          onChange={finalOnChange}
          options={options}
          uppercase={uppercase}
        />
      </div>
    </div>
  );
}
