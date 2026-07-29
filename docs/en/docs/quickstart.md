# Quickstart

::: tip Access Note
Some content on this site or related services may require a proxy before access works reliably.
:::

This page helps you complete your first TokenFlux setup. Depending on your workflow, you can start with either `Agent` or `ChatBot` clients.

::: details For AGENTS
For bulk Markdown reads, use [markdown-sitemap.xml](/markdown-sitemap.xml). For a single page, append `.md` to any documentation URL that does not end with `/`, for example `/en/docs/quickstart.md`.
:::

## Before You Start

1. Create a new API key by following [Create API Key](/en/docs/tokenflux/create-apikey).
2. Read [Billing](/en/docs/tokenflux/billing) to understand purchase options, then go to the [top-up/subscription page](https://tokenflux.dev/purchase) to add balance or subscribe. Prices shown in the model marketplace are the final billing prices.

## Choose an Integration Path

<DocsTabs default-tab="agent">
  <DocsTab title="Agent" name="agent">

Best for terminal workflows, programming tasks, or users who want AI Agent assistance while developing.

We recommend using `CC-Switch` to manage API keys and provider settings in one place. It supports Agent clients such as `Claude Code`, `Codex`, `Hermes`, and `OpenCode`, without requiring manual environment variable changes.

**Setup steps:**

1. Install and configure providers by following [CC-Switch](/en/docs/agents/cc-switch).
2. Continue with the guide for your client:
   - [Claude Code Guide](/en/docs/agents/claude-code)
   - [Codex Guide](/en/docs/agents/codex)
   - [Hermes Guide](/en/docs/agents/hermes)
   - [OpenCode Guide](/en/docs/agents/opencode)
3. Restart the client after configuration is complete.

  </DocsTab>

  <DocsTab title="ChatBot" name="chatbot">

Best for users who prefer graphical interfaces, mobile usage, or daily conversational workflows.

Recommended clients:

- **Cherry Studio**: Desktop client for Windows, macOS, and Linux. It supports switching across multiple models with a clean interface and straightforward setup.
- **RikkaHub**: Android client with OpenAI-compatible provider support, suitable for everyday mobile use.

**Setup steps:**

1. Create an API key by following [Create API Key](/en/docs/tokenflux/create-apikey).
2. Choose a client for your device and finish installation:
   - Desktop: [Cherry Studio Guide](/en/docs/chatbot/cherry-studio)
   - Android: [RikkaHub Guide](/en/docs/chatbot/rikkahub)
3. Add TokenFlux as a custom provider in the client settings, enter your API key, fetch the model list, and start chatting.

  </DocsTab>
</DocsTabs>

## Continue Reading

- [Billing](/en/docs/tokenflux/billing)
- [Referral Rewards](/en/docs/tokenflux/referral)
