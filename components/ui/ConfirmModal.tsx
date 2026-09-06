// components/ui/ConfirmModal.tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete" }: ConfirmModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/85 backdrop-blur-md"
          />

          {/* Big to Small animation */}
          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.08, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md bg-surface border border-border p-6 md:p-8 shadow-2xl z-10 text-center space-y-6"
          >
            <div className="w-12 h-12 mx-auto rounded-none bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <AlertTriangle size={24} />
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-foreground font-mono">{title}</h3>
              <p className="text-xs text-foreground-muted leading-relaxed">{message}</p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-surface border border-border text-xs font-mono text-foreground hover:border-accent transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-6 py-2 bg-red-500 text-white text-xs font-mono font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 cursor-pointer"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
