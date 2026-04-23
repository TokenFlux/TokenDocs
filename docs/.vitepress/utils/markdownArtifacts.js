export const DEFAULT_SITE_URL = 'https://docs.tokenflux.dev'
export const UTF8_BOM = '\uFEFF'

function toPosixPath(value) {
  return value.replace(/\\/g, '/')
}

export function normalizeRelativePath(relativePath) {
  return toPosixPath(relativePath)
}

export function normalizeSiteUrl(siteUrl = DEFAULT_SITE_URL) {
  return siteUrl.replace(/\/+$/, '')
}

export function getRoutePath(relativePath) {
  const normalizedPath = normalizeRelativePath(relativePath)

  if (normalizedPath === 'index.md') {
    return '/'
  }

  if (normalizedPath.endsWith('/index.md')) {
    return `/${normalizedPath.slice(0, -'index.md'.length)}`
  }

  return `/${normalizedPath.slice(0, -'.md'.length)}`
}

export function getMarkdownAliasPath(relativePath) {
  const routePath = getRoutePath(relativePath)

  if (routePath === '/') {
    return '/index.md'
  }

  return `${routePath.replace(/\/$/, '')}.md`
}

export function getMarkdownOutputPaths(relativePath) {
  const normalizedPath = normalizeRelativePath(relativePath)
  const outputPaths = [normalizedPath, getMarkdownAliasPath(normalizedPath).slice(1)]

  return [...new Set(outputPaths)]
}

export function buildMarkdownRequestMap(relativePaths) {
  const requestMap = new Map()

  for (const relativePath of relativePaths) {
    for (const outputPath of getMarkdownOutputPaths(relativePath)) {
      requestMap.set(`/${outputPath}`, normalizeRelativePath(relativePath))
    }
  }

  return requestMap
}

export function stripBasePath(pathname, base) {
  if (base === '/' || !pathname.startsWith(base)) {
    return pathname
  }

  return pathname.slice(base.length - 1) || '/'
}

export function shouldServeMarkdownArtifact(url, headers = {}) {
  if (!url) {
    return false
  }

  const parsedUrl = new URL(url, 'http://localhost')

  if (parsedUrl.search) {
    return false
  }

  const requestDestination = headers['sec-fetch-dest']

  if (requestDestination === 'script' || requestDestination === 'style' || requestDestination === 'worker') {
    return false
  }

  return parsedUrl.pathname === '/sitemap.xml' || parsedUrl.pathname.endsWith('.md')
}

export function withBasePath(base, path) {
  if (base === '/') {
    return path
  }

  return `${base.replace(/\/$/, '')}${path}`
}

export function getMarkdownUrl(relativePath, siteUrl = DEFAULT_SITE_URL) {
  return `${normalizeSiteUrl(siteUrl)}${getMarkdownAliasPath(relativePath)}`
}

export function buildMarkdownLinkMap(relativePaths, siteUrl = DEFAULT_SITE_URL) {
  const markdownLinkMap = new Map()

  for (const relativePath of relativePaths) {
    const routePath = getRoutePath(relativePath)
    const markdownUrl = getMarkdownUrl(relativePath, siteUrl)

    markdownLinkMap.set(routePath, markdownUrl)
    markdownLinkMap.set(routePath.replace(/\/$/, ''), markdownUrl)
  }

  markdownLinkMap.set('/', getMarkdownUrl('index.md', siteUrl))

  return markdownLinkMap
}

function rewriteUrl(url, siteUrl, markdownLinkMap) {
  if (!url.startsWith('/') || url.startsWith('//')) {
    return url
  }

  const separatorIndex = url.search(/[?#]/)
  const path = separatorIndex === -1 ? url : url.slice(0, separatorIndex)
  const suffix = separatorIndex === -1 ? '' : url.slice(separatorIndex)
  const markdownUrl = markdownLinkMap.get(path)

  if (markdownUrl) {
    return `${markdownUrl}${suffix}`
  }

  return `${normalizeSiteUrl(siteUrl)}${url}`
}

export function rewriteAbsoluteMarkdownLinks(content, siteUrl = DEFAULT_SITE_URL, markdownLinkMap = new Map()) {
  const normalizedSiteUrl = normalizeSiteUrl(siteUrl)

  return content
    .replace(/(!?\[[^\]]*\]\()([^\)]+)(\))/g, (match, prefix, url, suffix) => {
      if (!url.startsWith('/')) {
        return match
      }

      return `${prefix}${rewriteUrl(url, normalizedSiteUrl, markdownLinkMap)}${suffix}`
    })
    .replace(/(<(?:a|img)\b[^>]*\b(?:href|src)=['"])([^'"]+)(['"])/g, (match, prefix, url, suffix) => {
      if (!url.startsWith('/')) {
        return match
      }

      return `${prefix}${rewriteUrl(url, normalizedSiteUrl, markdownLinkMap)}${suffix}`
    })
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function buildMarkdownSitemap(urls) {
  const entries = [...new Set(urls)]
    .sort()
    .map(url => `  <url><loc>${escapeXml(url)}</loc></url>`)
    .join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    '</urlset>',
    '',
  ].join('\n')
}

export function addUtf8Bom(content) {
  return `${UTF8_BOM}${content}`
}
