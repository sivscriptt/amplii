"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertTriangle,
  Shield,
  User,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Clock,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

// ─── Types ───
type DisputeStatus = "open" | "under_review" | "resolved" | "dismissed";

interface Dispute {
  id: string;
  gig: string;
  opened_by: string;
  opened_by_role: "business" | "influencer";
  against: string;
  reason: string;
  details: string;
  status: DisputeStatus;
  opened_at: string;
  assigned_admin: string | null;
  resolution_notes: string | null;
}

const STATUS_CONFIG: Record<DisputeStatus, { bg: string; text: string; label: string }> = {
  open: { bg: "bg-red-50", text: "text-red-700", label: "Open" },
  under_review: { bg: "bg-amber-50", text: "text-amber-700", label: "Under Review" },
  resolved: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Resolved" },
  dismissed: { bg: "bg-slate-100", text: "text-slate-600", label: "Dismissed" },
};

const mockDisputes: Dispute[] = [
  { id: "1", gig: "Weekend Brunch Feature", opened_by: "Treehouse", opened_by_role: "business", against: "@yaania", reason: "Content quality doesn't match requirements", details: "The reel is only 8 seconds long and doesn't show the food at all. The brief required at least 30 seconds with food close-ups.", status: "open", opened_at: "2h ago", assigned_admin: null, resolution_notes: null },
  { id: "2", gig: "Weekend Brunch Feature", opened_by: "@yuin", opened_by_role: "influencer", against: "Treehouse", reason: "Business didn't scan QR code", details: "I arrived at the venue on time and generated my QR. Waited 30 minutes but no staff came to scan. I had to leave.", status: "under_review", opened_at: "1d ago", assigned_admin: "Admin", resolution_notes: null },
  { id: "3", gig: "Sunset Dinner Tasting", opened_by: "Opa", opened_by_role: "business", against: "@bathool", reason: "Payout amount is incorrect", details: "The influencer was paid the full amount but we believe the content was AI-generated.", status: "resolved", opened_at: "3d ago", assigned_admin: "Admin", resolution_notes: "Investigated content — confirmed authentic. No payout adjustment. Warned business about unfounded claims." },
];

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState(mockDisputes);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [tab, setTab] = useState("active");
  const [resolveDialog, setResolveDialog] = useState<{ dispute: Dispute; action: "resolve" | "dismiss" } | null>(null);
  const [notes, setNotes] = useState("");

  const filtered = tab === "active"
    ? disputes.filter((d) => d.status === "open" || d.status === "under_review")
    : disputes;

  function assignSelf(id: string) {
    setDisputes((prev) =>
      prev.map((d) => d.id === id ? { ...d, status: "under_review" as DisputeStatus, assigned_admin: "Admin" } : d)
    );
  }

  function handleResolve(id: string, action: "resolve" | "dismiss") {
    setDisputes((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: (action === "resolve" ? "resolved" : "dismissed") as DisputeStatus, resolution_notes: notes }
          : d
      )
    );
    setResolveDialog(null);
    setNotes("");
  }

  return (
    <div className="flex min-h-screen items-start justify-center px-6 pt-6 lg:pt-12">
      <div className="w-full max-w-[640px] pb-16">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h1 className="font-display text-[22px] font-extrabold tracking-tight lg:text-2xl">
              Disputes
            </h1>
            <p className="text-sm text-slate-500">
              {disputes.filter((d) => d.status === "open").length} open ·{" "}
              {disputes.filter((d) => d.status === "under_review").length} under review
            </p>
          </div>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="mt-5">
          <TabsList>
            <TabsTrigger value="active" className="font-display text-xs">
              Active ({disputes.filter((d) => d.status === "open" || d.status === "under_review").length})
            </TabsTrigger>
            <TabsTrigger value="all" className="font-display text-xs">
              All ({disputes.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mt-4 space-y-3">
          {filtered.map((d) => {
            const isExpanded = expanded === d.id;
            const st = STATUS_CONFIG[d.status];

            return (
              <Card key={d.id} className={d.status === "resolved" || d.status === "dismissed" ? "opacity-60" : ""}>
                <CardContent className="p-0">
                  {/* Header */}
                  <button onClick={() => setExpanded(isExpanded ? null : d.id)} className="flex w-full items-center gap-3 p-4 text-left">
                    <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${st.bg}`}>
                      <AlertTriangle className={`h-4 w-4 ${st.text}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-display text-sm font-bold">{d.reason}</span>
                        <Badge className={`${st.bg} ${st.text} text-[11px]`}>{st.label}</Badge>
                      </div>
                      <div className="mt-0.5 text-[13px] text-slate-500 lg:text-xs">
                        {d.gig} · {d.opened_by} vs {d.against} · {d.opened_at}
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
                  </button>

                  {/* Expanded */}
                  {isExpanded && (
                    <div className="animate-fade-up border-t border-border px-4 pb-4 pt-3 space-y-4">
                      {/* Parties */}
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-slate-500" />
                          <span className="font-display font-semibold">{d.opened_by}</span>
                          <Badge variant="secondary" className="text-[9px]">{d.opened_by_role}</Badge>
                        </div>
                        <ArrowRight className="h-3 w-3 text-slate-500" />
                        <span className="text-slate-500">{d.against}</span>
                      </div>

                      {/* Details */}
                      <Card className="bg-muted/50">
                        <CardContent className="p-3">
                          <div className="font-display text-[11px] font-semibold uppercase text-slate-500">Details</div>
                          <p className="mt-1 text-sm leading-relaxed">{d.details}</p>
                        </CardContent>
                      </Card>

                      {/* Resolution notes */}
                      {d.resolution_notes && (
                        <Card className="border-emerald-200 bg-emerald-50/50">
                          <CardContent className="p-3">
                            <div className="font-display text-[11px] font-semibold uppercase text-emerald-700">Resolution</div>
                            <p className="mt-1 text-sm leading-relaxed text-emerald-800">{d.resolution_notes}</p>
                          </CardContent>
                        </Card>
                      )}

                      {/* Assigned admin */}
                      {d.assigned_admin && (
                        <div className="flex items-center gap-2 text-[13px] text-slate-500 lg:text-xs">
                          <Shield className="h-3.5 w-3.5" />
                          Assigned to: <strong className="text-foreground">{d.assigned_admin}</strong>
                        </div>
                      )}

                      {/* Actions */}
                      {d.status === "open" && (
                        <Button onClick={() => assignSelf(d.id)} className="w-full gap-1 font-display font-semibold">
                          <Shield className="h-4 w-4" />Assign to Me & Review
                        </Button>
                      )}

                      {d.status === "under_review" && (
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => { setResolveDialog({ dispute: d, action: "dismiss" }); }} className="flex-1 gap-1 font-display text-xs font-semibold">
                            <XCircle className="h-3.5 w-3.5" />Dismiss
                          </Button>
                          <Button onClick={() => { setResolveDialog({ dispute: d, action: "resolve" }); }} className="flex-1 gap-1 font-display text-xs font-semibold">
                            <CheckCircle2 className="h-3.5 w-3.5" />Resolve
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Resolve/Dismiss Dialog */}
        <Dialog open={resolveDialog !== null} onOpenChange={() => { setResolveDialog(null); setNotes(""); }}>
          {resolveDialog && (
            <DialogContent className="sm:max-w-[420px]">
              <DialogHeader>
                <DialogTitle className="font-display">
                  {resolveDialog.action === "resolve" ? "Resolve Dispute" : "Dismiss Dispute"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="text-sm">
                  <span className="font-display font-semibold">{resolveDialog.dispute.reason}</span>
                  <div className="mt-1 text-[13px] text-slate-500 lg:text-xs">
                    {resolveDialog.dispute.opened_by} vs {resolveDialog.dispute.against}
                  </div>
                </div>

                {resolveDialog.action === "resolve" && (
                  <div className="space-y-1.5">
                    <Label className="font-display text-[13px]">Resolution Action</Label>
                    <div className="flex flex-wrap gap-2">
                      {["Payout override", "Gig closed", "Account warning", "No action needed"].map((a) => (
                        <Badge key={a} variant="secondary" className="cursor-pointer font-display text-[11px] hover:bg-primary/10">{a}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label className="font-display text-[13px]">Resolution Notes *</Label>
                  <Textarea
                    placeholder={resolveDialog.action === "resolve" ? "Describe the resolution and any actions taken..." : "Explain why this dispute was dismissed..."}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="resize-none text-sm"
                  />
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => { setResolveDialog(null); setNotes(""); }}>Cancel</Button>
                <Button
                  variant={resolveDialog.action === "dismiss" ? "secondary" : "default"}
                  disabled={!notes.trim()}
                  onClick={() => handleResolve(resolveDialog.dispute.id, resolveDialog.action)}
                >
                  {resolveDialog.action === "resolve" ? "Resolve" : "Dismiss"}
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
}
