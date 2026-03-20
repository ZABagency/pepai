import Link from "next/link";
import vendors from "@/data/vendors.json";

const navy = "#1A1A2E";
const dark = "#111111";
const muted = "#888888";
const border = "#E0E0E0";

export default function VendorsPage() {
  return (
    <div style={{ padding: "28px 20px 48px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: 800, color: dark, margin: "0 0 6px", letterSpacing: "-0.01em" }}>
        Vendor Directory
      </h1>
      <p style={{ fontSize: "15px", color: muted, margin: "0 0 20px", lineHeight: 1.5 }}>
        Every vendor we recommend has been vetted. We only partner with sources we&apos;d use ourselves.
      </p>

      {/* Affiliate disclosure */}
      <div style={{ background: "#F0F4FF", border: "1px solid #C7D2FE", borderRadius: "8px", padding: "12px 14px", marginBottom: "20px" }}>
        <p style={{ fontSize: "13px", color: "#3730A3", margin: 0, lineHeight: 1.5 }}>
          <strong>Affiliate Disclosure:</strong> Links below are affiliate links. We earn a commission at no extra cost to you.{" "}
          <Link href="/about" style={{ color: "#3730A3" }}>Learn more →</Link>
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {vendors.map((vendor) => (
          <div key={vendor.id} style={{ background: "#FFFFFF", border: `1px solid ${border}`, borderRadius: "12px", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ padding: "16px 16px 12px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "6px" }}>
                <div style={{ fontSize: "17px", fontWeight: 700, color: dark }}>{vendor.name}</div>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#555", background: "#F0F0F0", padding: "3px 8px", borderRadius: "6px", whiteSpace: "nowrap", flexShrink: 0, textTransform: "capitalize" }}>
                  {vendor.qualityTier} grade
                </span>
              </div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "#D97706" }}>{"★".repeat(Math.round(vendor.rating))} {vendor.rating}</span>
                <span style={{ fontSize: "13px", color: muted }}>Price: {vendor.priceRange}</span>
              </div>
            </div>

            <div style={{ height: "1px", background: "#F0F0F0" }} />

            {/* Description + strengths */}
            <div style={{ padding: "12px 16px" }}>
              <p style={{ fontSize: "14px", color: muted, margin: "0 0 10px", lineHeight: 1.5 }}>{vendor.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px" }}>
                {vendor.strengths.map((s) => (
                  <span key={s} style={{ fontSize: "12px", color: "#555", background: "#F5F5F5", padding: "4px 10px", borderRadius: "6px" }}>
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ height: "1px", background: "#F0F0F0" }} />

            {/* Peptides */}
            <div style={{ padding: "12px 16px" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: muted, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "8px" }}>
                Available peptides
              </div>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px", marginBottom: "14px" }}>
                {vendor.peptides.map((pid) => (
                  <Link key={pid} href={`/peptides/${pid}`} style={{
                    fontSize: "12px", fontWeight: 600, color: navy, background: "#F0F4FF",
                    padding: "3px 8px", borderRadius: "6px", textDecoration: "none", textTransform: "uppercase",
                  }}>
                    {pid}
                  </Link>
                ))}
              </div>
              <a
                href={`${vendor.affiliateBase}?utm_source=${vendor.utmSource}&utm_medium=${vendor.utmMedium}&utm_campaign=vendor-page`}
                target="_blank"
                rel="noopener noreferrer sponsored"
                style={{
                  display: "block", textAlign: "center", background: navy, color: "#fff",
                  borderRadius: "10px", padding: "14px 24px", fontSize: "15px", fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Visit {vendor.name} →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
