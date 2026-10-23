# MARTI Textile — brand package (Ticket, T1)

All vector files have the type converted to outlines (Archivo variable, instanced), so they need no fonts installed.
`svg/` are the masters; `pdf/` are the same files for print suppliers; `png/` are raster exports on transparent background unless the ground is part of the design.

## Files

| File | Use |
|---|---|
| `marti-ticket` | The mark. Default on light grounds. |
| `marti-ticket_on-teal-reversed` | On dusty-teal grounds: linen plate, teal type, linen frame (ground included). |
| `marti-ticket_on-ink` | On ink / dark grounds: teal plate, linen frame (ground included). |
| `marti-ticket_one-colour-teal` / `_one-colour-ink` | Embroidery, screen print, engraving. Letters are the ground showing through. |
| `marti-ticket_one-colour-linen` | One colour on dark cloth or dark print. |
| `marti-ticket_outline-ink` | Rubber stamp, deboss, laser. |
| `marti-ticket_small-cut` | Use at widths under 100 px / 25 mm (heavier weights, thicker frame). PNGs at 256/128/96/48. |
| `marti-wordmark_*` | The ticket's type without the plate: clay + ink, all ink, linen (and linen on teal with ground). |
| `marti-textile-inline_*` | "MARTI Textile" in a line, for running text, footers, document headers. |
| `marti-lockup_horizontal` | Ticket + divider + "Womenswear manufacturing." — website rail, email, documents. |
| `marti-lockup_stacked` | Ticket over spaced-caps descriptor — covers, hangtag, signage. |
| `marti-legal-line_*` | "MARTI · Martı Tekstil Ltd. Şti. · İzmir · Manchester" — the only place the Turkish legal name appears. |
| `marti-favicon` (+ `_dark`) | Plate and notches only. PNGs at 16/32/48/180/512 (180 = Apple touch, 512 = PWA/Android). |
| `marti-avatar_m-on-teal` | Circular avatars (LinkedIn, WhatsApp Business). PNGs at 1024 and 400. |

## Colours

| Name | Hex | Role |
|---|---|---|
| Dusty teal | `#3E5F63` | The plate; grounds for reversed pieces. Never text, except the reversed ticket. |
| Linen | `#F5EFE7` | Ground, paper, type on dark. The notch. |
| Terracotta | `#8E4A3A` | The frame and every rule. A stroke, never a fill, never text under 24 px. |
| Clay | `#C9573A` | The wordmark when it stands alone; links and buttons on the site. Never on teal or ink. |
| Ink | `#4A2E24` | Text, headings, one-colour print; the dark ground. |

Rule: teal and terracotta are never used as text on each other. On the website's terracotta band the ticket goes linen with terracotta type and no frame.

## The mark — construction (units: plate = 42 × 20)

- Plate 42 × 20 u, square corners. Notches radius 1.5 u, centred on each short edge.
- Frame: hairline 0.25 u, outside a 0.75 u linen gap (the SVG viewBox 352 × 176 = 1 u ≈ 8.4 px).
- MARTI: Archivo width 125, weight 500, tracking +0.12 em, cap height 5.2 u.
- TEXTILE: Archivo width 100, weight 500, letters justified to MARTI's width, cap height 1.9 u (36 %).
- Clear space: half the plate height on all sides, measured from the frame.
- Minimum sizes: 48 px / 12 mm with TEXTILE (use the small cut under 100 px); 24 px / 6 mm MARTI only; favicon = plate alone.

## Type

Archivo variable (Google Fonts / Omnibus-Type, OFL). Four cuts: Name — width 125 / 500 / +0.12 em. Headings — width 75 / 500. Body — width 100 / 400. Labels — width 100 / 500 / +0.24 em.
The name is always MARTI in plain Latin capitals (never Marti, MARTİ or Martı) except in the legal line.
