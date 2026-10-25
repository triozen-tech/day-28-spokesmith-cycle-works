// All text + data for Spokesmith Cycle Works (fictional). Every price is a sample, in ₹.
const I = "/images/spokesmith";

export const brand = { name: "SPOKESMITH", full: "Spokesmith Cycle Works", tag: "Tune. Repair. Build." };

export const nav = [
  { label: "Jobs", href: "#browse", n: "01" },
  { label: "Shop", href: "#shop", n: "02" },
  { label: "Prices", href: "#compare", n: "03" },
  { label: "Book", href: "#book", n: "04" },
  { label: "The bench", href: "#story", n: "05" },
  { label: "Process", href: "#process", n: "06" },
];

export const hero = {
  words: ["Built.", "Trued.", "Greased.", "Fixed."],
  lead: "Every bike on the floor gets a spanner, a stand and a straight answer.",
  cta: "Book a tune",
  cta2: "See the bikes",
  video: "/videos/spokesmith-v1-drivetrain-loop.mp4",
  meta: ["Open 8 to 8", "Walk-ins welcome", "Same-day tunes"],
};

export const browse = {
  eyebrow: "What we fix",
  title: "Pick your job",
  tiles: [
    { code: "J01", name: "Brakes", price: 650, from: "Pads, cables, bleed", video: "/videos/spokesmith-v4a-brake-disc.mp4" },
    { code: "J02", name: "Gears", price: 800, from: "Index, clean, lube", video: "/videos/spokesmith-v4b-gears.mp4" },
    { code: "J03", name: "Tyres", price: 450, from: "Patch, swap, tubeless", video: "/videos/spokesmith-v4c-tyre.mp4" },
    { code: "J04", name: "Wheels", price: 700, from: "True, tension, rebuild", img: `${I}/s6-wheel.jpg` },
    { code: "J05", name: "Drivetrain", price: 1400, from: "Chain, cassette, rings", img: `${I}/s7-crankset.jpg` },
    { code: "J06", name: "Fit", price: 900, from: "Saddle, bars, reach", img: `${I}/s8-handlebars.jpg` },
  ],
};

export type Bike = {
  id: string;
  name: string;
  kind: "Bikes" | "Parts";
  price: number;
  tag: string;
  img: string;
  alt: string;
  specs: string[];
};

export const shop = {
  eyebrow: "On the floor",
  title: "Bikes and parts",
  filters: ["All", "Bikes", "Parts"] as const,
  items: [
    { id: "S1", name: "Foundry Road", kind: "Bikes", price: 58900, tag: "Road", img: `${I}/s1-bike.jpg`, alt: "Yellow road bike", specs: ["Steel frame", "2×10 gears", "700c wheels"] },
    { id: "S2", name: "Haul Commuter", kind: "Bikes", price: 41500, tag: "City", img: `${I}/s2-commuter.jpg`, alt: "Graphite commuter bike with rack and mudguards", specs: ["Rack + guards", "8-speed hub", "Dynamo light"] },
    { id: "S3", name: "Dustline Gravel", kind: "Bikes", price: 67200, tag: "Gravel", img: `${I}/s3-gravel.jpg`, alt: "Green gravel bike", specs: ["Wide tyres", "1×11 gears", "Disc brakes"] },
    { id: "S4", name: "Ridge Trail", kind: "Bikes", price: 74800, tag: "Mountain", img: `${I}/s4-mountain.jpg`, alt: "Orange mountain bike", specs: ["120 mm fork", "1×12 gears", "Dropper post"] },
    { id: "S5", name: "Slab Saddle", kind: "Parts", price: 3200, tag: "Saddle", img: `${I}/s5-saddle.jpg`, alt: "Leather saddle", specs: ["Steel rails", "Padded", "Black"] },
    { id: "S6", name: "True-32 Wheel", kind: "Parts", price: 6400, tag: "Wheel", img: `${I}/s6-wheel.jpg`, alt: "Spoked wheel", specs: ["32 spokes", "Disc hub", "Hand-built"] },
    { id: "S7", name: "Crank 170", kind: "Parts", price: 5600, tag: "Drivetrain", img: `${I}/s7-crankset.jpg`, alt: "Crankset", specs: ["170 mm arms", "Alloy", "Double ring"] },
    { id: "S8", name: "Flat Bar 720", kind: "Parts", price: 1900, tag: "Cockpit", img: `${I}/s8-handlebars.jpg`, alt: "Handlebars", specs: ["720 mm", "Alloy", "Black"] },
  ] as Bike[],
  colours: [
    { name: "Graphite", hex: "#2B2D2F", img: `${I}/p1-frame-graphite.png` },
    { name: "Red", hex: "#C8321E", img: `${I}/p2-frame-red.png` },
    { name: "Green", hex: "#3F6B3A", img: `${I}/p3-frame-green.png` },
  ],
  sizes: ["S", "M", "L", "XL"],
};

