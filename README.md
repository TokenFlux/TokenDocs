# TokenDocs

TokenFlux 相关文档站，基于 VitePress。

当前内容包含：

- 快速开始
- TokenFlux 账号与计费说明
- Claude Code、Codex、OpenCode、CC-Switch 使用指南
- FAQ

## 开发

安装依赖：

```bash
pnpm install
```

启动本地文档站：

```bash
pnpm docs:dev
```

运行测试：

```bash
pnpm test
```

构建文档：

```bash
pnpm docs:build
```

## 目录

- `docs/`: VitePress 站点源码
- `docs/docs/`: 主要文档内容
- `docs/.vitepress/`: 站点配置与主题扩展
- `tests/`: 基础校验测试

## 入口

- 首页：`docs/index.md`
- 快速开始：`docs/docs/quickstart.md`
