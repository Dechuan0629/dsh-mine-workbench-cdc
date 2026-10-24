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

### 1A. 这个插件最初为什么开发、它到底在做什么

> 这一节是后来补写的“开发史”。如果只读故障排查章节，很容易把本项目误解成“一个修不好的侧栏皮肤”；实际上它是从个人工作台需求长出来的一整套 DSH 界面改造。

#### 1A.1 起点：把 DSH 变成“自己的”工作台

这个项目不是先有“插件”再有需求，而是反过来的。

用户日常在 DSH 里工作，但不满足于默认的聊天壳：希望打开 DSH 时先看到一个**属于自己的工作台**，而不是一个通用聊天窗口。最初的目标可以概括为四句话：

1. **有品牌感**：替换默认品牌标识，做出“DSH·Mine / 私享工作台”的识别度；
2. **有驾驶舱**：首页能继续最近会话、进入工作区、看到今日 Tokens/消费、任务统计和快捷入口；
3. **有 macOS 质感**：黑白灰、液态玻璃、克制的分隔与阴影，而不是蓝紫渐变或厚重边框；
4. **有自己的 Agent 人格**：默认中文、重验证、简洁但完整，并把这套人格固化成一个 Agent preset。

因此第一版的重心是“**品牌 + 驾驶舱 + 设置 + 预设**”，不是侧边栏本身。

#### 1A.2 第一版做了什么

第一版是本地插件 `@local/dsh-mine-workbench`，包含：

- 自定义 `Mark` / `BrandName`，占用 `sidebar.brand.mark` 与 `sidebar.brand.name`；
- `conversation.hero.brand.mark`，让新会话首页也出现品牌；
- 一个 key 为 `mine-workbench` 的 **主面板**（驾驶舱），从 DSH 的 sessions/workspaces 快照和任务、用量接口取数；
- 一个 **设置 section**，可改显示名、标语、今日焦点、最近会话/概览开关，支持恢复默认；
- 一个 bundle patch，在安装插件的同时插入 `DSH·Mine 私享` Agent preset；
- 一份可复用的玻璃卡片 CSS。

这一版验证了 DSH Client 插件的关键机制：**slot 注册、locale、prefs、标准 props、bundle patch、Agent preset**。后面的所有改造都建立在这套机制上。

#### 1A.3 第二阶段：侧边栏被彻底重做

品牌和驾驶舱完成后，用户把注意力转向侧边栏，连续提出了三类问题：

1. Windows 上展开/收起按钮和品牌图标重叠，收起后按钮消失；
2. 蓝紫渐变不符合黑白灰审美；
3. 希望侧边栏本身就像 macOS，收起后不是一条窄栏，而是一个**可拖动的 M 轮盘**；悬停 M 展开，移出收回；每个菜单项都有玻璃 hover。

这阶段做了几件影响源码结构的大事：

- 不替换原生侧边栏 DOM，而是**装饰原生 DOM**：保留原生按钮、菜单、快捷键、`aria-label` 和事件，避免“重写一遍菜单”导致功能丢失；
- 用 `data-mine-sidebar`、`data-mine-sidebar-collapsed`、`data-mw-wheel-open` 等属性驱动 CSS；
- 用 `installWheelSidebar()` 监听原生 DOM，把 panel 按钮重新排成轮盘；
- 用 `transform` + rAF 实现拖动，避免逐帧写全局 CSS 变量；
- 增加动作坞、命令搜索、实时任务 badge、25 分钟专注、light/dark；
- 修复原生 Tooltip 在 M 下方留下的白色条。

所以现在的 `client.js` 同时包含“**React 面板**”和“**原生 DOM 侧栏引擎**”两套东西，这是历史演进的结果，不是架构混乱。

#### 1A.4 第三阶段：从个人插件变成可分发 bundle

用户在 MacBook 上也要用，于是项目从 `@local/...` 改名为公开包 `dsh-mine-workbench`，补 README、LICENSE、截图、图标、安装说明，推送到 GitHub。这个阶段的核心不再是 UI，而是：

