# Quickstart

TokenFlux is a unified interface for large language models: call mainstream models across various clients through a unified API key.

::: details For AGENTS
For bulk Markdown reads, use [markdown-sitemap.xml](/markdown-sitemap.xml). For a single page, append `.md` to any documentation URL that does not end with `/`, for example `/en/docs/quickstart.md`.
:::

## Getting Started

1. Choose a client below. In the [model marketplace](https://tokenflux.dev/models), confirm that the target model's group supports the required protocol and client.
2. Read [Billing](/en/docs/tokenflux/billing), check prices, then [top up or subscribe](https://tokenflux.dev/purchase) for inference credits.
3. [Create an API key](/en/docs/tokenflux/create-apikey) on the group you selected.
4. Follow the client guide below to enter the key, endpoint, and model ID.
5. Send a message and check the reply and usage log to [confirm the integration](#confirm-the-integration).

For groups, account pools, inference credits, and other terms, see [Core Concepts](/en/docs/concepts).

## Client Options

<DocsTabs default-tab="agent">
  <DocsTab title="Agent" name="agent">

Best for terminal workflows, programming tasks, or users who want AI Agent assistance while developing.

Follow the guide for your client. [CC-Switch](/en/docs/agents/cc-switch) is an optional way to manage provider settings for clients such as Claude Code and Codex; it is not a prerequisite.

| Client guide                               | Best for                                        |
| ------------------------------------------ | ----------------------------------------------- |
| [Claude Code](/en/docs/agents/claude-code) | Anthropic's official CLI, terminal coding       |
| [Codex](/en/docs/agents/codex)             | OpenAI's official CLI and desktop app           |
| [Codex++](/en/docs/agents/codex-plus-plus) | Adds extra capabilities on top of Codex         |
| [OpenCode](/en/docs/agents/opencode)       | Open-source terminal agent with model switching |
| [Pi](/en/docs/agents/pi)                   | Extensible terminal coding agent                |
| [Hermes](/en/docs/agents/hermes)           | Lightweight terminal agent                      |

  </DocsTab>

  <DocsTab title="ChatBot" name="chatbot">

Best for users who prefer graphical interfaces, mobile usage, or daily conversational workflows.

| Client guide                                    | Best for                                                 |
| ----------------------------------------------- | -------------------------------------------------------- |
| [Cherry Studio](/en/docs/chatbot/cherry-studio) | Desktop (Windows / macOS / Linux), multi-model switching |
| [RikkaHub](/en/docs/chatbot/rikkahub)           | Android, OpenAI compatible                               |

Add TokenFlux as a custom provider in the client settings, enter your API key and an [API endpoint](/en/docs/tokenflux/endpoints), fetch the model list, and start chatting.

  </DocsTab>
</DocsTabs>

## Confirm the Integration

1. Select the target model in your client, start a new conversation, and send "Reply with OK only". This incurs inference charges.
2. Confirm that you receive model-generated text, not just a model list or a "configuration saved" message.
3. Find the request in the [usage logs](https://tokenflux.dev/usage), check the key, model, and charge, and confirm the group matches your key configuration.

This only confirms that this text conversation worked. Test tool calls, images, or other capabilities separately if needed. If there is no reply or the usage record differs from your expectations, see [Troubleshooting](/en/docs/troubleshooting).

## Going Further

After integration, the following may be useful:

- [Creative Studio](https://tokenflux.dev/creative) - generate images directly on the web without client or API configuration
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
