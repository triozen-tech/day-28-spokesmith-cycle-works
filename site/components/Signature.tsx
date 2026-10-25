import FrameScrub from "@/components/video/FrameScrub";
import { signature } from "../content";

/** VD03 signature "True the Wheel": the V2 film stays straight; a code gauge + ghost rim show the wobble falling to 0.0. */
export default function Signature() {
  const last = signature.steps[signature.steps.length - 1];
  return (
    <section id="signature" className="relative h-[900px] overflow-hidden bg-[#2b2d2f] text-[#ffd500]" data-record-time="8">
      <FrameScrub frames={signature.frames} stillAt={0.55} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(11,11,11,.7) 0%, rgba(11,11,11,0) 38%, rgba(11,11,11,0) 70%, rgba(11,11,11,.55) 100%)" }} />
      {/* ghost rim: settled, sits exactly on the film's rim at step 5 */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" aria-hidden>
        <ellipse cx="717" cy="400" rx="598" ry="505" fill="none" stroke="#ffd500" strokeWidth="4" strokeDasharray="14 10" opacity=".9" data-ghost-rim />
        <circle cx="717" cy="400" r="9" fill="#ffd500" />
      </svg>
      <div className="sm-wrap relative z-10 flex h-full items-stretch justify-between py-28">
        <div className="flex w-[400px] flex-col justify-between">
          <div className="border-4 border-[#ffd500] bg-[#0b0b0b] p-6">
            <p className="sm-eyebrow mb-4">{signature.eyebrow}</p>
            <h2 className="sm-display text-[44px]">{signature.title}</h2>
          </div>
          <ol className="border-4 border-[#ffd500] bg-[#0b0b0b]">
            {signature.steps.map((s) => (
              <li key={s.n} className={`flex items-center gap-4 border-b-2 border-[#ffd500]/40 px-4 py-3 last:border-b-0 ${s.n === 5 ? "bg-[#ffd500] text-[#0b0b0b]" : ""}`}>
                <span className="sm-display text-[18px]">{s.n}</span>
                <span className="flex-1 text-[15px] font-bold">{s.note}</span>
                <span className="sm-display text-[15px]">{s.mm.toFixed(1)}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col justify-end">
          <div className="w-[340px] border-4 border-[#ffd500] bg-[#0b0b0b] p-6 shadow-[10px_10px_0_#ffd500]">
            <p className="sm-eyebrow">Run-out gauge</p>
            <svg viewBox="0 0 240 150" className="mt-3 w-full" aria-hidden>
              <path d="M20 130 A100 100 0 0 1 220 130" fill="none" stroke="#ffd500" strokeWidth="6" opacity=".35" />
              {[0, 1, 2, 3, 4, 5].map((i) => { const a = Math.PI + (i / 5) * Math.PI * 0.0 + 0; return <line key={i} x1={120 + 100 * Math.cos(Math.PI - (i / 5) * Math.PI)} y1={130 - 100 * Math.sin((i / 5) * Math.PI)} x2={120 + 84 * Math.cos(Math.PI - (i / 5) * Math.PI)} y2={130 - 84 * Math.sin((i / 5) * Math.PI)} stroke="#ffd500" strokeWidth="3" data-k={a} />; })}
              <line x1="120" y1="130" x2="120" y2="42" stroke="#ffd500" strokeWidth="5" data-needle />
              <circle cx="120" cy="130" r="9" fill="#ffd500" />
            </svg>
            <p className="sm-display mt-1 text-center text-[64px] leading-none">{last.mm.toFixed(1)}<span className="ml-2 text-[22px]">mm</span></p>
            <p className="sm-eyebrow mt-4 text-center">Step 5 of 5 · true</p>
          </div>
        </div>
      </div>
    </section>
  );
}
