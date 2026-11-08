// Everything about this lab in one place. Edit this file, then write pages in experiments/ and setup/:
// the sidebar, the Experiment Navigator, the home page, link previews, the favicon and app icons all
// follow from it. See README.md.
import type { DefaultTheme } from 'vitepress'

type Link = DefaultTheme.SidebarItem

export default {
  // Course code and name, as they appear on Ritaj
  code: 'ENCS0000',
  name: 'Example Laboratory',

  // Where the site lives: encsXXXX.birzeit.me (ask the birzeit.me admin to point the subdomain here),
  // and the GitHub repository, for "Edit this page" links
  host: 'encs0000.birzeit.me',
  repo: 'ECE-Birzeit/encs0000',

  // Shown on link previews and the home page: the boards, tools or languages the lab uses
  platform: 'Board · IDE · Language',

  // The lab's colour: a darker shade for the light theme, a lighter one for the dark theme.
  // Every lab on birzeit.me has its own; pick one that isn't taken (red 4110, blue 4101, orange 5150, teal 5101).
  accent: { light: '#6d28d9', dark: '#a78bfa' },

  // The department's manual as a PDF in public/, or null when there isn't one
  manual: null as string | null, // e.g. 'ENCS0000-Manual.pdf'

  // Google Analytics: every lab on birzeit.me reports to the same property, so birzeit.me's
  // dashboard counts it. Leave as is.
  analytics: 'G-K834Q72PP9',

  // Three short cards on the home page
  features: [
    { title: 'What students build', details: 'One or two sentences on the hardware or software this lab works with.' },
    { title: 'How the lab runs', details: 'Simulator first, then the board? Individual or in pairs? Say it here.' },
    { title: 'Works offline', details: 'Install the site from the browser menu and every page, image and code listing opens without internet.' },
  ],

  // Experiments that aren't written yet, listed (without a link) in the Experiment Navigator
  planned: [
    { n: 3, title: 'A future experiment', topics: 'What it will cover' },
  ],

  // Sidebar, bottom: tools to install and the manual
  downloads: [
    { text: 'Example IDE', link: 'https://example.com/download' },
  ] as Link[],

  // Sidebar, bottom: datasheets and reference manuals
  docs: [
    { text: 'Example datasheet (PDF)', link: 'https://example.com/datasheet.pdf' },
  ] as Link[],
}
