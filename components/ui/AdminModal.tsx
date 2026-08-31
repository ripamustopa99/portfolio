// components/ui/AdminModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function AdminModal({ isOpen, onClose, title, children }: AdminModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Box: Big to Small animation */}
          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.08, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-lg bg-surface border border-border p-6 md:p-8 shadow-2xl z-10 overflow-hidden"
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
              <h3 className="text-sm font-mono uppercase tracking-wider text-accent font-bold">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="text-foreground-muted hover:text-foreground transition-colors p-1"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
