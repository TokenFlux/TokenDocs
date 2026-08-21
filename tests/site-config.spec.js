import { describe, expect, it } from 'vitest'
import config from '../docs/.vitepress/config.js'

function getSidebarLinks(sidebar, basePath) {
  return sidebar[basePath].flatMap(group => group.items.map(item => item.link))
}

describe('site config', () => {
  it('uses configured base and local search', () => {
    expect(config.base).toBe(process.env.VITEPRESS_BASE ?? '/')
    expect(config.head).toContainEqual([
      'link',
      { rel: 'icon', href: `${config.base.replace(/\/$/, '')}/favicon.jpg` || '/favicon.jpg' },
    ])
    expect(config.themeConfig.search.provider).toBe('local')
  })

  it('configures Chinese and English locales', () => {
    expect(config.locales.root.lang).toBe('zh-CN')
    expect(config.locales.en.lang).toBe('en-US')
    expect(config.locales.en.link).toBe('/en/')
    expect(config.locales.root.themeConfig.search.provider).toBe('local')
    expect(config.locales.en.themeConfig.search.provider).toBe('local')
  })

  it('localises the Chinese theme chrome', () => {
    const { themeConfig } = config.locales.root

    expect(themeConfig.search.options.translations.button.buttonText).toBe('搜索文档')
    expect(themeConfig.docFooter).toEqual({ prev: '上一页', next: '下一页' })
    expect(themeConfig.outline.label).toBe('本页目录')
    expect(themeConfig.notFound.title).toBe('页面未找到')
  })

  it('enables last-updated timestamps and edit links for both locales', () => {
    expect(config.lastUpdated).toBe(true)

    for (const locale of [config.locales.root, config.locales.en]) {
      expect(locale.themeConfig.lastUpdated.text).toBeTruthy()
      expect(locale.themeConfig.editLink.pattern).toBe(
        'https://github.com/TokenFlux/TokenDocs/edit/main/docs/:path'
      )
    }
  })

  it('exposes build hooks for markdown artifacts', () => {
    expect(typeof config.buildEnd).toBe('function')
    expect(Array.isArray(config.vite?.plugins)).toBe(true)
  })

  it('exposes the primary navigation entries', () => {
    const navLinks = config.themeConfig.nav.map(item => item.link)
    const enNavLinks = config.locales.en.themeConfig.nav.map(item => item.link)

    expect(navLinks).toEqual(['/', '/docs/quickstart'])
    expect(enNavLinks).toEqual(['/en/', '/en/docs/quickstart'])
  })

  it('configures docs sidebar groups', () => {
    const rootLinks = getSidebarLinks(config.themeConfig.sidebar, '/docs/')
    const enLinks = getSidebarLinks(config.locales.en.themeConfig.sidebar, '/en/docs/')

    expect(rootLinks).toContain('/docs/quickstart')
    expect(rootLinks).toContain('/docs/agents/workbuddy')
    expect(rootLinks).toContain('/docs/tos/supported-countries')
    expect(enLinks).toContain('/en/docs/quickstart')
    expect(enLinks).toContain('/en/docs/agents/workbuddy')
    expect(enLinks).toContain('/en/docs/tos/supported-countries')
    expect(enLinks.every(link => link.startsWith('/en/docs/'))).toBe(true)
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
    expect(pageData.frontmatter.head).toContainEqual([
      'link',
      {
        rel: 'alternate',
        type: 'text/markdown',
        href: `${config.base.replace(/\/$/, '')}/docs/quickstart.md`,
      },
    ])

    const enPageData = {
      relativePath: 'en/docs/quickstart.md',
      frontmatter: {},
    }

    config.transformPageData(enPageData)

    expect(enPageData.frontmatter.head).toContainEqual([
      'link',
      {
        rel: 'alternate',
        type: 'text/markdown',
        href: `${config.base.replace(/\/$/, '')}/en/docs/quickstart.md`,
      },
    ])
  })
})
