import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  ALLOWED_EXTERNAL_HOSTS,
  ANTHROPIC_BASE_URL,
  APP_ORIGIN,
  APP_PATHS,
  CONSOLE_URL,
  DEPRECATED_ORIGINS,
  DEPRECATED_ORIGIN_ALLOWED_IN,
  MODELS_URL,
  NON_MODEL_IDENTIFIERS,
  OPENAI_BASE_URL,
  SAMPLE_MODEL_IDS,
  SINGLE_SOURCE_FACTS,
} from '../docs/.vitepress/constants.js'
import { enNavItems, navItems } from '../docs/.vitepress/site.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docsRoot = resolve(projectRoot, 'docs')

function listMarkdownFiles(directory = docsRoot) {
  const files = []

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.vitepress' || entry.name === 'public') {
      continue
    }

    const entryPath = join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...listMarkdownFiles(entryPath))
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(relative(docsRoot, entryPath).replace(/\\/g, '/'))
    }
  }

  return files.sort()
}

const markdownFiles = listMarkdownFiles()
const documents = markdownFiles.map(file => ({
  file,
  content: readFileSync(resolve(docsRoot, file), 'utf8'),
}))

const MODEL_ID_PATTERN =
  /\b(?:gpt|claude|gemini|grok|deepseek)-[a-z0-9][a-z0-9.]*(?:-[a-z0-9.]+)*\b/g

describe('documented constants', () => {
  it('only links to registered application paths', () => {
    const unknown = []

    for (const { file, content } of documents) {
      for (const match of content.matchAll(/https:\/\/tokenflux\.dev([a-zA-Z0-9/_.-]*)/g)) {
        const path = match[1] === '' ? '/' : match[1].replace(/[.]$/, '')

        if (!APP_PATHS.includes(path)) {
          unknown.push(`${file} -> ${APP_ORIGIN}${match[1]}`)
        }
      }
    }

    expect([...new Set(unknown)]).toEqual([])
  })

  it('confines deprecated origins to the migration notes', () => {
    const strays = []

    for (const { file, content } of documents) {
      if (DEPRECATED_ORIGIN_ALLOWED_IN.includes(file)) {
        continue
      }

      for (const origin of DEPRECATED_ORIGINS) {
        if (content.includes(origin)) {
          strays.push(`${file} -> ${origin}`)
        }
      }
    }

    expect(strays).toEqual([])
  })

  it('only links to allowed external hosts', () => {
    const unknown = []

    for (const { file, content } of documents) {
      for (const match of content.matchAll(/https?:\/\/([a-zA-Z0-9.-]+)/g)) {
        if (!ALLOWED_EXTERNAL_HOSTS.includes(match[1])) {
          unknown.push(`${file} -> ${match[1]}`)
        }
      }
    }

    expect([...new Set(unknown)]).toEqual([])
  })

  it('only uses registered sample model ids', () => {
    const unknown = []

    for (const { file, content } of documents) {
      for (const match of content.matchAll(MODEL_ID_PATTERN)) {
        const id = match[0]

        if (!/\d/.test(id) || NON_MODEL_IDENTIFIERS.includes(id)) {
          continue
        }

        if (!SAMPLE_MODEL_IDS.includes(id)) {
          unknown.push(`${file} -> ${id}`)
        }
      }
    }

    expect([...new Set(unknown)]).toEqual([])
  })

  it('keeps volatile facts to a single source per locale', () => {
    const scattered = []

    for (const { name, pattern, maxFiles } of SINGLE_SOURCE_FACTS) {
      const matcher = new RegExp(pattern)
      const files = documents.filter(doc => matcher.test(doc.content)).map(doc => doc.file)

      if (files.length > maxFiles) {
        scattered.push(`${name} 出现在 ${files.length} 个文件（上限 ${maxFiles}）：${files.join(', ')}`)
      }
    }

    expect(scattered).toEqual([])
  })

  it('documents the base urls that the constants declare', () => {
    const endpoints = documents.find(doc => doc.file === 'docs/tokenflux/endpoints.md')

    expect(endpoints.content).toContain(OPENAI_BASE_URL)
    expect(endpoints.content).toContain(ANTHROPIC_BASE_URL)
  })

  it('keeps navigation links in step with the constants', () => {
    for (const nav of [navItems, enNavItems]) {
      const links = nav.map(item => item.link)

      expect(links).toContain(MODELS_URL)
      expect(links).toContain(CONSOLE_URL)
    }
  })
})
