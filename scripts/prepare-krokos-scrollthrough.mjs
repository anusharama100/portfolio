// Extract real archived page sections; never reconstruct or invent an old screen.
// node scripts/prepare-krokos-scrollthrough.mjs /path/to/ffmpeg
import { spawnSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const ffmpeg = process.argv[2] ?? 'ffmpeg'
const source = resolve(root, 'public/krokos/original-site-walkthrough.mp4')
const output = resolve(root, 'public/krokos/original-sections')
mkdirSync(output, { recursive: true })
const sections = [
  ['opening', 2], ['newsletter', 6], ['plant-science', 10], ['supply-chain', 14],
  ['approach', 18], ['saffron', 22], ['team-contact', 26],
]
for (const [name, time] of sections) {
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(time), '-i', source,
    // Only remove the edit's added caption band. Retain the entire page viewport.
    '-vf', 'crop=1280:800:0:0,setsar=1', '-frames:v', '1', '-q:v', '2', '-update', '1', resolve(output, `${name}.jpg`)], { stdio: 'inherit' })
  if (result.status !== 0) throw new Error(`Could not extract ${name}.`)
}
console.log('Prepared seven archived page-section captures. Source recordings preserved.')
