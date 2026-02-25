"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ExternalLink,
  Image,
  MessageSquare,
  DollarSign,
  ArrowRight,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ─── Types ───
type ReviewStatus = "submitted" | "approved" | "rejected" | "needs_info";
type PathType = "content" | "feedback";

interface QueueItem {
  id: string;
  influencer: string;
  handle: string;
  avatar: string;
  business: string;
  gig: string;
  path_type: PathType;
  content_url: string | null;
  screenshot: boolean;
  feedback: { rating: number; worked: string; didnt: string; suggestions: string } | null;
  review_status: ReviewStatus;
  submitted_at: string;
  reward_type: "free" | "barter" | "paid";
  budget: number;
  base_percent: number;
  platform_fee: number;
  resubmission_count: number;
}

const mockQueue: QueueItem[] = [
  { id: "1", influencer: "Yaania", handle: "@yaania", avatar: "YA", business: "Treehouse", gig: "Weekend Brunch Feature", path_type: "content", content_url: "https://instagram.com/reel/abc123", screenshot: true, feedback: null, review_status: "submitted", submitted_at: "2h ago", reward_type: "paid", budget: 1500, base_percent: 30, platform_fee: 75, resubmission_count: 0 },
  { id: "2", influencer: "Yuin", handle: "@yuin", avatar: "YU", business: "Treehouse", gig: "Weekend Brunch Feature", path_type: "feedback", content_url: null, screenshot: false, feedback: { rating: 2, worked: "Great atmosphere and decor", didnt: "Wait time was 40+ minutes, food was cold", suggestions: "Assign a dedicated staff for influencer visits" }, review_status: "submitted", submitted_at: "5h ago", reward_type: "paid", budget: 1500, base_percent: 30, platform_fee: 75, resubmission_count: 0 },
  { id: "3", influencer: "Bathool", handle: "@bathool", avatar: "BA", business: "Opa", gig: "New Menu Launch", path_type: "content", content_url: "https://tiktok.com/@maya/video/456", screenshot: true, feedback: null, review_status: "submitted", submitted_at: "1d ago", reward_type: "free", budget: 0, base_percent: 0, platform_fee: 0, resubmission_count: 1 },
];

