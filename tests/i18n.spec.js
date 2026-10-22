import { describe, expect, it } from 'vitest'
import { readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsRoot = fileURLToPath(new URL('../docs/', import.meta.url))
const localeRoot = join(docsRoot, 'en')

// 只检查中英文页面覆盖，排除配置、静态资源和英文目录本身。
function listMarkdownFiles(directory, root = directory) {
  const files = []

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (['.vitepress', 'public', 'en'].includes(entry.name)) {
      continue
    }

    const entryPath = join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...listMarkdownFiles(entryPath, root))
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(relative(root, entryPath).replace(/\\/g, '/'))
    }
  }

  return files.sort()
}

describe('i18n docs coverage', () => {
  it('mirrors every root markdown page into the English locale', () => {
    expect(listMarkdownFiles(localeRoot)).toEqual(listMarkdownFiles(docsRoot))
  })
})
