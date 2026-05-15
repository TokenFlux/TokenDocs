# Codex++

::: danger 警告
请不要使用 GPT 系列模型执行以下操作。
:::

`Codex++` 是面向 Codex App 的外部增强启动器，通过 Chromium DevTools Protocol 注入增强脚本，**不修改 Codex 原始安装文件**。

项目地址：[https://github.com/BigPizzaV3/CodexPlusPlus](https://github.com/BigPizzaV3/CodexPlusPlus)

## 功能亮点

- **顶部 Codex++ 菜单**：集中管理增强功能。
- **插件入口解锁**：API Key 模式下显示并启用插件入口。
- **特殊插件强制安装**：解除 App unavailable / 应用不可用导致的前端安装禁用。
- **会话删除**：悬停显示删除按钮，删除前确认并支持撤销。
- **Markdown 导出**：按本地 rollout 导出带时间戳的会话 Markdown。
- **会话项目移动**：把会话移动到普通对话或其他本地项目。
- **对话 Timeline**：右侧显示用户提问时间线，悬停摘要，点击跳转。
- **Provider 同步**：切换 model_provider 或供应商时不丢历史会话。
- **Windows 快捷方式、卸载项**，可选 watcher 自动接管。
- **macOS /Applications/Codex++.app 生成**。

## 如何配置

你可以将项目地址直接交给 Agent 自动配置，也可以手动操作。

### 交给 Agent

将以下项目链接交给你的 AI Agent，并告诉它 “请你按这个项目的说明帮我安装并配置 Codex++”：

```
https://github.com/BigPizzaV3/CodexPlusPlus
```

Agent 会自动拉取项目并执行安装步骤。

### 手动配置

**Windows**

双击项目根目录的 `setup.bat`，选择：

```
[1] Install Codex++
```

安装后双击桌面 `Codex++.lnk` 启动。

命令行安装/启动：

```bash
python -m pip install -e .
python -m codex_session_delete setup
python -m codex_session_delete launch
```

**macOS**

```bash
python -m pip install -e .
python -m codex_session_delete setup
```

安装后会生成 `/Applications/Codex++.app`。

## 工作方式

1. 外部启动 Codex App，并附加 CDP 参数：
   - `--remote-debugging-port=9229`
   - `--remote-allow-origins=http://127.0.0.1:9229`
2. 启动本地 helper 服务，用于健康检查、设置、导出、移动、删除等操作。
3. 通过 CDP 注入 `renderer-inject.js`。
4. 渲染端通过 CDP bridge 调用本地服务。
5. 启动时继承现有代理环境变量；若未设置，会自动探测常见本地代理端口。

这种方式**不会修改 Codex 的 app.asar**，也不需要往 Codex 安装目录写 DLL。

## 常用命令

```bash
# 安装依赖
python -m pip install -e .

# 启动
python -m codex_session_delete launch

# 安装快捷方式 / app bundle
python -m codex_session_delete setup

# 卸载
python -m codex_session_delete remove

# 检查更新
python -m codex_session_delete check-update
```

## 相关内容

- [Codex 使用指南](/docs/agents/codex)
- [CC-Switch](/docs/agents/cc-switch)
