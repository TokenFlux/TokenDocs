<script setup>
import DefaultTheme from 'vitepress/theme'
import CodeBlockFolding from './components/CodeBlockFolding.vue'

const { Layout: ThemeLayout } = DefaultTheme
</script>

<template>
  <ThemeLayout />
  <CodeBlockFolding />
</template>
