---
verifiedAt: '2026-08-22'
---

# Cherry Studio 使用指南

`Cherry Studio` 是一款支持多模型的桌面 AI 对话客户端，界面简洁，支持自定义服务商，适合日常对话和多模型对比使用。

## 安装

前往 [Cherry Studio 官方下载页](https://cherry-ai.com/download) 获取安装包，根据操作系统选择对应版本。

<DocsTabs default-tab="windows">
  <DocsTab title="Windows" name="windows">

Cherry Studio 提供 **Setup 安装版**和 **Portable 便携版**，均支持 x64 和 ARM64 架构。

1. 访问 [下载页面](https://cherry-ai.com/download)，根据系统架构选择对应安装包：
   - 普通 PC：选择推荐的标准版
   - ARM 设备：选择 `ARM` 版本
2. 下载完成后，双击安装包，按照向导提示完成安装。
3. 安装完成后，从开始菜单启动 `Cherry Studio`。

> **注意：** Cherry Studio 不支持 Windows 7。
>
> 如果启动时提示缺少运行库，请先安装 [Visual C++ Redistributable](https://aka.ms/vs/17/release/vc_redist.x64.exe)。

  </DocsTab>

  <DocsTab title="macOS" name="macos">

Cherry Studio 提供 Intel 和 Apple Silicon 两个版本，请按芯片类型选择：

- **Apple Silicon**：选择 `Apple Silicon` 版本
- **Intel 芯片**：选择 `Intel` 版本

1. 访问 [下载页面](https://cherry-ai.com/download)，下载对应的 `.dmg` 文件。
2. 打开 `.dmg`，将 `Cherry Studio` 拖入"应用程序"文件夹。
3. 从启动台或"应用程序"中启动 `Cherry Studio`。

  </DocsTab>

  <DocsTab title="Linux" name="linux">

Linux 发布包包括 AppImage、deb 和 rpm。下方以支持 x86_64 和 ARM64 的 AppImage 为例。

1. 访问 [下载页面](https://cherry-ai.com/download)，根据系统架构选择对应 AppImage 文件：
   - 普通 x86 设备：选择 `x86_64` 版本
   - ARM 设备：选择 `ARM64` 版本
2. 在下载目录中赋予文件可执行权限。将命令中的 `Cherry-Studio.AppImage` 替换为实际下载的文件名：

   ```bash
   chmod +x ./Cherry-Studio.AppImage
   ```

3. 双击运行，或使用同一实际文件名在终端中执行：

   ```bash
   ./Cherry-Studio.AppImage
   ```

  </DocsTab>
</DocsTabs>

## 接入 TokenFlux

安装完成后，在 Cherry Studio 中添加 TokenFlux 作为自定义服务商。以下步骤使用 2.x 的协议端点配置界面。

1. 按 [创建 API Key 教程](/docs/tokenflux/create-apikey) 生成一个 API Key。
2. 打开 `Cherry Studio`，进入设置中的供应商管理，添加自定义供应商。
3. 将名称设为 `TokenFlux`，填入 API Key。
4. 展开更多端点设置，在 **OpenAI Responses** 的地址字段填写 `https://tokenflux.dev/v1`。请求预览应指向 `https://tokenflux.dev/v1/responses`。
5. 如果同时配置了其他对话端点，将 **OpenAI Responses** 设为默认对话端点。
6. 保存供应商，在该供应商的模型列表中获取并添加所需模型，例如 `gpt-6-astra`。
7. 回到对话界面，选择该模型并发送消息。

使用 Chat Completions 时，在对应端点字段中同样填写 `https://tokenflux.dev/v1`，并选择匹配的默认对话端点。协议路径会自动拼接，无需把 `/responses` 或 `/chat/completions` 写入上述地址字段。

## 验证接入

获取模型列表可以确认列表接口能够访问；随后还需在对话界面发一条消息，收到回复后在 [使用记录](https://tokenflux.dev/usage) 中核对请求。

拉不到模型列表时，先按 [单独测试 Key 和端点](/docs/troubleshooting#单独测试-key-和端点) 排除客户端因素，再检查地址是否漏写或多写了 `/v1`。

## 后续操作

完成配置后，即可在 `Cherry Studio` 中直接发起模型对话。

更多相关内容：

- [余额与计费](/docs/tokenflux/billing)
