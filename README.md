All 16 UI flows are built and route-ready:

Routes:
  /login, /verify, /success     → Auth (Supabase magic link + OTP)
  /onboarding                   → Role-based onboarding
  /rate                         → Two-sided ratings
  /gigs/create                  → Business gig creation
  /applications                 → Business application review
  /scanner                      → Business QR scanner
  /submissions                  → Business submission review
  /wallet                       → Business wallet & funding
  /disputes/new                 → Business dispute
  /discover                     → Influencer gig discovery
  /qr                           → Influencer QR generation
  /submit                       → Influencer content/feedback
  /resubmit                     → Influencer resubmission
  /tiers                        → Influencer tier progress
  /review                       → Admin review queue
  /disputes                     → Admin dispute resolution

All pages use mock data. Backend needs to:
  1. Set up Supabase project + run the SQL schema from the spec
  2. Add env vars (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
  3. Replace mock data with real Supabase queries
  4. Implement server actions / API routes per the spec's API contracts