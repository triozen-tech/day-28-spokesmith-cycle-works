"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { loading } from "@/lib/loading";
import SpokeWheel from "./SpokeWheel";
import { startWheel, wheel } from "./wheelState";

/**
 * Spokesmith loader: a bare rim draws itself, the 32 spokes are laced in one by one while the counter runs 00 to 100,
 * then the wheel spins up. The wheel sits exactly where the hero wheel is, so the screen simply fades away under it.
 * Replaces the kit's default loader (app/page.tsx renders this one). About 2.5 s.
 */
export default function Loader({ enabled = true }: { enabled?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(!enabled);

  useEffect(() => {
    if (!enabled || prefersReducedMotion()) {
      setGone(true);
      loading.markFinished();
      return;
    }
    const el = root.current!;
    const q = gsap.utils.selector(el);
    const count = q("[data-ld-count]")[0] as HTMLElement;
    const spokes = (q("[data-spoke]") as HTMLElement[]).sort((a, b) => +a.dataset.order! - +b.dataset.order!);

    startWheel();
    wheel.ease = 0;
    wheel.speed = 0;

    let ready = false;
    let drawn = false;
    let exiting = false;
    const hardLimit = setTimeout(() => exit(), 9000);

    const exit = () => {
      if (exiting) return;
      exiting = true;
      clearTimeout(hardLimit);
      gsap
        .timeline()
        .to(wheel, { speed: 560, duration: 0.35, ease: "power2.in" })
        .add(() => { wheel.ease = 1.2; }) // the hero wheel carries the spin on and slows to its idle
        .to(q("[data-ld-copy]"), { yPercent: -130, duration: 0.45, ease: "power3.in" }, ">-0.05")
        .to(q("[data-ld-bg]"), { opacity: 0, duration: 0.5, ease: "power1.out" }, "<0.05")
        .add(() => {
          setGone(true);
          loading.markFinished();
        });
    };
    const tryExit = () => { if (ready && drawn) exit(); };

    const draw = gsap
      .timeline({
        onUpdate: () => { count.textContent = String(Math.round(draw.progress() * 100)).padStart(2, "0"); },
        onComplete: () => { drawn = true; tryExit(); },
      })
      .to(q("[data-draw]"), { strokeDashoffset: 0, duration: 0.65, ease: "power2.inOut", stagger: 0.08 }, 0)
      .to(spokes, { strokeDashoffset: 0, duration: 0.3, ease: "power1.out", stagger: 0.03 }, 0.45)
      .to(q("[data-hub]"), { opacity: 1, duration: 0.2 }, 1.5);

    const unsub = loading.subscribe((_p, done) => {
      if (done) { ready = true; tryExit(); }
    });

    return () => {
      unsub();
      clearTimeout(hardLimit);
      draw.kill();
    };
  }, [enabled]);

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100] overflow-hidden text-[#ffd500]" aria-hidden>
      <div data-ld-bg className="absolute inset-0 bg-[#2b2d2f]" />
      <SpokeWheel drawn={false} className="absolute left-[880px] top-[200px] h-[560px] w-[560px]" />
      <div data-ld-copy className="absolute bottom-[110px] left-[40px]">
        <p className="sm-eyebrow mb-6">Spokesmith Cycle Works</p>
        <p className="sm-display text-[230px] leading-[0.9]" data-ld-count>00</p>
        <p className="sm-eyebrow mt-6">Lacing the wheel</p>
      </div>
      <div className="sm-tape absolute inset-x-0 bottom-0" />
    </div>
  );
}
