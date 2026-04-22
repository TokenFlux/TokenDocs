# 快速开始

本页用于完成 TokenFlux 的首次接入。根据使用习惯，你可以选择 `Agent` 或 `ChatBot` 两种方式开始。

::: details For AGENTS
批量读取文档时，可直接使用 [sitemap.xml](/sitemap.xml)。单页读取时，直接在不以 `/` 结尾的文档 URL 后追加 `.md` 即可，例如 `/docs/quickstart.md`。
:::

## 开始前确认

1. 按 [创建 API Key](/docs/tokenflux/create-apikey) 生成一个新的 API Key。
2. 按 [计费说明](/docs/tokenflux/billing) 了解购买方式，并前往 [充值/订阅页面](https://tokenflux.dev/purchase) 完成充值或订阅。模型广场显示的价格即为最终计费价格。

## 选择接入方式

<DocsTabs default-tab="agent">
  <DocsTab title="Agent" name="agent">

适合在终端工作、有编程需求或希望使用 AI Agent 辅助开发的用户。

推荐通过 `CC-Switch` 统一管理 API Key 和供应商配置，支持 `Claude Code`、`Codex` 和 `OpenCode` 等多个 Agent 客户端，无需手动修改环境变量。

**接入步骤：**

1. 按 [CC-Switch](/docs/agents/cc-switch) 完成安装和供应商配置。
2. 根据使用的客户端继续完成接入：
   - [Claude Code 使用指南](/docs/agents/claude-code)
   - [Codex 使用指南](/docs/agents/codex)
   - [OpenCode 使用指南](/docs/agents/opencode)
3. 配置完成后，重启客户端即可开始使用。

  </DocsTab>

  <DocsTab title="ChatBot" name="chatbot">

适合偏好图形界面、移动端或以日常对话为主要使用场景的用户。

推荐客户端：

- **Cherry Studio**：桌面端（Windows / macOS / Linux），支持多模型切换，界面简洁，配置方便。
- **RikkaHub**：Android 手机端，支持 OpenAI 兼容接口，适合移动端日常使用。

**接入步骤：**

1. 按 [创建 API Key](/docs/tokenflux/create-apikey) 生成一个 API Key。
2. 根据设备选择客户端并完成安装：
   - 桌面端：[Cherry Studio 使用指南](/docs/chatbot/cherry-studio)
   - Android：[RikkaHub 使用指南](/docs/chatbot/rikkahub)
3. 在客户端设置中添加 TokenFlux 作为自定义服务商，填入 API Key，获取模型列表后即可开始对话。

  </DocsTab>
</DocsTabs>

## 继续阅读

- [计费说明](/docs/tokenflux/billing)
- [邀请返利](/docs/tokenflux/referral)
