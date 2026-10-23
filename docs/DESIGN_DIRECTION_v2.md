# Design direction v2 — research and proposal

23 October 2026. Written after Burkay's brief: "a bit artsy but still professional". The content is settled (v0.3); this is about the look.

## 1. What was looked at

Sites were opened at 1440 px on 23 Oct 2026. For each, the actual design decisions were read out of the page (typeface, largest text size and weight, body size, background) rather than guessed.

| Site | What it is | Typeface, display size / weight, body | Ground | Opens on | What it teaches |
|---|---|---|---|---|---|
| Dinesen (DK) | Wooden floors, craft manufacturer selling to architects | Atlas Grotesk, 64 px / 300 (light), 16 px | White | Full-width film of the material, headline over it | Light-weight large type over material film; asymmetric image-left / short-text-right pairs; huge air between sections. The closest register to "artsy but professional". |
| Manteco (IT) | Wool mill, 1943, sells to brands | Gotham, 40 px / 400, 14 px | White | Inset film with margins; logo centred; vertical type rails at page edges ("Designed and Made in Tuscany, Italy") | The inset frame: film as a picture, not wallpaper. The vertical rail is a cheap, memorable flourish. |
| Kvadrat (DK) | Design textiles, B2B | Neuzeit S, 27 px / 500, 16 px | White | Product photography grid | Small headlines, product does the talking; nav as plain lowercase words. |
| Maharam (US) | Textiles, B2B | Maharam Neue, 24 px / 400, 14 px | Warm grey (237,237,232) | Catalogue grid | Type stays small and even; a warm off-white instead of white; the page reads like a well-made catalogue. |
| Margaret Howell (UK) | Classic British clothing | Gill Sans, small tracked caps nav; Austin serif at 32 px for the rare headline; 15–16 px body | White | Left vertical sidebar nav, one inset photograph, white everywhere | Left rail navigation; one picture at a time; restraint as the brand. |
| The Row (US) | Quiet luxury | Basic Commercial, 20 px max, 13 px body | White | Image | Type nearly disappears; everything is image and air. Too quiet for a buyer who needs facts. |
| Vitale Barberis Canonico (IT) | Wool mill, 1663 | Open Sans caps + Halant serif, 40 px, 14 px; carousel; crests | Dark brown header | Carousel of fabric close-ups | Negative example: heritage overdone (crest, gold, carousel, caps) reads dated. |

Earlier in the project: Bilsar (grid-of-shirts hero, minimal), Calvelex (template), Polopiqué (video hero, corporate), Sunspel factories page (people and place), Albini (collage hero).

## 2. What the good ones share

1. **Type is light and large, or small and even. Not bold and condensed.** Dinesen at 64 px / weight 300 is the register; our current condensed-bold headlines read "industrial catalogue" rather than "atelier".
2. **Film and photography are framed, not used as wallpaper.** Manteco insets the film with margins; Margaret Howell hangs one picture; Dinesen alternates full-bleed with inset.
3. **Asymmetry.** Image on a 7/12 column, three lines of text on a 4/12 column, offset vertically. No equal cards in a row.
4. **Air.** Section spacing of 160–200 px on desktop. Fewer things per screen.
5. **One colour, used rarely.** White or warm off-white ground; ink; one accent for links and the wordmark. No coloured bands between every section.
6. **No cards, no icons, no counters-on-a-map.** Rules (thin lines) carry structure; a table is a table.
7. **One flourish only.** Manteco's vertical rail; Margaret Howell's sidebar nav; Dinesen's light type over film.
8. **Motion: one orchestrated moment** on load (film fades in, headline settles), then nothing moves unless the viewer does something.

## 3. Three directions

**A. Quiet catalogue** (Maharam, The Row, Margaret Howell). Small even type (14–15 px), left rail navigation, inset photographs, warm off-white ground. Most "classic". Risk: a sourcing agent scanning for capacity and minimums has to hunt.

**B. Material editorial** (Dinesen, Manteco). Inset film in a frame, light-weight 64–80 px headline on white beneath or beside it, asymmetric image/text pairs, long scroll, generous air, one vertical type rail, spec sheet as a ruled index instead of a navy band. "Artsy but professional" in the exact sense: the pictures are art-directed, the words are plain, the facts are easy to find.

**C. Spec-sheet modern** (current template, sharpened). Keep the condensed-bold Archivo, add a ruled grid and index lists. Most legible for a buyer; least distinctive.

## 4. Recommendation: B, with C's facts layer

Keep what already works (palette from the building, one typeface, the content order, the placeholder system) and change the register:

- **Type.** Archivo stays (self-hosted, variable). Display switches from narrow/700 to normal width/300 at 64–80 px with tight leading; the expanded wordmark stays as the one bold element. Body 16–17 px, measure 60–65 characters. Nav 13 px, sentence case.
- **Hero.** Film inset in a frame (about 5 vw margins, under the header), 16:9, no text on the film. Headline "The shirt, the blouse, the dress." set large and light on the white beneath the frame, with the line beside it on a narrower column. The film is a picture; the words are words.
- **Spec sheet.** A ruled index on white: label left in small type, value right in light large type, one thin rule between rows. Navy disappears from the band; it stays for the wordmark, links and the footer.
- **Sections.** No cards. The two ways of working become two columns divided by a single vertical rule. Products as a 4-column grid with captions in small type. Services as alternating 7/5 image-text pairs with vertical offset. Spacing 160–200 px on desktop.
- **One flourish.** A vertical type rail on the right edge of the page: "Bergama, İzmir · Manchester" running bottom to top in 12 px. (The middle dot here is a typographic separator in a rail, not a label pattern.)
- **Motion.** On load: the film frame fades in over 1.2 s and the headline rises 8 px as it appears. Nothing else animates. Links underline on hover. Reduced-motion respected.
- **Photography treatment.** Full colour, one warm grade across the set; no duotone, no filters. The placeholders keep the same frames.
- **Footer.** Navy, as now. The only colour block on the page, so it reads as a close.

## 5. What this costs and does not cost

- No new pages, no new content: the v0.3 copy and section order stay. This is a stylesheet and markup pass.
- The photo brief does not change: same 41 frames.
- Build: one revision (v0.4), screenshots before it goes to the folder, as agreed.

## 6. Not doing

Horizontal scroll galleries, cursor effects, grain overlays, marquee text rows, oversized numerals, parallax. Current on award sites; wrong for a factory speaking to buyers, and they date fast.

## 7. Outcome (23 Oct 2026, evening)

Mockups built for A, B and C, then C with A's left rail in two warm palettes (D1 Kiremit, D2 Sand and rose), then a de-boxed D1 and a palette sheet (K1–K4). Burkay chose: **C's structure + A's left rail + K2 Terracotta + de-boxed**. Built as v0.4. The recommendation in section 4 (B) was not taken; the facts layer and the restraint carried over.
