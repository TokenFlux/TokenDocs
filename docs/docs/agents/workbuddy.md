# WorkBuddy 使用指南

`WorkBuddy` 是腾讯推出的桌面 AI Agent 工作台，支持本地文件处理、Skills、MCP、自动化任务和自定义模型。它可以通过 OpenAI-compatible 接口接入 `TokenFlux`。

## 下载与安装

1. 打开 [WorkBuddy 官方下载页](https://www.codebuddy.cn/work/)；也可以先访问 [国内官网](https://www.workbuddy.cn/) 或 [海外官网](https://www.workbuddy.ai/)。
2. 选择与设备匹配的安装包：
   - Apple Silicon Mac：选择 `arm64`。
   - Intel Mac：选择 `x64`。
   - Windows：选择 Windows 安装程序。
3. macOS 打开下载的 DMG，将 `WorkBuddy.app` 拖入 `Applications`；Windows 按安装程序提示完成安装。
4. 第一次启动时，WorkBuddy 会准备本地运行环境。保持网络连接并等待应用自动进入欢迎页，不要在此阶段强制退出。

<div style="text-align: center;">
  <img src="/images/workbuddy/01-preparing-environment.png" width="800" alt="WorkBuddy 第一次启动时正在准备运行环境" />
</div>

环境准备完成后会显示欢迎页。点击 **登录** 继续。

<div style="text-align: center;">
  <img src="/images/workbuddy/02-welcome-login.png" width="987" alt="WorkBuddy 欢迎页和登录按钮，登录按钮已用红框标出" />
</div>

## 登录

WorkBuddy 会在浏览器中打开腾讯 CodeBuddy 登录页。

1. 阅读用户服务协议和隐私政策。
2. 由你本人勾选同意选项并点击 **同意**。
3. 选择微信、手机号、邮箱或 SSO 完成认证；可用方式可能因地区和账号类型而异。
4. 浏览器提示成功后返回 WorkBuddy。

<div style="text-align: center;">
  <img src="/images/workbuddy/03-browser-sign-in.png" width="1274" alt="WorkBuddy 的腾讯 CodeBuddy 登录页，同意按钮和协议复选框已用红框标出" />
</div>

## 接入 TokenFlux

### 1. 准备 API Key

按 [创建 API Key 教程](/docs/tokenflux/create-apikey) 创建一张 Key，并在 [模型广场](https://tokenflux.dev/models) 确认该 Key 所在分组支持的模型 ID。

### 2. 打开自定义模型设置

登录 WorkBuddy 后，依次进入：

1. 头像或账户菜单。
2. **系统设置**。
3. **模型**。
4. 点击 **添加模型**。

<div style="text-align: center;">
  <img src="/images/workbuddy/04-system-settings.png" width="925" alt="WorkBuddy 系统设置窗口，左侧模型入口已用红框标出" />
</div>

进入 **模型** 后可以看到本地配置文件路径和 **添加模型** 按钮。

<div style="text-align: center;">
  <img src="/images/workbuddy/05-model-settings.png" width="925" alt="WorkBuddy 模型设置页面，添加模型按钮已用红框标出" />
</div>

WorkBuddy 会在模型页面显示实际的本地配置文件路径。WorkBuddy 桌面版通常使用 `~/.workbuddy/models.json`；[官方模型配置文档](https://www.workbuddy.ai/docs/zh/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Model) 还说明了已有 `~/.codebuddy/models.json` 配置的兼容迁移。

### 3. 填写模型配置

在提供商列表底部选择 **自定义 / Custom**。WorkBuddy 的自定义入口目前只支持 OpenAI-compatible API，TokenFlux 可以直接使用这一入口。

<div style="text-align: center;">
  <img src="/images/workbuddy/06-provider-selection.png" width="538" alt="WorkBuddy 添加模型时在提供商列表中选择自定义 Custom，目标选项已用红框标出" />
</div>

然后填写：

| 配置项 | 建议值 |
| --- | --- |
| 提供商 | `自定义 / Custom` |
| 接口地址 | `https://tokenflux.dev/v1/chat/completions` |
| 中国大陆优化接口 | `https://token.memoh.net/v1/chat/completions` |
| API Key | 你的 TokenFlux API Key |
| 模型名称 | 模型广场显示的精确模型 ID，例如 `gpt-5.6-sol` |
| 工具调用 | 开启；本教程使用的 `gpt-5.6-sol` 支持 Tool Calling |
| 图片输入 | 开启；允许 WorkBuddy 向模型发送图片 |
| 思考模式 | 开启；使用 `gpt-5.6-sol` 的 reasoning 能力 |
| 自定义协议 | 保持关闭，使用 OpenAI Chat Completions 兼容协议 |

<div style="text-align: center;">
  <img src="/images/workbuddy/07-tokenflux-configuration.png" width="538" alt="WorkBuddy 中已填写 TokenFlux 接口和 gpt-5.6-sol 模型的自定义模型表单，必填项已用红框标出" />
</div>

::: tip 使用完整接口地址
WorkBuddy 5.3.5 实测不会在输入框失去焦点时把 `/v1` 自动补全为请求路径。为避免版本差异，直接填写上表中以 `/chat/completions` 结尾的完整地址。
:::

::: warning 不要为 TokenFlux 开启自定义协议
开启后 WorkBuddy 会跳过标准 OpenAI Chat Completions 路径校验。该选项用于非标准网关或代理路径，TokenFlux 的标准 OpenAI-compatible 接口不需要开启。
:::

如果使用 [复合 Key](/docs/tokenflux/composite-key)，模型名称还要带上分组前缀，例如 `GPT/gpt-5`。前缀和模型 ID 必须与复合 Key 映射完全一致。

### 4. 保存并验证

1. 点击 **保存**。模型会写入 WorkBuddy 模型页面显示的本地配置文件。

<div style="text-align: center;">
  <img src="/images/workbuddy/08-save-model.png" width="538" alt="WorkBuddy 自定义模型表单，保存按钮已用红框标出" />
</div>

2. 保存后，确认 `gpt-5.6-sol` 出现在 **已保存模型** 中。

<div style="text-align: center;">
  <img src="/images/workbuddy/09-saved-model.png" width="925" alt="WorkBuddy 已保存模型列表中的 gpt-5.6-sol 模型卡片，目标卡片已用红框标出" />
</div>

3. 返回新任务，打开模型选择器，在 **自定义模型** 中选择 `gpt-5.6-sol`。

<div style="text-align: center;">
  <img src="/images/workbuddy/10-select-custom-model.png" width="268" alt="WorkBuddy 模型选择器中的 gpt-5.6-sol 自定义模型，目标选项已用红框标出" />
</div>

4. 发送一条最小测试消息，例如 `你好`。实测请求在 6 秒内完成，响应底部显示使用的模型为 `gpt-5.6-sol`。

<div style="text-align: center;">
  <img src="/images/workbuddy/11-validation-result.png" width="704" alt="WorkBuddy 使用 gpt-5.6-sol 成功回复测试消息，响应底部的模型名称已用红框标出" />
</div>

5. 基础对话验证成功后，再测试需要工具调用的任务，例如让 WorkBuddy 在一个临时目录中创建文本文件并读取回来。

## 常见问题

### 保存后找不到模型

重新打开模型选择器或新建任务。如果使用企业账号，管理员可能禁止成员添加个人自定义模型，需要联系企业管理员确认策略。

### 返回 401 或认证失败

检查 API Key 是否复制完整、是否含空格或换行，以及 Key 是否已失效。不要把 Key 填到模型名称或接口地址字段。

### 返回 model not found

模型名称必须与 [模型广场](https://tokenflux.dev/models) 中当前分组支持的模型 ID 完全一致。复合 Key 还需要正确的前缀。

### Agent 不会调用工具

编辑该模型并确认 **工具调用** 已开启，同时确认上游模型本身支持 Tool Calling。只开启客户端选项不能给不支持工具的模型增加该能力。

## 相关入口

- [API 端点](/docs/tokenflux/endpoints)
- [创建 API Key](/docs/tokenflux/create-apikey)
- [复合 Key](/docs/tokenflux/composite-key)
- [WorkBuddy 官方下载页](https://www.codebuddy.cn/work/)
- [WorkBuddy 官方模型配置文档](https://www.workbuddy.ai/docs/zh/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Model)
