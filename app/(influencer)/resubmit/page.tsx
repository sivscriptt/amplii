"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  XCircle,
  Upload,
  Link2,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Info,
} from "lucide-react";

type ResubStep = "rejected" | "edit" | "submitted" | "final_reject";

export default function ResubmitPage() {
  const router = useRouter();
  const [step, setStep] = useState<ResubStep>("rejected");
  const [contentUrl, setContentUrl] = useState(
    "https://instagram.com/reel/abc123"
  );

  return (
    <div className="flex min-h-screen items-start justify-center px-6 pt-6 lg:pt-12">
      <div className="w-full max-w-[460px] pb-16">
        {/* Rejected notification */}
        {step === "rejected" && (
          <div className="space-y-5">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
              <XCircle className="h-7 w-7 text-red-500" />
            </div>

            <div>
              <h1 className="font-display text-xl font-extrabold tracking-tight">
                Submission Rejected
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Your content submission needs corrections before it can be
                approved.
              </p>
            </div>

            <Card className="border-red-200 bg-red-50/50">
              <CardContent className="p-4">
                <div className="font-display text-xs font-semibold uppercase text-red-700">
                  Rejection Reason
                </div>
                <p className="mt-2 text-sm leading-relaxed text-red-800">
                  The content link leads to a private post. Please make the post
                  public and resubmit, or provide a direct link to the public
                  reel.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="flex items-center gap-3 p-4">
                <span className="text-xl">☕</span>
                <div className="flex-1">
                  <div className="font-display text-sm font-bold">
                    Summer Brunch Promo
                  </div>
                  <div className="text-xs text-muted-foreground">
                    The Rooftop Cafe
                  </div>
                </div>
                <Badge className="bg-red-50 font-display text-[11px] text-red-700">
                  Rejected
                </Badge>
              </CardContent>
            </Card>

            <div className="flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
              <AlertTriangle className="h-4 w-4 flex-shrink-0 text-amber-600" />
              You have <strong>1 resubmission attempt</strong> remaining. A
              second rejection is final.
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="flex-1 font-display font-semibold"
              >
                Later
              </Button>
              <Button
                onClick={() => setStep("edit")}
                className="flex-1 font-display font-semibold"
              >
                Edit & Resubmit
              </Button>
            </div>
          </div>
        )}

        {/* Edit and resubmit */}
        {step === "edit" && (
          <div className="space-y-5">
            <button
              onClick={() => setStep("rejected")}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <h2 className="font-display text-xl font-extrabold tracking-tight">
                  Resubmit Content
                </h2>
                <Badge
                  variant="secondary"
                  className="font-display text-[10px]"
                >
                  Attempt 1/1
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Fix the issue mentioned in the rejection and resubmit.
              </p>
            </div>

            {/* Rejection context */}
            <Card className="border-red-100 bg-red-50/30">
              <CardContent className="p-3">
                <div className="font-display text-[11px] font-semibold uppercase text-red-600">
                  Fix Required
                </div>
                <p className="mt-1 text-xs text-red-700">
                  Make the post public and provide a direct link.
                </p>
              </CardContent>
            </Card>

            {/* Original submission (editable) */}
            <div className="space-y-1.5">
              <Label className="font-display text-[13px]">
                <Link2 className="mr-1 inline h-3.5 w-3.5" />
                Content Link *
              </Label>
              <Input
                value={contentUrl}
                onChange={(e) => setContentUrl(e.target.value)}
                className="h-11 text-base lg:h-10 lg:text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Original link shown — update with the corrected URL.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label className="font-display text-[13px]">
                <Upload className="mr-1 inline h-3.5 w-3.5" />
                Updated Screenshot
              </Label>
              <div className="flex h-28 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 transition-colors hover:border-primary/30">
                <div className="text-center">
                  <Upload className="mx-auto h-5 w-5 text-muted-foreground" />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Replace screenshot
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-xs text-blue-800">
              <Info className="h-4 w-4 flex-shrink-0 text-blue-500" />
              This is your only resubmission. Make sure the link is correct and
              publicly accessible.
            </div>

            <Button
              onClick={() => setStep("submitted")}
              disabled={!contentUrl.trim()}
              className="h-11 w-full font-display font-semibold"
            >
              Resubmit for Review
            </Button>
          </div>
        )}

        {/* Successfully resubmitted */}
        {step === "submitted" && (
          <div className="flex flex-col items-center pt-16 text-center">
            <div className="flex h-16 w-16 animate-pop-in items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <h1 className="mt-5 font-display text-xl font-extrabold tracking-tight">
              Resubmitted!
            </h1>
            <p className="mt-2 max-w-[280px] text-sm text-muted-foreground">
              Your updated submission is pending admin review. No further edits
              are possible.
            </p>
            <div className="mt-4 flex gap-2">
              <Badge variant="secondary" className="gap-1 font-display">
                <Clock className="h-3 w-3" />
                Pending Review
              </Badge>
              <Badge variant="secondary" className="font-display text-[11px]">
                Resubmission #1
              </Badge>
            </div>

            <Button
              onClick={() => router.push("/dashboard")}
              className="mt-6 font-display font-semibold"
            >
              Back to Dashboard
            </Button>

            <button
              onClick={() => setStep("final_reject")}
              className="mt-3 text-xs text-muted-foreground underline underline-offset-2"
            >
              Demo: simulate final rejection
            </button>
          </div>
        )}

        {/* Final rejection (no more attempts) */}
        {step === "final_reject" && (
          <div className="flex flex-col items-center pt-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="mt-5 font-display text-xl font-extrabold tracking-tight text-red-800">
              Gig Marked Failed
            </h1>
            <p className="mt-2 max-w-[300px] text-sm text-muted-foreground">
              Your resubmission was rejected. This gig is now closed with no
              payout. If you believe this was an error, you can open a dispute.
            </p>
            <div className="mt-4 flex gap-2">
              <Badge className="bg-red-50 font-display text-[11px] text-red-700">
                Failed
              </Badge>
              <Badge variant="secondary" className="font-display text-[11px]">
                No Payout
              </Badge>
            </div>
            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="font-display font-semibold"
              >
                Dashboard
              </Button>
              <Button
                onClick={() => router.push("/disputes/new")}
                className="gap-1 font-display font-semibold"
              >
                <AlertTriangle className="h-4 w-4" />
                Open Dispute
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
