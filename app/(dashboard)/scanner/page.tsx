"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  QrCode,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Camera,
  Clock,
  RefreshCw,
  Hand,
} from "lucide-react";

// ─── Types ───
type ScanState = "ready" | "scanning" | "gig_select" | "verified" | "expired" | "manual_confirm";

interface ActiveGig {
  id: string;
  title: string;
  influencer: string;
  handle: string;
}

const mockGigs: ActiveGig[] = [
  { id: "1", title: "Weekend Brunch Feature", influencer: "Yaania", handle: "@yaania" },
  { id: "2", title: "Sunset Dinner Tasting", influencer: "Yaania", handle: "@yaania" },
];

export default function ScannerPage() {
  const [state, setState] = useState<ScanState>("ready");
  const [selectedGig, setSelectedGig] = useState<ActiveGig | null>(null);
  const [showManualDialog, setShowManualDialog] = useState(false);

  function simulateScan() {
    setState("scanning");
    setTimeout(() => {
      // Simulate: if multiple gigs, show picker; otherwise verify
      if (mockGigs.length > 1) {
        setState("gig_select");
      } else {
        setSelectedGig(mockGigs[0]);
        setState("verified");
      }
    }, 2000);
  }

  function simulateExpired() {
    setState("scanning");
    setTimeout(() => setState("expired"), 1500);
  }

  function selectGig(gig: ActiveGig) {
    setSelectedGig(gig);
    setState("verified");
  }

  function handleManualConfirm() {
    setShowManualDialog(false);
    setSelectedGig(mockGigs[0]);
    setState("verified");
  }

  return (
    <div className="flex min-h-screen items-start justify-center px-6 pt-6 lg:items-center lg:pt-0">
      <div className="w-full max-w-[420px] pb-16">
        {/* Ready state */}
        {state === "ready" && (
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10">
              <QrCode className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-[22px] font-extrabold tracking-tight lg:text-2xl">
                Scan Influencer QR
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Point your camera at the influencer's QR code to verify their
                visit.
              </p>
            </div>

            <div className="flex gap-2 rounded-lg bg-muted p-3 text-left text-[13px] text-slate-500 lg:text-xs">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-500" />
              <span>
                GPS will auto-match to your nearest outlet:{" "}
                <strong className="text-foreground">Treehouse — Malé</strong>
              </span>
            </div>

            <Button
              onClick={simulateScan}
              className="h-12 w-full gap-2 font-display text-[15px] font-semibold"
            >
              <Camera className="h-5 w-5" />
              Open Scanner
            </Button>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={simulateExpired}
                className="text-[13px] text-slate-500 lg:text-xs underline underline-offset-2"
              >
                Demo: expired QR
              </button>
              <button
                onClick={() => setShowManualDialog(true)}
                className="flex items-center gap-1 text-[13px] text-slate-500 lg:text-xs underline underline-offset-2"
              >
                <Hand className="h-3 w-3" />
                Manual confirm
              </button>
            </div>
          </div>
        )}

        {/* Scanning state */}
        {state === "scanning" && (
          <div className="space-y-6 text-center">
            <div className="relative mx-auto flex h-64 w-64 items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-slate-900">
              <div className="absolute inset-4 rounded-xl border-2 border-white/20" />
              <div className="absolute left-4 right-4 top-1/2 h-0.5 animate-pulse bg-primary/60" />
              <QrCode className="h-16 w-16 text-white/20" />
            </div>
            <div>
              <p className="font-display text-sm font-semibold">Scanning...</p>
              <p className="mt-1 text-[13px] text-slate-500 lg:text-xs">
                Hold steady. Looking for a valid QR code.
              </p>
            </div>
          </div>
        )}

        {/* Gig selection (multiple active gigs at outlet) */}
        {state === "gig_select" && (
          <div className="space-y-5">
            <div>
              <Badge variant="secondary" className="mb-3 gap-1 font-display">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                QR Valid
              </Badge>
              <h2 className="font-display text-[22px] font-extrabold tracking-tight lg:text-2xl">
                Which gig is this visit for?
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Multiple gigs active at this outlet. Select one.
              </p>
            </div>

            <div className="space-y-2">
              {mockGigs.map((g) => (
                <Card
                  key={g.id}
                  onClick={() => selectGig(g)}
                  className="cursor-pointer border border-slate-100 shadow-sm transition-all duration-200 hover:border-amplii-indigo/20 hover:shadow-md"
                >
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex-1">
                      <div className="font-display text-sm font-bold">
                        {g.title}
                      </div>
                      <div className="mt-0.5 text-[13px] text-slate-500 lg:text-xs">
                        {g.influencer} · {g.handle}
                      </div>
                    </div>
                    <Badge variant="secondary" className="rounded-full font-display shadow-none text-[11px]">
                      Active
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Verified! */}
        {state === "verified" && selectedGig && (
          <div className="space-y-5 text-center">
            <div className="mx-auto flex h-20 w-20 animate-pop-in items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" strokeWidth={2} />
            </div>
            <div>
              <h1 className="font-display text-[22px] font-extrabold tracking-tight lg:text-2xl text-emerald-800">
                Visit Verified!
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Handshake confirmed. The influencer can now submit content or
                feedback.
              </p>
            </div>

            <Card className="border-emerald-200 bg-emerald-50/50 text-left">
              <CardContent className="space-y-2 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-semibold text-slate-500">
                    Gig
                  </span>
                  <span className="text-sm font-medium">{selectedGig.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-semibold text-slate-500">
                    Influencer
                  </span>
                  <span className="text-sm font-medium">
                    {selectedGig.handle}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-semibold text-slate-500">
                    Method
                  </span>
                  <Badge className="bg-emerald-100 text-emerald-700">QR Scan</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-semibold text-slate-500">
                    Outlet
                  </span>
                  <span className="text-sm font-medium">Malé Location</span>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={() => { setState("ready"); setSelectedGig(null); }}
              className="h-12 w-full rounded-xl font-display font-semibold transition-all duration-200"
            >
              Scan Another
            </Button>
          </div>
        )}

        {/* Expired */}
        {state === "expired" && (
          <div className="space-y-5 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-10 w-10 text-red-500" />
            </div>
            <div>
              <h1 className="font-display text-[22px] font-extrabold tracking-tight lg:text-2xl text-red-800">
                QR Expired
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                This QR code has expired. Ask the influencer to generate a new
                one.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700">
              <Clock className="h-4 w-4" />
              QR codes are valid for 5 minutes. No visit was logged.
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowManualDialog(true)}
                className="flex-1 gap-1 font-display"
              >
                <Hand className="h-4 w-4" />
                Manual Confirm
              </Button>
              <Button
                onClick={() => setState("ready")}
                className="flex-1 gap-1 font-display"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Manual confirm dialog */}
        <Dialog open={showManualDialog} onOpenChange={setShowManualDialog}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-display">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Manual Confirmation
              </DialogTitle>
              <DialogDescription>
                Manual confirmations are flagged in the audit log for admin
                review. Use only when QR scanning fails due to camera or
                connectivity issues.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setShowManualDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleManualConfirm}>
                Confirm Visit Manually
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
