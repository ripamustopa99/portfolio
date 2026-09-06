// app/dashboard/layout.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { DashboardProvider } from "@/components/dashboard/DashboardContext";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const cookieStore = await cookies();
  const initialCollapsed = cookieStore.get("dashboard_sidebar_collapsed")?.value === "true";

  return (
    <DashboardProvider>
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <DashboardSidebar userEmail={user.email} initialCollapsed={initialCollapsed} />

        {/* Main Content Area Wrapper with Topbar */}
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardTopbar userEmail={user.email} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}
