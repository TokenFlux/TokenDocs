# API 端点

大多数客户端在配置时需要填写 API 地址（Base URL）。TokenFlux 按协议格式提供三个入口。

## 协议入口

| 协议格式       | Base URL                   | 典型请求路径                                    |
| -------------- | -------------------------- | ----------------------------------------------- |
| OpenAI 格式    | `https://tokenflux.dev/v1` | `POST /chat/completions`                        |
| Anthropic 格式 | `https://tokenflux.dev`    | `POST /v1/messages`                             |
| Gemini 格式    | `https://tokenflux.dev`    | `POST /v1beta/models/<模型 ID>:generateContent` |

OpenAI 格式和 Anthropic 格式的端点可在 [API 密钥页面](https://tokenflux.dev/keys) 顶部一键复制：

<div style="text-align: center;">
  <img src="/images/quickstart/api-endpoints.png" alt="API 密钥页面顶部的端点区域，可一键复制 OpenAI 格式和 Anthropic 格式端点" />
</div>

## 该选哪个格式

格式由客户端决定，分组必须支持同一格式。

| 格式                       | 适用客户端                                                       |
| -------------------------- | ---------------------------------------------------------------- |
| OpenAI 格式（`/v1` 结尾）  | Cherry Studio、RikkaHub、OpenCode，以及标注「OpenAI 兼容」的工具 |
| Anthropic 格式（无 `/v1`） | `Claude Code` 等原生走 Anthropic 协议的客户端                    |
| Gemini 格式                | 使用 Google 原生协议的客户端和 SDK，模型 ID 写在请求路径里       |

客户端配置项写 `ANTHROPIC_BASE_URL` 的用 Anthropic 格式，写 `OPENAI_BASE_URL` 或 `Base URL` 的用 OpenAI 格式。具体填法各接入教程里都有写明。

部分模型提供两个分组，分别对应 OpenAI 格式和 Anthropic 格式，例如 `DeepSeek（OpenAI格式）` 和 `DeepSeek（Anthropic格式）`。创建 API Key 时按客户端选择对应格式的分组，选错返回 403 `This group does not allow ... requests`，见 [错误码](/docs/errors#分组能力限制)。

## 认证

API Key 通过请求头传递，多数客户端会自动处理。

| 入口                        | 支持的认证方式                                                             |
| --------------------------- | -------------------------------------------------------------------------- |
| OpenAI 格式、Anthropic 格式 | `Authorization: Bearer <Key>`、`x-api-key: <Key>`、`x-goog-api-key: <Key>` |
| Gemini 格式                 | 以上三种，另支持查询参数 `?key=<Key>`                                      |

OpenAI 格式和 Anthropic 格式不接受通过查询参数传 Key，会返回 400。Gemini 格式的 `?api_key=` 同样已废弃，请使用 `?key=` 或请求头。

使用[复合 Key](/docs/tokenflux/composite-key) 时，模型 ID 需要带前缀，Gemini 格式的前缀写在路径中。

## 已废弃的国内加速端点

`token.memoh.net` 已废弃，不要用于新配置。现有配置如仍在使用该地址，请改为对应格式的默认端点：

| 协议格式       | 旧地址                       | 改为                       |
| -------------- | ---------------------------- | -------------------------- |
| OpenAI 格式    | `https://token.memoh.net/v1` | `https://tokenflux.dev/v1` |
| Anthropic 格式 | `https://token.memoh.net`    | `https://tokenflux.dev`    |

切换时只需修改客户端中的 API 地址，其他配置不用改。废弃端点容易出现请求堆积、首字延迟升高，请求量大时影响更明显。

## 相关入口

- [创建 API Key](/docs/tokenflux/create-apikey) — 先拿到密钥
- [快速开始](/docs/quickstart) — 按客户端选择接入方式
- [排障](/docs/troubleshooting) — 连不上或配置无效时的排查顺序
- [错误码](/docs/errors) — 认证与请求错误的完整清单
