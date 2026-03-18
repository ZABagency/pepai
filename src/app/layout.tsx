import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PeptideIQ — Find Your Protocol",
  description: "Answer 5 questions and get a personalized peptide protocol. Find the best peptides for your goals and where to get them safely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <nav className="border-b px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
          <a href="/" className="text-xl font-bold" style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            PeptideIQ
          </a>
          <div className="flex items-center gap-6 text-sm" style={{ color: "#9999bb" }}>
            <a href="/peptides" className="hover:text-white transition-colors">Directory</a>
            <a href="/vendors" className="hover:text-white transition-colors">Vendors</a>
            <a href="/about" className="hover:text-white transition-colors">How It Works</a>
            <a href="/quiz" className="px-4 py-2 rounded-lg font-semibold text-white text-sm" style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>
              Find My Protocol →
            </a>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t mt-24 py-12 px-6" style={{ borderColor: "var(--border)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div>
                <div className="text-xl font-bold mb-2" style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  PeptideIQ
                </div>
                <p className="text-sm max-w-xs" style={{ color: "#9999bb" }}>
                  Personalized peptide guidance for health-conscious individuals.
                </p>
              </div>
              <div className="flex gap-12 text-sm" style={{ color: "#9999bb" }}>
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-white">Explore</span>
                  <a href="/quiz" className="hover:text-white transition-colors">Take the Quiz</a>
                  <a href="/peptides" className="hover:text-white transition-colors">Peptide Directory</a>
                  <a href="/vendors" className="hover:text-white transition-colors">Vendor Directory</a>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-white">Info</span>
                  <a href="/about" className="hover:text-white transition-colors">How We Make Money</a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 text-xs text-center" style={{ color: "#666688", borderTop: "1px solid var(--border)" }}>
              <p>⚠️ This site is for informational purposes only. We are not medical professionals. Always consult a licensed clinician before starting any peptide protocol.</p>
              <p className="mt-2">This site contains affiliate links. We may earn a commission when you purchase through our links, at no extra cost to you. <a href="/about" className="underline hover:text-white">Learn more.</a></p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
