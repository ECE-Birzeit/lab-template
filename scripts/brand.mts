// Generates the lab's favicon, app icons and site banner from lab.config.mts, so a new lab looks
// finished from its first build. Runs before every build and dev server (npm's predev/prebuild).
// It only writes files that are missing: drop your own favicon.svg or og.png into public/ to use
// those instead, or delete them to have them redrawn after changing the colour.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import lab from '../lab.config.mts'
import { render } from '../.vitepress/og.mts'

const pub = fileURLToPath(new URL('../public/', import.meta.url))
const code = lab.code.toUpperCase()
const wrote: string[] = []

function write(rel: string, data: string | Buffer) {
  const file = join(pub, rel)
  if (existsSync(file)) return
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, data)
  wrote.push(rel)
}

// The ECE Labs mark (>_) on the lab's colour; shapes only, so it needs no fonts
const mark = (bg: string, pad = 0) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${64 + 2 * pad} ${64 + 2 * pad}">
${pad ? `<rect x="${-pad}" y="${-pad}" width="${64 + 2 * pad}" height="${64 + 2 * pad}" fill="${bg}"/>` : `<rect width="64" height="64" rx="14" fill="${bg}"/>`}
<path d="M17 21 L29 32 L17 43" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="33" y="38" width="15" height="6" rx="3" fill="#fff"/>
</svg>
`
write('favicon.svg', mark(lab.accent.light))

const { Resvg } = await import('@resvg/resvg-js')
const png = (svg: string, size: number) => new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng()
write('icons/pwa-192x192.png', png(mark(lab.accent.light), 192))
write('icons/pwa-512x512.png', png(mark(lab.accent.light), 512))
write('icons/maskable-512x512.png', png(mark(lab.accent.light, 14), 512)) // edge to edge, mark in the safe zone
write('apple-touch-icon.png', png(mark(lab.accent.light, 6), 180))

// The site's own link preview: the course number big, in the same style as the experiments' previews
if (!existsSync(join(pub, 'og.png'))) {
  const digits = code.replace(/^\D+/, '') || code
  write('og.png', await render({ code, name: lab.name, host: lab.host, accent: lab.accent.dark, platform: lab.platform },
    { title: lab.name, number: digits, path: '', url: `${lab.host}` }))
}

write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: https://${lab.host}/sitemap.xml\n`)

if (wrote.length) console.log(`brand: generated ${wrote.join(', ')}`)
