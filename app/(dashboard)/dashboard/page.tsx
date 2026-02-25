"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  QrCode,
  FileText,
  Users,
  Wallet,
  Search,
  Trophy,
  ClipboardCheck,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  Clock,
  Star,
} from "lucide-react";

interface StatCard {
  label: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  color: string;
}

interface QuickAction {
  href: string;
  label: string;
  icon: React.ReactNode;
}

// ─── Business Dashboard ───
function BusinessDashboard({ name }: { name: string }) {
  const stats: StatCard[] = [
    { label: "Active Gigs", value: "3", icon: <FileText className="h-5 w-5" />, color: "text-primary bg-primary/10" },
    { label: "Pending Applications", value: "7", change: "+2 today", icon: <Users className="h-5 w-5" />, color: "text-amber-600 bg-amber-50" },
    { label: "Wallet Balance", value: "MVR 4,250", icon: <Wallet className="h-5 w-5" />, color: "text-emerald-600 bg-emerald-50" },
    { label: "Avg Rating", value: "4.6", icon: <Star className="h-5 w-5" />, color: "text-amplii-amber bg-amber-50" },
  ];

  const actions: QuickAction[] = [
    { href: "/gigs/create", label: "Create Gig", icon: <PlusCircle className="h-4 w-4" /> },
    { href: "/scanner", label: "Scan QR", icon: <QrCode className="h-4 w-4" /> },
    { href: "/applications", label: "Review Apps", icon: <Users className="h-4 w-4" /> },
    { href: "/wallet", label: "Fund Wallet", icon: <Wallet className="h-4 w-4" /> },
  ];

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight">
          Welcome back, {name}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Here's what's happening with your campaigns.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {s.label}
                </span>
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.color}`}>
                  {s.icon}
                </div>
              </div>
              <div className="mt-2 font-display text-2xl font-extrabold">
                {s.value}
              </div>
              {s.change && (
                <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                  <TrendingUp className="h-3 w-3" />
                  {s.change}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="mb-3 font-display text-base font-bold">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {actions.map((a) => (
            <Link key={a.href} href={a.href}>
              <Card className="cursor-pointer border-slate-100 shadow-sm transition-all duration-200 hover:border-amplii-indigo/20 hover:shadow-md">
                <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/[.06] text-primary">
                    {a.icon}
                  </div>
                  <span className="font-display text-xs font-semibold">
                    {a.label}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <RecentActivity role="business" />
    </>
  );
}

// ─── Influencer Dashboard ───
function InfluencerDashboard({ name }: { name: string }) {
  const stats: StatCard[] = [
    { label: "Current Tier", value: "Tier 2", icon: <Trophy className="h-5 w-5" />, color: "text-amber-600 bg-amber-50" },
    { label: "Active Gigs", value: "2", icon: <FileText className="h-5 w-5" />, color: "text-primary bg-primary/10" },
    { label: "Completed", value: "5", change: "+1 this week", icon: <CheckCircle2 className="h-5 w-5" />, color: "text-emerald-600 bg-emerald-50" },
    { label: "Reputation", value: "4.8", icon: <Star className="h-5 w-5" />, color: "text-amplii-amber bg-amber-50" },
  ];

  const actions: QuickAction[] = [
    { href: "/discover", label: "Browse Gigs", icon: <Search className="h-4 w-4" /> },
    { href: "/qr", label: "Generate QR", icon: <QrCode className="h-4 w-4" /> },
    { href: "/tiers", label: "Tier Progress", icon: <Trophy className="h-4 w-4" /> },
  ];

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight">
          Hey, {name}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Keep building your reputation. Here's your overview.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {s.label}
                </span>
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.color}`}>
                  {s.icon}
                </div>
              </div>
              <div className="mt-2 font-display text-2xl font-extrabold">
                {s.value}
              </div>
              {s.change && (
                <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                  <TrendingUp className="h-3 w-3" />
                  {s.change}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="mb-3 font-display text-base font-bold">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-2">
          {actions.map((a) => (
            <Link key={a.href} href={a.href}>
              <Card className="cursor-pointer border-slate-100 shadow-sm transition-all duration-200 hover:border-amplii-indigo/20 hover:shadow-md">
                <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/[.06] text-primary">
                    {a.icon}
                  </div>
                  <span className="font-display text-xs font-semibold">
                    {a.label}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <RecentActivity role="influencer" />
    </>
  );
}

// ─── Admin Dashboard ───
function AdminDashboard() {
  const stats: StatCard[] = [
    { label: "Pending Reviews", value: "12", change: "+3 new", icon: <ClipboardCheck className="h-5 w-5" />, color: "text-primary bg-primary/10" },
    { label: "Open Disputes", value: "4", icon: <AlertTriangle className="h-5 w-5" />, color: "text-red-500 bg-red-50" },
    { label: "Approved Today", value: "8", icon: <CheckCircle2 className="h-5 w-5" />, color: "text-emerald-600 bg-emerald-50" },
    { label: "Payouts Processed", value: "MVR 37K", icon: <Wallet className="h-5 w-5" />, color: "text-amber-600 bg-amber-50" },
  ];

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Platform oversight — submissions, disputes, and payouts.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {s.label}
                </span>
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.color}`}>
                  {s.icon}
                </div>
              </div>
              <div className="mt-2 font-display text-2xl font-extrabold">
                {s.value}
              </div>
              {s.change && (
                <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                  <TrendingUp className="h-3 w-3" />
                  {s.change}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link href="/review">
          <Card className="cursor-pointer border-slate-100 shadow-sm transition-all duration-200 hover:border-amplii-indigo/20 hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ClipboardCheck className="h-6 w-6" />
              </div>
              <div>
                <div className="font-display text-sm font-bold">Review Queue</div>
                <div className="text-xs text-slate-500">12 submissions waiting</div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/disputes">
          <Card className="cursor-pointer transition-all hover:border-amber-400/30 hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <div className="font-display text-sm font-bold">Disputes</div>
                <div className="text-xs text-slate-500">4 open, 2 under review</div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
}

// ─── Recent Activity (shared) ───
function RecentActivity({ role }: { role: "business" | "influencer" }) {
  const activities = role === "business"
    ? [
        { icon: <Users className="h-3.5 w-3.5" />, text: "@yaania applied to Weekend Brunch Feature", time: "2h ago", color: "bg-blue-50 text-blue-600" },
        { icon: <CheckCircle2 className="h-3.5 w-3.5" />, text: "Content approved for @bathool — MVR 1,425 released", time: "5h ago", color: "bg-emerald-50 text-emerald-600" },
        { icon: <FileText className="h-3.5 w-3.5" />, text: "Feedback report from @yuin", time: "1d ago", color: "bg-amber-50 text-amber-600" },
      ]
    : [
        { icon: <CheckCircle2 className="h-3.5 w-3.5" />, text: "Content approved — MVR 1,425 for Weekend Brunch", time: "2h ago", color: "bg-emerald-50 text-emerald-600" },
        { icon: <QrCode className="h-3.5 w-3.5" />, text: "Visit verified at Treehouse", time: "1d ago", color: "bg-blue-50 text-blue-600" },
        { icon: <Trophy className="h-3.5 w-3.5" />, text: "Tier 2 unlocked! Barter gigs now available", time: "3d ago", color: "bg-amber-50 text-amber-600" },
      ];

  return (
    <div className="mt-8">
      <h2 className="mb-3 font-display text-base font-bold">Recent Activity</h2>
      <div className="space-y-2">
        {activities.map((a, i) => (
          <Card key={i}>
            <CardContent className="flex items-center gap-3 p-3.5">
              <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${a.color}`}>
                {a.icon}
              </div>
              <div className="min-w-0 flex-1 text-sm">{a.text}</div>
              <span className="flex-shrink-0 text-xs text-slate-500">
                {a.time}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ───
export default function DashboardPage() {
  const { profile, role } = useAuth();
  const name = profile?.display_name ?? "there";

  if (role === "admin") return <AdminDashboard />;
  if (role === "influencer") return <InfluencerDashboard name={name} />;
  return <BusinessDashboard name={name} />;
}
