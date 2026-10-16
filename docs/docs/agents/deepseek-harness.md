---
verificationStatus: unverified
---

# DeepSeek Harness 使用指南

## 安装

<DocsTabs default-tab="desktop">
  <DocsTab title="Desktop 桌面端" name="desktop">

在 [官网](https://www.deepseek.com/harness/) 下载 macOS（Apple 芯片）或 Windows（64 位）安装包。macOS 将应用拖入「应用程序」；Windows 运行安装程序。桌面端自带运行环境，无需安装 Node.js。

首次启动进入 API Key 页面，选择「稍后配置」。TokenFlux Key 要填在下面的自定义供应商中。

  </DocsTab>
  <DocsTab title="Web UI" name="web">

安装符合 [官方要求](https://github.com/deepseek-ai/deepseek-harness/blob/master/package.json) 的 Node.js 后运行：

```bash
npx @deepseek-ai/dsh web
```

保持终端运行，在浏览器打开 `http://127.0.0.1:3080`；地址以终端输出为准。

  </DocsTab>
</DocsTabs>

## 配置 TokenFlux

1. [创建 API Key](/docs/tokenflux/create-apikey)。
2. 打开「设置 → 模型」，点击「添加模型供应商」，选择「自定义模型 API」。
3. 填写下表并保存。按钮名称以客户端界面为准。

| 配置项    | 填写内容                                 |
| --------- | ---------------------------------------- |
| 供应商 ID | `tokenflux`（创建后不可改名）            |
| 显示名称  | `TokenFlux`                              |
| API 地址  | `https://tokenflux.dev/v1`               |
| API 协议  | `OpenAI Responses`（`openai-responses`） |
| API Key   | 你的 TokenFlux API Key                   |
| 模型 ID   | `gpt-6-astra`，或分组支持的完整模型 ID   |

可手动添加模型，也可点击「获取可用模型」后勾选并添加。使用 [复合 Key](/docs/tokenflux/composite-key) 时，模型 ID 要带对应前缀。

使用 Anthropic Messages 时，另建 `tokenflux-anthropic` 供应商，协议选 `Anthropic Messages`，API 地址 填 `https://tokenflux.dev`，模型填分组支持的 ID，例如 `claude-sonnet-5-5`。

## 验证

点击「选择工作区」添加项目目录，新建会话并选择 TokenFlux 模型，发送「只回复 OK」。收到回复后，到 [使用记录](https://tokenflux.dev/usage) 核对模型及扣费；此步骤会产生推理费用。修改默认模型后也应新建会话。

连接失败见 [排障](/docs/troubleshooting)，协议地址见 [API 端点](/docs/tokenflux/endpoints)，更多设置见 [官方模型配置文档](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/providers.md)。
