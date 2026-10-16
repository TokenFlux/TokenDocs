---
verificationStatus: unverified
---

# DeepSeek Harness Guide

## Install

<DocsTabs default-tab="desktop">
  <DocsTab title="Desktop" name="desktop">

Download the macOS (Apple silicon) or Windows (64-bit) installer from the [official website](https://www.deepseek.com/harness/). On macOS, drag the app into Applications; on Windows, run the installer. Desktop includes its runtime, so Node.js is not required.

On first launch, open the API-key page and choose **Set up later**. Enter your TokenFlux key in the custom provider below.

  </DocsTab>
  <DocsTab title="Web UI" name="web">

Install Node.js that meets the [official requirements](https://github.com/deepseek-ai/deepseek-harness/blob/master/package.json), then run:

```bash
npx @deepseek-ai/dsh web
```

Keep the terminal running and open `http://127.0.0.1:3080` in your browser. Use the address printed in the terminal if it differs.

  </DocsTab>
</DocsTabs>

## Configure TokenFlux

1. [Create an API key](/en/docs/tokenflux/create-apikey).
2. Open **Settings → Models**, choose **Add model provider**, and select **Custom model API**.
3. Enter the values below and save. Follow the button labels in your installed client.

| Field        | Value                                                    |
| ------------ | -------------------------------------------------------- |
| Provider ID  | `tokenflux` (cannot be renamed after creation)           |
| Display name | `TokenFlux`                                              |
| Base URL     | `https://tokenflux.dev/v1`                               |
| API protocol | `OpenAI Responses` (`openai-responses`)                  |
| API key      | Your TokenFlux API key                                   |
| Model ID     | `gpt-6-astra`, or a full model ID supported by the group |

Add models manually, or use **Fetch available models** to select and add them. With a [composite key](/en/docs/tokenflux/composite-key), include the required model prefix.

For Anthropic Messages, create a separate `tokenflux-anthropic` provider, select `Anthropic Messages`, set the Base URL to `https://tokenflux.dev`, and enter a supported model ID, such as `claude-sonnet-5-5`.

## Verify

Use **Choose workspace** to add a project directory. Start a new session, select your TokenFlux model, and send "Reply with OK only". After receiving a reply, check the model and charge in the [usage logs](https://tokenflux.dev/usage). This incurs inference charges. Start a new session after changing the default model too.

For connection errors, see [Troubleshooting](/en/docs/troubleshooting). See [API Endpoints](/en/docs/tokenflux/endpoints) for protocol addresses and the [official model configuration guide](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/providers.md) for more settings.
