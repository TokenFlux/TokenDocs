// 记录每篇英文文档是对照哪一版中文原文翻译的。
//
// 中文改了而英文没跟上时，`pnpm test` 会失败。补完英文后运行
// `pnpm i18n:sync` 重新记录，CI 才会通过。
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

export const manifestPath = resolve(projectRoot, 'i18n-manifest.json')
export const docsRoot = resolve(projectRoot, 'docs')
export const localeRoot = resolve(docsRoot, 'en')

export function listSourceFiles(directory = docsRoot) {
  const files = []

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.vitepress' || entry.name === 'public' || entry.name === 'en') {
      continue
    }

    const entryPath = join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...listSourceFiles(entryPath))
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(relative(docsRoot, entryPath).replace(/\\/g, '/'))
    }
  }

  return files.sort()
}

export function hashSource(relativePath) {
  const content = readFileSync(resolve(docsRoot, relativePath), 'utf8')
    .replace(/\r\n/g, '\n')
    .trimEnd()

  return createHash('sha256').update(content).digest('hex').slice(0, 16)
}

export function readManifest() {
  try {
    return JSON.parse(readFileSync(manifestPath, 'utf8'))
  } catch {
    return {}
  }
}

export function buildManifest() {
  return Object.fromEntries(listSourceFiles().map(file => [file, hashSource(file)]))
}

/**
 * 返回英文版未跟上中文原文的条目。
 */
export function findOutOfSync() {
  const manifest = readManifest()
  const sourceFiles = listSourceFiles()
  const drifted = []

  for (const file of sourceFiles) {
    const recorded = manifest[file]
    const current = hashSource(file)

    if (!recorded) {
      drifted.push(`${file} 未登记，请翻译 en/${file} 后运行 pnpm i18n:sync`)
      continue
    }

    if (recorded !== current) {
      drifted.push(`${file} 已修改，请同步 en/${file} 后运行 pnpm i18n:sync`)
    }
  }

  for (const file of Object.keys(manifest)) {
    if (!sourceFiles.includes(file)) {
      drifted.push(`${file} 已不存在，请运行 pnpm i18n:sync 清理登记`)
    }
  }

  return drifted
}

function main() {
  const manifest = buildManifest()

  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(
    `已登记 ${Object.keys(manifest).length} 篇文档 -> ${relative(projectRoot, manifestPath)}`,
  )
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main()
}
