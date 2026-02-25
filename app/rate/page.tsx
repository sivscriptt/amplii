"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase";
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
  Info,
} from "lucide-react";

// ─── Types ───
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

// ─── Star Selector ───
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
  const px = size === "lg" ? "h-10 w-10" : "h-3.5 w-3.5";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`flex ${size === "lg" ? "gap-2" : "gap-0.5"}`}>
        {([1, 2, 3, 4, 5] as const).map((i) => (
          <button
            key={i}
            onClick={() => onRate(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            className={`transition-transform ${
              hover === i ? "scale-110" : ""
            }`}
            aria-label={`${i} star${i > 1 ? "s" : ""}`}
          >
            <Star
              className={`${px} ${
                i <= active
                  ? "fill-amplii-amber text-amplii-amber"
                  : "fill-muted text-border"
              }`}
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
      {size === "lg" && active > 0 && (
        <span className="font-display text-sm font-semibold text-amplii-amber">
          {STAR_LABELS[active]}
        </span>
      )}
    </div>
  );
}

// ─── Gig Summary ───
function GigSummary({ perspective }: { perspective: Perspective }) {
  return (
    <Card className="bg-muted/50">
      <CardContent className="flex items-center gap-3.5 p-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
          <span className="text-[22px]">☕</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-sm font-bold">
            Summer Brunch Promo
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            {perspective === "business"
              ? "with @sarah.creates"
              : "at The Rooftop Cafe"}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge
            variant="secondary"
            className="bg-emerald-50 font-display text-[11px] font-bold text-emerald-700"
          >
            ✓ Completed
          </Badge>
          <span className="font-mono text-[11px] text-muted-foreground">
            $100
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Ratee Card ───
function RateeCard({ perspective }: { perspective: Perspective }) {
  const isBiz = perspective === "business";
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <div className="mb-3 font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {isBiz ? "Rating Influencer" : "Rating Business"}
        </div>
        <div className="mx-auto mb-4 flex items-center justify-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amplii-violet to-amplii-coral font-display text-base font-bold text-white">
            {isBiz ? "SC" : "RC"}
          </div>
          <div className="text-left">
            <div className="font-display text-[15px] font-bold">
              {isBiz ? "@sarah.creates" : "The Rooftop Cafe"}
            </div>
            <div className="text-xs text-muted-foreground">
              {isBiz ? "12.4K followers · Tier 2" : "Restaurant · Male, Maldives"}
            </div>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-amplii-amber text-amplii-amber" />
          {isBiz ? "4.8 avg from 12 ratings" : "4.6 avg from 38 ratings"}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Screen 1: Prompt ───
function PromptScreen({
  perspective,
  onRate,
}: {
  perspective: Perspective;
  onRate: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amplii-amber/10 to-amplii-coral/10">
          <Star className="h-8 w-8 fill-amplii-amber text-amplii-amber" />
        </div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight">
          How was your experience?
        </h1>
        <p className="mx-auto mt-2 max-w-[320px] text-sm leading-relaxed text-muted-foreground">
          {perspective === "business"
            ? "Rate your collaboration with this influencer. Helps other businesses decide."
            : "Rate your experience with this business. Helps other influencers."}
        </p>
      </div>

      <GigSummary perspective={perspective} />
      <RateeCard perspective={perspective} />

      <Button
        onClick={onRate}
        className="h-11 w-full font-display text-[15px] font-semibold lg:h-10 lg:text-sm"
      >
        Rate Now
      </Button>
      <Button
        variant="ghost"
        className="w-full text-sm text-muted-foreground"
      >
        Remind me later
      </Button>
    </div>
  );
}

// ─── Screen 2: Form ───
function FormScreen({
  perspective,
  onSubmit,
  onBack,
}: {
  perspective: Perspective;
  onSubmit: (data: RatingData) => void;
  onBack: () => void;
}) {
  const [rating, setRating] = useState<RatingData>({
    score: 0,
    tags: [],
    comment: "",
  });
  const isBiz = perspective === "business";
  const tagOpts = isBiz ? BIZ_TAGS : INF_TAGS;

  function toggleTag(tag: string) {
    setRating((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  }

  return (
    <div className="space-y-5">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </button>

      {/* Mini context */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amplii-violet to-amplii-coral font-display text-[13px] font-bold text-white">
          {isBiz ? "SC" : "RC"}
        </div>
        <div>
          <div className="font-display text-sm font-semibold">
            Rate {isBiz ? "@sarah.creates" : "The Rooftop Cafe"}
          </div>
          <div className="text-xs text-muted-foreground">
            Summer Brunch Promo
          </div>
        </div>
      </div>

      {/* Stars */}
      <Card className="bg-muted/50">
        <CardContent className="py-6 text-center">
          <div className="mb-3 font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Overall Rating
          </div>
          <StarSelector
            rating={rating.score}
            onRate={(n) => setRating((p) => ({ ...p, score: n }))}
          />
        </CardContent>
      </Card>

      {/* Tags — animate in */}
      {rating.score > 0 && (
        <div className="animate-fade-up space-y-2.5">
          <Label className="font-display text-[13px]">
            What stood out?{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <div className="flex flex-wrap gap-1.5">
            {tagOpts.map((t) => (
              <button
                key={t}
                onClick={() => toggleTag(t)}
                className={`rounded-lg border-[1.5px] px-3 py-1.5 font-display text-xs font-semibold transition-all ${
                  rating.tags.includes(t)
                    ? "border-primary bg-primary/[.04] text-primary"
                    : "border-border text-muted-foreground hover:border-border/80"
                }`}
              >
                {rating.tags.includes(t) && "✓ "}
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Comment */}
      {rating.score > 0 && (
        <div className="animate-fade-up space-y-1.5">
          <Label className="font-display text-[13px]">
            Additional comments{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            placeholder={
              isBiz
                ? "Share your experience working with this influencer..."
                : "Share your experience with this business..."
            }
            value={rating.comment}
            onChange={(e) =>
              setRating((p) => ({ ...p, comment: e.target.value.slice(0, 500) }))
            }
            rows={3}
            className="resize-none text-base lg:text-sm"
          />
          <div className="text-right text-[11px] text-muted-foreground">
            {rating.comment.length}/500
          </div>
        </div>
      )}

      <Button
        onClick={() => rating.score > 0 && onSubmit(rating)}
        disabled={rating.score === 0}
        className="h-11 w-full font-display text-[15px] font-semibold lg:h-10 lg:text-sm"
      >
        Submit Rating
      </Button>

      <div className="flex items-center gap-2 rounded-lg bg-muted px-3.5 py-2.5 text-xs text-muted-foreground">
        <Lock className="h-3.5 w-3.5" />
        Ratings are visible on profiles. Abusive ratings can be disputed.
      </div>
    </div>
  );
}

// ─── Screen 3: Confirmation ───
function ConfirmScreen({
  perspective,
  data,
}: {
  perspective: Perspective;
  data: RatingData;
}) {
  const router = useRouter();
  const isBiz = perspective === "business";

  async function handleDone() {
    // In production: save rating to Supabase
    // const supabase = createBrowserClient();
    // await supabase.from("ratings").insert({ ... });
    router.push("/dashboard");
  }

  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex h-[72px] w-[72px] animate-pop-in items-center justify-center rounded-full bg-emerald-50">
        <CheckCircle2 className="h-8 w-8 text-emerald-500" strokeWidth={2.5} />
      </div>

      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight">
          Rating submitted!
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks for your feedback. Your rating helps the Amplii community.
        </p>
      </div>

      {/* Your review */}
      <Card className="text-left">
        <CardContent className="p-4">
          <div className="mb-3 font-display text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Your Rating
          </div>
          <div className="flex gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amplii-indigo to-amplii-violet font-display text-sm font-bold text-white">
              {isBiz ? "YB" : "YI"}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-semibold">You</span>
                <span className="text-[11px] text-muted-foreground">
                  Just now
                </span>
              </div>
              <div className="mt-1 flex gap-0.5">
                {([1, 2, 3, 4, 5] as const).map((i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i <= data.score
                        ? "fill-amplii-amber text-amplii-amber"
                        : "fill-muted text-border"
                    }`}
                  />
                ))}
              </div>
              {data.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {data.tags.map((t) => (
                    <Badge key={t} className="font-display text-[10px]">
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
              {data.comment && (
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {data.comment}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Updated score */}
      <Card className="bg-muted/50 text-left">
        <CardContent className="p-4">
          <div className="mb-2.5 font-display text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            {isBiz ? "Influencer's Updated Score" : "Business's Updated Score"}
          </div>
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amplii-violet to-amplii-coral font-display text-[13px] font-bold text-white">
              {isBiz ? "SC" : "RC"}
            </div>
            <div className="flex-1">
              <div className="font-display text-sm font-semibold">
                {isBiz ? "@sarah.creates" : "The Rooftop Cafe"}
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {([1, 2, 3, 4, 5] as const).map((i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i <= 4
                          ? "fill-amplii-amber text-amplii-amber"
                          : "fill-muted text-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono text-[13px] font-bold">
                  {isBiz ? "4.8" : "4.6"}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  ({isBiz ? "13" : "39"} ratings)
                </span>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-emerald-50 font-display text-[11px] font-bold text-emerald-700"
            >
              +0.1 ↑
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Waiting */}
      <div className="flex items-center gap-2.5 rounded-[10px] border border-amplii-amber/20 bg-amplii-amber/[.04] px-3.5 py-2.5 text-left text-[13px] text-amber-800">
        <Clock className="h-4 w-4 flex-shrink-0 text-amplii-amber" />
        {isBiz
          ? "Waiting for influencer's rating"
          : "Waiting for business's rating"}
      </div>

      <Button
        onClick={handleDone}
        className="h-11 w-full font-display text-[15px] font-semibold lg:h-10 lg:text-sm"
      >
        Back to Dashboard
      </Button>
    </div>
  );
}

// ─── Main Page ───
export default function RatePage() {
  const [screen, setScreen] = useState<RatingScreen>("prompt");
  const [submittedData, setSubmittedData] = useState<RatingData>({
    score: 0,
    tags: [],
    comment: "",
  });

  // In production, determine perspective from auth context
  const perspective: Perspective = "business";

  function handleSubmit(data: RatingData) {
    setSubmittedData(data);
    setScreen("confirm");
  }

  return (
    <div className="flex min-h-screen items-start justify-center px-6 pt-8 lg:items-center lg:pt-0">
      <div className="w-full max-w-[420px] pb-12">
        {screen === "prompt" && (
          <PromptScreen
            perspective={perspective}
            onRate={() => setScreen("form")}
          />
        )}
        {screen === "form" && (
          <FormScreen
            perspective={perspective}
            onSubmit={handleSubmit}
            onBack={() => setScreen("prompt")}
          />
        )}
        {screen === "confirm" && (
          <ConfirmScreen perspective={perspective} data={submittedData} />
        )}
      </div>
    </div>
  );
}
