# API Endpoints

Most clients need an API address (base URL) during setup. TokenFlux exposes three entry points, one per protocol format.

## Protocol Entry Points

| Protocol format | Base URL | Typical request path |
| --- | --- | --- |
| OpenAI format | `https://tokenflux.dev/v1` | `POST /chat/completions` |
| Anthropic format | `https://tokenflux.dev` | `POST /v1/messages` |
| Gemini format | `https://tokenflux.dev` | `POST /v1beta/models/<model-id>:generateContent` |

The OpenAI and Anthropic endpoints can be copied from the top of the [API keys page](https://tokenflux.dev/keys):

<div style="text-align: center;">
  <img src="/images/quickstart/api-endpoints.png" alt="Endpoint section at the top of the API keys page with one-click copy for the OpenAI and Anthropic format endpoints" />
</div>

## Which Format to Use

This depends on the client, not the model.

- **OpenAI format** (ends with `/v1`): used by most clients, including Cherry Studio, RikkaHub, OpenCode, and anything labelled "OpenAI compatible".
- **Anthropic format** (no `/v1`): used by clients that speak the Anthropic protocol natively, such as `Claude Code`.
- **Gemini format**: used by clients and SDKs on Google's native protocol, where the model ID goes in the request path.

If the client's setting is named `ANTHROPIC_BASE_URL`, use the Anthropic format. If it is `OPENAI_BASE_URL` or `Base URL`, use the OpenAI format. Each integration guide states the exact value.

## Authentication

The API key is sent in a request header, which most clients handle automatically.

| Entry point | Accepted credentials |
| --- | --- |
| OpenAI format, Anthropic format | `Authorization: Bearer <key>`, `x-api-key: <key>`, `x-goog-api-key: <key>` |
| Gemini format | All of the above, plus the query parameter `?key=<key>` |

The OpenAI and Anthropic formats do not accept a key in the query string and return 400. On the Gemini format, `?api_key=` is deprecated; use `?key=` or a header.

With a [composite key](/en/docs/tokenflux/composite-key), the model ID needs a prefix; on the Gemini format the prefix goes in the path.

## Deprecated Mainland Acceleration Endpoint

`token.memoh.net` is deprecated and must not be used for new setups. If an existing setup still points at it, switch to the default endpoint for that format:

| Protocol format | Old address | Change to |
| --- | --- | --- |
| OpenAI format | `https://token.memoh.net/v1` | `https://tokenflux.dev/v1` |
| Anthropic format | `https://token.memoh.net` | `https://tokenflux.dev` |

Only the API address in the client needs to change; everything else stays the same. Migration matters most at higher request volumes, where the deprecated endpoint tends to queue requests and raise time to first token.

## Related Pages

- [Create API Key](/en/docs/tokenflux/create-apikey) - get a key first
- [Quickstart](/en/docs/quickstart) - pick an integration path by client
- [Troubleshooting](/en/docs/troubleshooting) - what to check when a client cannot connect
- [Error Codes](/en/docs/errors) - the full list of authentication and request errors
