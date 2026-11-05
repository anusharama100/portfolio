# Local verification

Checked November 5, 2026 with Node 24 and npm on macOS.

- `npm ci` completed from the committed lockfile.
- `npm test`: 158 tests passed across 23 files.
- `npm run lint` passed with existing image-optimization warnings.
- `npm run build` produced the static export; all 15 exported HTML pages had resolvable local resource and page links.
- Both the static export server and `npm start` served the home and Crusoe case-study routes successfully.
- Browser walkthrough: home navigation and Crusoe case study. No console errors were observed in that walkthrough.

This checks the copied GitHub repository. It does not change the deployment or prove every external link remains available.
