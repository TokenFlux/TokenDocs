export const siteTitle = "TokenDocs";
export const siteDescription =
  "TokenFlux 文档站，包含 Quickstart、FAQ 与使用教程。";
export const enSiteDescription =
  "TokenFlux documentation site with quickstart, FAQ, and integration guides.";

export const navItems = [
  { text: "Home", link: "/" },
  { text: "Docs", link: "/docs/quickstart", activeMatch: "^/docs/" },
];

export const enNavItems = [
  { text: "Home", link: "/en/" },
  { text: "Docs", link: "/en/docs/quickstart", activeMatch: "^/en/docs/" },
];

export const sidebar = {
  "/docs/": [
    {
      text: "Docs",
      items: [
        { text: "Quickstart", link: "/docs/quickstart" },
        { text: "FAQ", link: "/docs/faq" },
      ],
    },
    {
      text: "TokenFlux",
      items: [
        { text: "创建 API Key", link: "/docs/tokenflux/create-apikey" },
        { text: "计费说明", link: "/docs/tokenflux/billing" },
        { text: "发票说明", link: "/docs/tokenflux/invoice" },
        // { text: "邀请返利", link: "/docs/tokenflux/referral" },
      ],
    },
    {
      text: "Agents",
      items: [
        { text: "CC-Switch", link: "/docs/agents/cc-switch" },
        { text: "Claude Code", link: "/docs/agents/claude-code" },
        { text: "Codex", link: "/docs/agents/codex" },
        { text: "Codex++", link: "/docs/agents/codex-plus-plus" },
        { text: "Hermes", link: "/docs/agents/hermes" },
        { text: "OpenCode", link: "/docs/agents/opencode" },
      ],
    },
    {
      text: "ChatBot",
      items: [
        { text: "Cherry Studio", link: "/docs/chatbot/cherry-studio" },
        { text: "RikkaHub", link: "/docs/chatbot/rikkahub" },
      ],
    },
    {
      text: "条款与政策",
      items: [
        { text: "服务条款", link: "/docs/tos/service-terms" },
        { text: "使用政策", link: "/docs/tos/usage-policy" },
        { text: "支持的国家和地区", link: "/docs/tos/supported-countries" },
      ],
    },
  ],
};

export const enSidebar = {
  "/en/docs/": [
    {
      text: "Docs",
      items: [
        { text: "Quickstart", link: "/en/docs/quickstart" },
        { text: "FAQ", link: "/en/docs/faq" },
      ],
    },
    {
      text: "TokenFlux",
      items: [
        { text: "Create API Key", link: "/en/docs/tokenflux/create-apikey" },
        { text: "Billing", link: "/en/docs/tokenflux/billing" },
        { text: "Invoices", link: "/en/docs/tokenflux/invoice" },
        // { text: "Referral Rewards", link: "/en/docs/tokenflux/referral" },
      ],
    },
    {
      text: "Agents",
      items: [
        { text: "CC-Switch", link: "/en/docs/agents/cc-switch" },
        { text: "Claude Code", link: "/en/docs/agents/claude-code" },
        { text: "Codex", link: "/en/docs/agents/codex" },
        { text: "Codex++", link: "/en/docs/agents/codex-plus-plus" },
        { text: "Hermes", link: "/en/docs/agents/hermes" },
        { text: "OpenCode", link: "/en/docs/agents/opencode" },
      ],
    },
    {
      text: "ChatBot",
      items: [
        { text: "Cherry Studio", link: "/en/docs/chatbot/cherry-studio" },
        { text: "RikkaHub", link: "/en/docs/chatbot/rikkahub" },
      ],
    },
    {
      text: "Terms & Policies",
      items: [
        { text: "Terms of Service", link: "/en/docs/tos/service-terms" },
        { text: "Usage Policy", link: "/en/docs/tos/usage-policy" },
        { text: "Supported Countries and Regions", link: "/en/docs/tos/supported-countries" },
      ],
    },
  ],
};

const search = {
  provider: "local",
};

export const rootThemeConfig = {
  nav: navItems,
  search,
  sidebar,
};

export const enThemeConfig = {
  nav: enNavItems,
  search,
  sidebar: enSidebar,
};

export const locales = {
  root: {
    label: "简体中文",
    lang: "zh-CN",
    title: siteTitle,
    description: siteDescription,
    themeConfig: rootThemeConfig,
  },
  en: {
    label: "English",
    lang: "en-US",
    link: "/en/",
    title: siteTitle,
    description: enSiteDescription,
    themeConfig: enThemeConfig,
  },
};
