"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardSkeleton } from "@/components/ui/skeleton";

const FULL_SCREEN_ROUTES = ["/onboarding"];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth();
  const pathname = usePathname();
  const isFullScreen = FULL_SCREEN_ROUTES.includes(pathname);

  if (isFullScreen) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <DashboardSidebar />
      <main className="min-h-screen flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-5 pb-16 pt-16 lg:px-10 lg:pt-10">
          {loading ? <DashboardSkeleton /> : children}
        </div>
      </main>
    </div>
  );
}