- bundle 必须能被 `plugin_manager install_bundle` 安装；
- `package.json` 的 `dsh.bundle.patch`、`dsh.client`、`exports`、`files` 必须自洽；
- Client 模块 id 必须与包名一致；
- 安装后必须完整退出 App，避免旧 boot graph 继续请求已失效的 `client.js?rev=...`；
- Mac 的原生侧栏结构与 Windows 不同，需要单独适配。

这也是为什么交接文档会把“版本号 ≠ 运行时 Client”放在最前面：**可分发之后，最常见的问题不是代码写错，而是页面还在跑旧 bundle。**

#### 1A.5 它现在具体解决什么问题

对用户而言：

- 打开 DSH 先看到个人驾驶舱，而不是空白聊天；
- 左侧是黑白灰玻璃侧栏，收起后是一个可拖动的 M；
- 悬停 M 出现轮盘，快速进入任务看板、工作台、插件、自动化任务、插件市场；
- 轮盘下方有动作坞、今日 Tokens/消费、任务 badge、专注计时；
- 命令面板可以搜索会话、工作区、面板和动作；
- 设置里可以改品牌名/标语/焦点和概览开关；
- 新建会话默认使用 `DSH·Mine 私享` preset。

对 DSH 而言：

- 它是一个标准的 **bundle**：Host 行 + Client 模块 + Agent preset；
- 不修改 DSH 安装目录，不依赖私有 API 补丁；
- 不引入第三方运行时依赖，Client 只 `require('react')`；
- 数据优先走 DSH 已有服务/同源 HTTP，偏好只写浏览器 localStorage。

#### 1A.6 它不是什么

- 不是 DSH 内核补丁，不需要改 `app.asar`；
- 不是独立 App，不能脱离 DSH 运行；
- 不是只有 CSS 的皮肤包：它有 React 面板、slot 注册、Host bundle 行和 Agent preset；
- 不是“重写整个 DSH 侧边栏”：原生菜单和事件仍然是宿主提供的，插件只是在上面做视觉与交互层。

理解这一点，才能理解后面的源码导读：**先看 DSH 的 bundle/Client 生命周期，再看 `client.js` 的两层结构，最后才看某个 CSS 选择器。**

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

## 5A. 源码导读：下一个 AI 应该怎样理解这个项目

> 这一章是后来补写的。目标不是把 4300 行 `client.js` 逐行解释一遍，而是让接手者先建立**正确的运行时模型**，再知道每一层代码在哪里、为什么这样写、改哪里安全。

### 5A.1 先建立四层模型（否则一定会改错地方）

DSH 插件不是“一个 JS 文件”，而是四层协作：

```text
① package.json 的 dsh 字段
   ├─ dsh.bundle.patch  → cordis.patch.yml
   │    ├─ Host 行：mine-workbench → dsh-mine-workbench（index.js）
   │    └─ Preset 行：preset-mine-workbench → @deepseek-ai/dsh-agent-preset
   └─ dsh.client        → client.js（Web Client 模块）
                              ↓
② Host Loader 读取 bundle patch，注册 Host 行和 preset
                              ↓
③ DSH Web 启动时，clientModules 根据 boot graph 提供 client.js
                              ↓
④ 浏览器执行 window.__ModuleLoader__.load(...) → apply(ctx)
   → 注册 locale / style / slots / sidebar engine
```

四个关键结论：

1. **`index.js` 为空不代表插件没生效。** Host 行只是让 bundle 可被 loader/plugin_manager 识别；本项目的 UI 全部在 Client 模块。
2. **`package.json` 的版本不是页面运行时版本。** 页面只认 boot graph 里的 `client.js?rev=...`；重装后不完整退出，页面仍可能执行旧 rev。
3. **slot 是 Client 层的扩展点。** `sidebar.brand.mark`、`sidebar.panellist`、`main`、`settings.section` 都在 `apply(ctx)` 里注册，不是在 Host 里。
4. **Agent preset 与 UI 是两条独立链路。** 即使 Client 没加载，preset 也可能已经出现在 Agent 选择器里；不要用“preset 能看到”推断 Client 已加载。

