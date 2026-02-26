"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Lock,
  Plus,
  ChevronLeft,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "fund" | "escrow_hold" | "escrow_release" | "payout" | "refund";
  amount: number;
  description: string;
  timestamp: string;
}

const mockTx: Transaction[] = [
  { id: "1", type: "fund", amount: 7500, description: "Wallet funded", timestamp: "Today, 2:15 PM" },
  { id: "2", type: "escrow_hold", amount: -4500, description: "Escrow hold: Weekend Brunch Feature (3 slots)", timestamp: "Today, 2:20 PM" },
  { id: "3", type: "payout", amount: -1425, description: "Payout: @yaania — Weekend Brunch Feature", timestamp: "Yesterday" },
  { id: "4", type: "refund", amount: 1050, description: "Refund: @yuin — feedback path", timestamp: "Yesterday" },
  { id: "5", type: "escrow_release", amount: 1500, description: "Escrow released: Sunset Dinner Tasting", timestamp: "3 days ago" },
];

const TX_STYLES: Record<string, { icon: React.ReactNode; color: string }> = {
  fund: { icon: <Plus className="h-3.5 w-3.5" />, color: "text-emerald-600 bg-emerald-50" },
  escrow_hold: { icon: <Lock className="h-3.5 w-3.5" />, color: "text-amber-600 bg-amber-50" },
  escrow_release: { icon: <Lock className="h-3.5 w-3.5" />, color: "text-blue-600 bg-blue-50" },
  payout: { icon: <ArrowUpRight className="h-3.5 w-3.5" />, color: "text-red-500 bg-red-50" },
  refund: { icon: <ArrowDownLeft className="h-3.5 w-3.5" />, color: "text-emerald-600 bg-emerald-50" },
};

export default function WalletPage() {
  const [showFund, setShowFund] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const balance = 4250;
  const escrow = 3000;

  return (
    <div className="flex min-h-screen items-start justify-center px-6 pt-6 lg:pt-12">
      <div className="w-full max-w-[520px] pb-16">
        <button className="mb-4 flex items-center gap-1 text-sm text-slate-500 hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          Dashboard
        </button>

        <h1 className="font-display text-[22px] font-extrabold tracking-tight lg:text-2xl">
          Wallet
        </h1>

        {/* Balance card */}
        <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-5 text-white lg:p-6">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/[.04]" />
          <div className="flex items-start justify-between">
            <div>
              <div className="font-display text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                Available Balance
              </div>
              <div className="mt-1.5 font-display text-[32px] font-extrabold tracking-tight lg:text-4xl">
                MVR {balance.toLocaleString()}
              </div>
            </div>
            <Wallet className="h-6 w-6 text-white/30" />
          </div>
          <div className="mt-5 flex gap-3">
            <div className="rounded-xl bg-white/10 px-3.5 py-2.5">
              <div className="flex items-center gap-1 text-[11px] text-white/60">
                <Lock className="h-3 w-3" />
                In Escrow
              </div>
              <div className="mt-1 font-mono text-[15px] font-bold">
                MVR {escrow.toLocaleString()}
              </div>
            </div>
            <div className="rounded-xl bg-white/10 px-3.5 py-2.5">
              <div className="text-[11px] text-white/60">Total</div>
              <div className="mt-1 font-mono text-[15px] font-bold">
                MVR {(balance + escrow).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setShowFund(true)}
          className="mt-4 h-12 w-full gap-2 rounded-xl font-display text-[15px] font-semibold transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          Fund Wallet
        </Button>

        {/* Transactions */}
        <div className="mt-8">
          <h2 className="font-display text-[15px] font-bold">
            Transaction History
          </h2>
          <div className="mt-3 space-y-2">
            {mockTx.map((tx) => {
              const style = TX_STYLES[tx.type];
              return (
                <Card key={tx.id} className="border-slate-100 shadow-sm">
                  <CardContent className="flex items-center gap-3 px-4 py-3.5">
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${style.color}`}
                    >
                      {style.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-medium">
                        {tx.description}
                      </div>
                      <div className="mt-0.5 text-[12px] text-slate-400">
                        {tx.timestamp}
                      </div>
                    </div>
                    <span
                      className={`flex-shrink-0 font-mono text-[14px] font-bold ${
                        tx.amount >= 0 ? "text-emerald-600" : "text-slate-900"
                      }`}
                    >
                      {tx.amount >= 0 ? "+" : "−"}MVR {Math.abs(tx.amount).toLocaleString()}
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-center text-[13px] text-slate-500 lg:text-xs">
          Payouts to bank accounts are handled manually by Amplii operations.
        </p>

        {/* Fund dialog */}
        <Dialog open={showFund} onOpenChange={setShowFund}>
          <DialogContent className="sm:max-w-[380px]">
            <DialogHeader>
              <DialogTitle className="font-display">Fund Wallet</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="font-display text-[13px]">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-display text-[13px] font-semibold text-slate-400">MVR</span>
                  <Input
                    type="number"
                    placeholder="0"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    className="h-11 pl-14 font-mono text-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["750", "1500", "3750"].map((a) => (
                  <button
                    key={a}
                    onClick={() => setFundAmount(a)}
                    className={`rounded-xl border py-2.5 font-display text-sm font-bold transition-all duration-200 ${
                      fundAmount === a
                        ? "border-primary bg-primary/[.04] text-primary"
                        : "border-border text-slate-500"
                    }`}
                  >
                    MVR {Number(a).toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button
                disabled={!fundAmount || Number(fundAmount) <= 0}
                onClick={() => setShowFund(false)}
                className="w-full font-display font-semibold"
              >
                Add MVR {fundAmount || "0"} to Wallet
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
