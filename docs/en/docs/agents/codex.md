---
verifiedAt: '2026-08-22'
---

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
2. In the key list, click "More" on that key and choose "Import to CCS", then confirm the import in the `CC-Switch` window. See [CC-Switch](/en/docs/agents/cc-switch) for details.
3. Enable the imported TokenFlux provider on the `Codex` page in `CC-Switch`.
4. Restart `Codex` or `Codex App`.

  </DocsTab>

  <DocsTab title="Manual Setup" name="manual-setup">

**Step 1: Locate the config directory**

The local config directory for `Codex` is:

- Windows: `%userprofile%\.codex`
- macOS / Linux: `~/.codex`

Codex CLI and official IDE extensions share the `config.toml` configuration layer. When using Codex via Zed's external Agent, configuration loading depends on the installed integration version.

Start `Codex` or `Codex App` once first so it can initialize the config directory automatically.

**Step 2: Write `config.toml`**

Create or edit `config.toml` in the config directory, and make sure the following content is near the top of the file:

```toml
model_provider = "tokenflux"
model = "gpt-6-astra"
review_model = "gpt-6-astra"
model_reasoning_effort = "xhigh"

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

Replace `YOUR_TOKENFLUX_API_KEY` with your actual API key.

**WebSocket version (optional)**

To use WebSocket, merge `supports_websockets = true` into the existing `[model_providers.tokenflux]` table and enable `responses_websockets_v2` under `[features]`. The following shows the merged provider configuration; keep only one copy of each table in the file.

```toml
[model_providers.tokenflux]
name = "OpenAI"
base_url = "https://tokenflux.dev/v1"
wire_api = "responses"
requires_openai_auth = true
supports_websockets = true

[features]
responses_websockets_v2 = true
```

**Sandbox network access (optional)**

If you use the `workspace-write` sandbox and need commands inside it to access the network, set the following in the `[sandbox_workspace_write]` table in `config.toml`:

```toml
[sandbox_workspace_write]
network_access = true
```

This controls network access for sandboxed commands, not Codex's own connection to the model API. See the [official configuration reference](https://developers.openai.com/codex/config-reference) for other sandbox modes and network settings.

  </DocsTab>
</DocsTabs>

## About Remote Compaction

`Codex` compacts conversation history when a long session approaches the context limit. The compaction method depends on the client version, provider capability settings, and server support.

This guide retains `name = "OpenAI"` for compatibility with existing configurations. Some versions use that name to select default capabilities; current versions also support explicit provider capability settings, so the display name alone does not determine whether compaction is remote. The remote protocol also changes between versions: the 0.162 series includes an implementation that sends `compaction_trigger` through Responses requests.

If compaction fails, record the Codex version, group, model, and full error, then follow [How to Report a Problem](/en/docs/troubleshooting#how-to-report-a-problem). Provider capability fields are listed in the [official configuration reference](https://developers.openai.com/codex/config-reference).

<!--
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

Then set the context window of gpt-5.6-terra and gpt-6-astra to 1M, with the auto-compaction threshold at 900k.
```

### Configure the Models

Start a new task so `Codex` discovers the skill, then send:

```text
Set the context window of gpt-5.6-terra and gpt-6-astra to 1M, with the auto-compaction threshold at 900k.
```

The skill confirms the target models, raw window size, effective-window percentage, and auto-compaction policy before writing anything. Leave the effective percentage at its default of `95%` (a 1M raw window gives `950000` usable tokens, matching the status bar display). Restart `Codex` once it is done.

### Verify It Took Effect

- `Codex App`: enable **Show context window usage** under **Settings → General → Editor**, then start a new message to see the window size.
- `Codex CLI`: run `/status` and check the **Context window** field.

-->

## About codex-auto-review

The `ChatGPT`, `ChatGPT (Azure)`, and `ChatGPT (不稳定)` groups currently redirect `codex-auto-review` to `gpt-6.1-sol` by default.

To use another model, configure a model redirect for your key on the [API keys page](https://tokenflux.dev/keys). The target model must be available in the selected group; check its price in the [model marketplace](https://tokenflux.dev/models).
