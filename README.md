# Anusha Ramachandran — Portfolio

I'm a product designer + engineer. This portfolio shows how I move from research and interaction design to responsive interfaces and working frontend prototypes.

**[Visit my portfolio →](https://www.anusharamachandran.com)**

Built with Next.js, React, TypeScript, and Tailwind CSS. Case studies link to live sites, prototypes, and source code where available.

## Start with the case studies

| Project | Focus | Route |
| --- | --- | --- |
| Crusoe | Cloud-console guidance, critical journeys, and usage-to-billing clarity | `/case-study/crusoe/` |
| Krokos Bio | Botanical brand, content hierarchy, and responsive website redesign | `/case-study/krokos/` |
| ToniPR | Discovery, onboarding, interview, and content-review experience | `/case-study/tonipr/` |
| Nexus | A clearer experience for comparing and understanding AI answers | `/case-study/nexus/` |
| NeuraNote | Notes, connected concepts, and review rituals | `/case-study/neuranote/` |
| FlowOps | Request ownership, approvals, handoffs, and SLA visibility | `/case-study/flowops/` |
| HABITat | Habit-building mobile concept and interactive Figma prototype | `/case-study/habitat/` |

Each case study explains my role, the research, and the design decisions. Some projects are frontend prototypes or design concepts; they are labeled separately from published work and measured results.

## Run locally

Use Node.js 24 with npm (the version used for the latest local checks):

```sh
git clone https://github.com/anusharama100/portfolio.git
cd portfolio
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

```sh
npm run test
npm run lint
npm run build
```

The production build exports a static site into `out/`. Serve that directory with a static server to inspect the export:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory out
```

Open [localhost:8080](http://localhost:8080). The Render configuration also publishes `out/`.

## Implementation

Next.js 14 and TypeScript provide the routes. React components, Tailwind CSS 4, and shared case-study styles handle the presentation. The repository also contains screenshots, video walkthroughs, and interactive story components.

| Location | Responsibility |
| --- | --- |
| `app/` | Next.js routes and page entry points |
| `portfolio/` | Current portfolio UI and shared case-study styling |
| `portfolio/compat.tsx` | Next.js link and image compatibility |
| `portfolio/components/caseStudyProjects.ts` | Case-study context and summaries |
| `components/` | Additional portfolio and presentation components |
| `public/` | Project imagery and media |
| `test/` | Interaction and presentation checks |
| `render.yaml` | Static hosting configuration |

HABITat is the final featured project. Spotify Threads remains available by direct route but is not featured on the homepage. See [archived project notes](docs/archived-portfolio-projects.md).

## Continuing the work

Preserve the static export, natural screenshot proportions, evidence labels, and reduced-motion behavior. Keep published Git history intact and avoid adding large media files.

## Latest local check

See [local verification](docs/LOCAL_VERIFICATION.md) for the November 5, 2026 setup, runtime checks, and remaining test boundaries.
