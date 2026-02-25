"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Mail, ChevronLeft, Clock, CheckCircle2 } from "lucide-react";

const OTP_LENGTH = 6;
const OTP_EXPIRY_SECONDS = 300; // 5 minutes

export default function VerifyPage() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resent, setResent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_SECONDS);
  const [email, setEmail] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("amplii_auth_email");
    if (stored) setEmail(stored);
    else router.push("/login");
  }, [router]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const digit = value.slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setError(null);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits filled
    if (next.every((d) => d !== "")) {
      verifyOtp(next.join(""));
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const data = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const next = data.split("").concat(Array(OTP_LENGTH).fill("")).slice(0, OTP_LENGTH);
    setOtp(next);
    const focusIdx = Math.min(data.length, OTP_LENGTH - 1);
    inputRefs.current[focusIdx]?.focus();

    if (data.length === OTP_LENGTH) {
      verifyOtp(data);
    }
  }

  async function verifyOtp(token: string) {
    setLoading(true);
    setError(null);

    try {
      const supabase = createBrowserClient();
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
      });

      if (verifyError) {
        setError("Invalid code. Please try again.");
        setOtp(Array(OTP_LENGTH).fill(""));
        inputRefs.current[0]?.focus();
        return;
      }

      sessionStorage.removeItem("amplii_auth_email");
      router.push("/success");
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    const supabase = createBrowserClient();
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/verify` },
    });
    setResent(true);
    setTimeLeft(OTP_EXPIRY_SECONDS);
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimeout(() => setResent(false), 3000);
  }

  return (
    <div className="flex min-h-screen items-start justify-center px-6 pt-20 lg:items-center lg:pt-0">
      <div className="w-full max-w-[380px]">
        {/* Back button */}
        <button
          onClick={() => router.push("/login")}
          className="mb-8 flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        {/* Mail icon */}
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/[.08] to-accent/[.08]">
          <Mail className="h-7 w-7 text-primary" />
        </div>

        <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
          Check your email
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We sent a 6-digit code to{" "}
          <strong className="text-foreground">{email}</strong>
        </p>

        {/* OTP Input grid */}
        <div className="mt-7 flex gap-2.5 lg:gap-2" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              autoFocus={i === 0}
              disabled={loading}
              aria-label={`Digit ${i + 1}`}
              className={`h-14 w-full rounded-[10px] border-2 bg-background text-center font-mono text-[22px] font-bold text-foreground outline-none transition-all lg:h-[52px] ${
                error
                  ? "border-destructive focus:ring-2 focus:ring-destructive/20"
                  : digit
                    ? "border-border"
                    : "border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/10"
              } disabled:opacity-50`}
            />
          ))}
        </div>

        {error && (
          <p className="mt-3 text-sm text-destructive">{error}</p>
        )}

        {loading && (
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Verifying…
          </div>
        )}

        {/* Resend */}
        <div className="mt-6 text-[13px] text-muted-foreground">
          {resent ? (
            <span className="flex items-center gap-1.5 font-medium text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Code resent successfully
            </span>
          ) : (
            <span>
              Didn't receive it?{" "}
              <button
                onClick={handleResend}
                className="font-semibold text-primary underline underline-offset-2 hover:text-primary/80"
              >
                Resend code
              </button>
            </span>
          )}
        </div>

        {/* Timer */}
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted px-3.5 py-2.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {timeLeft > 0 ? (
            <span>
              Code expires in{" "}
              <strong className="text-foreground">{formatTime(timeLeft)}</strong>
            </span>
          ) : (
            <span className="text-destructive">Code expired. Please resend.</span>
          )}
        </div>
      </div>
    </div>
  );
}
