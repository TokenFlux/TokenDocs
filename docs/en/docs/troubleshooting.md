# Troubleshooting

Find the section that matches your symptom. For what a specific error code means, see [Error Codes](/en/docs/errors).

## Check Three Things First

1. **Get the full error.** Client UIs usually simplify it. You need the HTTP status code and the raw `message`.
2. **Open the [usage logs](https://tokenflux.dev/usage).** They show whether the request reached TokenFlux, which model and key it used, and the status code. If the request is not there, it never made it to the gateway.
3. **Confirm the service is up:**

```bash
curl https://tokenflux.dev/health
```

`{"status":"ok"}` means the gateway is fine and the problem is on the configuration or account side.

## No Connection, or Nothing Happens

Check in order:

1. The API address must use `https://`, not `http://`.
2. The address matches the protocol your client expects:

   | Client expects | Use |
   | --- | --- |
   | `OPENAI_BASE_URL`, or anything labelled "OpenAI compatible" | `https://tokenflux.dev/v1` |
   | `ANTHROPIC_BASE_URL` | `https://tokenflux.dev` |

   Full details in [API Endpoints](/en/docs/tokenflux/endpoints).
3. Do not append `/chat/completions` or `/v1/messages` yourself - the client adds the path.
4. You are not still using the deprecated `token.memoh.net`.
5. Local proxies, firewalls, or HTTPS interception. Some networks need a proxy to reach the service at all.

## 401 Authentication Failed

| message | What to do |
| --- | --- |
| `API key is required in ...` | No key was sent. Check that the client actually picked up your config |
| `Invalid API key` | The key does not exist. Look for stray spaces, newlines, or quotes |
| `API key is disabled` | The key is disabled - check it on the [API keys page](https://tokenflux.dev/keys) |
| `User account is not active` | The account is deactivated. Contact the platform |

Getting 401 right after changing a key usually means the client is still holding the old environment variable. Quit the client completely and reopen it - reloading the window is not enough.

::: tip 401 is never about quota
An expired key is 403 and an exhausted quota is 429. If you see 401, only the key itself is at fault.
:::

## 403 Forbidden

Work out which category the `message` belongs to.

**Account**

- `Insufficient account balance` - top up at [Top-up/Subscription](https://tokenflux.dev/purchase). Note this is 403, not 402.
- `API key 已过期` - the key expired. Create a new one.
- `Access denied. Your IP is ...` - your IP is outside the range allowed for this key.

**Group**

- `API Key 所属分组已删除` / `已停用` / `已被禁用` / `不再允许当前用户使用` - the group is no longer usable. Create a key on another group.
- `The current group does not support the requested model "..."` - the model is not in that group. The message usually lists what is available; pick one of those or switch groups.
- `This group does not allow ... requests` - the group does not accept the protocol you used. A group that only exposes the Anthropic format will reject `/v1/chat/completions`, for example.
- `this group only allows Claude Code clients` - switch client or switch group.
- The `ChatGPT Pro` group is Codex only. Other clients should use a group with no client restriction, see [Core Concepts](/en/docs/concepts#groups-that-need-attention).

**Team**

Messages like `团队已暂停`, `团队成员关系已失效`, and `团队付款所有者已停用` need the team owner to act. See [Team](/en/docs/tokenflux/team).

**Subscription**

The response contains `reason=`. Read that value - `SUBSCRIPTION_EXPIRED` means the subscription lapsed, for example.

**Content moderation**

`内容审计命中风险规则，请调整输入后重试` - adjust your input.

## 429 Quota or Rate Limit

First decide whether the quota is **exhausted** or the **rate** is too high. The fixes are different.

**Quota exhausted** - only a top-up or a new period restores it

| message | What to do |
| --- | --- |
| `API key 额度已用完` | This key has its own quota. Adjust it on the [API keys page](https://tokenflux.dev/keys) |
| `api key 5小时限额已用完` / `日限额` / `7天限额` | A rolling limit on the key. Wait for the window or change the key config |
| `团队成员日限额已用完` (weekly / monthly likewise) | Ask the team owner to raise the limit |
| A string containing `reason="DAILY_LIMIT_EXCEEDED"` | The subscription's daily quota is gone; weekly and monthly behave the same |
| `Daily usage quota exhausted for this platform.` | That platform's daily quota is gone |

**Rate limited** - recovers on its own

| message | What to do |
| --- | --- |
| `group requests-per-minute limit exceeded` | Slow down; the response carries `Retry-After` |
| `user requests-per-minute limit exceeded` | Same |
| `Concurrency limit exceeded for user, please retry later` | Reduce concurrency |
| `Too many pending requests, please retry later` | The queue is full, retry shortly |
| `Upstream rate limit exceeded, please retry later` | The provider is throttling. Wait or switch models |
| `Too many invalid authentication attempts; retry later` | Too many failed auth attempts. Fix the key first |

Honour `Retry-After` when it is present. Otherwise back off exponentially - never retry in a tight loop, since failed retries can still cost money.

## 400 Bad Request

| message | What to do |
| --- | --- |
| `model is required` | The client sent no model ID. Check that a model is selected |
| `Failed to parse request body` | The body is not valid JSON |
| `API key in query parameter is deprecated...` | The key is in the URL. Move it to a header |
| `composite api key model must use prefix/model_id` | Composite keys need a prefix on the model ID, see [Composite Key](/en/docs/tokenflux/composite-key) |
| `Your Claude Code version ... is below the minimum required version ...` | Update Claude Code as instructed |

## 5xx Server Errors

502 and 503 are almost always upstream turbulence rather than a problem with your setup.

- Wait one or two minutes and retry, or try a different model
- `Upstream service overloaded, please retry later` (503) means the provider is overloaded
- `No available accounts` (503) means the group has no usable account right now - try another group
- If it does not recover within about fifteen minutes, report it using the format below

::: tip Upstream errors are not passed through
The gateway replaces upstream errors with its own wording, so `message` is TokenFlux phrasing. To see which stage failed, check the status code in the [usage logs](https://tokenflux.dev/usage).
:::

## How to Report a Problem

If self-diagnosis does not resolve it, fill in the template below. Complete information avoids a long back-and-forth.

::: tip The five that matter most
**Model ID, group, client, API address, and the full error.** The same error message can have completely different causes depending on the combination, so none of these can be skipped.
:::

```text
Model ID:
Group:
Client:
API address:
OS:
Problem:
Expected:
Steps to reproduce:
Comparison:
```

| Field | What to put |
| --- | --- |
| Model ID | The full ID copied from the model marketplace, not an abbreviation |
| Group | The group the key is bound to |
| Client | Name and version, for example `Claude Code 2.x` |
| API address | The exact string you configured |
| OS | Windows / macOS / Linux |
| Problem | What actually happens, with the HTTP status code and raw `message` |
| Expected | What you think should happen |
| Steps to reproduce | The smallest sequence that triggers it |
| Comparison | What works and what does not |

**The comparison is the most valuable field.** "Works on another group" or "plain chat is fine, editing files fails" narrows the problem by an order of magnitude compared to "it does not work". Before reporting, ask yourself: does another group do this? Another model? Another client?

For enterprise integration or channel partnerships, join QQ group `794504445`, see [FAQ](/en/docs/faq).

## Related Pages

- [Error Codes](/en/docs/errors) - the full error reference
- [Core Concepts](/en/docs/concepts) - groups, quota, and billing order
- [API Endpoints](/en/docs/tokenflux/endpoints) - address and protocol format
- [Usage logs](https://tokenflux.dev/usage) - check request details
