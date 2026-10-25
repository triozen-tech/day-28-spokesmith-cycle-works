import { brand, footer } from "../content";

/** FO08: velocity marquee on hazard tape, then the workshop details. */
export default function Footer() {
  const words = [...footer.marquee, ...footer.marquee];
  return (
    <footer className="sm-graphite relative overflow-hidden">
      <div className="sm-tape sm-tape-tall" />
      <div className="overflow-hidden border-b-4 border-[#ffd500] py-10" aria-hidden>
        <div className="sm-marquee sm-display text-[170px]" data-marquee>
          {words.map((w, i) => <span key={i}>{w} <span className="text-[#f4f1e6]">/</span></span>)}
        </div>
      </div>
      <div className="sm-wrap grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-10 py-16">
        <div>
          <p className="sm-display text-[34px]">{brand.name}</p>
          <p className="sm-eyebrow mt-3">{brand.tag}</p>
          <a href="#book" className="sm-btn mt-8">Book a tune →</a>
        </div>
        {footer.cols.map((c) => (
          <div key={c.h}>
            <p className="sm-eyebrow mb-4">{c.h}</p>
            <ul className="space-y-2 text-[17px] font-semibold text-[#f4f1e6]">{c.l.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        ))}
      </div>
      <div className="sm-wrap flex justify-between border-t-4 border-[#ffd500] py-6 text-[14px] font-bold text-[#f4f1e6]">
        <span>{footer.note}</span>
        <span>Sample prices in ₹ · fictional workshop</span>
      </div>
    </footer>
  );
}
