// ─── Database row types matching Supabase schema ───

export type UserRole = "business" | "influencer" | "admin";
export type RewardType = "free" | "barter" | "paid";
export type GigStatus = "draft" | "published" | "paused" | "closed";
export type ApplicationMode = "auto" | "manual";
export type ApplicationStatus = "applied" | "accepted" | "rejected" | "withdrawn";
export type VisitStatus = "pending" | "verified" | "expired";
export type VerificationMethod = "qr_scan" | "manual_confirm";
export type PathType = "content" | "feedback";
export type ReviewStatus = "submitted" | "approved" | "rejected" | "needs_info";
export type PayoutStatus = "pending" | "approved" | "refunded" | "denied";
export type DisputeStatus = "open" | "under_review" | "resolved" | "dismissed";
export type TierLevel = 1 | 2 | 3;
export type StarScore = 1 | 2 | 3 | 4 | 5;

// ─── Row Types ───

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
  created_at: string;
}

export interface InfluencerProfile {
  user_id: string;
  handle: string;
  tier: TierLevel;
  follower_count: number;
  engagement_rate: number | null;
  primary_platform: string | null;
  social_accounts: SocialAccount[];
  reputation_score: number;
  created_at: string;
}

export interface SocialAccount {
  platform: string;
  handle: string;
  follower_count: number;
  linked: boolean;
}

export interface Gig {
  id: string;
  business_id: string;
  title: string;
  description: string | null;
  reward_type: RewardType;
  budget_total: number;
  base_percent: number;
  completion_percent: number;
  tier_required: TierLevel;
  max_slots: number;
  application_mode: ApplicationMode;
  submission_deadline_days: number;
  target_platforms: string[];
  barter_description: string | null;
  status: GigStatus;
  created_at: string;
}

export interface Application {
  id: string;
  gig_id: string;
  influencer_id: string;
  status: ApplicationStatus;
  applied_at: string;
}

export interface Visit {
  id: string;
  gig_id: string;
  influencer_id: string;
  qr_code_hash: string;
  qr_expires_at: string;
  scanned_at: string | null;
  verification_method: VerificationMethod;
  status: VisitStatus;
  created_at: string;
}

export interface Submission {
  id: string;
  visit_id: string;
  gig_id: string;
  influencer_id: string;
  path_type: PathType;
  content_url: string | null;
  screenshot_path: string | null;
  feedback_payload: FeedbackPayload | null;
  resubmission_count: number;
  review_status: ReviewStatus;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
}

export interface FeedbackPayload {
  rating: number;
  what_worked: string;
  what_didnt: string;
  suggestions: string;
}

export interface Payout {
  id: string;
  submission_id: string;
  base_amount: number;
  completion_amount: number;
  platform_fee: number;
  payout_status: PayoutStatus;
  processed_at: string | null;
  created_at: string;
}

export interface WalletRow {
  id: string;
  user_id: string;
  balance: number;
  held_in_escrow: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface TierProgress {
  influencer_id: string;
  free_completed: number;
  barter_completed: number;
  paid_completed: number;
  tier: TierLevel;
  updated_at: string;
}

export interface Rating {
  id: string;
  gig_id: string;
  rater_id: string;
  ratee_id: string;
  score: StarScore;
  comment: string | null;
  created_at: string;
}

export interface Dispute {
  id: string;
  gig_id: string;
  opened_by: string;
  reason: string;
  status: DisputeStatus;
  resolution_notes: string | null;
  assigned_admin: string | null;
  opened_at: string;
  resolved_at: string | null;
}

// ─── Supabase Database type map (for createClient<Database>) ───

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Omit<Profile, "created_at">; Update: Partial<Omit<Profile, "user_id">> };
      business_profiles: { Row: BusinessProfile; Insert: Omit<BusinessProfile, "created_at">; Update: Partial<Omit<BusinessProfile, "user_id">> };
      influencer_profiles: { Row: InfluencerProfile; Insert: Omit<InfluencerProfile, "created_at">; Update: Partial<Omit<InfluencerProfile, "user_id">> };
      gigs: { Row: Gig; Insert: Omit<Gig, "id" | "completion_percent" | "created_at">; Update: Partial<Omit<Gig, "id" | "completion_percent">> };
      applications: { Row: Application; Insert: Omit<Application, "id" | "applied_at">; Update: Partial<Pick<Application, "status">> };
      visits: { Row: Visit; Insert: Omit<Visit, "id" | "created_at">; Update: Partial<Pick<Visit, "scanned_at" | "status" | "verification_method">> };
      submissions: { Row: Submission; Insert: Omit<Submission, "id" | "created_at">; Update: Partial<Omit<Submission, "id" | "visit_id" | "gig_id" | "influencer_id">> };
      payouts: { Row: Payout; Insert: Omit<Payout, "id" | "created_at">; Update: Partial<Pick<Payout, "payout_status" | "processed_at">> };
      wallets: { Row: WalletRow; Insert: Omit<WalletRow, "id" | "created_at" | "updated_at">; Update: Partial<Pick<WalletRow, "balance" | "held_in_escrow" | "updated_at">> };
      tier_progress: { Row: TierProgress; Insert: Omit<TierProgress, "updated_at">; Update: Partial<Omit<TierProgress, "influencer_id">> };
      ratings: { Row: Rating; Insert: Omit<Rating, "id" | "created_at">; Update: never };
      disputes: { Row: Dispute; Insert: Omit<Dispute, "id" | "opened_at">; Update: Partial<Pick<Dispute, "status" | "resolution_notes" | "assigned_admin" | "resolved_at">> };
    };
  };
}
