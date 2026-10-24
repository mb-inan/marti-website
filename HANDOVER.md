# HANDOVER — MARTI website

Live at https://mb-inan.github.io/marti-website/ (GitHub repository mb-inan/marti-website, published 23 Oct 2026 via GitHub Desktop from the `website` folder).

Last updated: 2026-10-24, v0.10 (fine clay thread, slow desktop sew-in with scroll catch-up, phone seam from zero, continuous needle rows) on the laptop awaiting Burkay's commit; v0.9 (favicon set, cache-busting, version routine) committed by Burkay; v0.8 (brand package: ticket mark in rail, bar and footer) is live; v0.7.1 (seam two fifths at the top, proportional to the scroll, slow sew-in on page open) on v0.7 (seam on phones as a horizontal stitch under the top bar; desktop live end sways gently at rest; phone live end is a taut lead). Approved by Burkay. Roll back by restoring `snapshots/v0.6-2026-10-23/` (or set `SEAM`, `SEAM_MOBILE` or `TRANSITIONS` to false in `assets/js/main.js`). Read this first in any new session, then `CHANGELOG.md`.

## 1. What this is

A static supplier website for the family factory in Bergama, İzmir (legal name Martı Tekstil Ltd. Şti.), presented under the MARTI name, for UK and European womenswear brands and sourcing agents. Commercial office: Manchester. Hosted on GitHub Pages from this repository. No build step, no framework: edit the HTML and CSS directly.

Owner of the project: Burkay (Manchester). Factory numbers and production claims are confirmed by the production director; management approves what is published about audits and customers.

## 2. Current state

- v0.1 template complete: six pages, placeholder system, documentation, generators.
- v0.2 applies Burkay's review of 23 Oct (facts, tone, two ways of working, delivery as required, UK and Europe; headcount not published; sampling 5–7 days). 37 placeholders remain, most for the production director.
- Published on GitHub Pages (public repository `mb-inan/marti-website`); address not yet shared beyond Burkay. No domain yet.
- All photographs are placeholders. Reference photos from 23 Oct 2026 are inside the placeholders, dimmed and labelled, and must not be published: they show a customer's hangers and swing tags.
- Font: Archivo, self-hosted in `assets/fonts/`. Brand: the ticket mark and rules in `assets/brand/` (`BRAND.md`); the name is MARTI Textile.
- Design: v0.4 = left-rail navigation, palette K2 Terracotta, de-boxed layout (`docs/DESIGN_DIRECTION_v2.md`, decisions #19–#22). Mockups that led to it are in `docs/mockups/v2/`.
- Motion: v0.5 added the stitched seam between rail and page and the page transition (rip, drag the old page off to the right, resew). v0.6 redrew the seam as thread (SVG, chain/cording stitch in matte cotton, needle holes; the unsewn part shows only holes) and put a linen texture under the whole page. v0.7 turned the seam horizontal under the top bar on phones (page drops away on a page change), gave the desktop live end a short gently swaying thread, and the phone live end a taut lead. Geometry constants are at the top of the `Seam` module in `assets/js/main.js` (`W, X1, X2, PITCH, STITCH`, `SEWN_AT_TOP`, `SEWN_AT_TOP_PHONE`, `INTRO_MS`, `ROPE_N/ROPE_SEG`); thread style `SEAM_STYLE` (`fine-clay`) with its CSS under `.seam.style-*` in `style.css`. The linen ground is `assets/img/linen.webp` from `tools/build_linen.py [strength]`.

## 3. Decisions in force

See `docs/DECISIONS.md` for the full log. In short: MARTI wordmark + descriptor; dark film hero, light pages; English only; audits named only once permission is confirmed; woven womenswear as the core with other categories "developed case by case"; delivery hanging or boxed as the customer requires; two ways of working (CMT, nominated fabric); audience United Kingdom and Europe; tone rule: calm and confident, no defensive phrasing.

## 4. How the placeholder system works

- Text: `<mark class="ph" data-ph="T-xxx">[value]</mark>`. The ID is listed in `docs/CONTENT_CHECKLIST.md` with who answers it. Replace the bracketed text with the final value; keep the tag until launch so the review bar still counts it, then set `REVIEW_MODE = false` in `assets/js/main.js` (the marks become invisible; the tags can stay or be removed).
- Images: `assets/img/ph/<ID>.jpg`, one per slot in `tools/slots.json`. When the real photo arrives, save it as `assets/img/<ID>-<short-name>.jpg` (web size, ~2000 px on the long side) and change the `src` in the HTML. `docs/PHOTO_BRIEF.md` is the shooting list.
- Hero film: `index.html` → `<video>` source. Final film: landscape MP4 (H.264), 1920×1080, 8–12 s loop, muted, under 4 MB; poster image `H2`.

## 5. Open items, in order

1. GitHub repository and Pages — then test the phone seam on a real phone. The seam-label experiment (`docs/mockups/v2/stitch-label.html`) still awaits a verdict; not needed for launch.
2. Then: production director's answers, shoot photographs, domain, logo files (teal oval, clay wordmark).
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

- **Every revision is one commit**, message = version and title from `CHANGELOG.md`, tagged `vX.Y` in GitHub Desktop. Rolling back to any version: `docs/GITHUB_GUIDE.md` §H. Bump the `?v=` query on `style.css` and `main.js` in all six `.html` files with each revision.

- Changes are proposed as screenshots before they are built; each revision gets a `CHANGELOG.md` entry, a screenshot set and an update to this file.
- The tex project in claude.ai holds the strategy documents; this repository holds only the website.
- Repository folder on Burkay's laptop: `C:\Users\Hax\Desktop\TEX\website`.
