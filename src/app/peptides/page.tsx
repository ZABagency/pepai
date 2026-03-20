import Link from "next/link";
import peptides from "@/data/peptides.json";

const navy = "#1A1A2E";
const dark = "#111111";
const muted = "#888888";
const border = "#E0E0E0";

const icons: Record<string, string> = {
  recovery: "🩹", bodycomp: "💪", sleep: "😴", cognitive: "🧠",
  fatloss: "🔥", antiaging: "⏳", anxiety: "🧘", skin: "✨", energy: "⚡", gut: "🫁",
};

const diffColor: Record<string, string> = {
  beginner: "#059669", intermediate: "#D97706", advanced: "#DC2626",
};

export default function PeptidesPage() {
  return (
    <div style={{ padding: "28px 20px 48px" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: dark, margin: "0 0 6px", letterSpacing: "-0.01em" }}>
          Peptide Directory
        </h1>
        <p style={{ fontSize: "15px", color: muted, margin: 0, lineHeight: 1.5 }}>
          Every peptide in our database with full profiles, dosing, and sourcing.
        </p>
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
        {peptides.map((p) => (
          <Link key={p.id} href={`/peptides/${p.id}`} style={{
            display: "flex", alignItems: "center", gap: "14px", padding: "14px",
            background: "#FFFFFF", border: `1px solid ${border}`, borderRadius: "12px",
            textDecoration: "none",
          }}>
            <span style={{ fontSize: "24px", lineHeight: 1, flexShrink: 0 }}>{icons[p.primaryGoal[0]] || "💊"}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                <span style={{ fontSize: "15px", fontWeight: 700, color: dark }}>{p.name}</span>
                <span style={{ fontSize: "11px", fontWeight: 600, color: diffColor[p.difficulty], textTransform: "capitalize" }}>
                  {p.difficulty}
                </span>
              </div>
              <div style={{ fontSize: "13px", color: muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {p.shortDescription}
              </div>
            </div>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#555", background: "#F0F0F0", padding: "3px 8px", borderRadius: "6px", whiteSpace: "nowrap", flexShrink: 0, textTransform: "capitalize" }}>
              {p.method}
            </span>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div style={{ background: "#F9F9F9", border: `1px solid ${border}`, borderRadius: "12px", padding: "20px", textAlign: "center" }}>
        <div style={{ fontSize: "17px", fontWeight: 700, color: dark, marginBottom: "6px" }}>Not sure where to start?</div>
        <p style={{ fontSize: "14px", color: muted, margin: "0 0 16px" }}>Take the quiz and we&apos;ll match you to the right peptides.</p>
        <Link href="/quiz" style={{
          display: "block", background: navy, color: "#fff",
          borderRadius: "10px", padding: "14px 24px",
          fontSize: "15px", fontWeight: 700, textDecoration: "none",
        }}>
          Start My Quiz
        </Link>
      </div>
    </div>
  );
}
