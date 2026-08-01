# API 端点

大多数客户端在配置时都要填一个 API 地址（Base URL）。这里列出 TokenFlux 的全部端点。

## 端点一览

| 用途 | OpenAI 格式 | Anthropic 格式 |
| --- | --- | --- |
| 默认 | `https://tokenflux.dev/v1` | `https://tokenflux.dev` |
| 国内加速（已废弃） | `https://token.memoh.net/v1` | `https://token.memoh.net` |

新配置请使用默认的 `tokenflux.dev` 端点。`token.memoh.net` 仅列于此处，方便识别和迁移已有配置。

::: tip 请求量较大时请使用默认端点
如果您的请求量很大，建议切换到 `tokenflux.dev` 端点。国内加速端点已废弃，且在上述情况下容易出现请求堆积，导致首字延迟升高。
:::

默认端点也能在 [API 密钥页面](https://tokenflux.dev/keys) 顶部直接一键复制：

<div style="text-align: center;">
  <img src="/images/quickstart/api-endpoints.png" alt="API 密钥页面顶部的端点区域，可一键复制 OpenAI 格式和 Anthropic 格式端点" />
</div>

## 该选哪个格式

看客户端要求，不是看模型。

- **OpenAI 格式**（`/v1` 结尾）：绝大多数客户端用这个，例如 Cherry Studio、RikkaHub、OpenCode，以及任何标注「OpenAI 兼容」的工具。
- **Anthropic 格式**（无 `/v1`）：`Claude Code` 这类原生走 Anthropic 协议的客户端用这个。

如果客户端配置项里写的是 `ANTHROPIC_BASE_URL`，用 Anthropic 格式；写 `OPENAI_BASE_URL` 或 `Base URL` 的，一般用 OpenAI 格式。具体填法各接入教程里都有写明。

## 已废弃的国内加速端点

`token.memoh.net` 已废弃，不建议继续用于新配置。现有配置如仍在使用该地址，请改为对应格式的默认端点：

- OpenAI 格式：`https://tokenflux.dev/v1`
- Anthropic 格式：`https://tokenflux.dev`

切换时只需修改客户端中的 API 地址，其他配置不用改。

## 相关入口

- [创建 API Key](/docs/tokenflux/create-apikey) — 先拿到密钥
- [快速开始](/docs/quickstart) — 按客户端选择接入方式
- [FAQ](/docs/faq) — 连接不稳定等常见问题
