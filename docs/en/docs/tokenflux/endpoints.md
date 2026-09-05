# API Endpoints

Most clients need an API address (base URL) during setup. TokenFlux exposes three entry points, one per protocol format.

## Protocol Entry Points

| Protocol format  | Base URL                   | Typical request path                             |
| ---------------- | -------------------------- | ------------------------------------------------ |
| OpenAI format    | `https://tokenflux.dev/v1` | `POST /chat/completions` or `POST /responses`    |
| Anthropic format | `https://tokenflux.dev`    | `POST /v1/messages`                              |
| Gemini format    | `https://tokenflux.dev`    | `POST /v1beta/models/<model-id>:generateContent` |

The OpenAI and Anthropic endpoints can be copied from the top of the [API keys page](https://tokenflux.dev/keys):

<div style="text-align: center;">
  <img src="/images/quickstart/api-endpoints.png" alt="Endpoint section at the top of the API keys page with one-click copy for the OpenAI and Anthropic format endpoints" />
</div>

## Which Format to Use

The client dictates the format, and the group must support that same format.

| Format                          | Clients                                                                                   |
| ------------------------------- | ----------------------------------------------------------------------------------------- |
| OpenAI format (ends with `/v1`) | Cherry Studio, RikkaHub, OpenCode, and anything labelled "OpenAI compatible"              |
| Anthropic format (no `/v1`)     | `Claude Code` and other clients speaking the Anthropic protocol natively                  |
| Gemini format                   | Clients and SDKs on Google's native protocol, where the model ID goes in the request path |

If the client's setting is named `ANTHROPIC_BASE_URL`, use the Anthropic format. If it is `OPENAI_BASE_URL`, use the OpenAI format. `Base URL` is a generic field name and does not identify a protocol; check the selected provider type first. Each integration guide states the exact value.

The OpenAI format includes distinct APIs such as Chat Completions and Responses; Codex uses Responses, for example. Sharing a base URL does not mean a model supports every API. Check that the group and model support the requests your client sends. Complete test requests are in [Troubleshooting](/en/docs/troubleshooting#send-a-minimal-inference-request).

Some models are offered as two groups, one per format, such as `DeepSeek（OpenAI格式）` and `DeepSeek（Anthropic格式）`. Choose the one matching your client when creating an API key; the wrong one returns 403 `This group does not allow ... requests`, see [Error Codes](/en/docs/errors#group-capabilities).

## Authentication

The API key is sent in a request header, which most clients handle automatically.

| Entry point                     | Accepted credentials                                                       |
| ------------------------------- | -------------------------------------------------------------------------- |
| OpenAI format, Anthropic format | `Authorization: Bearer <key>`, `x-api-key: <key>`, `x-goog-api-key: <key>` |
| Gemini format                   | All of the above, plus the query parameter `?key=<key>`                    |

The OpenAI and Anthropic formats do not accept a key in the query string and return 400. On the Gemini format, `?api_key=` is deprecated; use `?key=` or a header.

With a [composite key](/en/docs/tokenflux/composite-key), the model ID needs a prefix; on the Gemini format the prefix goes in the path.

## Related Pages

- [Create API Key](/en/docs/tokenflux/create-apikey) - get a key first
- [Quickstart](/en/docs/quickstart) - pick an integration path by client
- [Troubleshooting](/en/docs/troubleshooting) - what to check when a client cannot connect
- [Error Codes](/en/docs/errors) - the full list of authentication and request errors