### 5A.2 文件职责

| 文件 | 职责 | 改它时最常犯的错 |
|---|---|---|
| `package.json` | 包名、版本、`dsh.bundle.patch`、`dsh.client.platform/immediately/inject`、`exports/files` | 改了 `name` 却忘了同步 `client.js` 的 module id；删了 `inject` 导致 slot 服务不可用 |
| `cordis.patch.yml` | 插入 Host 行 + `DSH·Mine 私享` preset；preset 内复制标准工具组合 | 删平台条件行；把 `preset` 的 `id` 和 bundle 行 `id` 混为一谈 |
| `index.js` | Host 半侧空实现，只负责被 loader 识别 | 以为它是入口，把 UI 逻辑写进来 |
| `client.js` | 全部 UI：React 组件、CSS、slot 注册、侧栏/轮盘引擎 | 改到旧的 `installSidebarLayer`；在错误的 CSS 层覆盖；忘记 build 标记 |
| `locale/zh.json` / `en.json` | 插件市场/包的元信息；真正 UI 词典在 `client.js` 内 | 以为改这里能改界面文案 |
| `icon.svg` | 包图标，中性石墨色 | 重新引入品牌蓝 |
| `docs/*.png` | README/交接文档截图 | 截图与当前版本不一致 |
| `README.md` | 用户安装/功能说明 | 把内部诊断写进用户文档 |
| `HANDOFF.md` | 给下一个 AI 的工程交接 | 只写故障，不写源码地图（本版已修） |

### 5A.3 `client.js` 分层索引

> 行号基于 1.1.2（4300 行）；编辑后会移动，优先用表中的 `grep` 锚点。

| 行区间 | 内容 | 关键符号 / 锚点 |
|---|---|---|
| 1–18 | 模块加载器头 | `window.__ModuleLoader__.load({ id: 'dsh-mine-workbench'` |
| 23–31 | React 与常量 | `NS`、`PANEL_ID`、`PRESET_ID`、`STORAGE_KEY`、`DEFAULT_NAME` |
| 33–238 | 中英词典 | `const zh = {`、`const en = {` |
| 239–354 | 基础工具 | `uiLocale`、`clean`、`clip`、`toMillis`、`basename`、`greetingKey`、`formatDate`、`formatRelative`、`formatNumber`、`formatCompact`、`formatMoney` |
| 355–420 | 偏好存储 | `normalizePrefs`、`loadPrefs`、`persistPrefs`、`emitPrefs`、`updatePrefs`、`resetPrefs`、`subscribePrefs`、`getPrefsSnapshot`、`usePrefs` |
| 421–480 | 时间/JSON hooks | `useNow`、`useJson` |
| 481–620 | DSH 数据归一化 | `rowsFromSessions`、`itemsFromWorkspaces`、`archivedSessionSet`、`normalizeWorkspaces`、`workspaceMap`、`normalizeSessions`、`currentSession`、`summarizeTasks`、`summarizeUsage` |
| 621–734 | 图标与品牌 | `iconProps`、`ArrowIcon`、`PlusIcon`、`ChatIcon`、`FolderIcon`、`SearchIcon`、`BoardIcon`、`CalendarIcon`、`PlugIcon`、`SparkIcon`、`CheckIcon`、`Mark`、`PanelIcon` |
| 735–756 | 基础 UI | `GlassCard`、`Button`、`EmptyState` |
| 757–971 | 驾驶舱组件 | `BrandName`、`RecentSessions`、`WorkspaceCard`、`FocusCard`、`OverviewCard`、`QuickAccess` |
| 972–1141 | 命令面板 | `CommandPalette`、模块级 `commandBus` |
| 1142–1310 | 主面板 | `WorkbenchPanel` |
| 1311–1422 | 设置 | `SettingsPanel`、`ToggleRow` |
| 1423–2976 | 全量 CSS 字符串 | `const CSS = \`` 到反引号结束 |
| 2977–3362 | **旧版**侧栏实现 | `installSidebarLayer()`；当前 `apply` 不调用，只作历史参考 |
| 3363–4124 | **当前**侧栏/轮盘引擎 | `installWheelSidebar(ctx, actions)` |
| 4125–4294 | Client 入口 | `apply(ctx)` |
| 4295–4300 | 导出 | `return { inject: [...], apply }` |

