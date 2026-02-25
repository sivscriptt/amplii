"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase";
import type { UserRole, SocialAccount } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Camera,
  MapPin,
  Wallet,
  CheckCircle2,
  Info,
  Trophy,
} from "lucide-react";

// ─── Types ───
type OnboardingStep = "role" | "profile" | "wallet" | "ready";

interface BusinessFormData {
  business_name: string;
  category: string;
  location: string;
}

interface InfluencerFormData {
  display_name: string;
  handle: string;
  platform: string;
  linked: boolean;
}

const STEPS: OnboardingStep[] = ["role", "profile", "wallet", "ready"];
const CATEGORIES = ["Restaurant / Cafe", "Beauty / Wellness", "Retail / Boutique", "Other"];
const PLATFORMS: { name: string; abbr: string; color: string }[] = [
  { name: "Instagram", abbr: "IG", color: "bg-pink-600" },
  { name: "TikTok", abbr: "TT", color: "bg-black" },
  { name: "YouTube", abbr: "YT", color: "bg-red-600" },
];

// ─── Step Progress ───
function StepProgress({ current }: { current: number }) {
  return (
    <div className="flex gap-1.5 px-6 lg:px-0">
      {STEPS.map((_, i) => (
        <div
          key={i}
          className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
            i <= current ? "bg-primary" : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Step 1: Role Selection ───
function RoleStep({ onSelect }: { onSelect: (role: UserRole) => void }) {
  const roles: {
    id: UserRole;
    icon: React.ReactNode;
    title: string;
    desc: string;
    tags: string[];
    accent: string;
  }[] = [
    {
      id: "business",
      icon: <Home className="h-7 w-7 text-primary" />,
      title: "I'm a Business",
      desc: "Create campaigns, connect with influencers, and grow your local presence.",
      tags: ["Create gigs", "Scan QR visits", "Review content"],
      accent: "primary",
    },
    {
      id: "influencer",
      icon: <Camera className="h-7 w-7 text-amplii-violet" />,
      title: "I'm an Influencer",
      desc: "Discover local gigs, build your tier, and earn through authentic content.",
      tags: ["Browse gigs", "Earn rewards", "Build reputation"],
      accent: "accent",
    },
  ];

  return (
    <div className="px-6 lg:px-0">
      <h1 className="font-display text-2xl font-extrabold tracking-tight">
        How will you use Amplii?
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Choose your role. You can always create a second profile later.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {roles.map((r) => (
          <Card
            key={r.id}
            onClick={() => onSelect(r.id)}
            className="cursor-pointer border-2 transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
          >
            <CardContent className="flex items-start gap-3.5 p-5">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/[.06]">
                {r.icon}
              </div>
              <div className="flex-1">
                <div className="font-display text-base font-bold">{r.title}</div>
                <div className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                  {r.desc}
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {r.tags.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="font-display text-[11px] font-semibold"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground/40" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Step 2: Business Profile ───
function BusinessProfileStep({
  data,
  onChange,
  onNext,
}: {
  data: BusinessFormData;
  onChange: (d: BusinessFormData) => void;
  onNext: () => void;
}) {
  const isValid = data.business_name.trim() !== "" && data.category !== "";

  return (
    <div className="px-6 lg:px-0">
      <h1 className="font-display text-2xl font-extrabold tracking-tight">
        Set up your business
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Tell us about your business so influencers can find you.
      </p>

      <div className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <Label className="font-display text-[13px]">Business Name *</Label>
          <Input
            placeholder="e.g., The Rooftop Cafe"
            value={data.business_name}
            onChange={(e) => onChange({ ...data, business_name: e.target.value })}
            className="h-11 text-base lg:h-10 lg:text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="font-display text-[13px]">Category *</Label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onChange({ ...data, category: cat })}
                className={`rounded-lg border-[1.5px] px-3.5 py-2 font-display text-[13px] font-semibold transition-all ${
                  data.category === cat
                    ? "border-primary bg-primary/[.04] text-primary"
                    : "border-border text-muted-foreground hover:border-border/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="font-display text-[13px]">Outlet Address *</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search your address..."
              value={data.location}
              onChange={(e) => onChange({ ...data, location: e.target.value })}
              className="h-11 pl-10 text-base lg:h-10 lg:text-sm"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            GPS coordinates auto-detected for visit verification.
          </p>
        </div>

        <Button
          onClick={onNext}
          disabled={!isValid}
          className="h-11 w-full font-display text-[15px] font-semibold lg:h-10 lg:text-sm"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

// ─── Step 2: Influencer Profile ───
function InfluencerProfileStep({
  data,
  onChange,
  onNext,
}: {
  data: InfluencerFormData;
  onChange: (d: InfluencerFormData) => void;
  onNext: () => void;
}) {
  const isValid = data.display_name.trim() !== "" && data.linked;

  return (
    <div className="px-6 lg:px-0">
      <h1 className="font-display text-2xl font-extrabold tracking-tight">
        Set up your profile
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Link your socials so businesses can discover you.
      </p>

      <div className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <Label className="font-display text-[13px]">Display Name *</Label>
          <Input
            placeholder="Your name or brand"
            value={data.display_name}
            onChange={(e) => onChange({ ...data, display_name: e.target.value })}
            className="h-11 text-base lg:h-10 lg:text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="font-display text-[13px]">Handle *</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              @
            </span>
            <Input
              placeholder="yourhandle"
              value={data.handle}
              onChange={(e) => onChange({ ...data, handle: e.target.value })}
              className="h-11 pl-8 text-base lg:h-10 lg:text-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="font-display text-[13px]">Link Social Account *</Label>
          <p className="text-xs text-muted-foreground">
            Required for identity and follower count verification.
          </p>
          <div className="mt-2 flex flex-col gap-2">
            {PLATFORMS.map((p) => (
              <Card
                key={p.name}
                onClick={() =>
                  onChange({ ...data, platform: p.name, linked: true })
                }
                className={`cursor-pointer transition-all ${
                  data.platform === p.name
                    ? "border-emerald-500 bg-emerald-50"
                    : "hover:border-border/80"
                }`}
              >
                <CardContent className="flex items-center gap-3 p-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${p.color} font-display text-[11px] font-extrabold text-white`}
                  >
                    {p.abbr}
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-sm font-semibold">
                      {p.name}
                    </div>
                    {data.platform === p.name && (
                      <div className="text-xs font-medium text-emerald-600">
                        ✓ Connected · 12.4K followers
                      </div>
                    )}
                  </div>
                  <span
                    className={`font-display text-[13px] font-semibold ${
                      data.platform === p.name
                        ? "text-emerald-600"
                        : "text-primary"
                    }`}
                  >
                    {data.platform === p.name ? "Linked" : "Connect"}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Button
          onClick={onNext}
          disabled={!isValid}
          className="h-11 w-full font-display text-[15px] font-semibold lg:h-10 lg:text-sm"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

// ─── Step 3: Business Wallet ───
function BusinessWalletStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="px-6 lg:px-0">
      <h1 className="font-display text-2xl font-extrabold tracking-tight">
        Fund your wallet
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Your wallet holds funds for paid campaigns. Funds are escrowed when gigs
        go live.
      </p>

      {/* Wallet card */}
      <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-5 text-white">
        <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-white/[.04]" />
        <div className="font-display text-xs font-semibold uppercase tracking-widest text-slate-400">
          Wallet Balance
        </div>
        <div className="mt-1 font-display text-4xl font-extrabold tracking-tight">
          $0.00
        </div>
        <div className="mt-3 flex gap-3">
          <Badge variant="secondary" className="bg-white/10 text-white/90 hover:bg-white/10">
            Escrow: $0.00
          </Badge>
          <Badge variant="secondary" className="bg-white/10 text-white/90 hover:bg-white/10">
            USD
          </Badge>
        </div>
      </div>

      {/* Quick fund */}
      <div className="mt-5">
        <Label className="font-display text-[13px]">Quick fund amount</Label>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {["$50", "$100", "$250"].map((amt) => (
            <button
              key={amt}
              className="rounded-[10px] border-[1.5px] border-border py-3 font-display text-[15px] font-bold text-foreground transition-all hover:border-primary hover:bg-primary/[.02]"
            >
              {amt}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-2.5 rounded-[10px] bg-blue-50 p-3 text-[13px] leading-relaxed text-blue-800">
        <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
        You can fund your wallet later. Paid gigs require sufficient balance to
        publish.
      </div>

      <div className="mt-6 flex gap-3">
        <Button
          variant="outline"
          onClick={onNext}
          className="h-11 flex-1 font-display font-semibold lg:h-10"
        >
          Skip for Now
        </Button>
        <Button
          onClick={onNext}
          className="h-11 flex-1 font-display font-semibold lg:h-10"
        >
          Fund Wallet
        </Button>
      </div>
    </div>
  );
}

// ─── Step 3: Influencer Tier ───
function InfluencerTierStep({ onNext }: { onNext: () => void }) {
  const tiers = [
    { n: 1, name: "Starter", reward: "Free gigs only", desc: "Complete 2 Free gigs", active: true },
    { n: 2, name: "Rising", reward: "Barter rewards", desc: "Complete 3–5 Barter gigs", active: false },
    { n: 3, name: "Pro", reward: "Paid gigs ($)", desc: "Earn monetary compensation", active: false },
  ];

  return (
    <div className="px-6 lg:px-0">
      <h1 className="font-display text-2xl font-extrabold tracking-tight">
        Your growth path
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Complete gigs to unlock higher tiers and better rewards.
      </p>

      <div className="mt-6 flex flex-col">
        {tiers.map((t, i) => (
          <div key={t.n} className="flex gap-3.5">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-[10px] font-display text-sm font-extrabold ${
                  t.active
                    ? "bg-primary text-white"
                    : "border-2 border-border/50 text-muted-foreground"
                }`}
              >
                {t.n}
              </div>
              {i < 2 && <div className="my-1 w-0.5 flex-1 bg-border" />}
            </div>
            <div className={i < 2 ? "pb-3" : ""}>
              <div className="flex items-center gap-2">
                <span className="font-display text-[15px] font-bold">
                  {t.name}
                </span>
                {t.active && (
                  <Badge className="font-display text-[10px]">CURRENT</Badge>
                )}
              </div>
              <div className="mt-0.5 text-[13px] text-muted-foreground">
                {t.desc}
              </div>
              <Badge
                variant="secondary"
                className="mt-1.5 font-display text-[11px] font-semibold"
              >
                {t.reward}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <Card className="mt-6 bg-muted/50">
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-display text-[13px] font-semibold">
              Tier 1 Progress
            </span>
            <span className="text-[13px] text-muted-foreground">0 / 2 gigs</span>
          </div>
          <Progress value={0} className="h-1.5" />
        </CardContent>
      </Card>

      <Button
        onClick={onNext}
        className="mt-6 h-11 w-full font-display text-[15px] font-semibold lg:h-10 lg:text-sm"
      >
        Got it, let's go!
      </Button>
    </div>
  );
}

// ─── Step 4: Ready ───
function ReadyStep({ role }: { role: UserRole }) {
  const router = useRouter();
  const statuses =
    role === "business"
      ? [
          { icon: "🏪", label: "Profile", status: "Complete" },
          { icon: "💰", label: "Wallet", status: "Ready" },
          { icon: "📍", label: "Location", status: "Set" },
        ]
      : [
          { icon: "👤", label: "Profile", status: "Complete" },
          { icon: "🔗", label: "Socials", status: "Linked" },
          { icon: "🏆", label: "Tier 1", status: "Active" },
        ];

  return (
    <div className="flex flex-col items-center px-6 pt-16 text-center lg:px-0 lg:pt-0">
      <div className="relative mb-6">
        <div className="flex h-20 w-20 animate-pop-in items-center justify-center rounded-full bg-gradient-to-br from-amplii-indigo to-amplii-violet shadow-lg shadow-amplii-indigo/25">
          <span className="text-4xl">🎉</span>
        </div>
      </div>

      <h1 className="font-display text-[26px] font-extrabold tracking-tight lg:text-[22px]">
        You're all set!
      </h1>
      <p className="mt-2 max-w-[300px] text-[15px] leading-relaxed text-muted-foreground">
        {role === "business"
          ? "Your business profile is ready. Create your first gig to start connecting with influencers."
          : "Your influencer profile is live. Browse nearby gigs to start building your reputation."}
      </p>

      <div className="mt-6 flex gap-3">
        {statuses.map((s) => (
          <Card key={s.label} className="min-w-[80px] text-center">
            <CardContent className="p-3">
              <div className="text-xl">{s.icon}</div>
              <div className="mt-1 font-display text-[11px] font-semibold text-muted-foreground">
                {s.label}
              </div>
              <div className="mt-0.5 font-display text-xs font-bold text-emerald-600">
                ✓ {s.status}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={() => router.push(role === "business" ? "/dashboard" : "/gigs")}
        className="mt-7 h-12 gap-2 font-display text-[15px] font-semibold"
      >
        {role === "business" ? "Create First Gig" : "Browse Gigs"}
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

// ─── Main Onboarding Page ───
export default function OnboardingPage() {
  const [stepIdx, setStepIdx] = useState(0);
  const [role, setRole] = useState<UserRole | null>(null);
  const [bizData, setBizData] = useState<BusinessFormData>({
    business_name: "",
    category: "",
    location: "",
  });
  const [infData, setInfData] = useState<InfluencerFormData>({
    display_name: "",
    handle: "",
    platform: "",
    linked: false,
  });

  const step = STEPS[stepIdx];

  function goBack() {
    if (stepIdx === 1) {
      setStepIdx(0);
      setRole(null);
    } else {
      setStepIdx(Math.max(0, stepIdx - 1));
    }
  }

  async function saveProfile() {
    // In production: write to Supabase
    // const supabase = createBrowserClient();
    // await supabase.from("profiles").upsert({ ... });
    setStepIdx(3);
  }

  return (
    <div className="flex min-h-screen items-start justify-center px-0 pt-4 lg:items-center lg:px-6 lg:pt-0">
      <div className="w-full max-w-[420px]">
        {step !== "ready" && (
          <div className="mb-2">
            <StepProgress current={stepIdx} />
            <div className="flex items-center justify-between px-6 pb-4 pt-4 lg:px-0">
              {stepIdx > 0 ? (
                <button
                  onClick={goBack}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <div />
              )}
              <span className="font-display text-xs font-semibold text-muted-foreground">
                Step {stepIdx + 1} of 4
              </span>
            </div>
          </div>
        )}

        {step === "role" && (
          <RoleStep
            onSelect={(r) => {
              setRole(r);
              setStepIdx(1);
            }}
          />
        )}

        {step === "profile" && role === "business" && (
          <BusinessProfileStep
            data={bizData}
            onChange={setBizData}
            onNext={() => setStepIdx(2)}
          />
        )}

        {step === "profile" && role === "influencer" && (
          <InfluencerProfileStep
            data={infData}
            onChange={setInfData}
            onNext={() => setStepIdx(2)}
          />
        )}

        {step === "wallet" && role === "business" && (
          <BusinessWalletStep onNext={() => setStepIdx(3)} />
        )}

        {step === "wallet" && role === "influencer" && (
          <InfluencerTierStep onNext={() => setStepIdx(3)} />
        )}

        {step === "ready" && role && <ReadyStep role={role} />}
      </div>
    </div>
  );
}
