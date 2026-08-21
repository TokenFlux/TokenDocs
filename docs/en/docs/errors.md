# Error Codes

When a request fails, the two things to read are the **HTTP status code** and the `message` in the response body.

If you do not know where to start, go to [Troubleshooting](/en/docs/troubleshooting) first.

## Response Format

The shape of the error body depends on the entry point. Do not parse it as a fixed structure.

Authentication and billing errors use a flat shape:

```json
{ "code": "API_KEY_DISABLED", "message": "API key is disabled" }
```

OpenAI-format endpoints:

```json
{ "error": { "type": "invalid_request_error", "message": "model is required" } }
```

Anthropic-format endpoints:

```json
{ "type": "error", "error": { "type": "invalid_request_error", "message": "model is required" } }
```

On Gemini native endpoints, `error.code` is the numeric HTTP status and the error identifier appears only inside `message`.

::: warning Do not rely on the code field
`code` and `error.type` are not present on every entry point, and the same error may use different field names depending on where it came from. **Only the HTTP status code and the `message` text are stable.**
:::

## 400 Bad Request

| message | Meaning |
| --- | --- |
| `model is required` | The request body has no `model` field |
| `Request body is empty` | Empty request body |
| `Failed to parse request body` | The body is not valid JSON |
| `Failed to read request body` | The body could not be read |
| `invalid stream field type` | `stream` is not a boolean |
| `API key in query parameter is deprecated. Please use Authorization header instead.` | The key was passed in the URL - use a header instead |
| `Request body too large, limit is ...` | The body exceeds the size limit (returned as 413) |

Claude Code version gating also lands here:

| message | What to do |
| --- | --- |
| `Unable to determine Claude Code version. Please update Claude Code: npm update -g @anthropic-ai/claude-code` | Update Claude Code |
| `Your Claude Code version (...) is below the minimum required version (...)` | Update to the version named in the message |
| `Your Claude Code version (...) exceeds the maximum allowed version (...)` | Downgrade as instructed |

