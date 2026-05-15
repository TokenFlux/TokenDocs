import { describe, expect, it } from 'vitest'
import { readdirSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docsRoot = resolve(projectRoot, 'docs')

function listMarkdownFiles(directory) {
  return listMarkdownFilesFrom(directory, directory)
}

function listMarkdownFilesFrom(rootDirectory, directory) {
  const entries = readdirSync(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.name === '.vitepress' || entry.name === 'public' || entry.name === 'en') {
      continue
    }

    const entryPath = join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...listMarkdownFilesFrom(rootDirectory, entryPath))
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(relative(rootDirectory, entryPath).replace(/\\/g, '/'))
    }
  }

  return files.sort()
}

describe('i18n docs coverage', () => {
  it('mirrors every root markdown page into the English locale', () => {
    const rootFiles = listMarkdownFiles(docsRoot)
    const enFiles = listMarkdownFiles(resolve(docsRoot, 'en')).map(file => `en/${file}`)

    expect(enFiles).toEqual(rootFiles.map(file => `en/${file}`))
  })
})
