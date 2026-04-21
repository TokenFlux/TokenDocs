import { describe, expect, it } from 'vitest'
import {
  CODE_BLOCK_COLLAPSE_HEIGHT,
  getCodeBlockToggleLabel,
  shouldEnableCodeBlockCollapse,
} from '../docs/.vitepress/theme/utils/codeBlockFolding.js'

describe('code block folding', () => {
  it('only enables folding above the global height', () => {
    expect(shouldEnableCodeBlockCollapse(CODE_BLOCK_COLLAPSE_HEIGHT)).toBe(false)
    expect(shouldEnableCodeBlockCollapse(CODE_BLOCK_COLLAPSE_HEIGHT + 2)).toBe(true)
  })

  it('exposes the correct toggle labels', () => {
    expect(getCodeBlockToggleLabel(true)).toBe('展开代码')
    expect(getCodeBlockToggleLabel(false)).toBe('收起代码')
  })
})
