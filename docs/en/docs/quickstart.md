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

## Going Further

After integration, the following may be useful:

- [Composite Key](/en/docs/tokenflux/composite-key) - bind one key to several groups and switch with prefixes
- [Fast Mode](/en/docs/tokenflux/fast-mode) - force the high-priority tier at the key level
- [Team](/en/docs/tokenflux/team) - share the owner's balance while everyone keeps their own keys
- [Referral Rewards](/en/docs/tokenflux/referral) - earn inference credits by inviting friends

## Troubleshooting

- [Troubleshooting](/en/docs/troubleshooting) - find the problem by symptom, with a report template
- [Error Codes](/en/docs/errors) - the full error reference
- [FAQ](/en/docs/faq) - connection drops, model detection, and other common questions
- [API Endpoints](/en/docs/tokenflux/endpoints) - choosing an endpoint and migrating from deprecated routes
- [Usage Policy](/en/docs/tos/usage-policy) - what gets accounts banned
