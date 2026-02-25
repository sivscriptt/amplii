"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ExternalLink,
  Image,
  MessageSquare,
  Eye,
  Flag,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronLeft,
} from "lucide-react";

// ─── Types ───
type ReviewStatus = "submitted" | "approved" | "rejected" | "needs_info";
type PathType = "content" | "feedback";

interface Submission {
  id: string;
  influencer: string;
  handle: string;
  avatar: string;
  gig: string;
  path_type: PathType;
  content_url: string | null;
  feedback_summary: string | null;
  review_status: ReviewStatus;
  submitted_at: string;
  resubmission_count: number;
}

const STATUS_STYLES: Record<ReviewStatus, { bg: string; text: string; label: string }> = {
  submitted: { bg: "bg-blue-50", text: "text-blue-700", label: "Pending Review" },
  approved: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Approved" },
  rejected: { bg: "bg-red-50", text: "text-red-700", label: "Rejected" },
  needs_info: { bg: "bg-amber-50", text: "text-amber-700", label: "Needs Info" },
};

const mockSubmissions: Submission[] = [
  { id: "1", influencer: "Yaania", handle: "@yaania", avatar: "YA", gig: "Weekend Brunch Feature", path_type: "content", content_url: "https://instagram.com/reel/abc123", feedback_summary: null, review_status: "submitted", submitted_at: "2h ago", resubmission_count: 0 },
  { id: "2", influencer: "Yuin", handle: "@yuin", avatar: "YU", gig: "Weekend Brunch Feature", path_type: "feedback", content_url: null, feedback_summary: "Food was great but wait time was over 40 minutes. Service needs improvement for influencer visits.", review_status: "submitted", submitted_at: "5h ago", resubmission_count: 0 },
  { id: "3", influencer: "Bathool", handle: "@bathool", avatar: "BA", gig: "Sunset Dinner Tasting", path_type: "content", content_url: "https://tiktok.com/@maya/video/456", feedback_summary: null, review_status: "approved", submitted_at: "1d ago", resubmission_count: 0 },
  { id: "4", influencer: "Hanaan", handle: "@hanaan", avatar: "HA", gig: "Weekend Brunch Feature", path_type: "content", content_url: "https://instagram.com/reel/xyz", feedback_summary: null, review_status: "rejected", submitted_at: "2d ago", resubmission_count: 1 },
];

export default function SubmissionsPage() {
  const [submissions] = useState(mockSubmissions);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [tab, setTab] = useState("all");

  const filtered =
    tab === "all"
      ? submissions
      : tab === "pending"
        ? submissions.filter((s) => s.review_status === "submitted")
        : submissions.filter((s) => s.path_type === tab);

  return (
    <div className="flex min-h-screen items-start justify-center px-6 pt-6 lg:pt-12">
      <div className="w-full max-w-[560px] pb-16">
        <button className="mb-4 flex items-center gap-1 text-sm text-slate-500 hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          Dashboard
        </button>

        <h1 className="font-display text-2xl font-extrabold tracking-tight">
          Submissions
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Review content and feedback from influencers.
        </p>

        <Tabs value={tab} onValueChange={setTab} className="mt-5">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1 font-display text-xs">
              All ({submissions.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex-1 font-display text-xs">
              Pending ({submissions.filter((s) => s.review_status === "submitted").length})
            </TabsTrigger>
            <TabsTrigger value="content" className="flex-1 font-display text-xs">
              Content
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex-1 font-display text-xs">
              Feedback
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mt-4 space-y-3">
          {filtered.map((s) => {
            const st = STATUS_STYLES[s.review_status];
            return (
              <Card
                key={s.id}
                onClick={() => setSelected(s)}
                className="cursor-pointer border-slate-100 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-display text-sm font-bold text-white">
                      {s.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-sm font-bold">
                          {s.influencer}
                        </span>
                        <Badge className={`${st.bg} ${st.text} text-[10px]`}>
                          {st.label}
                        </Badge>
                      </div>
                      <div className="mt-0.5 text-xs text-slate-500">
                        {s.handle} · {s.gig} · {s.submitted_at}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="gap-1 text-[10px]"
                        >
                          {s.path_type === "content" ? (
                            <Image className="h-3 w-3" />
                          ) : (
                            <MessageSquare className="h-3 w-3" />
                          )}
                          {s.path_type === "content" ? "Content" : "Feedback"}
                        </Badge>
                        {s.resubmission_count > 0 && (
                          <Badge variant="secondary" className="text-[10px]">
                            Resubmission #{s.resubmission_count}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Eye className="h-4 w-4 flex-shrink-0 text-slate-500" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detail dialog */}
        <Dialog open={selected !== null} onOpenChange={() => setSelected(null)}>
          {selected && (
            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <DialogTitle className="font-display">
                  {selected.path_type === "content"
                    ? "Content Submission"
                    : "Feedback Report"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-display text-sm font-bold text-white">
                    {selected.avatar}
                  </div>
                  <div>
                    <div className="font-display text-sm font-bold">
                      {selected.influencer}
                    </div>
                    <div className="text-xs text-slate-500">
                      {selected.handle} · {selected.submitted_at}
                    </div>
                  </div>
                </div>

                {selected.path_type === "content" && selected.content_url && (
                  <Card className="bg-muted/50">
                    <CardContent className="space-y-3 p-4">
                      <div className="font-display text-xs font-semibold uppercase text-slate-500">
                        Content Link
                      </div>
                      <a
                        href={selected.content_url}
                        target="_blank"
                        rel="noopener"
                        className="flex items-center gap-2 text-sm text-primary underline underline-offset-2"
                      >
                        {selected.content_url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <div className="flex h-40 items-center justify-center rounded-lg bg-muted">
                        <Image className="h-8 w-8 text-slate-500/40" />
                        <span className="ml-2 text-xs text-slate-500">
                          Screenshot proof
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selected.path_type === "feedback" && selected.feedback_summary && (
                  <Card className="bg-muted/50">
                    <CardContent className="space-y-2 p-4">
                      <div className="font-display text-xs font-semibold uppercase text-slate-500">
                        Feedback Report
                      </div>
                      <p className="text-sm leading-relaxed text-foreground">
                        {selected.feedback_summary}
                      </p>
                    </CardContent>
                  </Card>
                )}

                <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-xs text-slate-500">
                  <Flag className="h-3.5 w-3.5" />
                  Admin reviews and approves all payouts. You can escalate
                  concerns below.
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 gap-1 font-display"
                  >
                    <Flag className="h-4 w-4" />
                    Escalate
                  </Button>
                  <Button
                    onClick={() => setSelected(null)}
                    className="flex-1 font-display"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
}
