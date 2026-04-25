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

  it('faq page exists', () => {
    const content = readDoc('docs/docs/faq.md')

    expect(content).toContain('# FAQ')
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

  it('rikkahub page covers Android install and TokenFlux setup', () => {
    const content = readDoc('docs/docs/chatbot/rikkahub.md')

    expect(content).toContain('# RikkaHub 使用指南')
    expect(content).toContain('仅支持 Android')
    expect(content).toContain('不支持 iOS')
    expect(content).toContain('/docs/tokenflux/create-apikey')
    expect(content).toContain('Base URL: https://tokenflux.dev/v1')
    expect(content).toContain('/docs/tokenflux/billing')
  })

  it('quickstart points readers to the CC-Switch docs', () => {
    const content = readDoc('docs/docs/quickstart.md')

    expect(content).toContain('/docs/tokenflux/create-apikey')
    expect(content).toContain('/docs/agents/cc-switch')
    expect(content).toContain('/docs/agents/hermes')
    expect(content).toContain('/docs/agents/opencode')
    expect(content).toContain('支持 `Claude Code`、`Codex`、`Hermes` 和 `OpenCode`')
    expect(content).toContain('/markdown-sitemap.xml')
  })

  it('agents hermes page points to API key creation and local config files', () => {
    const content = readDoc('docs/docs/agents/hermes.md')

    expect(content).toContain('# Hermes 使用指南')
    expect(content).toContain('/docs/tokenflux/create-apikey')
    expect(content).toContain('~/.hermes/config.yaml')
    expect(content).toContain('~/.hermes/.env')
    expect(content).toContain('https://tokenflux.dev/v1')
    expect(content).toContain('hermes config check')
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
    expect(content).toContain('`OpenCode`')
    expect(content).toContain('/docs/agents/opencode')
  })

  it('agents codex page points to API key and CC-Switch setup paths', () => {
    const content = readDoc('docs/docs/agents/codex.md')

    expect(content).toContain('/docs/tokenflux/create-apikey')
    expect(content).toContain('/docs/agents/cc-switch')
    expect(content).toContain('npx @openai/codex')
    expect(content).toContain('base_url = "https://tokenflux.dev/v1"')
    expect(content).toContain('"OPENAI_API_KEY": "YOUR_TOKENFLUX_API_KEY"')
    expect(content).toContain('VSCode 或 Zed 中使用 `Codex`')
    expect(content).toContain('config.toml')
    expect(content).toContain('auth.json')
  })

  it('agents claude code page explains editor global config behavior', () => {
    const content = readDoc('docs/docs/agents/claude-code.md')

    expect(content).toContain('# Claude Code 使用指南')
    expect(content).toContain('VSCode 或 Zed 中使用 `Claude Code`')
    expect(content).toContain('ANTHROPIC_BASE_URL="https://tokenflux.dev"')
    expect(content).toContain('settings.json')
  })
})
