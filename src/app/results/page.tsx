import Link from "next/link";
import { Suspense } from "react";
import peptides from "@/data/peptides.json";
import vendors from "@/data/vendors.json";
import { buildAffiliateUrl } from "@/lib/affiliate";

const navy = "#1A1A2E";
const dark = "#111111";
const muted = "#888888";
const border = "#E8E8E8";

type Peptide = typeof peptides[0];
type Vendor = typeof vendors[0];

// Goal → ordered peptide candidates (first = highest priority)
const goalMap: Record<string, string[]> = {
  muscle:    ["cjc-1295", "ipamorelin", "aod-9604"],
  energy:    ["semax", "nad-plus", "ipamorelin"],
  recovery:  ["bpc-157", "tb-500", "ipamorelin"],
  sleep:     ["ipamorelin", "dsip", "selank"],
  antiaging: ["epithalon", "nad-plus", "ghk-cu"],
  skin:      ["ghk-cu", "epithalon"],
};

// Peptides that work without injection
const oralNasalSafe = new Set(["bpc-157", "semax", "selank", "nad-plus", "ghk-cu"]);

// Social proof lines per peptide
const socialProof: Record<string, string> = {
  "bpc-157":   "Users report noticeable joint and gut improvements within 2–4 weeks.",
  "tb-500":    "Popular in the fitness community for healing chronic injuries that won't quit.",
  "ipamorelin":"Widely used for its clean GH release — deep sleep improvements reported fast.",
  "cjc-1295":  "A staple in body recomposition stacks — often paired with Ipamorelin.",
  "aod-9604":  "Gaining traction for stubborn fat loss, especially around the midsection.",
  "semax":     "Strong following in nootropic communities for focus without stimulants.",
  "selank":    "Often described as 'calm focus' — users love it for high-stress periods.",
  "dsip":      "One of the most direct sleep peptides — typically felt on night one.",
  "epithalon": "Used by longevity-focused biohackers — typically run 1–2 cycles per year.",
  "ghk-cu":    "A staple in advanced skincare — clinical and community results are strong.",
  "nad-plus":  "IV NAD+ is a transformative experience for energy — but pricey.",
};

function getRecommendations(
  goals: string[],
  experience: string,
  injectionPref: string,
  budget: string
): Peptide[] {
  // Score every peptide by overlap across selected goals (position-weighted)
  const scores: Record<string, number> = {};
  for (const goal of goals) {
    const list = goalMap[goal] ?? [];
    list.forEach((id, idx) => {
      scores[id] = (scores[id] ?? 0) + (list.length - idx);
    });
  }

  let candidates = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);

  // Injection gate — hard no means oral/nasal only
  if (injectionPref === "no") {
    candidates = candidates.filter((id) => oralNasalSafe.has(id));
    if (candidates.length === 0) candidates = ["semax", "nad-plus", "bpc-157"];
  }

  // Experience gate — beginners and basic get max 2
  const experienceMax = experience === "beginner" || experience === "basic" ? 2 : 3;

  // Budget gate
  const budgetMax = budget === "low" ? 1 : budget === "medium" ? 2 : experienceMax;

  const limit = Math.min(experienceMax, budgetMax);
  candidates = candidates.slice(0, Math.max(limit, 1));

  return candidates
    .map((id) => peptides.find((p) => p.id === id))
    .filter(Boolean) as Peptide[];
}

function getVendors(peptideId: string): Vendor[] {
  return vendors.filter((v) => v.peptides.includes(peptideId)).slice(0, 2);
}

const goalLabel: Record<string, string> = {
  muscle: "Muscle & Fat Loss", energy: "Energy & Focus",
  recovery: "Recovery & Healing", sleep: "Sleep & Stress",
  antiaging: "Anti-Aging & Longevity", skin: "Skin & Appearance",
};

