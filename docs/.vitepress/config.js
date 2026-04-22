import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { navItems, sidebar, siteDescription, siteTitle } from './site.js'
import {
  DEFAULT_SITE_URL,
  addUtf8Bom,
  buildMarkdownLinkMap,
  buildMarkdownRequestMap,
  buildMarkdownSitemap,
  getMarkdownAliasPath,
  getMarkdownOutputPaths,
  getMarkdownUrl,
  rewriteAbsoluteMarkdownLinks,
  shouldServeMarkdownArtifact,
  stripBasePath,
  withBasePath,
} from './utils/markdownArtifacts.js'

const base = process.env.VITEPRESS_BASE ?? '/'
const siteUrl = process.env.VITEPRESS_SITE_URL ?? DEFAULT_SITE_URL
const vitepressRoot = dirname(fileURLToPath(import.meta.url))
const docsRoot = resolve(vitepressRoot, '..')

async function listMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const markdownFiles = []

  for (const entry of entries) {
    if (entry.name === '.vitepress' || entry.name === 'public') {
      continue
    }

    const entryPath = resolve(directory, entry.name)

    if (entry.isDirectory()) {
      markdownFiles.push(...await listMarkdownFiles(entryPath))
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      markdownFiles.push(entryPath)
    }
  }

  return markdownFiles
}

async function getMarkdownCatalog() {
  const markdownFiles = await listMarkdownFiles(docsRoot)
  const relativePaths = markdownFiles.map(filePath => relative(docsRoot, filePath))

  return {
    markdownFiles,
    relativePaths,
    requestMap: buildMarkdownRequestMap(relativePaths),
  }
}

function getRequestSiteUrl(req) {
  const protocol = req.headers['x-forwarded-proto']?.split(',')[0] ?? 'http'
  const host = req.headers.host ?? 'localhost'
  const basePath = base === '/' ? '' : base.replace(/\/$/, '')

  return `${protocol}://${host}${basePath}`
}

function registerMarkdownArtifactMiddleware(server) {
  server.middlewares.use(async (req, res, next) => {
    if (!shouldServeMarkdownArtifact(req.url, req.headers)) {
      next()
      return
    }

    const pathname = stripBasePath(new URL(req.url, 'http://localhost').pathname, base)

    const { relativePaths, requestMap } = await getMarkdownCatalog()
    const requestSiteUrl = getRequestSiteUrl(req)

    if (pathname === '/sitemap.xml') {
      const sitemap = buildMarkdownSitemap(
        relativePaths.map(relativePath => getMarkdownUrl(relativePath, requestSiteUrl))
      )

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/xml; charset=utf-8')
      res.setHeader('Cache-Control', 'no-cache')
      res.end(sitemap, 'utf8')
      return
    }

    const relativePath = requestMap.get(pathname)

    if (!relativePath) {
      next()
      return
    }

    const markdownLinkMap = buildMarkdownLinkMap(relativePaths, requestSiteUrl)
    const fileContent = await readFile(resolve(docsRoot, relativePath), 'utf8')
    const markdownContent = addUtf8Bom(
      rewriteAbsoluteMarkdownLinks(fileContent, requestSiteUrl, markdownLinkMap)
    )

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache')
    res.end(markdownContent, 'utf8')
  })
}

export default defineConfig({
  lang: 'zh-CN',
  title: siteTitle,
  description: siteDescription,
  base,
  head: [['link', { rel: 'icon', href: withBasePath(base, '/favicon.jpg') }]],
  themeConfig: {
    nav: navItems,
    search: {
      provider: 'local',
    },
    sidebar,
  },
  vite: {
    plugins: [
      {
        name: 'markdown-artifacts-dev-server',
        configureServer(server) {
          registerMarkdownArtifactMiddleware(server)
        },
        configurePreviewServer(server) {
          registerMarkdownArtifactMiddleware(server)
        },
      },
    ],
  },
  transformPageData(pageData) {
    const pageTitle = pageData.params?.pageTitle
    const markdownPath = getMarkdownAliasPath(pageData.relativePath)

    if (pageTitle) {
      pageData.title = pageTitle
    }

    pageData.frontmatter ??= {}
    pageData.frontmatter.title ??= pageData.title
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push([
      'link',
      {
        rel: 'alternate',
        type: 'text/markdown',
        href: withBasePath(base, markdownPath),
      },
    ])
  },
  async buildEnd(siteConfig) {
    const outDir = resolve(docsRoot, siteConfig.outDir)
    const { markdownFiles, relativePaths } = await getMarkdownCatalog()
    const markdownLinkMap = buildMarkdownLinkMap(relativePaths, siteUrl)
    const markdownUrls = []

    for (const [index, filePath] of markdownFiles.entries()) {
      const relativePath = relativePaths[index]
      const fileContent = await readFile(filePath, 'utf8')
      const markdownContent = addUtf8Bom(
        rewriteAbsoluteMarkdownLinks(fileContent, siteUrl, markdownLinkMap)
      )

      for (const outputPath of getMarkdownOutputPaths(relativePath)) {
        const destinationPath = resolve(outDir, outputPath)

        await mkdir(dirname(destinationPath), { recursive: true })
        await writeFile(destinationPath, markdownContent)
      }

      markdownUrls.push(getMarkdownUrl(relativePath, siteUrl))
    }

    await writeFile(resolve(outDir, 'sitemap.xml'), buildMarkdownSitemap(markdownUrls))
  },
})
