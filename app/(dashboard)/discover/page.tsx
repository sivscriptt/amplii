"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  MapPin,
  Star,
  Clock,
  Users,
  DollarSign,
  Gift,
  Heart,
  Search,
  Target,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

// ─── Types ───
interface Gig {
  id: string;
  title: string;
  business: string;
  business_avatar: string;
  business_rating: number;
  distance: string;
  reward_type: "free" | "barter" | "paid";
  budget: number;
  base_percent: number;
  barter_desc: string;
  audience_offer: string;
  tier_required: 1 | 2 | 3;
  slots_filled: number;
  max_slots: number;
  deadline_days: number;
  platforms: string[];
  description: string;
}

const REWARD_ICONS = {
  free: <Heart className="h-3.5 w-3.5" />,
  barter: <Gift className="h-3.5 w-3.5" />,
  paid: <DollarSign className="h-3.5 w-3.5" />,
};

const REWARD_STYLES = {
  free: "bg-slate-100 text-slate-600",
  barter: "bg-amber-50 text-amber-700",
  paid: "bg-violet-50 text-violet-700",
};

const mockGigs: Gig[] = [
  { id: "1", title: "Weekend Brunch Feature", business: "Treehouse", business_avatar: "TH", business_rating: 4.6, distance: "0.5 km", reward_type: "paid", budget: 1500, base_percent: 30, barter_desc: "", audience_offer: "10% off brunch", tier_required: 1, slots_filled: 1, max_slots: 3, deadline_days: 7, platforms: ["Instagram Reels", "TikTok"], description: "Visit our rooftop brunch and share your experience with your followers." },
  { id: "2", title: "Salon Experience Review", business: "Nada Salon", business_avatar: "NS", business_rating: 4.8, distance: "1.3 km", reward_type: "barter", budget: 0, base_percent: 0, barter_desc: "Full spa treatment package", audience_offer: "15% off first visit", tier_required: 2, slots_filled: 0, max_slots: 2, deadline_days: 5, platforms: ["Instagram Reels"], description: "Experience our signature treatment and create authentic content." },
  { id: "3", title: "New Menu Launch", business: "Opa", business_avatar: "OP", business_rating: 4.4, distance: "1.9 km", reward_type: "free", budget: 0, base_percent: 0, barter_desc: "", audience_offer: "Free appetizer", tier_required: 1, slots_filled: 1, max_slots: 5, deadline_days: 14, platforms: ["TikTok", "YouTube Shorts"], description: "Try our new seasonal menu and share your honest reaction." },
  { id: "4", title: "Grand Opening Feature", business: "Oevaali", business_avatar: "OE", business_rating: 4.9, distance: "3.4 km", reward_type: "paid", budget: 3000, base_percent: 25, barter_desc: "", audience_offer: "BOGO accessories", tier_required: 3, slots_filled: 0, max_slots: 2, deadline_days: 3, platforms: ["Instagram Reels", "TikTok", "YouTube Shorts"], description: "Cover our grand opening event — exclusive first look for your audience." },
];

