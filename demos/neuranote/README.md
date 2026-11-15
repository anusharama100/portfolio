# NeuraNote portfolio demo

Adapted from the original NeuraNote React app. This version runs entirely in the browser: keyword extraction, note excerpts, review prompts, and reflection suggestions use local rules, not AI. Notes and reflections persist in localStorage. No API keys are used.

Hash routing keeps every screen refreshable under the portfolio subdirectory.

Build from this directory with `pnpm install` then `pnpm build`. Vite writes the standalone application to `../../public/demos/neuranote`, served by the portfolio at `/demos/neuranote/index.html#/dashboard`.

Rebuild after editing the demo source. The generated assets must accompany the portfolio deployment.
