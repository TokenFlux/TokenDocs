# 快速开始

TokenFlux 是一个模型中转服务：用一个 API Key，在你熟悉的客户端里调用各家模型。

本页帮你规划路线。三步就能跑起来。

::: tip 访问提示
本站部分内容或相关服务可能需要挂梯子后访问。API 请求请使用默认的 `tokenflux.dev` 端点；原大陆优化端点已废弃。
:::

::: details For AGENTS
批量读取 Markdown 文档时，可直接使用 [markdown-sitemap.xml](/markdown-sitemap.xml)。单页读取时，直接在不以 `/` 结尾的文档 URL 后追加 `.md` 即可，例如 `/docs/quickstart.md`。
:::

## 三步接入

| 步骤 | 做什么 | 去哪 |
| --- | --- | --- |
| 1 | 充值或订阅，获得推理积分 | [充值/订阅](https://tokenflux.dev/purchase) · [计费说明](/docs/tokenflux/billing) |
| 2 | 创建一个 API Key，选好分组 | [创建 API Key](/docs/tokenflux/create-apikey) |
| 3 | 在客户端里填入 Key 和端点 | 见下方选型 |

模型广场显示的价格即为最终计费价格，不需要额外换算。

分组、号池、推理积分这些词的含义，见 [核心概念](/docs/concepts)。

## 选择你的客户端

<DocsTabs default-tab="agent">
  <DocsTab title="Agent" name="agent">

适合在终端工作、有编程需求或希望使用 AI Agent 辅助开发的用户。

推荐先装 [CC-Switch](/docs/agents/cc-switch)，它能统一管理 API Key 和供应商配置，省去手动改环境变量。装好后再看你要用的客户端：

| 客户端 | 适用场景 | 指南 |
| --- | --- | --- |
| Claude Code | Anthropic 官方 CLI，终端编程 | [教程](/docs/agents/claude-code) |
| Codex | OpenAI 官方 CLI 与桌面端 | [教程](/docs/agents/codex) |
| Codex++ | 给 Codex 加装增强能力 | [教程](/docs/agents/codex-plus-plus) |
| OpenCode | 开源终端 Agent，多模型切换 | [教程](/docs/agents/opencode) |
| Hermes | 轻量终端 Agent | [教程](/docs/agents/hermes) |

  </DocsTab>

  <DocsTab title="ChatBot" name="chatbot">

适合偏好图形界面、移动端或以日常对话为主要使用场景的用户。

| 客户端 | 适用场景 | 指南 |
| --- | --- | --- |
| Cherry Studio | 桌面端（Windows / macOS / Linux），多模型切换 | [教程](/docs/chatbot/cherry-studio) |
| RikkaHub | Android 手机端，OpenAI 兼容 | [教程](/docs/chatbot/rikkahub) |

在客户端设置里添加 TokenFlux 作为自定义服务商，填入 API Key 和 [API 端点](/docs/tokenflux/endpoints)，获取模型列表后即可开始对话。

  </DocsTab>
</DocsTabs>

## 进阶用法

跑通之后，这些能力可能对你有用：

- [复合 Key](/docs/tokenflux/composite-key) — 一个 Key 绑定多个分组，用前缀切换
- [Fast 模式](/docs/tokenflux/fast-mode) — 在 Key 上强制开启高优先级通道
- [团队](/docs/tokenflux/team) — 多人共用所有者的余额，各自建 Key
- [邀请返利](/docs/tokenflux/referral) — 邀请好友获得推理积分

## 遇到问题

- [排障](/docs/troubleshooting) — 按症状定位，含反馈模板
- [错误码](/docs/errors) — 完整错误码清单
- [FAQ](/docs/faq) — 连接不稳定、模型检测等常见问题
- [API 端点](/docs/tokenflux/endpoints) — 端点选择与废弃线路迁移
- [使用政策](/docs/tos/usage-policy) — 哪些用法会导致封禁
