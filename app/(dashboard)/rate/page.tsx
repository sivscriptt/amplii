"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ChevronLeft,
  Star,
  CheckCircle2,
  Lock,
  Clock,
} from "lucide-react";

type RatingScreen = "prompt" | "form" | "confirm";
type Perspective = "business" | "influencer";

interface RatingData {
  score: 0 | 1 | 2 | 3 | 4 | 5;
  tags: string[];
  comment: string;
}

const STAR_LABELS = ["", "Poor", "Below Average", "Good", "Great", "Excellent"];
const BIZ_TAGS = ["Professional", "Great Content", "On Time", "Communicative", "Creative", "Authentic"];
const INF_TAGS = ["Welcoming", "As Described", "Smooth Process", "Good Product", "Quick Scan", "Would Return"];

// ─── Star Selector (vibration-free) ───
function StarSelector({
  rating,
  onRate,
  size = "lg",
}: {
  rating: number;
  onRate: (n: 1 | 2 | 3 | 4 | 5) => void;
  size?: "sm" | "lg";
}) {
  const [hover, setHover] = useState(0);
  const active = hover || rating;
  const starSize = size === "lg" ? "h-11 w-11" : "h-4 w-4";
  const gap = size === "lg" ? "gap-3" : "gap-0.5";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`flex ${gap}`}>
        {([1, 2, 3, 4, 5] as const).map((i) => (
          <button
            key={i}
            onClick={() => onRate(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            className={`flex items-center justify-center rounded-lg p-1 transition-colors duration-200 ${
              size === "lg" ? "hover:bg-amber-50" : ""
            }`}
            aria-label={`${i} star${i > 1 ? "s" : ""}`}
          >
            <Star
              className={`${starSize} pointer-events-none ${
                i <= active
                  ? "fill-amplii-amber text-amplii-amber"
                  : "fill-slate-100 text-slate-200"
              }`}
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
      {size === "lg" && active > 0 && (
        <span className="font-display text-sm font-bold text-amplii-amber">
          {STAR_LABELS[active]}
        </span>
      )}
    </div>
  );
}

function GigSummary({ perspective }: { perspective: Perspective }) {
  return (
    <Card className="border-slate-100 shadow-sm">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
          <span className="text-[22px]">☕</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-[15px] font-bold text-slate-900">
            Weekend Brunch Feature
          </div>
          <div className="mt-1 text-[13px] text-slate-500">
            {perspective === "business" ? "with @yaania" : "at Treehouse"}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <Badge className="rounded-full bg-emerald-50 font-display text-[11px] font-bold text-emerald-700 shadow-none">
            ✓ Completed
          </Badge>
          <span className="font-mono text-[12px] text-slate-400">MVR 1,500</span>
        </div>
      </CardContent>
    </Card>
  );
}

function RateeCard({ perspective }: { perspective: Perspective }) {
  const isBiz = perspective === "business";
  return (
    <Card className="border-slate-100 shadow-sm">
      <CardContent className="p-6 text-center">
        <div className="mb-2 font-display text-[11px] font-bold uppercase tracking-widest text-slate-400">
          {isBiz ? "Rating Influencer" : "Rating Business"}
        </div>
        <div className="mx-auto mb-5 flex items-center justify-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amplii-violet to-amplii-coral font-display text-[15px] font-bold text-white shadow-sm">
            {isBiz ? "YA" : "TH"}
          </div>
          <div className="text-left">
            <div className="font-display text-[15px] font-bold text-slate-900">
              {isBiz ? "@yaania" : "Treehouse"}
            </div>
            <div className="mt-0.5 text-[13px] text-slate-500">
              {isBiz ? "8.2K followers · Tier 2" : "Restaurant · Malé"}
            </div>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-[13px] text-slate-500">
          <Star className="h-3.5 w-3.5 fill-amplii-amber text-amplii-amber" />
          {isBiz ? "4.8 avg from 12 ratings" : "4.6 avg from 38 ratings"}
        </div>
      </CardContent>
    </Card>
  );
}

function PromptScreen({ perspective, onRate }: { perspective: Perspective; onRate: () => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amplii-amber/10 to-amplii-coral/10">
          <Star className="h-8 w-8 fill-amplii-amber text-amplii-amber" />
        </div>
        <h1 className="font-display text-[26px] font-extrabold tracking-tight text-slate-900">
          How was your experience?
        </h1>
        <p className="mx-auto mt-3 max-w-[320px] text-[15px] leading-relaxed text-slate-500">
          {perspective === "business"
            ? "Rate your collaboration with this influencer."
            : "Rate your experience with this business."}
        </p>
      </div>
      <GigSummary perspective={perspective} />
      <RateeCard perspective={perspective} />
      <Button onClick={onRate} className="h-12 w-full rounded-xl font-display text-[15px] font-semibold transition-all duration-200">
        Rate Now
      </Button>
      <Button variant="ghost" className="w-full text-[13px] text-slate-400 transition-colors duration-200 hover:text-slate-600">
        Remind me later
      </Button>
    </div>
  );
}

function FormScreen({ perspective, onSubmit, onBack }: { perspective: Perspective; onSubmit: (data: RatingData) => void; onBack: () => void }) {
  const [rating, setRating] = useState<RatingData>({ score: 0, tags: [], comment: "" });
  const isBiz = perspective === "business";
  const tagOpts = isBiz ? BIZ_TAGS : INF_TAGS;

  function toggleTag(tag: string) {
    setRating((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }));
  }

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-1.5 text-[13px] text-slate-400 transition-colors duration-200 hover:text-slate-700">
        <ChevronLeft className="h-4 w-4" />Back
      </button>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amplii-violet to-amplii-coral font-display text-sm font-bold text-white">
          {isBiz ? "YA" : "TH"}
        </div>
        <div>
          <div className="font-display text-[15px] font-bold text-slate-900">Rate {isBiz ? "@yaania" : "Treehouse"}</div>
          <div className="text-[13px] text-slate-500">Weekend Brunch Feature</div>
        </div>
      </div>

      <Card className="border-slate-100 bg-slate-50/50 shadow-sm">
        <CardContent className="py-8 text-center">
          <div className="mb-4 font-display text-[11px] font-bold uppercase tracking-widest text-slate-400">Overall Rating</div>
          <StarSelector rating={rating.score} onRate={(n) => setRating((p) => ({ ...p, score: n }))} />
        </CardContent>
      </Card>

      {rating.score > 0 && (
        <div className="animate-fade-up space-y-3">
          <Label className="font-display text-[13px] text-slate-700">
            What stood out? <span className="font-normal text-slate-400">(optional)</span>
          </Label>
          <div className="flex flex-wrap gap-2">
            {tagOpts.map((t) => (
              <button
                key={t}
                onClick={() => toggleTag(t)}
                className={`rounded-full border px-4 py-2 font-display text-[12px] font-semibold transition-all duration-200 ${
                  rating.tags.includes(t)
                    ? "border-amplii-indigo/30 bg-amplii-indigo/[.04] text-amplii-indigo"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {rating.tags.includes(t) && "✓ "}{t}
              </button>
            ))}
          </div>
        </div>
      )}

      {rating.score > 0 && (
        <div className="animate-fade-up space-y-2">
          <Label className="font-display text-[13px] text-slate-700">
            Additional comments <span className="font-normal text-slate-400">(optional)</span>
          </Label>
          <Textarea
            placeholder={isBiz ? "Share your experience working with this influencer..." : "Share your experience with this business..."}
            value={rating.comment}
            onChange={(e) => setRating((p) => ({ ...p, comment: e.target.value.slice(0, 500) }))}
            rows={3}
            className="resize-none rounded-xl border-slate-200 text-[15px] transition-colors duration-200 focus:border-amplii-indigo/30 lg:text-sm"
          />
          <div className="text-right text-[11px] text-slate-400">{rating.comment.length}/500</div>
        </div>
      )}

      <Button
        onClick={() => rating.score > 0 && onSubmit(rating)}
        disabled={rating.score === 0}
        className="h-12 w-full rounded-xl font-display text-[15px] font-semibold transition-all duration-200"
      >
        Submit Rating
      </Button>

      <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-4 py-3 text-[12px] text-slate-400">
        <Lock className="h-3.5 w-3.5" />
        Ratings are visible on profiles. Abusive ratings can be disputed.
      </div>
    </div>
  );
}

function ConfirmScreen({ perspective, data }: { perspective: Perspective; data: RatingData }) {
  const router = useRouter();
  const isBiz = perspective === "business";

  return (
    <div className="space-y-5 text-center">
      <div className="mx-auto flex h-[72px] w-[72px] animate-pop-in items-center justify-center rounded-full bg-emerald-50">
        <CheckCircle2 className="h-8 w-8 text-emerald-500" strokeWidth={2.5} />
      </div>
      <div>
        <h1 className="font-display text-[26px] font-extrabold tracking-tight text-slate-900">Rating submitted!</h1>
        <p className="mt-2 text-[15px] text-slate-500">Thanks for your feedback.</p>
      </div>

      <Card className="border-slate-100 text-left shadow-sm">
        <CardContent className="p-5 lg:p-6">
          <div className="mb-4 font-display text-[11px] font-bold uppercase tracking-widest text-slate-400">Your Rating</div>
          <div className="flex gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amplii-indigo to-amplii-violet font-display text-sm font-bold text-white">
              {isBiz ? "YB" : "YI"}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-bold text-slate-900">You</span>
                <span className="text-[11px] text-slate-400">Just now</span>
              </div>
              <div className="mt-1.5 flex gap-0.5">
                {([1, 2, 3, 4, 5] as const).map((i) => (
                  <Star key={i} className={`h-3.5 w-3.5 pointer-events-none ${i <= data.score ? "fill-amplii-amber text-amplii-amber" : "fill-slate-100 text-slate-200"}`} />
                ))}
              </div>
              {data.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {data.tags.map((t) => (
                    <Badge key={t} className="rounded-full bg-amplii-indigo/[.06] font-display text-[11px] text-amplii-indigo shadow-none">{t}</Badge>
                  ))}
                </div>
              )}
              {data.comment && <p className="mt-3 text-[13px] leading-relaxed text-slate-500">{data.comment}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-100 bg-slate-50/50 text-left shadow-sm">
        <CardContent className="p-5 lg:p-6">
          <div className="mb-3 font-display text-[11px] font-bold uppercase tracking-widest text-slate-400">
            {isBiz ? "Influencer's Updated Score" : "Business's Updated Score"}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amplii-violet to-amplii-coral font-display text-[13px] font-bold text-white">
              {isBiz ? "YA" : "TH"}
            </div>
            <div className="flex-1">
              <div className="font-display text-sm font-bold text-slate-900">{isBiz ? "@yaania" : "Treehouse"}</div>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex gap-0.5">
                  {([1, 2, 3, 4, 5] as const).map((i) => (
                    <Star key={i} className={`h-3 w-3 pointer-events-none ${i <= 4 ? "fill-amplii-amber text-amplii-amber" : "fill-slate-100 text-slate-200"}`} />
                  ))}
                </div>
                <span className="font-mono text-[13px] font-bold text-slate-900">{isBiz ? "4.8" : "4.6"}</span>
                <span className="text-[11px] text-slate-400">({isBiz ? "13" : "39"} ratings)</span>
              </div>
            </div>
            <Badge className="rounded-full bg-emerald-50 font-display text-[11px] font-bold text-emerald-700 shadow-none">+0.1 ↑</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50/50 px-4 py-3.5 text-left text-[13px] text-amber-700">
        <Clock className="h-4 w-4 flex-shrink-0 text-amplii-amber" />
        {isBiz ? "Waiting for influencer's rating" : "Waiting for business's rating"}
      </div>

      <Button onClick={() => router.push("/dashboard")} className="h-12 w-full rounded-xl font-display text-[15px] font-semibold transition-all duration-200">
        Back to Dashboard
      </Button>
    </div>
  );
}

export default function RatePage() {
  const [screen, setScreen] = useState<RatingScreen>("prompt");
  const [submittedData, setSubmittedData] = useState<RatingData>({ score: 0, tags: [], comment: "" });
  const perspective: Perspective = "business";

  function handleSubmit(data: RatingData) {
    setSubmittedData(data);
    setScreen("confirm");
  }

  return (
    <div className="mx-auto w-full max-w-[460px] pb-16">
      {screen === "prompt" && <PromptScreen perspective={perspective} onRate={() => setScreen("form")} />}
      {screen === "form" && <FormScreen perspective={perspective} onSubmit={handleSubmit} onBack={() => setScreen("prompt")} />}
      {screen === "confirm" && <ConfirmScreen perspective={perspective} data={submittedData} />}
    </div>
  );
}
