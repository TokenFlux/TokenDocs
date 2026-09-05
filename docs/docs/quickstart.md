# 快速开始

TokenFlux 是统一的大语言模型接口：通过统一的 API Key 在各类客户端中调用主流大模型。

::: details For AGENTS
批量读取 Markdown 文档时，可直接使用 [markdown-sitemap.xml](/markdown-sitemap.xml)。单页读取时，直接在不以 `/` 结尾的文档 URL 后追加 `.md` 即可，例如 `/docs/quickstart.md`。
:::

## 接入流程

1. 在下方选择客户端，到 [模型广场](https://tokenflux.dev/models) 确认目标模型所在分组支持所需协议和客户端。
2. 查看 [计费说明](/docs/tokenflux/billing)，确认价格后 [充值或订阅](https://tokenflux.dev/purchase)，获得推理积分。
3. [创建 API Key](/docs/tokenflux/create-apikey)，选择已确认的分组。
4. 按下方客户端教程填入 Key、端点和模型 ID。
5. 发送一条消息，核对回复和使用记录，[确认接入成功](#确认接入成功)。

分组、号池、推理积分等术语见 [核心概念](/docs/concepts)。

## 客户端选型

<DocsTabs default-tab="agent">
  <DocsTab title="Agent" name="agent">

适合在终端工作、有编程需求或希望使用 AI Agent 辅助开发的用户。

按所用客户端查看对应教程。需要统一管理 Claude Code、Codex 等客户端的供应商配置时，可选用 [CC-Switch](/docs/agents/cc-switch)；它不是接入的前置条件。

| 客户端教程                              | 适用场景                     |
| --------------------------------------- | ---------------------------- |
| [Claude Code](/docs/agents/claude-code) | Anthropic 官方 CLI，终端编程 |
| [Codex](/docs/agents/codex)             | OpenAI 官方 CLI 与桌面端     |
| [Codex++](/docs/agents/codex-plus-plus) | 给 Codex 加装增强能力        |
| [OpenCode](/docs/agents/opencode)       | 开源终端 Agent，多模型切换   |
| [Pi](/docs/agents/pi)                   | 可扩展的终端编程 Agent       |
| [Hermes](/docs/agents/hermes)           | 轻量终端 Agent               |

  </DocsTab>

  <DocsTab title="ChatBot" name="chatbot">

适合偏好图形界面、移动端或以日常对话为主要使用场景的用户。

| 客户端教程                                   | 适用场景                                      |
| -------------------------------------------- | --------------------------------------------- |
| [Cherry Studio](/docs/chatbot/cherry-studio) | 桌面端（Windows / macOS / Linux），多模型切换 |
| [RikkaHub](/docs/chatbot/rikkahub)           | Android 手机端，OpenAI 兼容                   |

在客户端设置里添加 TokenFlux 作为自定义服务商，填入 API Key 和 [API 端点](/docs/tokenflux/endpoints)，获取模型列表后即可开始对话。

  </DocsTab>
</DocsTabs>

## 确认接入成功

1. 在客户端中选择目标模型，新建对话并发送「只回复 OK」。这会产生推理费用。
2. 确认收到模型的文本回复，而不只是看到模型列表或「配置已保存」。
3. 在 [使用记录](https://tokenflux.dev/usage) 中找到本次请求，核对使用的 Key、模型及扣费；分组与创建 Key 时的选择一致。

这只能确认本次文本对话成功。需要工具调用、图片或其他能力时，再验证对应功能。没有回复或记录与预期不符时，见 [排障](/docs/troubleshooting)。

## 进阶用法

接入完成后可按需使用：

- [创作台](https://tokenflux.dev/creative) — 无需客户端与 API 配置，网页端在线生成图片
- [复合 Key](/docs/tokenflux/composite-key) — 一个 Key 绑定多个分组，用前缀切换
- [Fast 模式](/docs/tokenflux/fast-mode) — 在 Key 上强制开启高优先级通道
- [团队](/docs/tokenflux/team) — 多人共用所有者的余额，各自建 Key
- [邀请返利](/docs/tokenflux/referral) — 邀请好友获得推理积分

## 遇到问题

- [排障](/docs/troubleshooting) — 按症状定位，含反馈模板
- [错误码](/docs/errors) — 完整错误码清单
- [FAQ](/docs/faq) — 企业接入、模型检测等常见问题
- [API 端点](/docs/tokenflux/endpoints) — 端点选择与废弃线路迁移
- [使用政策](/docs/tos/usage-policy) — 哪些用法会导致封禁
