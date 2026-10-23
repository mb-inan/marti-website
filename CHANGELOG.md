# Changelog — continuity file

One entry per revision. Newest first. Each entry: what changed, why, what was decided, what is still open. Screenshots for each revision are in `docs/screenshots/<version>/`.

Format for a new entry:

```
## vX.Y — YYYY-MM-DD — short title
Changed: …
Decided: …
Open: …
Screenshots: docs/screenshots/vX.Y/
```

---

## v0.9 — 2026-10-24 — favicon set, cache-busting, version routine

Changed:
- **Favicon set** supplied by Burkay (`assets/brand/favicon/`): `favicon.ico` (also copied to the site root), SVG icon with a dark-scheme variant, Apple touch icon 180, Android 192/512, maskable 512, `site.webmanifest` (name MARTI Textile, theme colour dusty teal). The manifest's icon paths were made relative because the site lives under `/marti-website/`, not at a domain root. The v0.8 favicon files (`marti-favicon.svg`, `_32w/_180w/_512w.png`) are removed.
- **Theme colour** is now dusty teal `#3E5F63` (per the favicon set), was linen.
- **Cache-busting.** `style.css` and `main.js` are linked with `?v=0.9`. GitHub Pages tells browsers to keep files for ten minutes, and browsers often keep them longer; this is why the v0.8 mark did not appear on Burkay's screen although the live site had it (verified in a fresh browser: rail, footer and favicon all present). From now on the version query is bumped in all six `.html` files with every revision, so a reload always shows the new CSS and script.
- **Version routine** written into `docs/GITHUB_GUIDE.md` §H: one commit per CHANGELOG entry, message = version + title, a Git tag `vX.Y` on each release from GitHub Desktop, and how to view, download or roll back to any version from GitHub or Desktop. The `snapshots/` folders remain for the pre-GitHub versions (v0.3–v0.6); GitHub history and tags take over from v0.7.

Decided: traceability by version is a standing requirement; every change is one commit, named by its version.

