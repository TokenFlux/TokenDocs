# Hermes Guide

`Hermes` is an AI Agent tool that supports connecting to `TokenFlux` through a custom OpenAI-compatible interface.

## Installation

Use the official installation script:

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

After installation, the default config directory is usually `~/.hermes`.

## Connect to TokenFlux

1. Follow [Create API Key](/en/docs/tokenflux/create-apikey) to generate an API key.
2. Edit `~/.hermes/config.yaml` and add or confirm the following configuration:

   ```yaml
   model:
     default: "gpt-5.4"
     provider: "custom"
     base_url: "https://tokenflux.dev/v1"
   ```

3. Edit `~/.hermes/.env` and write:

   ```env
   OPENAI_API_KEY=YOUR_TOKENFLUX_API_KEY
   OPENAI_BASE_URL=https://tokenflux.dev/v1
   ```

   Replace `YOUR_TOKENFLUX_API_KEY` with your real API key.

## Verify Configuration

After saving the configuration, run:

```bash
hermes config check
hermes chat -Q -q 'Only reply OK' --max-turns 3
```

If the command returns normally, `Hermes` has successfully called a model through `TokenFlux`.

## More Related Content

- [Create API Key](/en/docs/tokenflux/create-apikey)
- [Billing](/en/docs/tokenflux/billing)
