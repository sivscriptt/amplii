import { createBrowserClient as createSupaBrowser } from "@supabase/ssr";
import { createServerClient as createSupaServer } from "@supabase/ssr";
import type { Database } from "./types";

// Re-export common types for convenience
export type {
  UserRole,
  Profile,
  BusinessProfile,
  InfluencerProfile,
  SocialAccount,
  Gig,
  Application,
  Visit,
  Submission,
  Payout,
  WalletRow,
  TierProgress,
  Rating,
  Dispute,
  Database,
} from "./types";

// ─── Browser Client (used in "use client" components) ───

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder";

export function createBrowserClient() {
  return createSupaBrowser<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ─── Server Client (used in Server Components, Server Actions, Route Handlers) ───
// Call this in an async context with access to cookies()

export async function createServerComponentClient() {
  // Dynamic import to avoid build errors in client bundles
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  return createSupaServer<Database>(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll can fail in Server Components (read-only).
            // The middleware handles token refresh.
          }
        },
      },
    }
  );
}
