# OpenCode Guide

`OpenCode` is an open-source AI coding assistant framework. It supports integration with multiple AI models, including code generation, modification, and review workflows.

## Installation

Choose an installation method based on your workflow.

<DocsTabs default-tab="script">
  <DocsTab title="Script Install" name="script">

**macOS / Linux**

```bash
curl -fsSL https://opencode.ai/install | bash
```

**Windows PowerShell**

Using WSL is recommended. Install it with the macOS / Linux method above inside WSL.

  </DocsTab>

  <DocsTab title="npm Install" name="npm">

Install `OpenCode` globally:

```bash
npm install -g opencode-ai
```

After installation, run `opencode` in a terminal to start it.

  </DocsTab>

  <DocsTab title="Homebrew" name="homebrew">

**macOS / Linux**

```bash
brew install anomalyco/tap/opencode
```

  </DocsTab>

  <DocsTab title="Windows" name="windows">

Besides WSL, you can also use these package managers:

**Chocolatey**

```cmd
choco install opencode
```

**Scoop**

```cmd
scoop install opencode
```

Using WSL is recommended for best compatibility.

  </DocsTab>
</DocsTabs>

## Connect to TokenFlux

After installation, choose one of the following methods to connect `OpenCode` to `TokenFlux`.

<DocsTabs default-tab="cc-switch-setup">
  <DocsTab title="Use CC-Switch" name="cc-switch-setup">

Using `CC-Switch` is recommended for centralized configuration.

Steps:

1. Follow [Create API Key](/en/docs/tokenflux/create-apikey) to generate an API key.
2. Follow [CC-Switch](/en/docs/agents/cc-switch) to configure a unified provider.
3. Restart `OpenCode` after configuration is complete.

  </DocsTab>

  <DocsTab title="Manual Setup" name="manual-setup">

**Step 1: Create the config file**

In your project directory, create an `opencode.json` file.

**Step 2: Fill in the configuration**

Copy the following content into `opencode.json`. The [model marketplace](https://tokenflux.dev/models) currently has four public groups. If you have multiple TokenFlux API keys, split them by group into multiple provider keys; models in the same group can stay under the same provider.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "tokenflux-chatgpt-plus/gpt-5.4",
  "small_model": "tokenflux-chatgpt-plus/gpt-5.4-mini",
  "provider": {
    "tokenflux-chatgpt-pro": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "TokenFlux ChatGPT Pro",
      "options": {
        "baseURL": "https://tokenflux.dev/v1",
        "apiKey": "YOUR_CHATGPT_PRO_API_KEY"
      },
      "models": {
        "codex-auto-review": {
          "name": "codex-auto-review"
        },
        "gpt-5.2": {
          "name": "GPT-5.2"
        },
        "gpt-5.3": {
          "name": "gpt-5.3"
        },
        "gpt-5.3-spark": {
          "name": "gpt-5.3-spark"
        },
        "gpt-5.4": {
          "name": "GPT-5.4"
        },
        "gpt-5.4-mini": {
          "name": "GPT-5.4 Mini"
        },
        "gpt-5.4-pro": {
          "name": "gpt-5.4-pro"
        },
        "gpt-5.5": {
          "name": "GPT-5.5"
        }
      }
    },
    "tokenflux-chatgpt-plus": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "TokenFlux ChatGPT Plus",
      "options": {
        "baseURL": "https://tokenflux.dev/v1",
        "apiKey": "YOUR_CHATGPT_PLUS_API_KEY"
      },
      "models": {
        "codex-auto-review": {
          "name": "codex-auto-review"
        },
        "gpt-5.2": {
          "name": "GPT-5.2"
        },
        "gpt-5.3": {
          "name": "gpt-5.3"
        },
        "gpt-5.3-spark": {
          "name": "gpt-5.3-spark"
        },
        "gpt-5.4": {
          "name": "GPT-5.4"
        },
        "gpt-5.4-mini": {
          "name": "GPT-5.4 Mini"
        },
        "gpt-5.5": {
          "name": "GPT-5.5"
        }
      }
    },
    "tokenflux-deepseek": {
      "npm": "@ai-sdk/anthropic",
      "name": "TokenFlux DeepSeek",
      "options": {
        "baseURL": "https://tokenflux.dev/v1",
        "apiKey": "YOUR_DEEPSEEK_API_KEY"
      },
      "models": {
        "deepseek-v4-flash": {
          "name": "deepseek-v4-flash"
        },
        "deepseek-v4-pro": {
          "name": "deepseek-v4-pro"
        }
      }
    },
    "tokenflux-mimo": {
      "npm": "@ai-sdk/anthropic",
      "name": "TokenFlux MIMO",
      "options": {
        "baseURL": "https://tokenflux.dev/v1",
        "apiKey": "YOUR_MIMO_API_KEY"
      },
      "models": {
        "mimo-v2.5": {
          "name": "mimo-v2.5"
        },
        "mimo-v2.5-pro": {
          "name": "mimo-v2.5-pro"
        }
      }
    }
  }
}
```

Replace each `YOUR_..._API_KEY` with the TokenFlux API key for the corresponding group.

This example is organized by the current public groups in the TokenFlux model marketplace:

- `tokenflux-chatgpt-plus` maps to ChatGPT Plus.
- `tokenflux-chatgpt-pro` maps to ChatGPT Pro and additionally includes `gpt-5.4-pro`.
- `tokenflux-deepseek` maps to DeepSeek and belongs to the Anthropic platform group.
- `tokenflux-mimo` maps to MIMO and belongs to the Anthropic platform group.
- `model` and `small_model` must use the full `provider_id/model_id` form.
- OpenAI platform groups use `@ai-sdk/openai-compatible`; Anthropic platform groups use `@ai-sdk/anthropic`.
- If you only want to connect one group first, keep only that provider block.

If you later want to add `reasoningEffort`, `textVerbosity`, or other options for a specific model, add an `options` field under that model entry.

**Step 3: Start OpenCode**

Run this from the project directory:

```bash
opencode
```

Then run:

```text
/init
```

  </DocsTab>
</DocsTabs>
