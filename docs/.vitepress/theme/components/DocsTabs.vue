<script setup>
import { computed, provide, ref, useSlots } from 'vue'

const props = defineProps({
  defaultTab: {
    type: String,
    default: '',
  },
})

const slots = useSlots()

const tabDefs = computed(() => {
  const nodes = slots.default?.() ?? []

  return nodes
    .map((node) => {
      const title = node.props?.title
      const name = node.props?.name ?? title

      if (!title || !name) {
        return null
      }

      return {
        title: String(title),
        name: String(name),
      }
    })
    .filter(Boolean)
})

const initialTab = computed(() => {
  if (props.defaultTab && tabDefs.value.some(tab => tab.name === props.defaultTab)) {
    return props.defaultTab
  }

  return tabDefs.value[0]?.name ?? ''
})

const activeTab = ref('')

if (!activeTab.value) {
  activeTab.value = initialTab.value
}

provide('docs-tabs-active-tab', activeTab)
</script>

<template>
  <div class="docs-tabs">
    <div class="docs-tabs__nav" role="tablist" aria-label="Platform tabs">
      <button
        v-for="tab in tabDefs"
        :key="tab.name"
        class="docs-tabs__button"
        :class="{ 'docs-tabs__button--active': activeTab === tab.name }"
        type="button"
        role="tab"
        :aria-selected="activeTab === tab.name"
        @click="activeTab = tab.name"
      >
        {{ tab.title }}
      </button>
    </div>

    <div class="docs-tabs__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.docs-tabs {
  margin: 1.5rem 0;
}

.docs-tabs__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.docs-tabs__button {
  padding: 0.5rem 0;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;
  margin-bottom: -1px;
}

.docs-tabs__button:hover {
  color: var(--vp-c-text-1);
}

.docs-tabs__button--active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}

.docs-tabs__content {
  padding-top: 1rem;
}
</style>