export default function AdminReviewPage() {
  const [queue, setQueue] = useState(mockQueue);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [actionDialog, setActionDialog] = useState<{ item: QueueItem; action: "approve" | "reject" | "needs_info" } | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [tab, setTab] = useState("pending");

  const filtered = tab === "pending"
    ? queue.filter((q) => q.review_status === "submitted")
    : queue;

  function handleAction(id: string, action: "approve" | "reject" | "needs_info") {
    const statusMap: Record<string, ReviewStatus> = { approve: "approved", reject: "rejected", needs_info: "needs_info" };
    setQueue((prev) => prev.map((q) => q.id === id ? { ...q, review_status: statusMap[action] } : q));
    setActionDialog(null);
    setAdminNote("");
  }

  function payoutSummary(item: QueueItem): string {
    if (item.reward_type !== "paid") return "No monetary payout";
    const base = (item.budget * item.base_percent) / 100;
    const completion = item.budget - base;
    if (item.path_type === "content") {
      return `Release MVR ${(base + completion - item.platform_fee).toFixed(0)} to influencer (MVR ${item.platform_fee} fee)`;
    }
    return `Release MVR ${(base - item.platform_fee).toFixed(0)} base to influencer; refund MVR ${completion.toFixed(0)} to business`;
  }

  return (
    <div className="flex min-h-screen items-start justify-center px-6 pt-6 lg:pt-12">
      <div className="w-full max-w-[640px] pb-16">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight">Review Queue</h1>
            <p className="text-sm text-slate-500">
              {queue.filter((q) => q.review_status === "submitted").length} pending review
            </p>
          </div>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="mt-5">
          <TabsList>
            <TabsTrigger value="pending" className="font-display text-xs">
              Pending ({queue.filter((q) => q.review_status === "submitted").length})
            </TabsTrigger>
            <TabsTrigger value="all" className="font-display text-xs">
              All ({queue.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mt-4 space-y-3">
          {filtered.map((item) => {
            const isExpanded = expanded === item.id;
            const isPending = item.review_status === "submitted";
            return (
              <Card key={item.id} className={!isPending ? "opacity-60" : ""}>
                <CardContent className="p-0">
                  {/* Header row */}
                  <button
                    onClick={() => setExpanded(isExpanded ? null : item.id)}
                    className="flex w-full items-center gap-3 p-4 text-left"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-display text-sm font-bold text-white">
                      {item.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-sm font-bold">{item.influencer}</span>
                        <Badge className={`text-[10px] ${item.path_type === "content" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>
                          {item.path_type === "content" ? <><Image className="mr-1 h-3 w-3" />Content</> : <><MessageSquare className="mr-1 h-3 w-3" />Feedback</>}
                        </Badge>
                        {item.resubmission_count > 0 && <Badge variant="secondary" className="text-[10px]">Resub #{item.resubmission_count}</Badge>}
                      </div>
                      <div className="text-xs text-slate-500">{item.business} · {item.gig} · {item.submitted_at}</div>
                    </div>
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="animate-fade-up border-t border-border px-4 pb-4 pt-3">
                      {/* Content details */}
                      {item.path_type === "content" && item.content_url && (
                        <div className="space-y-3">
                          <div>
                            <div className="font-display text-[11px] font-semibold uppercase text-slate-500">Content Link</div>
                            <a href={item.content_url} target="_blank" rel="noopener" className="mt-1 flex items-center gap-1 text-sm text-primary underline underline-offset-2">
                              {item.content_url}<ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                          {item.screenshot && (
                            <div className="flex h-32 items-center justify-center rounded-lg bg-muted">
                              <Image className="h-6 w-6 text-slate-500/40" />
                              <span className="ml-2 text-xs text-slate-500">Screenshot attached</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Feedback details */}
                      {item.path_type === "feedback" && item.feedback && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="font-display text-xs font-semibold text-slate-500">Rating:</span>
                            <div className="flex gap-0.5">
                              {[1,2,3,4,5].map((n) => (
                                <div key={n} className={`h-5 w-5 rounded text-center text-[11px] font-bold leading-5 ${n <= item.feedback!.rating ? "bg-amplii-amber text-white" : "bg-muted text-slate-500"}`}>{n}</div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="font-display text-[11px] font-semibold uppercase text-emerald-600">What Worked</div>
                            <p className="mt-1 text-sm text-foreground">{item.feedback.worked}</p>
                          </div>
                          <div>
                            <div className="font-display text-[11px] font-semibold uppercase text-red-600">What Didn't</div>
                            <p className="mt-1 text-sm text-foreground">{item.feedback.didnt}</p>
                          </div>
                          <div>
                            <div className="font-display text-[11px] font-semibold uppercase text-blue-600">Suggestions</div>
                            <p className="mt-1 text-sm text-foreground">{item.feedback.suggestions}</p>
                          </div>
                        </div>
                      )}

                      {/* Payout summary */}
                      {item.reward_type === "paid" && (
                        <Card className="mt-3 bg-muted/50">
                          <CardContent className="flex items-center gap-2 p-3 text-xs">
                            <DollarSign className="h-4 w-4 text-slate-500" />
                            <span>{payoutSummary(item)}</span>
                          </CardContent>
                        </Card>
                      )}

                      {/* Actions */}
                      {isPending && (
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setActionDialog({ item, action: "needs_info" })} className="flex-1 gap-1 font-display text-xs">
                            <HelpCircle className="h-3.5 w-3.5" />Needs Info
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => setActionDialog({ item, action: "reject" })} className="flex-1 gap-1 font-display text-xs">
                            <XCircle className="h-3.5 w-3.5" />Reject
                          </Button>
                          <Button size="sm" onClick={() => setActionDialog({ item, action: "approve" })} className="flex-1 gap-1 font-display text-xs">
                            <CheckCircle2 className="h-3.5 w-3.5" />Approve
                          </Button>
                        </div>
                      )}

                      {!isPending && (
                        <Badge className={`mt-3 ${item.review_status === "approved" ? "bg-emerald-50 text-emerald-700" : item.review_status === "rejected" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>
                          {item.review_status === "approved" ? "✓ Approved" : item.review_status === "rejected" ? "✕ Rejected" : "⟳ Needs Info"}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action confirmation dialog */}
        <Dialog open={actionDialog !== null} onOpenChange={() => { setActionDialog(null); setAdminNote(""); }}>
          {actionDialog && (
            <DialogContent className="sm:max-w-[420px]">
              <DialogHeader>
                <DialogTitle className="font-display">
                  {actionDialog.action === "approve" ? "Approve Submission" : actionDialog.action === "reject" ? "Reject Submission" : "Request More Info"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-display font-semibold">{actionDialog.item.influencer}</span>
                  <ArrowRight className="h-3 w-3 text-slate-500" />
                  <span className="text-slate-500">{actionDialog.item.gig}</span>
                </div>

                {actionDialog.action === "approve" && actionDialog.item.reward_type === "paid" && (
                  <Card className="bg-emerald-50/50">
                    <CardContent className="p-3 text-xs text-emerald-800">
                      <DollarSign className="mr-1 inline h-3.5 w-3.5" />
                      {payoutSummary(actionDialog.item)}
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-1.5">
                  <Label className="font-display text-[13px]">
                    Admin Note {actionDialog.action !== "approve" ? "*" : "(optional)"}
                  </Label>
                  <Textarea
                    placeholder={actionDialog.action === "reject" ? "Explain why this was rejected..." : actionDialog.action === "needs_info" ? "What additional info is needed..." : "Optional note..."}
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    rows={3}
                    className="resize-none text-sm"
                  />
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => { setActionDialog(null); setAdminNote(""); }}>Cancel</Button>
                <Button
                  variant={actionDialog.action === "reject" ? "destructive" : "default"}
                  disabled={actionDialog.action !== "approve" && !adminNote.trim()}
                  onClick={() => handleAction(actionDialog.item.id, actionDialog.action)}
                >
                  {actionDialog.action === "approve" ? "Approve & Release Payout" : actionDialog.action === "reject" ? "Reject" : "Send Request"}
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
}
