import Link from "next/link";
import { notFound } from "next/navigation";
import peptides from "@/data/peptides.json";
import vendors from "@/data/vendors.json";
import { buildAffiliateUrl } from "@/lib/affiliate";

const navy = "#1A1A2E";
const dark = "#111111";
const muted = "#888888";
const border = "#E8E8E8";
const borderLight = "#EEEEEE";

const icons: Record<string, string> = {
  recovery: "🩹", bodycomp: "💪", sleep: "😴", cognitive: "🧠",
  fatloss: "🔥", antiaging: "⏳", anxiety: "🧘", skin: "✨", energy: "⚡", gut: "🫁",
};

export async function generateStaticParams() {
  return peptides.map((p) => ({ id: p.id }));
}

export default async function PeptidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const peptide = peptides.find((p) => p.id === id);
  if (!peptide) notFound();

  const related = peptide.commonStacks
    .map((sid) => peptides.find((p) => p.id === sid))
    .filter(Boolean) as typeof peptides;

  const peptideVendors = vendors.filter((v) => v.peptides.includes(peptide.id));

  return (
    <div style={{ paddingBottom: "48px" }}>
      {/* Back */}
      <div style={{ padding: "16px 20px 0" }}>
        <Link href="/peptides" style={{ fontSize: "14px", fontWeight: 600, color: navy, textDecoration: "none" }}>
          ← Directory
        </Link>
      </div>

      {/* Hero */}
      <div style={{ padding: "20px 20px 24px" }}>
        <div style={{ fontSize: "36px", marginBottom: "12px" }}>{icons[peptide.primaryGoal[0]] || "💊"}</div>
        <h1 style={{ fontSize: "36px", fontWeight: 800, color: dark, margin: "0 0 10px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          {peptide.name}
        </h1>
        {/* Goal tag */}
        <span style={{ fontSize: "12px", fontWeight: 600, color: "#555555", background: "#F0F0F0", padding: "4px 10px", borderRadius: "6px", textTransform: "capitalize", letterSpacing: "0.02em" }}>
          {peptide.primaryGoal[0]}
        </span>
        <p style={{ fontSize: "16px", color: muted, lineHeight: 1.6, margin: "14px 0 0" }}>
          {peptide.shortDescription}
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", margin: "0 20px 20px", border: `1px solid ${border}`, borderRadius: "12px", overflow: "hidden" }}>
        {[
          { label: "Method", value: peptide.method },
          { label: "Level", value: peptide.difficulty },
          { label: "Cycle", value: peptide.cycleLength.split(" ")[0] + " " + peptide.cycleLength.split(" ")[1] },
        ].map((item, i) => (
          <div key={item.label} style={{
            flex: 1, padding: "12px 10px", textAlign: "center",
            borderLeft: i > 0 ? `1px solid ${border}` : "none",
          }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: muted, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" }}>
              {item.label}
            </div>
            <div style={{ fontSize: "14px", fontWeight: 700, color: dark, textTransform: "capitalize" }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div style={{ margin: "0 20px 20px", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: "8px", padding: "10px 14px" }}>
        <p style={{ fontSize: "12px", color: "#92400E", margin: 0 }}>
          ⚠️ Informational only. Not medical advice. Consult a clinician before use.
        </p>
      </div>

      {/* Content sections */}
      {[
        { title: "What it is", body: peptide.whatItIs },
        { title: "How it works", body: peptide.howItWorks },
        { title: "Best for", body: peptide.bestFor },
        { title: "Dosing guide", body: peptide.dosing },
      ].map((section) => (
        <div key={section.title} style={{ padding: "16px 20px", borderTop: `1px solid ${borderLight}` }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: dark, marginBottom: "8px" }}>{section.title}</div>
          <p style={{ fontSize: "15px", color: "#444444", lineHeight: 1.7, margin: 0 }}>{section.body}</p>
        </div>
      ))}

      {/* Goals */}
      <div style={{ padding: "16px 20px", borderTop: `1px solid ${borderLight}` }}>
        <div style={{ fontSize: "16px", fontWeight: 700, color: dark, marginBottom: "10px" }}>Goals it serves</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {peptide.goals.map((g) => (
            <div key={g} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", color: "#444444" }}>
              <span style={{ color: navy, fontWeight: 700 }}>✓</span> {g}
            </div>
          ))}
        </div>
      </div>

      {/* Week by week */}
      <div style={{ padding: "16px 20px", borderTop: `1px solid ${borderLight}` }}>
        <div style={{ fontSize: "16px", fontWeight: 700, color: dark, marginBottom: "10px" }}>What to expect</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {peptide.weekByWeek.map((week, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: navy, flexShrink: 0, marginTop: "6px" }} />
              <p style={{ fontSize: "15px", color: "#444444", lineHeight: 1.6, margin: 0 }}>{week}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vendors */}
      {peptideVendors.length > 0 && (
        <div style={{ padding: "16px 20px 0", borderTop: `1px solid ${borderLight}` }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: dark, marginBottom: "12px" }}>Where to Buy</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {peptideVendors.map((v) => (
              <div key={v.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
                padding: "12px 14px", background: "#FFFFFF", border: `1px solid ${border}`, borderRadius: "10px",
              }}>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: dark, marginBottom: "3px" }}>{v.name}</div>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#555", background: "#F0F0F0", padding: "2px 6px", borderRadius: "4px", textTransform: "capitalize" }}>
                    {v.qualityTier} grade
                  </span>
                </div>
                <a
                  href={buildAffiliateUrl(v.affiliateBase, v.utmSource, v.utmMedium, peptide.id)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  style={{ background: navy, color: "#fff", fontSize: "13px", fontWeight: 700, padding: "10px 16px", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}
                >
                  Buy →
                </a>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "11px", color: "#AAAAAA", margin: "10px 0 0" }}>
            * Affiliate links. We earn a commission at no extra cost to you.
          </p>
        </div>
      )}

      {/* Related */}
      {related.length > 0 && (
        <div style={{ padding: "20px 20px 0", borderTop: `1px solid ${borderLight}`, marginTop: "20px" }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: dark, marginBottom: "12px" }}>Commonly stacked with</div>
          <div style={{ display: "flex", gap: "10px" }}>
            {related.map((r) => (
              <Link key={r.id} href={`/peptides/${r.id}`} style={{
                flex: 1, padding: "12px", background: "#F9F9F9", border: `1px solid ${border}`,
                borderRadius: "10px", textDecoration: "none",
              }}>
                <div style={{ fontSize: "22px", marginBottom: "6px" }}>{icons[r.primaryGoal[0]] || "💊"}</div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: dark, marginBottom: "4px" }}>{r.name}</div>
                <div style={{ fontSize: "12px", color: muted, lineHeight: 1.4 }}>{r.shortDescription.substring(0, 55)}...</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ padding: "28px 20px 0" }}>
        <Link href="/quiz" style={{
          display: "block", textAlign: "center", background: navy, color: "#fff",
          borderRadius: "10px", padding: "16px 24px", fontSize: "16px", fontWeight: 700, textDecoration: "none",
        }}>
          Get Your Full Protocol →
        </Link>
      </div>
    </div>
  );
}