export default function DiscoverPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Gig | null>(null);
  const [applied, setApplied] = useState<Set<string>>(new Set());
  const myTier = 2;

  const filtered = mockGigs.filter((g) => {
    if (filter === "eligible") return g.tier_required <= myTier;
    if (filter === "paid") return g.reward_type === "paid";
    if (filter === "barter") return g.reward_type === "barter";
    return true;
  }).filter((g) =>
    search ? g.title.toLowerCase().includes(search.toLowerCase()) || g.business.toLowerCase().includes(search.toLowerCase()) : true
  );

  function handleApply(gigId: string) {
    setApplied((prev) => new Set(prev).add(gigId));
    setSelected(null);
  }

  return (
    <div className="flex min-h-screen items-start justify-center px-6 pt-6 lg:pt-12">
      <div className="w-full max-w-[560px] pb-16">
        <h1 className="font-display text-2xl font-extrabold tracking-tight">
          Discover Gigs
        </h1>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-3.5 w-3.5" />
          Near you · Sorted by proximity
        </p>

        {/* Search */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Search gigs or businesses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 pl-10 text-sm"
          />
        </div>

        {/* Filters */}
        <Tabs value={filter} onValueChange={setFilter} className="mt-3">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1 font-display text-xs">All</TabsTrigger>
            <TabsTrigger value="eligible" className="flex-1 font-display text-xs">Eligible</TabsTrigger>
            <TabsTrigger value="paid" className="flex-1 font-display text-xs">Paid</TabsTrigger>
            <TabsTrigger value="barter" className="flex-1 font-display text-xs">Barter</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Gig cards */}
        <div className="mt-4 space-y-3">
          {filtered.map((g) => {
            const locked = g.tier_required > myTier;
            return (
              <Card
                key={g.id}
                onClick={() => !locked && setSelected(g)}
                className={`transition-all ${locked ? "opacity-50" : "cursor-pointer hover:shadow-md"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 font-display text-sm font-bold text-primary">
                      {g.business_avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-display text-sm font-bold">{g.title}</span>
                        {applied.has(g.id) && (
                          <Badge className="bg-emerald-50 text-[10px] text-emerald-700">Applied</Badge>
                        )}
                      </div>
                      <div className="mt-0.5 text-xs text-slate-500">
                        {g.business} · {g.distance}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <Badge className={`gap-1 text-[10px] ${REWARD_STYLES[g.reward_type]}`}>
                          {REWARD_ICONS[g.reward_type]}
                          {g.reward_type === "paid" ? `MVR ${g.budget.toLocaleString()}` : g.reward_type === "barter" ? "Barter" : "Free"}
                        </Badge>
                        {g.reward_type === "paid" && (
                          <Badge variant="secondary" className="text-[10px]">
                            {g.base_percent}% / {100 - g.base_percent}%
                          </Badge>
                        )}
                        <Badge variant="secondary" className="gap-1 text-[10px]">
                          <Users className="h-2.5 w-2.5" />
                          {g.slots_filled}/{g.max_slots}
                        </Badge>
                        {locked && (
                          <Badge variant="secondary" className="text-[10px] text-red-500">
                            Tier {g.tier_required} required
                          </Badge>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-slate-500/40" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detail + Apply Dialog */}
        <Dialog open={selected !== null} onOpenChange={() => setSelected(null)}>
          {selected && (
            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <DialogTitle className="font-display">{selected.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 font-display text-sm font-bold text-primary">
                    {selected.business_avatar}
                  </div>
                  <div>
                    <div className="font-display text-sm font-bold">{selected.business}</div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Star className="h-3 w-3 fill-amplii-amber text-amplii-amber" />
                      {selected.business_rating} · {selected.distance}
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-slate-500">{selected.description}</p>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-2">
                  <Card className="bg-muted/50"><CardContent className="p-3">
                    <div className="font-display text-[11px] font-semibold uppercase text-slate-500">Reward</div>
                    <div className="mt-1 text-sm font-bold">
                      {selected.reward_type === "paid" ? `MVR ${selected.budget.toLocaleString()}` : selected.reward_type === "barter" ? selected.barter_desc : "Free (exposure)"}
                    </div>
                  </CardContent></Card>
                  {selected.reward_type === "paid" && (
                    <Card className="bg-muted/50"><CardContent className="p-3">
                      <div className="font-display text-[11px] font-semibold uppercase text-slate-500">Split</div>
                      <div className="mt-1 text-sm font-bold">${(selected.budget * selected.base_percent / 100).toFixed(0)} base / ${(selected.budget * (100 - selected.base_percent) / 100).toFixed(0)} completion</div>
                    </CardContent></Card>
                  )}
                  <Card className="bg-muted/50"><CardContent className="p-3">
                    <div className="font-display text-[11px] font-semibold uppercase text-slate-500">Deadline</div>
                    <div className="mt-1 text-sm font-bold">{selected.deadline_days} days</div>
                  </CardContent></Card>
                  <Card className="bg-muted/50"><CardContent className="p-3">
                    <div className="font-display text-[11px] font-semibold uppercase text-slate-500">Slots</div>
                    <div className="mt-1 text-sm font-bold">{selected.slots_filled}/{selected.max_slots} filled</div>
                  </CardContent></Card>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {selected.platforms.map((p) => (
                    <Badge key={p} variant="secondary" className="gap-1 font-display text-[11px]">
                      <Target className="h-3 w-3" />{p}
                    </Badge>
                  ))}
                </div>
                {selected.audience_offer && (
                  <div className="rounded-lg bg-muted p-3 text-xs text-slate-500">
                    <span className="font-display font-semibold text-foreground">Audience Offer:</span> {selected.audience_offer}
                  </div>
                )}
              </div>
              <DialogFooter>
                {applied.has(selected.id) ? (
                  <Button disabled className="w-full gap-1 font-display font-semibold">
                    <CheckCircle2 className="h-4 w-4" />
                    Applied
                  </Button>
                ) : selected.slots_filled >= selected.max_slots ? (
                  <Button disabled className="w-full font-display font-semibold">Gig Full</Button>
                ) : (
                  <Button onClick={() => handleApply(selected.id)} className="w-full font-display font-semibold">
                    Apply to Gig
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
}
