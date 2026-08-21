# 复合 Key

复合 Key 是一个同时绑定多个分组的 API Key。每个分组配一个前缀，调用时在模型 ID 前加上前缀即可选择走哪个分组。

这样就不用为每个平台单独建一个 Key，也不用在客户端里来回切换配置。

**前往创建：[https://tokenflux.dev/keys](https://tokenflux.dev/keys)**

## 创建复合 Key

1. 在 [API 密钥页面](https://tokenflux.dev/keys) 点击 `创建密钥`。
2. 填写名称，然后打开 `复合 Key` 开关。
3. 在出现的映射编辑器里，为每一行选择一个**分组**并填写一个**前缀**。
4. 需要更多分组时点 `添加分组映射`，可以用上移/下移调整顺序。
5. 保存。

<div style="text-align: center;">
  <img src="/images/composite-key/editor.png" alt="TokenFlux 创建密钥弹窗中打开复合 Key 开关后的分组映射编辑器" />
</div>

编辑已有的 Key 时开关同样可用，操作方式一致。

例如按下面的方式绑定：

| 前缀 | 分组 |
| --- | --- |
| `GPT` | OpenAI 分组 |
| `Claude` | Anthropic 分组 |

### 前缀规则

- 长度 1–32 位，只能用**字母、数字、下划线和连字符**。
- **不区分大小写**，`GPT` 和 `gpt` 视为同一个前缀，不能重复。
- 同一个分组在一个 Key 里只能添加一次。
- 每个复合 Key 最多 **20** 个分组映射，达到上限后 `添加分组映射` 按钮会变灰。

前缀填错时输入框下方会实时显示提示，例如「前缀仅允许 1 至 32 位字母、数字、下划线或连字符」「前缀不能重复（不区分大小写）」。

<div style="text-align: center;">
  <img src="/images/composite-key/prefix-error.png" alt="前缀 GPT 与 gpt 因不区分大小写被判定重复时的错误提示" />
</div>

## 调用方式

把模型 ID 写成 `前缀/模型 ID`：

```json
{
  "model": "GPT/gpt-5",
  "messages": [{ "role": "user", "content": "Hello" }]
}
```

按上面的绑定，两个分组分别这样调用：

- `GPT/gpt-5` — 走 OpenAI 分组
- `Claude/claude-sonnet-4` — 走 Anthropic 分组

::: warning 只按第一个斜杠拆分
如果模型 ID 本身带斜杠，只有**第一个**斜杠会被当作前缀分隔符。例如 `GPT/vendor/model` 的前缀是 `GPT`，实际模型 ID 是 `vendor/model`。
:::

Gemini 原生入口把前缀放在模型路径里：

```text
POST /v1beta/models/Gemini/gemini-2.5-pro:generateContent
```

## 模型列表

`/v1/models` 等模型列表接口会按映射顺序聚合所有分组的可用模型，并自动给每个模型 ID 加好前缀。客户端拉取模型列表后可以直接选择带前缀的模型，不需要手动拼。

## 查看调用示例

在密钥列表中点击某个复合 Key 的 `使用` 按钮，弹窗会按每个前缀列出对应的调用示例，可以直接复制。

## 不支持的接口

复合 Key **不支持 WebSocket / Realtime 类接口**，包括 `/v1/live`、Codex Realtime、Responses WebSocket 和 Live sideband。这些连接可能在同一个会话中切换模型，无法用前缀确定分组，请求会返回 `COMPOSITE_KEY_ENDPOINT_UNSUPPORTED`。

**这些场景请继续使用普通 API Key。**

常规的 API 请求都支持，包括对话、图片生成与编辑、批量图片提交，以及不带模型的用量、账单和任务查询类接口。

## 常见错误

前缀有问题时会返回 HTTP 400，错误结构与所用入口（OpenAI / Anthropic / Google）保持一致：

| 错误码 | 含义 |
| --- | --- |
| `COMPOSITE_KEY_MODEL_PREFIX_REQUIRED` | 模型 ID 没带前缀 |
| `COMPOSITE_KEY_PREFIX_NOT_FOUND` | 前缀不在这个 Key 的映射里 |
| `COMPOSITE_KEY_PREFIX_INVALID` | 前缀格式非法 |
| `COMPOSITE_KEY_ENDPOINT_UNSUPPORTED` | 该接口不支持复合 Key |

## 注意事项

- 密钥列表的「分组」列里，复合 Key 显示为若干个 `前缀 / 分组名` 标签；点击会直接打开编辑弹窗，**不能**像普通 Key 那样在列表里就地换分组。
- 把复合 Key 改回普通 Key 时，需要重新选择一个分组才能保存。
- 计费、倍率、限流、额度和过期时间等设置对复合 Key 与普通 Key 完全一致，按实际命中的分组计算。

## 相关入口

- [创建 API Key](/docs/tokenflux/create-apikey) — 普通密钥的创建流程
- [计费说明](/docs/tokenflux/billing) — 分组倍率如何计算
- [模型广场](https://tokenflux.dev/models) — 查看各分组的可用模型
