import Link from "next/link";
import peptides from "@/data/peptides.json";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["800"] });

const navy = "#1A1A2E";
const dark = "#111111";
const muted = "#888888";
const borderLight = "#EEEEEE";

// 🩹 (U+1FA79) has poor system font support — replaced with universally supported alternatives
const peptideEmoji: Record<string, string> = {
  "bpc-157": "💊",
  "tb-500": "💪",
  "ipamorelin": "😴",
  "cjc-1295": "💉",
  "aod-9604": "🔥",
  "semax": "🧠",
  "selank": "😌",
  "dsip": "🌙",
  "epithalon": "⏳",
  "ghk-cu": "✨",
  "nad-plus": "⚡",
};

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function Home() {
  return (
    <div style={{ paddingBottom: "48px" }}>

      {/* Hero — light gray bg, centered */}
      <div style={{ background: "#F8F8F8", padding: "52px 20px 40px", textAlign: "center" }}>
        <h1 className={syne.className} style={{
          fontSize: "40px", fontWeight: 800, lineHeight: 1.1,
          color: dark, letterSpacing: "-0.025em", margin: "0 0 12px",
        }}>
          Find Your Protocol.
        </h1>
        <p style={{
          fontSize: "15px", color: muted, lineHeight: 1.5,
          margin: "0 auto 28px", maxWidth: "240px",
        }}>
          5 questions. A personalized peptide stack for your goals.
        </p>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <Link href="/quiz" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "100%", maxWidth: "260px", height: "52px",
            background: navy, color: "#FFFFFF",
            borderRadius: "12px", padding: "0 24px",
            fontSize: "16px", fontWeight: 700, textDecoration: "none",
          }}>
            Start My Quiz
          </Link>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <ShieldIcon />
            <span style={{ fontSize: "13px", color: muted }}>Licensed sources only</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <CheckIcon />
            <span style={{ fontSize: "13px", color: muted }}>Personalized to you</span>
          </div>
        </div>
      </div>

      {/* How It Works — outlined circles, compact */}
      <div style={{ padding: "28px 20px", borderBottom: `1px solid ${borderLight}` }}>
        <div style={{ display: "flex", gap: "8px" }}>
          {[
            { n: "1", title: "Answer 5 Qs", sub: "Goals, experience, budget." },
            { n: "2", title: "Get matched", sub: "1–3 peptides for you." },
            { n: "3", title: "Buy safely", sub: "Vetted, disclosed sources." },
          ].map((item) => (
            <div key={item.n} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "6px" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%",
                border: `2px solid ${navy}`, background: "#FFFFFF", color: navy,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "14px", fontWeight: 700, flexShrink: 0,
              }}>
                {item.n}
              </div>
              <span style={{ fontSize: "13px", fontWeight: 700, color: dark, lineHeight: 1.2 }}>{item.title}</span>
              <span style={{ fontSize: "11px", color: muted, lineHeight: 1.3 }}>{item.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular peptides */}
      <div style={{ padding: "28px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: dark }}>Popular Peptides</span>
          <Link href="/peptides" style={{ fontSize: "13px", fontWeight: 600, color: navy, textDecoration: "none" }}>
            View all →
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {peptides.slice(0, 4).map((p) => (
            <Link key={p.id} href={`/peptides/${p.id}`} style={{
              display: "flex", alignItems: "center", gap: "14px",
              padding: "14px", background: "#FFFFFF",
              border: "1px solid #EBEBEB",
              borderLeft: `3px solid ${navy}`,
              borderRadius: "8px",
              textDecoration: "none",
            }}>
              {/* Emoji — no circle bg, just floating */}
              <span style={{ fontSize: "24px", lineHeight: 1, flexShrink: 0, width: "32px", textAlign: "center" }}>
                {peptideEmoji[p.id] || "💊"}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "15px", fontWeight: 700, color: dark }}>{p.name}</div>
                <div style={{ fontSize: "13px", color: muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {p.shortDescription}
                </div>
              </div>
              {/* Badge — navy tint */}
              <span style={{
                fontSize: "11px", fontWeight: 600, color: navy, background: "#EEF0F8",
                padding: "3px 8px", borderRadius: "6px", textTransform: "capitalize",
                whiteSpace: "nowrap", flexShrink: 0,
              }}>
                {p.difficulty}
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
