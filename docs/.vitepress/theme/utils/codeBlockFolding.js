export const CODE_BLOCK_COLLAPSE_HEIGHT = 480
export const CODE_BLOCK_SELECTOR = '.vp-doc div[class*="language-"]'

export function shouldEnableCodeBlockCollapse(scrollHeight, maxHeight = CODE_BLOCK_COLLAPSE_HEIGHT) {
  return Number.isFinite(scrollHeight) && scrollHeight > maxHeight + 1
}

export function getCodeBlockToggleLabel(collapsed) {
  return collapsed ? '展开代码' : '收起代码'
}

function setCodeBlockCollapsed(block, button, collapsed) {
  block.classList.toggle('code-block-collapsed', collapsed)
  block.classList.toggle('code-block-expanded', !collapsed)
  button.textContent = getCodeBlockToggleLabel(collapsed)
  button.setAttribute('aria-expanded', String(!collapsed))
}

function createToggleButton(block) {
  const button = block.ownerDocument.createElement('button')

  button.type = 'button'
  button.className = 'code-fold-toggle'
  button.setAttribute('aria-label', '切换代码块展开状态')

  button.addEventListener('click', () => {
    const collapsed = block.classList.contains('code-block-collapsed')

    setCodeBlockCollapsed(block, button, !collapsed)
  })

  return button
}

export function enhanceCodeBlocks(root, maxHeight = CODE_BLOCK_COLLAPSE_HEIGHT) {
  if (!root?.querySelectorAll) {
    return
  }

  const blocks = root.querySelectorAll(CODE_BLOCK_SELECTOR)

  blocks.forEach((block) => {
    const pre = block.querySelector('pre')
    const existingButton = block.querySelector('.code-fold-toggle')

    existingButton?.remove()
    block.classList.remove('code-block-collapsible', 'code-block-collapsed', 'code-block-expanded')

    if (!pre || !shouldEnableCodeBlockCollapse(pre.scrollHeight, maxHeight)) {
      return
    }

    const button = createToggleButton(block)

    block.classList.add('code-block-collapsible')
    setCodeBlockCollapsed(block, button, true)
    block.appendChild(button)
  })
}
