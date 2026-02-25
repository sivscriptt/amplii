"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Gift,
  Heart,
  Users,
  Clock,
  Target,
  Info,
  CheckCircle2,
  AlertTriangle,
  Wallet,
} from "lucide-react";

// ─── Types ───
type RewardType = "free" | "barter" | "paid";
type AppMode = "auto" | "manual";
type CreateStep = "basics" | "reward" | "settings" | "review";

interface GigFormData {
  title: string;
  description: string;
  reward_type: RewardType;
  barter_description: string;
  budget_total: number;
  base_percent: number;
  audience_offer: string;
  max_slots: number;
  application_mode: AppMode;
  submission_deadline_days: number;
  target_platforms: string[];
  tier_required: 1 | 2 | 3;
}

const STEPS: CreateStep[] = ["basics", "reward", "settings", "review"];
const PLATFORMS = ["Instagram Reels", "TikTok", "YouTube Shorts"];

const initialData: GigFormData = {
  title: "",
  description: "",
  reward_type: "paid",
  barter_description: "",
  budget_total: 1500,
  base_percent: 30,
  audience_offer: "",
  max_slots: 3,
  application_mode: "manual",
  submission_deadline_days: 7,
  target_platforms: [],
  tier_required: 1,
};

// ─── Step Progress ───
function StepNav({ current, labels }: { current: number; labels: string[] }) {
  return (
    <div className="flex gap-2">
      {labels.map((l, i) => (
        <div key={l} className="flex items-center gap-2">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full font-display text-xs font-bold transition-colors ${
              i <= current
                ? "bg-primary text-white"
                : "border border-border text-slate-500"
            }`}
          >
            {i < current ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              i + 1
            )}
          </div>
          <span
            className={`hidden font-display text-xs font-semibold lg:inline ${
              i <= current ? "text-foreground" : "text-slate-500"
            }`}
          >
            {l}
          </span>
          {i < labels.length - 1 && (
            <div className="hidden h-px w-6 bg-border lg:block" />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Step 1: Basics ───
function BasicsStep({
  data,
  onChange,
  onNext,
}: {
  data: GigFormData;
  onChange: (d: Partial<GigFormData>) => void;
  onNext: () => void;
}) {
  const valid = data.title.trim().length > 0;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight">
          Campaign basics
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          What's this gig about? Give influencers a reason to apply.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label className="font-display text-[13px]">Gig Title *</Label>
        <Input
          placeholder="e.g., Weekend Brunch Feature"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="h-11 text-base lg:h-10 lg:text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="font-display text-[13px]">Description</Label>
        <Textarea
          placeholder="Describe what the influencer will experience and what you expect..."
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={4}
          className="resize-none text-base lg:text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="font-display text-[13px]">
          Audience Offer *{" "}
          <span className="font-normal text-slate-500">
            (shown to followers)
          </span>
        </Label>
        <Input
          placeholder="e.g., 10% off, free appetizer, BOGO"
          value={data.audience_offer}
          onChange={(e) => onChange({ audience_offer: e.target.value })}
          className="h-11 text-base lg:h-10 lg:text-sm"
        />
        <p className="text-xs text-slate-500">
          Every campaign must include an offer for the influencer's audience.
        </p>
      </div>

      <Button
        onClick={onNext}
        disabled={!valid}
        className="h-12 w-full rounded-xl font-display font-semibold transition-all duration-200"
      >
        Continue
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
}

// ─── Step 2: Reward ───
function RewardStep({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: GigFormData;
  onChange: (d: Partial<GigFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const rewardTypes: {
    id: RewardType;
    icon: React.ReactNode;
    label: string;
    desc: string;
  }[] = [
    {
      id: "free",
      icon: <Heart className="h-5 w-5" />,
      label: "Free",
      desc: "Exposure only — great for new businesses",
    },
    {
      id: "barter",
      icon: <Gift className="h-5 w-5" />,
      label: "Barter",
      desc: "In-kind exchange (meal, stay, treatment)",
    },
    {
      id: "paid",
      icon: <DollarSign className="h-5 w-5" />,
      label: "Paid (MVR)",
      desc: "Monetary compensation with escrow",
    },
  ];

  const baseAmount = Math.round((data.budget_total * data.base_percent) / 100).toLocaleString();
  const completionAmount = Math.round(
    data.budget_total -
    (data.budget_total * data.base_percent) / 100
  ).toLocaleString();

  return (
    <div className="space-y-5">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </button>

      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight">
          Reward configuration
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Choose how you'll compensate influencers.
        </p>
      </div>

      {/* Reward type selector */}
      <div className="grid grid-cols-3 gap-2">
        {rewardTypes.map((r) => (
          <button
            key={r.id}
            onClick={() => onChange({ reward_type: r.id })}
            className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-3.5 text-center transition-all ${
              data.reward_type === r.id
                ? "border-primary bg-primary/[.03] text-primary"
                : "border-border text-slate-500 hover:border-border/80"
            }`}
          >
            {r.icon}
            <span className="font-display text-[13px] font-bold">{r.label}</span>
            <span className="text-[10px] leading-tight">{r.desc}</span>
          </button>
        ))}
      </div>

      {/* Barter description */}
      {data.reward_type === "barter" && (
        <div className="animate-fade-up space-y-1.5">
          <Label className="font-display text-[13px]">
            What are you offering? *
          </Label>
          <Input
            placeholder="e.g., Full brunch for 2, spa treatment..."
            value={data.barter_description}
            onChange={(e) => onChange({ barter_description: e.target.value })}
            className="h-11 text-base lg:h-10 lg:text-sm"
          />
        </div>
      )}

      {/* Paid config */}
      {data.reward_type === "paid" && (
        <div className="animate-fade-up space-y-5">
          <div className="space-y-1.5">
            <Label className="font-display text-[13px]">
              Total Budget (per influencer) *
            </Label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-display text-[13px] font-semibold text-slate-400">MVR</span>
              <Input
                type="number"
                min={100}
                value={data.budget_total}
                onChange={(e) =>
                  onChange({ budget_total: Number(e.target.value) || 0 })
                }
                className="h-11 pl-14 font-mono text-base lg:h-10 lg:text-sm"
              />
            </div>
          </div>

          {/* Split slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-display text-[13px]">
                Base / Completion Split
              </Label>
              <span className="font-mono text-xs text-slate-500">
                {data.base_percent}% / {100 - data.base_percent}%
              </span>
            </div>
            <Slider
              value={[data.base_percent]}
              onValueChange={([v]) => onChange({ base_percent: v })}
              min={10}
              max={90}
              step={5}
              className="py-2"
            />
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-emerald-200 bg-emerald-50/50">
                <CardContent className="p-3 text-center">
                  <div className="font-display text-[11px] font-semibold uppercase text-emerald-700">
                    Base Rate (locked)
                  </div>
                  <div className="mt-1 font-mono text-lg font-bold text-emerald-800">
                    MVR {baseAmount}
                  </div>
                  <div className="mt-0.5 text-[10px] text-emerald-600">
                    For visit + feedback
                  </div>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-primary/[.02]">
                <CardContent className="p-3 text-center">
                  <div className="font-display text-[11px] font-semibold uppercase text-primary">
                    Completion
                  </div>
                  <div className="mt-1 font-mono text-lg font-bold text-primary">
                    MVR {completionAmount}
                  </div>
                  <div className="mt-0.5 text-[10px] text-slate-500">
                    For approved content
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex gap-2 rounded-lg bg-blue-50 p-3 text-xs leading-relaxed text-blue-800">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
            Base Rate guarantees either content or a structured feedback
            report. Completion Reward is only for approved content.
          </div>
        </div>
      )}

      {/* Tier required */}
      <div className="space-y-1.5">
        <Label className="font-display text-[13px]">Minimum Tier Required</Label>
        <div className="flex gap-2">
          {([1, 2, 3] as const).map((t) => (
            <button
              key={t}
              onClick={() => onChange({ tier_required: t })}
              className={`flex-1 rounded-xl border py-2.5 font-display text-sm font-bold transition-all ${
                data.tier_required === t
                  ? "border-primary bg-primary/[.04] text-primary"
                  : "border-border text-slate-500"
              }`}
            >
              Tier {t}
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={onNext}
        className="h-12 w-full rounded-xl font-display font-semibold transition-all duration-200"
      >
        Continue
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
}

// ─── Step 3: Settings ───
function SettingsStep({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: GigFormData;
  onChange: (d: Partial<GigFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  function togglePlatform(p: string) {
    onChange({
      target_platforms: data.target_platforms.includes(p)
        ? data.target_platforms.filter((x) => x !== p)
        : [...data.target_platforms, p],
    });
  }

  return (
    <div className="space-y-5">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </button>

      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight">
          Gig settings
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Configure capacity, deadlines, and target platforms.
        </p>
      </div>

      {/* Application mode */}
      <div className="space-y-1.5">
        <Label className="font-display text-[13px]">Application Mode *</Label>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { id: "auto", label: "Auto-Accept", desc: "Any eligible influencer" },
              { id: "manual", label: "Manual Review", desc: "You approve each one" },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              onClick={() => onChange({ application_mode: m.id })}
              className={`rounded-xl border-2 p-3.5 text-left transition-all ${
                data.application_mode === m.id
                  ? "border-primary bg-primary/[.03]"
                  : "border-border"
              }`}
            >
              <div
                className={`font-display text-[13px] font-bold ${
                  data.application_mode === m.id
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {m.label}
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500">
                {m.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Max slots */}
      <div className="space-y-1.5">
        <Label className="font-display text-[13px]">
          <Users className="mr-1 inline h-3.5 w-3.5" />
          Max Influencer Slots
        </Label>
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              onChange({ max_slots: Math.max(1, data.max_slots - 1) })
            }
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border font-bold text-foreground hover:bg-muted"
          >
            −
          </button>
          <span className="w-12 text-center font-mono text-lg font-bold">
            {data.max_slots}
          </span>
          <button
            onClick={() => onChange({ max_slots: data.max_slots + 1 })}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border font-bold text-foreground hover:bg-muted"
          >
            +
          </button>
        </div>
      </div>

      {/* Submission deadline */}
      <div className="space-y-1.5">
        <Label className="font-display text-[13px]">
          <Clock className="mr-1 inline h-3.5 w-3.5" />
          Submission Deadline (days after visit)
        </Label>
        <div className="flex gap-2">
          {[3, 5, 7, 14].map((d) => (
            <button
              key={d}
              onClick={() => onChange({ submission_deadline_days: d })}
              className={`flex-1 rounded-xl border py-2.5 font-display text-sm font-bold transition-all ${
                data.submission_deadline_days === d
                  ? "border-primary bg-primary/[.04] text-primary"
                  : "border-border text-slate-500"
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      {/* Target platforms */}
      <div className="space-y-1.5">
        <Label className="font-display text-[13px]">
          <Target className="mr-1 inline h-3.5 w-3.5" />
          Target Platforms *
        </Label>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => (
            <button
              key={p}
              onClick={() => togglePlatform(p)}
              className={`rounded-xl border px-3.5 py-2 font-display text-[13px] font-semibold transition-all ${
                data.target_platforms.includes(p)
                  ? "border-primary bg-primary/[.04] text-primary"
                  : "border-border text-slate-500"
              }`}
            >
              {data.target_platforms.includes(p) && "✓ "}
              {p}
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={data.target_platforms.length === 0}
        className="h-12 w-full rounded-xl font-display font-semibold transition-all duration-200"
      >
        Review Gig
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
}

// ─── Step 4: Review + Publish ───
function ReviewStep({
  data,
  onBack,
  onPublish,
}: {
  data: GigFormData;
  onBack: () => void;
  onPublish: () => void;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const totalCost = data.reward_type === "paid" ? data.budget_total * data.max_slots : 0;

  const rows: { label: string; value: string }[] = [
    { label: "Title", value: data.title },
    { label: "Reward Type", value: data.reward_type.charAt(0).toUpperCase() + data.reward_type.slice(1) },
    ...(data.reward_type === "paid"
      ? [
          { label: "Budget / Influencer", value: `MVR ${data.budget_total.toLocaleString()}` },
          { label: "Split", value: `${data.base_percent}% Base / ${100 - data.base_percent}% Completion` },
        ]
      : []),
    ...(data.reward_type === "barter"
      ? [{ label: "Barter Offer", value: data.barter_description }]
      : []),
    { label: "Audience Offer", value: data.audience_offer || "—" },
    { label: "Mode", value: data.application_mode === "auto" ? "Auto-Accept" : "Manual Review" },
    { label: "Slots", value: String(data.max_slots) },
    { label: "Deadline", value: `${data.submission_deadline_days} days` },
    { label: "Platforms", value: data.target_platforms.join(", ") },
    { label: "Min Tier", value: `Tier ${data.tier_required}` },
  ];

  return (
    <div className="space-y-5">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </button>

      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight">
          Review your gig
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Confirm everything before publishing.
        </p>
      </div>

      <Card>
        <CardContent className="divide-y p-0">
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex items-center justify-between px-4 py-3"
            >
              <span className="font-display text-[13px] font-semibold text-slate-500">
                {r.label}
              </span>
              <span className="text-right text-sm font-medium text-foreground">
                {r.value}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {data.reward_type === "paid" && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="flex items-center gap-3 p-4">
            <Wallet className="h-5 w-5 text-amber-600" />
            <div className="flex-1">
              <div className="font-display text-[13px] font-bold text-amber-800">
                Escrow Required
              </div>
              <div className="text-xs text-amber-700">
                MVR {totalCost.toLocaleString()} will be held from your wallet ({data.max_slots}{" "}
                slots × MVR {data.budget_total.toLocaleString()})
              </div>
            </div>
            <span className="font-mono text-lg font-bold text-amber-800">
              MVR {totalCost.toLocaleString()}
            </span>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={() => setShowConfirm(true)}
        className="h-12 w-full rounded-xl font-display font-semibold transition-all duration-200"
      >
        Publish Gig
      </Button>

      {/* Confirm Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="font-display">Publish "{data.title}"?</DialogTitle>
            <DialogDescription>
              {data.reward_type === "paid" ? (
                <>
                  MVR {totalCost.toLocaleString()} will be deducted from your wallet and held in
                  escrow. Funds are released on content approval or refunded on
                  feedback path.
                </>
              ) : (
                "This gig will be visible to eligible influencers immediately."
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowConfirm(false);
                onPublish();
              }}
            >
              Confirm & Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Success ───
function PublishSuccess() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center pt-16 text-center">
      <div className="flex h-20 w-20 animate-pop-in items-center justify-center rounded-full bg-gradient-to-br from-amplii-indigo to-amplii-violet shadow-lg shadow-amplii-indigo/25">
        <CheckCircle2 className="h-9 w-9 text-white" />
      </div>
      <h1 className="mt-6 font-display text-2xl font-extrabold tracking-tight">
        Gig Published!
      </h1>
      <p className="mt-2 max-w-[280px] text-sm text-slate-500">
        Your campaign is now live. Eligible influencers can discover and apply.
      </p>
      <div className="mt-6 flex gap-3">
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          Dashboard
        </Button>
        <Button onClick={() => router.push("/gigs/create")}>
          Create Another
        </Button>
      </div>
    </div>
  );
}

// ─── Main ───
export default function CreateGigPage() {
  const [stepIdx, setStepIdx] = useState(0);
  const [data, setData] = useState<GigFormData>(initialData);
  const [published, setPublished] = useState(false);

  function update(partial: Partial<GigFormData>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  if (published) return <PublishSuccess />;

  const step = STEPS[stepIdx];

  return (
    <div className="flex min-h-screen items-start justify-center px-6 pt-6 lg:items-start lg:pt-12">
      <div className="w-full max-w-[480px] pb-16">
        <div className="mb-6">
          <StepNav
            current={stepIdx}
            labels={["Basics", "Reward", "Settings", "Review"]}
          />
        </div>

        {step === "basics" && (
          <BasicsStep data={data} onChange={update} onNext={() => setStepIdx(1)} />
        )}
        {step === "reward" && (
          <RewardStep
            data={data}
            onChange={update}
            onNext={() => setStepIdx(2)}
            onBack={() => setStepIdx(0)}
          />
        )}
        {step === "settings" && (
          <SettingsStep
            data={data}
            onChange={update}
            onNext={() => setStepIdx(3)}
            onBack={() => setStepIdx(1)}
          />
        )}
        {step === "review" && (
          <ReviewStep
            data={data}
            onBack={() => setStepIdx(2)}
            onPublish={() => setPublished(true)}
          />
        )}
      </div>
    </div>
  );
}
