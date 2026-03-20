"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import quizData from "@/data/quiz.json";

const navy = "#1A1A2E";
const dark = "#111111";
const muted = "#888888";
const border = "#E0E0E0";

type Question = typeof quizData.questions[0];

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [singleAnswers, setSingleAnswers] = useState<Record<string, string>>({});
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const [shakingId, setShakingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Rank state
  const rankQuestion = quizData.questions.find((q) => q.type === "rank");
  const [rankOrder, setRankOrder] = useState<string[]>(
    rankQuestion ? rankQuestion.options.map((o) => o.value) : []
  );
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hasRanked, setHasRanked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Drag refs
  const dragIndexRef = useRef<number | null>(null);
  const touchIndexRef = useRef<number | null>(null);
  const rankContainerRef = useRef<HTMLDivElement>(null);
  const tooltipShownRef = useRef(false);

  const questions = quizData.questions;
  const q = questions[step] as Question;
  const isMulti = q.type === "multi";
  const isRank = q.type === "rank";
  const progress = (step / questions.length) * 100;

  const canContinue = isMulti
    ? multiSelected.length > 0
    : isRank
    ? true
    : !!singleAnswers[q.id];

  // One-time tooltip — shows when Q2 first loads, never again
  useEffect(() => {
    if (!isRank || tooltipShownRef.current) return;
    tooltipShownRef.current = true;
    setShowTooltip(true);
    const t = setTimeout(() => setShowTooltip(false), 2500);
    return () => clearTimeout(t);
  }, [isRank]);

  // Non-passive touchmove — prevents page scroll while dragging rank cards
  useEffect(() => {
    if (!isRank) return;
    const container = rankContainerRef.current;
    if (!container) return;
    const handleTouchMove = (e: TouchEvent) => {
      if (touchIndexRef.current === null) return;
      e.preventDefault();
      const y = e.touches[0].clientY;
      const cards = Array.from(container.children) as HTMLElement[];
      for (let i = 0; i < cards.length; i++) {
        const rect = cards[i].getBoundingClientRect();
        if (y >= rect.top && y <= rect.bottom && i !== touchIndexRef.current) {
          const from = touchIndexRef.current;
          setRankOrder((prev) => {
            const next = [...prev];
            const [item] = next.splice(from, 1);
            next.splice(i, 0, item);
            return next;
          });
          touchIndexRef.current = i;
          setDraggedIndex(i);
          setHasRanked(true);
          break;
        }
      }
    };
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => container.removeEventListener("touchmove", handleTouchMove);
  }, [isRank]);

  // ── Rank drag handlers (HTML5) ───────────────────────────────────────────────

  function onDragStart(index: number) {
    dragIndexRef.current = index;
    setDraggedIndex(index);
  }

  function onDragEnter(index: number) {
    if (dragIndexRef.current === null || dragIndexRef.current === index) return;
    const from = dragIndexRef.current;
    setRankOrder((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(index, 0, item);
      return next;
    });
    dragIndexRef.current = index;
    setDraggedIndex(index);
    if (!hasRanked) setHasRanked(true);
  }

  function onDragEnd() {
    dragIndexRef.current = null;
    setDraggedIndex(null);
  }

  // ── Rank touch handlers (mobile) ─────────────────────────────────────────────

  function onTouchStart(index: number) {
    touchIndexRef.current = index;
    setDraggedIndex(index);
  }

  function onTouchEnd() {
    touchIndexRef.current = null;
    setDraggedIndex(null);
  }

  // ── Multi handlers ───────────────────────────────────────────────────────────

  function toggleMulti(value: string) {
    if (multiSelected.includes(value)) {
      setMultiSelected(multiSelected.filter((v) => v !== value));
    } else if (multiSelected.length >= ((q as { maxSelect?: number }).maxSelect ?? 3)) {
      setShakingId(value);
      setTimeout(() => setShakingId(null), 400);
    } else {
      setMultiSelected([...multiSelected, value]);
    }
  }

  function selectSingle(value: string) {
    setSingleAnswers({ ...singleAnswers, [q.id]: value });
  }

  // ── Navigation ───────────────────────────────────────────────────────────────

  function next() {
    if (!canContinue) return;
    const updatedAnswers = isRank
      ? { ...singleAnswers, [q.id]: rankOrder.join(",") }
      : singleAnswers;
    if (step < questions.length - 1) {
      if (isRank) setSingleAnswers(updatedAnswers);
      setStep(step + 1);
    } else {
      setLoading(true);
      const params = new URLSearchParams({ ...updatedAnswers, goals: multiSelected.join(",") });
      setTimeout(() => router.push(`/results?${params.toString()}`), 1600);
    }
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  // ── Loading screen ───────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", padding: "20px", textAlign: "center" }}>
        <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}`}</style>
        <div style={{ fontSize: "48px", marginBottom: "20px" }}>🧬</div>
        <div style={{ fontSize: "22px", fontWeight: 700, color: dark, marginBottom: "8px" }}>Building your protocol...</div>
        <div style={{ fontSize: "15px", color: muted }}>Matching peptides to your goals.</div>
        <div style={{ display: "flex", gap: "6px", marginTop: "28px" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: navy, animation: "bounce 0.8s infinite", animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    );
  }

  // ── Main render ──────────────────────────────────────────────────────────────

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100svh - 57px)" }}>
      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .shaking { animation: shake 0.35s ease; }
        @keyframes tooltipFade {
          0%   { opacity: 1; }
          70%  { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* Progress bar */}
      <div style={{ height: "4px", background: "#EEEEEE", width: "100%" }}>
        <div style={{ height: "4px", background: navy, width: `${progress}%`, transition: "width 0.4s ease" }} />
      </div>

      {/* Back + step counter */}
      <div style={{ display: "flex", alignItems: "center", padding: "16px 20px 0" }}>
        {step > 0 ? (
          <button onClick={back} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: dark, padding: "4px", lineHeight: 1, outline: "none" }}>←</button>
        ) : <div style={{ width: "28px" }} />}
        <div style={{ flex: 1, textAlign: "center", fontSize: "13px", color: muted, fontWeight: 500 }}>
          {step + 1} of {questions.length}
        </div>
        <div style={{ width: "28px" }} />
      </div>

      {/* Question heading */}
      <div style={{ padding: "28px 20px 16px", textAlign: "center" }}>
        <h2 style={{ fontSize: "26px", fontWeight: 700, color: dark, lineHeight: 1.25, margin: "0 auto 8px", maxWidth: "320px" }}>
          {q.question}
        </h2>
        <p style={{ fontSize: isRank || q.id === "injection" ? "13px" : "15px", color: muted, margin: 0 }}>{q.subtitle}</p>
      </div>

      {/* One-time tooltip pill */}
      {isRank && showTooltip && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
          <span style={{
            background: "#F0F0F0", borderRadius: "100px", padding: "5px 14px",
            fontSize: "12px", color: muted,
            animation: "tooltipFade 2.5s ease forwards",
          }}>
            Hold to drag · reorder by priority
          </span>
        </div>
      )}

      {/* ── Rank cards ──────────────────────────────────────────────────────── */}
      {isRank && (
        <div
          ref={rankContainerRef}
          style={{ flex: 1, padding: "0 20px", display: "flex", flexDirection: "column", gap: "8px" }}
        >
          {rankOrder.map((value, index) => {
            const opt = q.options.find((o) => o.value === value)!;
            const isDragging = draggedIndex === index;
            return (
              <div
                key={value}
                draggable
                onDragStart={() => onDragStart(index)}
                onDragEnter={() => onDragEnter(index)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnd={onDragEnd}
                onTouchStart={() => onTouchStart(index)}
                onTouchEnd={onTouchEnd}
                style={{
                  flex: 1,
                  background: "#FFFFFF",
                  border: `1px solid ${border}`,
                  borderRadius: "12px",
                  padding: "0 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: isDragging ? "grabbing" : "grab",
                  boxShadow: isDragging ? "0 4px 12px rgba(0,0,0,0.12)" : "none",
                  transform: isDragging ? "scale(1.02)" : "scale(1)",
                  transition: "box-shadow 0.1s ease, transform 0.1s ease",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
              >
                {/* Position number */}
                <div style={{ width: "18px", fontSize: "12px", fontWeight: 700, color: navy, textAlign: "center", flexShrink: 0 }}>
                  {index + 1}
                </div>

                {/* Drag handle */}
                <div style={{ fontSize: "18px", color: muted, flexShrink: 0, lineHeight: 1 }}>⠿</div>

                {/* Emoji */}
                <span aria-hidden="true" style={{ fontSize: "24px", lineHeight: 1, display: "inline-block", flexShrink: 0, fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif', fontStyle: "normal" }}>
                  {value === "safety" ? "🛡️" : value === "efficacy" ? "🔬" : value === "sourcing" ? "🏪" : value === "injection" ? "💉" : "💸"}
                </span>

                {/* Label */}
                <span style={{ flex: 1, fontSize: "15px", fontWeight: 500, color: dark }}>{opt.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Multi / Single cards ─────────────────────────────────────────────── */}
      {!isRank && (
        <div style={{ flex: 1, padding: "0 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {q.options.map((opt) => {
            const isSelected = isMulti
              ? multiSelected.includes(opt.value)
              : singleAnswers[q.id] === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => isMulti ? toggleMulti(opt.value) : selectSingle(opt.value)}
                className={shakingId === opt.value ? "shaking" : ""}
                style={{
                  flex: 1,
                  position: "relative",
                  width: "100%", background: "#FFFFFF",
                  border: isSelected ? "2px solid #1A1A2E" : `1px solid ${border}`,
                  borderRadius: "12px", padding: "16px",
                  fontSize: "16px", fontWeight: 500, color: dark,
                  cursor: "pointer", textAlign: "left",
                  display: "flex", alignItems: "center", gap: "12px",
                  fontFamily: "inherit", transition: "border-color 0.15s",
                  outline: "none",
                }}
              >
                <span aria-hidden="true" style={{ fontSize: "22px", lineHeight: 1, display: "inline-block", fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif', fontStyle: "normal" }}>{opt.emoji}</span>
                <span style={{ flex: 1 }}>{opt.label}</span>
                {isSelected && (
                  <div style={{ position: "absolute", top: "8px", right: "10px", width: "18px", height: "18px", borderRadius: "50%", background: navy, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700 }}>✓</div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Multi-select counter */}
      {isMulti && (
        <div style={{ textAlign: "center", padding: "10px 20px 0", fontSize: "12px", color: muted }}>
          {multiSelected.length} of {(q as { maxSelect?: number }).maxSelect ?? 3} selected
        </div>
      )}

      {/* CTA */}
      <div style={{ padding: "12px 20px 20px" }}>
        <p style={{ fontSize: "11px", color: "#AAAAAA", textAlign: "center", margin: "0 0 12px" }}>
          Not medical advice — for informational purposes only.
        </p>
        <button
          onClick={next}
          disabled={!canContinue}
          style={{
            width: "100%", background: canContinue ? navy : "#8890A8",
            color: "#FFFFFF", border: "none", borderRadius: "10px",
            padding: "16px 24px", fontSize: "16px", fontWeight: 700,
            cursor: canContinue ? "pointer" : "not-allowed", fontFamily: "inherit",
            outline: "none",
          }}
        >
          {step === questions.length - 1 ? "Get My Protocol" : "Continue"}
        </button>
      </div>
    </div>
  );
}
