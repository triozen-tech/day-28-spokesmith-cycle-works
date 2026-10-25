"use client";
import { useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { onSiteReady } from "@/lib/loading";

const $ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)];

/** CSS transitions on transform fight GSAP's per-frame writes (elements stall mid-tween), so they are switched off while GSAP drives them. */
const free = (els: HTMLElement[]) => {
  els.forEach((e) => e.style.setProperty("transition", "none"));
  return () => els.forEach((e) => e.style.removeProperty("transition"));
};

/** Round 3: every section entrance, the join transitions and the rail progress. Nothing runs with ?static=1, so every section stays in its final state. */
export default function Fx() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const kill: Array<() => void> = [];
    const ctx = gsap.context(() => {
      const once = (trigger: Element | string, start = "top 78%") => ({ trigger, start, once: true });

      // BROWSE: tiles slide up in a stagger
      const tiles = $(".sm-tile");
      gsap.from(tiles, { y: 140, autoAlpha: 0, duration: 0.75, stagger: 0.12, ease: "power3.out", scrollTrigger: once("#browse .grid", "top 82%") });

      // SHOP: bikes roll in from the left one by one, the wheel-spin lands on the swatches
      const cards = $(".sm-pcard");
      const freeCards = free(cards);
      gsap.from(cards, { onComplete: freeCards, x: -220, rotation: -5, autoAlpha: 0, duration: 0.8, stagger: 0.11, ease: "power3.out", scrollTrigger: once("#shop .sm-pcard", "top 88%") });
      const sw = $(".sm-swatch");
      const freeSw = free(sw);
      gsap.from(sw, { onComplete: freeSw, rotation: -360, scale: 0, duration: 0.7, stagger: 0.09, ease: "back.out(1.6)", scrollTrigger: once("#shop aside.sticky", "top 80%") });
      gsap.from("#shop aside.sticky", { x: 120, autoAlpha: 0, duration: 0.8, ease: "power3.out", scrollTrigger: once("#shop aside.sticky", "top 88%") });

      // COMPARE: outer columns slide in from opposite sides, rows tick in, the winning column flashes once
      const cell = (col: number) => $(`#compare [data-col="${col}"]`);
      const cmp = gsap.timeline({ scrollTrigger: once("#compare table", "top 75%") });
      cmp.from(cell(1), { x: -260, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, 0)
        .from(cell(3), { x: 260, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, 0)
        .from(cell(2), { y: -40, autoAlpha: 0, duration: 0.6, ease: "power3.out" }, 0.1)
        .from($("#compare [data-tick]"), { scale: 0, rotation: -40, duration: 0.3, stagger: 0.07, ease: "back.out(2.4)" }, 0.6)
        .fromTo(cell(2).filter((c) => c.tagName === "TD"), { backgroundColor: "#ffffff" }, { backgroundColor: "#ffd500", duration: 0.35, yoyo: true, repeat: 1, ease: "power1.inOut", clearProps: "backgroundColor" }, ">-0.1");

      // BOOK: fields step in, slots pop with a bounce
      const freeBook = free($("#book [data-step], #book .sm-day, #book [data-slot-chip]"));
      const book = gsap.timeline({ onComplete: freeBook, scrollTrigger: once("#book .border-4", "top 78%") });
      book.from($("#book [data-step]"), { x: -40, autoAlpha: 0, duration: 0.45, stagger: 0.09, ease: "power2.out" }, 0)
        .from($("#book .sm-day"), { y: 40, autoAlpha: 0, duration: 0.4, stagger: 0.07, ease: "power2.out" }, 0.2)
        .from($("#book [data-slot-chip]"), { scale: 0, duration: 0.5, stagger: 0.07, ease: "back.out(3)" }, 0.7);

      // STORY: chapter titles flip in like the hero slot; the V3 film scrubs by itself
      $("#story [data-flip]").forEach((el) => {
        gsap.set(el, { transformPerspective: 900, transformOrigin: "50% 50%" });
        gsap.from(el, { rotationX: 90, yPercent: 60, autoAlpha: 0, duration: 0.6, ease: "power3.out", scrollTrigger: once(el, "top 85%") });
      });
      gsap.from($("#story [data-chapter] p"), { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: once("#story [data-chapter]", "top 80%") });

      // PROCESS: steps light up one by one, a chain is drawn down the rail
      const rail = document.querySelector<HTMLElement>("#process .sm-rail");
      if (rail) {
        rail.dataset.armed = "";
        const fill = rail.querySelector<HTMLElement>(".sm-rail-fill");
        if (fill) gsap.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: "none", transformOrigin: "top", scrollTrigger: { trigger: rail, start: "top 60%", end: "bottom 62%", scrub: 0.4 } });
        $("li", rail).forEach((li) => ScrollTrigger.create({ trigger: li, start: "top 62%", toggleClass: { targets: li, className: "lit" } }));
      }

      // FOOTER: wordmark rises, links stagger in
      gsap.from("#footer [data-rise]", { yPercent: 105, duration: 1, ease: "power4.out", scrollTrigger: once("#footer [data-rise]", "top 95%") });
      const links = $("#footer [data-link]");
      const freeLinks = free(links);
      gsap.from(links, { onComplete: freeLinks, y: 30, autoAlpha: 0, duration: 0.5, stagger: 0.05, ease: "power2.out", scrollTrigger: once("#footer .grid", "top 88%") });

      // JOIN TRANSITIONS (X): a yellow wipe or tape strip crosses as you leave a section, under 0.6 s, never blocks scroll
      const layer = document.createElement("div");
      layer.setAttribute("aria-hidden", "true");
      layer.style.cssText = "position:fixed;inset:0;z-index:55;pointer-events:none;overflow:hidden";
      document.body.appendChild(layer);
      kill.push(() => layer.remove());
      const mk = (css: string, html = "") => { const d = document.createElement("div"); d.style.cssText = `position:absolute;${css}`; d.innerHTML = html; layer.appendChild(d); return d; };
      const word = "font-family:var(--font-display-family),sans-serif;font-weight:800;text-transform:uppercase;line-height:1;white-space:nowrap";

      // X34 type wipe (hero → browse)
      const x34 = mk(`left:0;top:50%;height:230px;margin-top:-115px;width:100%;background:#ffd500;border-block:6px solid #0b0b0b;display:flex;align-items:center;transform:translateX(-101%);${word};font-size:190px;color:#0b0b0b;padding-left:60px`, "JOBS · JOBS · JOBS");
      // tape strip sweep (browse/marquee → shop)
      const tape = mk("left:0;top:62%;height:56px;width:100%;transform:translateX(101%);border-block:6px solid #0b0b0b;background:repeating-linear-gradient(-45deg,#0b0b0b 0 22px,#ffd500 22px 44px)");
      // X56 skewed clip (compare → book)
      const x56 = mk("left:0;top:0;height:100%;width:34%;background:#ffd500;border-inline:6px solid #0b0b0b;transform:translateX(-140%) skewX(-18deg)");
      // X33 scale jump: a wheel rim blows up (story → signature)
      const x33 = mk("left:50%;top:50%;width:300px;height:300px;margin:-150px 0 0 -150px;border-radius:50%;border:34px solid #ffd500;box-shadow:0 0 0 6px #0b0b0b inset,0 0 0 6px #0b0b0b;transform:scale(.1);opacity:0");
      // X60 split halves (signature → process)
      const topH = mk("left:0;top:0;width:100%;height:50%;background:#ffd500;border-bottom:6px solid #0b0b0b;transform:translateY(-101%)");
      const botH = mk("left:0;bottom:0;width:100%;height:50%;background:#ffd500;border-top:6px solid #0b0b0b;transform:translateY(101%)");

      let busy = false, armed = false;
      const off = onSiteReady(() => setTimeout(() => (armed = true), 600));
      kill.push(off);
      const play = (build: (tl: gsap.core.Timeline, back: boolean) => void) => (back: boolean) => {
        if (!armed || busy) return;
        busy = true;
        const tl = gsap.timeline({ onComplete: () => { busy = false; } });
        build(tl, back);
      };
      const join = (target: string, fn: (back: boolean) => void) => ScrollTrigger.create({ trigger: target, start: "top 62%", onEnter: () => fn(false), onEnterBack: () => fn(true) });

      join("#browse", play((tl, back) => {
        gsap.set(x34, { x: back ? "101%" : "-101%" });
        tl.to(x34, { x: back ? "-101%" : "101%", duration: 0.55, ease: "power2.inOut" });
      }));
      join("#shop", play((tl, back) => {
        gsap.set(tape, { x: back ? "-101%" : "101%" });
        tl.to(tape, { x: back ? "101%" : "-101%", duration: 0.5, ease: "power2.inOut" });
      }));
      join("#book", play((tl, back) => {
        gsap.set(x56, { x: back ? "330%" : "-140%" });
        tl.to(x56, { x: back ? "-140%" : "330%", duration: 0.55, ease: "power2.inOut" });
      }));
      join("#signature", play((tl) => {
        gsap.set(x33, { scale: 0.1, opacity: 1 });
        tl.to(x33, { scale: 5.5, duration: 0.5, ease: "power2.in" }).to(x33, { opacity: 0, duration: 0.1 }, 0.4);
      }));
      join("#process", play((tl) => {
        gsap.set([topH, botH], { y: (i) => (i ? "101%" : "-101%") });
        tl.to([topH, botH], { y: 0, duration: 0.2, ease: "power2.in" }).to([topH, botH], { y: (i) => (i ? "101%" : "-101%"), duration: 0.28, ease: "power2.out" }, ">0.04");
      }));
    });
    const refresh = onSiteReady(() => ScrollTrigger.refresh());
    return () => { ctx.revert(); kill.forEach((k) => k()); refresh(); };
  }, []);
  return null;
}
