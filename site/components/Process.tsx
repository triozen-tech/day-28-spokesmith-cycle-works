import { process } from "../content";

/** PD08: vertical numbered step rail, the finished bike beside it. */
export default function Process() {
  return (
    <section id="process" className="sm-section sm-paper" data-record-time="3.5">
      <div className="sm-wrap grid grid-cols-[560px_1fr] gap-24">
        <div className="sticky top-28 self-start">
          <p className="sm-eyebrow mb-4">{process.eyebrow}</p>
          <h2 className="sm-display text-[72px]">{process.title}</h2>
          <div className="mt-12 border-4 border-[#0b0b0b] bg-[#ffd500] p-6 shadow-[10px_10px_0_#0b0b0b]">
            <img src={process.img} alt="Finished yellow road bike" className="h-[300px] w-full object-contain" />
            <p className="sm-eyebrow mt-3">Step 05 · finished</p>
          </div>
        </div>
        <ol className="sm-rail flex flex-col gap-12 pt-4">
          <span className="sm-rail-fill" aria-hidden />
          {process.steps.map((s, i) => (
            <li key={s.n} className="sm-step flex items-start gap-8" data-hover-demo={i === 2 ? "" : undefined}>
              <span className="sm-node">{s.n}</span>
              <div className="sm-card flex-1 p-6">
                <h3 className="sm-display text-[24px]">{s.h}</h3>
                <p className="mt-3 text-[18px] font-semibold">{s.p}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