function PeptideCard({
  peptide, index, style,
}: {
  peptide: Peptide; index: number; style: string;
}) {
  const peptideVendors = getVendors(peptide.id);
  const showScience = style === "science";
  const showSocial = style === "social";

  return (
    <div style={{
      background: "#FFFFFF", border: `1px solid ${border}`,
      borderLeft: `4px solid ${navy}`, borderRadius: "12px", overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{ padding: "14px 16px 12px" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, color: muted, textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "4px" }}>
          Recommendation #{index + 1}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: dark }}>{peptide.name}</div>
          {style !== "minimal" && (
            <Link href={`/peptides/${peptide.id}`} style={{ fontSize: "12px", color: navy, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" as const }}>
              Full profile →
            </Link>
          )}
        </div>
        <div style={{ fontSize: "14px", color: muted, marginTop: "4px" }}>{peptide.goals[0]}</div>
      </div>

      {/* Science section — expanded when style=science */}
      {showScience && (
        <>
          <div style={{ height: "1px", background: "#F0F0F0" }} />
          <div style={{ padding: "12px 16px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: muted, textTransform: "uppercase" as const, letterSpacing: "0.04em", marginBottom: "6px" }}>How it works</div>
            <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.6, margin: 0 }}>{peptide.howItWorks}</p>
          </div>
        </>
      )}

      {/* Social proof — shown when style=social */}
      {showSocial && socialProof[peptide.id] && (
        <>
          <div style={{ height: "1px", background: "#F0F0F0" }} />
          <div style={{ padding: "10px 16px", background: "#FAFAFA" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: muted, textTransform: "uppercase" as const, letterSpacing: "0.04em", marginBottom: "4px" }}>Community</div>
            <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.5, margin: 0, fontStyle: "italic" }}>&ldquo;{socialProof[peptide.id]}&rdquo;</p>
          </div>
        </>
      )}

      <div style={{ height: "1px", background: "#F0F0F0" }} />

      {/* Dosing row */}
      <div style={{ padding: "10px 16px", display: "flex", gap: "16px" }}>
        <div>
          <div style={{ fontSize: "11px", color: muted, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.04em", marginBottom: "2px" }}>Dosing</div>
          <div style={{ fontSize: "13px", color: dark, fontFamily: "monospace" }}>{peptide.dosing.split(",")[0]}</div>
        </div>
        <div>
          <div style={{ fontSize: "11px", color: muted, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.04em", marginBottom: "2px" }}>Method</div>
          <div style={{ fontSize: "13px", color: dark, textTransform: "capitalize" as const }}>{peptide.method}</div>
        </div>
      </div>

      {/* Vendors */}
      {peptideVendors.length > 0 && (
        <>
          <div style={{ height: "1px", background: "#F0F0F0" }} />
          <div style={{ padding: "10px 16px", display: "flex", flexDirection: "column" as const, gap: "8px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: muted, textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>Best Sources</div>
            {peptideVendors.map((v) => (
              <div key={v.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: dark }}>{v.name}</div>
                  <div style={{ fontSize: "12px", color: muted }}>{v.qualityTier} grade · {v.priceRange}</div>
                </div>
                <a
                  href={buildAffiliateUrl(v.affiliateBase, v.utmSource, v.utmMedium, peptide.id)}
                  target="_blank" rel="noopener noreferrer sponsored"
                  style={{ background: navy, color: "#fff", fontSize: "12px", fontWeight: 700, padding: "8px 14px", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" as const, flexShrink: 0 }}
                >
                  Best Source →
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function GettingStarted({ peptides }: { peptides: Peptide[] }) {
  return (
    <div style={{ marginTop: "24px", padding: "16px", background: "#F9F9F9", border: `1px solid ${border}`, borderRadius: "12px" }}>
      <div style={{ fontSize: "15px", fontWeight: 700, color: dark, marginBottom: "14px" }}>Getting started — step by step</div>
      {[
        "Order your peptides from one of the vetted vendors above.",
        "Read the full profile for each peptide before starting — dosing details matter.",
        "Start with one peptide first. Add others after 2 weeks once you know how you respond.",
        `Your stack: ${peptides.map(p => p.name).join(" → ")}`,
        "Track your results weekly. Most peptides show effects within 2–4 weeks.",
        "Consult a clinician if you have any underlying conditions.",
      ].map((step, i) => (
        <div key={i} style={{ display: "flex", gap: "12px", marginBottom: i < 5 ? "12px" : 0 }}>
          <div style={{ width: "22px", height: "22px", borderRadius: "50%", border: `2px solid ${navy}`, color: navy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>
            {i + 1}
          </div>
          <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.5, margin: 0 }}>{step}</p>
        </div>
      ))}
    </div>
  );
}

const concernReassurance: Record<string, string> = {
  safety:    "Every peptide in your protocol has established safety data and is used in legitimate clinical and research settings.",
  efficacy:  "The peptides matched to you are among the most studied — backed by real published data, not marketing claims.",
  sourcing:  "All vendors we link are independently vetted — third-party tested with COAs available. No gray market.",
  injection: "We've prioritized protocols that work without injection where your answers allow.",
  cost:      "We've matched your budget. These are the highest-value peptides for your goals at your price point.",
};

function ResultsContent({ params }: { params: Record<string, string> }) {
  const goals = (params.goals ?? "recovery").split(",").filter(Boolean);
  const experience = params.experience ?? "basic";
  const injectionPref = params.injection ?? "fine";
  const budget = params.budget ?? "medium";
  const style = params.style ?? "minimal";
  const topConcern = (params.concern ?? "").split(",")[0];

  const recs = getRecommendations(goals, experience, injectionPref, budget);

  const goalSummary = goals.map((g) => goalLabel[g] ?? g).join(" · ");

  return (
    <div style={{ padding: "24px 20px 48px" }}>
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: muted, margin: "0 0 4px" }}>
          Your protocol
        </p>
        <h1 style={{ fontSize: "26px", fontWeight: 800, color: dark, margin: "0 0 4px", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
          {goalSummary}
        </h1>
        <p style={{ fontSize: "14px", color: muted, margin: 0 }}>
          {recs.length} peptide{recs.length !== 1 ? "s" : ""} matched to your answers.
        </p>
      </div>

      {/* Top-concern reassurance */}
      {concernReassurance[topConcern] && (
        <div style={{ background: "#F0F4FF", border: "1px solid #D0D9F5", borderRadius: "8px", padding: "10px 14px", marginBottom: "16px" }}>
          <p style={{ fontSize: "13px", color: navy, margin: 0, lineHeight: 1.5 }}>
            {concernReassurance[topConcern]}
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: "8px", padding: "10px 14px", marginBottom: "20px" }}>
        <p style={{ fontSize: "12px", color: "#92400E", margin: 0, lineHeight: 1.5 }}>
          ⚠️ Informational only — not medical advice. Consult a clinician before starting any protocol.
        </p>
      </div>

      {/* Peptide cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
        {recs.map((peptide, i) => (
          <PeptideCard key={peptide.id} peptide={peptide} index={i} style={style} />
        ))}
      </div>

      {/* Guided getting started section */}
      {style === "guided" && <GettingStarted peptides={recs} />}

      <p style={{ fontSize: "11px", color: "#AAAAAA", textAlign: "center", margin: "20px 0" }}>
        * Affiliate links — we earn a commission at no extra cost to you.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link href="/quiz" style={{ display: "block", textAlign: "center", padding: "16px", border: `1px solid ${navy}`, borderRadius: "10px", fontSize: "16px", fontWeight: 700, color: navy, textDecoration: "none" }}>
          ← Retake Quiz
        </Link>
        <Link href="/peptides" style={{ display: "block", textAlign: "center", padding: "16px", background: navy, borderRadius: "10px", fontSize: "16px", fontWeight: 700, color: "#fff", textDecoration: "none" }}>
          Browse All Peptides
        </Link>
      </div>
    </div>
  );
}

async function Inner({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams;
  return <ResultsContent params={params} />;
}

export default function ResultsPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", flexDirection: "column", gap: "12px" }}>
        <div style={{ fontSize: "36px" }}>🧬</div>
        <p style={{ color: muted, fontSize: "15px" }}>Loading your protocol...</p>
      </div>
    }>
      <Inner searchParams={searchParams} />
    </Suspense>
  );
}
