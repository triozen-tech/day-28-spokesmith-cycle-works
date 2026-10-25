import { browse, rupee } from "../content";
import LoopVideo from "./LoopVideo";

/** PS22: category tile wall. Each tile flips to the job's price on hover. */
export default function Browse() {
  return (
    <section id="browse" className="sm-section sm-yellow" data-record-time="2.5" data-record-hold="1">
      <div className="sm-wrap">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="sm-eyebrow mb-4">{browse.eyebrow} · 06 jobs</p>
            <h2 className="sm-display text-[84px]">{browse.title}</h2>
          </div>
          <p className="max-w-[340px] text-[17px] font-semibold">Hover a tile for the price. All sample prices, labour only.</p>
        </div>
        <div className="grid grid-cols-3 gap-10">
          {browse.tiles.map((t, i) => (
            <article key={t.code} className="sm-tile" data-hover-demo={i === 0 ? "" : undefined}>
              {t.video ? <LoopVideo src={t.video} /> : <img src={t.img} alt="" />}
              <div className="sm-tile-top">
                <span className="sm-eyebrow">{t.code}</span>
                <span className="sm-display text-[16px]">{t.name}</span>
              </div>
              <div className="sm-tile-flip">
                <div><span className="sm-display text-[26px]">{t.name}</span><span className="text-[14px] font-semibold text-[#f4f1e6]">{t.from}</span></div>
                <div><span className="sm-eyebrow">From (sample)</span><span className="sm-display text-[30px]">{rupee(t.price)}</span></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
