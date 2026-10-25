import { marquee } from "../content";
import Marquee from "./Marquee";

/** Hi-vis strip between Browse and Shop: graphite words on yellow, hazard tape top and bottom. */
export default function MarqueeStrip() {
  return (
    <div className="sm-yellow relative" data-record-time="2">
      <div className="sm-tape" aria-hidden />
      <div className="py-7 text-[#2b2d2f]">
        <Marquee words={marquee.words} className="sm-display text-[120px]" base={90} boost={900}>
          <span className="sm-wheelmark" />
        </Marquee>
      </div>
      <div className="sm-tape" aria-hidden />
    </div>
  );
}
