# Codex Fast Mode / 插件页面

这个页面不是让你手动照着命令一步步操作的教程，而是提供一份可以交给 AI 的 Skill。你可以把下面的 Skill 内容复制给 AI，让 AI 根据你的系统环境完成备份、patch、验证和回滚准备。

## 怎么用

1. 复制下方“Skill 内容”里的完整内容。
2. 发给你正在使用的 AI 助手。
3. 告诉 AI：我想开启 `Codex` 在 API Key 模式下的 `Fast / Speed Mode` 和插件页面，请按这个 Skill 操作。
4. 让 AI 先确认系统、`Codex` 安装路径和备份状态，再执行任何修改。

::: warning 注意
这仍然是本机 App patch。请让 AI 先备份，再操作；如果 `Codex` 更新后失效，需要让 AI 重新按 Skill 里的定位方法处理。
:::

## Skill 内容

````markdown
---
name: patch-codex-fast
description: Patch Codex App to enable Fast/Speed mode and Plugins when using API key mode (not OAuth login). Supports macOS and Windows. Includes backup, rollback, and auto-discovery for version updates.
---

# Patch Codex App - Enable Fast Mode & Plugins for API Mode

This skill patches the local Codex App to:
1. Enable Speed/Fast mode when using API key (not OAuth login)
2. Enable Plugins sidebar when using API key mode
3. Enable plugin installation and connector availability in API key mode

Supports **macOS** and **Windows**.

## Prerequisites

- Node.js (for npx)
- Python 3

## macOS

### Backup & Rollback (macOS)

**Always backup before patching.** If anything goes wrong, rollback immediately:

```bash
# === ROLLBACK (macOS) ===
cd /Applications/Codex.app/Contents/Resources
rm -rf app
[ -f app.asar1 ] && mv app.asar1 app.asar
[ -f app.asar.bak ] && cp app.asar.bak app.asar
codesign --force --deep --sign - /Applications/Codex.app
echo "Rolled back to original"
```

### Patch Steps (macOS)

