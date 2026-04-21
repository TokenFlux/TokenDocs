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

const activeTab = inject('docs-tabs-active-tab', null)

const tabName = computed(() => props.name || props.title)
const isActive = computed(() => activeTab?.value === tabName.value)
</script>

<template>
  <div v-if="isActive" class="docs-tab" role="tabpanel">
    <slot />
  </div>
</template>

<style scoped>
.docs-tab :deep(:first-child) {
  margin-top: 0;
}
</style>
