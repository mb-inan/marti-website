# MARTI — website

Supplier website for Martı Tekstil (Bergama, İzmir) under the MARTI name, aimed at UK and European womenswear brands and sourcing agents. Static HTML, CSS and JavaScript; no build step; hosted on GitHub Pages.

**Status: template (v0.1).** Every number, name and claim that is not yet approved is wrapped in a highlighted placeholder. Every photo is a placeholder that says what to shoot.

## Read first

| File | What it is |
|---|---|
| `HANDOVER.md` | Current state, open decisions, how to continue. Read this in any new session. |
| `CHANGELOG.md` | One entry per revision. The continuity file. |
| `docs/DECISIONS.md` | Decisions taken and why. |
| `docs/CONTENT_CHECKLIST.md` | Every text placeholder, who answers it, status. Generated. |
| `docs/PHOTO_BRIEF.md` | Every image slot: frame, how to shoot, reference, what to change. Generated. |
| `docs/GITHUB_GUIDE.md` | Creating the repository, publishing with GitHub Pages, connecting the domain. |
| `docs/DOMAIN.md` | Name and domain shortlist and tasks. |
| `docs/screenshots/<version>/` | Desktop and mobile screenshots of every page, per revision. |

## Structure

```
index.html            Home: film hero, spec sheet, products, ways of working, services, logistics, compliance, people, contact
capabilities.html     Products table, five services, capacity and terms
process.html          Seven steps of an order, what you supply and what we return
factory.html          Place, story, people, Manchester office
compliance.html       Audits, product and environment, policies and documents
contact.html          Enquiry form, what helps us quote, addresses, map slot
assets/css/style.css  All styles (palette and type at the top)
assets/js/main.js     Header and footer (defined once), mobile menu, review bar, REVIEW_MODE flag
assets/fonts/         Archivo variable, self-hosted (SIL OFL)
assets/img/ph/        Placeholder images, one per slot ID, generated
assets/img/ref/       Reference photos from 23 Oct 2026 (not for publication)
assets/video/         Reference clips, compressed (not for publication)
tools/slots.json      Single source of truth for image slots
tools/*.py            Generators: placeholders, photo brief, content checklist, screenshots
```

## Working on it

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

After changing content:

```
python3 tools/content_checklist.py          # refresh docs/CONTENT_CHECKLIST.md
python3 tools/build_placeholders.py         # if tools/slots.json changed
python3 tools/screenshot.py v0.2            # screenshots for the review (needs: pip install playwright && playwright install chromium)
```

Then add an entry to `CHANGELOG.md` and update `HANDOVER.md`.

## Launch checklist

1. All rows in `docs/CONTENT_CHECKLIST.md` closed; marks replaced with final text.
2. All slots in `docs/PHOTO_BRIEF.md` replaced with final photographs; `assets/img/ref/` and `assets/video/` reference files removed.
3. `REVIEW_MODE = false` in `assets/js/main.js`.
4. Form action set (see `HANDOVER.md`), email addresses live.
5. Domain connected (see `docs/GITHUB_GUIDE.md`), `CNAME` file present.
6. Privacy page and code of conduct linked in the footer.
