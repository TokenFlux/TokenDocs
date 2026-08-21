# 快速开始

TokenFlux 是统一的大语言模型接口：用一个 API Key，在你熟悉的客户端里调用各家厂商的模型。

::: tip 访问提示
本站部分内容或相关服务可能需要使用代理才能访问。API 请求请使用默认的 `tokenflux.dev` 端点；原大陆优化端点已废弃。
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

模型广场显示的价格即为最终计费价格。

分组、号池、推理积分等术语见 [核心概念](/docs/concepts)。

## 选择你的客户端

<DocsTabs default-tab="agent">
  <DocsTab title="Agent" name="agent">

适合在终端工作、有编程需求或希望使用 AI Agent 辅助开发的用户。

建议先安装 [CC-Switch](/docs/agents/cc-switch)，它统一管理 API Key 和供应商配置，无需手动修改环境变量。安装后按所用客户端查看对应教程：

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

## 验证接入

配置完客户端后，用下面两步确认 Key、端点和分组都正确。把 `$KEY` 换成你的 API Key。

第一步列出模型，不产生推理费用：

```bash
curl https://tokenflux.dev/v1/models -H "authorization: Bearer $KEY"
```

| 返回 | 说明 |
| --- | --- |
| 模型列表 | Key 有效、分组可用、端点正确 |
| `401` `Invalid API key` | Key 不存在，检查是否含多余的空格或引号 |
| `401` `API key is disabled` | Key 已禁用，在 [API 密钥页面](https://tokenflux.dev/keys) 查看状态 |
| `403` | 分组、余额或订阅问题，见 [错误码](/docs/errors#_403-拒绝访问) |

第二步发一次真实请求，这一步会扣费。模型 ID 用第一步返回的任意一个：

```bash
curl https://tokenflux.dev/v1/chat/completions \
  -H "authorization: Bearer $KEY" \
  -H "content-type: application/json" \
  -d '{"model":"<模型 ID>","messages":[{"role":"user","content":"只回复 OK"}],"max_tokens":16}'
```

收到回复即接入成功，调用记录可在 [使用记录](https://tokenflux.dev/usage) 中核对。

Anthropic 格式的分组把地址换成 `https://tokenflux.dev/v1/messages`，认证头换成 `x-api-key`，并加上 `anthropic-version: 2023-06-01`。

## 进阶用法

接入完成后可按需使用：

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
