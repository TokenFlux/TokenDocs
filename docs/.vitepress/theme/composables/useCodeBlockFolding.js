import { useData, useRoute } from 'vitepress'
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { enhanceCodeBlocks } from '../utils/codeBlockFolding.js'

/**
 * 为超高代码块挂上折叠按钮。
 *
 * 这里刻意做成组合式函数而不是组件：组件的模板是空的，服务端渲染时不输出
 * 任何内容，客户端却会为它建一个注释占位节点，注水时两侧对不上，控制台会
 * 报 "Hydration completed but contains mismatches"。改由 Layout 在 setup
 * 中调用后不再产生多余节点，Layout 也回到单根。
 */
export function useCodeBlockFolding() {
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
}
