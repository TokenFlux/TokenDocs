# tf-cli

`tf-cli` 提供命令 `tf`，用于保存 TokenFlux API Key、选择模型并启动 Claude Code、Codex、OpenCode 和 Pi。它不是独立的聊天客户端；模型对话仍由被启动的客户端完成。

需要在终端管理多个 API Key，或希望保留客户端原有的全局配置时，可以使用 `tf`。偏好图形界面管理供应商配置时，见 [CC-Switch](/docs/agents/cc-switch)。

## 安装

选择一种安装方式即可。

<DocsTabs default-tab="npm">
  <DocsTab title="npm" name="npm">

需要 Node.js 18 或更高版本：

```bash
npm install -g @tokenflux/tf
```

官方 npm 包名是 **`@tokenflux/tf`**，不要安装无 scope 的 `tf` 或 `tf-cli`，它们是无关项目。平台二进制通过可选依赖分发，安装时不要使用 `--omit=optional` 或 `--no-optional`。

  </DocsTab>
  <DocsTab title="macOS / Linux" name="unix">

```bash
curl -fsSL https://raw.githubusercontent.com/tokenflux/tf-cli/main/install.sh | sh
```

默认安装到 `~/.local/bin/tf`，无需管理员权限。脚本不修改系统 PATH；若终端找不到 `tf`，按安装提示添加该目录，或在当前会话执行：

```bash
export PATH="$HOME/.local/bin:$PATH"
```

  </DocsTab>
  <DocsTab title="Windows" name="windows">

在 PowerShell 5.1 或 PowerShell 7 中执行：

```powershell
irm https://raw.githubusercontent.com/tokenflux/tf-cli/main/install.ps1 | iex
```

默认安装到 `%USERPROFILE%\.local\bin\tf.exe`，无需管理员权限。按安装提示将目录加入 PATH；脚本安装本身不需要 Git Bash。

Windows 原生交互需要 tf-cli 0.9.0 或更高版本，建议使用 Windows Terminal。启动通过 npm / pnpm 安装的客户端时，仍需让 Git Bash 位于 PATH 中。

  </DocsTab>
</DocsTabs>

安装后检查命令是否可用：

```bash
tf version
tf --help
```

## 导入 TokenFlux API Key

先按 [创建 API Key](/docs/tokenflux/create-apikey) 准备密钥，确认分组允许目标客户端及其协议，账户有可用推理额度。

```bash
tf login
```

1. 选择「从网页导入」，再选择默认 TokenFlux 网关。
2. 在终端自动打开的 Keys 页面中选择要导入的 Key 并完成操作。
3. 返回终端，核对来源、网关、分组及脱敏 Key，确认后保存。
4. 未指定本地名称时，按提示选择自动命名、网页 Key 名称或自定义名称。

**不要分享终端打开的完整网页链接**，其中包含本次导入会话的验证信息。若页面或终端显示会话未验证，请取消操作并重新打开 `tf login` 生成的链接。网页请求到达不代表已保存，仍需在终端确认。

浏览器无法自动打开时，可改为使用隐藏输入：

```bash
tf login --with-key
```

按提示选择 TokenFlux 网关并粘贴 API Key。不要把真实 Key 作为命令行参数传入。

需要固定本地名称时，例如保存为 `work`：

```bash
tf login work
```

`work` 是本机别名，不是平台分组名。已有同名但不同的 Key 时会要求确认覆盖，默认取消。

## 启动客户端

按所用客户端运行一条命令：

| 客户端                                  | 启动命令      |
| --------------------------------------- | ------------- |
| [Claude Code](/docs/agents/claude-code) | `tf claude`   |
| [Codex](/docs/agents/codex)             | `tf codex`    |
| [OpenCode](/docs/agents/opencode)       | `tf opencode` |
| [Pi](/docs/agents/pi)                   | `tf pi`       |

首次启动时，按提示选择 Key、主模型和所需的辅助模型；完成后，默认绑定与模型设置会保存在 `tf` 自己的配置中。对应客户端未安装时，交互模式会提供安装选项，确认后才安装。

