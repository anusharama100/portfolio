// Re-encode both original prototype recordings without cutting or rearranging frames.
// node scripts/prepare-neuranote-walkthroughs.mjs /path/to/ffmpeg /path/to/original-final-prototype.mp4
import { spawnSync } from 'node:child_process'
import { readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const ffmpeg = process.argv[2] || 'ffmpeg'
const originalWorkflow = process.argv[3]
if (!originalWorkflow) throw new Error('Provide the original final-prototype recording as the third argument.')
const spec = JSON.parse(readFileSync(resolve(root, 'portfolio/components/neuraWalkthroughs.json'), 'utf8'))
const publicPath = path => resolve(root, 'public', path.replace(/^\//, ''))
function run(args) {
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })
  if (result.status !== 0) throw new Error(`NeuraNote media preparation failed (${result.status}).`)
}
for (const [key, source] of [['onboarding', publicPath('/neuranote/neuranote-demo.mp4')], ['workflow', resolve(originalWorkflow)]]) {
  const output = publicPath(spec[key].src)
  if (source === output) throw new Error('The original recording must never be overwritten.')
  run(['-i', source, '-map', '0:v:0', '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '22', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', output])
  if (statSync(output).size >= 10_000_000) throw new Error(`${key} exceeds the 10MB local-video limit.`)
  run(['-ss', '0', '-i', output, '-frames:v', '1', '-q:v', '2', '-update', '1', publicPath(spec[key].poster)])
  console.log(`${key}: ${(statSync(output).size / 1_000_000).toFixed(2)} MB; original recording preserved.`)
}
