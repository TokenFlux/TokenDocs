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
  model_context_window = 1000000
  model_auto_compact_token_limit = 900000

  [model_providers.tokenflux]
  name = "tokenflux"
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
