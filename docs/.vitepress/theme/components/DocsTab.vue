<script setup>
import { computed, inject } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
})

const tabs = inject('docs-tabs', null)

const tabName = computed(() => props.name || props.title)
const isActive = computed(() => tabs?.activeTab.value === tabName.value)
</script>

<template>
  <div
    v-show="isActive"
    :id="tabs?.panelId(tabName)"
    class="docs-tab"
    role="tabpanel"
    :aria-labelledby="tabs?.tabId(tabName)"
    tabindex="0"
  >
    <slot />
  </div>
</template>

<style scoped>
.docs-tab,
.docs-tab :deep([id]) {
  scroll-margin-top: calc(var(--vp-nav-height, 64px) + 48px);
}

.docs-tab :deep(:first-child) {
  margin-top: 0;
}
</style>
