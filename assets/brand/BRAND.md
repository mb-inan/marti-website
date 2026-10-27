# MARTI Textiles — brand package (confirmed concepts only)

Everything here is a decided piece; explorations live on the design canvas, not here. All vectors have the type converted to outlines (Archivo variable, instanced): no fonts needed. `svg/` masters, `pdf/` for print, `png/` raster exports. Every logo file has a transparent background and open notches — no version carries its own ground; place the right colourway on the ground you have.

## The name
MARTI TEXTILES — always both words in the logo, labels, patch and legal line; MARTI never stands alone there (an unrelated fashion label trades as MARTÏ). In running text: "MARTI Textiles". The one deliberate exception is the social avatar (`avatar/`), where the gull carries the name and the platform shows "MARTI Textiles" beside it.

## logo/ — the main logo is the ticket
| File | Use |
|---|---|
| `marti-ticket` | **The main logo.** MARTI over TEXTILES in linen on the deep-teal notched plate, terracotta frame inside the plate. Transparent background; the notches are open. |
| `marti-ticket_reversed-linen-plate` | For teal, ink or photographic grounds: linen plate, teal type, terracotta frame. Transparent; notches open. |
| `marti-ticket_one-colour-teal` / `_ink` / `_linen` | Embroidery, screen print, engraving; letters and the frame line are the ground showing through. |
| `marti-ticket_outline-ink` / `_outline-teal` / `_outline-linen` | Line-only versions (plate outline + frame + type, one colour): ink for stamps and deboss, teal on light grounds, linen on teal or dark grounds. |
| `marti-ticket_small-cut` | Below 100 px / 25 mm wide: heavier weights, thicker frame. |
| `marti-wordmark_*` | MARTI over TEXTILES without the plate: clay + ink, all ink, linen, linen on teal. |
| `marti-textile-inline_*` | "MARTI Textiles" in a line: running text, footers, document headers. |
| `marti-lockup_horizontal` | Ticket + divider + "Womenswear manufacturing." — website rail, email, documents. |
| `marti-lockup_stacked` | Ticket over the spaced-caps descriptor — covers, hangtag, signage. |
| `marti-legal-line_*` | "MARTI Textiles · Martı Tekstil Ltd. Şti. · İzmir · Manchester". |

Construction (plate = 42 × 20 u): the plate bleeds to the edge, square corners; notches r 2.1 u on the short edges; the terracotta frame sits 1.3 u inside the plate (0.33 u wide) and follows the notches — the same construction as the apron patch, so logo and patch are identical. MARTI: Archivo width 125 / 500 / +0.12 em, cap 5.2 u. TEXTILES: width 100 / 500, cap 1.9 u, spaced so the T's ink starts under the M's and the S's ink ends under the I's — this alignment is in every file. Clear space half the plate height. Minimum 48 px / 12 mm (small cut under 100 px); below that use the gull.

## icon/, avatar/, favicon/
The gull (H3): banking, no tail, one closed shape, one colour. Deep teal on light grounds, linen on teal or ink, ink for one-colour print; never clay or terracotta, never two-tone, rotated or mirrored. Used by choice — favicon, avatars, woven labels, hangtag reverse, document sign-off — never inside the logo lockups. Clear space a quarter of its width; minimum 16 px / 4 mm print / 8 mm woven.
`avatar/`: the gull with MARTI beneath, inside the circle's safe zone — `_on-teal` (default for Instagram, LinkedIn, WhatsApp), `_on-linen`, and a square tile; PNG 2048/1024/512/256 and SVG.
`favicon/`: the gull alone — SVG light/dark, `favicon.ico` (16/32/48), PNGs 16–64, Apple touch 180, Android 192/512, maskable 512, `site.webmanifest`, `head-snippet.html`.

## woven-label-60x25/ and apron-patch/
The inside label (teal, MARTI TEXTILES, terracotta rule, gull) and the ticket as a laser-cut patch, 90 × 45 mm, notches r 4.5 mm, frame 2.8 mm in. See each SPEC.md.

## Colours (updated 27 Oct 2026)
| Name | Hex | Role |
|---|---|---|
| Deep teal | `#11383E` | The plate; grounds for reversed pieces; the gull on light grounds. Never text, except the reversed ticket. |
| Linen | `#F4F0E8` | Ground, paper, type on dark. The notch. |
| Terracotta | `#8E4A3A` | The frame and every rule. A stroke, never a fill, never text under 24 px. |
| Clay | `#C9573A` | The stacked wordmark on linen; links and buttons on the site. Never on teal or ink. |
| Ink | `#4A2E24` | Text, headings, one-colour print; the dark ground. |

Teal and terracotta are never text on each other. Woven matches: teal ≈ Pantone 5463 C, terracotta ≈ Pantone 7525 C, linen = natural ecru. The website still carries the previous teal (#3E5F63) and linen (#F5EFE7) tokens until you approve the change there.

## Type
Archivo variable (Google Fonts / Omnibus-Type, OFL). Name — width 125 / 500 / +0.12 em. Headings — width 75 / 500. Body — width 100 / 400. Labels — width 100 / 500 / +0.24 em.
