<script setup>
import DefaultTheme from 'vitepress/theme'
import CodeBlockFolding from './components/CodeBlockFolding.vue'
import MarkdownLinkTools from './components/MarkdownLinkTools.vue'

const { Layout: ThemeLayout } = DefaultTheme
</script>

<template>
  <ThemeLayout>
    <template #doc-before>
      <MarkdownLinkTools />
    </template>
  </ThemeLayout>
  <CodeBlockFolding />
</template>