Composite key prefix errors are listed in [Composite Key](/en/docs/tokenflux/composite-key#common-errors) and all return 400.

## 401 Unauthenticated

| code | message | Meaning |
| --- | --- | --- |
| `API_KEY_REQUIRED` | `API key is required in Authorization header (Bearer scheme), x-api-key header, or x-goog-api-key header` | None of the three auth headers were sent |
| `INVALID_API_KEY` | `Invalid API key` | The key does not exist, or it is longer than 128 bytes |
| `API_KEY_DISABLED` | `API key is disabled` | The key has been disabled |
| `USER_NOT_FOUND` | `User associated with API key not found` | The account behind the key is missing |
| `USER_INACTIVE` | `User account is not active` | The account is deactivated |

::: tip Expiry and quota are not 401
An expired key returns **403** and an exhausted quota returns **429**. See the sections below.
:::

## 403 Forbidden

### Account and Key

| code | message | Meaning |
| --- | --- | --- |
| `API_KEY_EXPIRED` | `API key 已过期` | The key is past its expiry date |
| `INSUFFICIENT_BALANCE` | `Insufficient account balance` | Not enough account balance |
| `ACCESS_DENIED` | `Access denied. Your IP is ...` | Your IP is not allowed for this key |

::: warning Insufficient balance is 403, not 402
The only endpoint that returns 402 is the batch image API. Balance problems are always 403, and exhausted quota is 429.
:::

### Groups

| code | message | Meaning |
| --- | --- | --- |
| `GROUP_DELETED` | `API Key 所属分组已删除` | The group was deleted |
| `GROUP_DISABLED` | `API Key 所属分组已停用` | The group is disabled |
| `GROUP_DISABLED_FOR_USER` | `API Key 所属公开分组已被禁用` | That group is unavailable to you |
| `GROUP_NOT_ALLOWED` | `API Key 所属专属分组不再允许当前用户使用` | Access to a private group was revoked |

In all of these cases, create a new key on a different group. See [Create API Key](/en/docs/tokenflux/create-apikey).

### Group Capabilities

| message | Meaning |
| --- | --- |
| `The current group does not support the requested model "..."` | The model is not in that group. The message usually lists the available models |
| `This group does not allow Anthropic Messages requests` | The group does not allow `/v1/messages` |
| `This group does not allow OpenAI Chat Completions requests` | The group does not allow `/v1/chat/completions` |
| `This group does not allow OpenAI Responses requests` | The group does not allow `/v1/responses` |
| `This group does not allow Gemini GenerateContent requests` | The group does not allow Gemini native endpoints |
| `this group only allows Claude Code clients` | The group only accepts Claude Code |
| `This group is restricted to Claude Code clients (/v1/messages only)` | That group is limited to `/v1/messages` |
| `Image generation is not enabled for this group` | Image generation is off for that group |
| `API Key is not assigned to any group and cannot be used. Please contact the administrator to assign it to a group.` | The key has no group |

For how groups differ, see [Core Concepts](/en/docs/concepts#groups).

### Team

| code | message |
| --- | --- |
| `TEAM_FEATURE_DISABLED` | `团队功能未启用` |
| `TEAM_SUSPENDED` | `团队已暂停` |
| `TEAM_MEMBERSHIP_REQUIRED` | `团队成员关系已失效` |
| `TEAM_ACTOR_INACTIVE` | `团队密钥所属成员已停用` |
| `TEAM_BILLING_OWNER_INACTIVE` | `团队付款所有者已停用` |

See [Team](/en/docs/tokenflux/team).

### Content Moderation

| message | Meaning |
| --- | --- |
| `内容审计命中风险规则，请调整输入后重试` | The request was blocked by content moderation. Adjust the input and retry |

### Subscription

Subscription errors return a string containing `reason=`. **Reading `reason` is enough:**

```
error: code=403 reason="SUBSCRIPTION_EXPIRED" message="subscription has expired" metadata=map[]
```

| `reason` | Meaning |
| --- | --- |
| `SUBSCRIPTION_EXPIRED` | The subscription expired |
| `SUBSCRIPTION_SUSPENDED` | The subscription is suspended |
| `SUBSCRIPTION_NOT_FOUND` | No subscription found |
| `SUBSCRIPTION_INVALID` | The subscription is invalid or expired |
| `PREFERRED_SUBSCRIPTION_INVALID` | The chosen subscription is unavailable |
| `PREFERRED_SUBSCRIPTION_GROUP_NOT_ALLOWED` | The chosen subscription does not cover this group |

## 404 Not Found

| message | Meaning |
| --- | --- |
| `Model "..." is not supported by any configured account in this group` | No account in the group serves that model |
| `Embeddings API is not supported for this platform` | That group does not offer this endpoint |
| `count_tokens endpoint is not supported for this platform` | That group does not offer this endpoint |

Copy the full model ID from the [model marketplace](https://tokenflux.dev/models).

## 429 Quota or Rate Limit

### Quota Exhausted

| code | message | Meaning |
| --- | --- | --- |
| `API_KEY_QUOTA_EXHAUSTED` | `API key 额度已用完` | This key's own quota is used up |
| - | `api key 5小时限额已用完` | The key's 5-hour rolling limit |
| - | `api key 日限额已用完` | The key's 1-day rolling limit |
| - | `api key 7天限额已用完` | The key's 7-day rolling limit |
| `TEAM_MEMBER_DAILY_LIMIT_EXCEEDED` | `团队成员日限额已用完` | Team member daily limit |
| `TEAM_MEMBER_WEEKLY_LIMIT_EXCEEDED` | `团队成员周限额已用完` | Team member weekly limit |
| `TEAM_MEMBER_MONTHLY_LIMIT_EXCEEDED` | `团队成员月限额已用完` | Team member monthly limit |
| - | `Daily usage quota exhausted for this platform.` | The platform's daily quota is used up |
| - | `Weekly usage quota exhausted for this platform.` | The platform's weekly quota is used up |
| - | `Monthly usage quota exhausted for this platform.` | The platform's monthly quota is used up |

Subscription quota errors also return a `reason=` string, where `reason` is `DAILY_LIMIT_EXCEEDED`, `WEEKLY_LIMIT_EXCEEDED`, or `MONTHLY_LIMIT_EXCEEDED`.

### Rate and Concurrency

| message | Meaning | `Retry-After` |
| --- | --- | --- |
| `group requests-per-minute limit exceeded` | Group requests per minute exceeded | Yes |
| `user requests-per-minute limit exceeded` | Account requests per minute exceeded | Yes |
| `Concurrency limit exceeded for user, please retry later` | Your concurrency limit | No |
| `Concurrency limit exceeded for account, please retry later` | Upstream account concurrency limit | No |
| `Too many pending requests, please retry later` | The wait queue is full | No |
| `Image generation concurrency limit exceeded, please retry later` | Image generation concurrency limit | No |
| `Too many invalid authentication attempts; retry later` | Too many failed auth attempts from one IP | Yes |
| `Upstream rate limit exceeded, please retry later` | The upstream provider is rate limiting | Sometimes |

When `Retry-After` is present, wait the number of seconds it specifies. Otherwise back off exponentially - do not retry immediately.

## 5xx Server and Upstream

**Upstream error text is not passed through.** The gateway maps the upstream status code to its own standard wording, so `message` is TokenFlux phrasing, not the model provider's.

| Status | message | Trigger |
| --- | --- | --- |
| 502 | `Upstream authentication failed, please contact administrator` | Upstream returned 401 |
| 502 | `Upstream access forbidden, please contact administrator` | Upstream returned 403 |
| 502 | `Upstream service temporarily unavailable` | Upstream returned 500 / 502 / 503 / 504 |
| 502 | `Upstream request failed` | Upstream returned some other error |
| 502 | `All available accounts exhausted` | Every available account was tried and failed |
| 503 | `Upstream service overloaded, please retry later` | Upstream returned 529 |
| 503 | `No available accounts` | The group currently has no usable account |
| 503 | `Service temporarily unavailable` | Accounts are temporarily unavailable |
| 503 | `Billing service temporarily unavailable. Please retry later.` | The billing service is temporarily down |
| 503 | `API key authentication is temporarily unavailable` | Authentication is overloaded |

Most 502 and 503 responses are upstream turbulence. Wait one or two minutes and retry, or switch models. If it persists, report it as described in [Troubleshooting](/en/docs/troubleshooting#how-to-report-a-problem).

The gateway never returns 529 itself - an upstream 529 is converted to 503.

## Related Pages

- [Troubleshooting](/en/docs/troubleshooting) - find the problem by symptom
- [Core Concepts](/en/docs/concepts) - groups, quota, and billing order
- [Usage logs](https://tokenflux.dev/usage) - check the real status code and usage per request
