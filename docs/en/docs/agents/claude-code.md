---
verifiedAt: '2026-08-22'
---

# Claude Code Guide

`Claude Code` is an AI coding assistant from Anthropic that supports code generation, modification, and review.

## Installation

Choose an installation method based on your workflow.

<DocsTabs default-tab="native">
  <DocsTab title="Script Install" name="native">

**macOS / Linux**

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows PowerShell**

```powershell
irm https://claude.ai/install.ps1 | iex
```

**Windows CMD**

Install [Git for Windows](https://git-scm.com/download/win) first, then run:

```cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

  </DocsTab>

  <DocsTab title="Homebrew" name="homebrew">

**macOS / Linux**

```bash
brew install --cask claude-code
```

  </DocsTab>

  <DocsTab title="WinGet" name="winget">

**Windows**

```powershell
winget install Anthropic.ClaudeCode
```

  </DocsTab>

  <DocsTab title="npm Install" name="npm">

Install `Claude Code` globally:

```bash
npm install -g @anthropic-ai/claude-code
```

After installation, verify with `claude --version`, and run `claude` in a terminal to start it.

  </DocsTab>

  <DocsTab title="Run with npx" name="npx">

Without global installation, you can run `Claude Code` on demand with `npx`:

```bash
npx @anthropic-ai/claude-code
```

On first run, `npx` downloads and executes `Claude Code` automatically.

  </DocsTab>
</DocsTabs>

## Connect to TokenFlux

After installation, choose one of the following methods to connect `Claude Code` to `TokenFlux`.

<DocsTabs default-tab="cc-switch-setup">
  <DocsTab title="Use CC-Switch" name="cc-switch-setup">

Using `CC-Switch` is recommended for centralized configuration.

Steps:

1. Follow [Create API Key](/en/docs/tokenflux/create-apikey) to generate an API key.
2. Follow [CC-Switch](/en/docs/agents/cc-switch) to configure a unified provider.
3. Restart `Claude Code` after configuration is complete.

  </DocsTab>

  <DocsTab title="Manual Setup" name="manual-setup">

**Step 1: Set environment variables**

The VS Code extension shares `~/.claude/settings.json` with the CLI. Environment variables set temporarily in a terminal may not be inherited by the editor; if they do not take effect, write `settings.json` as described in Step 2. Configuration behavior in Zed depends on the external Agent installed.

**macOS / Linux**

Run in a terminal:

```bash
export ANTHROPIC_BASE_URL="https://tokenflux.dev"
export ANTHROPIC_AUTH_TOKEN="YOUR_TOKENFLUX_API_KEY"
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

Replace `YOUR_TOKENFLUX_API_KEY` with your actual API key.

**Windows PowerShell**

```powershell
$env:ANTHROPIC_BASE_URL="https://tokenflux.dev"
$env:ANTHROPIC_AUTH_TOKEN="YOUR_TOKENFLUX_API_KEY"
$env:CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

**Windows CMD**

```cmd
set ANTHROPIC_BASE_URL=https://tokenflux.dev
set ANTHROPIC_AUTH_TOKEN=YOUR_TOKENFLUX_API_KEY
set CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

**Step 2: Configure VSCode Claude Code (optional)**

If the Claude Code extension in VSCode does not read shell environment variables, configure `settings.json` explicitly:

**macOS / Linux path**

```text
~/.claude/settings.json
```

**Windows path**

```text
%userprofile%\.claude\settings.json
```

**settings.json content**

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://tokenflux.dev",
    "ANTHROPIC_AUTH_TOKEN": "YOUR_TOKENFLUX_API_KEY",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0"
  }
}
```

Replace `YOUR_TOKENFLUX_API_KEY` with your actual API key.

  </DocsTab>
</DocsTabs>

## The Claude Max Group

::: warning
The `Claude Max` group only accepts the `Claude Code` client and cannot be used in the Claude app. Other clients receive 403 `this group only allows Claude Code clients`, see [Error Codes](/en/docs/errors#group-capabilities).
:::

On the `Claude Max` group you can additionally enable `ENABLE_PROMPT_CACHING_1H=1` after finishing the basic configuration above. This option enables a 1-hour prompt cache, which is useful for Claude Code sessions that repeatedly carry long context. Other Claude groups do not need it.

If you manage Claude Code through `CC-Switch`, see the [CC-Switch Claude Max environment variable notes](/en/docs/agents/cc-switch#claude-max-environment-variables).

### Terminal Launch

Set the environment variable once per system, then start `Claude Code`.

**macOS / Linux**

```bash
export ENABLE_PROMPT_CACHING_1H=1
```

**Windows PowerShell**

```powershell
$env:ENABLE_PROMPT_CACHING_1H=1
```

**Windows CMD**

```cmd
set ENABLE_PROMPT_CACHING_1H=1
```

### VSCode / Zed

If you launch `Claude Code` through VSCode or Zed, add the following to the `env` in `~/.claude/settings.json` or `%userprofile%\.claude\settings.json`:

```json
{
  "env": {
    "ENABLE_PROMPT_CACHING_1H": "1"
  }
}
```

If the file already has an `env`, merge the `ENABLE_PROMPT_CACHING_1H` line into it instead of creating a second `env`.
