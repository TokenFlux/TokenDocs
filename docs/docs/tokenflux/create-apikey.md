# 创建 API Key

使用 TokenFlux 前，需要先创建一个 API Key。

**直接前往创建页面：[https://tokenflux.dev/keys](https://tokenflux.dev/keys)**

## 创建步骤

1. 登录后进入 [API 密钥页面](https://tokenflux.dev/keys)。
2. 点击右上角的 `创建密钥` 按钮。
3. 输入一个便于识别的名称（例如：`cherry-studio`、`cc-switch`）。
4. 按下方 [分组选择](#分组选择) 确认模型、协议和客户端限制，再选择分组。下拉里会显示每个分组的倍率和当前容量。
5. 点击创建，复制生成的密钥并妥善保存（后续也可在密钥列表中随时查看或复制）。

<div style="text-align: center;">
  <img src="/images/create-apikey/create-dialog.png" alt="TokenFlux 创建密钥弹窗，填写名称并展开分组下拉，可见各分组的倍率和容量" />
</div>

## 分组选择

在 [模型广场](https://tokenflux.dev/models) 找到目标模型，逐项确认：

| 检查项     | 选择依据                                                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 模型       | 分组包含要调用的完整模型 ID                                                                                                                |
| 协议       | 分组支持客户端使用的接口；按 [客户端教程](/docs/quickstart#客户端选型) 和 [API 端点](/docs/tokenflux/endpoints) 确认，不能只凭模型厂商判断 |
| 客户端限制 | 分组说明允许当前客户端使用；限定客户端的分组不适用于其他工具                                                                               |
| 价格与容量 | 查看该分组的最终单价、倍率和当前容量，价格计算见 [计费说明](/docs/tokenflux/billing)                                                       |

普通 Key 绑定一个分组。需要多个分组时，可分别创建 Key，或使用 [复合 Key](/docs/tokenflux/composite-key) 并按前缀选择模型。订阅套餐名称不等于分组名称。

## 密钥安全

为不同客户端分别创建 Key，便于识别和停用。不要将 Key 提交到代码仓库、放在公开网页前端或发送给他人。发生泄露时，立即在密钥页面禁用旧 Key，创建替代 Key 并更新客户端配置。

## 接入客户端

- [API 端点](/docs/tokenflux/endpoints) — 客户端要填的 API 地址
- [快速开始](/docs/quickstart) — 根据使用习惯选择接入方式
- [Cherry Studio 使用指南](/docs/chatbot/cherry-studio) — 桌面端 AI 对话客户端
- [RikkaHub 使用指南](/docs/chatbot/rikkahub) — Android 端 AI 对话客户端
- [CC-Switch 使用指南](/docs/agents/cc-switch) — 管理 Claude Code / Codex 的配置工具
