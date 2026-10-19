## Production portfolio

- This repository publishes the live Next.js static site. Keep `next.config.js` static export and the Render `out` publish directory intact.
- The reviewed UI lives in `portfolio/`, with Next.js entry points under `app/`. `portfolio/compat.tsx` adapts links to Next.js and preserves native, uncropped image rendering.
- Shared case-study styles are imported by `portfolio/styles.css`. Tailwind 4 is processed with `@tailwindcss/postcss`; do not restore the old Tailwind 3 PostCSS plugin.
- `scripts/sync-local-portfolio.mjs` mechanically imports the reviewed local preview. It preserves unrelated routes and existing public assets. Do not overwrite the Next-specific compatibility module.
- Preserve shared case-study spacing, natural screenshot proportions, factual evidence labels, and the desktop 80% reading scale.
- Do not add large media binaries above 10 MB. Keep original media already tracked in Git and use hosted assets or compact derivatives for new additions.
- Do not rewrite published Git history or force-push. Verify the static build before publishing updates.
