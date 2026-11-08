// Every experiment page's number, title and description, for the Experiment Navigator (<ExperimentList>)
import { createContentLoader } from 'vitepress'

export interface Exp { n: number; url: string; title: string; description: string }
declare const data: Exp[]
export { data }

export default createContentLoader('experiments/exp*.md', {
  transform(pages): Exp[] {
    return pages
      .map((p) => {
        const n = Number((p.url.match(/\/exp(\d+)-/) || [])[1])
        return { n, url: p.url, title: p.frontmatter.title || '', description: p.frontmatter.description || '' }
      })
      .filter((e) => e.n)
      .sort((a, b) => a.n - b.n)
  },
})
