import { gsap } from "@/lib/gsap";

/**
 * One shared wheel clock: the loader wheel and the hero wheel read the same angle every frame,
 * so the hand-over from the loader to the hero has no jump in position, size or rotation.
 * `speed` is deg/s; when `ease` > 0 it chases `idle`.
 */
export const wheel = { angle: 0, speed: 0, idle: 9, ease: 1.2 };

let on = false;
export function startWheel() {
  if (on) return;
  on = true;
  gsap.ticker.add((_t, dtms) => {
    const dt = Math.min(0.1, dtms / 1000);
    if (wheel.ease > 0) wheel.speed += (wheel.idle - wheel.speed) * (1 - Math.exp(-wheel.ease * dt));
    wheel.angle = (wheel.angle + wheel.speed * dt) % 360;
    const tf = `rotate(${wheel.angle.toFixed(2)} 300 300)`;
    document.querySelectorAll("[data-wheel-rot]").forEach((el) => el.setAttribute("transform", tf));
  });
}
