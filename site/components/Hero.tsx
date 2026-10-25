import { hero } from "../content";
import LoopVideo from "./LoopVideo";

/** HR32: type-only hero with a flipping word slot, over the V1 drivetrain loop. */
export default function Hero() {
  return (
    <section id="top" className="relative flex h-[900px] items-end overflow-hidden bg-[#2b2d2f] text-[#ffd500]" data-record-time="4">
      <LoopVideo src={hero.video} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(95deg, rgba(11,11,11,.88) 0%, rgba(11,11,11,.72) 45%, rgba(11,11,11,.15) 100%)" }} />
      <div className="sm-wrap relative z-10 pb-24 pt-40">
        <p className="sm-eyebrow mb-8 inline-block border-4 border-[#ffd500] px-4 py-2">Spokesmith Cycle Works · Est. on Foundry Lane</p>
        <h1 className="sm-display text-[150px] leading-[1.02]">
          <span className="block">We</span>
          <span className="sm-slot text-[150px]" data-hero-slot>
            <span className="block">{hero.words[0]}</span>
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
          <ul className="flex gap-0 border-4 border-[#ffd500]">
            {hero.words.map((w, i) => (
              <li key={w} className={`sm-display px-6 py-4 text-[20px] ${i === 0 ? "bg-[#ffd500] text-[#0b0b0b]" : ""}`}>{w}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
