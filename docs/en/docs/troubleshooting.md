# Troubleshooting

For what a specific error code means, see [Error Codes](/en/docs/errors).

## Initial Checks

1. **Obtain the full error.** Client interfaces usually simplify it. You need the HTTP status code and the raw `message`.
2. **Open the [usage logs](https://tokenflux.dev/usage).** Whether the request reached TokenFlux, which model and key it used, and the status code returned can all be verified there. If the request is absent, check the time range, account, and key first. If it is still missing, check whether the client sent it and whether the network connection works.
3. **Confirm the service is up:**

```bash
curl https://tokenflux.dev/health
```

`{"status":"ok"}` only confirms that the health endpoint is reachable from your network. It does not rule out faults with a particular model, inference endpoint, or upstream service.

## Test the Key and Endpoint on Their Own

These commands use Bash / Zsh; on Windows, use WSL or Git Bash. Set the `KEY` environment variable to your API key in the current terminal first. Do not put the key in shared scripts or reports.

### Query the Model List

```bash
curl -sS -i https://tokenflux.dev/v1/models \
  -H "Authorization: Bearer $KEY"
```

This request is not billed.

| Response     | What it confirms                                  | Next step                                                              |
| ------------ | ------------------------------------------------- | ---------------------------------------------------------------------- |
| A model list | Authentication passed for this model-list request | Send a request using the target model and the client's actual protocol |
| `401`        | Authentication failed for this request            | Check the key and headers; see 401 below                               |
| `403`        | This request was rejected                         | Use `message` to check the group, permissions, or quota; see 403 below |

A successful model list does not prove that inference, a particular model, or streaming works.

### Send a Minimal Inference Request

**The following requests incur inference charges.** Replace `MODEL_ID` with a full model ID supported by the selected group; composite keys require `prefix/model-id`. Choose the endpoint your client actually uses; you do not need to run all three requests. Client-restricted groups may reject curl; verify those in an allowed client instead.

**OpenAI Chat Completions**

```bash
curl -sS -i https://tokenflux.dev/v1/chat/completions \
  -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"MODEL_ID","messages":[{"role":"user","content":"Reply with OK only"}],"stream":false}'
```

**OpenAI Responses (for example, Codex)**

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

HTTP 2xx with model-generated text confirms a successful non-streaming call for this key, model, and endpoint. Text is under `choices` for Chat Completions, `output` for Responses, and `content` for Messages. Check the model and charge in the [usage logs](https://tokenflux.dev/usage).

If curl succeeds but the client fails, compare the actual endpoint, model ID, key, proxy, and request parameters. These tests do not cover streaming, tool calls, images, or WebSocket; test the original failing feature separately.

## No Connection, or Nothing Happens

Check in order:

1. The API address must use `https://`, not `http://`.
2. The address matches the protocol the client expects:

   | Client expects                                              | Use                        |
   | ----------------------------------------------------------- | -------------------------- |
   | `OPENAI_BASE_URL`, or anything labelled "OpenAI compatible" | `https://tokenflux.dev/v1` |
   | `ANTHROPIC_BASE_URL`                                        | `https://tokenflux.dev`    |

   Full details in [API Endpoints](/en/docs/tokenflux/endpoints).

3. Do not append `/chat/completions` or `/v1/messages` yourself; the client completes the path.
4. Local proxies, firewalls, or HTTPS interception. Some networks require a proxy to reach the service.

## 401 Authentication Failed

| message                      | Resolution                                                                               |
| ---------------------------- | ---------------------------------------------------------------------------------------- |
| `API key is required in ...` | No key was sent. Verify the client read your configuration                               |
| `Invalid API key`            | The key does not exist. Check for stray spaces, newlines, or quotes                      |
| `API key is disabled`        | The key is disabled. Check its status on the [API keys page](https://tokenflux.dev/keys) |
| `User account is not active` | The account is deactivated. Contact the platform                                         |

A 401 that persists after changing the key usually means the client is still using the old environment variable. Quit the client completely and restart it; reloading the window is not sufficient.

## 403 Forbidden

**Account**

- `Insufficient account balance` - top up at [Top-up/Subscription](https://tokenflux.dev/purchase).
- `API key 已过期` - the key is past its expiry date and must be recreated.
- `Access denied. Your IP is ...` - your IP is outside the range permitted for this key.

**Group**

- `API Key 所属分组已删除` / `已停用` / `已被禁用` / `不再允许当前用户使用` - the group is unusable. Create a key on another group.
- `The current group does not support the requested model "..."` - the model is not in that group. The message usually lists what is available; choose one of those or switch groups.
- `This group does not allow ... requests` - the group does not accept the protocol used. A group exposing only the Anthropic format returns this for `/v1/chat/completions`.
- `this group only allows Claude Code clients` - switch client or switch group.

The former `ChatGPT Pro` groups have been merged into `ChatGPT`. Keys bound to an old group must be recreated on the new one, see [Core Concepts](/en/docs/concepts#groups-that-need-attention).

**Team**

`团队已暂停`, `团队成员关系已失效`, and `团队付款所有者已停用` require action from the team owner. See [Team](/en/docs/tokenflux/team).

**Content moderation**

`内容审计命中风险规则，请调整输入后重试` - adjust the input and retry.

## 429 Quota or Rate Limit

### Quota Exhausted

Requires a top-up or the next period.

| message                                              | Resolution                                                                               |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `API key 额度已用完`                                 | This key has its own quota. Adjust it on the [API keys page](https://tokenflux.dev/keys) |
| `api key 5小时限额已用完` / `日限额` / `7天限额`     | A rolling limit on the key. Wait for the window or change the key configuration          |
| `团队成员日限额已用完` (weekly and monthly likewise) | Ask the team owner to adjust the limit                                                   |
| A string containing `reason="DAILY_LIMIT_EXCEEDED"`  | The subscription's daily quota is used up; weekly and monthly behave the same            |
| `Daily usage quota exhausted for this platform.`     | That platform's daily quota is used up                                                   |

### Rate Limited

Recovers once the request rate drops.

| message                                                   | Resolution                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------------ |
| `group requests-per-minute limit exceeded`                | Reduce the request rate; the response carries `Retry-After`        |
| `user requests-per-minute limit exceeded`                 | As above                                                           |
| `Concurrency limit exceeded for user, please retry later` | Reduce concurrency                                                 |
| `Too many pending requests, please retry later`           | The queue is full; retry shortly                                   |
| `Upstream rate limit exceeded, please retry later`        | Rate limited upstream. Wait or switch models                       |
| `Too many invalid authentication attempts; retry later`   | Too many failed auth attempts. Correct the key configuration first |

Wait as instructed when `Retry-After` is present, otherwise back off exponentially. Failed retries can still incur cost, so do not retry in a loop.

## 400 Bad Request

| message                                                                  | Resolution                                                                                             |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `model is required`                                                      | The client sent no model ID. Verify a model is selected                                                |
| `Failed to parse request body`                                           | The body is not valid JSON                                                                             |
| `API key in query parameter is deprecated...`                            | The key is in the URL. Move it to a header                                                             |
| `composite api key model must use prefix/model_id`                       | Composite keys require a prefix on the model ID, see [Composite Key](/en/docs/tokenflux/composite-key) |
| `Your Claude Code version ... is below the minimum required version ...` | Update Claude Code as instructed                                                                       |

## 5xx Server Errors

502 and 503 are usually transient and unrelated to client configuration.

- Retry after one or two minutes, or switch models
- `Upstream service overloaded, please retry later` (503) indicates the service is overloaded
- `No available accounts` (503) means the group has no usable account; try another group
- If it does not recover, report it using the format below

## How to Report a Problem

If self-diagnosis does not resolve the issue, provide the following information. Include the time and time zone, and a request ID if the response provides one. Before sharing, remove API keys, Authorization / Cookie headers, and private conversation content. Redact screenshots too.

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

| Field              | What to provide                                                    |
| ------------------ | ------------------------------------------------------------------ |
| Model ID           | The full ID copied from the model marketplace, not an abbreviation |
| Group              | The group the key is bound to                                      |
| Client             | Name and version, for example `Claude Code 2.x`                    |
| API address        | The exact address configured                                       |
| OS                 | Windows / macOS / Linux                                            |
| Problem            | What actually happens, with the HTTP status code and raw `message` |
| Expected           | The behaviour you consider correct                                 |
| Steps to reproduce | The smallest sequence that triggers it                             |
| Comparison         | Which cases work and which do not                                  |

Model ID, group, client, API address, and the full error are all required. The same error can have entirely different causes depending on the combination.

Comparisons narrow the search directly, such as "works on another group" or "plain chat works, file editing fails". Before reporting, try changing the group, model, or client.

Contact details for enterprise integration and channel partnerships are in the [FAQ](/en/docs/faq).

## Related Pages

- [Error Codes](/en/docs/errors) - the full error reference
- [Core Concepts](/en/docs/concepts) - groups, quota, and billing order
- [API Endpoints](/en/docs/tokenflux/endpoints) - address and protocol format
- [Usage logs](https://tokenflux.dev/usage) - check request details
