---
verifiedAt: '2026-09-05'
---

# Pi 使用指南

`Pi` 是一款可扩展的终端编程 Agent。它支持通过覆盖内置 provider 的方式接入 `TokenFlux` 的 OpenAI 兼容接口。

## 安装

根据使用习惯选择官方安装方式。

<DocsTabs default-tab="npm">
  <DocsTab title="npm 安装" name="npm">

全局安装 `Pi`：

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

  </DocsTab>

  <DocsTab title="脚本安装" name="script">

**macOS / Linux**

```bash
curl -fsSL https://pi.dev/install.sh | sh
```

  </DocsTab>
</DocsTabs>

安装完成后，在终端运行以下命令验证安装：

```bash
pi --version
```

输出版本号即表示安装成功。

## 接入 TokenFlux

### 1. 创建 API Key

按 [创建 API Key 教程](/docs/tokenflux/create-apikey) 创建一张 API Key，选择支持 OpenAI 格式的分组。

::: tip 模型可用性
本教程以 `gpt-5.6-terra` 为例。完整可用模型列表请以 [模型广场](https://tokenflux.dev/models) 和所选 Key 分组实际支持的模型为准。
:::

### 2. 配置 models.json

Pi 支持通过全局模型配置文件覆盖内置 provider。

全局配置路径：

- macOS / Linux：`~/.pi/agent/models.json`
- Windows：`%USERPROFILE%\.pi\agent\models.json`

创建并编辑该文件，写入以下配置：

```json
{
  "providers": {
    "openai": {
      "baseUrl": "https://tokenflux.dev/v1"
    }
  }
}
```

若 `models.json` 已存在，将 `openai` 配置合并到现有 `providers` 下即可，不要覆盖其他 provider。

### 3. 登录并保存 API Key

启动 Pi 并使用内置 `/login` 命令保存凭据：

1. 在终端运行 `pi` 进入交互模式。
2. 输入 `/login` 并按回车。
3. 在 provider 列表中选择 **OpenAI**。
4. 粘贴复制的 TokenFlux API Key。

Pi 会把凭据保存至 `~/.pi/agent/auth.json`（Windows 为 `%USERPROFILE%\.pi\agent\auth.json`），无需将 API Key 写入 `models.json`，也不需要手动编辑 `auth.json`。此处保存的凭据会对应 `models.json` 中覆盖的 `openai` Base URL。

## 启动与选择模型

### 检查模型目录

运行以下命令检查 Pi 中匹配的模型：

```bash
pi --list-models gpt-5.6-terra
```

### 交互启动

指定 provider 和模型启动交互会话：

```bash
pi --provider openai --model gpt-5.6-terra
```

启动 Pi 之后，也可以在交互界面中通过 `/model` 命令或快捷键 `Ctrl+L` 切换模型。

## 最小验证

使用以下最小命令验证调用：

```bash
pi --provider openai --model gpt-5.6-terra --no-session --no-tools -p "只回复 OK"
```

::: warning 真实调用与扣费说明
该验证命令会向 TokenFlux 发起真实模型调用并产生计费。收到模型的 `OK` 回复即表示接入成功。
:::

## 常见问题与注意事项

### 看到模型列表不代表分组一定支持

Pi 内置模型目录可能显示当前 TokenFlux 分组不支持的模型。在模型列表中看到模型只说明客户端配置已成功加载，实际能否使用必须以最小调用是否成功为准。

### 费用与扣费核算

Pi 底部 footer 显示的内置 OpenAI 成本元数据基于官方预设费率，不代表 TokenFlux 最终价格。实际扣费和用量请以 [TokenFlux 模型广场](https://tokenflux.dev/models) 和控制台使用记录为准。

### 更新模型目录

如需同步 Pi 内置的模型定义，可运行：

```bash
pi update --models
```

## 相关入口

- [创建 API Key](/docs/tokenflux/create-apikey) — 选择分组并生成密钥
- [API 端点](/docs/tokenflux/endpoints) — 地址与协议格式
- [排障](/docs/troubleshooting) — 按症状定位问题
- [Pi 官方项目 (GitHub)](https://github.com/earendil-works/pi-mono) — 源码与官方文档
- [Pi 官网](https://pi.dev) — 官方主页
