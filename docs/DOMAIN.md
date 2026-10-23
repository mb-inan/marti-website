# Name and domain

## Name on the site (decided 2026-10-23)

Wordmark **MARTI**. Descriptor "Womenswear manufacturing. İzmir and Manchester." Legal name Martı Tekstil Ltd. Şti. in the footer. "MARTI is a trading name of [legal entity]" in the small print, entity to be confirmed (Turkish company, UK Ltd, or both).

## Domain shortlist — registry check, 23 Oct 2026

Checked against the .com registry (Verisign RDAP) and the .uk registry (Nominet RDAP). "Available" means not found in the registry on that date; confirm at the registrar before buying, prices change and someone else can register at any time.

| Domain | Status 23 Oct 2026 | Note |
|---|---|---|
| **martitextile.com** | available | Clearest to a UK buyer; says what we are. First choice. |
| martitex.com | available | Short; "tex" is trade shorthand, slightly informal. Good as a redirect. |
| marti-textile.com | available | Hyphen weakens it; buy only defensively if cheap. |
| marti-tex.com | available | As above. |
| martitekstil.com | available | Turkish spelling; useful redirect for Turkish partners and for the factory's own correspondence. |
| martiwomenswear.com | available | Describes the product, not the company; long. |
| martimanufacturing.com | available | Long. |
| martitextile.co.uk / .uk | available | Take .co.uk with the .com to anchor the Manchester office; redirect to .com. |
| martitex.co.uk / .uk | available | Optional. |
| marti.co.uk | registered since 1999, renews Dec 2026 | Not ours. |
| madebymarti.com | registered 2023 | Not ours. |

## Recommendation

Buy **martitextile.com** as the primary, **martitextile.co.uk** and **martitekstil.com** as redirects. Around £25–40 a year for the three at a plain registrar. Skip the hyphenated variants unless the budget is indifferent.

## Tasks

1. Burkay confirms the primary domain (or proposes another; we re-check availability the same way).
2. Buy at a registrar that has straightforward DNS and email forwarding: Cloudflare Registrar (at-cost pricing, good DNS), or Namecheap / Porkbun. Avoid registrars with heavy renewal mark-ups.
3. Set DNS for GitHub Pages (`GITHUB_GUIDE.md` section D).
4. Email forwarding: `hello@` → Burkay's inbox, `production@` → the production director's inbox (or Burkay until then).
5. Replace `[domain]` placeholders in the site (`T-mail-uk`, `T-mail-tr`, `T-mail-uk2`) and set the `mailto:` links.
6. Later: register the MARTI name as a UK trade mark if the business grows into it (class 25 and 40). Separate task; not needed for the website.

## How the availability check was done

Browser `fetch` to `https://rdap.verisign.com/com/v1/domain/<name>` (HTTP 404 = not registered) and `https://rdap.nominet.uk/uk/domain/<name>`. Any name can be re-checked the same way in under a minute.
