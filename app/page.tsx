import Link from "next/link";

const flows = [
  { section: "Shared", items: [
    { href: "/login", label: "1. Authentication", desc: "Magic link → OTP → verified" },
    { href: "/onboarding", label: "2. Onboarding", desc: "Role → profile → wallet/tier → ready" },
    { href: "/rate", label: "3. Ratings", desc: "Star rating + tags + comment" },
  ]},
  { section: "Business", items: [
    { href: "/gigs/create", label: "4. Gig Creation", desc: "Basics → reward → settings → publish" },
    { href: "/applications", label: "5. Application Review", desc: "Accept/reject applicants" },
    { href: "/scanner", label: "6. QR Scanner", desc: "Scan QR → verify visit" },
    { href: "/submissions", label: "7. Submissions", desc: "View content/feedback" },
    { href: "/wallet", label: "8. Wallet", desc: "Balance, escrow, fund" },
    { href: "/disputes/new", label: "9. Open Dispute", desc: "Report an issue" },
  ]},
  { section: "Influencer", items: [
    { href: "/discover", label: "10. Discover Gigs", desc: "Browse & apply" },
    { href: "/qr", label: "11. QR Generation", desc: "5-min QR + countdown" },
    { href: "/submit", label: "12. Post-Visit", desc: "Content or feedback" },
    { href: "/resubmit", label: "13. Resubmission", desc: "Edit & resubmit" },
    { href: "/tiers", label: "14. Tier Progress", desc: "Growth roadmap" },
  ]},
  { section: "Admin", items: [
    { href: "/review", label: "15. Review Queue", desc: "Approve/reject submissions" },
    { href: "/disputes", label: "16. Disputes", desc: "Resolve/dismiss" },
  ]},
];

export default function HomePage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #4338CA, #7C3AED)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
          <span style={{ color: "white", fontSize: 24, fontWeight: 800 }}>A</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 8px" }}>Amplii Flows</h1>
        <p style={{ color: "#64748b", fontSize: 14 }}>16 flows · Next.js · TypeScript · Tailwind · shadcn/ui</p>
      </div>
      {flows.map((s) => (
        <div key={s.section} style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{s.section}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {s.items.map((f) => (
              <Link key={f.href} href={f.href} style={{ display: "block", padding: 16, border: "1px solid #e2e8f0", borderRadius: 12, textDecoration: "none", color: "inherit" }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{f.label}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{f.desc}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 6, fontFamily: "monospace" }}>{f.href}</div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
