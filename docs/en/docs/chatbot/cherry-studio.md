---
verifiedAt: '2026-08-22'
---

# Cherry Studio Guide

`Cherry Studio` is a desktop AI chat client with multi-model support. It has a clean interface, supports custom providers, and is suitable for daily conversations and multi-model comparison.

## Installation

Go to the [Cherry Studio download page](https://cherry-ai.com/download) and choose the installer for your operating system.

<DocsTabs default-tab="windows">
  <DocsTab title="Windows" name="windows">

Cherry Studio provides both **Setup installers** and **Portable builds**, with x64 and ARM64 support.

1. Open the [download page](https://cherry-ai.com/download) and choose the installer for your system architecture:
   - Regular PC: choose the recommended standard build.
   - ARM device: choose the `ARM` build.
2. After downloading, double-click the installer and follow the wizard.
3. After installation, launch `Cherry Studio` from the Start menu.

> **Note:** Cherry Studio does not support Windows 7.
>
> If startup reports missing runtime libraries, install the [Visual C++ Redistributable](https://aka.ms/vs/17/release/vc_redist.x64.exe) first.

  </DocsTab>

  <DocsTab title="macOS" name="macos">

Cherry Studio provides Intel and Apple Silicon versions. Choose based on your chip:

- **Apple Silicon**: choose the `Apple Silicon` version.
- **Intel chip**: choose the `Intel` version.

1. Open the [download page](https://cherry-ai.com/download) and download the matching `.dmg` file.
2. Open the `.dmg` and drag `Cherry Studio` into the Applications folder.
3. Launch `Cherry Studio` from Launchpad or Applications.

  </DocsTab>

  <DocsTab title="Linux" name="linux">

Linux releases include AppImage, deb, and rpm packages. The following uses AppImage, available for x86_64 and ARM64.

1. Open the [download page](https://cherry-ai.com/download) and choose the AppImage for your architecture:
   - Regular x86 device: choose the `x86_64` build.
   - ARM device: choose the `ARM64` build.
2. In the download directory, make the file executable. Replace `Cherry-Studio.AppImage` with the actual downloaded filename:

   ```bash
   chmod +x ./Cherry-Studio.AppImage
   ```

3. Double-click it, or run it from a terminal using the same actual filename:

   ```bash
   ./Cherry-Studio.AppImage
   ```

  </DocsTab>
</DocsTabs>

## Connect to TokenFlux

After installation, add TokenFlux as a custom provider in Cherry Studio. These steps use the protocol endpoint settings in version 2.x.

1. Follow [Create API Key](/en/docs/tokenflux/create-apikey) to generate an API key.
2. Open `Cherry Studio`, go to provider management in Settings, and add a custom provider.
3. Set the name to `TokenFlux` and enter your API key.
4. Expand the additional endpoint settings and enter `https://tokenflux.dev/v1` in the **OpenAI Responses** URL field. The request preview should show `https://tokenflux.dev/v1/responses`.
5. If you also configure other chat endpoints, set **OpenAI Responses** as the default chat endpoint.
6. Save the provider, then fetch and add the models you need from its model list, such as `gpt-6-astra`.
7. Return to the chat interface, select that model, and send a message.

For Chat Completions, enter the same `https://tokenflux.dev/v1` URL in its endpoint field and select the matching default chat endpoint. Protocol paths are appended automatically; do not include `/responses` or `/chat/completions` in these URL fields.

## Verify the Setup

Fetching models confirms that the model-list endpoint is reachable. Also send a message in the chat interface; after receiving a reply, check the request in the [usage logs](https://tokenflux.dev/usage).

If the model list does not load, rule the client out with [Test the Key and Endpoint on Their Own](/en/docs/troubleshooting#test-the-key-and-endpoint-on-their-own), then check whether `/v1` is missing from or duplicated in the address.

## Next Steps

After completing configuration, you can start model conversations directly in `Cherry Studio`.

More related content:

- [Balance and Billing](/en/docs/tokenflux/billing)
