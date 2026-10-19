// Remove the first three seconds; preserve the existing 24-second edit.
// Run: node scripts/trim-usage-cost-intro.mjs /path/to/ffmpeg
import { spawnSync } from 'node:child_process'
import { statSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const ffmpeg = process.argv[2] ?? 'ffmpeg'
const source = resolve(root, 'public/crusoe/usage-cost-highlights-screen-only.mp4')
const output = resolve(root, 'public/crusoe/usage-cost-highlights-trimmed.mp4')
const poster = resolve(root, 'public/images/crusoe/usage-to-cost/story-screen-only/walkthrough-poster-trimmed.jpg')
function run(args) {
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })
  if (result.status !== 0) throw new Error(`Media trim failed (${result.status}).`)
}
run(['-ss', '3', '-i', source, '-map', '0:v:0', '-vf', 'setpts=PTS-STARTPTS', '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', output])
if (statSync(output).size >= 10_000_000) throw new Error('Trimmed video exceeds the 10MB local-video budget.')
run(['-ss', '0.1', '-i', output, '-frames:v', '1', '-q:v', '2', '-update', '1', poster])
console.log('Created the 21-second cut and matching poster. The 24-second edit is unchanged.')
