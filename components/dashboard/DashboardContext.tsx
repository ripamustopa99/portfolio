// components/dashboard/DashboardContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

interface DashboardContextType {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType>({
  isMobileOpen: false,
  setIsMobileOpen: () => {},
});

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <DashboardContext.Provider value={{ isMobileOpen, setIsMobileOpen }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);
