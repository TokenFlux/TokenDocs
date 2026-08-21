# 排障

按症状找到对应小节。需要查具体错误码的含义，见 [错误码](/docs/errors)。

## 先确认三件事

1. **拿到完整报错**。客户端界面上的提示往往被简化过，需要 HTTP 状态码和响应里的 `message` 原文。
2. **看 [使用记录](https://tokenflux.dev/usage)**。请求有没有到达 TokenFlux、用了哪个模型和 Key、状态码是什么，这里都能查到。记录里没有这条请求，说明请求根本没发出来或没打到网关。
3. **确认服务在线**：

```bash
curl https://tokenflux.dev/health
```

返回 `{"status":"ok"}` 表示网关正常，问题在配置或账户一侧。

## 连不上，或配置后没反应

按顺序检查：

1. API 地址必须是 `https://`，不是 `http://`。
2. 地址格式和客户端要求的协议对得上：

   | 客户端要求 | 填什么 |
   | --- | --- |
   | `OPENAI_BASE_URL` 或标注「OpenAI 兼容」 | `https://tokenflux.dev/v1` |
   | `ANTHROPIC_BASE_URL` | `https://tokenflux.dev` |

   完整说明见 [API 端点](/docs/tokenflux/endpoints)。
3. 地址后面不要自己拼接 `/chat/completions` 或 `/v1/messages`，客户端会自动补。
4. 用的不是已废弃的 `token.memoh.net`。
5. 本地代理、防火墙或 HTTPS 证书拦截。部分网络环境需要挂梯子才能访问。

## 401 认证失败

| message | 怎么办 |
| --- | --- |
| `API key is required in ...` | 请求没带 Key，检查客户端是否真的读到了配置 |
| `Invalid API key` | Key 不存在。检查有没有多余的空格、换行或引号 |
| `API key is disabled` | Key 被禁用，去 [API 密钥页面](https://tokenflux.dev/keys) 查看状态 |
| `User account is not active` | 账号被停用，联系平台 |

Key 刚改过就报 401，多半是客户端还在用旧的环境变量。完全退出客户端再重开，不要只重载窗口。

::: tip 401 不代表额度问题
Key 过期是 403，额度用完是 429。看到 401 只需排查 Key 本身。
:::

## 403 被拒绝

先看 `message` 属于哪一类。

**账户**

- `Insufficient account balance` — 余额不足，去 [充值/订阅](https://tokenflux.dev/purchase)。注意余额不足是 403 不是 402。
- `API key 已过期` — Key 过了有效期，重建一个。
- `Access denied. Your IP is ...` — 当前 IP 不在这个 Key 允许的范围内。

**分组**

- `API Key 所属分组已删除` / `已停用` / `已被禁用` / `不再允许当前用户使用` — 分组不可用了，换一个分组重建 Key。
- `The current group does not support the requested model "..."` — 模型不在分组里。报错通常会附上该分组的可用模型，从里面挑，或换分组。
- `This group does not allow ... requests` — 分组不支持你用的协议入口。例如只开放 Anthropic 格式的分组，用 `/v1/chat/completions` 就会报这个。
- `this group only allows Claude Code clients` — 该分组只接受 Claude Code。换客户端或换分组。
- `ChatGPT Pro` 分组只限 Codex 使用，其他客户端请选不限客户端的分组，见 [核心概念](/docs/concepts#需要留意的分组)。

**团队**

`团队已暂停`、`团队成员关系已失效`、`团队付款所有者已停用` 这类需要联系团队所有者处理，见 [团队](/docs/tokenflux/team)。

**订阅**

返回文本里带 `reason=`，读 `reason` 就知道原因，例如 `SUBSCRIPTION_EXPIRED` 是订阅过期。

**内容审核**

`内容审计命中风险规则，请调整输入后重试` — 调整输入内容。

## 429 额度或限流

先分清是**额度用尽**还是**频率超限**，两者处理方式不同。

**额度用尽**（充值或等周期重置才能恢复）

| message | 怎么办 |
| --- | --- |
| `API key 额度已用完` | 这个 Key 单独设了额度，去 [API 密钥页面](https://tokenflux.dev/keys) 调整 |
| `api key 5小时限额已用完` / `日限额` / `7天限额` | Key 的滚动限额，等窗口过去或改 Key 配置 |
| `团队成员日限额已用完`（周 / 月同理） | 联系团队所有者调整限额 |
| 带 `reason="DAILY_LIMIT_EXCEEDED"` 的文本 | 订阅的日额度用尽，周 / 月同理 |
| `Daily usage quota exhausted for this platform.` | 该平台的日额度用尽 |

**频率超限**（等一会就能恢复）

| message | 怎么办 |
| --- | --- |
| `group requests-per-minute limit exceeded` | 降低请求频率，响应头有 `Retry-After` |
| `user requests-per-minute limit exceeded` | 同上 |
| `Concurrency limit exceeded for user, please retry later` | 降低并发数 |
| `Too many pending requests, please retry later` | 等待队列满了，稍后重试 |
| `Upstream rate limit exceeded, please retry later` | 上游在限流，等待或换模型 |
| `Too many invalid authentication attempts; retry later` | 认证失败太多次触发保护，先把 Key 配对再试 |

有 `Retry-After` 就按它等待。没有就用指数退避，不要写死循环重试——失败重试同样可能产生费用。

## 400 请求格式错误

| message | 怎么办 |
| --- | --- |
| `model is required` | 客户端没传模型 ID，检查客户端是否选了模型 |
| `Failed to parse request body` | 请求体不是合法 JSON |
| `API key in query parameter is deprecated...` | Key 写在 URL 里了，改用请求头 |
| `composite api key model must use prefix/model_id` | 复合 Key 的模型 ID 要带前缀，见 [复合 Key](/docs/tokenflux/composite-key) |
| `Your Claude Code version ... is below the minimum required version ...` | 按提示升级 Claude Code |

## 5xx 服务端错误

502 和 503 绝大多数是上游模型服务商波动，不是你的配置问题。

- 等 1–2 分钟重试，或换一个模型试试
- `Upstream service overloaded, please retry later`（503）是上游过载，稍后再来
- `No available accounts`（503）是分组当前没有可用账号，可以换分组
- 持续十几分钟不恢复，按下面的格式反馈

::: tip 上游报错不会透传原文
网关会把上游的错误统一换成自己的文案，所以 `message` 是 TokenFlux 的措辞。想知道具体是哪个环节出错，看 [使用记录](https://tokenflux.dev/usage) 里的状态码。
:::

## 怎么反馈

自查后仍未解决，按下面的模板整理。信息齐了能省去大量来回追问。

::: tip 最关键的五项
**模型 ID、分组、客户端、API 地址、完整报错**。同样一句报错在不同组合下原因可能完全不同，这五项缺一不可。
:::

```text
模型 ID：
分组：
客户端：
API 地址：
系统：
故障：
预期：
复现步骤：
对比：
```

| 字段 | 填什么 |
| --- | --- |
| 模型 ID | 从模型广场复制的完整 ID，不要简写 |
| 分组 | Key 绑定的分组名 |
| 客户端 | 名称加版本，例如 `Claude Code 2.x` |
| API 地址 | 你实际填的那一串 |
| 系统 | Windows / macOS / Linux |
| 故障 | 具体现象，附 HTTP 状态码和 `message` 原文 |
| 预期 | 你认为正确的表现 |
| 复现步骤 | 能触发问题的最小操作 |
| 对比 | 什么情况正常、什么情况不正常 |

**对比信息最有价值。** 「换成别的分组就正常」「纯对话正常、一改文件就失败」这类描述能直接把问题范围缩小一个数量级，比单说「用不了」有用得多。反馈前先问自己：换个分组还会不会？换个模型呢？换个客户端呢？

企业级接入或渠道合作可以加 QQ 群 `794504445`，见 [FAQ](/docs/faq)。

## 相关入口

- [错误码](/docs/errors) — 完整错误码清单
- [核心概念](/docs/concepts) — 分组、额度与扣费顺序
- [API 端点](/docs/tokenflux/endpoints) — 地址与协议格式
- [使用记录](https://tokenflux.dev/usage) — 核对请求明细
