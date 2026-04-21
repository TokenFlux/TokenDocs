import { defineConfig } from 'vitepress'
import { navItems, sidebar, siteDescription, siteTitle } from './site.js'

const base = process.env.VITEPRESS_BASE ?? '/TokenDocs/'

export default defineConfig({
  lang: 'zh-CN',
  title: siteTitle,
  description: siteDescription,
  base,
  themeConfig: {
    nav: navItems,
    search: {
      provider: 'local',
    },
    sidebar,
  },
  transformPageData(pageData) {
    const pageTitle = pageData.params?.pageTitle

    if (pageTitle) {
      pageData.title = pageTitle
      pageData.frontmatter ??= {}
      pageData.frontmatter.title = pageTitle
    }
  },
})
