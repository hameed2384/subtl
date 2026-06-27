# subtl. — Beauty Studio Website

A single-file luxury beauty studio website for **subtl.**, a scalp micropigmentation and wider beauty brand based in Wyke, Bradford. Built with a dark editorial aesthetic, cinematic landing animation, and a clean inner page structure designed to scale as new services are added.

---

## Project Overview

| | |
|---|---|
| **File** | `subtl-website.html` |
| **Type** | Single-file HTML (no build step, no dependencies) |
| **Fonts** | Cormorant Garamond · DM Mono (Google Fonts) |
| **Location** | Wyke, Bradford, West Yorkshire |
| **Contact** | hello@subtl.co.uk |

---

## Structure

The site is split into two distinct zones.

### Landing (`#landing`)
A full-screen cinematic entry — the first thing every visitor sees. Animations are sequenced and staggered:

1. Ruled lines draw across top and bottom edges
2. The wordmark `s u b t l .` fades in
3. The eyebrow label slides down from above
4. The tagline rises up
5. Sub-copy follows
6. CTA buttons appear
7. Scroll indicator fades in last

Nothing in this section shares timing with the inner page. It is intentionally self-contained.

### Inner Page (`#inner`)
Everything below the landing — philosophy, services, process, studio, testimonials, and booking. Sections use scroll-triggered fade-up reveals via `IntersectionObserver`. The nav transitions from transparent to a frosted glass bar as the user scrolls off the landing.

---

## Design Tokens

```css
--black:  #0a0a0a   /* page background */
--off:    #111110   /* subtle hover state */
--panel:  #131312   /* card hover background */
--rule:   #1e1d1b   /* dividers and borders */
--cream:  #f0ece4   /* primary text */
--muted:  #7a776f   /* secondary text */
--dim:    #3a3834   /* tertiary / very quiet text */
--warm:   #cdc7b8   /* italic accent colour */
```

Typography uses two faces throughout:
- **Cormorant Garamond** (weight 300–400) — all headings and body copy
- **DM Mono** (weight 300–400) — labels, captions, utility text, buttons

---

## Adding a New Service

Open `subtl-website.html` and find the `<!-- ─── SERVICES ─── -->` section. Copy an existing `.service-card` block and update the number, title, description, and tag:

```html
<div class="service-card reveal reveal-delay-1">
  <span class="label">04</span>
  <h3>Your New Service</h3>
  <p>Short description of what this service involves and who it's for.</p>
  <span class="service-tag">From £XXX &nbsp;·&nbsp; X sessions</span>
</div>
```

The grid is set to `repeat(3, 1fr)` — adding a fourth card will create a new row automatically. If you want a 2-column layout instead, change the CSS to `repeat(2, 1fr)`.

---

## Updating Contact Details

All contact references are in two places:

- **Booking CTA** — `href="mailto:hello@subtl.co.uk"` and `href="tel:+441142000000"`
- **Footer** — plain text email and location

Search for `subtl.co.uk` and `+441142` to find and replace both.

---

## Customising Copy

| What to change | Where to find it |
|---|---|
| Hero tagline | `.l-tagline` in the `#landing` section |
| Philosophy paragraph | `.intro-body` under `<!-- ─── INTRO ─── -->` |
| Service descriptions | Each `.service-card` block |
| Studio story | `.about-text` under `<!-- ─── ABOUT ─── -->` |
| Stats (numbers) | `.stat-num` elements in the about section |
| Testimonials | Each `.testi` block |
| Footer location | `.f-side` in `<footer>` |

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). The custom cursor is hidden on touch devices automatically via `cursor: none` on `body` — touch users see the default system cursor.

Respects `prefers-reduced-motion`: all animations and transitions are disabled for users who have that system preference enabled.

---

## Future Considerations

- **Services pages** — each service card can link to a dedicated sub-page as the offering expands
- **Gallery / before & after** — a lightbox grid can be inserted between Services and Process
- **Booking system** — the CTA email link can be swapped for an embedded Calendly or Booksy widget
- **CMS** — if copy updates become frequent, the HTML structure maps cleanly to a headless CMS like Sanity or Contentful
- **Domain** — designed with `subtl.co.uk` in mind; update all href references when live