```bash
# Kill Codex if running
pkill -x Codex 2>/dev/null; sleep 1

cd /Applications/Codex.app/Contents/Resources

# Backup original asar (only if not already backed up)
[ ! -f app.asar.bak ] && cp app.asar app.asar.bak && echo "Backed up app.asar -> app.asar.bak"

# Clean previous patch if exists
rm -rf app

# Step 1: Extract asar to app folder
npx @electron/asar e ./app.asar app

# Step 2: Rename asar (Electron will read app/ folder instead of app.asar)
mv ./app.asar ./app.asar1

# Step 3: Patch JS files
python3 << 'PYTHON'
import os, glob, re, sys

base = '/Applications/Codex.app/Contents/Resources/app/webview/assets'
patched_count = 0

# ============================================================
# Patch 1: Fast mode - auth bypass
# ============================================================
# Target: permissions-mode-helpers-*.js (hash in filename changes per version)
# Function L(e) checks: authMethod === 'chatgpt' && featureRequirements.fast_mode !== false
# We force it to return true so API mode also gets fast.
#
# How to find if filename changed:
#   grep -rl "authMethod" app/webview/assets/ | grep -v locale
#   Then look for the function containing "featureRequirements" + "fast_mode"
# ============================================================

FAST_AUTH_PATTERNS = [
    'return!(r?.authMethod!==\x60chatgpt\x60||i?.requirements?.featureRequirements?.fast_mode===!1)',
    'return!(r?.authMethod!==`chatgpt`||i?.requirements?.featureRequirements?.fast_mode===!1)',
]

# ============================================================
# Patch 2: Fast mode - model availability bypass
# ============================================================
# Target: same file (permissions-mode-helpers-*.js)
# Function z(e) checks: modelsByType.models.some(F) where F checks additionalSpeedTiers.includes("fast")
# Third-party relay /v1/models response doesn't include additionalSpeedTiers field -> always false
# We force it to true.
# ============================================================

FAST_MODELS_PATTERNS = [
    'l?.modelsByType.models.some(F)??!1',
    'l?.modelsByType.models.some(F)??false',
]

for f in glob.glob(os.path.join(base, 'permissions-mode-helpers-*.js')):
    with open(f, 'r') as fh:
        content = fh.read()
    original = content

    for pat in FAST_AUTH_PATTERNS:
        if pat in content:
            content = content.replace(pat, 'return true')
            print(f'[PATCHED] {os.path.basename(f)}: fast auth check -> return true')
            break
    else:
        if 'authMethod' in content and 'fast_mode' in content:
            print(f'[WARN] {os.path.basename(f)}: has authMethod+fast_mode but pattern changed. Manual fix needed.')
            idx = content.find('fast_mode')
            if idx >= 0:
                print(f'  Context: ...{content[max(0,idx-80):idx+80]}...')

    for pat in FAST_MODELS_PATTERNS:
        if pat in content:
            content = content.replace(pat, 'true')
            print(f'[PATCHED] {os.path.basename(f)}: models.some(F) -> true')
            break
    else:
        if 'modelsByType.models.some' in content:
            print(f'[WARN] {os.path.basename(f)}: has modelsByType.models.some but pattern changed.')
            idx = content.find('modelsByType.models.some')
            if idx >= 0:
                print(f'  Context: ...{content[max(0,idx-20):idx+80]}...')

    if content != original:
        with open(f, 'w') as fh:
            fh.write(content)
        patched_count += 1

# If permissions-mode-helpers not found, search all JS files
if patched_count == 0:
    print('[WARN] permissions-mode-helpers-*.js not found. Searching all JS files...')
    for f in glob.glob(os.path.join(base, '*.js')):
        with open(f, 'r') as fh:
            content = fh.read()
        if 'authMethod' in content and 'fast_mode' in content and 'modelsByType' in content:
            print(f'[FOUND] Fast mode logic likely in: {os.path.basename(f)}')
            break

# ============================================================
# Patch 3: Plugins sidebar - remove disabled gate for API mode
# ============================================================
# Target: index-*.js (main bundle)
# The sidebar shows "Please sign in with ChatGPT to use plugins" when D=true (API mode)
# We change D? to 0? so it always shows the enabled version.
# ============================================================

PLUGIN_PATTERNS = [
    ('D?(0,$.jsx)(Sl,{tooltipContent:(0,$.jsx)(Y,{id:\x60sidebarElectron.pluginsDisabledTooltip\x60', 'D?', '0?'),
]

for f in glob.glob(os.path.join(base, 'index-*.js')):
    with open(f, 'r') as fh:
        content = fh.read()
    original = content

    for full_pat, old_part, new_part in PLUGIN_PATTERNS:
        if full_pat in content:
            content = content.replace(full_pat, full_pat.replace(old_part, new_part, 1), 1)
            print(f'[PATCHED] {os.path.basename(f)}: plugins {old_part} -> {new_part} (always enabled)')
            break
    else:
        if 'pluginsDisabledTooltip' in content:
            idx = content.find('pluginsDisabledTooltip')
            before = content[max(0, idx-200):idx]
            import re
            m = re.search(r'([A-Z])\?\(0,\$\.jsx\)\(Sl,\{tooltipContent', before + content[idx:idx+100])
            if m:
                gate_var = m.group(1)
                old_str = f'{gate_var}?(0,$.jsx)(Sl,{{tooltipContent'
                new_str = f'0?(0,$.jsx)(Sl,{{tooltipContent'
                if old_str in content:
                    content = content.replace(old_str, new_str, 1)
                    print(f'[PATCHED] {os.path.basename(f)}: plugins {gate_var}? -> 0? (fuzzy match)')

    if content != original:
        with open(f, 'w') as fh:
            fh.write(content)
        patched_count += 1

# ============================================================
# Patch 4: Plugins - API key detection function
# ============================================================
# Target: gradient-*.js
# function e(e){return e===`apikey`} returns true when authMethod
# is 'apikey', which blocks plugin functionality.
# We force it to return false so API key mode is never flagged.
#
# How to find if filename changed:
#   grep -rl 'return e===.apikey.' app/webview/assets/ | grep gradient
# ============================================================

APIKEY_GATE_PATTERNS = [
    'function e(e){return e===`apikey`}',
    'function e(e){return e===\x60apikey\x60}',
]

for f in glob.glob(os.path.join(base, 'gradient-*.js')):
    with open(f, 'r') as fh:
        content = fh.read()
    original = content

    for pat in APIKEY_GATE_PATTERNS:
        if pat in content:
            content = content.replace(pat, 'function e(e){return false}')
            print(f'[PATCHED] {os.path.basename(f)}: apikey gate -> return false')
            break
    else:
        if 'apikey' in content:
            print(f'[WARN] {os.path.basename(f)}: has apikey ref but pattern changed.')

    if content != original:
        with open(f, 'w') as fh:
            fh.write(content)
        patched_count += 1

# If gradient-*.js not found, search all JS files
if not glob.glob(os.path.join(base, 'gradient-*.js')):
    for f in glob.glob(os.path.join(base, '*.js')):
        with open(f, 'r') as fh:
            c = fh.read()
        for pat in APIKEY_GATE_PATTERNS:
            if pat in c:
                print(f'[FOUND] apikey gate in: {os.path.basename(f)}')
                break

# ============================================================
# Patch 5: Plugins - connector availability check
# ============================================================
# Target: use-plugin-install-flow-*.js
# When in API key mode, connector availability check marks all
# connectors as "connector-unavailable", preventing plugin install.
# We prefix the assignment with false&& so it never triggers.
#
# How to find if filename changed:
#   grep -rl 'connector-unavailable' app/webview/assets/ | grep plugin
# ============================================================

CONNECTOR_PATTERNS = [
    ('(i=`connector-unavailable`)', 'false&&(i=`connector-unavailable`)'),
    ('(i=\x60connector-unavailable\x60)', 'false&&(i=\x60connector-unavailable\x60)'),
]

for f in glob.glob(os.path.join(base, 'use-plugin-install-flow-*.js')):
    with open(f, 'r') as fh:
        content = fh.read()
    original = content

    for old_pat, new_pat in CONNECTOR_PATTERNS:
        if old_pat in content and 'false&&' + old_pat not in content:
            idx = content.find(old_pat)
            before = content[max(0,idx-20):idx]
            if 'false&&' not in before:
                content = content.replace(old_pat, new_pat, 1)
                print(f'[PATCHED] {os.path.basename(f)}: connector gate -> false&&(...)')
                break

    if content != original:
        with open(f, 'w') as fh:
            fh.write(content)
        patched_count += 1

if patched_count == 0:
    print('[ERROR] No patches applied! Patterns may have changed in this Codex version.')
    print('  Check webview/assets/ for files containing:')
    print('    - "authMethod" + "fast_mode" (fast mode gate)')
    print('    - "pluginsDisabledTooltip" (plugins gate)')
    print('    - "apikey" in gradient-*.js (apikey detection)')
    print('    - "connector-unavailable" in use-plugin-install-flow-*.js')
    sys.exit(1)
else:
    print(f'\nAll {patched_count} patch(es) applied successfully.')
PYTHON

# Step 4: Disable Electron fuses
npx @electron/fuses write --app /Applications/Codex.app OnlyLoadAppFromAsar=off
npx @electron/fuses write --app /Applications/Codex.app EnableEmbeddedAsarIntegrityValidation=off
npx @electron/fuses write --app /Applications/Codex.app GrantFileProtocolExtraPrivileges=off
npx @electron/fuses write --app /Applications/Codex.app EnableCookieEncryption=off

# Step 5: Re-sign (macOS requires valid signature to launch)
codesign --force --deep --sign - /Applications/Codex.app

echo ""
echo "=== Patch Complete (macOS) ==="
echo "  Fast/Speed mode: enabled for API key mode"
echo "  Plugins sidebar: enabled for API key mode"
echo ""
echo "Open Codex.app to verify. If it crashes, run rollback:"
echo "  cd /Applications/Codex.app/Contents/Resources && rm -rf app && mv app.asar1 app.asar && codesign --force --deep --sign - /Applications/Codex.app"
```

