import { CONSOLE_URL, MODELS_URL } from './constants.js'

export const siteTitle = 'TokenDocs'
export const siteDescription = 'TokenFlux 文档站，包含 Quickstart、FAQ 与使用教程。'
export const enSiteDescription =
  'TokenFlux documentation site with quickstart, FAQ, and integration guides.'

export const repoUrl = 'https://github.com/TokenFlux/TokenDocs'
export const editLinkPattern = `${repoUrl}/edit/main/docs/:path`

const copyrightYear = new Date().getFullYear()

export const consoleUrl = CONSOLE_URL
export const modelsUrl = MODELS_URL

export const navItems = [
  { text: '首页', link: '/' },
  { text: '文档', link: '/docs/quickstart', activeMatch: '^/docs/' },
  { text: '模型', link: modelsUrl },
  { text: '控制台', link: consoleUrl },
]

export const enNavItems = [
  { text: 'Home', link: '/en/' },
  { text: 'Docs', link: '/en/docs/quickstart', activeMatch: '^/en/docs/' },
  { text: 'Models', link: modelsUrl },
  { text: 'Console', link: consoleUrl },
]

export const sidebar = {
  '/docs/': [
    {
      text: 'Docs',
      items: [
        { text: '快速开始', link: '/docs/quickstart' },
        { text: '核心概念', link: '/docs/concepts' },
        { text: '排障', link: '/docs/troubleshooting' },
        { text: '错误码', link: '/docs/errors' },
        { text: 'FAQ', link: '/docs/faq' },
        { text: '维护策略', link: '/docs/verification-policy' },
      ],
    },
    {
      text: 'API Key',
      items: [
        { text: '创建 API Key', link: '/docs/tokenflux/create-apikey' },
        { text: 'API 端点', link: '/docs/tokenflux/endpoints' },
        { text: '复合 Key', link: '/docs/tokenflux/composite-key' },
        { text: 'Fast 模式', link: '/docs/tokenflux/fast-mode' },
      ],
    },
    {
      text: 'TokenFlux',
      items: [
        { text: '计费说明', link: '/docs/tokenflux/billing' },
        { text: '发票说明', link: '/docs/tokenflux/invoice' },
        { text: '团队', link: '/docs/tokenflux/team' },
        { text: '邀请返利', link: '/docs/tokenflux/referral' },
      ],
    },
    {
      text: 'Agents',
      items: [
        { text: 'CC-Switch', link: '/docs/agents/cc-switch' },
        { text: 'Claude Code', link: '/docs/agents/claude-code' },
        { text: 'Codex', link: '/docs/agents/codex' },
        { text: 'Codex++', link: '/docs/agents/codex-plus-plus' },
        { text: 'Hermes', link: '/docs/agents/hermes' },
        { text: 'OpenCode', link: '/docs/agents/opencode' },
        { text: 'WorkBuddy', link: '/docs/agents/workbuddy' },
      ],
    },
    {
      text: 'ChatBot',
      items: [
        { text: 'Cherry Studio', link: '/docs/chatbot/cherry-studio' },
        { text: 'RikkaHub', link: '/docs/chatbot/rikkahub' },
      ],
    },
    {
      text: '条款与政策',
      items: [
        { text: '服务条款', link: '/docs/tos/service-terms' },
        { text: '使用政策', link: '/docs/tos/usage-policy' },
        { text: '支持的国家和地区', link: '/docs/tos/supported-countries' },
      ],
    },
  ],
}

