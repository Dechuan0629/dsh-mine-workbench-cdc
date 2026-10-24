# 交接提示词：继续修复 DSH·Mine Workbench（macOS）

> 这是一份给下一个 AI 的完整交接文档。你不需要旧会话；按本文的路径、命令、诊断树和验收标准继续。
>
> 项目：DSH·Mine 私享工作台（DSH 插件 bundle）  
> 仓库：https://github.com/Dechuan0629/dsh-mine-workbench-cdc  
> 当前版本：**1.1.2**  
> 1.1.2 代码 commit：`4ac76efd667ba7384821daad57806f8eb14aee28`  
> 当前 `main`：最新文档提交（包含本 HANDOFF 与 README 链接，以 `git log` 为准）  
> 当前 tag：`v1.1.2`（annotated tag object `75087ca3f7ab146ffc272fca8db1b71c0a4199b4`，指向 `4ac76ef`）  
> 最后更新：2026-10-24

---

## 0. 给接手 AI 的启动指令

你现在接手一个已经发布到 GitHub 的 DSH 插件项目。用户的 MacBook 上仍然存在一个**未解决的 UI 问题**：

- 收起侧边栏后，M 图标仍是「白底玻璃方块 + 右上蓝点」，字体/形状不对；
- 页面背景仍是纯白/纯黑，没有黑白灰渐变；
- 用户已经卸载旧版、安装新版，插件管理器显示 **1.1.1**，但视觉没有任何变化。

**最重要的事实：插件管理器显示的版本号是磁盘上的包版本，不等于当前页面已经加载的新 Client bundle。** DSH 不会热替换已运行的 Client。上一次交接时判断用户很可能仍在运行旧 1.1.0 Client；1.1.2 已针对此问题增加运行时构建标记和 macOS 原生回退，但**尚未在 Mac 上得到用户确认**。

你的任务不是再重复“请重启”，而是：

1. 先让用户确认当前页面到底加载了哪个 Client（Console 标记 / 蓝点 / 版本）；
2. 如果仍是旧 Client，彻底清理旧 bundle 并 `Cmd+Q` 完全退出；
3. 如果已经是 1.1.2 但 UI 仍错，按第 7 节的诊断树定位是「Mark 没进 slot」「CSS 被覆盖」「Mac 原生壳不透明」还是「pane 不存在」；
4. 修复后推送 GitHub，并让用户在 Mac 上截图验收。

不要假设 Windows 上的效果等于 macOS；不要只改 CSS 就宣布完成。

---

## 1. 用户目标与背景

用户原始目标（m04166，保持原意）：

> 现在帮我将这个个人专属工作台插件，完整转换为一个可以安装到别的 dsh 的插件（我的目标 dsh 是我的 macbook 电脑，如果有必要，你也可以自行进行一些优化），最后上传至我的 github 仓库。

项目已经完成：

- 从本地 `@local/dsh-mine-workbench` 改名为公开包 `dsh-mine-workbench`；
- 版本 1.1.0 首次发布，1.1.1 修复 Mac 部分问题，1.1.2 继续修 Mac；
- GitHub 仓库 `Dechuan0629/dsh-mine-workbench-cdc` 已创建并推送；
- 包含完整 README、LICENSE、图标、截图、Agent 预设；
- 在 Windows 开发机上安装、构建、视觉验收通过。

用户最近一次明确反馈（m04555）：

> 我确认已经重装了，卸载了旧版，安装新版，并且显示版本1.1.1，但是问题一点没有得到修复

之后已推送 1.1.2，但用户尚未确认 1.1.2 的效果。

---

## 2. 仓库与发布状态

```text
仓库：https://github.com/Dechuan0629/dsh-mine-workbench-cdc
分支：main
1.1.2 代码 commit：4ac76efd667ba7384821daad57806f8eb14aee28
当前 main：最新文档提交（HANDOFF + README 链接，以 `git log` 为准）
最近提交（代码）：
  4ac76ef docs: explain stale mac client and full quit
  3c1c2f3 fix: make mac M native and canvas independent of wheel runtime
tag：v1.1.2 -> 4ac76ef
```

精确加载发布代码：

```bash
git clone https://github.com/Dechuan0629/dsh-mine-workbench-cdc.git
cd dsh-mine-workbench-cdc
git checkout v1.1.2
git rev-parse HEAD
# 应为 4ac76efd667ba7384821daad57806f8eb14aee28
```

如果要读取本交接文档的最新版本，使用 `main`：

