<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, page } = useData()

const isEnglishPage = computed(() => page.value.relativePath.startsWith('en/'))
const label = computed(() => (isEnglishPage.value ? 'Last verified: ' : '最近核验：'))

// frontmatter 里的日期若未加引号，YAML 会解析成 Date，渲染出完整时间戳。
// 这里统一截到日期部分，两种写法都能正确显示。
const verifiedAt = computed(() => {
  const value = frontmatter.value.verifiedAt

  if (!value) {
    return ''
  }

  return String(value instanceof Date ? value.toISOString() : value).slice(0, 10)
})
</script>

<template>
  <p v-if="verifiedAt" class="doc-verified-at">
    {{ label }}<time :datetime="verifiedAt">{{ verifiedAt }}</time>
  </p>
</template>