#### `client.js` 内部的三条边界

1. **React 组件层（约 621–1422）**
   只负责渲染，不直接操作原生侧栏 DOM；数据通过 `props` 和标准 hooks 注入。
   `WorkbenchPanel` 拿到的是 `main` slot 的标准 props：`actions`、`useSessions`、`useWorkspaces`，不是全局单例。

2. **CSS 层（1423–2976）**
   一个巨大的模板字符串，按注释分段；所有类名以 `mw-` 前缀，选择器尽量挂在 `html[data-mine-sidebar]` / `[data-pane="sidebar"]` 下。
   **不要在 CSS 里写模块级变量**；这里没有 `${}` 插值，避免构建时被误解析。

3. **原生 DOM 引擎（3363–4124）**
   这是最容易误改的部分。它不创建 React 树，而是：
   - 找到 `[data-pane="sidebar"]`；
   - 给原生按钮加 `data-mw-wheel-item` / label / 位置 CSS 变量；
   - 用属性驱动 CSS 收起/展开；
   - 监听 pointer/resize/mutation；
   - 管理拖动、位置持久化、指标卡、动作坞、badge、专注计时。

> **重要：`installSidebarLayer()`（2977）是旧实现，`apply()` 在 4225 行的 `ctx.effect` 里调用的是 `installWheelSidebar()`（3363）。**
> 读代码/改 bug 时先 `grep -n "installWheelSidebar"`，不要改错那份。

### 5A.4 运行时数据流

```text
DSH 标准 props / services
  ├─ useSessions(snapshot)      → 最近会话、当前会话、归档过滤
  ├─ useWorkspaces(snapshot)    → 工作区卡片、项目列表
  ├─ actions.startSession()     → uiWorkspace.startSession(..., { agentPreset: 'mine-workbench' })
  ├─ actions.openSession()      → uiWorkspace.openSession()
  ├─ actions.openWorkspace()    → uiWorkspace.openWorkspace(..., { agentPreset })
  ├─ actions.addWorkspace()     → ui.pickDirectory() → workspaces.create() → openWorkspace()
  ├─ actions.openPanel(id)      → layout.selectPanel(id)
  ├─ theme service              → ctx.get('theme').setTheme('light'|'dark')
  └─ 同源 HTTP
       ├─ GET /api/dsh-usage/overview   → 今日 Tokens / 消费
       └─ GET /api/task-board/state     → 任务 badge 统计
```

偏好数据：

```text
localStorage['dshMineWorkbench.prefs.v1']
  → loadPrefs / normalizePrefs
  → module-level snapshot
  → usePrefs() = useSyncExternalStore(subscribePrefs, getPrefsSnapshot)
  → SettingsPanel 修改 → updatePrefs → emitPrefs → React 重渲染
```

轮盘位置：

```text
localStorage['dshMineWorkbench.wheelPos.v1']
  → readWheelPos() → clampWheel() → CSS 变量 --mw-wheel-cx/--mw-wheel-cy
  → 拖动结束 → snapWheel() → persistWheelPos()
```

命令面板：

```text
动作坞搜索按钮 / sidebar panel
  → commandBus.request()
  → WorkbenchPanel 的 commandOpen state
  → CommandPalette
  → 搜索 sessions / workspaces / DOM panel buttons / 动作
```

### 5A.5 侧栏/轮盘状态机（读这段再看 CSS）

#### DOM 状态属性

| 属性 | 含义 |
|---|---|
| `html[data-mine-sidebar="on"]` | 插件已接管侧栏样式 |
| `html[data-mine-sidebar-collapsed="true"]` | 当前是收起态 |
| `html[data-mw-wheel-open="true"]` | 轮盘展开（M 悬停/聚焦） |
| `html[data-mw-wheel-idle="true"]` | 闲置淡化 |
| `html.mw-wheel-dragging` | 正在拖动 M |
| `--mw-wheel-cx/--mw-wheel-cy` | M/轮盘中心位置 |
| `--mw-x/--mw-y` | 每个轮盘项相对中心的偏移 |

