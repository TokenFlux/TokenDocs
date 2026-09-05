import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

function inferenceExamples(locale) {
  const content = readFileSync(
    new URL(`../docs/${locale}docs/troubleshooting.md`, import.meta.url),
    'utf8',
  )
  return [...content.matchAll(/```bash\n([\s\S]*?)```/g)]
    .map(match => match[1])
    .filter(command => command.includes("-d '"))
    .map(command => ({
      command,
      endpoint: command.match(/https:\/\/tokenflux\.dev(\S+)/)[1],
      body: JSON.parse(command.match(/-d '([^']+)'/)[1]),
    }))
}

describe('troubleshooting inference examples', () => {
  for (const locale of ['', 'en/']) {
    it(`provides complete non-streaming requests in ${locale || 'Chinese'}`, () => {
      const examples = inferenceExamples(locale)
      expect(examples.map(example => example.endpoint)).toEqual([
        '/v1/chat/completions',
        '/v1/responses',
        '/v1/messages',
      ])
      for (const { command, body } of examples) {
        expect(command).toContain('Content-Type: application/json')
        expect(command).toContain('$KEY')
        expect(body.model).toBe('MODEL_ID')
        expect(body.stream).toBe(false)
      }
      expect(examples[0].body.messages[0].role).toBe('user')
      expect(examples[1].body.input).toBeTruthy()
      expect(examples[2].body.messages[0].role).toBe('user')
      expect(examples[2].body.max_tokens).toBeGreaterThan(0)
      expect(examples[2].command).toContain('anthropic-version: 2023-06-01')
      expect(examples[2].command).toContain('x-api-key: $KEY')
    })
  }

  it('keeps both locales on identical request examples', () => {
    expect(inferenceExamples('')).toEqual(inferenceExamples('en/'))
  })
})
