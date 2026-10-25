"use client";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** M397 velocity marquee: drifts slowly on its own, speeds up while the page is scrolling. ?static=1 = at rest. */
export default function Marquee({ words, className = "", base = 60, boost = 700, reverse = false, children }: { words: readonly string[]; className?: string; base?: number; boost?: number; reverse?: boolean; children?: React.ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;
    const dir = reverse ? 1 : -1;
    let x = reverse ? -el.scrollWidth / 2 : 0;
    let last = window.scrollY, push = 0;
    const tick = (_t: number, dt: number) => {
      const half = el.scrollWidth / 2;
      if (!half) return;
      const s = Math.max(dt, 1) / 1000;
      const y = window.scrollY;
      const v = Math.min(Math.abs(y - last) / s, 4000) / 4000; // 0..1 scroll speed
      last = y;
      push += (v - push) * Math.min(1, s * 6);
      x += dir * (base + boost * push) * s;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translate3d(${x}px,0,0)`;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [base, boost, reverse]);
  const list = [...words, ...words, ...words, ...words];
  return (
    <div className="overflow-hidden" aria-hidden>
      <div ref={track} className={`sm-marquee ${className}`} data-marquee>
        {list.map((w, i) => <span key={i}>{w}{children ?? <span className="sm-sep"> /</span>}</span>)}
      </div>
    </div>
  );
}
