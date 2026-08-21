import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { enSidebar, sidebar } from '../docs/.vitepress/site.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docsRoot = resolve(projectRoot, 'docs')
const publicRoot = resolve(docsRoot, 'public')

// 构建期生成的产物，仓库里没有对应源文件。
const generatedPaths = new Set(['/sitemap.xml', '/markdown-sitemap.xml'])

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

// 去掉围栏代码块，避免把示例里的链接和注释当成真实内容。
function stripFencedCode(markdown) {
  return markdown.replace(/^([ \t]*)(`{3,}|~{3,})[^\n]*\n[\s\S]*?\n\1\2[^\n]*$/gm, '')
}

// 与 @mdit-vue/shared 的 slugify 保持一致，VitePress 用它生成标题锚点。
function slugify(text) {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036F]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^(\d)/, '_$1')
}

function toPlainText(heading) {
  return heading
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_]{2,3}([^*_]+)[*_]{2,3}/g, '$1')
    .trim()
}

function collectAnchors(markdown) {
  const anchors = new Set()
  const seen = new Map()

  for (const match of stripFencedCode(markdown).matchAll(/^#{1,6}[ \t]+(.+?)[ \t]*#*$/gm)) {
    const base = slugify(toPlainText(match[1]))

    if (!base) {
      continue
    }

    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    anchors.add(count === 0 ? base : `${base}-${count}`)
  }

  return anchors
}

function collectLinks(markdown) {
  const body = stripFencedCode(markdown)
  const links = []

  for (const match of body.matchAll(/\[[^\]]*\]\((\/[^)\s"]*)\)/g)) {
    links.push(match[1])
  }

  for (const match of body.matchAll(/<img[^>]+src="(\/[^"]+)"/g)) {
    links.push(match[1])
  }

  return links
}

// 把站点路径映射回仓库里的源文件。
function resolveSourceFile(pathname) {
  if (pathname.startsWith('/images/')) {
    return resolve(publicRoot, pathname.slice(1))
  }

  if (pathname.endsWith('/')) {
    return resolve(docsRoot, `${pathname.slice(1)}index.md`)
  }

  return resolve(docsRoot, `${pathname.slice(1)}.md`)
}

const markdownFiles = listMarkdownFiles()
const anchorsByFile = new Map(
  markdownFiles.map(file => [file, collectAnchors(readFileSync(resolve(docsRoot, file), 'utf8'))]),
)

describe('internal links', () => {
  it('resolves every internal link to a real page or asset', () => {
    const broken = []

    for (const file of markdownFiles) {
      const markdown = readFileSync(resolve(docsRoot, file), 'utf8')

      for (const link of collectLinks(markdown)) {
        const [pathname] = link.split('#')

        if (generatedPaths.has(pathname)) {
          continue
        }

        if (!existsSync(resolveSourceFile(pathname))) {
          broken.push(`${file} -> ${link}`)
        }
      }
    }

    expect(broken).toEqual([])
  })

  it('resolves every link anchor to a real heading', () => {
    const broken = []

    for (const file of markdownFiles) {
      const markdown = readFileSync(resolve(docsRoot, file), 'utf8')

      for (const link of collectLinks(markdown)) {
        const [pathname, anchor] = link.split('#')

        if (!anchor || generatedPaths.has(pathname)) {
          continue
        }

        const targetFile = relative(docsRoot, resolveSourceFile(pathname)).replace(/\\/g, '/')
        const anchors = anchorsByFile.get(targetFile)

        if (anchors && !anchors.has(anchor)) {
          broken.push(`${file} -> ${link}`)
        }
      }
    }

    expect(broken).toEqual([])
  })

  it('points every sidebar entry at an existing page', () => {
    const entries = [...Object.values(sidebar).flat(), ...Object.values(enSidebar).flat()].flatMap(
      group => group.items.map(item => item.link),
    )

    const broken = entries.filter(link => !existsSync(resolveSourceFile(link)))

    expect(broken).toEqual([])
  })
})
