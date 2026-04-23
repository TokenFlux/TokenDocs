export const siteTitle = "TokenDocs";
export const siteDescription =
  "TokenFlux 文档站，包含 Quickstart、FAQ 与使用教程。";

export const navItems = [
  { text: "Home", link: "/" },
  { text: "Docs", link: "/docs/quickstart", activeMatch: "^/docs/" },
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
        { text: "邀请返利", link: "/docs/tokenflux/referral" },
      ],
    },
    {
      text: "Agents",
      items: [
        { text: "CC-Switch", link: "/docs/agents/cc-switch" },
        { text: "Claude Code", link: "/docs/agents/claude-code" },
        { text: "Codex", link: "/docs/agents/codex" },
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
      items: [{ text: "使用政策", link: "/docs/tos/usage-policy" }],
    },
  ],
};
