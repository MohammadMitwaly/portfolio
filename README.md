# Mo Mitwaly — Portfolio (Auteur Studio)

Single‑page portfolio built with semantic HTML, modern CSS, and vanilla JS.
No frameworks, GitHub Pages‑ready.

## Structure
- `index.html` — main page (to be populated in this workspace)
- `styles.css` — Auteur Studio theme (Wes, Villeneuve, PTA palettes)
- `main.js` — interactions & hidden gems
- `assets/` — optional for images/SVGs (not required)

## Features
- Symmetric, cinematic layout with subtle “film frame” rails
- Theme palettes: default auteur, Wes Anderson, Denis Villeneuve, PT Anderson
- Hidden gems:
  - Konami Code → “Don’t Panic” theme + starfield
  - 42 seconds idle → starfield + subtle 42 in footer
  - Click “rigatoni” or recipe links → recipe modal
  - Directors palette swap
  - V‑W‑V → accent color cycle (Vampire Weekend)
- Accessibility: semantic HTML, focusable skip link, ARIA, reduced motion
- Performance: no heavy deps, tiny JS, CSS variables

## Local Preview
Just open `index.html` with any modern browser.

## Deploy to GitHub Pages
1. Create a GitHub repo and add the contents of this `portfolio/` folder to the repo root.
2. Commit and push to `main`.
3. In your repo settings → Pages, choose Source: `Deploy from a branch`, branch: `main`, folder: `/ (root)`.
4. Save. Pages will build a live URL like `https://<user>.github.io/<repo>/`.

If you prefer `/docs`:
- Move these files into a `/docs` folder at repo root.
- Set Pages to branch `main` / folder `/docs`.

## Content
Update `index.html` with:
- Links (GitHub, LinkedIn, Email)
- Projects, additional details, and any watchlist/favorites you want to share.

## License
MIT — reuse freely with attribution to Mo Mitwaly.
