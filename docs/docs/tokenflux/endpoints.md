# API 端点

大多数客户端在配置时都要填一个 API 地址（Base URL）。这里列出 TokenFlux 的全部端点。

## 端点一览

| 用途 | OpenAI 格式 | Anthropic 格式 |
| --- | --- | --- |
| 默认 | `https://tokenflux.dev/v1` | `https://tokenflux.dev` |
| 中国大陆优化 | `https://token.memoh.net/v1` | `https://token.memoh.net` |

两组端点功能完全一致，用的是同一个 API Key，可以随时切换。

默认端点也能在 [API 密钥页面](https://tokenflux.dev/keys) 顶部直接一键复制：

<div style="text-align: center;">
  <img src="/images/quickstart/api-endpoints.png" alt="API 密钥页面顶部的端点区域，可一键复制 OpenAI 格式和 Anthropic 格式端点" />
</div>

## 该选哪个格式

看客户端要求，不是看模型。

- **OpenAI 格式**（`/v1` 结尾）：绝大多数客户端用这个，例如 Cherry Studio、RikkaHub、OpenCode，以及任何标注「OpenAI 兼容」的工具。
- **Anthropic 格式**（无 `/v1`）：`Claude Code` 这类原生走 Anthropic 协议的客户端用这个。

如果客户端配置项里写的是 `ANTHROPIC_BASE_URL`，用 Anthropic 格式；写 `OPENAI_BASE_URL` 或 `Base URL` 的，一般用 OpenAI 格式。具体填法各接入教程里都有写明。

## 中国大陆优化端点

`token.memoh.net` 针对中国大陆网络做了链路优化，延迟更低、连接更稳定。

- 与默认端点功能一致，同一个 API Key 通用。
- 大陆网络下访问默认端点不稳定时，换成这组通常能改善。
- 换端点只需改客户端里的 API 地址，其他配置不用动。

::: tip
两组端点都可以随时切换，不影响已有的密钥、额度和用量统计。
:::

## 相关入口

- [创建 API Key](/docs/tokenflux/create-apikey) — 先拿到密钥
- [快速开始](/docs/quickstart) — 按客户端选择接入方式
- [FAQ](/docs/faq) — 连接不稳定等常见问题
