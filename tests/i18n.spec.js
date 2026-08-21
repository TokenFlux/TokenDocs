import { describe, expect, it } from 'vitest'
import { readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { findOutOfSync, listSourceFiles, localeRoot } from '../scripts/i18n-manifest.js'

function listLocaleFiles(directory = localeRoot) {
  const files = []

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...listLocaleFiles(entryPath))
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(relative(localeRoot, entryPath).replace(/\\/g, '/'))
    }
  }

  return files.sort()
}

describe('i18n docs coverage', () => {
  it('mirrors every root markdown page into the English locale', () => {
    expect(listLocaleFiles()).toEqual(listSourceFiles())
  })

  it('keeps the English locale in sync with the Chinese source', () => {
    expect(findOutOfSync()).toEqual([])
  })
})
