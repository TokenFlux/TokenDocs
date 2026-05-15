# CC-Switch

`CC-Switch` is a graphical tool for managing AI interface configuration. It can manage provider settings and API keys for multiple Agent clients in one place, including mainstream AI coding assistants such as `Claude Code`, `Codex`, and `OpenCode`, reducing the risk of configuration mistakes.

Common use cases include:

- Managing provider settings and API keys for multiple Agent clients, such as `Claude Code`, `Codex`, and `OpenCode`.
- Quickly switching between AI model interfaces without manually editing environment variables or local config files.
- Reducing repeated setup work and improving maintainability across multiple clients.

This guide focuses on installation. For detailed client configuration, see the related client pages.

## Installation

Follow the steps for your operating system.

<DocsTabs default-tab="windows">
  <DocsTab title="Windows" name="windows">

1. Open the [latest release page](https://github.com/farion1231/cc-switch/releases/latest).
   Find the Windows installer on the page. The `.msi` package is recommended, as shown below:

   <div style="text-align: center;">
     <img src="/images/cc-switch/windows-installer-selection.png" alt="How to choose the Windows installer on the Releases page" />
   </div>

2. After the download finishes, double-click the installer.
3. Follow the installer wizard to complete installation.
4. After installation, find and launch `CC-Switch` from the Start menu.

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

For Linux users, download the AppImage from the release page:

1. Open the [release page](https://github.com/farion1231/cc-switch/releases/latest).
2. Choose the AppImage file for your system architecture, such as `CC-Switch-v3.13.0-Linux-x86_64.AppImage`.
   Pick the correct version for your actual architecture, such as x86_64 or arm64.
   If you are unsure which file to choose, refer to the screenshot below:

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

   If you use a graphical desktop such as KDE or GNOME, you can also right-click the file, open Properties or Permissions, and enable permission to run it as a program.

The AppImage bundles all required dependencies and works on most Linux distributions.

  </DocsTab>
</DocsTabs>

## How to Start After Installation

1. Follow [Create API Key](/en/docs/tokenflux/create-apikey) to get a new API key.
2. Open `CC-Switch`, click the Add button in the upper-right corner, and choose to add a unified provider.
3. Fill in the following fields accurately in the configuration window:

   ```text
   Provider name: tokenflux
   API URL: https://tokenflux.dev
   API Key: your TokenFlux API key
   ```

   Example interface:

   <div style="text-align: center;">
     <img src="/images/cc-switch/manual-provider-fields.png" alt="CC-Switch unified provider fields" />
   </div>

4. Save the configuration. `CC-Switch` will enable this provider for all related Agent clients.

## Next Steps

After installing and configuring `CC-Switch`, restart your client and start using it.

More guides:

- [Claude Code Guide](/en/docs/agents/claude-code)
- [Codex Guide](/en/docs/agents/codex)
- [OpenCode Guide](/en/docs/agents/opencode)
