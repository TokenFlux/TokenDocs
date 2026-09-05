# 排障

具体错误码的含义见 [错误码](/docs/errors)。

## 初步确认

1. **取得完整报错**。客户端界面上的提示通常经过简化，需要 HTTP 状态码和响应中的 `message` 原文。
2. **查看 [使用记录](https://tokenflux.dev/usage)**。请求是否到达 TokenFlux、使用的模型和 Key、返回的状态码，都可在此核对。记录中没有该请求时，先核对时间范围、账号和 Key；仍查不到时，再检查客户端是否发出请求及网络连接。
3. **确认服务在线**：

```bash
curl https://tokenflux.dev/health
```

返回 `{"status":"ok"}` 只说明当前网络能访问健康检查接口，不能排除具体模型、推理接口或上游服务故障。

## 单独测试 Key 和端点

以下命令使用 Bash / Zsh，Windows 可在 WSL 或 Git Bash 中执行。先在当前终端设置 `KEY` 环境变量为你的 API Key，不要把密钥写入共享脚本或反馈记录。

### 查询模型列表

```bash
curl -sS -i https://tokenflux.dev/v1/models \
  -H "Authorization: Bearer $KEY"
```

这个请求不产生推理费用。

| 返回     | 能确认什么                 | 下一步                                             |
| -------- | -------------------------- | -------------------------------------------------- |
| 模型列表 | 本次模型列表请求通过了认证 | 用目标模型和客户端实际使用的协议发送一次请求       |
| `401`    | 本次请求未通过认证         | 检查 Key 和请求头，见下方 401 一节                 |
| `403`    | 本次请求被拒绝             | 按 `message` 检查分组、权限或额度，见下方 403 一节 |

模型列表成功不代表推理接口、特定模型或流式响应可用。

### 发送最小推理请求

**以下请求会产生推理费用。** 将 `MODEL_ID` 替换为所选分组支持的完整模型 ID；复合 Key 使用 `前缀/模型 ID`。按客户端实际使用的接口选一个请求，不必全部执行。限定客户端的分组可能拒绝 curl，这种情况应在允许的客户端内验证。

**OpenAI Chat Completions**

```bash
curl -sS -i https://tokenflux.dev/v1/chat/completions \
  -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"MODEL_ID","messages":[{"role":"user","content":"Reply with OK only"}],"stream":false}'
```

**OpenAI Responses（例如 Codex）**

```bash
curl -sS -i https://tokenflux.dev/v1/responses \
  -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"MODEL_ID","input":"Reply with OK only","stream":false}'
```

**Anthropic Messages**

```bash
curl -sS -i https://tokenflux.dev/v1/messages \
  -H "x-api-key: $KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{"model":"MODEL_ID","max_tokens":128,"messages":[{"role":"user","content":"Reply with OK only"}],"stream":false}'
```

HTTP 2xx 且响应包含模型生成的文本，说明这一组 Key、模型和接口的非流式调用成功。Chat Completions 的文本位于 `choices`，Responses 位于 `output`，Messages 位于 `content`。再到 [使用记录](https://tokenflux.dev/usage) 核对本次模型和扣费。

若 curl 成功而客户端仍失败，对比实际端点、模型 ID、Key、代理和请求参数。上述测试没有覆盖流式响应、工具调用、图片或 WebSocket，应按原故障功能继续验证。

## 连不上，或配置后没反应

按顺序检查：

1. API 地址必须是 `https://`，不是 `http://`。
2. 地址格式与客户端要求的协议一致：

   | 客户端要求                              | 填什么                     |
   | --------------------------------------- | -------------------------- |
   | `OPENAI_BASE_URL` 或标注「OpenAI 兼容」 | `https://tokenflux.dev/v1` |
   | `ANTHROPIC_BASE_URL`                    | `https://tokenflux.dev`    |

   完整说明见 [API 端点](/docs/tokenflux/endpoints)。

3. 地址后不要自行拼接 `/chat/completions` 或 `/v1/messages`，客户端会自动补全。
4. 本地代理、防火墙或 HTTPS 证书拦截。部分网络环境需要使用代理才能访问。

## 401 认证失败

| message                      | 处理方式                                                           |
| ---------------------------- | ------------------------------------------------------------------ |
| `API key is required in ...` | 请求未携带 Key，检查客户端是否读取到配置                           |
| `Invalid API key`            | Key 不存在，检查是否含多余的空格、换行或引号                       |
| `API key is disabled`        | Key 已禁用，在 [API 密钥页面](https://tokenflux.dev/keys) 查看状态 |
| `User account is not active` | 账号已停用，请联系平台                                             |

修改 Key 后仍返回 401，通常是客户端仍在使用旧的环境变量。请完全退出客户端后重新启动，重载窗口不足以生效。

## 403 被拒绝

**账户**

- `Insufficient account balance` — 余额不足，前往 [充值/订阅](https://tokenflux.dev/purchase)。
- `API key 已过期` — Key 超过有效期，需重建。
- `Access denied. Your IP is ...` — 当前 IP 不在该 Key 允许的范围内。

**分组**

- `API Key 所属分组已删除` / `已停用` / `已被禁用` / `不再允许当前用户使用` — 分组不可用，换用其他分组重建 Key。
- `The current group does not support the requested model "..."` — 模型不在分组内。报错通常附有该分组的可用模型，从中选择或更换分组。
- `This group does not allow ... requests` — 分组不支持所用的协议入口。例如只开放 Anthropic 格式的分组，使用 `/v1/chat/completions` 即返回此错误。
- `this group only allows Claude Code clients` — 该分组只接受 Claude Code，需更换客户端或分组。

原 `ChatGPT Pro` 系列分组已合并为 `ChatGPT`，绑定旧分组的 Key 需用新分组重建，见 [核心概念](/docs/concepts#需要留意的分组)。

**团队**

`团队已暂停`、`团队成员关系已失效`、`团队付款所有者已停用` 需由团队所有者处理，见 [团队](/docs/tokenflux/team)。

**内容审核**

`内容审计命中风险规则，请调整输入后重试` — 调整输入内容后重试。

## 429 额度或限流

### 额度用尽

需充值或等待周期重置。

| message                                          | 处理方式                                                                |
| ------------------------------------------------ | ----------------------------------------------------------------------- |
| `API key 额度已用完`                             | 该 Key 设有独立额度，在 [API 密钥页面](https://tokenflux.dev/keys) 调整 |
| `api key 5小时限额已用完` / `日限额` / `7天限额` | Key 的滚动限额，等待窗口结束或修改 Key 配置                             |
| `团队成员日限额已用完`（周 / 月同理）            | 联系团队所有者调整限额                                                  |
| 包含 `reason="DAILY_LIMIT_EXCEEDED"` 的文本      | 订阅的日额度用尽，周 / 月同理                                           |
| `Daily usage quota exhausted for this platform.` | 该平台的日额度用尽                                                      |

### 频率超限

降低请求频率后可恢复。

| message                                                   | 处理方式                                  |
| --------------------------------------------------------- | ----------------------------------------- |
| `group requests-per-minute limit exceeded`                | 降低请求频率，响应头含 `Retry-After`      |
| `user requests-per-minute limit exceeded`                 | 同上                                      |
| `Concurrency limit exceeded for user, please retry later` | 降低并发数                                |
| `Too many pending requests, please retry later`           | 等待队列已满，稍后重试                    |
| `Upstream rate limit exceeded, please retry later`        | 服务限流中，等待或更换模型                |
| `Too many invalid authentication attempts; retry later`   | 认证失败次数过多触发保护，先修正 Key 配置 |

响应包含 `Retry-After` 时按其指示等待，否则采用指数退避。失败重试同样可能产生费用，不要循环重试。

## 400 请求格式错误

| message                                                                  | 处理方式                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| `model is required`                                                      | 客户端未传模型 ID，检查是否已选择模型                                     |
| `Failed to parse request body`                                           | 请求体不是合法 JSON                                                       |
| `API key in query parameter is deprecated...`                            | Key 写在 URL 中，改用请求头                                               |
| `composite api key model must use prefix/model_id`                       | 复合 Key 的模型 ID 需带前缀，见 [复合 Key](/docs/tokenflux/composite-key) |
| `Your Claude Code version ... is below the minimum required version ...` | 按提示升级 Claude Code                                                    |

## 5xx 服务端错误

502 与 503 通常为临时故障，与客户端配置无关。

- 等待 1–2 分钟后重试，或更换模型
- `Upstream service overloaded, please retry later`（503）表示服务过载
- `No available accounts`（503）表示分组当前无可用账号，可更换分组
- 持续无法恢复时按下方格式反馈

## 怎么反馈

自查后仍未解决时，按下方模板提供信息。附上发生时间（含时区）和响应中提供的请求 ID，便于定位日志。分享前移除 API Key、Authorization / Cookie 请求头及私人对话内容；截图也需脱敏。

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

| 字段     | 填什么                                    |
| -------- | ----------------------------------------- |
| 模型 ID  | 从模型广场复制的完整 ID，不要简写         |
| 分组     | Key 绑定的分组名                          |
| 客户端   | 名称与版本，例如 `Claude Code 2.x`        |
| API 地址 | 实际填写的地址                            |
| 系统     | Windows / macOS / Linux                   |
| 故障     | 具体现象，附 HTTP 状态码和 `message` 原文 |
| 预期     | 认为正确的表现                            |
| 复现步骤 | 触发问题的最小操作                        |
| 对比     | 何种情况正常、何种情况异常                |

模型 ID、分组、客户端、API 地址和完整报错缺一不可。同一条报错在不同组合下原因可能完全不同。

对比信息能直接缩小排查范围，例如「换用其他分组正常」「纯对话正常，涉及文件编辑失败」。反馈前可先测试更换分组、模型或客户端。

企业级接入或渠道合作的联系方式见 [FAQ](/docs/faq)。

## 相关入口

- [错误码](/docs/errors) — 完整错误码清单
- [核心概念](/docs/concepts) — 分组、额度与扣费顺序
- [API 端点](/docs/tokenflux/endpoints) — 地址与协议格式
- [使用记录](https://tokenflux.dev/usage) — 核对请求明细
