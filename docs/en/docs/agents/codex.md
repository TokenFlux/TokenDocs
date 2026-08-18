# Codex Guide

`Codex` is an AI Agent tool designed for code generation, modification, and review.

## Installation

Choose an installation method based on your workflow.

<DocsTabs default-tab="app">
  <DocsTab title="Codex App" name="app">

  `Codex App` is suitable for users who prefer a graphical interface.

  Choose the installer for your system:

  - [Codex App for Windows](https://get.microsoft.com/installer/download/9PLM9XGG6VKS?cid=website_cta_psi)
  - [Codex App for macOS (Apple Silicon)](https://persistent.oaistatic.com/codex-app-prod/Codex.dmg)
  - [Codex App for macOS (Intel)](https://persistent.oaistatic.com/codex-app-prod/Codex-latest-x64.dmg)

  After downloading, follow the system prompts to install and launch it.

  </DocsTab>

  <DocsTab title="Codex CLI" name="cli">

  `Codex CLI` is recommended for terminal usage.

  Installation:

  ```bash
  npm install -g @openai/codex
  ```

  Verify installation:

  ```bash
  codex --help
  ```

  If the command prints help information, installation succeeded.

  </DocsTab>

  <DocsTab title="Run with npx" name="npx">

  Without global installation, you can run `Codex` on demand with `npx`.

  ```bash
  npx @openai/codex
  ```

  On first run, `npx` downloads and executes `Codex` automatically. This is useful when:

  - You do not want to modify the global environment.
  - You only need to run it once on a machine.
  - You want to test whether the CLI meets your needs.

  If you use it frequently later, global installation is recommended for faster startup.

  </DocsTab>
</DocsTabs>

## Connect to TokenFlux

After installation, choose one of the following methods to connect `Codex` to `TokenFlux`.

<DocsTabs default-tab="cc-switch-setup">
  <DocsTab title="Use CC-Switch" name="cc-switch-setup">

  Using `CC-Switch` is recommended for centralized configuration.

  Steps:

  1. Follow [Create API Key](/en/docs/tokenflux/create-apikey) to generate an API key.
  2. Follow [CC-Switch](/en/docs/agents/cc-switch) to configure a unified provider.
  3. Restart `Codex` or `Codex App` after configuration is complete.

  </DocsTab>

  <DocsTab title="Manual Setup" name="manual-setup">

  **Step 1: Locate the config directory**

  The local config directory for `Codex` is usually:

  - Windows: `%userprofile%\.codex`
  - macOS / Linux: `~/.codex`

  If you use `Codex` inside VSCode or Zed, it usually follows the global `Codex` configuration. After writing the configuration in this section, restart the editor for the changes to take effect.

  Start `Codex` or `Codex App` once first so it can initialize the config directory automatically.

  **Step 2: Write `config.toml`**

  Create or edit `config.toml` in the config directory, and make sure the following content is near the top of the file:

  ```toml
  model_provider = "tokenflux"
  model = "gpt-5.4"
  review_model = "gpt-5.4"
  model_reasoning_effort = "xhigh"
  disable_response_storage = true
  network_access = "enabled"
  windows_wsl_setup_acknowledged = true

  [model_providers.tokenflux]
  name = "OpenAI"
  base_url = "https://tokenflux.dev/v1"
  wire_api = "responses"
  requires_openai_auth = true
  ```

  **Step 3: Write `auth.json`**

  Create or edit `auth.json` in the same directory:

  ```json
  {
    "OPENAI_API_KEY": "YOUR_TOKENFLUX_API_KEY"
  }
  ```

  Replace `YOUR_TOKENFLUX_API_KEY` with your real API key.

  **WebSocket version (optional)**

  If you need the WebSocket version, add the following to `config.toml`:

  ```toml
  supports_websockets = true

  [features]
  responses_websockets_v2 = true
  ```

  </DocsTab>
</DocsTabs>

## About Remote Compaction

The configuration above already sets `name` in `[model_providers.tokenflux]` to `OpenAI`, which is what enables Codex remote compaction.

`Codex` triggers compaction when a long conversation approaches the context limit. `Codex` only prefers the remote compaction endpoint (`/v1/responses/compact`) when the upstream provider `name` is exactly `OpenAI`. Remote compaction has higher quality and keeps very long conversations stable, with less quality degradation.

If you change `name` to any other value (such as `tokenflux`), `Codex` falls back to local compaction, which works much worse.

Notes:

- `name` is the display name used to trigger remote compaction; keep it as `OpenAI`.
- The provider id `tokenflux` (used by `model_provider` and `[model_providers.tokenflux]`) is not affected and stays unchanged.
- This setting does not lose your existing chat history.

## 1M Context Window

The `ChatGPT` groups now fully support a one-million-token context, and enabling it is recommended.

### Install the Skill

Clone it into the `Codex` user skill directory:

```bash
git clone https://github.com/smartcmd/codex-context-window.git ~/.codex/skills/codex-context-window
```

You can also send the following to `Codex` and let it handle installation and configuration:

```text
Install this skill: https://github.com/smartcmd/codex-context-window

Then set the context window of gpt-5.6-luna, gpt-5.6-terra, and gpt-5.6-sol to 1M, with the auto-compaction threshold at 900k.
```

### Configure the Models

Start a new task so `Codex` discovers the skill, then send:

```text
Set the context window of gpt-5.6-luna, gpt-5.6-terra, and gpt-5.6-sol to 1M, with the auto-compaction threshold at 900k.
```

The skill confirms the target models, raw window size, effective-window percentage, and auto-compaction policy before writing anything. Restart `Codex` once it is done.

::: tip Keep the default effective percentage
Leave the effective percentage at its default of `95%`. A 1M raw window then gives `950000` usable tokens, which is also the number the status bar reports.
:::

### Verify It Took Effect

- `Codex App`: enable **Show context window usage** under **Settings → General → Editor**, then start a new message to see the window size.
- `Codex CLI`: run `/status` and check the **Context window** field.

## About codex-auto-review

To remove any ambiguity, `codex-auto-review` now redirects to `gpt-5.6-sol` by default.

Model routing is live, so you can redirect it yourself to `gpt-5.6-terra` or `gpt-5.6-luna` on the [API keys page](https://tokenflux.dev/keys) to lower your costs.