---

## Windows

### Backup & Rollback (Windows)

```powershell
# === ROLLBACK (Windows) ===
cd "$env:LOCALAPPDATA\Programs\Codex\resources"
Remove-Item -Recurse -Force app -ErrorAction SilentlyContinue
if (Test-Path app.asar1) { Rename-Item app.asar1 app.asar }
if (Test-Path app.asar.bak) { Copy-Item app.asar.bak app.asar }
Write-Host "Rolled back to original"
```

### Patch Steps (Windows)

```powershell
# Kill Codex if running
Stop-Process -Name "Codex" -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

cd "$env:LOCALAPPDATA\Programs\Codex\resources"

# Backup original asar
if (-not (Test-Path app.asar.bak)) {
    Copy-Item app.asar app.asar.bak
    Write-Host "Backed up app.asar -> app.asar.bak"
}

# Clean previous patch
Remove-Item -Recurse -Force app -ErrorAction SilentlyContinue

# Step 1: Extract asar
npx @electron/asar e ./app.asar app

# Step 2: Rename asar (Electron reads app/ folder instead)
Rename-Item app.asar app.asar1

# Step 3: Patch JS files
python3 -c @"
import os, glob, re, sys

base = os.path.join(os.environ['LOCALAPPDATA'], 'Programs', 'Codex', 'resources', 'app', 'webview', 'assets')
patched_count = 0

FAST_AUTH_PATTERNS = [
    'return!(r?.authMethod!==\x60chatgpt\x60||i?.requirements?.featureRequirements?.fast_mode===!1)',
    'return!(r?.authMethod!==`chatgpt`||i?.requirements?.featureRequirements?.fast_mode===!1)',
]

FAST_MODELS_PATTERNS = [
    'l?.modelsByType.models.some(F)??!1',
    'l?.modelsByType.models.some(F)??false',
]

for f in glob.glob(os.path.join(base, 'permissions-mode-helpers-*.js')):
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    original = content

    for pat in FAST_AUTH_PATTERNS:
        if pat in content:
            content = content.replace(pat, 'return true')
            print(f'[PATCHED] {os.path.basename(f)}: fast auth check -> return true')
            break
    else:
        if 'authMethod' in content and 'fast_mode' in content:
            print(f'[WARN] {os.path.basename(f)}: pattern changed. Manual fix needed.')

    for pat in FAST_MODELS_PATTERNS:
        if pat in content:
            content = content.replace(pat, 'true')
            print(f'[PATCHED] {os.path.basename(f)}: models.some(F) -> true')
            break

    if content != original:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(content)
        patched_count += 1

if patched_count == 0:
    print('[WARN] permissions-mode-helpers not found, searching all JS...')
    for f in glob.glob(os.path.join(base, '*.js')):
        with open(f, 'r', encoding='utf-8') as fh:
            content = fh.read()
        if 'authMethod' in content and 'fast_mode' in content:
            print(f'[FOUND] {os.path.basename(f)}')
            break

for f in glob.glob(os.path.join(base, 'index-*.js')):
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    original = content
    if 'pluginsDisabledTooltip' in content:
        idx = content.find('pluginsDisabledTooltip')
        before = content[max(0, idx-200):idx+100]
        m = re.search(r'([A-Z])\?\(0,\$\.jsx\)\(Sl,\{tooltipContent', before)
        if m:
            gate = m.group(1)
            old_s = f'{gate}?(0,$.jsx)(Sl,{{tooltipContent'
            new_s = f'0?(0,$.jsx)(Sl,{{tooltipContent'
            if old_s in content:
                content = content.replace(old_s, new_s, 1)
                print(f'[PATCHED] {os.path.basename(f)}: plugins {gate}? -> 0?')
    if content != original:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(content)
        patched_count += 1

APIKEY_GATE_PATTERNS = [
    'function e(e){return e===`apikey`}',
    'function e(e){return e===\x60apikey\x60}',
]

for f in glob.glob(os.path.join(base, 'gradient-*.js')):
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    original = content
    for pat in APIKEY_GATE_PATTERNS:
        if pat in content:
            content = content.replace(pat, 'function e(e){return false}')
            print(f'[PATCHED] {os.path.basename(f)}: apikey gate -> return false')
            break
    if content != original:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(content)
        patched_count += 1

CONNECTOR_PATTERNS = [
    ('(i=`connector-unavailable`)', 'false&&(i=`connector-unavailable`)'),
    ('(i=\x60connector-unavailable\x60)', 'false&&(i=\x60connector-unavailable\x60)'),
]

for f in glob.glob(os.path.join(base, 'use-plugin-install-flow-*.js')):
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    original = content
    for old_pat, new_pat in CONNECTOR_PATTERNS:
        if old_pat in content and 'false&&' + old_pat not in content:
            idx = content.find(old_pat)
            before = content[max(0,idx-20):idx]
            if 'false&&' not in before:
                content = content.replace(old_pat, new_pat, 1)
                print(f'[PATCHED] {os.path.basename(f)}: connector gate -> false&&(...)')
                break
    if content != original:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(content)
        patched_count += 1

print(f'\nDone. {patched_count} patch(es) applied.')
"@

# Step 4: Disable Electron fuses
$codexExe = "$env:LOCALAPPDATA\Programs\Codex\Codex.exe"
npx @electron/fuses write --app $codexExe OnlyLoadAppFromAsar=off
npx @electron/fuses write --app $codexExe EnableEmbeddedAsarIntegrityValidation=off
npx @electron/fuses write --app $codexExe GrantFileProtocolExtraPrivileges=off
npx @electron/fuses write --app $codexExe EnableCookieEncryption=off

# Step 5: No codesign needed on Windows
Write-Host ""
Write-Host "=== Patch Complete (Windows) ==="
Write-Host "  Fast/Speed mode: enabled for API key mode"
Write-Host "  Plugins sidebar: enabled for API key mode"
Write-Host ""
Write-Host "Open Codex to verify."
```

