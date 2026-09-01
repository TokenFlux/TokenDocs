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
2. 按 [CC-Switch](/docs/agents/cc-switch) 完成统一供应商配置。
3. 配置完成后，重启 `OpenCode`。

  </DocsTab>

  <DocsTab title="手动填写" name="manual-setup">

**第一步：创建配置文件**

进入项目目录，创建 `opencode.json` 文件。

**第二步：填写配置**

将以下内容复制到 `opencode.json`，将 `YOUR_API_KEY` 替换为 TokenFlux API Key。

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "openai/gpt-5.6-sol",
  "small_model": "openai/gpt-5.6-luna",
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

`OpenCode` 会通过内置的 `openai` provider 自动识别模型。其他平台也按同样方式配置到对应的内置 provider；需要访问多个分组时，可以在创建 API Key 时开启 **复合 Key**。

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

## 验证接入

两种配置方式都可以用下面的命令确认：

```bash
opencode models
opencode run -m openai/<模型 ID> "只回复 OK"
```

`opencode models` 列出已加载的模型，模型 ID 出现在列表里说明配置被读到了。`opencode run` 会真实调用并扣费，收到回复即接入成功。

命令报错或模型列表为空时，先按 [单独测试 Key 和端点](/docs/troubleshooting#单独测试-key-和端点) 排除客户端因素，再回头检查 `opencode.json`。

## 相关入口

- [创建 API Key](/docs/tokenflux/create-apikey) — 选择分组并生成密钥
- [API 端点](/docs/tokenflux/endpoints) — 地址与协议格式
- [排障](/docs/troubleshooting) — 按症状定位问题
