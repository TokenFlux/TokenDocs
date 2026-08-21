# 错误码

请求失败时的判断依据是 HTTP 状态码和响应中的 `message`。按症状定位见 [排障](/docs/troubleshooting)。

## 响应格式

错误体结构随入口而变，部分入口没有 `code` 或 `error.type` 字段，不应按固定结构解析。

认证与计费类错误为平坦结构：

```json
{ "code": "API_KEY_DISABLED", "message": "API key is disabled" }
```

OpenAI 格式入口：

```json
{ "error": { "type": "invalid_request_error", "message": "model is required" } }
```

Anthropic 格式入口：

```json
{ "type": "error", "error": { "type": "invalid_request_error", "message": "model is required" } }
```

Gemini 原生入口的 `error.code` 是 HTTP 状态码数字，错误标识只出现在 `message` 中。

## 400 请求格式错误

| message                                                                              | 含义                                    |
| ------------------------------------------------------------------------------------ | --------------------------------------- |
| `model is required`                                                                  | 请求体没有 `model` 字段                 |
| `Request body is empty`                                                              | 请求体为空                              |
| `Failed to parse request body`                                                       | 请求体不是合法 JSON                     |
| `Failed to read request body`                                                        | 请求体读取失败                          |
| `invalid stream field type`                                                          | `stream` 不是布尔值                     |
| `API key in query parameter is deprecated. Please use Authorization header instead.` | Key 写在了 URL 查询参数中，需改用请求头 |
| `Request body too large, limit is ...`                                               | 请求体超过大小上限，返回 413            |