```bash
git checkout main
git pull --ff-only
# or
curl -L https://raw.githubusercontent.com/Dechuan0629/dsh-mine-workbench-cdc/main/HANDOFF.md
```

若只是更新已有目录：

```bash
cd dsh-mine-workbench-cdc
git fetch --tags
git checkout main
git pull --ff-only
git rev-parse HEAD
```

关键文件可直接从 GitHub 读取：

- `package.json`
- `client.js`
- `cordis.patch.yml`
- `README.md`
- `HANDOFF.md`（本文件）

当前 `package.json` 关键字段：

```json
{
  "name": "dsh-mine-workbench",
  "version": "1.1.2",
  "private": false,
  "license": "MIT",
  "type": "module",
  "main": "index.js",
  "icon": "icon.svg"
}
```

`dsh.bundle.patch` 指向 `./cordis.patch.yml`；`dsh.client.platform = "web"`，并声明了一组 `inject` 包。不要为了“减少依赖”随意删 `inject`，除非已确认目标 DSH 版本可解析。

---

## 3. 当前未解决的问题（最重要）

### 现象

在 MacBook 上，收起侧边栏后：

- 左侧中部的 M 仍是**白色圆角方块**，内含不理想的 M 字形；
- M 右上角有**蓝色小圆点**；
- 整个工作区是**纯白**（light）或**纯黑**（dark），没有黑白灰渐变；
- 用户重装 1.1.1 后无变化。

### 目前最强的解释

**运行中的页面仍是旧 Client（1.1.0）**：

- 1.1.0 的 Mark 有蓝点、玻璃底；
- 1.1.1 把蓝点改灰，1.1.2 完全删除蓝点和玻璃底；
- 1.1.0 没有全局渐变 CSS；1.1.1/1.1.2 才有。

插件管理器显示 1.1.1，只说明 profile 的包版本变了；页面 boot graph 仍可能指向旧 revision。DSH 在更新 Client bundle 后，**必须完全退出 App 再启动**，刷新旧页面甚至会 404。

### 不能忽略的替代解释

1. 旧 `@local/dsh-mine-workbench` 仍安装/启用，和新 bundle 同时注册，旧 Mark 赢得 slot；
2. Mac collapsed 时原生 sidebar 隐藏，`document.querySelector('[data-pane="sidebar"]')` 拿不到，轮盘 `sync()` 走 fallback；
3. Mac 原生壳有一层不透明背景，`body` 渐变被盖住；
4. 我们的 `sidebar.brand.mark` 被另一个插件（Kb / task-board / dsh-market）遮蔽；
5. 1.1.2 的 CSS 选择器与实际 Mac DOM 属性不一致。

**不要在没有 Console/DOM 证据前断定是哪一个。**

---

## 4. 1.1.2 已经做了什么

### 4.1 Mark 改为纯几何填充字形

`client.js` 的 `Mark` 组件现在只输出一个 SVG path：

```js
function Mark({ size = 24, className }) {
  return h('svg', {
    className: ['mw-mark', className].filter(Boolean).join(' '),
    width: size,
    height: size,
    viewBox: '0 0 64 64',
    fill: 'none',
    'aria-hidden': 'true',
    focusable: 'false',
  }, h('path', {
    key: 'm',
    d: 'M16 46V18h7l9 11.5L41 18h7v28h-6.2V29.4L32 41.6 22.2 29.4V46Z',
    fill: 'currentColor',
    shapeRendering: 'geometricPrecision',
  }));
}
```

- 无 `<circle>` 蓝点；
- 无渐变玻璃 `<rect>`；
- 不再使用 `React.useId`；
- 不再是描边路径，避免 Mac 上 stroke 缩放导致的“字体错乱”。

### 4.2 macOS 原生壳回退

在 `client.js` 的 CSS 末尾（约 2945 行起）增加了不依赖 `data-mine-sidebar` 的规则：

```css
html[data-platform="darwin"] body,
html[data-platform="darwin"] #root {
  background-color: #f2f2f4 !important;
  background-image:
    radial-gradient(...),
    radial-gradient(...),
    linear-gradient(145deg, #fafafa 0%, #f0f0f2 46%, #e6e6e9 100%) !important;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
}
html[data-platform="darwin"][data-dsh-theme="dark"] body,
html[data-platform="darwin"][data-dsh-theme="dark"] #root {
  /* 深色 graphite 渐变 */
}
html[data-platform="darwin"] #root > div,
html[data-platform="darwin"] body > div {
  background-color: transparent !important;
}
```

