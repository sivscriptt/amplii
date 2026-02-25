"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Star,
  CheckCircle2,
  XCircle,
  Users,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";

// ─── Types ───
type AppStatus = "applied" | "accepted" | "rejected";

interface Applicant {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  tier: 1 | 2 | 3;
  followers: string;
  engagement: string;
  platform: string;
  rating: number;
  ratingCount: number;
  status: AppStatus;
}

const TIER_STYLES: Record<number, string> = {
  1: "bg-slate-100 text-slate-600",
  2: "bg-amber-50 text-amber-700",
  3: "bg-violet-50 text-violet-700",
};

// ─── Mock data ───
const initialApplicants: Applicant[] = [
  { id: "1", name: "Sarah Chen", handle: "@sarah.creates", avatar: "SC", tier: 2, followers: "12.4K", engagement: "4.2%", platform: "Instagram", rating: 4.8, ratingCount: 12, status: "applied" },
  { id: "2", name: "Alex Rivera", handle: "@alexeats", avatar: "AR", tier: 2, followers: "8.7K", engagement: "5.1%", platform: "TikTok", rating: 4.5, ratingCount: 7, status: "applied" },
  { id: "3", name: "Maya Johnson", handle: "@maya.jfood", avatar: "MJ", tier: 1, followers: "3.2K", engagement: "6.8%", platform: "Instagram", rating: 4.9, ratingCount: 3, status: "applied" },
  { id: "4", name: "Jordan Park", handle: "@jordanparknyc", avatar: "JP", tier: 3, followers: "45K", engagement: "3.4%", platform: "YouTube", rating: 4.7, ratingCount: 22, status: "applied" },
];

export default function ApplicationsPage() {
  const [applicants, setApplicants] = useState(initialApplicants);
  const [confirmAction, setConfirmAction] = useState<{
    applicant: Applicant;
    action: "accept" | "reject";
  } | null>(null);

  const accepted = applicants.filter((a) => a.status === "accepted").length;
  const maxSlots = 3;

  function handleAction(id: string, action: "accept" | "reject") {
    setApplicants((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: action === "accept" ? "accepted" : "rejected" }
          : a
      )
    );
    setConfirmAction(null);
  }

  return (
    <div className="flex min-h-screen items-start justify-center px-6 pt-6 lg:pt-12">
      <div className="w-full max-w-[560px] pb-16">
        <button className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          Back to Gig
        </button>

        <div className="mb-6">
          <h1 className="font-display text-xl font-extrabold tracking-tight">
            Applications
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Summer Brunch Promo · Manual Review
          </p>
          <div className="mt-3 flex items-center gap-3">
            <Badge variant="secondary" className="gap-1 font-display">
              <Users className="h-3 w-3" />
              {accepted}/{maxSlots} accepted
            </Badge>
            <Badge variant="secondary" className="font-display">
              {applicants.filter((a) => a.status === "applied").length} pending
            </Badge>
          </div>
        </div>

        {/* Slots progress */}
        <div className="mb-6 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
            style={{ width: `${(accepted / maxSlots) * 100}%` }}
          />
        </div>

        {/* Applicant list */}
        <div className="space-y-3">
          {applicants.map((a) => (
            <Card
              key={a.id}
              className={a.status === "rejected" ? "opacity-50" : ""}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-display text-sm font-bold text-white">
                    {a.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-bold">
                        {a.name}
                      </span>
                      <Badge className={`text-[10px] ${TIER_STYLES[a.tier]}`}>
                        Tier {a.tier}
                      </Badge>
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {a.handle}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>{a.followers} followers</span>
                      <span>{a.engagement} eng.</span>
                      <span>{a.platform}</span>
                      <span className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-amplii-amber text-amplii-amber" />
                        {a.rating} ({a.ratingCount})
                      </span>
                    </div>
                  </div>

                  {/* Status / Actions */}
                  <div className="flex flex-shrink-0 items-center gap-1.5">
                    {a.status === "applied" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setConfirmAction({ applicant: a, action: "reject" })
                          }
                          className="h-8 px-2.5 text-xs"
                          disabled={accepted >= maxSlots}
                        >
                          <XCircle className="mr-1 h-3.5 w-3.5" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            setConfirmAction({ applicant: a, action: "accept" })
                          }
                          className="h-8 px-2.5 text-xs"
                          disabled={accepted >= maxSlots}
                        >
                          <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                          Accept
                        </Button>
                      </>
                    )}
                    {a.status === "accepted" && (
                      <Badge className="bg-emerald-50 font-display text-emerald-700">
                        ✓ Accepted
                      </Badge>
                    )}
                    {a.status === "rejected" && (
                      <Badge variant="secondary" className="font-display text-muted-foreground">
                        Rejected
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {accepted >= maxSlots && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
            <Users className="h-4 w-4 text-amber-600" />
            All {maxSlots} slots filled. No more applicants can be accepted.
          </div>
        )}

        {/* Confirm Dialog */}
        <Dialog
          open={confirmAction !== null}
          onOpenChange={() => setConfirmAction(null)}
        >
          {confirmAction && (
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle className="font-display">
                  {confirmAction.action === "accept" ? "Accept" : "Reject"}{" "}
                  {confirmAction.applicant.name}?
                </DialogTitle>
                <DialogDescription>
                  {confirmAction.action === "accept"
                    ? `${confirmAction.applicant.handle} will be able to visit and generate a QR code for this gig.`
                    : `${confirmAction.applicant.handle} will be notified they were not selected.`}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button
                  variant="outline"
                  onClick={() => setConfirmAction(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant={
                    confirmAction.action === "reject"
                      ? "destructive"
                      : "default"
                  }
                  onClick={() =>
                    handleAction(
                      confirmAction.applicant.id,
                      confirmAction.action
                    )
                  }
                >
                  {confirmAction.action === "accept"
                    ? "Accept"
                    : "Reject"}
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
}
