import { createClient } from "@supabase/supabase-js";

export type UserRole = "business" | "influencer" | "admin";

export interface Profile {
  user_id: string;
  role: UserRole;
  display_name: string;
  created_at: string;
}

export interface BusinessProfile {
  user_id: string;
  business_name: string;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
}

export interface InfluencerProfile {
  user_id: string;
  handle: string;
  tier: 1 | 2 | 3;
  follower_count: number;
  engagement_rate: number | null;
  primary_platform: string | null;
  social_accounts: SocialAccount[];
  reputation_score: number;
}

export interface SocialAccount {
  platform: string;
  handle: string;
  follower_count: number;
  linked: boolean;
}

export interface Rating {
  id: string;
  gig_id: string;
  rater_id: string;
  ratee_id: string;
  score: 1 | 2 | 3 | 4 | 5;
  comment: string | null;
  tags: string[];
  created_at: string;
}

/**
 * Browser-side Supabase client (singleton).
 * Reads NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY from env.
 */
export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return createClient(url, key);
}
