<script setup>
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { getMarkdownAliasPath } from '../../utils/markdownArtifacts.js'

const { frontmatter, page } = useData()
const copied = ref(false)
const copyFailed = ref(false)

const markdownPath = computed(() => withBase(getMarkdownAliasPath(page.value.relativePath)))
const shouldShow = computed(() => frontmatter.value.layout !== 'home')
const buttonLabel = computed(() => {
  if (copyFailed.value) {
    return '复制失败'
  }

  return copied.value ? '已复制 Markdown' : '复制 Markdown'
})

async function copyMarkdown() {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const response = await window.fetch(markdownPath.value)

    if (!response.ok) {
      throw new Error(`Failed to load markdown: ${response.status}`)
    }

    const markdown = (await response.text()).replace(/^\uFEFF/, '')

    await navigator.clipboard.writeText(markdown)
    copied.value = true
    copyFailed.value = false
  } catch {
    copied.value = false
    copyFailed.value = true
  }

  window.setTimeout(() => {
    copied.value = false
    copyFailed.value = false
  }, 1500)
}
</script>

<template>
  <div v-if="shouldShow" class="markdown-link-tools">
    <button
      type="button"
      class="markdown-link-tools__button"
      :class="{ 'is-copied': copied, 'is-error': copyFailed }"
      @click="copyMarkdown"
    >
      {{ buttonLabel }}
    </button>
  </div>
</template>
