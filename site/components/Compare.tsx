import { compare, rupee } from "../content";

/** PR05: comparison table with a sticky header row. */
export default function Compare() {
  return (
    <section id="compare" className="sm-section sm-yellow" data-record-time="1.5" data-record-hold="1">
      <div className="sm-wrap">
        <p className="sm-eyebrow mb-4">{compare.eyebrow}</p>
        <h2 className="sm-display mb-14 text-[84px]">{compare.title}</h2>
        <table className="sm-table w-full border-collapse border-4 border-[#0b0b0b] bg-[#f4f1e6] shadow-[10px_10px_0_#0b0b0b]">
          <thead className="sticky top-[72px]">
            <tr className="bg-[#0b0b0b] text-[#ffd500]">
              <th data-col="0" className="w-[34%] !border-[#0b0b0b]"><span className="sm-eyebrow">What you get</span></th>
              {compare.plans.map((p, pi) => (
                <th key={p.name} data-col={pi + 1} className={`!border-[#0b0b0b] ${p.pick ? "!bg-[#ffd500] !text-[#0b0b0b]" : ""}`}>
                  <span className="sm-display block text-[24px]">{p.name}</span>
                  <span className="mt-1 block text-[26px] font-extrabold">{rupee(p.price)}</span>
                  <span className="sm-eyebrow text-[11px]">sample · {p.time}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-[18px] font-semibold">
            {compare.rows.map((r, ri) => (
              <tr key={r.label} data-hover-demo={ri === 2 ? "" : undefined}>
                <td data-col="0">{r.label}</td>
                {r.v.map((on, i) => (
                  <td key={i} data-col={i + 1} className={compare.plans[i].pick ? "bg-[#ffd500]/60" : ""}>
                    {on ? <span className="sm-display inline-block text-[22px]" data-tick>✓</span> : <span className="text-[22px] opacity-30">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-6 text-[15px] font-semibold">{compare.note}</p>
      </div>
    </section>
  );
}
