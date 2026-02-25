import Link from "next/link";

interface FlowLink {
  href: string;
  label: string;
  description: string;
  flowNumber: number;
}

const shared: FlowLink[] = [
  { href: "/login", label: "Authentication", description: "Magic link sign-in → OTP → verified", flowNumber: 1 },
  { href: "/onboarding", label: "Onboarding", description: "Role selection → profile → wallet/tier → ready", flowNumber: 2 },
  { href: "/rate", label: "Two-Sided Ratings", description: "Post-gig star rating + tags + comment", flowNumber: 3 },
];

const business: FlowLink[] = [
  { href: "/gigs/create", label: "Gig Creation", description: "Basics → reward split → settings → publish with escrow", flowNumber: 4 },
  { href: "/applications", label: "Application Review", description: "View applicants, accept/reject for manual-mode gigs", flowNumber: 5 },
  { href: "/scanner", label: "QR Scanner", description: "Scan influencer QR → GPS match → verify visit", flowNumber: 6 },
  { href: "/submissions", label: "Submission Review", description: "View content/feedback submissions, escalate to admin", flowNumber: 7 },
  { href: "/wallet", label: "Wallet & Funding", description: "Balance, escrow, fund wallet, transaction history", flowNumber: 8 },
  { href: "/disputes/new", label: "Open Dispute", description: "Select reason → describe issue → submit", flowNumber: 9 },
];

const influencer: FlowLink[] = [
  { href: "/discover", label: "Gig Discovery", description: "Location-based browse, filter by tier, apply", flowNumber: 10 },
  { href: "/qr", label: "QR Generation", description: "Generate 5-min QR with countdown, regenerate", flowNumber: 11 },
  { href: "/submit", label: "Post-Visit Choice", description: "Submit content (link + screenshot) or feedback report", flowNumber: 12 },
  { href: "/resubmit", label: "Resubmission", description: "View rejection reason → edit → resubmit (1 attempt)", flowNumber: 13 },
  { href: "/tiers", label: "Tier Progress", description: "Current tier, counters, roadmap, completion history", flowNumber: 14 },
];

const admin: FlowLink[] = [
  { href: "/review", label: "Review Queue", description: "Expand submissions, approve/reject/needs-info, payouts", flowNumber: 15 },
  { href: "/disputes", label: "Dispute Resolution", description: "Assign, investigate, resolve/dismiss disputes", flowNumber: 16 },
];

function FlowCard({ flow }: { flow: FlowLink }) {
  return (
    <Link
      href={flow.href}
      className="group flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
    >
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/[.06] font-display text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        {flow.flowNumber}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-display text-sm font-bold text-foreground group-hover:text-primary">
          {flow.label}
        </div>
        <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
          {flow.description}
        </div>
        <div className="mt-1.5 font-mono text-[11px] text-muted-foreground/60">
          {flow.href}
        </div>
      </div>
      <svg
        className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground/30 transition-colors group-hover:text-primary"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M5.646 12.354a.5.5 0 010-.708L9.793 8 5.646 3.854a.5.5 0 11.708-.708l4.5 4.5a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708 0z" />
      </svg>
    </Link>
  );
}

function Section({
  title,
  badge,
  badgeColor,
  flows,
}: {
  title: string;
  badge: string;
  badgeColor: string;
  flows: FlowLink[];
}) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <h2 className="font-display text-base font-bold text-foreground">
          {title}
        </h2>
        <span
          className={`rounded-md px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}
        >
          {badge}
        </span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {flows.map((f) => (
          <FlowCard key={f.href} flow={f} />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 lg:py-20">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4338CA] to-[#7C3AED]">
          <span className="font-display text-2xl font-extrabold text-white">
            A
          </span>
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
          Amplii Flows
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          16 production flows · Next.js App Router · TypeScript · Tailwind ·
          shadcn/ui
        </p>
        <div className="mx-auto mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <span>
            <strong className="text-foreground">22</strong> files
          </span>
          <span>
            <strong className="text-foreground">5,548</strong> lines
          </span>
          <span>
            <strong className="text-foreground">3</strong> roles
          </span>
        </div>
      </div>

      {/* Flow sections */}
      <div className="space-y-10">
        <Section
          title="Shared"
          badge="3 flows"
          badgeColor="bg-slate-100 text-slate-600"
          flows={shared}
        />
        <Section
          title="Business"
          badge="6 flows"
          badgeColor="bg-[#4338CA]/[.08] text-[#4338CA]"
          flows={business}
        />
        <Section
          title="Influencer"
          badge="5 flows"
          badgeColor="bg-[#7C3AED]/[.08] text-[#7C3AED]"
          flows={influencer}
        />
        <Section
          title="Admin"
          badge="2 flows"
          badgeColor="bg-[#F59E0B]/[.1] text-[#92400E]"
          flows={admin}
        />
      </div>

      {/* Footer */}
      <div className="mt-16 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        Amplii MVP v1.1 · Built with Next.js 14 + Supabase + shadcn/ui
      </div>
    </div>
  );
}
