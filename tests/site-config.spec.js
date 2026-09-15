import { describe, expect, it } from 'vitest'
import config from '../docs/.vitepress/config.js'

describe('site config', () => {
  it('exposes build hooks for markdown artifacts', () => {
    expect(typeof config.buildEnd).toBe('function')
    expect(Array.isArray(config.vite?.plugins)).toBe(true)
  })

  it('keeps the English sidebar aligned with the Chinese one', () => {
    const rootGroups = config.themeConfig.sidebar['/docs/']
    const enGroups = config.locales.en.themeConfig.sidebar['/en/docs/']

    expect(enGroups.map(group => group.items.map(item => item.link.replace('/en/', '/')))).toEqual(
      rootGroups.map(group => group.items.map(item => item.link)),
    )

    const links = rootGroups.flatMap(group => group.items.map(item => item.link))
    expect(new Set(links).size).toBe(links.length)
  })

  it('promotes dynamic page titles into page data', () => {
    const pageData = {
      relativePath: 'docs/quickstart.md',
      params: { pageTitle: 'List tokens' },
      frontmatter: {},
    }

    config.transformPageData(pageData)

    expect(pageData.title).toBe('List tokens')
    expect(pageData.frontmatter.title).toBe('List tokens')
  })
})
