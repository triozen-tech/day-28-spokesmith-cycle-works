"use client";
import { useRef, useState } from "react";
import { rupee, shop, type Bike } from "../content";

/** PS15: filter sidebar + product grid, with a sticky buy box (swatches, sizes, loupe, add to cart). */
export default function Shop() {
  const [filter, setFilter] = useState<string>("All");
  const [sel, setSel] = useState<Bike>(shop.items[0]);
  const [colour, setColour] = useState(-1); // -1 = the photographed yellow
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);
  const lens = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  const items = shop.items.filter((i) => filter === "All" || i.kind === filter);
  const isFoundry = sel.id === "S1";
  const colourImg = colour >= 0 && isFoundry ? shop.colours[colour].img : null;
  const mainImg = colourImg ?? (isFoundry ? "/images/spokesmith/s1-bike.png" : sel.img);
  const cutout = !!colourImg || isFoundry;

  const move = (e: React.MouseEvent) => {
    const s = stage.current, l = lens.current;
    if (!s || !l) return;
    const r = s.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    l.style.opacity = "1";
    l.style.left = `${x - 75}px`;
    l.style.top = `${y - 75}px`;
    l.style.backgroundImage = `url(${mainImg})`;
    l.style.backgroundSize = `${r.width * 2.6}px ${r.height * 2.6}px`;
    l.style.backgroundPosition = `${-(x * 2.6 - 75)}px ${-(y * 2.6 - 75)}px`;
  };

  return (
    <section id="shop" className="sm-section sm-paper" data-record-time="5">
      <div className="sm-wrap">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="sm-eyebrow mb-4">{shop.eyebrow} · all prices sample</p>
            <h2 className="sm-display text-[84px]">{shop.title}</h2>
          </div>
        </div>
        <div className="grid grid-cols-[170px_1fr_380px] items-start gap-8">
          <aside className="flex flex-col gap-3 border-4 border-[#0b0b0b] p-4">
            <p className="sm-eyebrow">Filter</p>
            {shop.filters.map((f) => (
              <button key={f} type="button" className="sm-chip text-left" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
            ))}
            <p className="sm-eyebrow mt-4">Showing</p>
            <p className="sm-display text-[34px]">{items.length}</p>
          </aside>

          <div className="grid grid-cols-3 gap-6">
            {items.map((b, i) => (
              <article key={b.id} className="sm-card sm-pcard cursor-pointer" onClick={() => { setSel(b); setColour(-1); }} data-hover-demo={i === 0 ? "" : undefined}>
                <div className="sm-pcard-img"><img src={b.img} alt={b.alt} /><span className="sm-eyebrow absolute left-0 top-0 border-b-4 border-r-4 border-[#0b0b0b] bg-[#ffd500] px-3 py-1.5">{b.id}</span></div>
                <div className="p-4">
                  <p className="sm-eyebrow text-[11px]">{b.tag}</p>
                  <h3 className="sm-display mt-1 text-[16px] leading-tight">{b.name}</h3>
                  <div className="sm-price-slide mt-2 text-[17px] font-extrabold">
                    <span>{rupee(b.price)} <small className="font-semibold">sample</small></span>
                    <span>View · quick look →</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="sticky top-24 border-4 border-[#0b0b0b] bg-[#ffd500] shadow-[8px_8px_0_#0b0b0b]">
            <div ref={stage} className="relative h-[190px] overflow-hidden border-b-4 border-[#0b0b0b]" onMouseMove={move} onMouseLeave={() => lens.current && (lens.current.style.opacity = "0")} data-cursor="Zoom">
              <img src={mainImg} alt={sel.alt} className={`h-full w-full ${cutout ? "object-contain p-3" : "object-cover"}`} style={cutout ? { background: "#f4f1e6" } : undefined} />
              <div ref={lens} className="sm-loupe" />
            </div>
            <div className="p-4">
              <p className="sm-eyebrow">Quick look · {sel.id}</p>
              <h3 className="sm-display mt-2 text-[24px]">{sel.name}</h3>
              <p className="mt-2 text-[22px] font-extrabold">{rupee(sel.price)} <small className="text-[13px] font-semibold">sample price</small></p>
              <ul className="mt-2 text-[14px] font-semibold">{sel.specs.slice(0, 2).map((s) => <li key={s} className="border-t-2 border-[#0b0b0b] py-1.5">{s}</li>)}</ul>
              {isFoundry && (
                <div className="mt-3">
                  <p className="sm-eyebrow mb-2">Frame colour</p>
                  <div className="flex gap-3">
                    <button type="button" aria-label="Yellow" className={`sm-swatch ${colour === -1 ? "on" : ""}`} style={{ background: "#ffd500", outline: "2px solid #0b0b0b", outlineOffset: -6 }} onClick={() => setColour(-1)} />
                    {shop.colours.map((c, i) => (
                      <button key={c.name} type="button" aria-label={c.name} className={`sm-swatch ${colour === i ? "on" : ""}`} style={{ background: c.hex }} onClick={() => setColour(i)} data-hover-demo={i === 1 ? "click" : undefined} />
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-4">
                <p className="sm-eyebrow mb-2">Size</p>
                <div className="flex gap-2">{shop.sizes.map((s) => <button key={s} type="button" className="sm-chip" aria-pressed={size === s} onClick={() => setSize(s)}>{s}</button>)}</div>
              </div>
              <button type="button" className="sm-btn sm-ink mt-5 w-full justify-center" data-hover-demo="click"
                onClick={() => { setAdded(true); window.dispatchEvent(new Event("sm:cart")); }}>
                {added ? "Added ✓" : "Add to cart"}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
