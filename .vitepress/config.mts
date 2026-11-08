// The site config. Nothing here is specific to one lab: it all comes from lab.config.mts.
import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { fileURLToPath } from 'node:url'
import lab from '../lab.config.mts'
import { linkPreviews } from './og.mts'
import { all, experimentEdges, sidebar } from './lab.mts'

const srcDir = fileURLToPath(new URL('..', import.meta.url))
const edges = experimentEdges(srcDir)
// BASE_PATH is set by the GitHub Pages workflow ("/repo-name/" or "/" with a custom domain).
const base = process.env.BASE_PATH || '/'
const short = lab.code.toUpperCase()
const description = `Step-by-step guides for the ${short} ${lab.name} at Birzeit University.`

// Per-experiment link previews, drawn at build time (see og.mts)
const og = linkPreviews({ code: short, name: lab.name, host: lab.host, accent: lab.accent.dark, platform: lab.platform })

// The lab colour as VitePress brand colours: three shades each for the light and dark themes
function mix(hex: string, other: string, t: number) {
  const a = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16)), b = other.match(/\w\w/g)!.map((x) => parseInt(x, 16))
  return '#' + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, '0')).join('')
}
const L = lab.accent.light, D = lab.accent.dark
const brand = `:root{--vp-c-brand-1:${mix(L, '#000000', 0.25)};--vp-c-brand-2:${L};--vp-c-brand-3:${L};--vp-c-brand-soft:${L}24;--vp-button-brand-bg:${L};--vp-button-brand-hover-bg:${mix(L, '#000000', 0.25)};--vp-button-brand-active-bg:${mix(L, '#000000', 0.4)};--vp-home-hero-name-color:${L}}
.dark{--vp-c-brand-1:${D};--vp-c-brand-2:${mix(D, '#000000', 0.2)};--vp-c-brand-3:${mix(D, '#000000', 0.45)};--vp-c-brand-soft:${D}29;--vp-button-brand-bg:${mix(D, '#000000', 0.45)};--vp-button-brand-hover-bg:${mix(D, '#000000', 0.25)};--vp-button-brand-active-bg:${mix(D, '#000000', 0.2)};--vp-home-hero-name-color:${D}}`

// Words in index.md's front matter that are filled from lab.config.mts
const tokens: Record<string, string> = { $code: short, $name: lab.name, $platform: lab.platform, $manual: lab.manual ? `./${lab.manual}` : '' }
function fill(v: any): any {
  if (typeof v === 'string') return v.replace(/\$(code|name|platform|manual)\b/g, (m) => tokens[m] ?? m)
  if (Array.isArray(v)) return v.map(fill).filter((x) => !(x && typeof x === 'object' && x.link === ''))
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fill(x)]))
  return v
}

const downloads = [...lab.downloads]
// `base` by hand: a sidebar item with target '_blank' counts as external, so VitePress doesn't prefix it
if (lab.manual) downloads.push({ text: 'Full Lab Manual (PDF)', link: `${base}${lab.manual}`, target: '_blank' })

export default withPwa(defineConfig({
  base,
  lang: 'en-US',
  title: `${short} ${lab.name}`,
  description,
  srcExclude: ['README.md', 'snippets/**'],
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['link', { rel: 'apple-touch-icon', href: `${base}apple-touch-icon.png` }],
    ['meta', { name: 'theme-color', content: L }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'ECE Labs · Birzeit University' }],
    ['style', {}, brand],
    ...og.head,
    ['script', { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${lab.analytics}` }],
    ['script', {}, `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${lab.analytics}');`],
  ],

  sitemap: { hostname: `https://${lab.host}/` },

  buildEnd: all(og.buildEnd),

  // The home page's front matter uses $code, $name, $platform and $manual; its cards come from lab.config.mts
  transformPageData(pageData) {
    // No Previous page on the first experiment, no Next page on the last (see lab.mts)
    edges(pageData)
    if (pageData.frontmatter.layout !== 'home') return
    pageData.frontmatter = fill(pageData.frontmatter)
    // The feature cards come from lab.config.mts unless index.md lists its own
    if (!pageData.frontmatter.features) pageData.frontmatter.features = lab.features
  },

  // Link previews: per-page title, the page's (or site's) description, and canonical URL
  transformHead({ pageData, siteData }) {
    const page = pageData.frontmatter.layout === 'home' ? '' : pageData.title
    const path = pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    return [
      ...og.transformHead({ pageData } as any),
      ['meta', { property: 'og:title', content: page ? `${page} · ${short}` : `${short} ${lab.name}` }],
      ['meta', { property: 'og:description', content: pageData.frontmatter.description || pageData.description || siteData.description }],
      ['meta', { property: 'og:url', content: `https://${lab.host}/${path}` }],
    ]
  },

  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: `${short}-BZU`,
    // For the theme: the lab code, the experiments still to come (the Experiment Navigator lists them),
    // and the manual, for the "Lab manual (PDF)" button on experiment pages
    lab: { code: lab.code.toLowerCase(), planned: lab.planned, manual: lab.manual ? `/${lab.manual}` : null },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Experiments', link: '/experiments/', activeMatch: '/experiments/' },
      { text: 'All labs', link: 'https://birzeit.me/' },
    ],

    // Built from the pages (see lab.mts): adding an experiment or a setup page is the only step
    sidebar: sidebar(srcDir, { downloads, docs: lab.docs }),

    outline: { level: [2, 3] },
    search: { provider: 'local' },
    editLink: { pattern: `https://github.com/${lab.repo}/edit/main/:path`, text: 'Edit this page on GitHub' },
    socialLinks: [{ icon: 'github', link: `https://github.com/${lab.repo}` }],
    footer: {
      message: `${short} · ${lab.name}`,
      copyright: 'ECE Labs · Department of Electrical &amp; Computer Engineering, Birzeit University',
    },
  } as any,

  // Installable, offline-capable app. The icons are generated from lab.config.mts by scripts/brand.mts.
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: `${short} ${lab.name}`,
      short_name: short,
      description,
      theme_color: L,
      background_color: '#ffffff',
      display: 'standalone',
      scope: base,
      start_url: base,
      icons: [
        { src: `${base}icons/pwa-192x192.png`, sizes: '192x192', type: 'image/png' },
        { src: `${base}icons/pwa-512x512.png`, sizes: '512x512', type: 'image/png' },
        { src: `${base}icons/maskable-512x512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        { src: `${base}favicon.svg`, sizes: 'any', type: 'image/svg+xml' },
      ],
    },
    workbox: {
      // The manual PDF is left out: too large to precache, and the guides don't need it offline
      globPatterns: ['**/*.{css,js,html,svg,png,jpg,jpeg,webp,ico,txt,woff2}'],
      // Link-preview images are for chat apps and search engines, not for reading offline
      globIgnores: ['og/**', 'og.png'],
      maximumFileSizeToCacheInBytes: 5000000,
    },
    experimental: { includeAllowlist: true },
  },
}))
