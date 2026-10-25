import type { SiteMeta, Theme } from "@/lib/site";

export const meta: SiteMeta = {
  name: "Spokesmith Cycle Works",
  title: "Spokesmith Cycle Works · Tune. Repair. Build.",
  description: "A bicycle workshop that tunes, repairs and builds. Concept website by Triozen.",
  loaderText: "SPOKESMITH",
  loader: true,
  cursor: false,
  record: { duration: 38 },
};

export const theme: Theme = {
  bg: "#FFD500",
  surface: "#F4F1E6",
  text: "#0B0B0B",
  muted: "#3D3800",
  accent: "#FFD500",
  accentText: "#0B0B0B",
  line: "#0B0B0B",
  fontDisplay: "'Lexend Mega Variable', 'Arial Black', sans-serif",
  fontBody: "'Public Sans Variable', system-ui, sans-serif",
  radius: 0,
  uppercaseHeadings: true,
  heroText: "#FFD500",
};