#### 收起态

- 原生侧栏被隐藏/变窄；
- 只显示 M（`button[class*="toggle"]` 被样式化成圆形玻璃按钮）；
- M 的 label/tooltip 被移除或 CSS 抑制；
- 轮盘项 `[data-mw-wheel-item]` 默认 `opacity: 0`、缩回中心；
- `data-mw-wheel-open=true` 时按 `--mw-x/--mw-y` 展开；
- `data-mw-wheel-open=false` 时反向过渡。

#### 展开触发

- `pointermove` 进入 M → `openWheel()`；
- 指针离开轮盘/指标/动作坞安全区 → `scheduleClose()`；
- 展开后 `decorate()` 从原生 panel 按钮生成轮盘项；
- `sync()` 在 mutation/resize 后重新计算，但要避免死循环。

#### 拖动

```text
pointerdown on M (data-mw-drag-handle="hub")
  → startDrag(event)
  → rAF 合并 pointermove
  → 只设置 M 的 translate3d（不逐帧改全局 CSS 变量）
  → pointerup → clamp → snapWheel → applyWheelPos → persistWheelPos
  → 若移动超过阈值，抑制随后的 click
```

拖动期间应隐藏 halo/metrics/dock，避免白条和重绘；这是 1.1.2 之后修过的点。

#### 指标/动作坞/专注

- `ensureChrome()` 创建 `.mw-wheel-halo`、`.mw-wheel-metrics`、`.mw-action-dock`；
- metrics 每 60s 拉 usage；
- `loadTaskBadge()` 每 30s 拉 task board，失败静默；
- `paintFocus()` 从 localStorage 恢复 25 分钟计时；
- 动作坞按钮：新对话、最近会话、项目、搜索、主题、专注；
- 所有定时器、监听器在 cleanup 中释放。

### 5A.6 CSS 分层

`CSS` 不是按“组件”组织，而是按**覆盖层次**组织。定位时按下面顺序找：

| 行号锚点 | 层 | 作用 |
|---|---|---|
| 1423+ | 根/驾驶舱 | `.mw-root`、`.mw-glass`、hero、卡片、响应式 |
| 1979 | 侧栏玻璃表面 | `.mw-sidebar-surface`、logoRow、newSession、panelRow |
| 2129 | 固定定位修正 | 让 fixed 后代相对 viewport 解析 |
| 2480 | 拖动重绘约束 | 限制拖动时的影响面 |
| 2509 | 轮盘基础 | halo、wheel items、M、label |
| 2539 | 关闭态 | `data-mw-wheel-open=false` 的隐藏/缩回 |
| 2570 | 原生 newSession | 收起态补 `+` 图标 |
| 2607/2610 | Tooltip 抑制 | `[role="tooltip"]` / `[class*="tooltip"]` |
| 2641 | 动作坞 | dock、按钮、hover label |
| 2716 | badge | 任务计数/运行点 |
| 2748 | 专注 | metrics 内倒计时行 |
| 2768 | 命令面板 | overlay/panel/item |
| 2878 | 全局画布 | `html[data-mine-sidebar="on"] body` 黑白灰渐变 + noise |
| 2904 | Mac 原生回退 | `html[data-platform="darwin"]` 下的侧栏背景/边框 |

**为什么有 `!important`：** 宿主 sidebar 的 CSS 是 hash 类名且优先级高；插件只能通过属性选择器 + `!important` 稳定覆盖。不要为了“干净”批量删 `!important`，会直接退回原生样式。

**为什么有 Mac 回退：** macOS Desktop 的侧栏在收起后可能整个从布局中消失，`[data-pane="sidebar"]` 可能不可见；所以全局画布规则不能依赖侧栏节点存在，必须挂在 `<html>` 的 `data-mine-sidebar` / `data-platform` 上。

