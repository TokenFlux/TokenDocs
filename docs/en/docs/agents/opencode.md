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
2. Follow [CC-Switch](/en/docs/agents/cc-switch) to configure a unified provider.
3. Restart `OpenCode` after configuration is complete.

  </DocsTab>

  <DocsTab title="Manual Setup" name="manual-setup">

**Step 1: Create the config file**

In your project directory, create an `opencode.json` file.

**Step 2: Fill in the configuration**

Copy the following content into `opencode.json` and replace `YOUR_API_KEY` with your TokenFlux API key.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "openai/gpt-5.6-sol",
  "small_model": "openai/gpt-5.6-luna",
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

`OpenCode` automatically discovers models through its built-in `openai` provider. Configure other platforms under their matching built-in provider in the same way. To access multiple groups, enable **composite key** when creating the API key.

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

## Verify the Setup

Either configuration path can be confirmed with:

```bash
opencode models
opencode run -m openai/<model-id> "Reply with OK only"
```

`opencode models` lists the loaded models; seeing your model ID there means the configuration was picked up. `opencode run` makes a real, billed call, and a reply means the setup works.

If the commands fail or the model list is empty, first rule the client out with [Test the Key and Endpoint on Their Own](/en/docs/troubleshooting#test-the-key-and-endpoint-on-their-own), then review `opencode.json`.

## Related Pages

- [Create API Key](/en/docs/tokenflux/create-apikey) - pick a group and generate a key
- [API Endpoints](/en/docs/tokenflux/endpoints) - address and protocol format
- [Troubleshooting](/en/docs/troubleshooting) - locate a problem by symptom