export const compare = {
  eyebrow: "Workshop prices",
  title: "Pick a service",
  plans: [
    { name: "Basic", price: 1200, time: "Same day", pick: false },
    { name: "Full", price: 2800, time: "24 hours", pick: true },
    { name: "Overhaul", price: 6500, time: "3 days", pick: false },
  ],
  rows: [
    { label: "Safety check", v: [true, true, true] },
    { label: "Brake adjust", v: [true, true, true] },
    { label: "Gear index", v: [true, true, true] },
    { label: "Wheel true", v: [false, true, true] },
    { label: "Drivetrain clean", v: [false, true, true] },
    { label: "Bearings regrease", v: [false, false, true] },
    { label: "Cables and housing", v: [false, false, true] },
  ],
  note: "Sample prices. Parts extra.",
};

export const book = {
  eyebrow: "Book the bench",
  title: "Grab a slot",
  days: [
    { d: "MON", n: 12, slots: ["09:00", "11:00", "14:00"] },
    { d: "TUE", n: 13, slots: ["10:00", "13:00", "16:00"] },
    { d: "WED", n: 14, slots: ["09:00", "12:00", "15:00", "17:00"] },
    { d: "THU", n: 15, slots: ["11:00", "14:00"] },
    { d: "FRI", n: 16, slots: ["09:00", "10:00", "13:00", "16:00"] },
    { d: "SAT", n: 17, slots: ["10:00", "12:00", "14:00"] },
  ],
  services: ["Basic tune", "Full service", "Overhaul"],
};

export const story = {
  eyebrow: "The bench",
  title: "Made on one bench",
  video: "/frames/spokesmith-v3-bench-dolly",
  chapters: [
    { n: "01", h: "One bench", p: "Every bike comes through the same stand, under the same lamp, in the same hands." },
    { n: "02", h: "Every tool in reach", p: "Pegboard, truing stand, torque keys. Nothing borrowed, nothing guessed." },
    { n: "03", h: "Done when it rolls true", p: "We don't hand it back until the wheels spin straight and the gears click first time." },
  ],
};

export const signature = {
  eyebrow: "True the wheel",
  title: "Five turns to true",
  frames: "/frames/spokesmith-v2-truing",
  start: 2.4,
  steps: [
    { n: 1, mm: 1.8, note: "Mark the high spot" },
    { n: 2, mm: 1.1, note: "Tighten the low side" },
    { n: 3, mm: 0.6, note: "Ease the high side" },
    { n: 4, mm: 0.2, note: "Quarter turns only" },
    { n: 5, mm: 0.0, note: "Spins true" },
  ],
};

export const process = {
  eyebrow: "Frame to finished",
  title: "How a bike gets built",
  steps: [
    { n: "01", h: "Choose the frame", p: "Steel, alloy or carbon, sized to you." },
    { n: "02", h: "Pick the parts", p: "Wheels, drivetrain, brakes, cockpit." },
    { n: "03", h: "Build on the stand", p: "Every bolt torqued, every cable cut to length." },
    { n: "04", h: "True and tune", p: "Wheels trued, gears indexed, brakes bedded in." },
    { n: "05", h: "Test ride, hand over", p: "A loop round the block, then it's yours." },
  ],
  img: `${I}/s1-bike.png`,
};

export const footer = {
  marquee: ["TUNE", "REPAIR", "BUILD", "TRUE", "RIDE"],
  cols: [
    { h: "Visit", l: ["Unit 4, Foundry Lane", "Open 8 to 8, every day"] },
    { h: "Jobs", l: ["Brakes", "Gears", "Tyres", "Wheels"] },
    { h: "Shop", l: ["Bikes", "Parts", "Gift cards"] },
  ],
  note: "Concept website by Triozen",
};

export const rupee = (n: number) => "₹" + n.toLocaleString("en-IN");
