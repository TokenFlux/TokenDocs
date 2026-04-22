import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function readDoc(relativePath) {
  return readFileSync(resolve(projectRoot, relativePath), 'utf8')
}

describe('docs cross-links', () => {
  it('referral page exists as a placeholder', () => {
    const content = readDoc('docs/docs/tokenflux/referral.md')

    expect(content).toContain('# 邀请返利')
  })

  it('billing page exists as a placeholder', () => {
    const content = readDoc('docs/docs/tokenflux/billing.md')

    expect(content).toContain('# 计费说明')
  })

  it('faq points image generation users to Cherry Studio', () => {
    const content = readDoc('docs/docs/faq.md')

    expect(content).toContain('# FAQ')
    expect(content).toContain('生图')
    expect(content).toContain('/docs/chatbot/cherry-studio')
  })

  it('usage policy page exists and covers core restrictions', () => {
    const content = readDoc('docs/docs/tos/usage-policy.md')

    expect(content).toContain('# 使用政策')
    expect(content).toContain('不得将 TokenFlux 作为唯一依据')
    expect(content).not.toContain('## 相关链接')
  })

  it('cherry studio page covers install and TokenFlux setup', () => {
    const content = readDoc('docs/docs/chatbot/cherry-studio.md')

    expect(content).toContain('# Cherry Studio 使用指南')
    expect(content).toContain('<DocsTabs default-tab="windows">')
    expect(content).toContain('/docs/tokenflux/create-apikey')
    expect(content).toContain('API 地址 `https://tokenflux.dev`')
    expect(content).toContain('gpt-5.4-mini')
    expect(content).toContain('/images/cherry-studio/provider-type-selection.png')
    expect(content).toContain('/images/cherry-studio/provider-config-fields.png')
  })

  it('quickstart points readers to the CC-Switch docs', () => {
    const content = readDoc('docs/docs/quickstart.md')

    expect(content).toContain('/docs/tokenflux/create-apikey')
    expect(content).toContain('/docs/agents/cc-switch')
    expect(content).toContain('/sitemap.xml')
  })

  it('theme exposes markdown copy controls', () => {
    const content = readDoc('docs/.vitepress/theme/components/MarkdownLinkTools.vue')

    expect(content).toContain('复制 Markdown')
    expect(content).not.toContain('查看 Markdown')
  })

  it('cc-switch entry page points to API key creation and manual setup content', () => {
    const content = readDoc('docs/docs/agents/cc-switch.md')

    expect(content).toContain('/docs/tokenflux/create-apikey')
    expect(content).toContain('API 地址: https://tokenflux.dev')
    expect(content).toContain('API Key: 你的 TokenFlux API Key')
  })

  it('agents codex page points to API key and CC-Switch setup paths', () => {
    const content = readDoc('docs/docs/agents/codex.md')

    expect(content).toContain('/docs/tokenflux/create-apikey')
    expect(content).toContain('/docs/agents/cc-switch')
    expect(content).toContain('npx @openai/codex')
    expect(content).toContain('base_url = "https://tokenflux.dev/v1"')
    expect(content).toContain('"OPENAI_API_KEY": "YOUR_TOKENFLUX_API_KEY"')
    expect(content).toContain('config.toml')
    expect(content).toContain('auth.json')
  })
})
