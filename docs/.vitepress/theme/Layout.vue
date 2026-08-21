<script setup>
import DefaultTheme from 'vitepress/theme'
import MarkdownLinkTools from './components/MarkdownLinkTools.vue'
import VerifiedAt from './components/VerifiedAt.vue'
import { useCodeBlockFolding } from './composables/useCodeBlockFolding.js'

const { Layout: ThemeLayout } = DefaultTheme

useCodeBlockFolding()
</script>

<template>
  <ThemeLayout>
    <template #doc-before>
      <div class="doc-meta">
        <VerifiedAt />
        <MarkdownLinkTools />
      </div>
    </template>
  </ThemeLayout>
</template>