---

## When Codex Updates (Patterns Change)

Codex updates change JS filenames (hash suffix) and may refactor variable names. Here's how to find the new targets:

### Fast Mode Gate

```bash
cd <resources>/app/webview/assets

# Find which file has the fast mode auth check
grep -rl "authMethod" *.js | xargs grep -l "fast_mode"
# -> This is your target file (was permissions-mode-helpers-*.js)

# Find the exact function to patch (returns false for non-chatgpt auth)
grep -o ".{0,50}authMethod.{0,100}fast_mode.{0,80}" <target_file>
# -> Change the return value to: return true
```

### Fast Mode Model Check

```bash
# In the same file, find the model availability check
grep -o ".{0,30}modelsByType.models.some.{0,50}" <target_file>
# -> Replace the whole expression with: true
```

### Plugins Sidebar Gate

```bash
# Find which file has the plugins disabled tooltip
grep -rl "pluginsDisabledTooltip" *.js
# -> This is your target file (was index-*.js)

# Find the gate variable (single uppercase letter before the ternary)
grep -o ".{0,5}pluginsDisabledTooltip" <target_file>
# -> Change X?(...) to 0?(...) where X is the gate variable
```

### Plugins API Key Detection

```bash
# Find which file has the apikey auth check
grep -rl 'return e===.apikey.' *.js | grep -v locale
# -> Target file (was gradient-*.js)

# Find the function
grep -o 'function e(e){return e===.apikey.}' <target_file>
# -> Change to: function e(e){return false}
```

