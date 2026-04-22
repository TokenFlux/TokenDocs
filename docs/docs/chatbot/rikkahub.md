# RikkaHub 使用指南

`RikkaHub` 是一款 Android AI 聊天客户端，支持接入多种 OpenAI 兼容接口，适合在手机上进行日常 AI 对话。

## 安装

RikkaHub 目前仅支持 Android，**不支持 iOS**。

你可以通过以下任一方式安装：

- 前往 [RikkaHub 官网下载页](https://rikka-ai.com/download) 下载 APK 安装包，手动安装到设备。
- 在 Google Play 搜索 `RikkaHub` 并安装。

## 接入 TokenFlux

RikkaHub 支持以 OpenAI 兼容方式接入 TokenFlux。

1. 按 [创建 API Key 教程](/docs/tokenflux/create-apikey) 生成一个 API Key。
2. 打开 `RikkaHub`，点击左侧**侧边栏**，进入**设置**。
3. 选择**提供商**，点击添加新提供商，类型选择 `OpenAI`。
4. 填入以下配置：

   ```text
   提供商类型: OpenAI
   Base URL: https://tokenflux.dev/v1
   API Key: 你的 TokenFlux API Key
   ```

   > **注意：** Base URL 必须以 `/v1` 结尾。RikkaHub 会在此基础上自动拼接 `/chat/completions` 等路径，请勿在末尾重复添加。

5. 保存后，等待模型列表刷新，点击添加模型**左侧**的图标，选择你需要使用的模型。
6. 返回主页，选择刚才添加的模型即可开始对话。

## 下一步该怎么做？

接入完成后，你可以直接在 `RikkaHub` 中与 TokenFlux 支持的模型对话。

更多相关内容：

- [余额与计费](/docs/tokenflux/billing)