同时直接给 Mac 原生展开按钮套用玻璃皮肤：

```css
html[data-platform="darwin"] button[aria-label*="边栏"]:not([data-mw-drag-handle]),
html[data-platform="darwin"] button[aria-label*="sidebar" i]:not([data-mw-drag-handle]) {
  background: linear-gradient(145deg, rgba(255,255,255,.96), rgba(235,235,240,.84)) !important;
  border: 1px solid rgba(255,255,255,.72) !important;
  border-radius: 15px !important;
  color: #1d1d1f !important;
  box-shadow: ... !important;
}
```

并隐藏该按钮内的 badge：

```css
html[data-platform="darwin"] button[aria-label*="边栏"]:not([data-mw-drag-handle]) [class*="badge"] { display: none !important; }
```

### 4.3 运行时构建标记

`apply(ctx)` 启动时：

```js
document.documentElement.dataset.mwBuild = '1.1.2';
console.info('[DSH·Mine] client build 1.1.2');
```

如果 Console 没有这行，**100% 是旧 Client 或模块没加载**，不要继续调 CSS。

---

## 5. 项目结构

```text
dsh-mine-workbench-cdc/
├─ package.json          # dsh.bundle.patch / dsh.client / exports / files
├─ cordis.patch.yml      # 插入 Host 行 + Agent preset
├─ index.js              # Host 半侧，空实现（Client 负责 UI）
├─ client.js             # 全部 UI：品牌、侧栏、轮盘、CSS、设置、命令面板
├─ locale/zh.json
├─ locale/en.json
├─ icon.svg
├─ README.md
├─ HANDOFF.md            # 本文件
├─ LICENSE
├─ .gitignore
├─ .gitattributes
└─ docs/
   ├─ workbench-light.png
   ├─ sidebar-wheel-final.png
   ├─ sidebar-wheel-idle.png
   └─ ...
```

### 关键标识

- package：`dsh-mine-workbench`
- Client module id：`dsh-mine-workbench`
- 侧栏 panel id：`mine-workbench`
- 主面板 key：`mine-workbench`
- Agent preset id：`mine-workbench`
- preset 显示名：`DSH·Mine 私享`
- localStorage：`dshMineWorkbench.prefs.v1`、`dshMineWorkbench.wheelPos.v1`、`dshMineWorkbench.focus.v1`

### 关键代码位置（行号会随编辑移动，用 grep 定位）

- `Mark`：`function Mark(` 附近
- 侧栏 CSS：`/* ── Sidebar: macOS surface ── */`
- 背景：`html[data-mine-sidebar="on"] body`
- Mac 回退：`Native macOS shell fallback`
- 轮盘：`installWheelSidebar(ctx, actions)`
- 状态同步：`const sync = () =>`
- 入口：`function apply(ctx)`
- 构建标记：`client build 1.1.2`

### 主要 UI 能力

- macOS 黑白灰玻璃侧栏，展开态保留原生全部菜单；
- 收起只显示 M，悬停展开轮盘，移出收回；
- 轮盘内 5 个面板 + 新建会话，图标下常显文字；
- 中央 M 可拖动，rAF + transform，位置持久化/边缘吸附；
- 动作坞：新对话、最近会话、打开项目、命令搜索、主题、25 分钟专注；
- 命令搜索面板（⌘/Ctrl+K 可从轮盘打开）；
- 今日 Tokens / 消费指标，任务状态 badge；
- 专属设置 section；
- `DSH·Mine 私享` Agent 预设。

---

## 6. 安装 / 升级（Mac）

### 6.1 获取代码

```bash
git clone https://github.com/Dechuan0629/dsh-mine-workbench-cdc.git
cd dsh-mine-workbench-cdc
git checkout v1.1.2
```

### 6.2 清理旧 bundle（关键）

在 DSH 的插件管理器里检查所有含 `mine-workbench` 的条目：

- `dsh-mine-workbench`
- `@local/dsh-mine-workbench`（旧名字，必须删除）
- 如果旧 bundle 仍启用，先删除或禁用。

不要同时启用旧 `@local/dsh-mine-workbench` 和新 `dsh-mine-workbench`。两者都会注册 `sidebar.brand.mark`，旧头像可能赢。

### 6.3 安装新 bundle

在 DSH 插件管理器里选择“从本地目录安装”，目录指向仓库根目录（含 `package.json`）。

或者让 DSH Agent 调用等价工具：

```text
plugin_manager install_bundle target="/Users/<you>/dsh-mine-workbench-cdc"
```

