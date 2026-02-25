"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import type { UserRole } from "@/lib/types";
import {
  LayoutDashboard,
  PlusCircle,
  Users,
  QrCode,
  FileText,
  Wallet,
  AlertTriangle,
  Search,
  Send,
  Trophy,
  ClipboardCheck,
  Star,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  business: [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-[18px] w-[18px]" /> },
    { href: "/gigs/create", label: "Create Gig", icon: <PlusCircle className="h-[18px] w-[18px]" /> },
    { href: "/applications", label: "Applications", icon: <Users className="h-[18px] w-[18px]" /> },
    { href: "/scanner", label: "QR Scanner", icon: <QrCode className="h-[18px] w-[18px]" /> },
    { href: "/submissions", label: "Submissions", icon: <FileText className="h-[18px] w-[18px]" /> },
    { href: "/wallet", label: "Wallet", icon: <Wallet className="h-[18px] w-[18px]" /> },
    { href: "/rate", label: "Ratings", icon: <Star className="h-[18px] w-[18px]" /> },
    { href: "/disputes/new", label: "Dispute", icon: <AlertTriangle className="h-[18px] w-[18px]" /> },
  ],
  influencer: [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-[18px] w-[18px]" /> },
    { href: "/discover", label: "Discover Gigs", icon: <Search className="h-[18px] w-[18px]" /> },
    { href: "/qr", label: "Generate QR", icon: <QrCode className="h-[18px] w-[18px]" /> },
    { href: "/submit", label: "Submit", icon: <Send className="h-[18px] w-[18px]" /> },
    { href: "/tiers", label: "Tier Progress", icon: <Trophy className="h-[18px] w-[18px]" /> },
    { href: "/rate", label: "Ratings", icon: <Star className="h-[18px] w-[18px]" /> },
  ],
  admin: [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-[18px] w-[18px]" /> },
    { href: "/review", label: "Review Queue", icon: <ClipboardCheck className="h-[18px] w-[18px]" /> },
    { href: "/disputes", label: "Disputes", icon: <AlertTriangle className="h-[18px] w-[18px]" /> },
  ],
};

export function DashboardSidebar() {
  const { profile, role, signOut } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentRole = role ?? "business";
  const items = NAV_ITEMS[currentRole];

  const sidebar = (
    <div className="flex h-full flex-col bg-white">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 pb-8 pt-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amplii-indigo to-amplii-violet shadow-md shadow-amplii-indigo/20">
          <span className="font-display text-[18px] font-extrabold text-white">A</span>
        </div>
        <span className="font-display text-[19px] font-extrabold tracking-tight text-slate-900">
          Amplii
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-4">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3.5 rounded-xl px-4 py-3 font-display text-[13px] font-semibold transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-amplii-indigo/[.08] to-amplii-violet/[.05] text-amplii-indigo shadow-sm shadow-amplii-indigo/5"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <span className={active ? "text-amplii-indigo" : ""}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-slate-100 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amplii-indigo to-amplii-violet font-display text-sm font-bold text-white shadow-sm">
            {profile?.display_name?.charAt(0).toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-display text-[13px] font-bold text-slate-900">
              {profile?.display_name ?? "Guest"}
            </div>
            <div className="font-display text-[11px] font-medium capitalize text-slate-400">
              {currentRole}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={signOut}
            className="h-9 w-9 rounded-xl text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md lg:hidden"
      >
        <Menu className="h-5 w-5 text-slate-700" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-[272px] shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute right-3 top-5 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors duration-200 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>
        {sidebar}
      </aside>

      {/* Desktop — FIXED position */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[272px] border-r border-slate-100 lg:block">
        {sidebar}
      </aside>

      {/* Spacer so main content isn't hidden behind fixed sidebar */}
      <div className="hidden w-[272px] flex-shrink-0 lg:block" />
    </>
  );
}
