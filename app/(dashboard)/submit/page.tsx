"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Image,
  MessageSquare,
  Link2,
  Upload,
  ChevronLeft,
  CheckCircle2,
  Star,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  Clock,
} from "lucide-react";

type SubmitStep = "choose" | "content" | "feedback" | "submitted";

export default function SubmitPage() {
  const router = useRouter();
  const [step, setStep] = useState<SubmitStep>("choose");
  const [contentUrl, setContentUrl] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [whatWorked, setWhatWorked] = useState("");
  const [whatDidnt, setWhatDidnt] = useState("");
  const [suggestions, setSuggestions] = useState("");

  return (
    <div className="flex min-h-screen items-start justify-center px-6 pt-6 lg:pt-12">
      <div className="w-full max-w-[460px] pb-16">
        {/* Choose path */}
        {step === "choose" && (
          <div className="space-y-5">
            <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-slate-500 hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />Back
            </button>
            <div>
              <Badge className="mb-3 gap-1 bg-emerald-50 font-display text-emerald-700">
                <CheckCircle2 className="h-3 w-3" />Visit Verified
              </Badge>
              <h1 className="font-display text-[22px] font-extrabold tracking-tight lg:text-2xl">What would you like to do?</h1>
              <p className="mt-1 text-sm text-slate-500">Choose based on your experience at the venue.</p>
            </div>

            <Card className="bg-muted/50">
              <CardContent className="flex items-center gap-3 p-4">
                <span className="text-xl">☕</span>
                <div className="flex-1">
                  <div className="font-display text-sm font-bold">Weekend Brunch Feature</div>
                  <div className="text-[13px] text-slate-500 lg:text-xs">Treehouse · MVR 1,500 (30/70 split)</div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Card onClick={() => setStep("content")} className="cursor-pointer border border-slate-100 shadow-sm transition-all duration-200 hover:border-amplii-indigo/20 hover:shadow-md">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/[.06]">
                    <Image className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-[15px] font-bold">Submit Content</div>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate-500">Post your content, then share the link + screenshot proof.</p>
                    <Badge className="mt-2 bg-emerald-50 font-display text-[11px] text-emerald-700">
                      Full reward: MVR 1,500
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card onClick={() => setStep("feedback")} className="cursor-pointer border-2 transition-all hover:border-amber-400/40 hover:shadow-md">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-50">
                    <MessageSquare className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-[15px] font-bold">Provide Feedback</div>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate-500">If you prefer not to promote, submit a constructive feedback report instead.</p>
                    <Badge className="mt-2 bg-amber-50 font-display text-[11px] text-amber-700">
                      Base rate only: MVR 450
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Content submission */}
        {step === "content" && (
          <div className="space-y-5">
            <button onClick={() => setStep("choose")} className="flex items-center gap-1 text-sm text-slate-500 hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />Back
            </button>
            <div>
              <h2 className="font-display text-[22px] font-extrabold tracking-tight lg:text-2xl">Submit Content</h2>
              <p className="mt-1 text-sm text-slate-500">Post your content on the required platform(s), then share proof below.</p>
            </div>

            <div className="flex gap-2">
              <Badge variant="secondary" className="rounded-full font-display shadow-none text-[11px]">Instagram Reels</Badge>
              <Badge variant="secondary" className="rounded-full font-display shadow-none text-[11px]">TikTok</Badge>
            </div>

            <div className="space-y-1.5">
              <Label className="font-display text-[13px]"><Link2 className="mr-1 inline h-3.5 w-3.5" />Content Link *</Label>
              <Input placeholder="https://instagram.com/reel/..." value={contentUrl} onChange={(e) => setContentUrl(e.target.value)} className="h-11 text-base lg:h-10 lg:text-sm" />
            </div>

            <div className="space-y-1.5">
              <Label className="font-display text-[13px]"><Upload className="mr-1 inline h-3.5 w-3.5" />Screenshot Proof *</Label>
              <div className="flex h-32 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 transition-colors hover:border-primary/30">
                <div className="text-center">
                  <Upload className="mx-auto h-6 w-6 text-slate-500" />
                  <p className="mt-2 text-[13px] text-slate-500 lg:text-xs">Click or drag to upload</p>
                </div>
              </div>
            </div>

            <Button disabled={!contentUrl} onClick={() => setStep("submitted")} className="h-12 w-full rounded-xl font-display font-semibold transition-all duration-200">
              Submit for Review
            </Button>
          </div>
        )}

        {/* Feedback submission */}
        {step === "feedback" && (
          <div className="space-y-5">
            <button onClick={() => setStep("choose")} className="flex items-center gap-1 text-sm text-slate-500 hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />Back
            </button>
            <div>
              <h2 className="font-display text-[22px] font-extrabold tracking-tight lg:text-2xl">Provide Feedback</h2>
              <p className="mt-1 text-sm text-slate-500">Help the business improve. Your report is private between you, the admin, and the business.</p>
            </div>

            <div className="space-y-1.5">
              <Label className="font-display text-[13px]"><Star className="mr-1 inline h-3.5 w-3.5" />Experience Rating *</Label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map((n) => (
                  <button key={n} onClick={() => setFeedbackRating(n)} className={`flex h-11 flex-1 items-center justify-center rounded-xl border-[1.5px] font-display text-sm font-bold transition-all ${feedbackRating === n ? "border-amplii-amber bg-amber-50 text-amber-700" : "border-border text-slate-500"}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="font-display text-[13px]"><ThumbsUp className="mr-1 inline h-3.5 w-3.5" />What worked well?</Label>
              <Textarea value={whatWorked} onChange={(e) => setWhatWorked(e.target.value)} placeholder="What did you enjoy?" rows={2} className="resize-none text-sm" />
            </div>

            <div className="space-y-1.5">
              <Label className="font-display text-[13px]"><ThumbsDown className="mr-1 inline h-3.5 w-3.5" />What didn't work?</Label>
              <Textarea value={whatDidnt} onChange={(e) => setWhatDidnt(e.target.value)} placeholder="What needs improvement?" rows={2} className="resize-none text-sm" />
            </div>

            <div className="space-y-1.5">
              <Label className="font-display text-[13px]"><Lightbulb className="mr-1 inline h-3.5 w-3.5" />Suggestions</Label>
              <Textarea value={suggestions} onChange={(e) => setSuggestions(e.target.value)} placeholder="Any recommendations?" rows={2} className="resize-none text-sm" />
            </div>

            <Button disabled={!feedbackRating} onClick={() => setStep("submitted")} className="h-12 w-full rounded-xl font-display font-semibold transition-all duration-200">
              Submit Feedback
            </Button>
          </div>
        )}

        {/* Submitted */}
        {step === "submitted" && (
          <div className="flex flex-col items-center pt-16 text-center">
            <div className="flex h-16 w-16 animate-pop-in items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <h1 className="mt-5 font-display text-[22px] font-extrabold tracking-tight lg:text-2xl">Submitted!</h1>
            <p className="mt-2 max-w-[280px] text-sm text-slate-500">Your submission is pending admin review. You'll be notified once a decision is made.</p>
            <Badge variant="secondary" className="mt-4 gap-1 font-display"><Clock className="h-3 w-3" />Pending Review</Badge>
            <Button onClick={() => router.push("/dashboard")} className="mt-6 font-display font-semibold">Back to Dashboard</Button>
          </div>
        )}
      </div>
    </div>
  );
}
