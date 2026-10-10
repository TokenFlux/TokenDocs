---
verifiedAt: '2026-08-22'
---

# Codex++

`Codex++` is an external launcher and manager for Codex App, with provider switching, session management, and interface enhancements. It uses the Chromium DevTools Protocol (CDP) and a local helper service without modifying the official app's `app.asar`.

Project repository: [BigPizzaV3/CodexPlusPlus](https://github.com/BigPizzaV3/CodexPlusPlus). The following steps apply to the current 1.7 release series.

## Installation

Install the official Codex App using the [Codex Guide](/en/docs/agents/codex), then download the package for your system from the [Codex++ release page](https://github.com/BigPizzaV3/CodexPlusPlus/releases/latest).

<DocsTabs default-tab="windows">
  <DocsTab title="Windows" name="windows">

1. Download the installer ending in `windows-x64-setup.exe`, or choose `windows-x64.zip` for the portable version.
2. Run the installer, or extract the portable archive to a permanent directory.
3. Open the **Codex++ Manager** and check the detected Codex App path.

  </DocsTab>

  <DocsTab title="macOS" name="macos">

1. Download the package ending in `macos-universal.dmg`, which supports Apple Silicon and Intel Macs.
2. Open the DMG and follow its installation instructions.
3. Open the **Codex++ Manager** and check the detected Codex App path.

  </DocsTab>
</DocsTabs>

## Connect to TokenFlux

1. Follow [Create API Key](/en/docs/tokenflux/create-apikey) to get a key.
2. Configure a provider in the **Codex++ Manager**, select **API-only** mode, and enter:

   | Field    | Value                                                   |
   | -------- | ------------------------------------------------------- |
   | Base URL | `https://tokenflux.dev/v1`                              |
   | API Key  | Your TokenFlux API key                                  |
   | Protocol | Responses                                               |
   | Model    | `gpt-6-astra`, or another model supported by your group |

3. Save the provider and model configuration, and enable any enhancements you want.
4. Launch Codex App through the **Codex++** entry to load the saved configuration.

If you already have an official login and want to retain its related entry points, you can choose **Official login + API** mode. Model requests in this mode still use the configured API. See the [project documentation](https://github.com/BigPizzaV3/CodexPlusPlus#供应商与模型) for the differences between modes.

## Usage and Updates

- **Codex++ Manager**: Configure providers, models, and enhancements, and view runtime status and diagnostics.
- **Codex++**: Launch the official desktop app with the saved provider and enhancement settings.
- After changing enhancements that depend on injected scripts, save and restart Codex++.
- Check for updates on the manager's **About** page.

## Troubleshooting

If the enhancement menu is missing, confirm that you launched through **Codex++**, then check the app path and logs on the manager's **Installation Maintenance** or **About** page.

If requests fail after switching providers, run the model test or **Provider Doctor** in the provider details to check the protocol, API URL, key, and model. Model tests make real requests and may incur charges.

Some enhancements depend on the official app's interface and local data formats. If an official app update causes compatibility issues, check the Codex++ [release notes](https://github.com/BigPizzaV3/CodexPlusPlus/releases).

## Related Content

- [Codex Guide](/en/docs/agents/codex)
- [CC-Switch](/en/docs/agents/cc-switch)
