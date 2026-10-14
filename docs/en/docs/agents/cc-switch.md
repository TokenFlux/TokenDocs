---
verifiedAt: '2026-10-14'
verifiedWith: 'macOS 27.0.1 (arm64); CC-Switch 4.0.8, Codex CLI 0.162.1; console import, provider switching, balance queries, gpt-6-astra chat.'
---

# CC-Switch

`CC-Switch` manages provider settings and API keys for clients such as `Claude Code`, `Codex`, and `OpenCode`.

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
brew install --cask cc-switch
```

After installation, find and run `CC-Switch` from Applications or Launchpad.

  </DocsTab>

  <DocsTab title="Linux" name="linux">

1. Open the [release page](https://github.com/farion1231/cc-switch/releases/latest).
2. Choose the AppImage for your architecture: `x86_64` for Intel / AMD devices or `arm64` for ARM devices.

   <div style="text-align: center;">
     <img src="/images/cc-switch/linux-installer-selection.png" alt="How to choose the Linux AppImage on the Releases page" />
   </div>

3. In the download directory, make the file executable. Replace `CC-Switch.AppImage` below with the actual downloaded filename:

   ```bash
   chmod +x ./CC-Switch.AppImage
   ```

4. Double-click the file, or start it from a terminal using the same actual filename:

   ```bash
   ./CC-Switch.AppImage
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

3. In the "Select client" dialog, choose the client and model, then click "Confirm".
4. After the browser opens `CC-Switch`, check the provider name, API endpoint, and API key in the "Confirm provider import" window, then click "Import".
5. Select the client in the sidebar, find the imported TokenFlux provider, and click "Switch".
6. Send a message to the selected model and confirm the request in [Usage Records](https://tokenflux.dev/usage).

::: tip
If the browser does not launch `CC-Switch` and reports that CC-Switch is not installed or the protocol handler is not registered, install `CC-Switch` using the steps above and click again.
:::

  </DocsTab>

  <DocsTab title="Manual setup" name="manual">

If the console's client list does not include your target client, or you need to enter the configuration yourself, add a provider manually in `CC-Switch`:

1. Select the target application in the `CC-Switch` sidebar.
2. Click "+" in the upper-right corner and choose a custom provider.
3. Fill in `Name`, `API URL` and `API Key`. Use the address for the matching protocol from [API Endpoints](/en/docs/tokenflux/endpoints).
4. After saving, enable or add the configuration from the provider card. The button label varies by client.

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

4. Tick the applications to sync (`Claude Code` / `Codex` / `Gemini`) and save, then enable the synced TokenFlux provider on each application's page.

Editing a universal provider syncs the change to every ticked application, and deleting it removes the matching providers from those applications too.

  </DocsTab>
</DocsTabs>

## Claude Max Environment Variables

If you manage Claude Code through `CC-Switch`, you can add `ENABLE_PROMPT_CACHING_1H` to the Claude provider's JSON configuration. When you enable the provider, `CC-Switch` writes this configuration into Claude Code's `settings.json`.

This variable enables a 1-hour prompt cache, which is useful for Claude Code sessions that repeatedly carry long context. Other Claude groups do not need it.

### App-Specific Provider

1. Select `Claude Code` in the `CC-Switch` sidebar.
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
