"use client";
import { useEffect, useState } from "react";
import { brand, nav } from "../content";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState(0);
  useEffect(() => {
    const add = () => setCart((c) => c + 1);
    window.addEventListener("sm:cart", add);
    return () => window.removeEventListener("sm:cart", add);
  }, []);
  return (
    <header className="sm-nav">
      <div className="sm-nav-bar">
        <a href="#top" className="sm-logo">
          <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden><circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="3" /><circle cx="16" cy="16" r="3" fill="currentColor" />{[0, 45, 90, 135].map((a) => <line key={a} x1="16" y1="3" x2="16" y2="29" stroke="currentColor" strokeWidth="1.5" transform={`rotate(${a} 16 16)`} />)}</svg>
          <span className="sm-display text-[17px]">{brand.name}</span>
        </a>
        <div className="flex items-stretch">
          <span className="flex items-center gap-3 px-8 text-[13px] font-bold uppercase tracking-[.1em]">Open 8 to 8 · Foundry Lane</span>
          <a href="#shop" className="sm-ulink flex items-center gap-3 border-l-4 px-7 font-display text-[14px] font-extrabold tracking-[.08em]" style={{ borderColor: "#0b0b0b" }}>
            CART <span className="grid h-7 min-w-7 place-items-center bg-[#0b0b0b] px-2 text-[#ffd500]" id="sm-cart-count">{cart}</span>
          </a>
          <button type="button" className="sm-menu-btn" onClick={() => setOpen(!open)} aria-expanded={open}>
            <span className="sm-roll"><span><span className="block">{open ? "CLOSE" : "MENU"}</span><span className="block">{open ? "CLOSE" : "MENU"}</span></span></span>
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>{[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={c * 8} y={r * 8} width="6" height="6" fill="currentColor" />))}</svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="sm-board" aria-label="Main">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              <span className="sm-eyebrow">{n.n}</span>
              <span className="sm-display sm-ulink text-[26px]">{n.label}</span>
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
