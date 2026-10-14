---
verifiedAt: '2026-10-14'
verifiedWith: 'Android 16；RikkaHub 2.5.6；OpenAI 提供商配置、模型列表、gpt-6-astra 对话、gpt-image-2 单张生图。'
---

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
   名称: TokenFlux
   提供商类型: OpenAI
   Base URL: https://tokenflux.dev/v1
   API Key: TokenFlux API Key
   API Path: /chat/completions
   ```

   > **注意：** Base URL 必须以 `/v1` 结尾。RikkaHub 会在此基础上自动拼接 `/chat/completions` 等路径，请勿在末尾重复添加。上述配置使用默认的 Chat Completions 方式。

5. 添加后，点开该提供商，切换到底部的**模型**页。点击“添加新模型”**左侧的方块图标**打开可用模型列表，再点目标模型右侧的“+”加入。右侧的“添加新模型”按钮用于手动填写模型 ID。
6. 返回聊天页，点击输入框左下角的模型按钮，在 `TokenFlux` 提供商下选择刚添加的模型。

## 验证接入

获取模型列表也需要 API Key。先确认 Key 已填写并保存，再按第 5 步拉取列表。

列表加载成功后，在聊天页发送 `只回复 OK`。收到回复后，在 [使用记录](https://tokenflux.dev/usage) 中确认请求来自刚添加的提供商与模型。

列表为空或加载失败时，检查 Key、所属分组和 Base URL，再按 [单独测试 Key 和端点](/docs/troubleshooting#单独测试-key-和端点) 排除客户端因素。

## 后续操作

完成配置后，即可在 `RikkaHub` 中直接发起模型对话。

## 使用生图

> 前提：API Key 所属分组包含目标生图模型，并已按上方步骤导入模型。分组选择见 [生图用哪个分组](/docs/faq#生图用哪个分组)。

1. 进入**设置 → 提供商 → 对应提供商 → 模型**，点开生图模型，将**模型类型（Model Type）**改为**图像（Image）**，点击确认。

   <div style="text-align: center;">
     <img src="/images/rikkahub/step-1-edit-model-type.png" alt="RikkaHub 将生图模型类型设置为图像的界面" />
   </div>

2. 返回首页，展开左侧**侧边栏**，打开底部的**菜单**，再选择**生图**。
3. 点击生图页左下角的模型按钮，选择对应提供商下的图像模型。

   <div style="text-align: center;">
     <img src="/images/rikkahub/step-3-select-model.png" alt="RikkaHub 生图页面选择模型的界面" />
   </div>

4. 在模型按钮旁的设置中确认数量和尺寸，填写提示词后点击生成。尺寸选项是客户端的通用列表，实际应选择模型支持的值。

例如，使用 `ChatGPT Image` 分组的 `gpt-image-2` 时，可将数量设为 1、尺寸设为 `1024x1024`。生成费用可在 [使用记录](https://tokenflux.dev/usage) 中查看。

## 更多相关内容

- [余额与计费](/docs/tokenflux/billing)
