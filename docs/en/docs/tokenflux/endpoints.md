# API Endpoints

Most clients ask for an API address (base URL) during setup. This page lists every TokenFlux endpoint.

## Endpoint Overview

| Purpose | OpenAI format | Anthropic format |
| --- | --- | --- |
| Default | `https://tokenflux.dev/v1` | `https://tokenflux.dev` |
| Mainland acceleration (deprecated) | `https://token.memoh.net/v1` | `https://token.memoh.net` |

Use the default `tokenflux.dev` endpoints for new configurations. `token.memoh.net` is listed only to help identify and migrate existing configurations.

::: tip Use the default endpoint for high request volume
If your request volume is high, switch to the `tokenflux.dev` endpoint. The mainland acceleration endpoint is deprecated and can accumulate queued requests under that load, increasing time to first token.
:::

The default endpoints can also be copied with one click from the top of the [API keys page](https://tokenflux.dev/keys):

<div style="text-align: center;">
  <img src="/images/quickstart/api-endpoints.png" alt="Endpoint bar at the top of the API keys page, with one-click copy for the OpenAI-format and Anthropic-format endpoints" />
</div>

## Which Format to Use

It depends on the client, not the model.

- **OpenAI format** (ends with `/v1`): what most clients expect, including Cherry Studio, RikkaHub, OpenCode, and anything labelled "OpenAI compatible".
- **Anthropic format** (no `/v1`): for clients that speak the Anthropic protocol natively, such as `Claude Code`.

If the client's setting is called `ANTHROPIC_BASE_URL`, use the Anthropic format. If it is `OPENAI_BASE_URL` or just `Base URL`, use the OpenAI format. Each integration guide spells out the exact value to enter.

## Deprecated Mainland Acceleration Endpoints

`token.memoh.net` is deprecated and should not be used for new configurations. If an existing configuration still uses it, switch to the corresponding default endpoint:

- OpenAI format: `https://tokenflux.dev/v1`
- Anthropic format: `https://tokenflux.dev`

Only the API address needs to change; the rest of the client configuration stays the same.

## Related Links

- [Create API Key](/en/docs/tokenflux/create-apikey) - get a key first
- [Quickstart](/en/docs/quickstart) - choose an integration path for your client
- [FAQ](/en/docs/faq) - connection issues and other common questions
