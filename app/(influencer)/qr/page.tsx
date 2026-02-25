"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Clock, RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react";

type QRState = "idle" | "active" | "expired" | "scanned";
const QR_DURATION = 300; // 5 minutes

export default function QRPage() {
  const [state, setState] = useState<QRState>("idle");
  const [timeLeft, setTimeLeft] = useState(QR_DURATION);

  useEffect(() => {
    if (state !== "active" || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { setState("expired"); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [state, timeLeft]);

  const formatTime = useCallback((s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }, []);

  function generate() {
    setState("active");
    setTimeLeft(QR_DURATION);
  }

  function simulateScan() {
    setState("scanned");
  }

  const progress = state === "active" ? (timeLeft / QR_DURATION) * 100 : 0;

  return (
    <div className="flex min-h-screen items-start justify-center px-6 pt-8 lg:items-center lg:pt-0">
      <div className="w-full max-w-[380px] pb-16">
        {/* Idle */}
        {state === "idle" && (
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10">
              <QrCode className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight">Generate Visit QR</h1>
              <p className="mt-2 text-sm text-muted-foreground">Show this QR code to the business staff to verify your visit.</p>
            </div>
            <Card className="bg-muted/50 text-left">
              <CardContent className="flex items-center gap-3 p-4">
                <span className="text-xl">☕</span>
                <div>
                  <div className="font-display text-sm font-bold">Summer Brunch Promo</div>
                  <div className="text-xs text-muted-foreground">The Rooftop Cafe · Main St</div>
                </div>
              </CardContent>
            </Card>
            <Button onClick={generate} className="h-12 w-full gap-2 font-display text-[15px] font-semibold">
              <QrCode className="h-5 w-5" />Generate QR Code
            </Button>
          </div>
        )}

        {/* Active QR */}
        {state === "active" && (
          <div className="space-y-5 text-center">
            <div>
              <h2 className="font-display text-lg font-extrabold tracking-tight">Show to Staff</h2>
              <p className="mt-1 text-sm text-muted-foreground">Hold your phone up for the business to scan.</p>
            </div>

            {/* QR placeholder */}
            <div className="relative mx-auto flex h-64 w-64 items-center justify-center rounded-2xl border-2 border-primary/20 bg-white shadow-lg">
              <div className="grid grid-cols-5 gap-1.5 p-8">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className={`h-8 w-8 rounded-sm ${Math.random() > 0.4 ? "bg-slate-900" : "bg-white"}`} />
                ))}
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-lg font-bold ${
              timeLeft <= 60 ? "bg-red-50 text-red-600" : timeLeft <= 120 ? "bg-amber-50 text-amber-700" : "bg-primary/[.06] text-primary"
            }`}>
              <Clock className="h-4 w-4" />
              {formatTime(timeLeft)}
            </div>

            {timeLeft <= 60 && (
              <p className="text-xs text-red-500">QR expiring soon — ask staff to scan quickly.</p>
            )}

            <button onClick={simulateScan} className="text-xs text-muted-foreground underline underline-offset-2">
              Demo: simulate scan
            </button>
          </div>
        )}

        {/* Expired */}
        {state === "expired" && (
          <div className="space-y-5 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <div>
              <h2 className="font-display text-xl font-extrabold tracking-tight text-red-800">QR Expired</h2>
              <p className="mt-2 text-sm text-muted-foreground">Your QR code expired after 5 minutes. Generate a new one.</p>
            </div>
            <Button onClick={generate} className="h-11 w-full gap-2 font-display font-semibold">
              <RefreshCw className="h-4 w-4" />Regenerate QR
            </Button>
          </div>
        )}

        {/* Scanned */}
        {state === "scanned" && (
          <div className="space-y-5 text-center">
            <div className="mx-auto flex h-20 w-20 animate-pop-in items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight text-emerald-800">Visit Verified!</h1>
              <p className="mt-2 text-sm text-muted-foreground">The business has confirmed your visit. You can now submit content or feedback.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 font-display font-semibold" onClick={() => {}}>Provide Feedback</Button>
              <Button className="flex-1 font-display font-semibold" onClick={() => {}}>Submit Content</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
