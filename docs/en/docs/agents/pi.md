---
verifiedAt: '2026-09-05'
---

# Pi Guide

`Pi` is an extensible terminal coding agent. It supports connecting to `TokenFlux` through its OpenAI-compatible endpoint by overriding built-in providers.

## Installation

Choose an official installation method based on your setup.

<DocsTabs default-tab="npm">
  <DocsTab title="npm Install" name="npm">

Install `Pi` globally:

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

  </DocsTab>

  <DocsTab title="Script Install" name="script">

**macOS / Linux**

```bash
curl -fsSL https://pi.dev/install.sh | sh
```

  </DocsTab>
</DocsTabs>

After installation, verify the installation in your terminal:

```bash
pi --version
```

Seeing the version number confirms the installation succeeded.

## Connect to TokenFlux

### 1. Create an API Key

Follow [Create API Key](/en/docs/tokenflux/create-apikey) to generate an API key, selecting a group that supports the OpenAI format.

::: tip Model Availability
This guide uses `gpt-5.6-terra` as an example. For the full list of available models, refer to [Models](https://tokenflux.dev/models) and the models supported by your selected key group.
:::

### 2. Configure models.json

Pi supports overriding built-in providers via a global models configuration file.

Global configuration path:

- macOS / Linux: `~/.pi/agent/models.json`
- Windows: `%USERPROFILE%\.pi\agent\models.json`

Create or edit this file and add the following configuration:

```json
{
  "providers": {
    "openai": {
      "baseUrl": "https://tokenflux.dev/v1"
    }
  }
}
```

If `models.json` already exists, merge the `openai` entry into your existing `providers` object instead of overwriting other providers.

### 3. Log In and Save the API Key

Start Pi and use the built-in `/login` command to store your credentials:

1. Run `pi` in your terminal to start interactive mode.
2. Enter `/login` and press Enter.
3. Select **OpenAI** from the provider list.
4. Paste your TokenFlux API key.

Pi saves credentials in `~/.pi/agent/auth.json` (or `%USERPROFILE%\.pi\agent\auth.json` on Windows). You do not need to write the key into `models.json` or manually edit `auth.json`. The stored credentials match the overridden `openai` Base URL in `models.json`.

## Launch and Select Models

### Check the Model Catalog

Run the following command to check matching models in Pi:

```bash
pi --list-models gpt-5.6-terra
```

### Interactive Session

Launch an interactive session by specifying the provider and model:

```bash
pi --provider openai --model gpt-5.6-terra
```

Once Pi is running, you can also switch models inside the session using the `/model` command or the `Ctrl+L` shortcut.

## Minimal Verification

Run the following minimal command to verify the setup:

```bash
pi --provider openai --model gpt-5.6-terra --no-session --no-tools -p "Reply with OK only"
```

::: warning Real Calls and Billing Notice
This verification command makes a real model call to TokenFlux and incurs charges. Receiving an `OK` reply confirms the integration works.
:::

## Troubleshooting and Notes

### Model Catalog vs. Group Support

Pi's built-in model catalog may list models not supported by your current TokenFlux group. Seeing a model in the list only indicates that the configuration was loaded; whether it works depends on whether the minimal call succeeds.

### Cost Metadata vs. Actual Pricing

The OpenAI cost metadata shown in Pi's footer is based on default preset rates and does not reflect TokenFlux pricing. For actual costs and usage details, refer to [TokenFlux Models](https://tokenflux.dev/models) and your console usage records.

### Updating the Model Catalog

To sync Pi's built-in model catalog, run:

```bash
pi update --models
```

## Related Pages

- [Create API Key](/en/docs/tokenflux/create-apikey) - pick a group and generate a key
- [API Endpoints](/en/docs/tokenflux/endpoints) - address and protocol format
- [Troubleshooting](/en/docs/troubleshooting) - locate a problem by symptom
- [Pi Repository (GitHub)](https://github.com/earendil-works/pi-mono) - source code and official documentation
- [Pi Website](https://pi.dev) - official homepage
