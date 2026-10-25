**Mode: Pro**

# Day 28 · Spokesmith Cycle Works · design direction (Round 0)

Fictional bicycle workshop: tunes, repairs, builds. Business site, desktop 1440×900 only. Sample prices in ₹, labelled "sample". Traveling object: —. Layout chosen and approved by the user: **A "Hi-Vis Floor"**, hero HR32, signature "True the Wheel". Round 0 is done; motion map, hover map, product detail plan, reel time table and asset list are approved as written. 6+ of 8 menu choices differ from each of the last 3 sites, see the sites log. Claude Code never writes Flow/Veo prompts.

## Choices

| Menu | Choice | Reason |
|---|---|---|
| Look | L7 street / brutalist, hi-vis workshop signage | Loud and graphic: hard edges, thick borders, hazard tape |
| Palette | Hi-vis graphite: yellow `#FFD500` (bg + accent), graphite `#2B2D2F` bands, ink `#0B0B0B` text, paper `#F4F1E6` | One accent (yellow); black on yellow and yellow on graphite both pass contrast |
| Type pair | T28 Lexend Mega (display, caps) + Public Sans (body) | Wide, heavy and sign-like; never used before |
| Nav | NV08 box-grid menu; hover U17 rolling letters | Opens a 6-box grid like a tool board |
| Hero | HR32 flip-word slot (Built. / Trued. / Greased. / Fixed.) over a drivetrain loop | New to the kit's history; not a portal |
| Section shape | S10 stepped edges + hazard-tape joins | Hard cuts between yellow and graphite |
| Card | C10 spec sheet, thick border, hard offset shadow | Reads like a workshop job sheet |
| Loader | Custom Spokesmith wheel-lace loader (replaces I35) | A bare rim draws, 32 spokes are laced in while 00 to 100 counts, the wheel spins up and hands over to the hero wheel |
| Signature | "True the Wheel" | Natural step count and a visible change |

## Section plan and Motion map

Order follows the standing rule. 9 sections plus loader and nav. No layout or motion code is used twice. References: ours / pending inbox.

| # | Section | Layout | Moments | Motion | Record mode |
|---|---|---|---|---|---|
| 0 | Loader | custom | 1, 14 | wheel-lace loader: rim draws, spokes lace in, counter 00-100, spin-up, hand-over to the hero wheel (same place and size) | plays once, ~2.5 s |
| 0 | Nav | NV08 | — | U17 rolling letters on hover | static bar |
| 1 | Hero | HR32 | 4, 2, 11 | flip-word slot: one headline slot flips Built. Trued. Greased. Fixed., ~1.4 s per word, yellow block behind the word; V1 loops behind; hero wheel idles at the right | plays by itself |
| 2 | Browse (what we fix) | PS22 | 3, 4, 5, 7, 8, 9, 12 | M429 tile rows slide opposite ways; tiles loop macro films | plays by itself |
| 3 | Shop (bikes and parts) | PS15 | 11, 12, 10 | M438 3D grid fly-in; filter chips re-sort | 2 hover stops |
| 4 | Compare (Basic / Full / Overhaul) | PR05 | 2, 3 | M306 centre-out cut reveal | plays by itself |
| 5 | Book (week strip, slot chips) | BK05 | 1, 14 | U37 auto-advancing tabs | strip advances; 1 click demo |
| 6 | Story (the bench) | SY09 | 15, 1, 10 | M419 sticky split image scale-swap | scrubbed by scroll |
| 7 | Signature · True the Wheel | VD03 | 5, 6 | new code M951 (added to MOTION-MENU in Round 2): V2 film is a steady straight spin; a code-drawn SVG layer on top does the truing (see below) | pinned, auto-steps |
| 8 | Process (frame to finished) | PD08 | 11, 13, 10, 14 | M457 path draws, milestones pop | plays by itself |
| 9 | Footer | FO08 | 15 | M397 velocity marquee on hazard tape | marquee runs |

**Round 3 section motion (built, all scroll or view-entry, `Fx.tsx`):** Browse tiles slide up in a stagger and the V4 loops play only while their tile is on screen · Shop cards roll in from the left one by one, swatches wheel-spin in, a swatch click swaps the colour with a yellow wipe · Compare columns slide in from opposite sides, ticks pop, the Full column flashes yellow once · Book fields step in, day cells rise, slot chips pop with a bounce, confirm button has a hazard-tape sweep on hover · Story chapter titles flip in (flip-word style), lines fade up · Process steps light up one by one with a chain-pattern progress line scrubbed by scroll · Footer wordmark rises, links stagger in, footer marquee speeds up with scroll.

**Marquee strip (between Browse and Shop):** graphite words BUILT / TRUED / GREASED / FIXED / RIDDEN on yellow, hazard tape top and bottom, runs on its own and speeds up with scroll speed (M397-style velocity marquee).

**Section edges:** S10 stepped edges at story→signature and signature→process; hazard tape stays on the hero bottom, the marquee strip and the footer.

**Transitions (X, built, each under 0.6 s, never blocks scroll):** hero→browse X34 kinetic "JOBS" type wipe · browse/marquee→shop tape-strip sweep · compare→book X56 skewed yellow panel · story→signature X33 wheel-rim scale jump · signature→process X60 split halves.

**Quick-look (shop):** clicking a bike card opens a modal with a dimmed backdrop (close with X, Esc or a backdrop click): photo, 3 specs, sample price and an "Add to build" button.

