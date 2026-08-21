<script setup>
import DefaultTheme from 'vitepress/theme'
import MarkdownLinkTools from './components/MarkdownLinkTools.vue'
import { useCodeBlockFolding } from './composables/useCodeBlockFolding.js'

const { Layout: ThemeLayout } = DefaultTheme

useCodeBlockFolding()
</script>

<template>
  <ThemeLayout>
    <template #doc-before>
      <MarkdownLinkTools />
    </template>
  </ThemeLayout>
</template>
