import Link from "next/link";
import peptides from "@/data/peptides.json";

const goalIcons: Record<string, string> = {
  recovery: "🩹",
  bodycomp: "💪",
  sleep: "😴",
  cognitive: "🧠",
  fatloss: "🔥",
  antiaging: "⏳",
  anxiety: "🧘",
  skin: "✨",
  energy: "⚡",
  gut: "🫁",
};

const featuredPeptides = peptides.slice(0, 4);

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="px-6 py-24 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8" style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.3)" }}>
          ✦ Personalized peptide recommendations
        </div>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Find the right peptides{" "}
          <span style={{ background: "linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            for your goals
          </span>
        </h1>
        <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: "#9999bb" }}>
          Answer 5 questions. Get a personalized protocol — which peptides to take, how to dose them, and exactly where to get them safely.
        </p>
        <Link href="/quiz" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white transition-all hover:-translate-y-1" style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", boxShadow: "0 8px 25px rgba(99,102,241,0.3)" }}>
          Find My Protocol →
        </Link>
        <p className="mt-4 text-sm" style={{ color: "#666688" }}>Free · Takes 2 minutes · No signup required</p>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: "1", title: "Answer 5 questions", desc: "Tell us your goals, experience level, and budget. Takes 2 minutes." },
            { step: "2", title: "Get your protocol", desc: "We match you with 1–3 peptides tailored to your specific goals." },
            { step: "3", title: "Buy from trusted sources", desc: "We show you the best vendors with verified quality — with transparent affiliate disclosure." },
          ].map((item) => (
            <div key={item.step} className="p-6 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4 text-white" style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>
                {item.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p style={{ color: "#9999bb" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured peptides */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Popular Peptides</h2>
          <Link href="/peptides" className="text-sm font-medium" style={{ color: "#818cf8" }}>View all →</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {featuredPeptides.map((p) => (
            <Link href={`/peptides/${p.id}`} key={p.id} className="p-6 rounded-2xl block transition-all hover:-translate-y-1 hover:border-indigo-500" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-2xl mb-1">{goalIcons[p.primaryGoal[0]] || "💊"}</div>
                  <h3 className="text-lg font-bold">{p.name}</h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium capitalize" style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}>
                  {p.difficulty}
                </span>
              </div>
              <p className="text-sm mb-3" style={{ color: "#9999bb" }}>{p.shortDescription}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-1 rounded-md text-xs" style={{ background: "var(--muted)", color: "#9999bb" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust section */}
      <section className="px-6 py-16 max-w-3xl mx-auto text-center">
        <div className="p-8 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h2 className="text-2xl font-bold mb-4">Built on transparency</h2>
          <p className="mb-6" style={{ color: "#9999bb" }}>
            We only recommend vendors we&apos;d use ourselves. We clearly disclose every affiliate link. We don&apos;t hide how we make money — because trust is the whole product.
          </p>
          <Link href="/about" className="text-sm font-medium underline" style={{ color: "#818cf8" }}>
            How we make money →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to find your protocol?</h2>
        <p className="mb-8 text-lg" style={{ color: "#9999bb" }}>Stop guessing. Get a personalized recommendation in 2 minutes.</p>
        <Link href="/quiz" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white transition-all hover:-translate-y-1" style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", boxShadow: "0 8px 25px rgba(99,102,241,0.3)" }}>
          Take the Free Quiz →
        </Link>
      </section>
    </div>
  );
}
