// Non-destructive edit: the source recordings are never overwritten.
// Run: node scripts/edit-usage-cost-video.mjs /path/to/ffmpeg /path/to/cost-investigation-loop.mp4
import { spawnSync } from 'node:child_process'
import { mkdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const [ffmpeg = 'ffmpeg', investigationSource] = process.argv.slice(2)
if (!investigationSource) throw new Error('Provide the existing investigation recording as the second argument.')
const billing = resolve(root, 'public/crusoe/cost-breakdown-loop.mp4')
const usage = resolve(root, 'public/crusoe/usage-compare-loop.mp4')
const investigation = resolve(investigationSource)
const output = resolve(root, 'public/crusoe/usage-cost-highlights-screen-only.mp4')
const images = resolve(root, 'public/images/crusoe/usage-to-cost/story-screen-only')
mkdirSync(images, { recursive: true })

function run(args) {
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })
  if (result.status !== 0) throw new Error(`Media edit failed (${result.status}).`)
}

// Four seconds per chapter, normal playback speed; holds replace dead-end navigation.
// The recordings are prototype examples, not one reconciled account/session.
// Remove only the 110px browser chrome; retain all 690px of the product viewport.
const productCrop = 'crop=1280:690:0:110'
const edits = [
  { source: billing, start: 14, length: 3.5, title: '01 / Bill comparison', note: 'Check the dates before comparing the amounts.' },
  { source: billing, start: 5.2, length: 4, title: '02 / Product charges', note: 'GPU hours, rates, and line items explain a product charge.' },
  { source: usage, start: 10.5, length: 4, title: '03 / Usage totals', note: 'Token counts describe consumption, not dollars.' },
  { source: investigation, start: 0, length: 4, title: '04 / Traffic and performance', note: 'These charts show how the service performed, not its dollar cost.' },
  { source: investigation, start: 15.5, length: 1.4, title: '05 / Request logs', note: 'Inspect what ran - model, token counts, status, and timing.' },
  { source: investigation, start: 17.4, length: 2.4, title: '06 / Account activity', note: 'Model and endpoint updates are clues to investigate, not proof.' },
]
const inputArgs = edits.flatMap(edit => ['-ss', String(edit.start), '-t', String(edit.length), '-i', edit.source])
const filters = edits.map((edit, index) =>
  `[${index}:v]setpts=PTS-STARTPTS,fps=30,scale=1280:800,${productCrop},setsar=1,tpad=stop_mode=clone:stop_duration=4,trim=duration=4,pad=1280:802:0:0:color=0x111916,` +
  `drawtext=fontfile='/System/Library/Fonts/Supplemental/Arial.ttf':text='${edit.title}':fontcolor=0xc8f27d:fontsize=27:x=30:y=712,` +
  `drawtext=fontfile='/System/Library/Fonts/Supplemental/Arial.ttf':text='${edit.note}':fontcolor=white:fontsize=21:x=30:y=752[v${index}]`,
)
filters.push(`${edits.map((_, index) => `[v${index}]`).join('')}concat=n=6:v=1:a=0[out]`)
run([...inputArgs, '-filter_complex', filters.join(';'), '-map', '[out]', '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', output])
if (statSync(output).size >= 10_000_000) throw new Error('Edit exceeds the 10MB local-video budget. Increase CRF before using it.')

const shots = [
  [billing, 17, 'billing-comparison'],
  [billing, 7.3, 'product-detail'],
  [usage, 12.5, 'usage-comparison'],
  [investigation, 0.4, 'workload-analytics'],
  [investigation, 16.1, 'request-evidence'],
  [investigation, 18.2, 'activity-history'],
]
for (const [source, time, name] of shots) {
  run(['-ss', String(time), '-i', source, '-vf', `scale=1280:800,${productCrop},setsar=1`, '-frames:v', '1', '-q:v', '2', '-update', '1', resolve(images, `${name}.jpg`)])
}
run(['-ss', '0.1', '-i', output, '-frames:v', '1', '-q:v', '2', '-update', '1', resolve(images, 'walkthrough-poster.jpg')])
console.log(`Created 24-second edit (${(statSync(output).size / 1_000_000).toFixed(2)}MB) and seven stills. Originals preserved.`)
