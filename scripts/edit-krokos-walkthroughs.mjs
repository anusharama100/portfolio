// Non-destructive edits: preserve the archived recording and published page captures.
// node scripts/edit-krokos-walkthroughs.mjs /path/to/ffmpeg /path/to/original-recording.mp4
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const [ffmpeg = 'ffmpeg', originalRecording] = process.argv.slice(2)
if (!originalRecording) throw new Error('Provide the archived original-site recording.')
const walkthroughs = JSON.parse(readFileSync(resolve(root, 'portfolio/components/krokosWalkthroughs.json'), 'utf8'))
const work = mkdtempSync(resolve(tmpdir(), 'krokos-walkthrough-'))
const font = '/System/Library/Fonts/Supplemental/Arial.ttf'
const home = resolve(root, 'public/krokos/redesign-landing-full.jpg')
const press = resolve(root, 'public/krokos/redesign-press-full.jpg')

function run(args) {
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })
  if (result.status !== 0) throw new Error(`Krokos media edit failed (${result.status}).`)
}

function addCaption(filter, version, chapter) {
  const title = resolve(work, `${version}-${chapter.time}-title.txt`)
  const caption = resolve(work, `${version}-${chapter.time}-caption.txt`)
  writeFileSync(title, `${version === 'before' ? 'ORIGINAL SITE' : 'REDESIGN'} / ${chapter.label}`)
  writeFileSync(caption, chapter.caption)
  return `${filter},pad=1280:900:0:0:color=0xf7f4e9,` +
    `drawtext=fontfile='${font}':textfile='${title}':fontcolor=0x343920:fontsize=27:x=28:y=818,` +
    `drawtext=fontfile='${font}':textfile='${caption}':fontcolor=0x53564b:fontsize=21:x=28:y=859`
}

// Keep readable moments from the existing 41-second archived scroll capture.
const beforeCuts = [[0, 3], [4.8, 2.7], [9.6, 2.6], [13.4, 2.5], [17.4, 2.6], [22, 2.7], [27, 2.6]]
const beforeInputs = beforeCuts.flatMap(([start, length]) => ['-ss', String(start), '-t', String(length), '-i', resolve(originalRecording)])
const beforeFilters = beforeCuts.map((_, index) =>
  `[${index}:v]${addCaption('setpts=PTS-STARTPTS,fps=30,scale=1280:800,setsar=1,tpad=stop_mode=clone:stop_duration=4,trim=duration=4', 'before', walkthroughs.before.chapters[index])}[v${index}]`,
)
beforeFilters.push(`${beforeCuts.map((_, index) => `[v${index}]`).join('')}concat=n=7:v=1:a=0[joined]`)
beforeFilters.push('[joined]fps=30,tpad=stop_mode=clone:stop_duration=0.1,trim=duration=28[out]')

// These are guided pans over actual published captures, not simulated live interactions.
const afterPans = [[home, 0, 75], [home, 910, 980], [home, 2192, 2230], [home, 4060, 4095], [home, 4824, 5600], [home, 7036, 7459], [press, 603, 822]]
const afterInputs = afterPans.flatMap(([source]) => ['-loop', '1', '-framerate', '30', '-t', '4', '-i', source])
const afterFilters = afterPans.map(([, start, end], index) => {
  // Hold briefly, ease through the relevant page area, then let the endpoint settle.
  const progress = 'min(max((t-0.65)/2.7,0),1)'
  const y = `${start}+(${end - start})*(0.5-0.5*cos(PI*(${progress})))`
  const pan = `crop=1280:800:0:'${y}',setsar=1,setpts=PTS-STARTPTS`
  return `[${index}:v]${addCaption(pan, 'after', walkthroughs.after.chapters[index])}[v${index}]`
})
afterFilters.push(`${afterPans.map((_, index) => `[v${index}]`).join('')}concat=n=7:v=1:a=0[joined]`)
afterFilters.push('[joined]fps=30,tpad=stop_mode=clone:stop_duration=0.1,trim=duration=28[out]')

function timestamp(seconds) {
  return `00:${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}.000`
}

for (const [version, inputs, filters] of [['before', beforeInputs, beforeFilters], ['after', afterInputs, afterFilters]]) {
  const spec = walkthroughs[version]
  const output = resolve(root, 'public', spec.src.slice(1))
  run([...inputs, '-filter_complex', filters.join(';'), '-map', '[out]', '-an', '-frames:v', String(spec.duration * 30), '-c:v', 'libx264', '-preset', 'medium', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', output])
  if (statSync(output).size >= 10_000_000) throw new Error(`${version} walkthrough exceeds the 10MB local-video limit.`)
  run(['-ss', '0', '-i', output, '-frames:v', '1', '-q:v', '2', '-update', '1', resolve(root, 'public', spec.poster.slice(1))])
  const cues = spec.chapters.map((chapter, index) => `${timestamp(chapter.time)} --> ${timestamp(spec.chapters[index + 1]?.time ?? spec.duration)}\n${chapter.label}. ${chapter.detail}`).join('\n\n')
  writeFileSync(resolve(root, 'public', spec.captions.slice(1)), `WEBVTT\n\n${cues}\n`)
  console.log(`${spec.label}: ${spec.duration}s, ${(statSync(output).size / 1_000_000).toFixed(2)}MB. Source preserved.`)
}
