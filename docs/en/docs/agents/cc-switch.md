---
verifiedAt: '2026-08-22'
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

## Configure Unified Provider

1. Follow [Create API Key](/en/docs/tokenflux/create-apikey) to get a new API key.
2. Open `CC-Switch`, click the Add button in the upper-right corner, and choose to add a unified provider.
3. Fill in the fields in the configuration window:

   ```text
   Provider name: tokenflux
   API URL: https://tokenflux.dev
   API Key: your TokenFlux API key
   ```

   <div style="text-align: center;">
     <img src="/images/cc-switch/manual-provider-fields.png" alt="CC-Switch unified provider fields" />
   </div>

4. Save the configuration. `CC-Switch` will enable this provider for all related Agent clients.

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

### Unified Provider

The unified provider's basic form only contains `Name`, `API Key`, `API URL`, and model configuration, without a separate environment variable field. When using a unified provider:

1. First create and sync the unified provider with the flow above.
2. Return to the `Claude Code` app and edit the synced Claude provider.
3. Add `"ENABLE_PROMPT_CACHING_1H": "1"` to the provider's JSON `env`.
4. Save and enable the Claude provider.

## Related Guides

- [Claude Code Guide](/en/docs/agents/claude-code)
- [Codex Guide](/en/docs/agents/codex)
- [OpenCode Guide](/en/docs/agents/opencode)
