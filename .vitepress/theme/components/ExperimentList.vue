<script setup lang="ts">
// The Experiment Navigator's table: every page in experiments/ (number, title, description), plus the
// experiments listed as planned in lab.config.mts, without a link, until their page exists.
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as written } from '../experiments.data.mts'

const { theme } = useData()
const rows = computed(() => {
  const have = new Set(written.map((e) => e.n))
  const planned = (theme.value.lab.planned || [])
    .filter((p: any) => !have.has(p.n))
    .map((p: any) => ({ n: p.n, url: '', title: p.title, description: p.topics || '' }))
  return [...written, ...planned].sort((a, b) => a.n - b.n)
})
</script>

<template>
  <table class="exp-list">
    <thead><tr><th>No.</th><th>Experiment</th><th>Topics</th></tr></thead>
    <tbody>
      <tr v-for="e in rows" :key="e.n" :class="{ planned: !e.url }">
        <td>{{ e.n }}</td>
        <td><a v-if="e.url" :href="withBase(e.url)">{{ e.title }}</a><template v-else>{{ e.title }}</template></td>
        <td>{{ e.description }}</td>
      </tr>
    </tbody>
  </table>
</template>
