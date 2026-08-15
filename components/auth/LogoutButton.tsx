// components/auth/LogoutButton.tsx
"use client";

import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
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
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-sm font-medium disabled:opacity-50"
    >
      {isLoading ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
      <span>Sign Out</span>
    </button>
  );
}
