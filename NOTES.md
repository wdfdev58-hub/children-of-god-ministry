# Children Of God Ministry — brand & build notes

## Phase 2 — Lovable rebuild refine (2026-07-20)

Original site: https://childrenofgodministry.lovable.app (built by Katlego). This is a WDF
rebuild — content and brand carried across, hosted on our own domain instead of Lovable.

### Palette — lifted directly from their Lovable site's CSS (oklch → converted to hex)
- `parchment` #faf5ec — page background (cream)
- `linen` #efe7d9 — alternating section background
- `card` #fefcf6 — card background
- `hairline` #dacfbf — borders/dividers
- `brown` #2e1915 / `mutedbrown` #72564d — body text
- `maroon` #831a1b — headings, links, primary brand colour
- `maroon-deep` #400406 — hero + footer background (their dark burgundy)
- `gold` #d4aa5a / `gold-strong` #c18e35 — buttons, accents, scripture references

### Type
Cinzel (display/headings) + EB Garamond (body + italic scripture) — their exact real
font pairing, loaded from Google Fonts.

### Assets
- `assets/img/cog-logo.png` — their real emblem, downloaded from the Lovable site
  (`cog-logo.png`), used in nav + footer.
- `hero.jpg`, `welcome.jpg`, `moment-1/2/3.jpg`, `visit.jpg` — our own themed Pexels
  photography (kept from v1). The old site's only photo was a generic stock "open Bible in
  a sanctuary" image, so per the no-stock-copying rule we did not carry it across.

### Content — carried verbatim from the real site (scraped via SSR HTML, not the screenshots
alone, to get exact wording): tagline, "What We Stand For" 3 pillars, Vision (2 Peter 3:18 +
Growing in Grace/Knowledge), Mission (Matthew 28:19-20 + 2 Corinthians 10:4-5), Beliefs (4
items incl. their own real citation, which differs slightly between their Vision page
"1 John 1:8-10" and Beliefs page "James 1:8-10" — reproduced faithfully as each page has it,
not "corrected"), footer copyright ("All glory to Him, now and forever"), and the John 1:12
foundation verse (repeated site-wide on the real site).

The brief's original 1 John 3:1 verse is kept as a secondary companion quote under the main
John 1:12 "Our Foundation" pinned moment — both say the same thing, so both stayed.

### Confirmed real info (from live site, not invented)
- Sunday Worship — 10:00 AM
- Midweek Bible Study — Wednesday, 6:00 PM
- No address, phone or email is published anywhere on their real site — none invented here
  either. Removed the v1 Google Maps embed (no confirmed address to point it at) and the
  invented "Friday night" service.

### Signature motion
Swapped the old template's fire-ember canvas effect for a slower, softer gold "light field"
(same particle mechanism, recoloured + slowed — drifting motes of light rather than embers)
since this church's identity is warmth/family/light, not fire. Kept the pinned-scripture
GSAP scroll moment, now anchored on "Our Foundation" (John 1:12).
