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

Linux 版本以 AppImage 格式分发，支持 x86_64 和 ARM64 架构。

1. 访问 [下载页面](https://cherry-ai.com/download)，根据系统架构选择对应 AppImage 文件：
   - 普通 x86 设备：选择 `x86_64` 版本
   - ARM 设备：选择 `ARM64` 版本
2. 下载完成后，赋予文件可执行权限：

   ```bash
   chmod +x CherryStudio-*.AppImage
   ```

3. 双击运行，或在终端中执行：

   ```bash
   ./CherryStudio-*.AppImage
   ```

AppImage 已内置所有依赖，适用于大多数主流 Linux 发行版，无需额外安装。

  </DocsTab>
</DocsTabs>

## 接入 TokenFlux

安装完成后，在 Cherry Studio 中添加 TokenFlux 作为自定义服务商。

1. 按 [创建 API Key 教程](/docs/tokenflux/create-apikey) 生成一个 API Key。
2. 打开 `Cherry Studio`，进入**设置 → 模型服务**，点击添加服务商。
3. 选择提供商类型： `OpenAI`。

   <div style="text-align: center;">
     <img src="/images/cherry-studio/provider-type-selection.png" alt="Cherry Studio 选择 OpenAI 提供商类型的界面" />
   </div>

4. 填入刚才生成的 API Key 和 API 地址 `https://tokenflux.dev`，点击获取模型列表，选择你需要的模型。

   <div style="text-align: center;">
     <img src="/images/cherry-studio/provider-config-fields.png" alt="Cherry Studio 填写 TokenFlux API Key 和 API 地址的界面" />
   </div>

5. 保存后，在模型列表中添加你需要使用的模型，例如 `gpt-5.4` 或 `gpt-5.4-mini`。
6. 回到对话界面，选择刚才添加的模型即可开始使用。

## 下一步该怎么做？

接入完成后，你可以直接在 `Cherry Studio` 中与 TokenFlux 支持的模型对话。

更多相关内容：

- [快速开始](/docs/quickstart)
- [余额与计费](/docs/tokenflux/billing)
