"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createBrowserClient();
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/verify`,
        },
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      // Store email for the OTP screen
      sessionStorage.setItem("amplii_auth_email", email);
      router.push("/verify");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    const supabase = createBrowserClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/success`,
      },
    });
  }

  return (
    <div className="flex min-h-screen">
      {/* Left brand panel — hidden on mobile */}
      <div className="relative hidden w-5/12 overflow-hidden bg-gradient-to-br from-amplii-indigo via-amplii-violet to-amplii-coral p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/[.06]" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/[.04]" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/20 backdrop-blur-sm">
            <span className="font-display text-lg font-extrabold text-white">
              A
            </span>
          </div>
          <span className="font-display text-xl font-extrabold tracking-tight text-white">
            Amplii
          </span>
        </div>

        <div className="relative z-10">
          <h2 className="font-display text-[26px] font-extrabold leading-snug tracking-tight text-white">
            Connect your business with local influencers
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Verified visits. Fair rewards. Real results for restaurants, cafes,
            salons, and boutiques.
          </p>
          <div className="mt-6 flex gap-4">
            {[
              { n: "2.4K+", l: "Verified visits" },
              { n: "850+", l: "SMEs onboard" },
              { n: "4.9★", l: "Avg rating" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-[10px] bg-white/[.12] px-3.5 py-2.5 backdrop-blur-sm"
              >
                <div className="font-display text-lg font-extrabold text-white">
                  {s.n}
                </div>
                <div className="mt-0.5 text-[11px] text-white/70">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[360px]">
          {/* Mobile logo — hidden on desktop */}
          <div className="mb-10 lg:hidden">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br from-amplii-indigo to-amplii-violet">
              <span className="font-display text-[22px] font-extrabold text-white">
                A
              </span>
            </div>
            <h1 className="font-display text-[28px] font-extrabold leading-tight tracking-tight text-slate-900">
              Welcome to Amplii
            </h1>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-500">
              Sign in with your email to get started. We'll send you a magic
              link.
            </p>
          </div>

          {/* Desktop heading */}
          <div className="mb-7 hidden lg:block">
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
              Sign in to your account
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Enter your email and we'll send a magic link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="font-display text-[13px]">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                required
                autoFocus
                className={`h-11 text-base lg:h-10 lg:text-sm ${
                  error
                    ? "border-destructive focus-visible:ring-destructive/20"
                    : ""
                }`}
              />
              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full font-display text-[15px] font-semibold lg:h-10 lg:text-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Sending…
                </span>
              ) : (
                "Continue with Email"
              )}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            className="h-11 w-full gap-2.5 font-display text-sm font-semibold lg:h-10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
            By continuing, you agree to Amplii's{" "}
            <a href="/terms" className="text-primary underline underline-offset-2">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary underline underline-offset-2">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
