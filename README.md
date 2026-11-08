# ECE Labs: lab site template

Start a new lab site for [birzeit.me](https://birzeit.me) in an afternoon. This is the same setup
as the existing lab sites ([encs4110](https://encs4110.birzeit.me), [encs4101](https://encs4101.birzeit.me),
[encs5150](https://encs5150.birzeit.me), [encs5101](https://encs5101.birzeit.me)): a VitePress site
that works offline, with code listings that paste cleanly and its own link preview for every page.

You write the pages. The rest is handled for you:

- **Sidebar and Experiment Navigator**: built from the files in `experiments/` and `setup/`. Add a page and it appears, in order.
- **Link previews**: every experiment gets its own banner (lab code, experiment number and title, in the lab's colour) when the site builds, for WhatsApp, Telegram, Teams and search engines.
- **Favicon, app icons and site banner**: drawn from the lab's colour on the first build.
- **Home page**: filled from `lab.config.mts`.
- **Deploys**: every push to `main` publishes the site with GitHub Pages.

## Start a new lab

1. On GitHub, click **Use this template → Create a new repository**. Name it after the course, in
   lower case (`encs3310`), under the **ECE-Birzeit** organisation.
2. Edit **`lab.config.mts`**: course code and name, the subdomain, the platform line, the lab's colour,
   the manual PDF (put it in `public/`), and the Downloads and Documentation links for the sidebar.
3. Replace the example pages:
   - `experiments/exp1-example.md` shows every part of a finished experiment page. Keep it open as a guide.
   - Copy `experiments/exp2-blank.md` for each experiment: `exp1-gpio.md`, `exp2-timers.md`, …
   - Put each tool's install guide in `setup/` and list them in `setup/index.md`.
4. In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**, and set the custom
   domain to `encsXXXX.birzeit.me`. Ask the birzeit.me admin to add the DNS record and the lab's card
   to [birzeit.me](https://github.com/ECE-Birzeit/landing-page).

## Write locally

```bash
npm install
npm run dev        # http://localhost:5173, reloads as you edit
npm run build      # the site as it will be published, in .vitepress/dist
npm run preview    # serve that build
```

## Conventions

These keep every lab site the same, so students know their way around any of them.

| Path | What goes there |
| --- | --- |
| `experiments/expN-short-name.md` | One page per experiment. `N` orders it; the name becomes its address, `/experiments/expN-short-name`. Don't rename a published page: students bookmark and share these links. |
| `experiments/index.md` | The Experiment Navigator. Its table is built automatically; write only the intro. |
| `setup/index.md` | The Setup Guide: which tool each experiment needs. |
| `setup/<tool>.md` | One page per tool or project type. `order:` in its front matter sets its place in the sidebar. |
| `snippets/` | Code included into pages with `<<< @/snippets/...`, so each listing is one file to fix. |
| `public/` | Images (`/screenshots/...`), the manual PDF, and your own `favicon.svg` or `og.png` if you don't want the generated ones. |

Front matter on an experiment page:

```yaml
---
title: GPIO and Interrupts          # the page title
short: GPIO and Interrupts          # optional, a shorter name for the sidebar
description: One line for the navigator and link previews
part: "Part 2: The board"           # optional, groups experiments in the sidebar
---
```

Each experiment has the same sections, in this order: **Objectives**, **Background**, **Examples**,
**Lab work** (graded by the TA; no solutions), **Common problems**.

## How it works

| File | Role |
| --- | --- |
| `lab.config.mts` | Everything specific to this lab |
| `.vitepress/config.mts` | The site config, built from `lab.config.mts`; no need to edit |
| `.vitepress/lab.mts` | Builds the sidebar from the pages; can also keep old addresses working after a page moves |
| `.vitepress/og.mts` | Draws the link-preview banners at build time |
| `scripts/brand.mts` | Draws the favicon, app icons and `og.png` before each build, only when they're missing |
| `.vitepress/theme/` | Theme tweaks, offline support, "continue where you left off", the navigator table |

`lab.mts`, `og.mts` and the theme are shared with the other lab sites; improve them here and copy
them across.

## License

The written content is [CC BY 4.0](LICENSE); the code is [MIT](LICENSE-CODE).
