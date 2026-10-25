"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { onSiteReady } from "@/lib/loading";
import { hero } from "../content";
import LoopVideo from "./LoopVideo";
import SpokeWheel from "./SpokeWheel";
import { startWheel } from "./wheelState";

const STEP = 1.4; // seconds per word

/** HR32: a headline with one slot that flips Built. Trued. Greased. Fixed. over the V1 drivetrain loop; the hero wheel idles at the right. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    if (prefersReducedMotion()) {
      // ?static=1: one fixed word ("Trued."), the others hidden
      el.querySelectorAll<HTMLElement>("[data-word]").forEach((w, i) => { w.style.visibility = i === 0 ? "visible" : "hidden"; });
      return;
    }
    const slot = el.querySelector<HTMLElement>("[data-slot]")!;
    const words = [...el.querySelectorAll<HTMLElement>("[data-word]")];
    const tags = [...el.querySelectorAll<HTMLElement>("[data-tag]")];
    const hint = el.querySelector("[data-hint]");
    const n = words.length;
    startWheel();

    gsap.set(words, { transformPerspective: 900, transformOrigin: "50% 50%" });
    gsap.set(words.slice(1), { autoAlpha: 0 });
    const mark = (i: number) => tags.forEach((t, k) => t.classList.toggle("on", k === i));

    // each flip is its own one-shot timeline: a repeating timeline rewinds the first word to a hidden state on every wrap
    let at = 0;
    let flip: gsap.core.Timeline | null = null;
    const step = () => {
      const cur = words[at];
      at = (at + 1) % n;
      const nxt = words[at];
      flip = gsap.timeline()
        .to(cur, { rotationX: -90, yPercent: -25, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 0)
        .fromTo(nxt, { rotationX: 90, yPercent: 25, autoAlpha: 0 }, { rotationX: 0, yPercent: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out" }, 0.25)
        .to(slot, { width: () => Math.ceil(parseFloat(getComputedStyle(nxt).width)), duration: 0.45, ease: "power3.inOut" }, 0.1)
        .add(() => mark(at), 0.25);
    };
    const tl = gsap.timeline({ repeat: -1, paused: true });
    tl.call(step, [], 0.75).add(() => {}, STEP);

    const off = onSiteReady(() => tl.play());
    // pause when off screen, resume when back (only after the site is ready)
    let readyDone = false;
    const off2 = onSiteReady(() => { readyDone = true; });
    const io2 = new IntersectionObserver(([e]) => { if (readyDone) e.isIntersecting ? tl.play() : tl.pause(); }, { threshold: 0 });
    io2.observe(el);

    const bob = hint ? gsap.to(hint, { y: 7, duration: 0.7, ease: "sine.inOut", yoyo: true, repeat: -1 }) : null;

    return () => {
      off();
      off2();
      io2.disconnect();
      tl.kill();
      flip?.kill();
      bob?.kill();
    };
  }, []);

  return (
    <section ref={root} id="top" className="relative h-[900px] overflow-hidden bg-[#2b2d2f] text-[#ffd500]" data-record-time="0" data-record-hold="1.5">
      <LoopVideo src={hero.video} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(95deg, rgba(11,11,11,.9) 0%, rgba(11,11,11,.72) 45%, rgba(11,11,11,.12) 100%)" }} />
      <SpokeWheel className="absolute left-[880px] top-[200px] h-[560px] w-[560px]" />
      <div className="sm-wrap relative z-10 flex h-full flex-col justify-end pb-[110px]">
        <h1 className="sm-display leading-[1.02]">
          <span className="block text-[88px]">Every bike,</span>
          <span className="sm-slot mt-3 text-[112px]" data-slot>
            {hero.words.map((w, i) => (
              <span key={w} data-word className={`sm-slot-word ${i === 0 ? "sm-slot-first" : ""}`}>{w}</span>
            ))}
          </span>
        </h1>
        <div className="mt-12 flex items-end justify-between gap-16">
          <div className="max-w-[560px]">
            <p className="text-[22px] font-semibold leading-snug text-[#f4f1e6]">{hero.lead}</p>
            <div className="mt-8 flex gap-6">
              <a href="#book" className="sm-btn">{hero.cta} →</a>
              <a href="#shop" className="sm-btn sm-ghost">{hero.cta2}</a>
            </div>
          </div>
          <ul className="flex gap-0 border-4 border-[#ffd500] bg-[#0b0b0b]">
            {hero.words.map((w, i) => (
              <li key={w} data-tag className={`sm-tag sm-display px-5 py-4 text-[18px] ${i === 0 ? "on" : ""}`}>{w}</li>
            ))}
          </ul>
        </div>
      </div>
      <div data-hint className="sm-eyebrow absolute bottom-[52px] left-1/2 z-10 -translate-x-1/2 text-center text-[#f4f1e6]">
        Scroll<span className="mt-2 block text-[22px] leading-none text-[#ffd500]">↓</span>
      </div>
      <div className="sm-tape absolute inset-x-0 bottom-0 z-10" />
    </section>
  );
}
