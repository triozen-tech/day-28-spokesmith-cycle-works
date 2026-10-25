import FrameScrub from "@/components/video/FrameScrub";
import { story } from "../content";

/** SY09: sticky film stage on the left, three chapters beneath each other on the right. */
export default function Story() {
  return (
    <section id="story" className="sm-section sm-yellow" data-record-time="3">
      <div className="sm-wrap">
        <p className="sm-eyebrow mb-4">{story.eyebrow}</p>
        <h2 className="sm-display mb-16 max-w-[1000px] text-[72px]">{story.title}</h2>
        <div className="grid grid-cols-[660px_1fr] gap-16">
          <div className="sticky top-28 h-[520px] self-start overflow-hidden border-4 border-[#0b0b0b] bg-[#2b2d2f] shadow-[10px_10px_0_#0b0b0b]">
            <FrameScrub frames={story.video} stillAt={0.45} className="absolute inset-0 h-full w-full" />
            <span className="sm-eyebrow absolute left-0 top-0 border-b-4 border-r-4 border-[#0b0b0b] bg-[#ffd500] px-4 py-2">Bench 01 · live</span>
          </div>
          <div className="flex flex-col gap-10">
            {story.chapters.map((c) => (
              <article key={c.n} data-chapter className="sm-card p-8">
                <p className="sm-display text-[56px] leading-none">{c.n}</p>
                <h3 className="mt-5"><span data-flip className="sm-flip sm-display text-[26px]">{c.h}</span></h3>
                <p className="mt-4 text-[18px] font-semibold leading-relaxed">{c.p}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