export const enSidebar = {
  '/en/docs/': [
    {
      text: 'Docs',
      items: [
        { text: 'Quickstart', link: '/en/docs/quickstart' },
        { text: 'Core Concepts', link: '/en/docs/concepts' },
        { text: 'Troubleshooting', link: '/en/docs/troubleshooting' },
        { text: 'Error Codes', link: '/en/docs/errors' },
        { text: 'FAQ', link: '/en/docs/faq' },
        { text: 'Maintenance Policy', link: '/en/docs/verification-policy' },
      ],
    },
    {
      text: 'API Key',
      items: [
        { text: 'Create API Key', link: '/en/docs/tokenflux/create-apikey' },
        { text: 'API Endpoints', link: '/en/docs/tokenflux/endpoints' },
        { text: 'Composite Key', link: '/en/docs/tokenflux/composite-key' },
        { text: 'Fast Mode', link: '/en/docs/tokenflux/fast-mode' },
      ],
    },
    {
      text: 'TokenFlux',
      items: [
        { text: 'Billing', link: '/en/docs/tokenflux/billing' },
        { text: 'Invoices', link: '/en/docs/tokenflux/invoice' },
        { text: 'Team', link: '/en/docs/tokenflux/team' },
        { text: 'Referral Rewards', link: '/en/docs/tokenflux/referral' },
      ],
    },
    {
      text: 'Agents',
      items: [
        { text: 'CC-Switch', link: '/en/docs/agents/cc-switch' },
        { text: 'Claude Code', link: '/en/docs/agents/claude-code' },
        { text: 'Codex', link: '/en/docs/agents/codex' },
        { text: 'Codex++', link: '/en/docs/agents/codex-plus-plus' },
        { text: 'Hermes', link: '/en/docs/agents/hermes' },
        { text: 'OpenCode', link: '/en/docs/agents/opencode' },
        { text: 'WorkBuddy', link: '/en/docs/agents/workbuddy' },
      ],
    },
    {
      text: 'ChatBot',
      items: [
        { text: 'Cherry Studio', link: '/en/docs/chatbot/cherry-studio' },
        { text: 'RikkaHub', link: '/en/docs/chatbot/rikkahub' },
      ],
    },
    {
      text: 'Terms & Policies',
      items: [
        { text: 'Terms of Service', link: '/en/docs/tos/service-terms' },
        { text: 'Usage Policy', link: '/en/docs/tos/usage-policy' },
        { text: 'Supported Countries and Regions', link: '/en/docs/tos/supported-countries' },
      ],
    },
  ],
}

const search = {
  provider: 'local',
  options: {
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档',
      },
      modal: {
        displayDetails: '展开详情',
        resetButtonTitle: '清除搜索',
        backButtonTitle: '关闭搜索',
        noResultsText: '没有找到相关内容',
        footer: {
          selectText: '选择',
          selectKeyAriaLabel: '回车',
          navigateText: '切换',
          navigateUpKeyAriaLabel: '上箭头',
          navigateDownKeyAriaLabel: '下箭头',
          closeText: '关闭',
          closeKeyAriaLabel: 'esc',
        },
      },
    },
  },
}

const enSearch = {
  provider: 'local',
}

export const rootThemeConfig = {
  nav: navItems,
  search,
  sidebar,
  outline: { label: '本页目录', level: [2, 3] },
  docFooter: { prev: '上一页', next: '下一页' },
  lastUpdated: {
    text: '最后更新于',
    formatOptions: { dateStyle: 'short', timeStyle: 'short' },
  },
  editLink: {
    pattern: editLinkPattern,
    text: '在 GitHub 上编辑此页',
  },
  returnToTopLabel: '回到顶部',
  sidebarMenuLabel: '菜单',
  darkModeSwitchLabel: '主题',
  lightModeSwitchTitle: '切换到浅色模式',
  darkModeSwitchTitle: '切换到深色模式',
  langMenuLabel: '切换语言',
  notFound: {
    title: '页面未找到',
    quote: '这个链接可能已经变更。可以搜索文档，或从快速开始重新进入。',
    linkLabel: '返回快速开始',
    linkText: '返回快速开始',
  },
  footer: {
    message: 'TokenFlux 文档',
    copyright: `© ${copyrightYear} TokenFlux`,
  },
}

export const enThemeConfig = {
  nav: enNavItems,
  search: enSearch,
  sidebar: enSidebar,
  outline: { label: 'On this page', level: [2, 3] },
  lastUpdated: {
    text: 'Last updated',
    formatOptions: { dateStyle: 'short', timeStyle: 'short' },
  },
  editLink: {
    pattern: editLinkPattern,
    text: 'Edit this page on GitHub',
  },
  notFound: {
    title: 'Page Not Found',
    quote: 'This link may have changed. Search the docs, or start again from the quickstart.',
    linkLabel: 'Back to Quickstart',
    linkText: 'Back to Quickstart',
  },
  footer: {
    message: 'TokenFlux Documentation',
    copyright: `© ${copyrightYear} TokenFlux`,
  },
}

export const locales = {
  root: {
    label: '简体中文',
    lang: 'zh-CN',
    title: siteTitle,
    description: siteDescription,
    themeConfig: rootThemeConfig,
  },
  en: {
    label: 'English',
    lang: 'en-US',
    link: '/en/',
    title: siteTitle,
    description: enSiteDescription,
    themeConfig: enThemeConfig,
  },
}
