// Capture real scroll positions from the preserved website recording.
// Keep the full recorded viewport and all original media unchanged.
// node scripts/prepare-tonipr-scroll-previews.mjs /absolute/path/to/ffmpeg
import { spawnSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const ffmpeg = process.argv[2] || 'ffmpeg'
const destination = resolve(root, 'public/tonipr/previews')
mkdirSync(destination, { recursive: true })

const captures = [
  ['9', 'landing-problem.jpg'],
  ['10.8', 'landing-solution.jpg'],
  ['12.3', 'landing-transformation.jpg'],
]

for (const [time, filename] of captures) {
  const result = spawnSync(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-y', '-ss', time,
    '-i', resolve(root, 'public/tonipr/tonipr-showcase-cropped.mp4'),
    '-frames:v', '1', '-q:v', '2', '-update', '1', resolve(destination, filename),
  ], { stdio: 'inherit' })
  if (result.status !== 0) throw new Error(`Unable to capture ${filename}`)
  console.log(`${filename}: original website recording at ${time}s`)
}
