import { describe, expect, it } from 'vitest'
import config from '../docs/.vitepress/config.js'

describe('site config', () => {
  it('uses configured base and local search', () => {
    expect(config.base).toBe(process.env.VITEPRESS_BASE ?? '/TokenDocs/')
    expect(config.themeConfig.search).toEqual({ provider: 'local' })
  })

  it('exposes the primary navigation entries', () => {
    const navTexts = config.themeConfig.nav.map(item => item.text)

    expect(navTexts).toEqual(['Home', 'Docs'])
  })

  it('configures docs sidebar groups', () => {
    expect(config.themeConfig.sidebar['/docs/'][0].items).toEqual([
      { text: 'Quickstart', link: '/docs/quickstart' },
      { text: 'FAQ', link: '/docs/faq' },
    ])

    expect(config.themeConfig.sidebar['/docs/'][1]).toEqual({
      text: 'TokenFlux',
      items: [
        { text: '创建 API Key', link: '/docs/tokenflux/create-apikey' },
        { text: '计费说明', link: '/docs/tokenflux/billing' },
        { text: '邀请返利', link: '/docs/tokenflux/referral' },
      ],
    })

    expect(config.themeConfig.sidebar['/docs/'][2]).toEqual({
      text: 'Agents',
      items: [
        { text: '概览', link: '/docs/agents/' },
        { text: 'CC-Switch', link: '/docs/agents/cc-switch' },
        { text: 'Claude Code', link: '/docs/agents/claude-code' },
        { text: 'Codex', link: '/docs/agents/codex' },
        { text: 'OpenCode', link: '/docs/agents/opencode' },
      ],
    })
  })

  it('promotes dynamic page titles into page data', () => {
    const pageData = {
      params: { pageTitle: 'List tokens' },
      frontmatter: {},
    }

    config.transformPageData(pageData)

    expect(pageData.title).toBe('List tokens')
    expect(pageData.frontmatter.title).toBe('List tokens')
  })
})