### Plugins Connector Availability

```bash
# Find which file has the connector-unavailable gate
grep -rl "connector-unavailable" *.js | grep plugin
# -> Target file (was use-plugin-install-flow-*.js)

# Find the assignment
grep -o '.{0,10}connector-unavailable.{0,10}' <target_file>
# -> Prefix with false&& so it never triggers: false&&(i=`connector-unavailable`)
```

## How It Works

| What | Why | Where |
|------|-----|-------|
| `OnlyLoadAppFromAsar=off` | Let Electron read `app/` folder instead of `app.asar` | Electron fuse in binary |
| `EnableEmbeddedAsarIntegrityValidation=off` | Skip SHA hash check on asar contents | Electron fuse in binary |
| `GrantFileProtocolExtraPrivileges=off` | Disable file protocol restrictions | Electron fuse in binary |
| `EnableCookieEncryption=off` | Disable cookie encryption check | Electron fuse in binary |
| `mv app.asar app.asar1` | Electron falls back to `app/` folder when asar not found | Resources directory |
| Auth check -> `return true` | Codex only shows fast for `authMethod=chatgpt` (OAuth), bypass it | `permissions-mode-helpers-*.js` |
| `models.some(F)` -> `true` | Relay `/v1/models` lacks `additionalSpeedTiers` field, so check always fails | Same file |
| Plugin gate `X?` -> `0?` | Sidebar disables "Plugins" link when not OAuth, bypass it | `index-*.js` |
| Apikey gate -> `return false` | `function e(e){return e===\`apikey\`}` blocks plugins for API key mode, disable it | `gradient-*.js` |
| Connector gate -> `false&&(...)` | Connector availability check marks all as unavailable in API mode, skip it | `use-plugin-install-flow-*.js` |
| `codesign --force --deep --sign -` | macOS won't launch unsigned modified apps (Windows skips this) | Final step (macOS only) |

````