### 5A.7 修改指南（按改动类型）

| 想改什么 | 改哪里 | 不要做什么 |
|---|---|---|
| 品牌 M 字形/颜色 | `Mark`（约 692） | 不要只改 CSS `::before`；Mac 收起态可能显示的是 slot Mark |
| 驾驶舱布局 | `WorkbenchPanel` + 1423 段 CSS | 不要直接读全局 `window` 状态；用 props/hooks |
| 设置项 | `DEFAULT_PREFS`、`SettingsPanel`、`normalizePrefs` | 不要绕过 `updatePrefs` 直接写 localStorage |
| 侧栏玻璃/菜单 | 1979 段 CSS | 不要改原生 DOM 结构/删除原生按钮 |
| M 轮盘行为 | `installWheelSidebar`（3363–4124） | 不要改 `installSidebarLayer`（旧实现） |
| 轮盘项数量/顺序 | `decorate()` / `visible` 逻辑 | 不要硬编码第 5 个按钮一定是某个面板 |
| 主题 | `ctx.get('theme')` + CSS token | 不要直接改 `document.body.style` |
| Agent preset | `cordis.patch.yml` | 不要删平台条件、不要漏 `id` |
| 安装/版本 | `package.json` + `client.js` build 标记 | 不要让 module id 与包名不一致 |

### 5A.8 推荐阅读顺序（约 60–90 分钟）

1. 读本文件 §1A、§2、§3，知道“为什么”和“现在卡在哪”；
2. 读 `package.json` + `cordis.patch.yml`，理解 bundle/preset；
3. 读 `client.js` 1–31、4125–4300，理解加载器、`apply`、slot 注册；
4. 读 1142–1422，理解 React 面板与设置如何拿数据；
5. 读 3363–3548，理解侧栏引擎的初始化、位置、开合；
6. 读 3548–3895，理解 chrome/metrics/dock/badge/focus/decorate；
7. 读 3896–4124，理解拖动、pointer、resize、cleanup；
8. 最后按需读 CSS 对应段，不要从头到尾读 1500 行 CSS。

### 5A.9 最小调试入口

在 Mac 的 DevTools Console：

```js
// 1. 运行时是否真的是 1.1.2
document.documentElement.dataset.mwBuild
// 期望 "1.1.2"

// 2. 插件是否接管了侧栏
document.documentElement.dataset.mineSidebar
document.documentElement.dataset.mineSidebarCollapsed
document.documentElement.dataset.mwWheelOpen

// 3. 侧栏节点是否存在
document.querySelector('[data-pane="sidebar"]')?.outerHTML.slice(0, 300)

// 4. M 是 slot Mark 还是 toggle 伪元素
document.querySelector('[data-pane="sidebar"] button[class*="toggle"]')?.outerHTML

// 5. 全局画布规则是否命中
getComputedStyle(document.body).backgroundImage
```

如果 `data-mw-build` 不是 1.1.2，先解决“旧 Client 仍在运行”，不要改 CSS。
如果 build 正确但 `data-mine-sidebar` 缺失，查 `installWheelSidebar` 是否在 `apply` 后抛错。
如果属性都有但背景仍白，查 `body` 是否被更深的 `#root`/wrapper 盖住（见 §7 情况 C）。

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

> 完整的模块分层、行号索引、数据流和状态机见 **§5A 源码导读**。这里只保留入口摘要。

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
- 设置 build 标记 `document.documentElement.dataset.mwBuild = '1.1.2'` 并打印 `[DSH·Mine] client build 1.1.2`；
- 定义 actions；
- `ctx.effect(() => installWheelSidebar(ctx, actions), ...)`；
- 注册 `sidebar.brand.mark` / `sidebar.brand.name`（`priority: -1`，覆盖原生品牌）/ `conversation.hero.brand.mark` / `sidebar.panellist` / `main` / `settings.section`；
- 每个 slot 先尝试 `ctx.slots.register`，失败则 `ctx.slots.inject` 等待声明后注册（boot 初期 slot 可能尚未声明）。

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
