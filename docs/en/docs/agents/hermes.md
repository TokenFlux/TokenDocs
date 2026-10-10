---
verifiedAt: '2026-08-22'
---

# Hermes Guide

`Hermes` is an AI Agent tool that supports connecting to `TokenFlux` through a custom OpenAI-compatible interface.

## Installation

Choose the official installer for your system:

<DocsTabs default-tab="unix">
  <DocsTab title="macOS / Linux / WSL" name="unix">

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

  </DocsTab>

  <DocsTab title="Windows PowerShell" name="windows">

```powershell
iex (irm https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.ps1)
```

  </DocsTab>
</DocsTabs>

Open a new terminal after installation so PATH changes take effect. The default configuration directory is:

| System                      | Configuration directory |
| --------------------------- | ----------------------- |
| macOS / Linux / WSL         | `~/.hermes`             |
| Native Windows installation | `%LOCALAPPDATA%\hermes` |

If `HERMES_HOME` is set, use the directory it specifies. Both `config.yaml` and `.env` below are in this configuration directory.

## Connect to TokenFlux

1. Follow [Create API Key](/en/docs/tokenflux/create-apikey) to generate an API key.
2. Edit `config.yaml` in the configuration directory and add or confirm the following:

   ```yaml
   model:
     default: 'gpt-6-astra'
     provider: 'custom'
     base_url: 'https://tokenflux.dev/v1'
   ```

3. Edit `.env` in the same directory and write:

   ```env
   OPENAI_API_KEY=YOUR_TOKENFLUX_API_KEY
   OPENAI_BASE_URL=https://tokenflux.dev/v1
   ```

   Replace `YOUR_TOKENFLUX_API_KEY` with your actual API key.

## Verify Configuration

After saving the configuration, run:

```bash
hermes config check
hermes chat -Q -q 'Only reply OK' --max-turns 3
```

`hermes config check` checks the local configuration. `hermes chat` makes a real, billed model request. After receiving a reply, confirm the request in the [usage logs](https://tokenflux.dev/usage).

## More Related Content

- [Create API Key](/en/docs/tokenflux/create-apikey)
- [Billing](/en/docs/tokenflux/billing)
