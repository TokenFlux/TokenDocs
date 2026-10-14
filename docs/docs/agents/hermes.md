---
verifiedAt: '2026-10-13'
verifiedWith: 'macOS 27.0.1（arm64）；Hermes v0.21.6、Python 3.14.7；源码安装、config.yaml 与 .env 配置、gpt-6-astra 对话。'
---

# Hermes 使用指南

`Hermes` 是一款 AI Agent 工具，支持通过自定义 OpenAI-compatible 接口接入 `TokenFlux`。

## 安装

按系统选择官方安装脚本：

<DocsTabs default-tab="unix">
  <DocsTab title="macOS / Linux / WSL" name="unix">

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

  </DocsTab>

  <DocsTab title="Windows PowerShell" name="windows">

```powershell
iex (irm https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.ps1)
```

  </DocsTab>
</DocsTabs>

安装完成后重新打开终端，让 PATH 更新生效。默认配置目录为：

| 系统                | 配置目录                |
| ------------------- | ----------------------- |
| macOS / Linux / WSL | `~/.hermes`             |
| 原生 Windows 安装   | `%LOCALAPPDATA%\hermes` |

设置了 `HERMES_HOME` 时，使用该变量指定的目录。下文中的 `config.yaml` 和 `.env` 都位于此配置目录。

## 接入 TokenFlux

1. 按 [创建 API Key 教程](/docs/tokenflux/create-apikey) 生成一个 API Key。
2. 编辑配置目录中的 `config.yaml`，写入或确认以下配置：

   ```yaml
   model:
     default: 'gpt-6-astra'
     provider: 'custom'
     base_url: 'https://tokenflux.dev/v1'
   ```

3. 编辑同一目录中的 `.env`，写入：

   ```env
   OPENAI_API_KEY=YOUR_TOKENFLUX_API_KEY
   OPENAI_BASE_URL=https://tokenflux.dev/v1
   ```

   将 `YOUR_TOKENFLUX_API_KEY` 替换为实际的 API Key。

## 验证配置

保存配置后，可运行以下命令验证：

```bash
hermes config check
hermes chat -Q -q '只回复 OK' --max-turns 3
```

`hermes config check` 检查本地配置；`hermes chat` 会发起真实模型请求并产生计费。收到模型回复后，可在 [使用记录](https://tokenflux.dev/usage) 中核对请求。

如果客户端提示 API Key 被拒绝，请继续查看 `Provider said` 后的服务端消息。订阅绑定失效等计费错误也可能显示在这一提示下，具体处理见 [错误码](/docs/errors) 和 [余额与计费](/docs/tokenflux/billing)。

## 更多相关内容

- [创建 API Key](/docs/tokenflux/create-apikey)
- [计费说明](/docs/tokenflux/billing)
