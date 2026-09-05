<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, useSlots } from 'vue'

const props = defineProps({
  defaultTab: { type: String, default: '' },
  id: { type: String, default: '' },
  label: { type: String, default: '' },
})

const slots = useSlots()
const root = ref(null)
const tabDefs = computed(() => {
  const nodes = slots.default?.() ?? []
  return nodes.flatMap(node => {
    const title = node.props?.title
    const name = node.props?.name ?? title
    return title && name ? [{ title: String(title), name: String(name) }] : []
  })
})
const initialTab = computed(() =>
  tabDefs.value.some(tab => tab.name === props.defaultTab)
    ? props.defaultTab
    : (tabDefs.value[0]?.name ?? ''),
)
const activeTab = ref(initialTab.value)
const groupId = computed(() => props.id || tabDefs.value[0]?.name || 'options')
const panelId = name => `tab-${groupId.value}-${name}`
const tabId = name => `${panelId(name)}-label`

provide('docs-tabs', { activeTab, panelId, tabId })

function selectTab(name) {
  activeTab.value = name
  const url = new URL(window.location.href)
  url.hash = panelId(name)
  window.history.pushState(window.history.state, '', url)
}

function onKeydown(event, index) {
  const count = tabDefs.value.length
  let next
  switch (event.key) {
    case 'ArrowRight':
      next = (index + 1) % count
      break
    case 'ArrowLeft':
      next = (index - 1 + count) % count
      break
    case 'Home':
      next = 0
      break
    case 'End':
      next = count - 1
      break
    default:
      return
  }
  event.preventDefault()
  selectTab(tabDefs.value[next].name)
  root.value.querySelectorAll('[role="tab"]')[next].focus()
}

// Hidden panels remain in the DOM so heading links can reveal their owning tab.
async function restoreHash() {
  let id
  try {
    id = decodeURIComponent(window.location.hash.slice(1))
  } catch {
    return
  }
  if (!id) {
    activeTab.value = initialTab.value
    return
  }
  const target = document.getElementById(id)
  if (!target || !root.value?.contains(target)) return
  const panel = target.closest('[role="tabpanel"]')
  const tab = tabDefs.value.find(item => panelId(item.name) === panel?.id)
  if (!tab) return
  activeTab.value = tab.name
  await nextTick()
  target.scrollIntoView({ block: 'start' })
}

onMounted(() => {
  restoreHash()
  window.addEventListener('hashchange', restoreHash)
  window.addEventListener('popstate', restoreHash)
})
onBeforeUnmount(() => {
  window.removeEventListener('hashchange', restoreHash)
  window.removeEventListener('popstate', restoreHash)
})
</script>

<template>
  <div ref="root" class="docs-tabs">
    <div class="docs-tabs__nav" role="tablist" :aria-label="label || tabDefs[0]?.title">
      <button
        v-for="(tab, index) in tabDefs"
        :id="tabId(tab.name)"
        :key="tab.name"
        class="docs-tabs__button"
        :class="{ 'docs-tabs__button--active': activeTab === tab.name }"
        type="button"
        role="tab"
        :aria-selected="activeTab === tab.name"
        :aria-controls="panelId(tab.name)"
        :tabindex="activeTab === tab.name ? 0 : -1"
        @click="selectTab(tab.name)"
        @keydown="onKeydown($event, index)"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="docs-tabs__content"><slot /></div>
  </div>
</template>

<style scoped>
.docs-tabs {
  margin: 1.5rem 0;
}
.docs-tabs__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
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
  transition:
    color 0.2s ease,
    border-color 0.2s ease;
  margin-bottom: -1px;
}
.docs-tabs__button:hover {
  color: var(--vp-c-text-1);
}
.docs-tabs__button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}
.docs-tabs__button--active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}
.docs-tabs__content {
  padding-top: 1rem;
}
@media (prefers-reduced-motion: reduce) {
  .docs-tabs__button {
    transition: none;
  }
}
</style>
