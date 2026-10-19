// Non-destructive edit of the existing site recording and actual product screens.
// Product screens are held, not animated to imply live interactions.
// node scripts/edit-tonipr-walkthrough.mjs /absolute/path/to/ffmpeg
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const ffmpeg = process.argv[2] || 'ffmpeg'
const spec = JSON.parse(readFileSync(resolve(root, 'portfolio/components/toniWalkthrough.json'), 'utf8'))
const work = mkdtempSync(resolve(tmpdir(), 'toni-journey-'))
const font = '/System/Library/Fonts/Supplemental/Arial.ttf'
const publicAsset = path => resolve(root, 'public', path.replace(/^\//, ''))
function run(args) {
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })
  if (result.status !== 0) throw new Error(`ToniPR edit failed (${result.status}).`)
}

const inputs = [
  ['-ss', '1', '-t', '3', '-i', publicAsset('/tonipr/tonipr-showcase-cropped.mp4')],
  ['-loop', '1', '-framerate', '30', '-t', '4', '-i', publicAsset('/tonipr/previews/three-step-workflow.jpg')],
  ...['dashboard-overview.jpg', 'interview-direction.jpg', 'voice-selection.jpg', 'recording-preparation.jpg', 'source-and-story.jpg']
    .map(name => ['-loop', '1', '-framerate', '30', '-t', '4', '-i', publicAsset(`/tonipr/previews/${name}`)]),
].flat()

const filters = spec.chapters.map((chapter, index) => {
  const title = resolve(work, `${index}-title.txt`)
  const caption = resolve(work, `${index}-caption.txt`)
  const source = resolve(work, `${index}-source.txt`)
  writeFileSync(title, `${String(index + 1).padStart(2, '0')} / ${chapter.label}`)
  writeFileSync(caption, chapter.caption)
  writeFileSync(source, index === 0 ? 'WEBSITE CAPTURE' : index === 1 ? 'WEBSITE DETAIL / SCREEN HOLD' : index === 6 ? 'PUBLIC DEMO / SCREEN HOLD' : 'PRODUCT SCREEN / HOLD')
  // Fit each complete view on the same centered stage; never crop its controls.
  const stage = 'setpts=PTS-STARTPTS,fps=30,scale=1280:720:force_original_aspect_ratio=decrease:force_divisible_by=2,pad=1280:720:(ow-iw)/2:(oh-ih)/2:white,setsar=1,tpad=stop_mode=clone:stop_duration=4,trim=duration=4,pad=1280:820:0:0:color=0xfaf7f7'
  return `[${index}:v]${stage},drawtext=fontfile='${font}':textfile='${title}':fontcolor=0x8b2632:fontsize=27:x=24:y=735,drawtext=fontfile='${font}':textfile='${caption}':fontcolor=0x353535:fontsize=21:x=24:y=778,drawtext=fontfile='${font}':textfile='${source}':fontcolor=0x666666:fontsize=14:x=w-tw-24:y=743[v${index}]`
})
filters.push(`${spec.chapters.map((_, index) => `[v${index}]`).join('')}concat=n=7:v=1:a=0[joined]`)
filters.push('[joined]fps=30,tpad=stop_mode=clone:stop_duration=0.1,trim=duration=28[out]')
const output = publicAsset(spec.src)
run([...inputs, '-filter_complex', filters.join(';'), '-map', '[out]', '-an', '-frames:v', '840', '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', output])
if (statSync(output).size >= 10_000_000) throw new Error('ToniPR highlights exceed the 10MB local-video limit.')
run(['-ss', '0', '-i', output, '-frames:v', '1', '-q:v', '2', '-update', '1', publicAsset(spec.poster)])
const timestamp = time => `00:00:${String(time).padStart(2, '0')}.000`
const cues = spec.chapters.map((chapter, index) => `${timestamp(chapter.time)} --> ${timestamp(spec.chapters[index + 1]?.time ?? spec.duration)}\n${chapter.label}. ${chapter.detail}`).join('\n\n')
writeFileSync(publicAsset(spec.captions), `WEBVTT\n\n${cues}\n`)
console.log(`ToniPR: ${spec.duration}s, ${(statSync(output).size / 1_000_000).toFixed(2)}MB. All sources preserved.`)
