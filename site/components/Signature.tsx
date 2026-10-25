"use client";

import { useEffect, useRef } from "react";
import FrameScrub from "@/components/video/FrameScrub";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { signature } from "../content";

/**
 * VD03 signature "True the Wheel" (M951): pinned, scrubbed by scroll, five spoke-wrench turns.
 * The V2 film is a steady straight spin and is never moved. One value, `wobble` (mm), falls 2.4 > 1.8 > 1.1 > 0.6 > 0.2 > 0.0
 * across the five turns (a pure function of the scroll position) and drives: the dial gauge (needle + number), a wobbling
 * rim ring that comes into the dashed true circle and locks on at 0.0, and the wrench badge (a quarter turn per turn).
 * At 0.0 "TRUE." slams in with a short yellow flash; then the pin releases. ?static=1 shows the settled end state.
 */
const CX = 717, CY = 400, RX = 598, RY = 505; // the film's rim in the 1440x900 stage (measured on V2)
const PX_PER_MM = 14; // how far the wobbling rim swings per mm of run-out
const VALUES = [signature.start, ...signature.steps.map((s) => s.mm)];
const TURN_AT = (k: number) => 0.1 + 0.14 * k; // scroll position where turn k starts
const TURN_LEN = 0.1;
const TRUE_AT = 0.78;
const SWEEP = 120; // gauge: -120deg (0 mm) to +120deg (3 mm)
const MAX_MM = 3;

const sm = (x: number) => { const t = Math.min(1, Math.max(0, x)); return t * t * (3 - 2 * t); };
const gaugeAngle = (mm: number) => -SWEEP + (mm / MAX_MM) * SWEEP * 2;
const pt = (cx: number, cy: number, r: number, deg: number) => [cx + r * Math.sin((deg * Math.PI) / 180), cy - r * Math.cos((deg * Math.PI) / 180)] as const;
const arc = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  if (a1 - a0 < 0.05) return "";
  const [x0, y0] = pt(cx, cy, r, a0), [x1, y1] = pt(cx, cy, r, a1);
  return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
};
const ring = (a: number, ph: number) => {
  let d = "";
  for (let i = 0; i <= 120; i++) {
    const th = (i / 120) * Math.PI * 2;
    const dr = a * (Math.cos(th - ph) + 0.4 * Math.cos(2 * th + ph * 1.7));
    d += `${i ? "L" : "M"}${(CX + (RX + dr) * Math.cos(th)).toFixed(1)} ${(CY + (RY + dr) * Math.sin(th)).toFixed(1)}`;
  }
  return d + "Z";
};

/** Everything the page shows, as a function of scroll position p (0..1). */
function at(p: number) {
  let wobble = VALUES[0], tp = 0;
  for (let k = 0; k < 5; k++) {
    const t = sm((p - TURN_AT(k)) / TURN_LEN);
    wobble += (VALUES[k + 1] - VALUES[k]) * t;
    tp += t;
  }
  const tt = Math.min(1, Math.max(0, (p - TRUE_AT) / 0.06));
  return { wobble: Math.max(0, wobble), tp, trueT: sm(tt), flash: Math.sin(Math.PI * Math.min(1, Math.max(0, (p - TRUE_AT) / 0.08))) };
}

const ticks = Array.from({ length: 16 }, (_, i) => i * 0.2);

