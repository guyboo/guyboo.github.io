# Guyboo's Burning Rooftop Pepper Garden

Static GitHub Pages edition of the pepper archive and planning app.

## What this version includes

- Same main archive design, tiles, cards, filters, and pepper ID dialogs as the live app.
- Embedded 51-plant pepper dataset, including Biquinho Yellow in 7 gal.
- Pot allocation page.
- Hash routing for GitHub Pages compatibility.
- No backend, database, add-pepper form, password gate, or delete functionality.

## Local preview

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The static site is built to:

```text
dist/public
```

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Push this project to the `main` branch.
3. In GitHub, go to **Settings → Pages**.
4. Set **Source** to **GitHub Actions**.
5. The included workflow deploys `dist/public` automatically.

## Updating peppers

This static edition uses:

```text
client/src/lib/static-peppers.ts
```

To update peppers, edit that file or regenerate it from the source seed data before rebuilding.
