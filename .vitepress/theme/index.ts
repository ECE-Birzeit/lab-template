// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

import RegisterSW from './components/RegisterSW.vue'
import JumpToProcedure from './components/JumpToProcedure.vue'
import ContinueReading from './components/ContinueReading.vue'
import ExperimentList from './components/ExperimentList.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    // The lab code (from lab.config.mts) keys "continue where you left off"
    const lab = useData().theme.value.lab.code
    return h(DefaultTheme.Layout, null, {
      'home-hero-actions-after': () => h(ContinueReading, { lab, mode: 'card' }),
      'doc-before': () => h(JumpToProcedure),
      'layout-bottom': () => [h(RegisterSW), h(ContinueReading, { lab, mode: 'track' })],
    })
  },
  enhanceApp({ app }) {
    app.component('ExperimentList', ExperimentList)
  },
} satisfies Theme
