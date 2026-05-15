export const CODE_BLOCK_COLLAPSE_HEIGHT = 480
export const CODE_BLOCK_SELECTOR = '.vp-doc div[class*="language-"]'

export function shouldEnableCodeBlockCollapse(scrollHeight, maxHeight = CODE_BLOCK_COLLAPSE_HEIGHT) {
  return Number.isFinite(scrollHeight) && scrollHeight > maxHeight + 1
}

export function getCodeBlockToggleLabel(collapsed, locale = 'zh') {
  if (locale === 'en') {
    return collapsed ? 'Expand code' : 'Collapse code'
  }

  return collapsed ? '展开代码' : '收起代码'
}

export function getCodeBlockToggleAriaLabel(locale = 'zh') {
  return locale === 'en' ? 'Toggle code block expansion' : '切换代码块展开状态'
}

function setCodeBlockCollapsed(block, button, collapsed, locale) {
  block.classList.toggle('code-block-collapsed', collapsed)
  block.classList.toggle('code-block-expanded', !collapsed)
  button.textContent = getCodeBlockToggleLabel(collapsed, locale)
  button.setAttribute('aria-expanded', String(!collapsed))
}

function createToggleButton(block, locale) {
  const button = block.ownerDocument.createElement('button')

  button.type = 'button'
  button.className = 'code-fold-toggle'
  button.setAttribute('aria-label', getCodeBlockToggleAriaLabel(locale))

  button.addEventListener('click', () => {
    const collapsed = block.classList.contains('code-block-collapsed')

    setCodeBlockCollapsed(block, button, !collapsed, locale)
  })

  return button
}

export function enhanceCodeBlocks(root, maxHeight = CODE_BLOCK_COLLAPSE_HEIGHT, locale = 'zh') {
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

    const button = createToggleButton(block, locale)

    block.classList.add('code-block-collapsible')
    setCodeBlockCollapsed(block, button, true, locale)
    block.appendChild(button)
  })
}
