"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

type DisputeStep = "select" | "describe" | "submitted";

const REASONS = [
  "Content quality doesn't match requirements",
  "Influencer didn't visit the location",
  "Content was posted on wrong platform",
  "Abusive or fraudulent rating received",
  "Payout amount is incorrect",
  "Other",
];

export default function NewDisputePage() {
  const router = useRouter();
  const [step, setStep] = useState<DisputeStep>("select");
  const [selectedReason, setSelectedReason] = useState("");
  const [details, setDetails] = useState("");

  return (
    <div className="flex min-h-screen items-start justify-center px-6 pt-6 lg:pt-12">
      <div className="w-full max-w-[480px] pb-16">
        {step === "select" && (
          <div className="space-y-5">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <div>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <h1 className="font-display text-xl font-extrabold tracking-tight">
                Open a Dispute
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Select the reason for your dispute. An admin will review and
                respond.
              </p>
            </div>

            {/* Gig context */}
            <Card className="bg-muted/50">
              <CardContent className="flex items-center gap-3 p-4">
                <span className="text-xl">☕</span>
                <div className="flex-1">
                  <div className="font-display text-sm font-bold">
                    Summer Brunch Promo
                  </div>
                  <div className="text-xs text-muted-foreground">
                    with @sarah.creates
                  </div>
                </div>
                <Badge variant="secondary" className="font-display text-[11px]">
                  Paid · $100
                </Badge>
              </CardContent>
            </Card>

            {/* Reason picker */}
            <div className="space-y-2">
              {REASONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedReason(r)}
                  className={`flex w-full items-center justify-between rounded-xl border-2 px-4 py-3.5 text-left transition-all ${
                    selectedReason === r
                      ? "border-primary bg-primary/[.03]"
                      : "border-border hover:border-border/80"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      selectedReason === r
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {r}
                  </span>
                  {selectedReason === r && (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  )}
                </button>
              ))}
            </div>

            <Button
              disabled={!selectedReason}
              onClick={() => setStep("describe")}
              className="h-11 w-full font-display font-semibold"
            >
              Continue
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}

        {step === "describe" && (
          <div className="space-y-5">
            <button
              onClick={() => setStep("select")}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <div>
              <h2 className="font-display text-xl font-extrabold tracking-tight">
                Describe the issue
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Provide details so the admin can investigate effectively.
              </p>
            </div>

            <Card className="bg-muted/50">
              <CardContent className="p-3 text-sm">
                <span className="font-display font-semibold text-primary">
                  Reason:
                </span>{" "}
                {selectedReason}
              </CardContent>
            </Card>

            <div className="space-y-1.5">
              <Label className="font-display text-[13px]">Details *</Label>
              <Textarea
                placeholder="Explain what happened, include any relevant dates, links, or evidence..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={5}
                className="resize-none text-base lg:text-sm"
              />
              <div className="text-right text-[11px] text-muted-foreground">
                {details.length}/1000
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
              <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
              Disputes may trigger payout holds, gig closures, or account
              actions depending on resolution.
            </div>

            <Button
              disabled={details.trim().length < 10}
              onClick={() => setStep("submitted")}
              className="h-11 w-full font-display font-semibold"
            >
              Submit Dispute
            </Button>
          </div>
        )}

        {step === "submitted" && (
          <div className="flex flex-col items-center pt-16 text-center">
            <div className="flex h-16 w-16 animate-pop-in items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <h1 className="mt-5 font-display text-xl font-extrabold tracking-tight">
              Dispute Submitted
            </h1>
            <p className="mt-2 max-w-[280px] text-sm text-muted-foreground">
              An admin has been notified and will review your case. You'll
              receive updates via push notification.
            </p>
            <Badge variant="secondary" className="mt-4 gap-1 font-display">
              Status: Open
            </Badge>
            <Button
              onClick={() => router.push("/dashboard")}
              className="mt-6 font-display font-semibold"
            >
              Back to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
