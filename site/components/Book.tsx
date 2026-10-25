"use client";
import { useState } from "react";
import { book } from "../content";

/** BK05: week strip + time-slot chips. */
export default function Book() {
  const [day, setDay] = useState(2);
  const [slot, setSlot] = useState("12:00");
  const [svc, setSvc] = useState(1);
  const d = book.days[day];
  return (
    <section id="book" className="sm-section sm-graphite" data-record-time="3.5">
      <div className="sm-wrap grid grid-cols-[520px_1fr] gap-20">
        <div>
          <p className="sm-eyebrow mb-4">{book.eyebrow}</p>
          <h2 className="sm-display text-[84px]">{book.title}</h2>
          <p className="mt-8 max-w-[440px] text-[20px] font-semibold text-[#f4f1e6]">Pick a day, pick a slot, roll in. We hold your bike on the stand till you arrive.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {book.services.map((s, i) => <button key={s} type="button" className={`sm-chip ${svc === i ? "on" : ""}`} onClick={() => setSvc(i)}>{s}</button>)}
          </div>
        </div>
        <div className="border-4 border-[#ffd500] p-8 shadow-[10px_10px_0_#ffd500]">
          <div className="grid grid-cols-6 gap-3">
            {book.days.map((x, i) => (
              <button key={x.d} type="button" className={`sm-day ${day === i ? "on" : ""}`} onClick={() => { setDay(i); setSlot(x.slots[0]); }}>
                <span className="sm-eyebrow block">{x.d}</span>
                <span className="sm-display block text-[40px]">{x.n}</span>
              </button>
            ))}
          </div>
          <p className="sm-eyebrow mb-4 mt-8">Open slots · {d.d} {d.n}</p>
          <div className="flex flex-wrap gap-3">
            {d.slots.map((s, i) => <button key={s} type="button" className={`sm-chip !px-6 !py-4 !text-[16px] ${slot === s ? "on" : ""}`} onClick={() => setSlot(s)} data-hover-demo={i === 1 && day === 2 ? "click" : undefined}>{s}</button>)}
          </div>
          <div className="mt-8 flex items-center justify-between border-t-4 border-[#ffd500] pt-6">
            <p className="text-[18px] font-bold">{book.services[svc]} · {d.d} {d.n} · {slot}</p>
            <a href="#book" className="sm-btn">Confirm slot →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
