# OpenCode 使用指南

`OpenCode` 是一款开源的 AI 编程助手框架，支持多种 AI 模型集成，包括代码生成、修改和审查功能。

## 安装

根据使用习惯选择安装方式。

<DocsTabs default-tab="script">
  <DocsTab title="脚本安装" name="script">

**macOS / Linux**

```bash
curl -fsSL https://opencode.ai/install | bash
```

**Windows PowerShell**

推荐使用 WSL 环境，按上述 macOS / Linux 方式安装。

  </DocsTab>

  <DocsTab title="npm 安装" name="npm">

全局安装 `OpenCode`：

```bash
npm install -g opencode-ai
```

安装完成后，直接在终端运行 `opencode` 即可启动。

  </DocsTab>

  <DocsTab title="Homebrew" name="homebrew">

**macOS / Linux**

```bash
brew install anomalyco/tap/opencode
```

  </DocsTab>

  <DocsTab title="Windows" name="windows">

除 WSL 外，还可使用以下包管理器：

**Chocolatey**

```cmd
choco install opencode
```

**Scoop**

```cmd
scoop install opencode
```

推荐优先使用 WSL 环境以获得最佳兼容性。

  </DocsTab>
</DocsTabs>

## 导入

安装完成后，选择以下两种方式之一将 `OpenCode` 接入 `TokenFlux`。

<DocsTabs default-tab="cc-switch-setup">
  <DocsTab title="使用 CC-Switch" name="cc-switch-setup">

推荐使用 `CC-Switch` 统一管理配置。

操作步骤：

1. 按 [创建 API Key 教程](/docs/tokenflux/create-apikey) 生成 API Key。
2. 按 [CC-Switch](/docs/agents/cc-switch) 完成统一供应商配置。
3. 配置完成后，重启 `OpenCode`。

  </DocsTab>

  <DocsTab title="手动填写" name="manual-setup">

**第一步：创建配置文件**

进入项目目录，创建 `opencode.json` 文件。

**第二步：填写配置**

将以下内容复制到 `opencode.json`。[模型广场](https://tokenflux.dev/models) 当前有 4 个公开分组；如果你有多张 TokenFlux API Key，就按分组拆成多个 provider key，同一分组里的模型放在同一个 provider 里即可。

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

将每个 `YOUR_..._API_KEY` 换成对应分组的 TokenFlux API Key。

这个示例按 TokenFlux 模型广场当前公开分组整理：

- `tokenflux-chatgpt-plus` 对应 ChatGPT Plus。
- `tokenflux-chatgpt-pro` 对应 ChatGPT Pro，额外包含 `gpt-5.4-pro`。
- `tokenflux-deepseek` 对应 DeepSeek，属于 Anthropic 平台分组。
- `tokenflux-mimo` 对应 MIMO，属于 Anthropic 平台分组。
- `model` 和 `small_model` 需要写成 `provider_id/model_id` 的完整形式。
- OpenAI 平台分组使用 `@ai-sdk/openai-compatible`；Anthropic 平台分组使用 `@ai-sdk/anthropic`。
- 如果你只想先接一组，就只保留那个 provider 块。

如果你后面还想给某个模型单独加 `reasoningEffort`、`textVerbosity` 或其他选项，直接在对应模型条目里补 `options` 就行。

**第三步：启动 OpenCode**

进入项目目录后运行：

```bash
opencode
```

然后执行：

```
/init
```

  </DocsTab>
</DocsTabs>
