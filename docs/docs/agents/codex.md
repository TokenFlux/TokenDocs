---
verifiedAt: '2026-08-22'
---

# Codex 使用指南

`Codex` 是一款专为代码生成、修改和审查设计的 AI Agent 工具。

## 安装

根据使用习惯选择安装方式。

<DocsTabs default-tab="app">
  <DocsTab title="Codex App" name="app">

`Codex App` 适合使用图形界面的用户。

按系统选择对应安装包：

- [Codex App for Windows](https://get.microsoft.com/installer/download/9PLM9XGG6VKS?cid=website_cta_psi)
- [Codex App for macOS (Apple Silicon)](https://persistent.oaistatic.com/codex-app-prod/Codex.dmg)
- [Codex App for macOS (Intel)](https://persistent.oaistatic.com/codex-app-prod/Codex-latest-x64.dmg)

下载完成后，按照系统提示完成安装并启动即可。

  </DocsTab>

  <DocsTab title="Codex CLI" name="cli">

推荐在终端中使用 `Codex CLI`。

安装方式：

```bash
npm install -g @openai/codex
```

验证安装：

```bash
codex --help
```

命令能正常输出帮助信息即表示安装成功。

  </DocsTab>

  <DocsTab title="npx 直接调用" name="npx">

无需全局安装，可直接使用 `npx` 按需调用 `Codex`。

```bash
npx @openai/codex
```

第一次运行时，`npx` 会自动下载并执行 `Codex`。适合以下场景：

- 不想改动全局环境
- 在某台机器上按需运行一次
- 验证 CLI 是否满足需求

如果使用频率较高，建议全局安装以加快启动速度。

  </DocsTab>
</DocsTabs>

## 导入

安装完成后，选择以下两种方式之一将 `Codex` 接入 `TokenFlux`。

<DocsTabs default-tab="cc-switch-setup">
  <DocsTab title="使用 CC-Switch" name="cc-switch-setup">

推荐使用 `CC-Switch` 统一管理配置。

操作步骤：

1. 按 [创建 API Key 教程](/docs/tokenflux/create-apikey) 生成 API Key。
2. 在密钥列表里点击该 Key 的“更多”，选择“导入到 CCS”，在 `CC-Switch` 弹窗中确认导入。详细说明见 [CC-Switch](/docs/agents/cc-switch)。
3. 在 `CC-Switch` 的 `Codex` 页面启用刚导入的 TokenFlux 供应商。
4. 重启 `Codex` 或 `Codex App`。

  </DocsTab>

  <DocsTab title="手动填写" name="manual-setup">

**第一步：确认配置目录**

`Codex` 的本地配置目录为：

- Windows：`%userprofile%\.codex`
- macOS / Linux：`~/.codex`

Codex CLI 与官方 IDE 扩展共享 `config.toml` 配置层。通过 Zed 的 Codex 外部 Agent 使用时，配置读取方式取决于所安装的集成版本。

建议先启动一次 `Codex` 或 `Codex App`，让程序自动初始化配置目录。

**第二步：写入 `config.toml`**

在配置目录中创建或编辑 `config.toml`，确保以下内容位于文件开头：

```toml
model_provider = "tokenflux"
model = "gpt-6-astra"
review_model = "gpt-6-astra"
model_reasoning_effort = "xhigh"

[model_providers.tokenflux]
name = "OpenAI"
base_url = "https://tokenflux.dev/v1"
wire_api = "responses"
requires_openai_auth = true
```

**第三步：写入 `auth.json`**

在同一目录中创建或编辑 `auth.json`：

```json
{
  "OPENAI_API_KEY": "YOUR_TOKENFLUX_API_KEY"
}
```

将 `YOUR_TOKENFLUX_API_KEY` 替换为实际的 API Key。

**WebSocket 版本（可选）**

如需使用 WebSocket 协议，将 `supports_websockets = true` 合并到现有的 `[model_providers.tokenflux]` 表中，并在 `[features]` 中开启 `responses_websockets_v2`。下面展示合并后的供应商配置；同一张表在文件中只保留一份。

```toml
[model_providers.tokenflux]
name = "OpenAI"
base_url = "https://tokenflux.dev/v1"
wire_api = "responses"
requires_openai_auth = true
supports_websockets = true

[features]
responses_websockets_v2 = true
```

**沙箱网络访问（可选）**

使用 `workspace-write` 沙箱且需要让其中运行的命令联网时，在 `config.toml` 的 `[sandbox_workspace_write]` 表中设置：

```toml
[sandbox_workspace_write]
network_access = true
```

该设置控制沙箱内命令的网络访问，不控制 Codex 自身连接模型 API。其他沙箱模式和网络设置见 [官方配置参考](https://developers.openai.com/codex/config-reference)。

  </DocsTab>
</DocsTabs>

## 远程压缩

`Codex` 会在长对话接近上下文上限时压缩历史。压缩方式取决于客户端版本、供应商能力配置和服务端支持。

本页保留 `name = "OpenAI"` 以兼容已有配置。部分版本会据此选择默认能力；当前版本也支持显式配置供应商能力，不能仅凭显示名判断是否使用远程压缩。远程压缩协议也随版本变化，例如 0.162 系列包含通过 Responses 请求发送 `compaction_trigger` 的实现。

遇到压缩失败时，请记录 Codex 版本、分组、模型和完整报错，按 [排障](/docs/troubleshooting#怎么反馈) 反馈。供应商能力字段见 [官方配置参考](https://developers.openai.com/codex/config-reference)。

<!--
## 1M 上下文窗口

`ChatGPT` 分组已全面支持 100 万上下文，推荐开启。

### 安装 Skill

克隆到 `Codex` 的用户 Skill 目录：

```bash
git clone https://github.com/smartcmd/codex-context-window.git ~/.codex/skills/codex-context-window
```

也可以把下面这段直接发给 `Codex`，让它自己完成安装和配置：

```text
安装这个 Skill：https://github.com/smartcmd/codex-context-window

然后将 gpt-5.6-terra、gpt-6-astra 的上下文窗口调整为 1M，自动压缩阈值设置为 900k。
```

### 配置模型

新开一个任务让 `Codex` 发现 Skill，然后发送：

```text
将 gpt-5.6-terra、gpt-6-astra 的上下文窗口调整为 1M，自动压缩阈值设置为 900k。
```

Skill 会依次确认目标模型、原始窗口大小、有效窗口比例和自动压缩策略，确认后才写入配置。有效比例保持默认的 `95%` 即可（1M 原始窗口对应可用上下文为 `950000` token，状态栏显示折算后的数值）。配置完成后重启 `Codex`。

### 确认是否生效

- `Codex App`：在 **设置 → 常规 → 编辑器** 中开启 **显示上下文窗口使用情况**，新开一条消息即可看到窗口大小。
- `Codex CLI`：输入 `/status`，在输出中查看 **Context window**。

-->

## codex-auto-review

`ChatGPT`、`ChatGPT (Azure)` 和 `ChatGPT (不稳定)` 分组当前默认将 `codex-auto-review` 重定向到 `gpt-6.1-sol`。

如需使用其他模型，可以在 [API 密钥页面](https://tokenflux.dev/keys) 设置该 Key 的模型重定向。目标模型须在所选分组中可用，价格可在 [模型广场](https://tokenflux.dev/models) 查看。
