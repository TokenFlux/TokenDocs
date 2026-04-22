import { describe, expect, it } from 'vitest'
import {
  UTF8_BOM,
  addUtf8Bom,
  buildMarkdownLinkMap,
  buildMarkdownRequestMap,
  buildMarkdownSitemap,
  getMarkdownAliasPath,
  getMarkdownOutputPaths,
  getMarkdownUrl,
  getRoutePath,
  rewriteAbsoluteMarkdownLinks,
  shouldServeMarkdownArtifact,
  stripBasePath,
  withBasePath,
} from '../docs/.vitepress/utils/markdownArtifacts.js'

describe('markdown artifacts', () => {
  it('maps VitePress pages to markdown-friendly routes', () => {
    expect(getRoutePath('index.md')).toBe('/')
    expect(getRoutePath('docs/quickstart.md')).toBe('/docs/quickstart')
    expect(getRoutePath('docs/agents/index.md')).toBe('/docs/agents/')
    expect(getMarkdownAliasPath('docs/quickstart.md')).toBe('/docs/quickstart.md')
    expect(getMarkdownAliasPath('docs/agents/index.md')).toBe('/docs/agents.md')
  })

  it('keeps source and alias markdown outputs when needed', () => {
    expect(getMarkdownOutputPaths('docs/quickstart.md')).toEqual(['docs/quickstart.md'])
    expect(getMarkdownOutputPaths('docs/agents/index.md')).toEqual([
      'docs/agents/index.md',
      'docs/agents.md',
    ])
  })

  it('maps request paths back to source markdown files', () => {
    const requestMap = buildMarkdownRequestMap(['index.md', 'docs/quickstart.md', 'docs/agents/index.md'])

    expect(requestMap.get('/index.md')).toBe('index.md')
    expect(requestMap.get('/docs/quickstart.md')).toBe('docs/quickstart.md')
    expect(requestMap.get('/docs/agents.md')).toBe('docs/agents/index.md')
    expect(stripBasePath('/TokenDocs/docs/quickstart.md', '/TokenDocs/')).toBe('/docs/quickstart.md')
  })

  it('skips markdown artifact responses for dev module requests', () => {
    expect(shouldServeMarkdownArtifact('/docs/quickstart.md')).toBe(true)
    expect(shouldServeMarkdownArtifact('/docs/quickstart.md?import')).toBe(false)
    expect(shouldServeMarkdownArtifact('/index.md', { 'sec-fetch-dest': 'script' })).toBe(false)
    expect(shouldServeMarkdownArtifact('/sitemap.xml')).toBe(true)
  })

  it('builds base-aware markdown links and sitemap entries', () => {
    expect(withBasePath('/TokenDocs/', '/docs/quickstart.md')).toBe('/TokenDocs/docs/quickstart.md')
    expect(getMarkdownUrl('docs/quickstart.md')).toBe('https://tokenflux.github.io/TokenDocs/docs/quickstart.md')
    expect(buildMarkdownSitemap(['https://tokenflux.github.io/TokenDocs/docs/quickstart.md'])).toContain(
      '<loc>https://tokenflux.github.io/TokenDocs/docs/quickstart.md</loc>'
    )
  })

  it('rewrites root-relative markdown links for exported files', () => {
    const content = '[Quickstart](/docs/quickstart)\n<img src="/images/example.png">'
    const markdownLinkMap = buildMarkdownLinkMap(['docs/quickstart.md'])
    const rewritten = rewriteAbsoluteMarkdownLinks(content, undefined, markdownLinkMap)

    expect(rewritten).toContain('(https://tokenflux.github.io/TokenDocs/docs/quickstart.md)')
    expect(rewritten).toContain('src="https://tokenflux.github.io/TokenDocs/images/example.png"')
  })

  it('adds a utf-8 bom for exported markdown files', () => {
    expect(addUtf8Bom('# 快速开始')).toBe(`${UTF8_BOM}# 快速开始`)
  })
})
