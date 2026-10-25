import { brand, footer } from "../content";
import Marquee from "./Marquee";

/** FO08: velocity marquee on hazard tape, then the workshop details. */
export default function Footer() {
  return (
    <footer id="footer" className="sm-graphite relative overflow-hidden">
      <div className="sm-tape sm-tape-tall" />
      <div className="border-b-4 border-[#ffd500] py-10">
        <Marquee words={footer.marquee} className="sm-display text-[170px]" base={80} boost={1100} reverse />
      </div>
      <div className="sm-wrap grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-10 py-16">
        <div>
          <p className="sm-display text-[34px]">{brand.name}</p>
          <p className="sm-eyebrow mt-3">{brand.tag}</p>
          <a href="#book" className="sm-btn sm-tape-sweep mt-8" data-link>Book a tune →</a>
        </div>
        {footer.cols.map((c) => (
          <div key={c.h}>
            <p className="sm-eyebrow mb-4" data-link>{c.h}</p>
            <ul className="space-y-2 text-[17px] font-semibold text-[#f4f1e6]">{c.l.map((x) => <li key={x} data-link><a href="#top" className="sm-ulink">{x}</a></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="sm-wrap overflow-hidden pb-4">
        <p data-rise className="sm-display whitespace-nowrap text-[150px] leading-[1.02] tracking-[-0.01em]" aria-hidden>{brand.name}</p>
      </div>
      <div className="sm-wrap flex justify-between border-t-4 border-[#ffd500] py-6 text-[14px] font-bold text-[#f4f1e6]">
        <span>{footer.note}</span>
        <span>Sample prices in ₹ · fictional workshop</span>
      </div>
    </footer>
  );
}
