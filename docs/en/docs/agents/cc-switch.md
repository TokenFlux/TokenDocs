---
verifiedAt: '2026-09-16'
---

# CC-Switch

`CC-Switch` is a graphical tool for managing AI interface configuration. It can manage provider settings and API keys for multiple Agent clients in one place, including mainstream AI coding assistants such as `Claude Code`, `Codex`, and `OpenCode`.

## Installation

<DocsTabs default-tab="windows">
  <DocsTab title="Windows" name="windows">

1. Open the [latest release page](https://github.com/farion1231/cc-switch/releases/latest) and download the Windows installer (`.msi` recommended).

   <div style="text-align: center;">
     <img src="/images/cc-switch/windows-installer-selection.png" alt="How to choose the Windows installer on the Releases page" />
   </div>

2. After the download finishes, double-click the installer.
3. Follow the installer wizard to complete installation.
4. Launch `CC-Switch` from the Start menu.

  </DocsTab>

  <DocsTab title="macOS" name="macos">

Homebrew is recommended:

```bash
brew tap farion1231/ccswitch
brew install --cask cc-switch
```

After installation, find and run `CC-Switch` from Applications or Launchpad.

  </DocsTab>

  <DocsTab title="Linux" name="linux">

1. Open the [release page](https://github.com/farion1231/cc-switch/releases/latest).
2. Choose the AppImage file for your system architecture, such as `CC-Switch-v3.13.0-Linux-x86_64.AppImage`.

   <div style="text-align: center;">
     <img src="/images/cc-switch/linux-installer-selection.png" alt="How to choose the Linux AppImage on the Releases page" />
   </div>

3. After downloading, make the file executable:

   ```bash
   chmod +x CC-Switch-v3.13.0-Linux-x86_64.AppImage
   ```

4. Double-click the file, or start it from a terminal:

   ```bash
   ./CC-Switch-v3.13.0-Linux-x86_64.AppImage
   ```

   On graphical desktop environments, you can also enable executable permissions in the file properties.

  </DocsTab>
</DocsTabs>

## Add a Provider

After installation, use any of the methods below to connect TokenFlux to `CC-Switch`.

<DocsTabs default-tab="console-import">
  <DocsTab title="Import from the console (recommended)" name="console-import">

The key list can push an API key straight into `CC-Switch`, so there are no fields to fill in by hand.

1. Follow [Create API Key](/en/docs/tokenflux/create-apikey) to generate an API key.
2. Find that key in the list and click "More" on the right, then choose "Import to CCS".

   <div style="text-align: center;">
     <img src="/images/cc-switch/import-to-cc-switch.png" alt="Choosing Import to CCS from the More menu in the key list" />
   </div>

3. `CC-Switch` opens a "Confirm provider import" window. Check the provider name, API endpoint and API key, then click "Import".

   <div style="text-align: center;">
     <img src="/images/cc-switch/import-to-cc-switch-dialog.png" alt="The Confirm provider import window in CC-Switch" />
   </div>

Which client you import into depends on the key's group platform:

| Group platform | Imports as    |
| -------------- | ------------- |
| Anthropic      | `Claude Code` |
| OpenAI         | `Codex`       |
| Gemini         | `Gemini`      |
| Grok           | `Grok Build`  |

For an Antigravity group you first choose between `Claude Code` and `Gemini CLI`. The import also writes a usage-query script, and `CC-Switch` polls the balance at a fixed interval.

::: tip
If the browser does not launch `CC-Switch` and reports that CC-Switch is not installed or the protocol handler is not registered, install `CC-Switch` using the steps above and click again.
:::

  </DocsTab>

  <DocsTab title="Manual setup" name="manual">

"Import to CCS" does not cover `OpenCode` and similar clients. Add those by hand in `CC-Switch`:

1. Switch to the target application at the top of `CC-Switch`.
2. Click "+" in the upper-right corner and choose "Custom" on the "App-specific provider" tab.
3. Fill in `Name`, `API URL` and `API Key`. Use the address for the matching protocol from [API Endpoints](/en/docs/tokenflux/endpoints).
4. Save and enable it.

  </DocsTab>

  <DocsTab title="Universal provider" name="universal">

Use a universal provider only when `Claude Code`, `Codex` and `Gemini` should share one configuration. For a single client, the "Import from the console" tab is enough.

::: warning
Universal providers cover `Claude Code`, `Codex` and `Gemini` only. Other clients, `OpenCode` included, never show the "Universal Provider" tab.
:::

1. Follow [Create API Key](/en/docs/tokenflux/create-apikey) to get a new API key.
2. Open `CC-Switch`, click "+" in the upper-right corner, switch to the "Universal Provider" tab, then click "Add Universal Provider".
3. Fill in the fields:

   ```text
   Name: tokenflux
   API URL: https://tokenflux.dev
   API Key: TokenFlux API key
   ```

   <div style="text-align: center;">
     <img src="/images/cc-switch/manual-provider-fields.png" alt="CC-Switch universal provider fields" />
   </div>

4. Tick the applications to sync (`Claude Code` / `Codex` / `Gemini`) and save.

Editing a universal provider syncs the change to every ticked application, and deleting it removes the matching providers from those applications too.

  </DocsTab>
</DocsTabs>

## Claude Max Environment Variables

::: warning
The `Claude Max` group only accepts the `Claude Code` client and cannot be used in the Claude app.
:::

If you manage Claude Code through `CC-Switch`, you can add `ENABLE_PROMPT_CACHING_1H` to the Claude provider's JSON configuration. When you enable the provider, `CC-Switch` writes this configuration into Claude Code's `settings.json`.

This variable enables a 1-hour prompt cache, which is useful for Claude Code sessions that repeatedly carry long context. Other Claude groups do not need it.

### App-Specific Provider

1. Switch to `Claude Code` at the top of `CC-Switch`.
2. Find the Claude provider card for TokenFlux and click "Edit".
3. Add the following to `env` in the "Config JSON":

```json
{
  "env": {
    "ENABLE_PROMPT_CACHING_1H": "1"
  }
}
```

### Universal Provider

A universal provider's basic form only contains `Name`, `API Key`, `API URL`, and model configuration, without a separate environment variable field. When using a universal provider:

1. First create and sync the universal provider from the "Universal provider" tab above.
2. Return to the `Claude Code` app and edit the synced Claude provider.
3. Add `"ENABLE_PROMPT_CACHING_1H": "1"` to the provider's JSON `env`.
4. Save and enable the Claude provider.

## Related Guides

- [Claude Code Guide](/en/docs/agents/claude-code)
- [Codex Guide](/en/docs/agents/codex)
- [OpenCode Guide](/en/docs/agents/opencode)
