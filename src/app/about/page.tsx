import Link from "next/link";

const navy = "#1A1A2E";
const dark = "#111111";
const muted = "#888888";
const border = "#EEEEEE";

function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: `1px solid ${border}`, padding: "20px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <span style={{ fontSize: "20px" }}>{icon}</span>
        <span style={{ fontSize: "17px", fontWeight: 700, color: dark }}>{title}</span>
      </div>
      <div style={{ fontSize: "15px", color: "#444444", lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div style={{ padding: "28px 20px 48px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: 800, color: dark, margin: "0 0 6px", letterSpacing: "-0.01em" }}>
        How We Make Money
      </h1>
      <p style={{ fontSize: "15px", color: muted, margin: "0 0 4px", lineHeight: 1.5 }}>
        We believe transparency builds trust. Here&apos;s exactly how Pep AI works financially.
      </p>

      <Section icon="🔗" title="1. Affiliate Commissions">
        <p style={{ margin: "0 0 10px" }}>
          When you click a &quot;Buy&quot; link and make a purchase, we earn a commission — typically 5–15% of the sale. This comes at <strong>no extra cost to you</strong>.
        </p>
        <p style={{ margin: 0 }}>
          We only affiliate with vendors we&apos;ve vetted. Our reputation depends on recommending sources the community trusts. Every affiliate link on this site is clearly labeled.
        </p>
      </Section>

      <Section icon="📢" title="2. Display Advertising">
        <p style={{ margin: 0 }}>
          We run non-intrusive display ads on some pages via Google AdSense or direct wellness brand deals. Ads are always clearly marked. We reject ads for products we don&apos;t believe in.
        </p>
      </Section>

      <Section icon="🚫" title="What We Don't Do">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            "Sell your data",
            "Take payment to rank vendors higher",
            "Hide affiliate relationships",
            "Recommend products we wouldn't use ourselves",
          ].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#059669", fontWeight: 700 }}>✓</span>
              <span>We don&apos;t {item.toLowerCase()}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section icon="⚠️" title="Medical Disclaimer">
        <p style={{ margin: "0 0 10px" }}>
          Pep AI is for <strong>informational purposes only</strong>. We are not medical professionals. Nothing on this site constitutes medical advice.
        </p>
        <p style={{ margin: "0 0 10px" }}>
          Always consult a licensed clinician before starting any peptide protocol. Peptides are not FDA-approved for human consumption and are sold for research purposes only.
        </p>
        <p style={{ margin: 0 }}>
          You are responsible for understanding the legal status of these compounds in your jurisdiction.
        </p>
      </Section>

      <Section icon="📋" title="FTC Disclosure">
        <p style={{ margin: 0 }}>
          Per FTC guidelines, we disclose that we have affiliate relationships with vendors on this site. We may receive compensation when you click affiliate links and make purchases. This disclosure is present on every page containing affiliate links.
        </p>
      </Section>

      <div style={{ marginTop: "8px", background: "#F9F9F9", border: `1px solid ${border}`, borderRadius: "12px", padding: "20px", textAlign: "center" }}>
        <div style={{ fontSize: "17px", fontWeight: 700, color: dark, marginBottom: "6px" }}>Questions?</div>
        <p style={{ fontSize: "14px", color: muted, margin: "0 0 16px" }}>Reach out directly — we&apos;re always happy to be transparent.</p>
        <Link href="/quiz" style={{
          display: "block", background: navy, color: "#fff",
          borderRadius: "10px", padding: "14px 24px", fontSize: "15px", fontWeight: 700, textDecoration: "none",
        }}>
          Find Your Protocol →
        </Link>
      </div>
    </div>
  );
}