Open: Burkay to commit and push v0.9 (and tag v0.7.1, v0.8 and v0.9 retroactively in Desktop's History, right-click → Create tag).

## v0.8 — 2026-10-24 — the brand package on the site

Changed:
- **Mark.** The ticket from the brand package (`assets/brand/`, masters and rules in `assets/brand/BRAND.md`) replaces the typed wordmark: in the desktop rail at 152 px (full cut), in the phone top bar at 96 px (small cut, heavier frame), in the footer at 168 px on the dark ground (`marti-ticket_on-dark.svg`, derived from `_on-ink` by removing its ground rectangle so it sits on the footer's deep brown). Descriptor "Womenswear manufacturing." stays under the mark on desktop and in the footer; hidden in the phone bar.
- **Favicon and icons.** `marti-favicon.svg` with a 32 px PNG fallback, Apple touch icon 180 px; `theme-color` linen; `og:image` = horizontal lockup, `og:site_name` MARTI Textile.
- **Name.** Page titles end "— MARTI Textile"; the legal line reads "MARTI Textile is a trading name of […]". Everything else (rail copy, footer columns) unchanged.
- Only a subset of the package is in the repository (SVG masters needed by the site, favicon PNGs, lockup PNG for link previews); the full package with PDFs is Burkay's `marti-brand-package.zip`.

Decided: Burkay supplied the brand package (ticket mark, dusty teal plate, terracotta frame) and asked for it to be used where appropriate. Pushed by Burkay on 24 Oct (commit 0f9d1ed).

Open: a check of the mark on the live site at normal distance; whether the hero corner note should carry the small ticket.

## v0.7.1 — 2026-10-23 — seam proportion and a slow sew-in

Changed (after the first look at the live site, mb-inan.github.io/marti-website):
- Sewn length now follows the scroll in proportion: two fifths of the seam at the top of the page, growing linearly to fully sewn at the bottom (was: two thirds, barely moving, then closing with a jump at the very bottom).
- Page open and page change: the thread is sewn in slowly to the two-fifths point over about 1.9 s with an ease-out, instead of snapping there; from then on the proportional rule applies. Constants `SEWN_AT_TOP` and `INTRO_MS` at the top of the `Seam` module.
- Same behaviour on desktop (vertical) and phone (horizontal).

Open: a real-phone check of the proportional sewing with momentum scrolling.

## v0.7 — 2026-10-23 — the seam on phones, and the live end settled

Changed:
- **Phones: horizontal seam.** Below 1000 px the rail is a top bar, so the seam turns horizontal and sits on the bar's bottom edge: the bar is the waistband, the page hangs from it. Same chain stitch, same thread; sewn from the left with the scroll (two thirds at the top, closed at the very bottom), unpicked on the way back up; needle holes alone on the unsewn part. Plain thread on phones (no cotton filter). The seam follows the bar when the menu opens. Hero and page titles sit 22 px lower on phones so the seam lies on linen. Flag `SEAM_MOBILE` in `assets/js/main.js` turns it off on phones alone.
- **Phones: page change.** The thread rips along the bar and the old page drops away downwards like a garment off a hanger (0.5 s), the new page already underneath, seam resewn from the left. The menu closes itself after a page change (it stayed open before — a bug).
- **Live end, desktop.** The hanging thread is shorter (about 15 px), sways very gently when the page is still (a slow breath of air, roughly 2 px over four seconds), is pulled along as you sew and taken back as you unpick. Links can never stretch; hidden when the seam is fully closed.
- **Live end, phone.** No hanging thread. While the seam moves, a short taut lead runs from the last stitch toward the unseen needle — forward when sewing, back when unpicking; at rest the thread simply ends at the last stitch.
- Geometry is generated once for either axis (`P(u, v)` in the `Seam` module), so desktop and phone share one code path.
- `tools/record_demo.py --phone` records at phone size.
- Videos: `docs/videos/v0.7-desktop-seam.mp4`, `docs/videos/v0.7-mobile-seam.mp4`. The v0.6 intermediate clip is removed; `v0.6c-final-seam.mp4` stays as the v0.6 record.
- Milestone before this work: `snapshots/v0.6-2026-10-23/`.

Decided: Burkay approved the phone version with the taut lead and asked for the swaying thread on desktop only.

Open: a test on a real phone once the site is on GitHub Pages (momentum scrolling, thumb feel). Then: GitHub repository, domain, production director's answers, shoot, logo files.

Screenshots: stills as v0.4; motion in `docs/videos/`.

## v0.6 — 2026-10-23 — the seam drawn as thread

Changed:
- **Seam re-rendered as thread.** The v0.5 seam was a flat dashed line and read as "broken lines". It is now an SVG built by `main.js`: two needle rows of straight stitches and a looper thread crossing diagonally between them and wrapping each row — the underside of a chain/cording stitch, after Burkay's reference picture. Each thread is three strokes on one path (shadow on the cloth, body in the clay accent, a lit edge), with needle holes as small dents under the rows and a faint pucker of the cloth toward the seam. Seam width 26 px (was 12), centred on the rail edge.
- **Sewn along the thread, not by a clip.** The looper is one continuous path revealed along its own length (`stroke-dashoffset`), so scrolling down sews it stitch by stitch and scrolling up pulls it out stitch by stitch. The needle rows trail the looper by a few pixels.
- **Loose tail.** At the live end a short length of thread hangs free and swings: a nine-link verlet rope driven by the end point's movement, with gravity and a light drape toward the rail. It is pulled along when the seam is sewn or unpicked and settles when the page is still. Hidden when the seam is fully sewn, and under reduced motion.
- Hero and filled plates now inset 24 px from the rail so the seam sits on linen rather than over the photograph.
- **Linen ground.** The page and rail background is now a woven linen texture (`assets/img/linen.webp`, a seamless 360 px tile generated by `tools/build_linen.py`: plain weave, slubbed threads, fixed to the viewport so rail and page read as one cloth). Strength 0.7; regenerate with another value to make it quieter or louder. Filled plates, hero and footer stay solid.
- **Thread texture: matte cotton (T3, chosen from `docs/mockups/v2/thread-textures.html`).** Edges roughened with a little SVG turbulence, low sheen; reads as cotton rather than vector.
- **Unsewn part is bare.** Fixed: the straight needle stitches were always fully drawn (the browser restarts a dash pattern on every short segment). Each straight stitch is now its own element and appears only when the looper wraps its row, and vanishes again when the thread is pulled back. Below the live end there is only linen, the needle holes and the loose tail.
- Rip, drag and resew unchanged from v0.5. `tools/record_demo.py` now also scrolls back up to show the thread being pulled out.
- **Fixes after Burkay's check.** (1) The straight needle stitches were invisible in the sewn part: a vertical line has a zero-width bounding box, which collapsed the SVG filter region; filters now use a user-space region. Rows are now one dashed line per row (dash = stitch, gap = hole) revealed stitch by stitch through a clip rectangle — 8 paths instead of ~500. (2) The loose tail stretched under fast scrolling and tired the eye: the needle's pull on it is capped, damping raised, five constraint passes plus a final anchor-out pass so a link can never exceed its length (measured: 20.4–20.8 px under hard scrolling, previously elastic); tail shortened to about 24 px.
- **Smoothness and safety pass.** Linen moved from a fixed `background-attachment` on `body` (repainted on every scroll step) to a fixed, composited `body::before` layer; the rail is transparent over it on desktop and keeps its own linen as a top bar on phones. The page ghost used in the transition replaces cloned `<video>` elements with their poster so the old page does not start a second video download. Resize rebuilds the seam once, debounced. Checked: no console errors; transition, back button and seam rebuild on all pages; reduced-motion path; phone layout.
- Videos: `docs/videos/v0.6-thread-seam.mp4` (first thread rendering), `docs/videos/v0.6c-final-seam.mp4` (final: cotton thread, bare unsewn part, calm tail, linen ground). Proposal sheet that preceded it: `docs/mockups/v2/stitch-realism.html` (A topstitch / B corded / C saddle), screenshot in `docs/screenshots/mockups-v2/`.
- Milestone before this work: `snapshots/v0.5-2026-10-23/` (reference photos and clips not copied into the snapshot).

Decided: Burkay asked for the corded look of his reference picture with real thread behaviour; built directly rather than as a further mockup.

Decided also: linen ground at strength 0.7; thread texture T3 matte cotton; soft dent holes.

Open: fine-tuning of thread thickness, stitch pitch and the tail if wanted; the label experiment (`stitch-label.html`) still awaits a verdict; the ~0.5 s rip→drag pause remains.

Screenshots: stills unchanged; motion in `docs/videos/v0.6-thread-seam.mp4`.

## v0.5 — 2026-10-23 — the stitched seam and the garment page transition

Changed:
- **Seam.** A machine-stitch line (lockstitch dashes in the clay thread, 7 px stitch, perforation dots beneath) where the rail meets the page. Sewn in from the top on load (about 1.1 s). The sewn length follows the scroll: two thirds at the top, three quarters as you scroll, fully sewn only at the very bottom of the page. The open part shows the perforations and a faint lifted-edge shadow. Hidden on phones (the rail is a top bar there). Fully sewn and static for visitors who prefer reduced motion.
- **Page transition.** Clicking an internal page link rips the seam (340 ms, with a shake), lifts the current page as a "ghost" pinned at its scroll position, swaps the new page in underneath, drags the ghost off to the right like a cloth (720 ms, slight rotation and skew, soft shadow), then sews the seam back in. The address bar and the back button work as normal (history API). Any problem, or reduced motion, falls back to an ordinary page load. Feature flags `SEAM` and `TRANSITIONS` at the top of `assets/js/main.js`.
- **Experiment (separate copy, not in the site):** `docs/mockups/v2/stitch-label.html` — a small woven label sewn into the open part of the seam, naming the next page ("Next · Capabilities →"); it rides with the seam, disappears when the seam is fully sewn, and clicking it runs the transition. This is the proposed replacement for "other pages visible under the seam".
- Videos: `docs/videos/v0.5-seam-and-transition.mp4`, `docs/videos/experiment-seam-label.mp4` (recorded by `tools/record_demo.py`).

Decided: Burkay asked for the seam and the transition (1 and 2) in the site and the label (3) as a separate copy for judgement. Milestone before this work: `snapshots/v0.4-2026-10-23/`.

Open: Burkay's verdict on the transition and on the label. Known rough edge: a short pause (~0.5 s) between the rip finishing and the drag starting on heavier pages; can be tightened by starting the drag as the rip ends rather than after the swap.

Screenshots: the v0.4 set still applies for stills; motion is in `docs/videos/`.

## v0.4 — 2026-10-23 — design direction v2: left rail, Terracotta palette, de-boxed

Changed:
- Navigation moved from a top bar to a fixed left rail (wordmark, "Womenswear manufacturing.", menu in small tracked capitals, "Start a conversation", and at the foot "Commercial office in Manchester / Production in İzmir, Türkiye"). On phones the rail becomes a top bar with a Menu button.
- Palette K2 "Terracotta": linen ground #F5EFE7, red-brown ink #4A2E24, the factory floor's terracotta #8E4A3A for filled sections, clay orange-red accent #C9573A for the wordmark, links, buttons and step numerals; footer in deep brown #3B2520. All blue removed. CSS variables renamed to semantic names (--ink, --band, --accent, --line …).
- De-boxed: hero inset with a margin and 6 px corners; facts as a ruled index on the ground instead of a filled band; rules removed from section titles and captions; ways-of-working as two columns with one divider; filled sections ("Audited", page-closing calls to action) inset as plates with soft corners; pill buttons.
- Bug fixed: consecutive sections lost their top padding, so headings in filled sections hugged the edge ("Audited, year after year"). Filled sections and the section after one now keep their padding.
- Placeholder images re-rendered in warm tones (generator palette updated).
- Reference frozen before the change: `snapshots/v0.3-2026-10-23/` (see `snapshots/README.md`).

Decided: see `docs/DECISIONS.md` #19–#22 (incl. Dusty teal #3E5F63 as the third colour for the logo oval).

Open: as v0.3; plus the logo files (oval mark in teal with linen letters; wordmark in clay) for email signatures and the company profile. Frozen as `snapshots/v0.4-2026-10-23/` before the stitch work (v0.5).

Screenshots: `docs/screenshots/v0.4/`

## v0.3 — 2026-10-23 — hero rewritten and halved

Changed:
- Hero headline "The shirt, the blouse, the dress." with the line "Thirty years of woven womenswear for brands across the United Kingdom and Europe." (chosen from six headline and six subline options).
- Hero height reduced from full screen to about 58% of the viewport so the spec sheet is above the fold on a laptop.
- Hero buttons removed; one text link ("See what we make") remains. Corner note trimmed to "Production in Bergama, İzmir / Commercial office in Manchester".
- Home page meta description updated; spec sheet "People" cell replaced by "Minimum" (decision #17).

Decided: hero says one thing; the facts follow in the spec sheet. Location stays on the first screen via the corner note, not the headline.

Open: as v0.2. Next: design direction v2 (research pass on reference sites, then a redesign proposal with screenshots before build).

Screenshots: `docs/screenshots/v0.3/`

## v0.2 — 2026-10-23 — Burkay's review of v0.1 applied

Changed:
- Facts filled: thirty years; ~30,000 pieces a month depending on model; Sedex member since 2023; minimum 1,000 pieces per style, 500 per colour; sampling 5–7 working days from fabric in hand (Burkay gave 3–4; set to 5–7 so the normal case, not the best case, is promised); headcount deliberately not published; costing and sampling plan within three working days; road transit to the United Kingdom and Europe 7–10 days. Production lead time written at the industry norm (6–8 weeks) and first-style brief-to-delivery (14–18 weeks), both marked for the production director to confirm.
- "Development and full package" removed as a third way of working: two routes remain (CMT, nominated fabric). Development language softened throughout: patterns and grading "prepared from your tech pack", markers and samples in-house; no CAD or plotter claims.
- "Delivered on the hanger" replaced by "Delivery, as you need it": hanging or boxed, as the customer's warehouse receives it.
- Audience widened from the UK to the United Kingdom and Europe throughout (hero, logistics, capacity table, story, footer).
- Tone: every defensive or self-justifying phrase removed ("not through an intermediary", "Family-owned. Not part of a group.", "the people you will meet", "because they matter", "people who also spend time on the factory floor"). Calm, confident register throughout.
- Compliance simplified: Sedex since 2023; audited regularly by two major European fashion groups including on ethical and social standards; certificates and detailed information on request. Buttons now "Request certificates and details" / "Request information". Product/environment tiles replaced by one sentence; final-inspection bullets removed pending a realistic description.
- Capabilities: "Not our core" row replaced by "Other: developed case by case"; services intro rewritten around the value (tech pack to trailer); fusing press stated; sewing line "specialised in shirts, blouses and dresses, equipped for the wider womenswear range"; duty wording made formal (UK origin declaration; EU under the customs union with A.TR); "confirmed at quotation".
- Process: From-you / From-us redesigned as a two-column table under each step; "in-line checks at key points"; dispatch "UK and Europe within 7–10 days".
- Factory: hero lede simplified; distances filled (about 100 km to İzmir, 50 km to Aliağa container terminals, 120 km to İzmir airport; road estimates); story compacted, no "second generation"; team section rewritten as a compact, experienced team; "Biz bir aileyiz" wall slot (E6) replaced by a wide production-hall frame; Manchester section rewritten around working in step with the floor.
- Footer line rewritten. Placeholders down from 74 to 37.

Decided: see `docs/DECISIONS.md` #12–#18.

Open:
- Whether the auditing groups may be named (Inditex, H&M). Until then "[two major European fashion groups]".
- Production lead time and first-style timeline: confirm with the production director.
- Final inspection: a realistic description (sampling plan / AQL) for a later revision.
- Cutting table length, machine count, special machines list, floor area: production director.
- Team names and years; UK entity name and addresses; domain and emails.

Screenshots: `docs/screenshots/v0.2/`

## v0.1 — 2026-10-23 — first template

Changed:
- Six pages built from scratch: Home, Capabilities, Process, Factory, Compliance, Contact.
- Shared header and footer defined once in `assets/js/main.js`.
- Placeholder system: `<mark class="ph" data-ph="ID">` for text; `assets/img/ph/<ID>.jpg` for images; review bar counts them per page; "Hide marks" preview.
- 41 image slots defined in `tools/slots.json`; 12 reference photos and 4 reference clips from the factory visit of 23 Oct 2026 attached to the slots they illustrate, dimmed and labelled "not for publication".
- Typeface Archivo self-hosted (no Google Fonts request).
- Generators: placeholders + photo brief, content checklist, screenshots.

Decided (see `docs/DECISIONS.md`):
- Name on site: MARTI wordmark with descriptor; legal name in footer.
- Look: dark film hero, light pages; palette from the building.
- Language: English only.
- Disclosure: audits and numbers as highlighted placeholders until approved.
- Positioning line: "Womenswear, made end to end in İzmir." Woven core, open to other womenswear categories.
- Hanging-garment delivery by trailer named as a service.

Open:
- Review of v0.1 by Burkay: wording of the hero line, section order, anything to cut.
- 74 text placeholders (see `docs/CONTENT_CHECKLIST.md`); most need the production director.
- Form backend (Formspree or alternative) and email addresses.
- Domain choice (see `docs/DOMAIN.md`) and GitHub repository creation (see `docs/GITHUB_GUIDE.md`).
- Whether the auditing brands may be named publicly.
- Privacy page and code of conduct texts.

Screenshots: `docs/screenshots/v0.1/`
