// Extract real archived page sections; never reconstruct or invent an old screen.
// node scripts/prepare-krokos-scrollthrough.mjs /path/to/ffmpeg /path/to/corrected-original-frames
import { spawnSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const ffmpeg = process.argv[2] ?? 'ffmpeg'
const archive = process.argv[3]
if (!archive) throw new Error('Provide the archived corrected-original-frames directory. Original source frames are preserved.')
const source = resolve(root, 'public/krokos/original-site-walkthrough.mp4')
const output = resolve(root, 'public/krokos/original-sections')
mkdirSync(output, { recursive: true })
function extract(name, inputs, filters) {
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...inputs,
    ...filters, '-frames:v', '1', '-q:v', '2', '-update', '1', resolve(output, `${name}.jpg`)], { stdio: 'inherit' })
  if (result.status !== 0) throw new Error(`Could not prepare ${name}.`)
}

// Keep the reviewed hero-only crop from the compact recording.
extract('opening', ['-ss', '2', '-i', source], ['-vf', 'crop=1280:610:0:0,setsar=1'])

// Each crop contains one complete section, not the beginning of the next one.
// Coordinates refer to the original 1440 × 900 archived browser captures.
const sections = [
  ['newsletter', '0019', 6, 888],
  ['plant-science', '0038', 212, 592],
  ['supply-chain', '0054', 110, 592],
  ['approach', '0067', 64, 808],
  ['saffron', '0104', 20, 770],
  ['team', '0117', 152, 592],
  ['contact', '0131', 56, 724],
]
for (const [name, frame, top, height] of sections) {
  extract(name, ['-i', resolve(archive, `${frame}.jpg`)], ['-vf', `crop=1440:${height}:0:${top},scale=1280:-2,setsar=1`])
}

// This section is taller than one viewport. Join the matching overlap (542px
// vertical offset), preserving both the complete text and the bottom photograph.
extract('benefits', ['-i', resolve(archive, '0084.jpg'), '-i', resolve(archive, '0095.jpg')], [
  '-filter_complex', '[0:v]crop=1440:708:0:36[top];[1:v]crop=1440:260:0:202[bottom];[top][bottom]vstack=inputs=2,scale=1280:-2,setsar=1[out]',
  '-map', '[out]',
])
console.log('Prepared nine complete archived sections. Original source frames and recordings preserved.')
