"use client";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/** Looping film. With ?static=1 it shows one still frame and never plays. */
export default function LoopVideo({ src, className = "", still = 1.2, style }: { src: string; className?: string; still?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (prefersReducedMotion()) {
      const seek = () => { v.pause(); v.currentTime = still; };
      v.addEventListener("loadeddata", seek, { once: true });
      if (v.readyState >= 2) seek();
      return;
    }
    // plays when it enters view, pauses when it leaves
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.15 });
    io.observe(v);
    return () => io.disconnect();
  }, [still]);
  return (
    <video ref={ref} className={className} style={style} muted loop playsInline preload="auto" aria-hidden>
      <source src={src.replace(/\.mp4$/, ".webm")} type="video/webm" />
      <source src={src} type="video/mp4" />
    </video>
  );
}
