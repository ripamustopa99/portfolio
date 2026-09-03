// components/ui/CustomSelect.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  dropdownClassName?: string;
  uppercase?: boolean;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className = "",
  dropdownClassName = "",
  uppercase = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={cn("relative inline-block w-full", className)} ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2.5 rounded-none bg-background border border-border text-xs font-mono text-foreground hover:border-accent focus:border-accent focus:outline-none transition-all duration-200 cursor-pointer shadow-sm",
          uppercase && "uppercase"
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[10px] text-foreground-muted ml-2 shrink-0"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute left-0 right-0 mt-1 bg-background/95 backdrop-blur-xl border border-border shadow-2xl z-50 overflow-hidden max-h-60 overflow-y-auto",
              dropdownClassName
            )}
          >
            <div className="py-1">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-xs font-mono text-left transition-colors cursor-pointer",
                      uppercase && "uppercase",
                      isSelected
                        ? "bg-accent/10 text-accent font-semibold"
                        : "text-foreground hover:bg-surface"
                    )}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected && <span className="text-accent text-xs shrink-0 ml-2">✓</span>}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
