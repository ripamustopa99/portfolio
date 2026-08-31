// components/ui/Toast.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-surface border border-border shadow-2xl rounded-none text-foreground"
        >
          <CheckCircle2 size={18} className="text-accent shrink-0" />
          <span className="text-xs font-mono font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-foreground-muted hover:text-foreground transition-colors p-1"
            aria-label="Close toast"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