安装后应显示：

- bundle：`dsh-mine-workbench`
- version：`1.1.2`

### 6.4 完全退出再打开

macOS 上：

1. `Cmd+Q` 退出 DSH；
2. 确认 Dock 和菜单栏没有残留进程；
3. 重新打开 DSH。

**不要只按 Cmd+R 刷新旧页面。** 旧 boot graph 可能让页面 404，或者继续运行旧 Client。

### 6.5 验证构建

打开 DevTools Console（`Cmd+Option+I`），搜索：

```text
[DSH·Mine] client build 1.1.2
```

并检查：

```js
document.documentElement.dataset.mwBuild
// "1.1.2"
document.documentElement.dataset.mineSidebar
// "on"
document.documentElement.dataset.mineSidebarCollapsed
// "true"（收起时）
document.documentElement.dataset.mwWheelOpen
// "false"（默认收起时）
```

如果 `mwBuild` 不是 `1.1.2`，不要再研究 M/CSS；先解决 **旧 Client / 旧 bundle / 未完全重启**。

---

## 7. 诊断树：如果 1.1.2 仍然不对

### 情况 A：Console 没有 `[DSH·Mine] client build 1.1.2`

优先级最高。说明当前页面没有加载 1.1.2。

依次检查：

1. 插件列表是否仍有旧 `@local/dsh-mine-workbench`；
2. 插件管理器显示的 `dsh-mine-workbench` 版本是否真是 1.1.2；
3. 是否只重载窗口，没有 `Cmd+Q`；
4. 在 DSH 插件列表里把 `dsh-mine-workbench` 也删除，重新安装；
5. 再完全退出、重开。

如果仍然没有标记，收集：

- 插件列表全部 `mine-workbench` 条目截图；
- `~/.dsh` / profile 下的 bundle 列表；
- 启动日志中 web boot / client module 相关错误。

### 情况 B：Console 有标记，但 M 仍是白底方块 + 蓝点

这说明 1.1.2 Client 已加载，但 **M 不是我们的 `Mark`**，或 CSS 被覆盖。

检查 slot 占用：

```text
cordis_inspect_query
platform: client
provider: Slots
method: listSubTree
input: { "root": "sidebar.brand.mark" }
```

看 occupant 是否包含 `dsh-mine-workbench`，是否被别的插件遮蔽。

检查 DOM：

```js
// 在 Console 执行
document.querySelectorAll('.mw-mark').length
document.querySelector('button[aria-label*="边栏"]')?.outerHTML.slice(0, 500)
document.querySelector('[data-pane="sidebar"]')?.outerHTML.slice(0, 500)
```

如果 `.mw-mark` 存在但 M 仍不对，检查：

```js
getComputedStyle(document.querySelector('.mw-mark path')).fill
getComputedStyle(document.querySelector('.mw-mark')).color
```

如果 `.mw-mark` 不存在，说明我们的 Mark 没进 slot；需要检查其他插件或 slot 优先级。

**注意**：Mac collapsed 的原生 toggle 是 `button[aria-label="打开侧边栏"]`，内部可能有原生 `sidebar.toggle.badge`。1.1.2 已尝试隐藏 badge；若蓝点是另一个兄弟节点，按实际 DOM 精确隐藏，不要无差别隐藏所有 badge。

### 情况 C：Console 有标记，M 正确，但背景仍是纯白/纯黑

说明 Mark 已生效，问题在画布层。

在 Console 检查：

```js
getComputedStyle(document.body).backgroundImage
getComputedStyle(document.documentElement).backgroundImage
getComputedStyle(document.querySelector('#root')).backgroundColor
```

然后从 `#root` 开始逐层检查祖先/直接子元素的 `background-color` / `background-image`，找出不透明层：

```js
let el = document.querySelector('#root');
while (el && el !== document.documentElement) {
  const cs = getComputedStyle(el);
  console.log(el.tagName, el.className, cs.backgroundColor, cs.backgroundImage);
  el = el.parentElement;
}
```

以及向下检查：

```js
document.querySelector('#root')?.children[0]?.outerHTML.slice(0, 300)
```

如果找到不透明 wrapper，优先**精确**加规则：

```css
html[data-platform="darwin"] <实际选择器> {
  background-color: transparent !important;
}
```

不要用 `#root * { background: transparent }` 这种会破坏卡片/弹层的规则。

如果 `#root` 不存在，检查实际 shell 根节点（`[data-dsh-shell]`、`[data-dsh-app]`、`.dsh-app` 等），把渐变画到真正的全屏容器上。

