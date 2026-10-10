---
verifiedAt: '2026-08-22'
---

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
2. 在 `CC-Switch` 侧栏选择 `OpenCode`，点击“+”添加供应商，填入 `API 地址` `https://tokenflux.dev/v1`、API Key 与模型。控制台的“导入到 CCS”不覆盖 `OpenCode`，详见 [CC-Switch](/docs/agents/cc-switch)。
3. 保存后，在供应商卡片上点击“添加”，再重启 `OpenCode`。

  </DocsTab>

  <DocsTab title="手动填写" name="manual-setup">

**第一步：创建配置文件**

进入项目目录，创建 `opencode.json` 文件。

**第二步：填写配置**

将以下内容复制到 `opencode.json`，将 `YOUR_API_KEY` 替换为 TokenFlux API Key。

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "openai/gpt-6-astra",
  "provider": {
    "openai": {
      "options": {
        "baseURL": "https://tokenflux.dev/v1",
        "apiKey": "YOUR_API_KEY"
      }
    }
  }
}
```

此示例适用于普通 Key。内置 `openai` provider 使用 OpenCode 的模型目录；更改 `baseURL` 不会自动从 TokenFlux 获取全部模型。使用目录之外的模型或带前缀的复合 Key 时，需要显式配置 `provider.models`，见下文。

**第三步：启动 OpenCode**

进入项目目录后运行：

```bash
opencode
```

执行：

```text
/init
```

  </DocsTab>
</DocsTabs>

## 使用复合 Key

[复合 Key](/docs/tokenflux/composite-key) 要求请求中的模型 ID 带分组前缀。假设已将 `GPT` 前缀映射到支持 `gpt-6-astra` 的分组，可以使用下面的 `opencode.json`：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "tokenflux/GPT/gpt-6-astra",
  "provider": {
    "tokenflux": {
      "npm": "@ai-sdk/openai",
      "name": "TokenFlux",
      "options": {
        "baseURL": "https://tokenflux.dev/v1",
        "apiKey": "YOUR_API_KEY"
      },
      "models": {
        "GPT/gpt-6-astra": {
          "name": "GPT-6 Astra (TokenFlux)",
          "reasoning": true,
          "tool_call": true,
          "modalities": {
            "input": ["text", "image"],
            "output": ["text"]
          },
          "limit": {
            "context": 128000,
            "output": 32768
          }
        }
      }
    }
  }
}
```

将 `YOUR_API_KEY` 替换为复合 Key，`GPT` 替换为该 Key 上实际配置的前缀。`tokenflux` 是 OpenCode 中的供应商标识，请求发送的模型 ID 是 `GPT/gpt-6-astra`。

`limit` 是示例设置的客户端 Token 预算，可按模型与分组的实际能力调整。添加其他模型时，还需填写相应的工具调用、输入类型和思考能力，字段见 [OpenCode 自定义供应商文档](https://opencode.ai/docs/providers/#custom-provider)。

## 验证接入

普通 Key 的上述配置可以用下面的命令确认：

```bash
opencode models
opencode run -m openai/gpt-6-astra "只回复 OK"
```

使用上面的复合 Key 示例时，测试命令为：

```bash
opencode run -m tokenflux/GPT/gpt-6-astra "只回复 OK"
```

`opencode models` 展示客户端模型目录，不会验证 TokenFlux 的 API Key、地址或模型权限。`opencode run` 会真实调用并扣费，收到回复后可在 [使用记录](https://tokenflux.dev/usage) 中确认请求。

命令报错或模型列表为空时，先按 [单独测试 Key 和端点](/docs/troubleshooting#单独测试-key-和端点) 排除客户端因素，再回头检查 `opencode.json`。

## 相关入口

- [创建 API Key](/docs/tokenflux/create-apikey) — 选择分组并生成密钥
- [API 端点](/docs/tokenflux/endpoints) — 地址与协议格式
- [排障](/docs/troubleshooting) — 按症状定位问题
