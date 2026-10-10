---
verifiedAt: '2026-08-22'
---

# OpenCode Guide

`OpenCode` is an open-source AI coding assistant framework. It supports integration with multiple AI models, including code generation, modification, and review workflows.

## Installation

Choose an installation method based on your workflow.

<DocsTabs default-tab="script">
  <DocsTab title="Script Install" name="script">

**macOS / Linux**

```bash
curl -fsSL https://opencode.ai/install | bash
```

**Windows PowerShell**

Using WSL is recommended. Install it with the macOS / Linux method above inside WSL.

  </DocsTab>

  <DocsTab title="npm Install" name="npm">

Install `OpenCode` globally:

```bash
npm install -g opencode-ai
```

After installation, run `opencode` in a terminal to start it.

  </DocsTab>

  <DocsTab title="Homebrew" name="homebrew">

**macOS / Linux**

```bash
brew install anomalyco/tap/opencode
```

  </DocsTab>

  <DocsTab title="Windows" name="windows">

Besides WSL, you can also use these package managers:

**Chocolatey**

```cmd
choco install opencode
```

**Scoop**

```cmd
scoop install opencode
```

Using WSL is recommended for best compatibility.

  </DocsTab>
</DocsTabs>

## Connect to TokenFlux

After installation, choose one of the following methods to connect `OpenCode` to `TokenFlux`.

<DocsTabs default-tab="cc-switch-setup">
  <DocsTab title="Use CC-Switch" name="cc-switch-setup">

Using `CC-Switch` is recommended for centralized configuration.

Steps:

1. Follow [Create API Key](/en/docs/tokenflux/create-apikey) to generate an API key.
2. Select `OpenCode` in the `CC-Switch` sidebar, click "+" to add a provider, and fill in `API URL` `https://tokenflux.dev/v1`, the API key and a model. "Import to CCS" does not cover `OpenCode`; see [CC-Switch](/en/docs/agents/cc-switch) for details.
3. After saving, click "Add" on the provider card, then restart `OpenCode`.

  </DocsTab>

  <DocsTab title="Manual Setup" name="manual-setup">

**Step 1: Create the config file**

In your project directory, create an `opencode.json` file.

**Step 2: Fill in the configuration**

Copy the following content into `opencode.json` and replace `YOUR_API_KEY` with your TokenFlux API key.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "openai/gpt-6-astra",
  "provider": {
    "openai": {
      "options": {
        "baseURL": "https://tokenflux.dev/v1",
        "apiKey": "YOUR_API_KEY"
      }
    }
  }
}
```

This example uses a regular key. The built-in `openai` provider uses OpenCode's model catalog; changing `baseURL` does not automatically fetch every model from TokenFlux. Models outside that catalog and prefixed composite-key models need explicit `provider.models` entries, as shown below.

**Step 3: Start OpenCode**

Run this from the project directory:

```bash
opencode
```

Then run:

```text
/init
```

  </DocsTab>
</DocsTabs>

## Use a Composite Key

A [composite key](/en/docs/tokenflux/composite-key) requires a group prefix in the requested model ID. If you have mapped the `GPT` prefix to a group that supports `gpt-6-astra`, you can use this `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "tokenflux/GPT/gpt-6-astra",
  "provider": {
    "tokenflux": {
      "npm": "@ai-sdk/openai",
      "name": "TokenFlux",
      "options": {
        "baseURL": "https://tokenflux.dev/v1",
        "apiKey": "YOUR_API_KEY"
      },
      "models": {
        "GPT/gpt-6-astra": {
          "name": "GPT-6 Astra (TokenFlux)",
          "reasoning": true,
          "tool_call": true,
          "modalities": {
            "input": ["text", "image"],
            "output": ["text"]
          },
          "limit": {
            "context": 128000,
            "output": 32768
          }
        }
      }
    }
  }
}
```

Replace `YOUR_API_KEY` with your composite key and `GPT` with the prefix configured on that key. `tokenflux` is the provider ID within OpenCode; the model ID sent in the request is `GPT/gpt-6-astra`.

The `limit` values are example client token budgets; adjust them to the capabilities of your model and group. When adding other models, also specify their tool calling, input types, and reasoning capabilities. See the [OpenCode custom provider documentation](https://opencode.ai/docs/providers/#custom-provider) for the fields.

## Verify the Setup

Test the regular-key configuration above with:

```bash
opencode models
opencode run -m openai/gpt-6-astra "Reply with OK only"
```

For the composite-key example, use:

```bash
opencode run -m tokenflux/GPT/gpt-6-astra "Reply with OK only"
```

`opencode models` displays the client's model catalog; it does not validate your TokenFlux API key, URL, or model permissions. `opencode run` makes a real, billed call. After receiving a reply, confirm the request in the [usage logs](https://tokenflux.dev/usage).

If the commands fail or the model list is empty, first rule the client out with [Test the Key and Endpoint on Their Own](/en/docs/troubleshooting#test-the-key-and-endpoint-on-their-own), then review `opencode.json`.

## Related Pages

- [Create API Key](/en/docs/tokenflux/create-apikey) - pick a group and generate a key
- [API Endpoints](/en/docs/tokenflux/endpoints) - address and protocol format
- [Troubleshooting](/en/docs/troubleshooting) - locate a problem by symptom
