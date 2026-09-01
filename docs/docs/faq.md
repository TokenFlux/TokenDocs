# FAQ

请求失败或客户端连不上，见 [排障](/docs/troubleshooting)。分组、号池、推理积分等术语见 [核心概念](/docs/concepts)。

## 有企业级接入需求，怎么联系？

企业对接群已开放。有企业级接入、API 对接或渠道合作需求，可以加入 QQ 群 `794504445` 交流。

## 为什么模型检测网站显示造假率很高？

模型检测网站和榜单并不完全可靠，部分存在买榜、样本偏差或检测方式不透明的问题。从 OpenRouter 等聚合平台调用的模型，也经常被这类工具误判为“假模型”。

检测结果只能作为参考，不宜作为判断模型真假的唯一依据。

## 生图用哪个分组？

生图模型在 `Google Image` 分组下，目前包含 `gemini-3.1-flash-image` 和 `nano-banana-pro`。创建 API Key 时选择该分组，完整列表和倍率以 [模型广场](https://tokenflux.dev/models) 为准。

分组未开放生图时，请求会返回 403 `Image generation is not enabled for this group`，见 [错误码](/docs/errors#分组能力限制)。

## 生图有哪些方式？

- **网页端创作台**：直接访问 [TokenFlux 创作台](https://tokenflux.dev/creative)，无需配置 API 或下载客户端，输入提示词即可在线生成图片。
- **Android 手机端**：[RikkaHub](/docs/chatbot/rikkahub) 有独立的生图入口，配置步骤见该页的「使用生图」一节。
- **桌面端**：[Cherry Studio](/docs/chatbot/cherry-studio) 接入后，在模型列表中选择生图模型，在对话界面发送提示词。