**Hero candidates:** 1 HR32 flip-word slot over a drivetrain loop (**chosen**) · 2 HR38 skewed yellow plate, a built bike rolls on · 3 HR33 job-board split-flap (code only).

**Signature, True the Wheel (moments 5, 6):** pinned. Five spoke-wrench turns: 2.4, 1.8, 1.1, 0.6, 0.2, 0.0 mm of wobble. The dial-gauge needle and run-out trace swing less each step, the spoke being turned lights up, and the wheel settles and spins true on 0.0. Works at any scroll speed and stays alive when stopped. **How the settle is built (chosen: film + code overlay).** V2 is a steady, straight wheel spin, so the wobble is not in the film. Five scroll steps (also auto-advancing, any scroll speed, alive when stopped) drive one value `wobble` = 2.4 → 1.8 → 1.1 → 0.6 → 0.2 → 0.0 mm. It feeds three code layers over the film: (1) an SVG dial gauge whose number and needle fall to 0.0; (2) a thin yellow ghost rim ring, sized to the wheel, that swings sideways by `wobble × sin(t)` with a decaying amplitude and a caliper tip marker on it, so it visibly sways against the straight film rim and locks onto it exactly (offset forced to 0) at step 5; (3) the spoke being turned lights up on each step. The film itself is never moved, so the stand and background stay still. Why not sway the film: it would slide the whole stand with it. Why not an all-SVG wheel: the real spin is the premium part. Code fallback: all-SVG wheel (32 spokes).

## Hover map

| Element | Hover effect | `data-hover-demo` |
|---|---|---|
| First shop card | photo swaps to a detail shot, price slides up | yes |
| Frame-colour swatch | pixel-aligned still swap | `click` |
| Add to cart | U65 fly-to-cart arc, count bump | `click` |
| Browse tile | U81 flip to the job's price | yes |
| Booking slot chip | sliding highlight | `click` |
| Primary button | U97 glint swipe | — |
| Nav item | U17 rolling letters | — |

Round 3 additions: shop cards lift with a hard shadow, compare rows slide a yellow fill in, process steps light and lift, nav links get a yellow underline slide (`sm-ulink`), buttons get the hazard-tape sweep (`sm-tape-sweep`). 7 `data-hover-demo` marks (rule: ≥ 3); `?record=1` plays them (browse, shop, compare, process confirmed).

5 originally planned `data-hover-demo` moments (rule: ≥ 3). Each U code is used once.

## Product detail plan (picks: ours / pending inbox)

- Frame-colour swatches swap pixel-aligned stills (shop quick-look).
- S / M / L / XL size chips with a sliding Flip highlight.
- Hover loupe on a component close-up.
- Sticky buy box inside the quick-look panel.
- Add-to-cart animation flying to the cart with a count bump.

## Reel time table (total 37.5 s)

Loader 2.0 · Hero 4.0 · Browse 3.0 · Shop 5.0 (2 hover stops) · Compare 3.0 · Book 3.5 · Story 3.0 · Signature 8.0 · Process 3.5 · Footer 2.5.

## Assets (video-first: 4 films, 1 master still)

| ID | What | Use | Size / type | Flow edit attaches | Source | Code fallback |
|---|---|---|---|---|---|---|
| V1 | Drivetrain macro loop (chain, cassette, no text) | Hero background | mp4 1920×1080, loop | — | Flow/Veo: real metal motion | Code-animated SVG chain and sprocket |
| V2 | Wheel in a truing stand, front-on, steady straight spin (take 2) | Signature (settle is code, see above) | mp4 1920×1080 → frames by video time | — | Flow/Veo: real spin | All-SVG wheel, 32 spokes |
| V3 | Slow dolly along the bench and pegboard, no people | Story | mp4 1920×1080 | — | Flow/Veo | Stills with a code push-in |
| V4 | 3 short macro loops: brake disc, gears, tyre | Browse tiles | mp4 1280×720 ×3 | — | Flow/Veo | Stills |
| S1 | Master bike, blank frame, no logos | Shop master, process | jpg 2400×1600 | — (the master) | Flow | Code-drawn SVG bike |
| S2–S8 | Other bikes and parts | Shop cards, quick-look | jpg 2400×1600 | S1 only | Flow edit | SVG placeholders |
| P1–P3 | Frame-colour cut-outs | Colour swatches | png (cut-out, user supplied) | — | User; colours built in code | Hue-shifted SVG |

Everything else is code: gauge, hazard tape, job tags, tables, week strip, step rail. **No Blender** (no turntable signature).

## Notes for the build

- Fonts: `@fontsource-variable/lexend-mega`, `@fontsource-variable/public-sans`.
- Desktop only, no media queries; `?static=1` shows every section in its final state.
- M951 and the VD03 signature variant are added to MOTION-MENU / SECTION-MENU in Round 2.
- Footer note: "Concept website by Triozen".

## Brand check and no-gos

- "Spokesmith": no exact business found in 3 text searches. Near-misses: Spokesman Professional Bicycle Works (Louisiana), Spokesman Cycles (New York), SpokeWorks, Hub and Spoke Cycleworks. Risk low to moderate; rename on request.
- No real bicycle or component brands and no logos, decals or text on frames, tyres or cranks.
- No faces, hands or people. No fake phone numbers or real addresses. Prices labelled "sample".
- Hero is not a "grows to full screen" opening. No FAQ, newsletter or reviews. No Blender. No Flow/Veo prompts.

## Prompts (as run)

Empty. When the user pastes back the prompts that were run: asset ID · date · prompt (word for word) · attachments.
