# Codex++

::: danger Warning
Do not use GPT-series models to perform the following operations.
:::

`Codex++` is an external launcher for Codex App that injects enhancement scripts through the Chromium DevTools Protocol, **without modifying Codex's original installation files**.

Project repository: [https://github.com/BigPizzaV3/CodexPlusPlus](https://github.com/BigPizzaV3/CodexPlusPlus)

## Features

- **Codex++ top menu**: Central management for enhancement features.
- **Plugin entry unlock**: Display and enable plugin entry in API key mode.
- **Force install plugins**: Remove the frontend installation block caused by App unavailable.
- **Session delete**: Hover to reveal a delete button, with confirmation and undo support.
- **Markdown export**: Export session Markdown with timestamps from local rollout.
- **Session move**: Move sessions to regular conversations or other local projects.
- **Conversation Timeline**: Show user-query timeline on the right, with hover summary and click to jump.
- **Provider sync**: Preserve historical sessions when switching model_provider or provider.
- **Windows shortcuts, uninstall entry**, optional watcher for automatic takeover.
- **macOS /Applications/Codex++.app generation**.

## How to Set Up

You can hand the project URL to your Agent for automatic configuration, or set it up manually.

### Hand to Agent

Give the following project link to your AI Agent and tell it to install and configure Codex++ according to the project's instructions:

```text
https://github.com/BigPizzaV3/CodexPlusPlus
```

The Agent will clone the project and run the installation steps automatically.

### Manual Setup

**Windows**

Double-click `setup.bat` in the project root directory and choose:

```text
[1] Install Codex++
```

After installation, double-click the `Codex++.lnk` shortcut on your desktop to launch.

Command-line install/launch:

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

After installation, `/Applications/Codex++.app` will be generated.

## How It Works

1. Launch Codex App externally with CDP arguments:
   - `--remote-debugging-port=9229`
   - `--remote-allow-origins=http://127.0.0.1:9229`
2. Start a local helper service for health checks, settings, export, move, delete, and other operations.
3. Inject `renderer-inject.js` through CDP.
4. The renderer calls the local service through the CDP bridge.
5. Inherit existing proxy environment variables at startup; if none are set, it automatically detects common local proxy ports.

This approach **does not modify Codex's app.asar** and does not write DLLs into the Codex installation directory.

## Common Commands

```bash
# Install dependencies
python -m pip install -e .

# Launch
python -m codex_session_delete launch

# Install shortcut / app bundle
python -m codex_session_delete setup

# Uninstall
python -m codex_session_delete remove

# Check for updates
python -m codex_session_delete check-update
```

## Related Content

- [Codex Guide](/en/docs/agents/codex)
- [CC-Switch](/en/docs/agents/cc-switch)
