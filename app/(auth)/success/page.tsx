"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function AuthSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-[340px] text-center">
        {/* Animated check */}
        <div className="mx-auto mb-7 flex h-20 w-20 animate-pop-in items-center justify-center rounded-full bg-gradient-to-br from-amplii-indigo to-amplii-violet shadow-lg shadow-amplii-indigo/25">
          <CheckCircle2 className="h-9 w-9 text-white" strokeWidth={2.5} />
        </div>

        <h1 className="font-display text-[26px] font-extrabold tracking-tight text-foreground lg:text-[22px]">
          You're in!
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
          Your identity is verified. Let's set up your profile next.
        </p>

        {/* Status badge */}
        <div className="mx-auto mt-7 inline-flex items-center gap-2.5 rounded-xl bg-emerald-50 px-5 py-3 text-sm font-medium text-emerald-800">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
            <CheckCircle2 className="h-3 w-3 text-white" />
          </div>
          Email verified successfully
        </div>

        <Button
          onClick={() => router.push("/onboarding")}
          className="mt-7 h-12 w-full gap-2 font-display text-[15px] font-semibold"
        >
          Continue to Onboarding
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