### 情况 D：Console 有标记，背景正确，但轮盘/拖动不工作

Mac 原生 sidebar 收起时可能没有 `[data-pane="sidebar"]`，`sync()` 会设置 `data-mine-sidebar=on` 但 `collapsed=false`，导致轮盘 CSS 不生效。

检查：

```js
document.querySelector('[data-pane="sidebar"]')
document.querySelector('button[aria-label*="边栏"]')
document.documentElement.dataset.mineSidebarCollapsed
```

如果 pane 不存在：

- 可以选择用原生 toggle 作为 M 的锚点，而不是依赖 `[data-pane]`；
- 但这是较大改动，先确保背景/M 静态样式修好，再做交互；
- 不要在 Mac 没有验证的情况下重构整个 `installWheelSidebar`。

### 情况 E：M 位置/颜色正确，但字体仍“错乱”

1.1.2 已改为填充 path，不再依赖字体。如果仍然错乱：

- 确认 `.mw-mark path` 的 `d` 是 1.1.2 的 `M16 46V18...`；
- 检查是否有旧 CSS `stroke` 规则叠加；
- 检查 SVG 是否被外部 `transform: scale()` 拉伸；
- 在 Console 中读取 `document.querySelector('.mw-mark')?.outerHTML`，确认不是旧 DOM。

---

## 8. 验收标准

在 Mac 上，只有以下全部通过才算完成：

- [ ] 插件管理器显示 `dsh-mine-workbench` **1.1.2**；
- [ ] 插件列表没有 `@local/dsh-mine-workbench`；
- [ ] Console 有 `[DSH·Mine] client build 1.1.2`；
- [ ] 收起 M 是干净的石墨色实心 M，**无白底方块、无蓝点、无字体错乱**；
- [ ] light 模式页面是黑白灰渐变，不是纯白；
- [ ] dark 模式页面是黑灰渐变，不是纯黑；
- [ ] 悬停 M 展开轮盘，移出收起；
- [ ] 拖动 M 流畅，无白条/白框/Tooltip 残影；
- [ ] 指标卡与动作坞不重叠；
- [ ] 命令搜索、light/dark、专注可用；
- [ ] 展开侧栏后菜单/品牌/设置正常；
- [ ] 没有 boot 404 / `web boot: 1 entry did not activate`。

Windows 回归（可选但建议）：

- `node --check client.js`;
- `plugin_manager install_bundle` 成功；
- 折叠 M、轮盘、拖动、背景正常。

---

## 9. 代码与发布约束

1. **不要手改 DSH profile 的 `package.json` / `cordis.patch.yml`**；用 `plugin_manager`。
2. 包名保持 `dsh-mine-workbench`；不要改回 `@local/...`。
3. 不要提交 `node_modules`、日志、`.DS_Store`、token、私钥。
4. 修改 `client.js` 后至少：
   ```bash
   node --check client.js
   node --check index.js
   ```
5. 修改 `cordis.patch.yml` 后验证 YAML；`!!js` 是 DSH loader 支持的，普通 `yaml` 包不认，别误判。
6. UI 文案中文优先；代码注释用英文；README 中文。
7. 每次发布更新 `package.json` `version`、README 版本记录、tag。
8. Git 提交后推送：
   ```bash
   git add -A
   git commit -m "fix: ..."
   git push origin main
   git tag -a v1.1.x -m "v1.1.x"
   git push origin v1.1.x
   ```
9. 不要在没有 Mac 验收前宣称“已修复”；可以写“已推送，待 Mac 验收”。
10. 不要把 GitHub token 写进仓库或对话；使用本机 git credential 或让用户授权。

---

## 10. 关键文件内容索引

### `package.json`

- `name`: `dsh-mine-workbench`
- `version`: `1.1.2`
- `private`: `false`
- `license`: `MIT`
- `type`: `module`
- `main`: `index.js`
- `dsh.bundle.patch`: `./cordis.patch.yml`
- `dsh.client.platform`: `web`
- `dsh.client.immediately`: `true`
- `files` 包含 `client.js`、`cordis.patch.yml`、`locale/*.json`、`icon.svg`、`README.md`、`LICENSE`

### `cordis.patch.yml`

插入两层：

```yaml
- id: mine-workbench
  name: 'dsh-mine-workbench'
- id: preset-mine-workbench
  name: '@deepseek-ai/dsh-agent-preset'
  config:
    id: mine-workbench
    name: 'DSH·Mine 私享'
    order: 5
    plugins:
      # persona / tools / plan / compaction / delegation / web / present ...
```

