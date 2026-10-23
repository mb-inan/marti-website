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
