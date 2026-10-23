# HANDOVER — MARTI website

Last updated: 2026-10-23, after v0.3 (approved; written to the repository folder). Read this first in any new session, then `CHANGELOG.md`.

## 1. What this is

A static supplier website for the family factory in Bergama, İzmir (legal name Martı Tekstil Ltd. Şti.), presented under the MARTI name, for UK and European womenswear brands and sourcing agents. Commercial office: Manchester. Hosted on GitHub Pages from this repository. No build step, no framework: edit the HTML and CSS directly.

Owner of the project: Burkay (Manchester). Factory numbers and production claims are confirmed by the production director; management approves what is published about audits and customers.

## 2. Current state

- v0.1 template complete: six pages, placeholder system, documentation, generators.
- v0.2 applies Burkay's review of 23 Oct (facts, tone, two ways of working, delivery as required, UK and Europe; headcount not published; sampling 5–7 days). 37 placeholders remain, most for the production director.
- Nothing is published yet. No repository on GitHub yet. No domain yet.
- All photographs are placeholders. Reference photos from 23 Oct 2026 are inside the placeholders, dimmed and labelled, and must not be published: they show a customer's hangers and swing tags.
- Font: Archivo, self-hosted in `assets/fonts/`.

## 3. Decisions in force

See `docs/DECISIONS.md` for the full log. In short: MARTI wordmark + descriptor; dark film hero, light pages; English only; audits named only once permission is confirmed; woven womenswear as the core with other categories "developed case by case"; delivery hanging or boxed as the customer requires; two ways of working (CMT, nominated fabric); audience United Kingdom and Europe; tone rule: calm and confident, no defensive phrasing.

## 4. How the placeholder system works

- Text: `<mark class="ph" data-ph="T-xxx">[value]</mark>`. The ID is listed in `docs/CONTENT_CHECKLIST.md` with who answers it. Replace the bracketed text with the final value; keep the tag until launch so the review bar still counts it, then set `REVIEW_MODE = false` in `assets/js/main.js` (the marks become invisible; the tags can stay or be removed).
- Images: `assets/img/ph/<ID>.jpg`, one per slot in `tools/slots.json`. When the real photo arrives, save it as `assets/img/<ID>-<short-name>.jpg` (web size, ~2000 px on the long side) and change the `src` in the HTML. `docs/PHOTO_BRIEF.md` is the shooting list.
- Hero film: `index.html` → `<video>` source. Final film: landscape MP4 (H.264), 1920×1080, 8–12 s loop, muted, under 4 MB; poster image `H2`.

## 5. Open items, in order

1. v0.3 is the baseline. Content is largely settled; next is the design direction v2 (see `docs/DESIGN_DIRECTION_v2.md` once written), then the production director's answers and the shoot photographs.
2. Create the GitHub repository and publish to GitHub Pages (`docs/GITHUB_GUIDE.md`). Publishing early is safe: the site is clearly a template and the address is not public until shared.
3. Domain shortlist → check availability → buy → connect (`docs/DOMAIN.md`).
4. Production director's answers to the information form → fill `docs/CONTENT_CHECKLIST.md` → replace marks.
5. Management: may the auditing brands be named? Sedex / SMETA status.
6. Shoot (end of October, Ezgi): `docs/PHOTO_BRIEF.md` is the slot list; `Web_Kareler_v2` in the tex project has the art direction.
7. Form backend: create a Formspree form (free tier is enough) and paste its endpoint into `contact.html` (`action="https://formspree.io/f/…"`); or Netlify Forms if hosting moves to Netlify. Until then the form posts nowhere.
8. Email addresses on the chosen domain (hello@, production@) — set up with the domain registrar or Google Workspace.
9. Privacy page and code of conduct (footer links are `#` for now).
10. One-page company profile PDF (linked from Compliance).

## 6. Things not to do

- Do not publish any reference photo or clip from `assets/img/ref/` or `assets/video/`.
- Do not name the auditing brands or current customers until management confirms it is allowed.
- Do not invent factory numbers. If a value is unknown, it stays a placeholder.
- Do not add sections that are not true today (sustainability programmes, certifications in progress) — the Compliance page says "status" for a reason.

## 7. Working with Claude on this

- Changes are proposed as screenshots before they are built; each revision gets a `CHANGELOG.md` entry, a screenshot set and an update to this file.
- The tex project in claude.ai holds the strategy documents; this repository holds only the website.
- Repository folder on Burkay's laptop: `C:\Users\Hax\Desktop\TEX\website`.