复合 Key 的前缀错误见 [复合 Key](/docs/tokenflux/composite-key#常见错误)，全部返回 400。

### Claude Code 版本

| message                                                                                                       | 处理             |
| ------------------------------------------------------------------------------------------------------------- | ---------------- |
| `Unable to determine Claude Code version. Please update Claude Code: npm update -g @anthropic-ai/claude-code` | 升级 Claude Code |
| `Your Claude Code version (...) is below the minimum required version (...)`                                  | 升级到提示的版本 |
| `Your Claude Code version (...) exceeds the maximum allowed version (...)`                                    | 按提示降级       |

## 401 认证失败

| code               | message                                                                                                   | 含义                            |
| ------------------ | --------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `API_KEY_REQUIRED` | `API key is required in Authorization header (Bearer scheme), x-api-key header, or x-goog-api-key header` | 三个认证头都没带                |
| `INVALID_API_KEY`  | `Invalid API key`                                                                                         | Key 不存在，或长度超过 128 字节 |
| `API_KEY_DISABLED` | `API key is disabled`                                                                                     | Key 已被禁用                    |
| `USER_NOT_FOUND`   | `User associated with API key not found`                                                                  | Key 关联的账号不存在            |
| `USER_INACTIVE`    | `User account is not active`                                                                              | 账号已停用                      |

## 403 拒绝访问

### 账户与密钥

| code                   | message                         | 含义                    |
| ---------------------- | ------------------------------- | ----------------------- |
| `API_KEY_EXPIRED`      | `API key 已过期`                | Key 超过有效期          |
| `INSUFFICIENT_BALANCE` | `Insufficient account balance`  | 账户余额不足            |
| `ACCESS_DENIED`        | `Access denied. Your IP is ...` | 当前 IP 不被该 Key 允许 |

### 分组

| code                      | message                                    | 含义                   |
| ------------------------- | ------------------------------------------ | ---------------------- |
| `GROUP_DELETED`           | `API Key 所属分组已删除`                   | 分组已被删除           |
| `GROUP_DISABLED`          | `API Key 所属分组已停用`                   | 分组被停用             |
| `GROUP_DISABLED_FOR_USER` | `API Key 所属公开分组已被禁用`             | 该分组对当前账号不可用 |
| `GROUP_NOT_ALLOWED`       | `API Key 所属专属分组不再允许当前用户使用` | 专属分组授权被撤销     |

以上情况需换用其他分组重建 Key，见 [创建 API Key](/docs/tokenflux/create-apikey)。

### 分组能力限制

| message                                                                                                              | 含义                                       |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `The current group does not support the requested model "..."`                                                       | 模型不属于该分组，后方通常附有可用模型列表 |
| `This group does not allow Anthropic Messages requests`                                                              | 分组不允许 `/v1/messages`                  |
| `This group does not allow OpenAI Chat Completions requests`                                                         | 分组不允许 `/v1/chat/completions`          |
| `This group does not allow OpenAI Responses requests`                                                                | 分组不允许 `/v1/responses`                 |
| `This group does not allow Gemini GenerateContent requests`                                                          | 分组不允许 Gemini 原生入口                 |
| `this group only allows Claude Code clients`                                                                         | 分组只接受 Claude Code 客户端              |
| `This group is restricted to Claude Code clients (/v1/messages only)`                                                | 该分组只能走 `/v1/messages`                |
| `Image generation is not enabled for this group`                                                                     | 分组未开放生图                             |
| `API Key is not assigned to any group and cannot be used. Please contact the administrator to assign it to a group.` | Key 未绑定分组                             |

分组之间的差异见 [核心概念](/docs/concepts#分组)。

### 团队

| code                          | message                  |
| ----------------------------- | ------------------------ |
| `TEAM_FEATURE_DISABLED`       | `团队功能未启用`         |
| `TEAM_SUSPENDED`              | `团队已暂停`             |
| `TEAM_MEMBERSHIP_REQUIRED`    | `团队成员关系已失效`     |
| `TEAM_ACTOR_INACTIVE`         | `团队密钥所属成员已停用` |
| `TEAM_BILLING_OWNER_INACTIVE` | `团队付款所有者已停用`   |

详见 [团队](/docs/tokenflux/team)。

### 内容审核

| message                                  | 含义               |
| ---------------------------------------- | ------------------ |
| `内容审计命中风险规则，请调整输入后重试` | 请求内容被审核拦截 |

### 订阅

订阅相关的 403 返回一段包含 `reason=` 的文本，原因由 `reason` 的取值决定：

```text
error: code=403 reason="SUBSCRIPTION_EXPIRED" message="subscription has expired" metadata=map[]
```

| `reason`                                   | 含义                     |
| ------------------------------------------ | ------------------------ |
| `SUBSCRIPTION_EXPIRED`                     | 订阅已过期               |
| `SUBSCRIPTION_SUSPENDED`                   | 订阅被暂停               |
| `SUBSCRIPTION_NOT_FOUND`                   | 找不到订阅               |
| `SUBSCRIPTION_INVALID`                     | 订阅无效或已过期         |
| `PREFERRED_SUBSCRIPTION_INVALID`           | 指定的订阅不可用         |
| `PREFERRED_SUBSCRIPTION_GROUP_NOT_ALLOWED` | 指定的订阅不覆盖当前分组 |

## 404 找不到

| message                                                                | 含义                     |
| ---------------------------------------------------------------------- | ------------------------ |
| `Model "..." is not supported by any configured account in this group` | 分组内没有账号支持该模型 |
| `Embeddings API is not supported for this platform`                    | 该分组不提供此接口       |
| `count_tokens endpoint is not supported for this platform`             | 该分组不提供此接口       |

模型 ID 请从 [模型广场](https://tokenflux.dev/models) 复制完整值。

## 429 额度或限流

### 额度用尽

| code                                 | message                                            | 含义                      |
| ------------------------------------ | -------------------------------------------------- | ------------------------- |
| `API_KEY_QUOTA_EXHAUSTED`            | `API key 额度已用完`                               | 该 Key 单独设置的额度用尽 |
| —                                    | `api key 5小时限额已用完`                          | Key 的 5 小时滚动限额     |
| —                                    | `api key 日限额已用完`                             | Key 的 1 天滚动限额       |
| —                                    | `api key 7天限额已用完`                            | Key 的 7 天滚动限额       |
| `TEAM_MEMBER_DAILY_LIMIT_EXCEEDED`   | `团队成员日限额已用完`                             | 团队成员日限额            |
| `TEAM_MEMBER_WEEKLY_LIMIT_EXCEEDED`  | `团队成员周限额已用完`                             | 团队成员周限额            |
| `TEAM_MEMBER_MONTHLY_LIMIT_EXCEEDED` | `团队成员月限额已用完`                             | 团队成员月限额            |
| —                                    | `Daily usage quota exhausted for this platform.`   | 该平台的日额度用尽        |
| —                                    | `Weekly usage quota exhausted for this platform.`  | 该平台的周额度用尽        |
| —                                    | `Monthly usage quota exhausted for this platform.` | 该平台的月额度用尽        |

订阅额度用尽同样返回包含 `reason=` 的文本，取值为 `DAILY_LIMIT_EXCEEDED`、`WEEKLY_LIMIT_EXCEEDED` 或 `MONTHLY_LIMIT_EXCEEDED`。

### 频率与并发

| message                                                           | 含义                     | `Retry-After` |
| ----------------------------------------------------------------- | ------------------------ | ------------- |
| `group requests-per-minute limit exceeded`                        | 分组每分钟请求数超限     | 有            |
| `user requests-per-minute limit exceeded`                         | 账号每分钟请求数超限     | 有            |
| `Concurrency limit exceeded for user, please retry later`         | 账号并发数超限           | 无            |
| `Concurrency limit exceeded for account, please retry later`      | 上游账号并发数超限       | 无            |
| `Too many pending requests, please retry later`                   | 等待队列已满             | 无            |
| `Image generation concurrency limit exceeded, please retry later` | 生图并发超限             | 无            |
| `Too many invalid authentication attempts; retry later`           | 同一 IP 认证失败次数过多 | 有            |
| `Upstream rate limit exceeded, please retry later`                | 上游限流                 | 可能有        |

响应包含 `Retry-After` 时按其指示等待，否则采用指数退避。

## 5xx 服务端错误

| 状态码 | message                                                        | 含义                       |
| ------ | -------------------------------------------------------------- | -------------------------- |
| 502    | `Upstream authentication failed, please contact administrator` | 账号认证失败，需平台处理   |
| 502    | `Upstream access forbidden, please contact administrator`      | 账号被拒绝访问，需平台处理 |
| 502    | `Upstream service temporarily unavailable`                     | 服务暂时不可用             |
| 502    | `Upstream request failed`                                      | 请求失败                   |
| 502    | `All available accounts exhausted`                             | 可用账号均已重试失败       |
| 503    | `Upstream service overloaded, please retry later`              | 服务过载                   |
| 503    | `No available accounts`                                        | 分组当前没有可用账号       |
| 503    | `Service temporarily unavailable`                              | 账号暂时不可用             |
| 503    | `Billing service temporarily unavailable. Please retry later.` | 计费服务暂时不可用         |
| 503    | `API key authentication is temporarily unavailable`            | 认证服务过载               |

502 与 503 通常为临时故障。等待 1–2 分钟后重试，或更换模型。持续出现时按 [排障](/docs/troubleshooting#怎么反馈) 反馈。

## 相关入口

- [排障](/docs/troubleshooting) — 按症状定位问题
- [核心概念](/docs/concepts) — 分组、额度和扣费顺序
- [使用记录](https://tokenflux.dev/usage) — 核对请求的实际状态码和用量