不要删除平台条件行：

```yaml
tool-bash disabled: !!js process.platform === 'win32'
tool-pwsh disabled: !!js process.platform !== 'win32'
```

### `index.js`

Host 半侧是空实现，仅用于 plugin_manager 识别 bundle；UI 全部在 `client.js`。不要误以为 Host 空实现代表插件没安装。

### `client.js`

入口：

```js
window.__ModuleLoader__.load({
  id: 'dsh-mine-workbench',
  factory(require) {
    const React = require('react');
    ...
    return { inject: [...], apply };
  }
});
```

`apply(ctx)` 做：

- locale 注册；
- 注入 `<style data-mine-workbench-style>`；
- 定义 actions；
- `ctx.effect(() => installWheelSidebar(ctx, actions), ...)`；
- 注册 `sidebar.brand.mark` / `sidebar.brand.name` / `conversation.hero.brand.mark` / `sidebar.panellist` / `main` / `settings.section`。

---

## 11. 已知历史坑

1. **boot 404**：修改/重装 Client 后刷新旧页面，会请求已失效的 `client.js?rev=...`，弹 “web boot: 1 entry did not activate”。解决：完整退出 App，不刷新旧页。
2. **版本号 ≠ 运行时**：插件管理器版本只代表磁盘包；页面可能仍加载旧 boot graph。
3. **旧 `@local` 残留**：会和新 bundle 同时注册 slot，导致旧 Mark/旧 CSS 胜出。
4. **Windows 与 macOS 结构不同**：Windows 收起时 sidebar 还在，Mac 可能整个隐藏；不要只用 `[data-pane="sidebar"]` 判断。
5. **Mac 原生壳不透明**：仅设置 `body` 背景可能被 `#root` 或更深层 wrapper 盖住。
6. **原生 badge**：Mac 原生 `sidebar.toggle.badge` 可能产生蓝点，不一定是我们的 Mark 圆点。
7. **Tooltip**：原生 Tooltip 是 portal，只删 `title` 不够；1.1.2 仍有 CSS 抑制，但 Mac 需要实际验证。
8. **代理**：该环境曾出现 `127.0.0.1:7890` 代理时通时断；git push 失败时可尝试直连或重试，不要改仓库内容。

---

## 12. 交接后的第一批动作（按顺序）

1. `git clone` / `git pull`，确认 HEAD `4ac76ef`。
2. 阅读 `package.json`、`cordis.patch.yml`、`client.js` 的 `Mark` / Mac fallback / `apply`。
3. 让用户在 Mac 上安装 1.1.2，并 **Cmd+Q 完全退出**。
4. 让用户提供：
   - M 的截图（重点看蓝点/白底）；
   - Console 中 `[DSH·Mine] client build ...`；
   - 插件列表中所有 `mine-workbench` 条目。
5. 如果标记是 1.1.2 但视觉仍错，按第 7 节 B/C/D 分支收集 DOM/计算样式，不要盲改。
6. 修复后：
   ```bash
   node --check client.js
   git add -A
   git commit -m "fix: ..."
   git push origin main
   git tag -a v1.1.3 -m "v1.1.3"
   git push origin v1.1.3
   ```
7. 在 Mac 上重新安装、完全重启、截图验收；通过后再向用户宣布完成。

---

## 13. 给用户的最短沟通模板

> 你的截图说明当前页面仍在运行旧 Client（1.1.1/1.1.2 已经移除蓝点，但截图蓝点还在）。插件管理器的版本号不等于页面已加载的 Client。请先删除旧 `@local/dsh-mine-workbench`，安装 1.1.2，然后 **Cmd+Q 完全退出 DSH 再打开**。打开 Console 应看到 `[DSH·Mine] client build 1.1.2`；如果仍看不到，请把插件列表和 Console 截图发我。

---

## 14. 相关链接

- GitHub：https://github.com/Dechuan0629/dsh-mine-workbench-cdc
- 当前版本文件：https://github.com/Dechuan0629/dsh-mine-workbench-cdc/blob/main/package.json
- 当前 Client：https://github.com/Dechuan0629/dsh-mine-workbench-cdc/blob/main/client.js
- 当前预设：https://github.com/Dechuan0629/dsh-mine-workbench-cdc/blob/main/cordis.patch.yml
- 安装说明：https://github.com/Dechuan0629/dsh-mine-workbench-cdc/blob/main/README.md
