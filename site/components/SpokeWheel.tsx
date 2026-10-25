import type { CSSProperties } from "react";

const SPOKES = 32;
const RIM = 266;
const FLANGE = 44;

const spokes = Array.from({ length: SPOKES }, (_, j) => {
  const rho = ((j * 360) / SPOKES) * (Math.PI / 180);
  const eta = rho + (j % 2 === 0 ? 1 : -1) * (78 * Math.PI) / 180; // leading / trailing lacing
  return {
    j,
    order: (j % 2) * (SPOKES / 2) + Math.floor(j / 2), // all leading spokes first, then the trailing ones
    x1: 300 + FLANGE * Math.cos(eta), y1: 300 + FLANGE * Math.sin(eta),
    x2: 300 + RIM * Math.cos(rho), y2: 300 + RIM * Math.sin(rho),
  };
});

/**
 * The Spokesmith wheel: drawn in code, used by the loader (which laces it) and the hero (where it idles).
 * Same viewBox and strokes in both places, so the loader hands over without a jump.
 * `drawn={false}` starts every stroke undrawn (the loader draws them in).
 */
export default function SpokeWheel({ className, style, drawn = true }: { className?: string; style?: CSSProperties; drawn?: boolean }) {
  const off: CSSProperties = { strokeDasharray: 1, strokeDashoffset: drawn ? 0 : 1 };
  return (
    <svg viewBox="0 0 600 600" className={className} style={style} aria-hidden>
      <g data-wheel-rot fill="none" stroke="#ffd500" strokeLinecap="butt">
        <circle data-draw="rim" cx="300" cy="300" r="290" strokeWidth="14" pathLength={1} style={off} opacity=".4" />
        <circle data-draw="rim" cx="300" cy="300" r={RIM} strokeWidth="6" pathLength={1} style={off} />
        {spokes.map((s) => (
          <line key={s.j} data-spoke data-order={s.order} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} strokeWidth="2.4" pathLength={1} style={off} />
        ))}
        <g data-hub style={{ opacity: drawn ? 1 : 0 }}>
          <circle cx="300" cy="300" r={FLANGE} strokeWidth="6" />
          <circle cx="300" cy="300" r="18" fill="#ffd500" stroke="none" />
        </g>
      </g>
    </svg>
  );
}
