// components/auth/LogoutButton.tsx
"use client";

import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  isCollapsed?: boolean;
}

export default function LogoutButton({ isCollapsed = false }: LogoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/login");
        router.refresh();
      } else {
        alert("Failed to logout. Please try again.");
      }
    } catch {
      alert("Network error during logout.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      title="Sign Out"
      className="w-full inline-flex items-center gap-2 px-3 py-2.5 rounded-none bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-xs font-mono disabled:opacity-50 overflow-hidden"
    >
      {isLoading ? <Loader2 size={16} className="animate-spin shrink-0" /> : <LogOut size={16} className="shrink-0" />}
      <span
        className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
          isCollapsed ? "md:opacity-0 md:w-0" : "md:opacity-100 md:w-auto"
        }`}
      >
        Sign Out
      </span>
    </button>
  );
}
