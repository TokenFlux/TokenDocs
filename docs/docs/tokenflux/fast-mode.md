# Fast 模式

Fast 模式向上游请求更高优先级的算力通道，排队更短、响应更快。可以直接在 API Key 上强制开启，客户端无需额外配置。

Codex 桌面端界面未提供 Fast 开关，将 Key 的策略设为强制开启即可生效。

::: warning 费用约为常规的 2 倍
Fast 模式走上游的高优先级定价，实际扣费约为常规模式的 **2 倍**。开启前请确认符合业务预期。
:::

## 设置方式

1. 打开 [API 密钥页面](https://tokenflux.dev/keys)。
2. 创建新密钥，或点击已有密钥的 `编辑`。
3. 找到 `Fast 模式策略`，选择需要的选项。
4. 保存。

<div style="text-align: center;">
  <img src="/images/fast-mode/policy-select.png" alt="TokenFlux 密钥表单中的 Fast 模式策略下拉菜单，包含跟随请求、强制开启 Fast、强制关闭 Fast 三个选项" />
</div>

## 策略选项

| 选项               | 行为                                         |
| ------------------ | -------------------------------------------- |
| `跟随请求`（默认） | 完全按客户端请求里带的参数处理，网关不增不删 |
| `强制开启 Fast`    | 不管客户端有没有传，都按 Fast 发给上游       |
| `强制关闭 Fast`    | 剥离客户端已带的 Fast 标记                   |

`强制关闭 Fast` 只移除 Fast，不影响 `flex`、`auto`、`default`、`scale` 等其他优先级设置。

## 生效范围

设置对该密钥的所有请求生效，包括普通对话补全、Responses 和 Anthropic 格式请求。

改动**立即生效**。即使是 WebSocket 长连接，也会在下一轮对话时读取新策略，不需要重连或重启客户端。

## 强制开启不生效的情况

`强制开启 Fast` 有前置条件，不满足时会**静默跳过**（不报错，按常规模式发送）：

- 密钥当前命中的不是 OpenAI 或 Anthropic 平台的账号
- Anthropic 账号使用的是 Bedrock、Vertex 或 OAuth 凭据（只有 API Key 凭据支持）
- 当前模型不支持优先级通道
- 平台管理员配置了全局的 Fast 拦截或过滤策略（全局策略高于单个密钥设置，无法绕过）

## 相关入口

- [创建 API Key](/docs/tokenflux/create-apikey) — 密钥的创建流程
- [Codex 使用指南](/docs/agents/codex) — Codex 接入配置
- [计费说明](/docs/tokenflux/billing) — 了解计费单位和分组倍率
