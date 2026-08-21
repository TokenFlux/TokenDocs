# Quickstart

TokenFlux is a unified interface for large language models: one API key lets you call models from many providers inside the client you already use.

::: tip Access Note
Some content on this site or related services may require a proxy before access works reliably. Use the default `tokenflux.dev` endpoint for API requests; the former mainland acceleration endpoint is deprecated.
:::

::: details For AGENTS
For bulk Markdown reads, use [markdown-sitemap.xml](/markdown-sitemap.xml). For a single page, append `.md` to any documentation URL that does not end with `/`, for example `/en/docs/quickstart.md`.
:::

## Three Steps

| Step | What to do | Where |
| --- | --- | --- |
| 1 | Top up or subscribe to get inference credits | [Top-up/Subscription](https://tokenflux.dev/purchase) · [Billing](/en/docs/tokenflux/billing) |
| 2 | Create an API key and pick a group | [Create API Key](/en/docs/tokenflux/create-apikey) |
| 3 | Enter the key and endpoint in your client | See the selection below |

Prices shown in the model marketplace are the final billing prices.

For groups, account pools, inference credits, and other terms, see [Core Concepts](/en/docs/concepts).

## Pick Your Client

<DocsTabs default-tab="agent">
  <DocsTab title="Agent" name="agent">

Best for terminal workflows, programming tasks, or users who want AI Agent assistance while developing.

Install [CC-Switch](/en/docs/agents/cc-switch) first. It manages API keys and provider settings in one place, removing the need to edit environment variables by hand. Then follow the guide for your client:

| Client | Best for | Guide |
| --- | --- | --- |
| Claude Code | Anthropic's official CLI, terminal coding | [Guide](/en/docs/agents/claude-code) |
| Codex | OpenAI's official CLI and desktop app | [Guide](/en/docs/agents/codex) |
| Codex++ | Adds extra capabilities on top of Codex | [Guide](/en/docs/agents/codex-plus-plus) |
| OpenCode | Open-source terminal agent with model switching | [Guide](/en/docs/agents/opencode) |
| Hermes | Lightweight terminal agent | [Guide](/en/docs/agents/hermes) |

  </DocsTab>

  <DocsTab title="ChatBot" name="chatbot">

Best for users who prefer graphical interfaces, mobile usage, or daily conversational workflows.

| Client | Best for | Guide |
| --- | --- | --- |
| Cherry Studio | Desktop (Windows / macOS / Linux), multi-model switching | [Guide](/en/docs/chatbot/cherry-studio) |
| RikkaHub | Android, OpenAI compatible | [Guide](/en/docs/chatbot/rikkahub) |

Add TokenFlux as a custom provider in the client settings, enter your API key and an [API endpoint](/en/docs/tokenflux/endpoints), fetch the model list, and start chatting.

  </DocsTab>
</DocsTabs>

## Verify the Setup

Once the client is configured, these two steps confirm the key, endpoint, and group are all correct. Replace `$KEY` with your API key.

The first step lists models and costs nothing:

```bash
curl https://tokenflux.dev/v1/models -H "authorization: Bearer $KEY"
```

| Response | Meaning |
| --- | --- |
| A model list | The key works, the group is usable, and the endpoint is correct |
| `401` `Invalid API key` | The key does not exist; check for stray spaces or quotes |
| `401` `API key is disabled` | The key is disabled; check its status on the [API keys page](https://tokenflux.dev/keys) |
| `403` | A group, balance, or subscription problem, see [Error Codes](/en/docs/errors#_403-forbidden) |

The second step sends a real request and is billed. Use any model ID returned by the first step:

```bash
curl https://tokenflux.dev/v1/chat/completions \
  -H "authorization: Bearer $KEY" \
  -H "content-type: application/json" \
  -d '{"model":"<model-id>","messages":[{"role":"user","content":"Reply with OK only"}],"max_tokens":16}'
```

A reply means the setup works. The call appears in the [usage logs](https://tokenflux.dev/usage).

For a group on the Anthropic format, use `https://tokenflux.dev/v1/messages`, switch the header to `x-api-key`, and add `anthropic-version: 2023-06-01`.

## Going Further

After integration, the following may be useful:

- [Composite Key](/en/docs/tokenflux/composite-key) - bind one key to several groups and switch with prefixes
- [Fast Mode](/en/docs/tokenflux/fast-mode) - force the high-priority tier at the key level
- [Team](/en/docs/tokenflux/team) - share the owner's balance while everyone keeps their own keys
- [Referral Rewards](/en/docs/tokenflux/referral) - earn inference credits by inviting friends

## Troubleshooting

- [Troubleshooting](/en/docs/troubleshooting) - find the problem by symptom, with a report template
- [Error Codes](/en/docs/errors) - the full error reference
- [FAQ](/en/docs/faq) - enterprise integration, model detection, and other common questions
- [API Endpoints](/en/docs/tokenflux/endpoints) - choosing an endpoint and migrating from deprecated routes
- [Usage Policy](/en/docs/tos/usage-policy) - what gets accounts banned
