# Hermes 使用指南

`Hermes` 是一款 AI Agent 工具，支持通过自定义 OpenAI-compatible 接口接入 `TokenFlux`。

## 安装

可直接使用官方安装脚本：

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

安装完成后，默认配置目录通常位于 `~/.hermes`。

## 接入 TokenFlux

1. 按 [创建 API Key 教程](/docs/tokenflux/create-apikey) 生成一个 API Key。
2. 编辑 `~/.hermes/config.yaml`，写入或确认以下配置：

   ```yaml
   model:
     default: "gpt-5.4"
     provider: "custom"
     base_url: "https://tokenflux.dev/v1"
   ```

3. 编辑 `~/.hermes/.env`，写入：

   ```env
   OPENAI_API_KEY=YOUR_TOKENFLUX_API_KEY
   OPENAI_BASE_URL=https://tokenflux.dev/v1
   ```

   将 `YOUR_TOKENFLUX_API_KEY` 替换为你的真实 API Key。

## 验证配置

保存配置后，可运行以下命令验证：

```bash
hermes config check
hermes chat -Q -q '只回复 OK' --max-turns 3
```

如果命令能够正常返回，即表示 `Hermes` 已成功通过 `TokenFlux` 调用模型。

## 更多相关内容

- [创建 API Key](/docs/tokenflux/create-apikey)
- [计费说明](/docs/tokenflux/billing)
