/** S10: stepped section edge. `above` is the colour of the section before, `below` the one after. */
const N = 24;
const W = 100 / N;
const pts = ["0 100%"];
for (let k = 0; k < N; k++) {
  const x = k * W;
  pts.push(`${x}% 66%`, `${x + W / 3}% 66%`, `${x + W / 3}% 33%`, `${x + (2 * W) / 3}% 33%`, `${x + (2 * W) / 3}% 0`, `${x + W}% 0`);
}
pts.push("100% 100%");
const clip = `polygon(${pts.join(",")})`;

export default function Edge({ above, below }: { above: string; below: string }) {
  return (
    <div className="relative h-[56px]" style={{ background: above }} aria-hidden>
      <div className="absolute inset-0" style={{ background: below, clipPath: clip }} />
    </div>
  );
}
