# API Endpoints

Most clients ask for an API address (base URL) during setup. This page lists every TokenFlux endpoint.

## Endpoint Overview

| Purpose | OpenAI format | Anthropic format |
| --- | --- | --- |
| Default | `https://tokenflux.dev/v1` | `https://tokenflux.dev` |
| Optimized for mainland China | `https://token.memoh.net/v1` | `https://token.memoh.net` |

Both sets are functionally identical, use the same API key, and can be swapped at any time.

The default endpoints can also be copied with one click from the top of the [API keys page](https://tokenflux.dev/keys):

<div style="text-align: center;">
  <img src="/images/quickstart/api-endpoints.png" alt="Endpoint bar at the top of the API keys page, with one-click copy for the OpenAI-format and Anthropic-format endpoints" />
</div>

## Which Format to Use

It depends on the client, not the model.

- **OpenAI format** (ends with `/v1`): what most clients expect, including Cherry Studio, RikkaHub, OpenCode, and anything labelled "OpenAI compatible".
- **Anthropic format** (no `/v1`): for clients that speak the Anthropic protocol natively, such as `Claude Code`.

If the client's setting is called `ANTHROPIC_BASE_URL`, use the Anthropic format. If it is `OPENAI_BASE_URL` or just `Base URL`, use the OpenAI format. Each integration guide spells out the exact value to enter.

## Mainland China Endpoints

`token.memoh.net` uses a network path tuned for mainland China, with lower latency and steadier connections.

- Functionally identical to the default endpoints, and the same API key works on both.
- If the default endpoint is unreliable on a mainland network, switching usually helps.
- Only the API address changes; the rest of your client configuration stays the same.

::: tip
You can switch between the two sets at any time. Existing keys, quotas, and usage records are unaffected.
:::

## Related Links

- [Create API Key](/en/docs/tokenflux/create-apikey) - get a key first
- [Quickstart](/en/docs/quickstart) - choose an integration path for your client
- [FAQ](/en/docs/faq) - connection issues and other common questions
