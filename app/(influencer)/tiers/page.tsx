"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Star,
  CheckCircle2,
  Lock,
  ChevronLeft,
  Gift,
  DollarSign,
  Heart,
  TrendingUp,
} from "lucide-react";

interface TierInfo {
  tier: 1 | 2 | 3;
  name: string;
  icon: React.ReactNode;
  reward: string;
  requirement: string;
  completed: number;
  required: number;
  unlocked: boolean;
  current: boolean;
}

export default function TiersPage() {
  const currentTier = 2;
  const reputationScore = 4.7;

  const tiers: TierInfo[] = [
    {
      tier: 1,
      name: "Starter",
      icon: <Heart className="h-5 w-5" />,
      reward: "Free gigs only",
      requirement: "Complete 2 Free gigs",
      completed: 2,
      required: 2,
      unlocked: true,
      current: false,
    },
    {
      tier: 2,
      name: "Rising",
      icon: <Gift className="h-5 w-5" />,
      reward: "Barter rewards unlocked",
      requirement: "Complete 3 Barter gigs",
      completed: 1,
      required: 3,
      unlocked: true,
      current: true,
    },
    {
      tier: 3,
      name: "Pro",
      icon: <DollarSign className="h-5 w-5" />,
      reward: "Paid gigs ($) unlocked",
      requirement: "Complete 3 Barter gigs",
      completed: 0,
      required: 3,
      unlocked: false,
      current: false,
    },
  ];

  const completedGigs = [
    { title: "Coffee Shop Feature", type: "free", date: "Jan 12", status: "content" },
    { title: "Smoothie Bar Visit", type: "free", date: "Jan 18", status: "feedback" },
    { title: "Spa Day Review", type: "barter", date: "Feb 5", status: "content" },
  ];

  return (
    <div className="flex min-h-screen items-start justify-center px-6 pt-6 lg:pt-12">
      <div className="w-full max-w-[520px] pb-16">
        <button className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          Dashboard
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amplii-amber to-amplii-coral">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-xl font-extrabold tracking-tight">
              Your Growth Path
            </h1>
            <p className="text-sm text-muted-foreground">
              Complete gigs to unlock higher tiers
            </p>
          </div>
        </div>

        {/* Reputation score card */}
        <Card className="mt-5 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <div className="font-display text-xs font-semibold uppercase tracking-widest text-slate-400">
                Reputation Score
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="font-display text-3xl font-extrabold">
                  {reputationScore}
                </span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i <= Math.round(reputationScore)
                          ? "fill-amplii-amber text-amplii-amber"
                          : "fill-white/20 text-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-emerald-500/20 px-3 py-1.5 text-sm font-bold text-emerald-400">
              <TrendingUp className="h-4 w-4" />
              +0.3
            </div>
          </CardContent>
        </Card>

        {/* Tier roadmap */}
        <div className="mt-8 space-y-0">
          {tiers.map((t, i) => (
            <div key={t.tier}>
              <div className="flex gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                      t.current
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : t.unlocked
                          ? "bg-emerald-100 text-emerald-600"
                          : "border-2 border-dashed border-border text-muted-foreground"
                    }`}
                  >
                    {t.unlocked && !t.current ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : !t.unlocked ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      t.icon
                    )}
                  </div>
                  {i < tiers.length - 1 && (
                    <div
                      className={`my-1 w-0.5 flex-1 ${
                        t.unlocked ? "bg-emerald-200" : "bg-border"
                      }`}
                      style={{ minHeight: 40 }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 ${i < tiers.length - 1 ? "pb-5" : ""}`}>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-base font-bold">
                      Tier {t.tier}: {t.name}
                    </span>
                    {t.current && (
                      <Badge className="font-display text-[10px]">
                        CURRENT
                      </Badge>
                    )}
                    {t.unlocked && !t.current && (
                      <Badge className="bg-emerald-50 font-display text-[10px] text-emerald-700">
                        ✓ Complete
                      </Badge>
                    )}
                    {!t.unlocked && (
                      <Badge
                        variant="secondary"
                        className="font-display text-[10px]"
                      >
                        Locked
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-[13px] text-muted-foreground">
                    {t.reward}
                  </p>

                  {/* Progress bar for current / in-progress tier */}
                  {(t.current || (!t.unlocked && tiers[i - 1]?.unlocked)) && (
                    <div className="mt-3 rounded-lg border border-border bg-muted/50 p-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-display font-semibold text-muted-foreground">
                          {t.requirement}
                        </span>
                        <span className="font-mono font-bold text-foreground">
                          {t.completed}/{t.required}
                        </span>
                      </div>
                      <Progress
                        value={(t.completed / t.required) * 100}
                        className="mt-2 h-2"
                      />
                      {t.completed > 0 && t.completed < t.required && (
                        <p className="mt-2 text-[11px] text-muted-foreground">
                          {t.required - t.completed} more to unlock{" "}
                          {t.current ? "next tier" : t.name}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Completed gigs history */}
        <div className="mt-8">
          <h2 className="font-display text-base font-bold">
            Completion History
          </h2>
          <div className="mt-3 space-y-2">
            {completedGigs.map((g, i) => (
              <Card key={i}>
                <CardContent className="flex items-center gap-3 p-3.5">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      g.type === "free"
                        ? "bg-slate-100"
                        : g.type === "barter"
                          ? "bg-amber-50"
                          : "bg-violet-50"
                    }`}
                  >
                    {g.type === "free" ? (
                      <Heart className="h-4 w-4 text-slate-500" />
                    ) : g.type === "barter" ? (
                      <Gift className="h-4 w-4 text-amber-600" />
                    ) : (
                      <DollarSign className="h-4 w-4 text-violet-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{g.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {g.date} · {g.status === "content" ? "Content" : "Feedback"}
                    </div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-muted p-3 text-center text-xs text-muted-foreground">
          Both content and feedback submissions count toward tier progression.
        </div>
      </div>
    </div>
  );
}
