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
  DollarSign,
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
  { id: "1", type: "fund", amount: 500, description: "Wallet funded", timestamp: "Today, 2:15 PM" },
  { id: "2", type: "escrow_hold", amount: -300, description: "Escrow: Summer Brunch Promo (3 slots × $100)", timestamp: "Today, 2:20 PM" },
  { id: "3", type: "payout", amount: -95, description: "Payout: @sarah.creates (Base $30 + Completion $70 - $5 fee)", timestamp: "Yesterday" },
  { id: "4", type: "refund", amount: 70, description: "Refund: @alexeats feedback path (Completion)", timestamp: "Yesterday" },
  { id: "5", type: "escrow_release", amount: 100, description: "Escrow released: Weekend Tasting closed", timestamp: "3 days ago" },
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
  const balance = 275;
  const escrow = 200;

  return (
    <div className="flex min-h-screen items-start justify-center px-6 pt-6 lg:pt-12">
      <div className="w-full max-w-[520px] pb-16">
        <button className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          Dashboard
        </button>

        <h1 className="font-display text-xl font-extrabold tracking-tight">
          Wallet
        </h1>

        {/* Balance card */}
        <div className="relative mt-5 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/[.04]" />
          <div className="flex items-start justify-between">
            <div>
              <div className="font-display text-xs font-semibold uppercase tracking-widest text-slate-400">
                Available Balance
              </div>
              <div className="mt-1 font-display text-4xl font-extrabold tracking-tight">
                ${balance.toFixed(2)}
              </div>
            </div>
            <Wallet className="h-6 w-6 text-white/30" />
          </div>
          <div className="mt-4 flex gap-3">
            <div className="rounded-lg bg-white/10 px-3 py-2">
              <div className="flex items-center gap-1 text-[11px] text-white/60">
                <Lock className="h-3 w-3" />
                In Escrow
              </div>
              <div className="mt-0.5 font-mono text-sm font-bold">
                ${escrow.toFixed(2)}
              </div>
            </div>
            <div className="rounded-lg bg-white/10 px-3 py-2">
              <div className="text-[11px] text-white/60">Total</div>
              <div className="mt-0.5 font-mono text-sm font-bold">
                ${(balance + escrow).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setShowFund(true)}
          className="mt-4 h-11 w-full gap-2 font-display font-semibold"
        >
          <Plus className="h-4 w-4" />
          Fund Wallet
        </Button>

        {/* Transactions */}
        <div className="mt-8">
          <h2 className="font-display text-base font-bold">
            Transaction History
          </h2>
          <div className="mt-3 space-y-2">
            {mockTx.map((tx) => {
              const style = TX_STYLES[tx.type];
              return (
                <Card key={tx.id}>
                  <CardContent className="flex items-center gap-3 p-3.5">
                    <div
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${style.color}`}
                    >
                      {style.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">
                        {tx.description}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {tx.timestamp}
                      </div>
                    </div>
                    <span
                      className={`flex-shrink-0 font-mono text-sm font-bold ${
                        tx.amount >= 0 ? "text-emerald-600" : "text-foreground"
                      }`}
                    >
                      {tx.amount >= 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
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
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    className="h-11 pl-9 font-mono text-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["50", "100", "250"].map((a) => (
                  <button
                    key={a}
                    onClick={() => setFundAmount(a)}
                    className={`rounded-lg border py-2.5 font-display text-sm font-bold transition-all ${
                      fundAmount === a
                        ? "border-primary bg-primary/[.04] text-primary"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    ${a}
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
                Add ${fundAmount || "0"} to Wallet
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