export default function Signature() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const sec = root.current!;
    const $ = <T extends Element>(s: string) => sec.querySelector<T>(s)!;
    const wob = $<SVGPathElement>("[data-wob]"), cal = $<SVGCircleElement>("[data-cal]");
    const needle = $<SVGGElement>("[data-needle]"), prog = $<SVGPathElement>("[data-prog]");
    const num = $("[data-num]"), turn = $("[data-turn]"), wrench = $<SVGSVGElement>("[data-wrench]");
    const tru = $<HTMLElement>("[data-true]"), flash = $<HTMLElement>("[data-flash]");
    const rows = [...sec.querySelectorAll<HTMLElement>("[data-row]")];
    let lastRow = "";

    const tick = (time: number) => {
      const r = sec.getBoundingClientRect();
      if (r.bottom < -100 || r.top > window.innerHeight + 100) return;
      const run = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / run));
      const { wobble, tp, trueT, flash: fl } = at(p);
      const t = time;
      const ph = t * 2 * Math.PI * 0.45;
      const a = wobble * PX_PER_MM;

      wob.setAttribute("d", ring(a, ph));
      wob.setAttribute("stroke-width", String(4 + 5 * fl));
      const thc = -0.9; // the caliper tip sits at a fixed spot on the rim and feels the run-out there
      const dc = a * (Math.cos(thc - ph) + 0.4 * Math.cos(2 * thc + ph * 1.7));
      cal.setAttribute("cx", (CX + (RX + dc) * Math.cos(thc)).toFixed(1));
      cal.setAttribute("cy", (CY + (RY + dc) * Math.sin(thc)).toFixed(1));

      const ang = gaugeAngle(wobble) + wobble * 1.4 * Math.sin(t * 9);
      needle.setAttribute("transform", `rotate(${ang.toFixed(2)} 130 130)`);
      prog.setAttribute("d", arc(130, 130, 112, -SWEEP, gaugeAngle(wobble)));
      num.textContent = wobble.toFixed(1);
      wrench.style.transform = `rotate(${(tp * 90).toFixed(1)}deg)`;

      const n = Math.min(5, Math.floor(tp + 0.001));
      const state = p < 0.04 ? "Start" : tp >= 4.999 ? "Turn 5 of 5 · true" : `Turn ${Math.min(5, Math.floor(tp) + 1)} of 5`;
      if (turn.textContent !== state) turn.textContent = state;
      const key = `${n}|${p < 0.04}`;
      if (key !== lastRow) {
        lastRow = key;
        rows.forEach((row, k) => { row.dataset.s = k < n ? (k === 4 ? "active" : "done") : k === n && p >= 0.04 ? "active" : "pending"; });
      }

      tru.style.opacity = String(trueT);
      tru.style.transform = `scale(${(1.35 - 0.35 * trueT).toFixed(3)})`;
      flash.style.opacity = String((0.5 * fl).toFixed(3));
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  const end = signature.steps[signature.steps.length - 1];
  return (
    <section ref={root} id="signature" className="relative h-[4200px] bg-[#2b2d2f] text-[#ffd500]" data-record-time="9">
      <div className="sticky top-0 h-[900px] overflow-hidden">
        <FrameScrub frames={signature.frames} stillAt={0.55} breath={0} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(11,11,11,.7) 0%, rgba(11,11,11,0) 38%, rgba(11,11,11,0) 70%, rgba(11,11,11,.55) 100%)" }} />
        {/* the true circle (dashed) and the wobbling rim that comes into it; settled = locked on */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" aria-hidden>
          <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke="#f4f1e6" strokeWidth="3" strokeDasharray="14 10" opacity=".9" />
          <path data-wob d={ring(0, 0)} fill="none" stroke="#ffd500" strokeWidth="4" strokeLinejoin="round" opacity=".95" />
          <circle data-cal cx={CX + RX * Math.cos(-0.9)} cy={CY + RY * Math.sin(-0.9)} r="11" fill="#ffd500" stroke="#0b0b0b" strokeWidth="3" />
          <circle cx={CX} cy={CY} r="9" fill="#ffd500" />
        </svg>
        <div data-flash className="pointer-events-none absolute inset-0 bg-[#ffd500]" style={{ opacity: 0 }} />
        <div data-true className="pointer-events-none absolute left-1/2 top-[215px] -translate-x-1/2" style={{ opacity: 1 }}>
          <p className="sm-display text-[128px] leading-none text-[#ffd500]" style={{ textShadow: "8px 8px 0 #0b0b0b" }}>TRUE.</p>
        </div>

        <div className="sm-wrap relative z-10 flex h-full items-stretch justify-between py-28">
          <div className="flex w-[400px] flex-col justify-between">
            <div className="border-4 border-[#ffd500] bg-[#0b0b0b] p-6">
              <p className="sm-eyebrow mb-4">{signature.eyebrow}</p>
              <h2 className="sm-display text-[40px]">{signature.title}</h2>
            </div>
            <ol className="border-4 border-[#ffd500] bg-[#0b0b0b]">
              {signature.steps.map((s, k) => (
                <li key={s.n} data-row data-s={k === 4 ? "active" : "done"} className="sm-row flex items-center gap-4 border-b-2 border-[#ffd500]/40 px-4 py-3 last:border-b-0">
                  <span className="sm-display text-[18px]">{s.n}</span>
                  <span className="flex-1 text-[15px] font-bold">{s.note}</span>
                  <span className="sm-display text-[15px]">{s.mm.toFixed(1)}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col justify-end">
            <div className="w-[340px] border-4 border-[#ffd500] bg-[#0b0b0b] p-5 shadow-[10px_10px_0_#ffd500]">
              <div className="flex items-center justify-between">
                <p className="sm-eyebrow">Run-out gauge</p>
                <span className="grid h-14 w-14 place-items-center rounded-full border-4 border-[#ffd500]">
                  <svg data-wrench viewBox="0 0 24 24" className="h-8 w-8" style={{ transform: "rotate(450deg)" }} fill="none" stroke="#ffd500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </span>
              </div>
              <svg viewBox="0 0 260 215" className="mt-2 w-full" aria-hidden>
                <path d={arc(130, 130, 112, -SWEEP, SWEEP)} fill="none" stroke="#ffd500" strokeWidth="8" opacity=".25" />
                <path data-prog d="" fill="none" stroke="#ffd500" strokeWidth="8" />
                {ticks.map((m, i) => {
                  const major = i % 5 === 0;
                  const a = gaugeAngle(m);
                  const [x1, y1] = pt(130, 130, 99, a), [x2, y2] = pt(130, 130, major ? 83 : 91, a);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffd500" strokeWidth={major ? 3 : 2} />;
                })}
                {[0, 1, 2, 3].map((m) => { const [x, y] = pt(130, 130, 68, gaugeAngle(m)); return <text key={m} x={x} y={y + 5} textAnchor="middle" fill="#f4f1e6" fontSize="15" fontWeight="800" className="font-display">{m}</text>; })}
                <g data-needle transform={`rotate(${gaugeAngle(0)} 130 130)`}>
                  <line x1="130" y1="130" x2="130" y2="44" stroke="#ffd500" strokeWidth="5" strokeLinecap="round" />
                </g>
                <circle cx="130" cy="130" r="10" fill="#ffd500" />
              </svg>
              <p className="sm-display -mt-1 text-center text-[58px] leading-none"><span data-num>{end.mm.toFixed(1)}</span><span className="ml-2 text-[20px]">mm</span></p>
              <p data-turn className="sm-eyebrow mt-3 text-center">Turn 5 of 5 · true</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