进入客户端后，新建对话并发送「只回复 OK」。**这会发起真实模型调用并产生费用。** 收到文本回复后，到 [使用记录](https://tokenflux.dev/usage) 核对 Key、模型与扣费。仅凭安装成功、导入成功或能列出模型，还不能证明推理可用。

## 临时切换与默认模型

### 只影响本次启动

```bash
tf claude -m
tf codex -k work
tf codex -e high
```

`-m` 不带值时打开模型选择器；`-k work` 指定本地保存的 Key；`-e high` 设置本次思考强度，具体支持情况取决于模型和客户端。这些参数不修改已保存的默认绑定和槽位。

底层客户端参数放在 `--` 后面，例如继续 Claude Code 会话：

```bash
tf claude -- --resume
```

`tf codex --help` 查看 Codex 自身帮助；查看 `tf` 的包装参数要用 `tf --help codex`。

### 修改以后启动使用的模型

查看 Codex 的模型分配，或打开编辑器：

```bash
tf model codex
tf model codex --edit
```

模型槽是客户端中不同任务使用的模型位置：

| 客户端      | 模型槽                                                |
| ----------- | ----------------------------------------------------- |
| Claude Code | `default` 主对话、`fast` 后台任务、`heavy` 高算力档位 |
| Codex       | `default` 主对话、`review` 审查                       |
| OpenCode    | `default` 主模型、`small` 轻量任务                    |
| Pi          | `default` 主对话                                      |

也可直接设置槽位。将 `MODEL_ID` 替换为当前 Key 支持的完整模型 ID；[复合 Key](/docs/tokenflux/composite-key) 保留分组前缀：

```bash
tf model codex --set default=MODEL_ID
```

切换 Key 会影响已选模型的可用性；编辑器会在清空受影响槽位前列出变更并要求确认。

## 配置边界与凭据存储

`tf` 通过子进程环境与启动参数注入网关配置，不改写客户端的全局配置文件。直接运行 `codex`、`claude` 等命令，不会使用 `tf` 的绑定。客户端自身仍可能保存会话或设置，`tf` 不为它提供沙箱。

执行 `tf config` 查看配置与凭据路径。默认配置目录为 `~/.tf`，设置 XDG 路径时以实际输出为准。API Key 以明文保存在 `credentials.json`：Unix 使用 `0600` 权限，Windows 使用访问控制列表；这不是静态加密，不要公开或同步该文件。

本地存在其他配置工具写入的设置时，先运行 `tf status` 查看冲突提示。例如 `~/.claude/settings.json` 中的 `env` 可覆盖进程注入，应先备份并检查被提示的字段，不要直接删除整个配置文件。

## 查错与移除 Key

```bash
tf status
tf keys
tf keys --refresh
```

`tf status` 查看已保存账户的用量、模型绑定和环境冲突；`tf keys` 查看本地 Key 及其适用客户端。分组或模型发生变化时，用 `tf keys --refresh` 刷新目录和协议探测结果。

候选模型被隐藏时，查看终端给出的协议或客户端限制说明。`tf` 不会绕过分组限制；应切换到允许目标客户端的分组，而不只是修改 Base URL。实际请求报错见 [排障](/docs/troubleshooting)。

删除本机保存的 `work` Key：

```bash
tf logout work
```

该操作不会撤销 TokenFlux 平台上的 Key。若发生泄露，仍需在 [API 密钥页面](https://tokenflux.dev/keys) 禁用该 Key。

## 更新与卸载

npm 安装使用 npm 更新：

```bash
npm install -g @tokenflux/tf@latest
```

不再使用时卸载 npm 包：

```bash
npm uninstall -g @tokenflux/tf
```

独立二进制安装可使用 `tf update --check` 检查更新、`tf update` 升级。脚本安装的卸载方式见 [项目 README](https://github.com/tokenflux/tf-cli#readme)；默认卸载保留本地凭据和配置，清理前请确认是否仍需使用。

## 相关入口

- [tf-cli 项目与发行版](https://github.com/tokenflux/tf-cli/releases)
- [凭据安全说明](https://github.com/tokenflux/tf-cli/blob/main/SECURITY.md)
- [报告 tf-cli 问题](https://github.com/tokenflux/tf-cli/issues)
