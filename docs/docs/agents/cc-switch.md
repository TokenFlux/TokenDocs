---
verifiedAt: '2026-08-22'
---

# CC-Switch

`CC-Switch` 是一款专为管理 AI 接口配置而设计的图形化工具，可统一管理多个 Agent 客户端的供应商配置与 API Key，支持 `Claude Code`、`Codex`、`OpenCode` 等主流 AI 编程助手。

## 安装说明

<DocsTabs default-tab="windows">
  <DocsTab title="Windows" name="windows">

1. 访问 [Releases 页面](https://github.com/farion1231/cc-switch/releases/latest)，下载适用于 Windows 的安装包（推荐 `.msi` 格式）。

    <div style="text-align: center;">
      <img src="/images/cc-switch/windows-installer-selection.png" alt="如何在 Releases 页面选择适合 Windows 的安装包" />
    </div>

2. 下载完成后，双击安装包。
3. 按照安装向导的提示完成安装。
4. 安装完成后，可以在开始菜单中找到并启动 `CC-Switch`。

  </DocsTab>

  <DocsTab title="macOS" name="macos">

建议使用 Homebrew 进行安装：

```bash
brew tap farion1231/ccswitch
brew install --cask cc-switch
```

安装完成后，可以从“应用程序”或启动台找到并运行 `CC-Switch`。

  </DocsTab>

  <DocsTab title="Linux" name="linux">

1. 前往 [发布页面](https://github.com/farion1231/cc-switch/releases/latest)。
2. 找到适合操作系统架构的 AppImage 文件（例如 `CC-Switch-v3.13.0-Linux-x86_64.AppImage`）。

   <div style="text-align: center;">
     <img src="/images/cc-switch/linux-installer-selection.png" alt="如何在 Releases 页面选择适合 Linux 的 AppImage 文件" />
   </div>

3. 下载完成后，赋予文件可执行权限：

   ```bash
   chmod +x CC-Switch-v3.13.0-Linux-x86_64.AppImage
   ```

4. 双击运行文件，或在终端中启动：

   ```bash
   ./CC-Switch-v3.13.0-Linux-x86_64.AppImage
   ```

   图形界面环境下也可右键点击文件，在属性中启用“作为可执行程序”权限。

  </DocsTab>
</DocsTabs>

## 配置统一供应商

1. 按照 [创建 API Key 教程](/docs/tokenflux/create-apikey) ，获取一个新的 API Key。
2. 打开 `CC-Switch`，点击右上角的“添加”按钮，选择“添加统一供应商”。
3. 在弹出的配置窗口中填写字段：

   ```text
   供应商名: tokenflux
   API 地址: https://tokenflux.dev
   API Key: TokenFlux API Key
   ```

   <div style="text-align: center;">
     <img src="/images/cc-switch/manual-provider-fields.png" alt="CC-Switch 手动填写统一供应商字段示意图" />
   </div>

4. 保存配置，`CC-Switch` 会自动为所有相关的 Agent 启用该供应商。

## Claude Max 环境变量

::: warning
`Claude Max` 分组只接受 `Claude Code` 客户端，无法在 Claude 应用（Claude app）中使用。
:::

若通过 `CC-Switch` 管理 Claude Code，可以把 `ENABLE_PROMPT_CACHING_1H` 写进 Claude 供应商的 JSON 配置。`CC-Switch` 在启用供应商时会把该配置写入 Claude Code 的 `settings.json`。

该变量用于开启 1 小时 prompt cache，适合重复携带较长上下文的 Claude Code 会话。其他 Claude 分组无需设置。

### 应用专属供应商

1. 在 `CC-Switch` 顶部切换到 `Claude Code`。
2. 找到 TokenFlux 对应的 Claude 供应商卡片，点击“编辑”。
3. 在“配置 JSON”里的 `env` 中追加：

```json
{
  "env": {
    "ENABLE_PROMPT_CACHING_1H": "1"
  }
}
```

### 统一供应商

统一供应商的基础表单只填写 `名称`、`API Key`、`API 地址` 和模型配置，没有单独的环境变量字段。使用统一供应商时：

1. 先按上方流程创建并同步统一供应商。
2. 回到 `Claude Code` 应用下，编辑同步生成的 Claude 供应商。
3. 在该供应商的 JSON `env` 中追加 `"ENABLE_PROMPT_CACHING_1H": "1"`。
4. 保存后启用该 Claude 供应商。

## 相关指南

- [Claude Code 使用指南](/docs/agents/claude-code)
- [Codex 使用指南](/docs/agents/codex)
- [OpenCode 使用指南](/docs/agents/opencode)
