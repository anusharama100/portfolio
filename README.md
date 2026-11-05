# Anusha Ramachandran — Portfolio

My portfolio brings together product-design work, interactive prototypes, and the decisions behind them. The case studies cover cloud infrastructure, AI-assisted tools, learning experiences, enterprise workflows, and a biotechnology website redesign.

**[Visit my portfolio →](https://www.anusharamachandran.com)**

This is the maintained source repository. It brings the case studies together; each project repository contains its own implementation details.

## Start with the case studies

| Project | Focus | Route |
| --- | --- | --- |
| Crusoe | Cloud-console guidance, critical journeys, and usage-to-billing clarity | `/case-study/crusoe/` |
| Krokos Bio | Botanical brand, content hierarchy, and responsive website redesign | `/case-study/krokos/` |
| ToniPR | Discovery, onboarding, interview, and content-review experience | `/case-study/tonipr/` |
| Nexus | A clearer experience for comparing and understanding AI answers | `/case-study/nexus/` |
| NeuraNote | Notes, connected concepts, and review rituals | `/case-study/neuranote/` |
| FlowOps | Request ownership, approvals, handoffs, and SLA visibility | `/case-study/flowops/` |

Each case study provides its own role, context, and evidence. Concept work and projected outcomes should be read separately from shipped work and measured results.

## Run locally

Use Node.js 20 or a compatible newer version with npm:

```sh
git clone https://github.com/anusharama100/portfolio.git
cd portfolio
npm install
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

HABITat and Spotify Threads remain in the source but are intentionally unfeatured. [Archived project notes](docs/archived-portfolio-projects.md) explain their routes and restoration.

## Continuing the work

Preserve the static export, natural screenshot proportions, evidence labels, and reduced-motion behavior. Keep published Git history intact and avoid adding large media files.

The portfolio presents the work and its story. Individual project repositories contain the corresponding application or prototype source where available.
