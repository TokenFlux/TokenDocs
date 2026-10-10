---
verifiedAt: '2026-08-22'
---

# Codex++

`Codex++` 是面向 Codex App 的外部启动器与管理工具，提供供应商切换、会话管理和界面增强。它通过 Chromium DevTools Protocol（CDP）与本地辅助服务工作，不修改官方应用的 `app.asar`。

项目地址：[BigPizzaV3/CodexPlusPlus](https://github.com/BigPizzaV3/CodexPlusPlus)。以下步骤适用于当前 1.7 系列发布包。

## 安装

先按 [Codex 使用指南](/docs/agents/codex) 安装官方 Codex App，再从 [Codex++ 发布页](https://github.com/BigPizzaV3/CodexPlusPlus/releases/latest) 下载对应安装包。

<DocsTabs default-tab="windows">
  <DocsTab title="Windows" name="windows">

1. 下载文件名以 `windows-x64-setup.exe` 结尾的安装程序；需要便携版时选择 `windows-x64.zip`。
2. 运行安装程序，或将便携包解压到固定目录。
3. 打开 **Codex++ 管理工具**，检查检测到的 Codex App 路径。

  </DocsTab>

  <DocsTab title="macOS" name="macos">

1. 下载文件名以 `macos-universal.dmg` 结尾的安装包，适用于 Apple Silicon 和 Intel Mac。
2. 打开 DMG，按安装包提示完成安装。
3. 打开 **Codex++ 管理工具**，检查检测到的 Codex App 路径。

  </DocsTab>
</DocsTabs>

## 接入 TokenFlux

1. 按 [创建 API Key 教程](/docs/tokenflux/create-apikey) 获取 Key。
2. 在 **Codex++ 管理工具**中配置供应商，选择**纯 API**模式，并填写：

   | 字段     | 值                                      |
   | -------- | --------------------------------------- |
   | Base URL | `https://tokenflux.dev/v1`              |
   | API Key  | TokenFlux API Key                       |
   | 协议     | Responses                               |
   | 模型     | `gpt-6-astra`，或所选分组支持的其他模型 |

3. 保存供应商与模型配置，按需开启增强功能。
4. 从 **Codex++** 入口启动 Codex App，加载已保存的配置。

已有官方登录状态且需要保留相关入口时，也可以选择**官方登录 + API**模式；该模式的模型请求仍走配置的 API。各模式的区别见 [项目说明](https://github.com/BigPizzaV3/CodexPlusPlus#供应商与模型)。

## 使用与更新

- **Codex++ 管理工具**：配置供应商、模型和增强功能，查看运行状态与诊断信息。
- **Codex++**：启动官方桌面应用并加载已保存的供应商与增强配置。
- 修改依赖注入脚本的增强设置后，保存并重启 Codex++。
- 在管理工具的**关于**页面检查更新。

## 排障

启动后没有增强菜单时，确认使用的是 **Codex++** 启动入口，并在管理工具的**安装维护**或**关于**页面检查应用路径和日志。

切换供应商后请求失败时，可在供应商详情中运行模型测试或 **Provider Doctor**，检查协议、API 地址、Key 和模型是否匹配。模型测试会发起真实请求并可能产生费用。

Codex++ 的部分增强功能依赖官方应用的界面和本地数据格式。官方应用更新后若出现兼容问题，请检查 Codex++ 的 [版本说明](https://github.com/BigPizzaV3/CodexPlusPlus/releases)。

## 相关内容

- [Codex 使用指南](/docs/agents/codex)
- [CC-Switch](/docs/agents/cc-switch)
