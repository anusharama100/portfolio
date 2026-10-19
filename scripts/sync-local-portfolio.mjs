// Mechanical source sync from the reviewed local preview into the existing
// Next.js static site. Deployment configuration and unrelated routes stay intact.
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const target = fileURLToPath(new URL('../', import.meta.url))
const source = resolve(process.argv[2] || '../fe58c782-local')
if (!existsSync(join(source, 'src/portfolio/components/CaseStudyExperience.tsx'))) throw new Error('A reviewed portfolio source directory is required.')
const save = (file, text) => {
  const path = join(target, file)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, text.replace(/[\t ]+$/gm, '').replace(/\n*$/, '\n'))
}
const digest = path => createHash('sha256').update(readFileSync(path)).digest('hex')
let sourceCount = 0
function copySources(folder, relative = '') {
  for (const entry of readdirSync(join(folder, relative), { withFileTypes: true })) {
    const file = join(relative, entry.name)
    if (entry.isDirectory()) copySources(folder, file)
    else if (entry.isFile() && file !== 'compat.tsx') {
      let text = readFileSync(join(folder, file), 'utf8')
      text = text.replaceAll('import.meta.env.DEV', "(process.env.NODE_ENV !== 'production')")
      if (file.endsWith('.tsx') && !/^['"]use client['"]/.test(text)) text = `"use client"\n\n${text}`
      save(join('portfolio', file), text)
      sourceCount++
    }
  }
}
copySources(join(source, 'src/portfolio'))
let styles = readFileSync(join(source, 'src/styles.css'), 'utf8')
styles = styles.replace('@source "../src";', '@source ".";\n@source "../app";\n@source "../components";')
styles = styles.replaceAll('"./portfolio/', '"./')
save('portfolio/styles.css', styles)
for (const file of ['components/ui/button.tsx', 'components/ui/popover.tsx', 'lib/utils.ts']) {
  save(file, readFileSync(join(source, 'src', file), 'utf8'))
}
for (const file of readdirSync(join(source, 'scripts'))) {
  if (!/\.(mjs|py)$/.test(file)) continue
  save(join('scripts', file), readFileSync(join(source, 'scripts', file), 'utf8').replaceAll('src/portfolio/', 'portfolio/'))
}
for (const file of readdirSync(join(source, 'src/test'))) {
  // Router matching is framework-specific; the production route contract is
  // covered separately instead of importing the local TanStack runtime.
  if (file === 'app-routing.test.tsx' || !/\.tsx?$/.test(file)) continue
  let test = readFileSync(join(source, 'src/test', file), 'utf8')
  test = test.replaceAll('src/portfolio/', 'portfolio/').replaceAll('src/styles.css', 'portfolio/styles.css')
  test = test.replaceAll('@import "./portfolio/', '@import "./')
  test = test.replace(/src\/routes\/case-study\/([\w-]+)\.tsx/g, 'app/case-study/$1/page.tsx')
  save(join('test', file), test)
}

let assetCount = 0
function copyAssets(relative = '') {
  for (const entry of readdirSync(join(source, 'public', relative), { withFileTypes: true })) {
    const file = join(relative, entry.name)
    if (entry.isDirectory()) copyAssets(file)
    else if (entry.isFile() && entry.name !== '.DS_Store') {
      const from = join(source, 'public', file)
      const to = join(target, 'public', file)
      if (existsSync(to) && digest(from) === digest(to)) continue
      if (statSync(from).size > 10_000_000) throw new Error(`Large media must be hosted separately: ${file}`)
      mkdirSync(dirname(to), { recursive: true })
      copyFileSync(from, to)
      assetCount++
    }
  }
}
copyAssets()

const projects = [
  ['crusoe', 'Crusoe'], ['krokos', 'Krokos Bio'], ['tonipr', 'ToniPR'],
  ['nexus', 'Nexus'], ['neuranote', 'NeuraNote'], ['flowops', 'FlowOps'],
  ['habitat', 'HABITat'], ['spotify', 'Spotify Threads'],
]
for (const [slug, name] of projects) {
  const previewImport = slug === 'tonipr' ? `import ToniDesignScrollThrough from '@/portfolio/components/ToniDesignScrollThrough'\n` : ''
  const previewProp = slug === 'tonipr' ? ' preview={<ToniDesignScrollThrough />}' : ''
  save(`app/case-study/${slug}/page.tsx`, `import type { Metadata } from 'next'\nimport CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'\nimport CaseStudyPage from '@/portfolio/pages/case-study-${slug}'\n${previewImport}\nexport const metadata: Metadata = { title: ${JSON.stringify(`${name} Case Study | Anusha Ramachandran`)} }\n\nexport default function Page() {\n  return <CaseStudyExperience slug="${slug}"${previewProp}><CaseStudyPage /></CaseStudyExperience>\n}\n`)
}
save('app/page.tsx', `import PortfolioLanding from '@/portfolio/components/PortfolioLanding'\n\nexport default function Home() {\n  return <PortfolioLanding />\n}\n`)
save('app/about/page.tsx', `import type { Metadata } from 'next'\nimport About from '@/portfolio/pages/about'\n\nexport const metadata: Metadata = { title: 'About | Anusha Ramachandran' }\n\nexport default function Page() {\n  return <About />\n}\n`)
console.log(`Synced ${sourceCount} source files, ${assetCount} updated assets, and 10 page entry points. Existing assets and unrelated routes were preserved.`)
