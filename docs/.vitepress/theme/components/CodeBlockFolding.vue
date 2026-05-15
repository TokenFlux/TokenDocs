<script setup>
import { useData, useRoute } from 'vitepress'
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { enhanceCodeBlocks } from '../utils/codeBlockFolding.js'

const route = useRoute()
const { page } = useData()

let frameId = 0

function refreshCodeBlocks() {
  if (typeof window === 'undefined') {
    return
  }

  cancelAnimationFrame(frameId)

  nextTick(() => {
    frameId = window.requestAnimationFrame(() => {
      const locale = page.value.relativePath.startsWith('en/') ? 'en' : 'zh'

      enhanceCodeBlocks(document, undefined, locale)
    })
  })
}

function handleResize() {
  refreshCodeBlocks()
}

function handleClick(event) {
  if (event.target instanceof Element && event.target.closest('.docs-tabs__button')) {
    refreshCodeBlocks()
  }
}

onMounted(() => {
  refreshCodeBlocks()
  window.addEventListener('resize', handleResize)
  document.addEventListener('click', handleClick)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frameId)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', handleClick)
})

watch(() => route.path, () => {
  refreshCodeBlocks()
})
</script>

<template />
