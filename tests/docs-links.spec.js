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

  it('quickstart points readers to the CC-Switch docs', () => {
    const content = readDoc('docs/docs/quickstart.md')

    expect(content).toContain('/docs/tokenflux/create-apikey')
    expect(content).toContain('/docs/agents/cc-switch')
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
