/**
 * DSH·Mine workbench — browser half.
 *
 * Renders through the Harness slot system only:
 *  - sidebar brand mark / name
 *  - a global "工作台" sidebar entry and its main panel
 *  - the blank-session hero mark
 *  - a first-level settings section
 *
 * Business data arrives from the standard slot props (sessions / workspaces)
 * and from two optional same-origin endpoints owned by the installed task board
 * and usage plugins. All rendering uses the live `--dsw-*` theme tokens; the
 * component-local stylesheet is installed from `apply` and removed with the
 * plugin context.
 *
 * @module dsh-mine-workbench/client
 */

window.__ModuleLoader__.load({
  id: 'dsh-mine-workbench',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'mine-workbench';
    const PANEL_ID = 'mine-workbench';
    const PRESET_ID = 'mine-workbench';
    const STORAGE_KEY = 'dshMineWorkbench.prefs.v1';
    const PREFS_VERSION = 1;
    const DEFAULT_NAME = 'DSH·Mine';
    const DEFAULT_TAGLINE = '你的专属 AI 工作台';

    const zh = {
      'brand.mark': 'DSH·Mine',
      'panel.label': '工作台',
      'panel.local': '本机工作台',
      'panel.title': '私享工作台',
      'greeting.late': '夜深了',
      'greeting.morning': '早上好',
      'greeting.noon': '中午好',
      'greeting.afternoon': '下午好',
      'greeting.evening': '晚上好',
      'hero.title': '今天想做什么？',
      'hero.body': '从工作台开始一个新对话，或继续处理最近的项目。',
      'hero.new': '开始新对话',
      'hero.project': '打开项目',
      'hero.working': '正在打开…',
      'hero.failed': '项目没有打开，请稍后再试。',
      'hero.unavailable': '服务尚未就绪，请稍后再试。',
      'recent.title': '继续最近',
      'recent.hint': '最近更新',
      'recent.emptyTitle': '还没有会话',
      'recent.emptyBody': '开始你的第一个对话吧。',
      'recent.untitled': '未命名会话',
      'recent.open': '打开会话',
      'projects.title': '工作区',
      'projects.add': '添加项目',
      'projects.empty': '还没有注册项目。',
      'projects.untitled': '未命名工作区',
      'projects.sessions': '个会话',
      'projects.open': '打开工作区',
      'focus.title': '今日专注',
      'focus.placeholder': '写下今天最重要的一件事…',
      'focus.saved': '自动保存到本机',
      'overview.title': '今日概览',
      'overview.calls': '调用',
      'overview.tokens': 'Tokens',
      'overview.cost': '今日花费',
      'overview.balance': '余额',
      'overview.tasks': '任务',
      'overview.todo': '待办',
      'overview.running': '进行中',
      'overview.done': '已完成',
      'overview.failed': '失败',
      'overview.loading': '正在读取本机统计…',
      'overview.unavailable': '统计暂不可用',
      'overview.source': '来自任务看板与用量面板',
      'wheel.tokens': '今日 Tokens',
      'wheel.cost': '今日消费',
      'wheel.drag': '拖动轮盘 / 单击展开',
      'wheel.focus': '专注',
      'wheel.focusDone': '专注完成',
      'action.new': '新对话',
      'action.recent': '最近会话',
      'action.project': '打开项目',
      'action.search': '命令搜索',
      'action.theme': '切换主题',
      'action.focus': '开始专注',
      'action.focusStop': '结束专注',
      'command.title': '命令搜索',
      'command.placeholder': '搜索会话、工作区、面板或动作…',
      'command.empty': '没有匹配项',
      'command.sessions': '会话',
      'command.workspaces': '工作区',
      'command.panels': '面板',
      'command.actions': '动作',
      'quick.title': '快捷入口',
      'quick.board': '任务看板',
      'quick.boardDesc': '查看与执行任务',
      'quick.schedules': '日程',
      'quick.schedulesDesc': '定时与提醒',
      'quick.plugins': '插件',
      'quick.pluginsDesc': '管理已安装插件',
      'quick.market': '创意工坊',
      'quick.marketDesc': '发现皮肤与插件',
      'settings.title': 'DSH·Mine',
      'settings.subtitle': '让工作台更像你。',
      'settings.name': '品牌名',
      'settings.nameHint': '显示在侧边栏和会话首页。',
      'settings.tagline': '一句话介绍',
      'settings.taglineHint': '显示在工作台标题下方。',
      'settings.focus': '今日专注',
      'settings.focusHint': '显示在工作台右侧，自动保存在本机。',
      'settings.showRecent': '显示最近会话',
      'settings.showRecentHint': '在驾驶舱左侧显示最近更新的会话。',
      'settings.showUsage': '显示今日概览',
      'settings.showUsageHint': '显示今日调用、Tokens 与花费。',
      'settings.showTasks': '显示任务统计',
      'settings.showTasksHint': '显示任务看板各列的计数。',
      'settings.reset': '恢复默认',
      'settings.saved': '已保存到本机',
      'settings.localNote': '这些偏好保存在当前浏览器，不会上传，也不会进入会话日志。',
      'time.justNow': '刚刚',
      'footer.note': 'DSH·Mine · 私享工作台',
    };

    const en = {
      'brand.mark': 'DSH·Mine',
      'panel.label': 'Workbench',
      'panel.local': 'Local workbench',
      'panel.title': 'Personal Workbench',
      'greeting.late': 'Still up',
      'greeting.morning': 'Good morning',
      'greeting.noon': 'Good midday',
      'greeting.afternoon': 'Good afternoon',
      'greeting.evening': 'Good evening',
      'hero.title': 'What will you make today?',
      'hero.body': 'Start a new conversation from the workbench, or continue a recent project.',
      'hero.new': 'New conversation',
      'hero.project': 'Open project',
      'hero.working': 'Opening…',
      'hero.failed': 'The project could not be opened. Try again.',
      'hero.unavailable': 'Services are not ready yet. Try again shortly.',
      'recent.title': 'Continue recent',
      'recent.hint': 'Recently updated',
      'recent.emptyTitle': 'No sessions yet',
      'recent.emptyBody': 'Start your first conversation.',
      'recent.untitled': 'Untitled session',
      'recent.open': 'Open session',
      'projects.title': 'Workspaces',
      'projects.add': 'Add project',
      'projects.empty': 'No projects registered yet.',
      'projects.untitled': 'Untitled workspace',
      'projects.sessions': 'sessions',
      'projects.open': 'Open workspace',
      'focus.title': 'Today’s focus',
      'focus.placeholder': 'Write the one thing that matters most today…',
      'focus.saved': 'Saved on this device',
      'overview.title': 'Today at a glance',
      'overview.calls': 'Calls',
      'overview.tokens': 'Tokens',
      'overview.cost': 'Today’s cost',
      'overview.balance': 'Balance',
      'overview.tasks': 'Tasks',
      'overview.todo': 'To do',
      'overview.running': 'Running',
      'overview.done': 'Done',
      'overview.failed': 'Failed',
      'overview.loading': 'Reading local stats…',
      'overview.unavailable': 'Stats are unavailable',
      'overview.source': 'From the task board and usage panel',
      'wheel.tokens': 'Today’s tokens',
      'wheel.cost': 'Today’s spend',
      'wheel.drag': 'Drag the wheel / click to expand',
      'wheel.focus': 'Focus',
      'wheel.focusDone': 'Focus complete',
      'action.new': 'New conversation',
      'action.recent': 'Recent session',
      'action.project': 'Open project',
      'action.search': 'Command search',
      'action.theme': 'Toggle theme',
      'action.focus': 'Start focus',
      'action.focusStop': 'Stop focus',
      'command.title': 'Command search',
      'command.placeholder': 'Search sessions, workspaces, panels or actions…',
      'command.empty': 'No matches',
      'command.sessions': 'Sessions',
      'command.workspaces': 'Workspaces',
      'command.panels': 'Panels',
      'command.actions': 'Actions',
      'quick.title': 'Quick access',
      'quick.board': 'Task board',
      'quick.boardDesc': 'Review and run tasks',
      'quick.schedules': 'Schedules',
      'quick.schedulesDesc': 'Timers and reminders',
      'quick.plugins': 'Plugins',
      'quick.pluginsDesc': 'Manage installed plugins',
      'quick.market': 'Workshop',
      'quick.marketDesc': 'Discover skins and plugins',
      'settings.title': 'DSH·Mine',
      'settings.subtitle': 'Make the workbench feel like yours.',
      'settings.name': 'Brand name',
      'settings.nameHint': 'Shown in the sidebar and on the session hero.',
      'settings.tagline': 'One-line introduction',
      'settings.taglineHint': 'Shown below the workbench title.',
      'settings.focus': 'Today’s focus',
      'settings.focusHint': 'Shown on the right side of the workbench; saved on this device.',
      'settings.showRecent': 'Show recent sessions',
      'settings.showRecentHint': 'Show the most recently updated sessions on the left.',
      'settings.showUsage': 'Show today’s overview',
      'settings.showUsageHint': 'Show today’s calls, tokens and cost.',
      'settings.showTasks': 'Show task stats',
      'settings.showTasksHint': 'Show per-column task board counts.',
      'settings.reset': 'Reset to defaults',
      'settings.saved': 'Saved on this device',
      'settings.localNote': 'These preferences stay in this browser. They are not uploaded or written to session logs.',
      'time.justNow': 'just now',
      'footer.note': 'DSH·Mine · Personal Workbench',
    };

    const DEFAULT_PREFS = Object.freeze({
      version: PREFS_VERSION,
      displayName: DEFAULT_NAME,
      tagline: DEFAULT_TAGLINE,
      focus: '',
      showRecent: true,
      showUsage: true,
      showTasks: true,
    });

    let t = (key) => key;
    let prefs = { ...DEFAULT_PREFS };
    const listeners = new Set();

    // ---------------------------------------------------------------------
    // Small pure helpers
    // ---------------------------------------------------------------------

    function uiLocale() {
      try {
        const lang = navigator.language || 'zh-CN';
        if (/^zh/i.test(lang)) return 'zh-CN';
        if (/^en/i.test(lang)) return 'en-US';
        return lang;
      } catch {
        return 'zh-CN';
      }
    }

    function clean(value) {
      return typeof value === 'string' ? value.trim() : '';
    }

    function clip(value, max) {
      return typeof value === 'string' ? value.slice(0, max) : '';
    }

    function toMillis(value) {
      if (typeof value === 'number' && Number.isFinite(value)) return value;
      if (typeof value === 'string' && value.length > 0) {
        const parsed = Date.parse(value);
        return Number.isFinite(parsed) ? parsed : 0;
      }
      return 0;
    }

    function basename(path) {
      const text = clean(path);
      if (text === '') return '';
      const parts = text.split(/[\\/]+/).filter(Boolean);
      return parts.length > 0 ? parts[parts.length - 1] : text;
    }

    function greetingKey(date) {
      const hour = date.getHours();
      if (hour < 5) return 'greeting.late';
      if (hour < 11) return 'greeting.morning';
      if (hour < 13) return 'greeting.noon';
      if (hour < 18) return 'greeting.afternoon';
      if (hour < 23) return 'greeting.evening';
      return 'greeting.late';
    }

    function formatDate(date) {
      try {
        return new Intl.DateTimeFormat(uiLocale(), {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        }).format(date);
      } catch {
        return date.toLocaleDateString();
      }
    }

    function formatRelative(timestamp) {
      if (!timestamp) return '';
      const diff = timestamp - Date.now();
      const abs = Math.abs(diff);
      if (abs < 60 * 1000) return t('time.justNow');
      try {
        const rtf = new Intl.RelativeTimeFormat(uiLocale(), { numeric: 'auto' });
        if (abs < 60 * 60 * 1000) return rtf.format(Math.round(diff / (60 * 1000)), 'minute');
        if (abs < 24 * 60 * 60 * 1000) return rtf.format(Math.round(diff / (60 * 60 * 1000)), 'hour');
        if (abs < 7 * 24 * 60 * 60 * 1000) return rtf.format(Math.round(diff / (24 * 60 * 60 * 1000)), 'day');
        return new Intl.DateTimeFormat(uiLocale(), { month: 'short', day: 'numeric' }).format(new Date(timestamp));
      } catch {
        return new Date(timestamp).toLocaleDateString();
      }
    }

    function formatNumber(value) {
      const number = Number(value);
      if (!Number.isFinite(number)) return '—';
      try {
        return new Intl.NumberFormat(uiLocale()).format(number);
      } catch {
        return String(number);
      }
    }

    function formatCompact(value) {
      const number = Number(value);
      if (!Number.isFinite(number)) return '—';
      try {
        return new Intl.NumberFormat(uiLocale(), {
          notation: 'compact',
          maximumFractionDigits: 1,
        }).format(number);
      } catch {
        return formatNumber(number);
      }
    }

    function formatMoney(value, currency) {
      const number = Number(value);
      if (!Number.isFinite(number)) return '—';
      const code = typeof currency === 'string' && /^[A-Z]{3}$/.test(currency) ? currency : 'CNY';
      try {
        return new Intl.NumberFormat(uiLocale(), {
          style: 'currency',
          currency: code,
          maximumFractionDigits: 2,
        }).format(number);
      } catch {
        return `${number.toFixed(2)} ${code}`;
      }
    }

    // ---------------------------------------------------------------------
    // Preference store (browser-local; no session events)
    // ---------------------------------------------------------------------

    function normalizePrefs(input, applyNameFallback) {
      const raw = input && typeof input === 'object' && !Array.isArray(input) ? input : {};
      const name = clip(raw.displayName, 24).trim();
      return {
        version: PREFS_VERSION,
        displayName: name || (applyNameFallback ? DEFAULT_NAME : ''),
        tagline: clip(raw.tagline, 48).trim(),
        focus: clip(raw.focus, 280),
        showRecent: raw.showRecent !== false,
        showUsage: raw.showUsage !== false,
        showTasks: raw.showTasks !== false,
      };
    }

    function loadPrefs() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return { ...DEFAULT_PREFS };
        return normalizePrefs(JSON.parse(raw), true);
      } catch {
        return { ...DEFAULT_PREFS };
      }
    }

    function persistPrefs(next) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* A disabled or full storage must not break the panel. */
      }
    }

    function emitPrefs() {
      for (const listener of listeners) listener();
    }

    function updatePrefs(patch) {
      const next = normalizePrefs({ ...prefs, ...patch }, false);
      prefs = next;
      persistPrefs(next);
      emitPrefs();
    }

    function resetPrefs() {
      prefs = { ...DEFAULT_PREFS };
      persistPrefs(prefs);
      emitPrefs();
    }

    function subscribePrefs(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }

    function getPrefsSnapshot() {
      return prefs;
    }

    function usePrefs() {
      return React.useSyncExternalStore(subscribePrefs, getPrefsSnapshot, getPrefsSnapshot);
    }

    // ---------------------------------------------------------------------
    // Data hooks
    // ---------------------------------------------------------------------

    function useNow() {
      const [now, setNow] = React.useState(() => new Date());
      React.useEffect(() => {
        const id = window.setInterval(() => setNow(new Date()), 60 * 1000);
        return () => window.clearInterval(id);
      }, []);
      return now;
    }

    function useJson(url, enabled) {
      const [state, setState] = React.useState({ status: enabled ? 'loading' : 'off', data: null });
      React.useEffect(() => {
        if (!enabled) {
          setState({ status: 'off', data: null });
          return undefined;
        }
        let disposed = false;
        let controller = null;
        let timer = null;

        const load = async () => {
          if (controller) controller.abort();
          controller = new AbortController();
          try {
            const response = await window.fetch(url, {
              method: 'GET',
              credentials: 'same-origin',
              cache: 'no-store',
              headers: { accept: 'application/json' },
              signal: controller.signal,
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            if (!disposed) setState({ status: 'ready', data });
          } catch (error) {
            if (disposed || (error && error.name === 'AbortError')) return;
            setState({ status: 'error', data: null });
          }
        };

        setState((previous) => (previous.status === 'ready'
          ? previous
          : { status: 'loading', data: null }));
        load();
        timer = window.setInterval(load, 60 * 1000);
        const onVisibility = () => {
          if (document.visibilityState === 'visible') load();
        };
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
          disposed = true;
          if (timer !== null) window.clearInterval(timer);
          document.removeEventListener('visibilitychange', onVisibility);
          if (controller) controller.abort();
        };
      }, [url, enabled]);
      return state;
    }

    function rowsFromSessions(snapshot) {
      if (!snapshot || typeof snapshot !== 'object') return [];
      if (snapshot.byId && typeof snapshot.byId === 'object') {
        return Object.keys(snapshot.byId).map((id, index) => ({
          key: id,
          index,
          row: snapshot.byId[id] && typeof snapshot.byId[id] === 'object' ? snapshot.byId[id] : {},
        }));
      }
      if (Array.isArray(snapshot.items)) {
        return snapshot.items.map((row, index) => ({
          key: String(row && (row.id ?? row.sessionId) ? (row.id ?? row.sessionId) : index),
          index,
          row: row && typeof row === 'object' ? row : {},
        }));
      }
      return [];
    }

    function itemsFromWorkspaces(snapshot) {
      if (!snapshot || typeof snapshot !== 'object') return [];
      if (Array.isArray(snapshot.items)) return snapshot.items;
      if (snapshot.byId && typeof snapshot.byId === 'object') {
        return Object.keys(snapshot.byId).map((id) => snapshot.byId[id]).filter(Boolean);
      }
      return [];
    }

    function archivedSessionSet(snapshot) {
      const source = snapshot && Array.isArray(snapshot.archivedSessionIds) ? snapshot.archivedSessionIds : [];
      return new Set(source.map((id) => String(id)));
    }

    function normalizeWorkspaces(snapshot) {
      return itemsFromWorkspaces(snapshot)
        .filter((item) => item && typeof item === 'object')
        .map((item, index) => ({
          workspaceId: String(item.workspaceId ?? item.id ?? index),
          title: clean(item.title) || basename(item.path) || t('projects.untitled'),
          path: clean(item.path),
          sessionIds: Array.isArray(item.sessionIds) ? item.sessionIds.map((id) => String(id)) : [],
          index,
        }))
        .sort((a, b) => a.index - b.index);
    }

    function workspaceMap(workspaces) {
      const bySession = new Map();
      for (const workspace of workspaces) {
        for (const sessionId of workspace.sessionIds) bySession.set(sessionId, workspace);
      }
      return bySession;
    }

    function normalizeSessions(snapshot, workspaces, archived) {
      const bySession = workspaceMap(workspaces);
      const rows = rowsFromSessions(snapshot).map(({ key, index, row }) => {
        const id = String(row.id ?? row.sessionId ?? key);
        const workspace = bySession.get(id) || null;
        const workspaceId = workspace?.workspaceId
          || (row.workspaceId != null ? String(row.workspaceId) : '');
        const timestamp = toMillis(
          row.updatedAt ?? row.lastActivityAt ?? row.updatedAtAt ?? row.createdAt ?? row.time,
        );
        const isArchived = archived.has(id) || row.archived === true;
        const isSubagent = row.origin === 'subagent' || row.parentSessionId != null;
        const isBlank = row.blank === true;
        return {
          id,
          title: clean(row.displayTitle) || clean(row.title) || clean(row.name) || t('recent.untitled'),
          workspaceId,
          workspaceTitle: workspace?.title || clean(row.workspaceTitle) || basename(row.cwd),
          timestamp,
          index,
          running: row.running === true,
          raw: row,
          hidden: isArchived || isSubagent || isBlank,
        };
      });
      return rows
        .filter((row) => !row.hidden)
        .sort((a, b) => (b.timestamp - a.timestamp) || (a.index - b.index));
    }

    function currentSession(sessions) {
      return sessions.find((row) => {
        const retained = row.raw && row.raw.retainedBy;
        if (retained && typeof retained.mainView === 'number' && retained.mainView > 0) return true;
        return row.raw && row.raw.openState === 'open';
      }) || null;
    }

    function summarizeTasks(state) {
      const tasks = state && Array.isArray(state.tasks) ? state.tasks : [];
      const counts = { backlog: 0, todo: 0, running: 0, done: 0, failed: 0, total: 0 };
      for (const task of tasks) {
        if (!task || typeof task !== 'object' || task.archived === true || task.archivedAt != null) continue;
        const column = String(task.column ?? task.status ?? 'todo');
        if (Object.prototype.hasOwnProperty.call(counts, column) && column !== 'total') counts[column] += 1;
        counts.total += 1;
      }
      return counts;
    }

    function summarizeUsage(state) {
      if (!state || typeof state !== 'object') return null;
      const current = state.current && typeof state.current === 'object' ? state.current : {};
      const today = current.today && typeof current.today === 'object'
        ? current.today
        : (state.usage && state.usage.today && state.usage.today.totals) || {};
      const input = Number(today.inputTokens);
      const output = Number(today.outputTokens);
      const calls = Number(today.calls);
      const cost = Number(today.cost);
      let balance = null;
      const providers = Array.isArray(state.providers) ? state.providers : [];
      const matching = providers.find((entry) => entry && entry.provider === current.provider);
      const withBalance = matching && matching.balance
        ? matching
        : providers.find((entry) => entry && entry.balance && entry.balance.totalBalance != null);
      if (withBalance && withBalance.balance && withBalance.balance.totalBalance != null) {
        const value = Number(withBalance.balance.totalBalance);
        if (Number.isFinite(value)) {
          balance = { value, currency: clean(withBalance.balance.currency) || 'CNY' };
        }
      }
      return {
        provider: clean(current.displayName) || clean(current.provider),
        model: clean(current.model),
        calls: Number.isFinite(calls) ? calls : 0,
        tokens: (Number.isFinite(input) ? input : 0) + (Number.isFinite(output) ? output : 0),
        cost: Number.isFinite(cost) ? cost : null,
        balance,
      };
    }

    // ---------------------------------------------------------------------
    // Icons
    // ---------------------------------------------------------------------

    function iconProps(size) {
      return {
        width: size,
        height: size,
        viewBox: '0 0 16 16',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.4,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': 'true',
        focusable: 'false',
        className: 'mw-icon',
      };
    }

    function ArrowIcon({ size = 15 }) {
      return h('svg', iconProps(size), h('path', { d: 'M3.5 8h9M9 4.5 12.5 8 9 11.5' }));
    }

    function PlusIcon({ size = 15 }) {
      return h('svg', iconProps(size), h('path', { d: 'M8 3v10M3 8h10' }));
    }

    function ChatIcon({ size = 15 }) {
      return h('svg', iconProps(size), h('path', { d: 'M3 5.2A2.2 2.2 0 0 1 5.2 3h5.6A2.2 2.2 0 0 1 13 5.2v3.1a2.2 2.2 0 0 1-2.2 2.2H7.2L4.3 13v-2.5A2.2 2.2 0 0 1 3 8.3Z' }));
    }

    function FolderIcon({ size = 15 }) {
      return h('svg', iconProps(size), h('path', { d: 'M2.5 4.5h4l1.2 1.4h5.8v5.6a1.5 1.5 0 0 1-1.5 1.5h-8a1.5 1.5 0 0 1-1.5-1.5Z' }));
    }

    function SearchIcon({ size = 15 }) {
      return h('svg', iconProps(size), [
        h('circle', { key: 'c', cx: 7.2, cy: 7.2, r: 4.1 }),
        h('path', { key: 'p', d: 'm10.4 10.4 3 3' }),
      ]);
    }

    function BoardIcon({ size = 15 }) {
      return h('svg', iconProps(size), [
        h('rect', { key: 'a', x: 2, y: 2.5, width: 12, height: 11, rx: 1.8 }),
        h('path', { key: 'b', d: 'M2 6.2h12M6.2 6.2v7.3' }),
      ]);
    }

    function CalendarIcon({ size = 15 }) {
      return h('svg', iconProps(size), [
        h('rect', { key: 'a', x: 2.5, y: 3, width: 11, height: 10.5, rx: 1.8 }),
        h('path', { key: 'b', d: 'M5 2v2.3M11 2v2.3M2.5 6.4h11' }),
      ]);
    }

    function PlugIcon({ size = 15 }) {
      return h('svg', iconProps(size), [
        h('path', { key: 'a', d: 'M5.5 2.5v3M10.5 2.5v3M4 5.5h8v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4Z' }),
        h('path', { key: 'b', d: 'M8 11.5v2' }),
      ]);
    }

    function SparkIcon({ size = 15 }) {
      return h('svg', iconProps(size), [
        h('path', { key: 'a', d: 'M8 2.2c.4 2.6 1.2 3.4 3.8 3.8-2.6.4-3.4 1.2-3.8 3.8C7.6 7.2 6.8 6.4 4.2 6c2.6-.4 3.4-1.2 3.8-3.8Z' }),
        h('path', { key: 'b', d: 'M11.8 9.2c.2 1.2.6 1.6 1.8 1.8-1.2.2-1.6.6-1.8 1.8-.2-1.2-.6-1.6-1.8-1.8 1.2-.2 1.6-.6 1.8-1.8Z' }),
      ]);
    }

    function CheckIcon({ size = 15 }) {
      return h('svg', iconProps(size), h('path', { d: 'm3.2 8.2 3 3L12.8 4.5' }));
    }

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

    function PanelIcon({ size = 16, active }) {
      return h('svg', {
        viewBox: '0 0 16 16',
        width: size,
        height: size,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.25,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'data-dsh-panel-entry': PANEL_ID,
        'aria-hidden': 'true',
        focusable: 'false',
        className: ['mw-panel-icon', active ? 'mw-panel-icon-active' : ''].filter(Boolean).join(' '),
      }, [
        h('rect', { key: 'a', x: 2, y: 2, width: 5, height: 5, rx: 1.3 }),
        h('rect', { key: 'b', x: 9, y: 2, width: 5, height: 5, rx: 1.3 }),
        h('rect', { key: 'c', x: 2, y: 9, width: 5, height: 5, rx: 1.3 }),
        h('rect', { key: 'd', x: 9, y: 9, width: 5, height: 5, rx: 1.3 }),
      ]);
    }

    // ---------------------------------------------------------------------
    // Reusable UI
    // ---------------------------------------------------------------------

    function GlassCard({ as, className, children, ...rest }) {
      return h(as || 'section', {
        ...rest,
        className: ['mw-card', 'mw-glass', className].filter(Boolean).join(' '),
      }, children);
    }

    function Button({ variant = 'secondary', className, children, ...rest }) {
      return h('button', {
        type: 'button',
        ...rest,
        className: ['mw-btn', `mw-btn-${variant}`, className].filter(Boolean).join(' '),
      }, children);
    }

    function EmptyState({ title, body }) {
      return h('div', { className: 'mw-empty' }, [
        h('div', { key: 'title', className: 'mw-empty-title' }, title),
        h('div', { key: 'body', className: 'mw-empty-body' }, body),
      ]);
    }

    function BrandName() {
      const value = usePrefs();
      const label = clean(value.displayName) || DEFAULT_NAME;
      return h('span', { className: 'mw-brand-name', title: t('panel.title') }, [
        h('span', { key: 'label', className: 'mw-brand-name-text' }, label),
        h('span', { key: 'dot', className: 'mw-brand-dot', 'aria-hidden': 'true' }),
      ]);
    }

    function RecentSessions({ sessions, onOpen }) {
      const visible = sessions.slice(0, 4);
      return h(GlassCard, {
        className: 'mw-recent',
        'aria-labelledby': 'mw-recent-title',
      }, [
        h('div', { key: 'head', className: 'mw-card-head' }, [
          h('div', { key: 'copy' }, [
            h('h2', { key: 'title', id: 'mw-recent-title', className: 'mw-card-title' }, t('recent.title')),
            h('div', { key: 'hint', className: 'mw-card-hint' }, t('recent.hint')),
          ]),
          h('span', { key: 'count', className: 'mw-count' }, String(sessions.length)),
        ]),
        visible.length === 0
          ? h(EmptyState, { key: 'empty', title: t('recent.emptyTitle'), body: t('recent.emptyBody') })
          : h('div', { key: 'list', className: 'mw-session-list' }, visible.map((session) => h('button', {
            key: session.id,
            type: 'button',
            className: 'mw-session',
            title: t('recent.open'),
            onClick: () => onOpen(session.id),
          }, [
            h('span', { key: 'main', className: 'mw-session-main' }, [
              h('span', { key: 'title-row', className: 'mw-session-title-row' }, [
                session.running ? h('span', { key: 'live', className: 'mw-live-dot', 'aria-hidden': 'true' }) : null,
                h('span', { key: 'title', className: 'mw-session-title' }, session.title),
              ]),
              h('span', { key: 'meta', className: 'mw-session-meta' },
                session.workspaceTitle || t('panel.local')),
            ]),
            h('span', { key: 'time', className: 'mw-session-time' }, formatRelative(session.timestamp)),
          ]))),
      ]);
    }

    function WorkspaceCard({ workspaces, onOpen, onAdd, busy }) {
      const visible = workspaces.slice(0, 4);
      return h(GlassCard, {
        className: 'mw-projects',
        'aria-labelledby': 'mw-projects-title',
      }, [
        h('div', { key: 'head', className: 'mw-card-head' }, [
          h('div', { key: 'copy' }, [
            h('h2', { key: 'title', id: 'mw-projects-title', className: 'mw-card-title' }, t('projects.title')),
            h('div', { key: 'hint', className: 'mw-card-hint' }, `${workspaces.length} ${t('projects.sessions')}`),
          ]),
          h(Button, {
            key: 'add',
            variant: 'ghost',
            className: 'mw-btn-small',
            onClick: onAdd,
            disabled: busy,
            'aria-busy': busy ? 'true' : 'false',
            title: t('projects.add'),
          }, [h(PlusIcon, { key: 'icon' }), h('span', { key: 'label' }, t('projects.add'))]),
        ]),
        visible.length === 0
          ? h(EmptyState, { key: 'empty', title: t('projects.empty'), body: t('projects.add') })
          : h('div', { key: 'grid', className: 'mw-project-grid' }, visible.map((workspace) => h('button', {
            key: workspace.workspaceId,
            type: 'button',
            className: 'mw-project',
            title: workspace.path || t('projects.open'),
            onClick: () => onOpen(workspace.workspaceId),
          }, [
            h('span', { key: 'name', className: 'mw-project-name' }, workspace.title),
            h('span', { key: 'path', className: 'mw-project-path' }, workspace.path || t('panel.local')),
            h('span', { key: 'meta', className: 'mw-project-meta' },
              `${workspace.sessionIds.length} ${t('projects.sessions')}`),
          ]))),
      ]);
    }

    function FocusCard({ value, onChange }) {
      return h(GlassCard, {
        className: 'mw-focus',
        'aria-labelledby': 'mw-focus-title',
      }, [
        h('div', { key: 'head', className: 'mw-card-head' }, [
          h('h2', { key: 'title', id: 'mw-focus-title', className: 'mw-card-title' }, t('focus.title')),
          h('span', { key: 'saved', className: 'mw-card-hint' }, t('focus.saved')),
        ]),
        h('textarea', {
          key: 'input',
          className: 'mw-focus-input',
          value,
          maxLength: 280,
          rows: 3,
          placeholder: t('focus.placeholder'),
          'aria-label': t('focus.title'),
          onChange: (event) => onChange(event.target.value),
        }),
      ]);
    }

    function OverviewCard({ usage, tasks, usageState, taskState, showUsage, showTasks }) {
      const usageReady = showUsage && usageState.status === 'ready' && usage !== null;
      const taskReady = showTasks && taskState.status === 'ready';
      const loading = (showUsage && usageState.status === 'loading') || (showTasks && taskState.status === 'loading');
      const empty = !usageReady && !taskReady;
      return h(GlassCard, {
        className: 'mw-overview',
        'aria-labelledby': 'mw-overview-title',
      }, [
        h('div', { key: 'head', className: 'mw-card-head' }, [
          h('div', { key: 'copy' }, [
            h('h2', { key: 'title', id: 'mw-overview-title', className: 'mw-card-title' }, t('overview.title')),
            h('div', { key: 'source', className: 'mw-card-hint' }, t('overview.source')),
          ]),
          usageReady && (usage.provider || usage.model)
            ? h('span', { key: 'model', className: 'mw-model' },
              [usage.provider, usage.model].filter(Boolean).join(' · '))
            : null,
        ]),
        usageReady ? h('div', { key: 'stats', className: 'mw-stats' }, [
          h('div', { key: 'calls', className: 'mw-stat' }, [
            h('span', { key: 'value', className: 'mw-stat-value' }, formatNumber(usage.calls)),
            h('span', { key: 'label', className: 'mw-stat-label' }, t('overview.calls')),
          ]),
          h('div', { key: 'tokens', className: 'mw-stat' }, [
            h('span', { key: 'value', className: 'mw-stat-value' }, formatCompact(usage.tokens)),
            h('span', { key: 'label', className: 'mw-stat-label' }, t('overview.tokens')),
          ]),
          h('div', { key: 'cost', className: 'mw-stat' }, [
            h('span', { key: 'value', className: 'mw-stat-value' },
              usage.cost == null ? '—' : formatMoney(usage.cost, 'CNY')),
            h('span', { key: 'label', className: 'mw-stat-label' }, t('overview.cost')),
          ]),
        ]) : null,
        usageReady && usage.balance ? h('div', { key: 'balance', className: 'mw-balance' },
          `${t('overview.balance')} ${formatMoney(usage.balance.value, usage.balance.currency)}`) : null,
        taskReady ? h('div', { key: 'tasks', className: 'mw-task-block' }, [
          h('div', { key: 'label', className: 'mw-task-title' },
            `${t('overview.tasks')} · ${formatNumber(tasks.total)}`),
          h('div', { key: 'row', className: 'mw-task-row' }, [
            ['todo', 'overview.todo'],
            ['running', 'overview.running'],
            ['done', 'overview.done'],
            ['failed', 'overview.failed'],
          ].map(([key, label]) => h('div', { key, className: 'mw-task-chip' }, [
            h('span', { key: 'count', className: 'mw-task-count' }, formatNumber(tasks[key])),
            h('span', { key: 'label', className: 'mw-task-label' }, t(label)),
          ]))),
        ]) : null,
        empty ? h('div', { key: 'empty', className: 'mw-overview-empty' },
          loading ? t('overview.loading') : t('overview.unavailable')) : null,
      ]);
    }

    const QUICK_ITEMS = [
      { id: 'task-board', icon: BoardIcon, title: 'quick.board', description: 'quick.boardDesc' },
      { id: 'schedules', icon: CalendarIcon, title: 'quick.schedules', description: 'quick.schedulesDesc' },
      { id: 'plugins', icon: PlugIcon, title: 'quick.plugins', description: 'quick.pluginsDesc' },
      { id: 'dsh-market', icon: SparkIcon, title: 'quick.market', description: 'quick.marketDesc' },
    ];

    function QuickAccess({ onOpen }) {
      return h(GlassCard, {
        className: 'mw-quick-card',
        'aria-labelledby': 'mw-quick-title',
      }, [
        h('div', { key: 'head', className: 'mw-card-head' }, [
          h('h2', { key: 'title', id: 'mw-quick-title', className: 'mw-card-title' }, t('quick.title')),
        ]),
        h('div', { key: 'grid', className: 'mw-quick-grid' }, QUICK_ITEMS.map((item) => {
          const Icon = item.icon;
          return h('button', {
            key: item.id,
            type: 'button',
            className: 'mw-quick',
            onClick: () => onOpen(item.id),
          }, [
            h('span', { key: 'icon', className: 'mw-quick-icon' }, h(Icon, { size: 16 })),
            h('span', { key: 'title', className: 'mw-quick-title' }, t(item.title)),
            h('span', { key: 'desc', className: 'mw-quick-desc' }, t(item.description)),
          ]);
        })),
      ]);
    }

    /* A tiny bridge between the DOM-level wheel and the React workbench panel. */
    const commandBus = {
      pending: false,
      listeners: new Set(),
      request() {
        this.pending = true;
        if (this.listeners.size === 0) return;
        this.pending = false;
        for (const listener of Array.from(this.listeners)) {
          try {
            listener(true);
          } catch {}
        }
      },
      subscribe(listener) {
        this.listeners.add(listener);
        if (this.pending) {
          this.pending = false;
          listener(true);
        }
        return () => {
          this.listeners.delete(listener);
        };
      },
    };

    function CommandPalette(props) {
      const sessions = Array.isArray(props.sessions) ? props.sessions : [];
      const workspaces = Array.isArray(props.workspaces) ? props.workspaces : [];
      const actions = props.actions || {};
      const [query, setQuery] = React.useState('');
      const [selected, setSelected] = React.useState(0);
      const inputRef = React.useRef(null);
      const previousFocus = React.useRef(null);

      const panelItems = React.useMemo(() => {
        if (typeof document === 'undefined') return [];
        const nodes = Array.from(document.querySelectorAll(
          '[data-pane="sidebar"] nav[class*="panelList"] button',
        ));
        return nodes.map((node) => {
          const label = (node.getAttribute('aria-label') || node.textContent || '')
            .replace(/(?:Ctrl|⌘|Alt|Shift)\+.*$/i, '')
            .replace(/[\u00b7|].*$/, '')
            .trim();
          return {
            group: t('command.panels'),
            label: label || t('command.panels'),
            meta: '',
            run: () => {
              try {
                node.click();
              } catch {}
            },
          };
        }).filter((item) => item.label);
      }, []);

      const items = React.useMemo(() => {
        const result = [];
        for (const session of sessions) {
          if (!session || session.archived) continue;
          const workspace = workspaces.find((entry) => entry.workspaceId === session.workspaceId);
          result.push({
            group: t('command.sessions'),
            label: session.title || t('recent.untitled'),
            meta: workspace ? (workspace.title || workspace.path || '') : (session.workspaceId || ''),
            run: () => actions.openSession?.(session.sessionId),
          });
        }
        for (const workspace of workspaces) {
          result.push({
            group: t('command.workspaces'),
            label: workspace.title || t('projects.untitled'),
            meta: workspace.path || '',
            run: () => actions.openWorkspace?.(workspace.workspaceId),
          });
        }
        result.push(...panelItems);
        result.push({
          group: t('command.actions'),
          label: t('action.new'),
          meta: t('panel.title'),
          run: () => actions.startSession?.(),
        });
        if (typeof actions.addWorkspace === 'function') {
          result.push({
            group: t('command.actions'),
            label: t('action.project'),
            meta: t('panel.local'),
            run: () => { actions.addWorkspace(); },
          });
        }
        return result;
      }, [sessions, workspaces, panelItems, actions]);

      const filtered = React.useMemo(() => {
        const needle = query.trim().toLowerCase();
        if (!needle) return items.slice(0, 12);
        return items.filter((item) => (
          `${item.label} ${item.meta} ${item.group}`.toLowerCase().includes(needle)
        )).slice(0, 12);
      }, [items, query]);

      React.useEffect(() => {
        previousFocus.current = document.activeElement;
        const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 40);
        return () => {
          window.clearTimeout(focusTimer);
          const previous = previousFocus.current;
          if (previous && typeof previous.focus === 'function') {
            try { previous.focus(); } catch {}
          }
        };
      }, []);

      React.useEffect(() => {
        setSelected(0);
      }, [query]);

      const close = () => props.onClose?.();
      const choose = (item) => {
        if (!item) return;
        close();
        window.setTimeout(() => { try { item.run(); } catch {} }, 0);
      };

      const onKeyDown = (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          close();
          return;
        }
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          setSelected((value) => Math.min(value + 1, Math.max(filtered.length - 1, 0)));
          return;
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          setSelected((value) => Math.max(value - 1, 0));
          return;
        }
        if (event.key === 'Enter') {
          event.preventDefault();
          choose(filtered[selected]);
        }
      };

      return h('div', {
        className: 'mw-command-layer',
        role: 'dialog',
        'aria-modal': 'true',
        'aria-label': t('command.title'),
        onMouseDown: (event) => {
          if (event.target === event.currentTarget) close();
        },
      }, [
        h('div', { key: 'panel', className: 'mw-command-panel' }, [
          h('div', { key: 'head', className: 'mw-command-head' }, [
            h(SearchIcon, { key: 'icon', size: 18 }),
            h('input', {
              key: 'input',
              ref: inputRef,
              className: 'mw-command-input',
              placeholder: t('command.placeholder'),
              value: query,
              onChange: (event) => setQuery(event.target.value),
              onKeyDown,
              'aria-label': t('command.title'),
            }),
            h('kbd', { key: 'esc', className: 'mw-command-kbd' }, 'Esc'),
          ]),
          h('div', { key: 'list', className: 'mw-command-list', role: 'listbox' }, filtered.length
            ? filtered.map((item, index) => h('button', {
                key: `${item.group}:${item.label}:${index}`,
                type: 'button',
                role: 'option',
                'aria-selected': index === selected ? 'true' : 'false',
                className: `mw-command-item${index === selected ? ' is-selected' : ''}`,
                onMouseEnter: () => setSelected(index),
                onClick: () => choose(item),
              }, [
                h('span', { key: 'label', className: 'mw-command-item-label' }, item.label),
                h('span', { key: 'meta', className: 'mw-command-item-meta' }, item.meta || item.group),
              ]))
            : h('div', { key: 'empty', className: 'mw-command-empty' }, t('command.empty'))),
          h('div', { key: 'foot', className: 'mw-command-foot' }, [
            h('span', { key: 'hint', }, '↑ ↓'),
            h('span', { key: 'enter', }, 'Enter'),
            h('span', { key: 'esc', }, 'Esc'),
          ]),
        ]),
      ]);
    }

    function WorkbenchPanel(props) {
      const actions = props.actions || {};
      const useSessionsHook = props.useSessions || (() => undefined);
      const useWorkspacesHook = props.useWorkspaces || (() => undefined);
      const sessionSnapshot = useSessionsHook((snapshot) => snapshot);
      const workspaceSnapshot = useWorkspacesHook((snapshot) => snapshot);
      const preferences = usePrefs();
      const now = useNow();
      const usageState = useJson('/api/dsh-usage/overview', preferences.showUsage);
      const taskState = useJson('/api/task-board/state', preferences.showTasks);
      const [busy, setBusy] = React.useState(false);
      const [error, setError] = React.useState('');
      const [commandOpen, setCommandOpen] = React.useState(false);
      const alive = React.useRef(true);

      React.useEffect(() => commandBus.subscribe(setCommandOpen), []);

      React.useEffect(() => () => {
        alive.current = false;
      }, []);

      const workspaces = React.useMemo(
        () => normalizeWorkspaces(workspaceSnapshot),
        [workspaceSnapshot],
      );
      const archived = React.useMemo(
        () => archivedSessionSet(workspaceSnapshot),
        [workspaceSnapshot],
      );
      const sessions = React.useMemo(
        () => normalizeSessions(sessionSnapshot, workspaces, archived),
        [sessionSnapshot, workspaces, archived],
      );
      const current = React.useMemo(() => currentSession(sessions), [sessions]);
      const currentWorkspace = workspaces.find((workspace) => workspace.workspaceId === current?.workspaceId)
        || workspaces[0]
        || null;
      const usage = React.useMemo(() => summarizeUsage(usageState.data), [usageState.data]);
      const tasks = React.useMemo(() => summarizeTasks(taskState.data), [taskState.data]);

      const startNew = () => {
        if (typeof actions.startSession === 'function') {
          actions.startSession(currentWorkspace?.workspaceId);
        }
      };

      const addProject = async () => {
        if (typeof actions.addWorkspace !== 'function') return;
        setError('');
        setBusy(true);
        const result = await actions.addWorkspace();
        if (!alive.current) return;
        setBusy(false);
        if (result && !result.ok && !result.cancelled) {
          setError(result.error === 'unavailable' ? t('hero.unavailable') : t('hero.failed'));
        }
      };

      const header = h('header', { key: 'header', className: 'mw-header' }, [
        h('div', { key: 'main', className: 'mw-header-main' }, [
          h('div', { key: 'eyebrow', className: 'mw-eyebrow' }, [
            h(Mark, { key: 'mark', size: 19 }),
            h('span', { key: 'brand', className: 'mw-eyebrow-text' }, `${DEFAULT_NAME} · ${t('panel.title')}`),
          ]),
          h('h1', { key: 'title', className: 'mw-title' }, t(greetingKey(now))),
          h('p', { key: 'subtitle', className: 'mw-subtitle' },
            clean(preferences.tagline) || DEFAULT_TAGLINE),
        ]),
        h('div', { key: 'meta', className: 'mw-header-meta' }, [
          h('span', { key: 'place', className: 'mw-pill', title: currentWorkspace?.path || t('panel.local') }, [
            h('span', { key: 'dot', className: 'mw-dot', 'aria-hidden': 'true' }),
            h('span', { key: 'text', className: 'mw-pill-text' }, currentWorkspace?.title || t('panel.local')),
          ]),
          h('span', { key: 'date', className: 'mw-date' }, formatDate(now)),
        ]),
      ]);

      const hero = h(GlassCard, {
        key: 'hero',
        className: 'mw-hero',
        'aria-labelledby': 'mw-hero-title',
      }, [
        h('div', { key: 'glow', className: 'mw-hero-glow', 'aria-hidden': 'true' }),
        h('div', { key: 'content', className: 'mw-hero-content' }, [
          h('div', { key: 'kicker', className: 'mw-kicker' }, t('brand.mark')),
          h('h2', { key: 'title', id: 'mw-hero-title', className: 'mw-hero-title' }, t('hero.title')),
          h('p', { key: 'body', className: 'mw-hero-body' }, t('hero.body')),
          h('div', { key: 'actions', className: 'mw-actions' }, [
            h(Button, {
              key: 'new',
              variant: 'primary',
              onClick: startNew,
            }, [h(ChatIcon, { key: 'icon', size: 16 }), h('span', { key: 'label' }, t('hero.new'))]),
            h(Button, {
              key: 'project',
              variant: 'secondary',
              onClick: addProject,
              disabled: busy,
              'aria-busy': busy ? 'true' : 'false',
            }, [
              h(FolderIcon, { key: 'icon', size: 16 }),
              h('span', { key: 'label' }, busy ? t('hero.working') : t('hero.project')),
            ]),
          ]),
          error ? h('div', { key: 'error', className: 'mw-error', role: 'alert' }, error) : null,
        ]),
      ]);

      const left = h('div', { key: 'left', className: 'mw-col' }, [
        preferences.showRecent ? h(RecentSessions, {
          key: 'recent',
          sessions,
          onOpen: (sessionId) => actions.openSession?.(sessionId),
        }) : null,
        h(WorkspaceCard, {
          key: 'projects',
          workspaces,
          onOpen: (workspaceId) => actions.openWorkspace?.(workspaceId),
          onAdd: addProject,
          busy,
        }),
      ]);

      const right = h('div', { key: 'right', className: 'mw-col' }, [
        h(FocusCard, {
          key: 'focus',
          value: preferences.focus,
          onChange: (value) => updatePrefs({ focus: value }),
        }),
        (preferences.showUsage || preferences.showTasks) ? h(OverviewCard, {
          key: 'overview',
          usage,
          tasks,
          usageState,
          taskState,
          showUsage: preferences.showUsage,
          showTasks: preferences.showTasks,
        }) : null,
        h(QuickAccess, {
          key: 'quick',
          onOpen: (panelId) => actions.openPanel?.(panelId),
        }),
      ]);

      return h('div', {
        className: 'mw-root',
        'data-dsh-plugin': PANEL_ID,
        role: 'region',
        'aria-label': t('panel.title'),
      }, [
        h('div', { key: 'shell', className: 'mw-shell' }, [
          header,
          hero,
          h('div', { key: 'grid', className: 'mw-grid' }, [left, right]),
          h('footer', { key: 'footer', className: 'mw-footer' }, [
            h('span', { key: 'note', className: 'mw-footer-note' }, t('footer.note')),
            h('span', { key: 'local', className: 'mw-footer-note' }, t('settings.saved')),
          ]),
        ]),
        commandOpen ? h(CommandPalette, {
          key: 'command',
          sessions,
          workspaces,
          actions,
          onClose: () => setCommandOpen(false),
        }) : null,
      ]);
    }

    function SettingsPanel() {
      const preferences = usePrefs();
      const [resetNote, setResetNote] = React.useState(false);
      const reset = () => {
        resetPrefs();
        setResetNote(true);
        window.setTimeout(() => setResetNote(false), 1800);
      };
      return h('div', { className: 'mw-settings' }, [
        h('header', { key: 'head', className: 'mw-settings-head' }, [
          h(Mark, { key: 'mark', size: 40 }),
          h('div', { key: 'copy', className: 'mw-settings-copy' }, [
            h('h2', { key: 'title', className: 'mw-settings-title' }, t('settings.title')),
            h('p', { key: 'subtitle', className: 'mw-settings-subtitle' }, t('settings.subtitle')),
          ]),
        ]),
        h('div', { key: 'name', className: 'mw-field' }, [
          h('label', { key: 'label', className: 'mw-label', htmlFor: 'mw-setting-name' }, t('settings.name')),
          h('input', {
            key: 'input',
            id: 'mw-setting-name',
            className: 'mw-input',
            type: 'text',
            value: preferences.displayName,
            maxLength: 24,
            onChange: (event) => updatePrefs({ displayName: event.target.value }),
            placeholder: DEFAULT_NAME,
          }),
          h('span', { key: 'hint', className: 'mw-hint' }, t('settings.nameHint')),
        ]),
        h('div', { key: 'tagline', className: 'mw-field' }, [
          h('label', { key: 'label', className: 'mw-label', htmlFor: 'mw-setting-tagline' }, t('settings.tagline')),
          h('input', {
            key: 'input',
            id: 'mw-setting-tagline',
            className: 'mw-input',
            type: 'text',
            value: preferences.tagline,
            maxLength: 48,
            onChange: (event) => updatePrefs({ tagline: event.target.value }),
            placeholder: DEFAULT_TAGLINE,
          }),
          h('span', { key: 'hint', className: 'mw-hint' }, t('settings.taglineHint')),
        ]),
        h('div', { key: 'focus', className: 'mw-field' }, [
          h('label', { key: 'label', className: 'mw-label', htmlFor: 'mw-setting-focus' }, t('settings.focus')),
          h('textarea', {
            key: 'input',
            id: 'mw-setting-focus',
            className: 'mw-textarea',
            value: preferences.focus,
            maxLength: 280,
            rows: 3,
            onChange: (event) => updatePrefs({ focus: event.target.value }),
            placeholder: t('focus.placeholder'),
          }),
          h('span', { key: 'hint', className: 'mw-hint' }, t('settings.focusHint')),
        ]),
        h('div', { key: 'toggles', className: 'mw-toggle-list' }, [
          ToggleRow({
            key: 'recent',
            label: t('settings.showRecent'),
            hint: t('settings.showRecentHint'),
            checked: preferences.showRecent,
            onChange: (checked) => updatePrefs({ showRecent: checked }),
          }),
          ToggleRow({
            key: 'usage',
            label: t('settings.showUsage'),
            hint: t('settings.showUsageHint'),
            checked: preferences.showUsage,
            onChange: (checked) => updatePrefs({ showUsage: checked }),
          }),
          ToggleRow({
            key: 'tasks',
            label: t('settings.showTasks'),
            hint: t('settings.showTasksHint'),
            checked: preferences.showTasks,
            onChange: (checked) => updatePrefs({ showTasks: checked }),
          }),
        ]),
        h('div', { key: 'actions', className: 'mw-settings-actions' }, [
          h(Button, { key: 'reset', variant: 'ghost', onClick: reset }, t('settings.reset')),
          h('span', { key: 'saved', className: 'mw-saved', role: 'status' },
            resetNote ? t('settings.reset') : t('settings.saved')),
        ]),
        h('p', { key: 'note', className: 'mw-settings-note' }, t('settings.localNote')),
      ]);
    }

    function ToggleRow({ label, hint, checked, onChange }) {
      return h('div', { className: 'mw-toggle-row' }, [
        h('div', { key: 'copy', className: 'mw-toggle-copy' }, [
          h('div', { key: 'label', className: 'mw-toggle-label' }, label),
          h('div', { key: 'hint', className: 'mw-toggle-hint' }, hint),
        ]),
        h('button', {
          key: 'switch',
          type: 'button',
          role: 'switch',
          'aria-checked': checked ? 'true' : 'false',
          'aria-label': label,
          className: 'mw-switch',
          onClick: () => onChange(!checked),
        }, h('span', { key: 'thumb', className: 'mw-switch-thumb', 'aria-hidden': 'true' })),
      ]);
    }

    // ---------------------------------------------------------------------
    // Styles
    // ---------------------------------------------------------------------

    const CSS = `
.mw-root {
  --mw-radius: 22px;
  --mw-radius-sm: 14px;
  --mw-ease: cubic-bezier(.2, .7, .2, 1);
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: auto;
  padding: clamp(20px, 3vw, 42px);
  color: var(--dsw-alias-label-primary);
  font-family: var(--dsw-font-family, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI Variable", "Segoe UI", sans-serif);
  container-type: inline-size;
  scrollbar-color: var(--dsw-alias-border-l3, var(--dsw-alias-border-l2)) transparent;
}
.mw-root * { box-sizing: border-box; }
.mw-shell {
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.mw-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: 2px 2px 0;
}
.mw-header-main { min-width: 0; }
.mw-eyebrow {
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.mw-eyebrow-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mw-title {
  margin: 12px 0 6px;
  font-size: clamp(32px, 4.4vw, 48px);
  line-height: 1.02;
  letter-spacing: -.045em;
  font-weight: 650;
  color: var(--dsw-alias-label-primary);
}
.mw-subtitle {
  margin: 0;
  max-width: 62ch;
  color: var(--dsw-alias-label-secondary);
  font-size: 14px;
  line-height: 1.55;
  letter-spacing: .002em;
}
.mw-header-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex: none;
  padding-top: 2px;
}
.mw-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 260px;
  min-height: 30px;
  padding: 5px 11px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 9%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-1) 62%, transparent);
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}
.mw-pill-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mw-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex: none;
  background: var(--dsw-alias-brand-primary);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--dsw-alias-brand-primary) 16%, transparent);
}
.mw-date { color: var(--dsw-alias-label-tertiary); font-size: 12px; letter-spacing: .01em; }
.mw-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(300px, .92fr);
  gap: 20px;
  align-items: start;
}
.mw-col { display: flex; flex-direction: column; gap: 20px; min-width: 0; }
.mw-card {
  position: relative;
  min-width: 0;
  border-radius: var(--mw-radius);
  overflow: hidden;
}
.mw-glass {
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-1) 76%, transparent);
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 10%, transparent);
  box-shadow:
    0 22px 70px color-mix(in srgb, var(--dsw-alias-label-primary) 11%, transparent),
    inset 0 1px 0 color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent);
  backdrop-filter: blur(24px) saturate(145%);
  -webkit-backdrop-filter: blur(24px) saturate(145%);
}
.mw-hero {
  padding: clamp(24px, 3.2vw, 38px);
  border-radius: 28px;
}
.mw-hero-glow {
  position: absolute;
  width: 520px;
  height: 380px;
  right: -130px;
  top: -190px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--dsw-alias-brand-primary) 26%, transparent) 0%, transparent 68%);
  pointer-events: none;
}
.mw-hero-content { position: relative; }
.mw-kicker {
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  font-weight: 650;
  letter-spacing: .16em;
  text-transform: uppercase;
}
.mw-hero-title {
  margin: 12px 0 8px;
  font-size: clamp(26px, 3.4vw, 38px);
  line-height: 1.08;
  letter-spacing: -.04em;
  font-weight: 650;
}
.mw-hero-body {
  margin: 0;
  max-width: 58ch;
  color: var(--dsw-alias-label-secondary);
  font-size: 14px;
  line-height: 1.6;
}
.mw-actions { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 22px; }
.mw-error {
  margin-top: 12px;
  color: var(--dsw-alias-state-error-primary);
  font-size: 12px;
  line-height: 1.5;
}
.mw-btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 38px;
  padding: 0 15px;
  border: 1px solid transparent;
  border-radius: 12px;
  background: transparent;
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color .16s var(--mw-ease), border-color .16s var(--mw-ease), box-shadow .16s var(--mw-ease), transform .16s var(--mw-ease);
}
.mw-btn:hover { transform: translateY(-1px); }
.mw-btn:active { transform: translateY(0); }
.mw-btn:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 2px;
}
.mw-btn:disabled { opacity: .55; cursor: progress; transform: none; }
.mw-btn-primary {
  background: var(--dsw-alias-button-primary-fill, var(--dsw-alias-brand-primary));
  color: var(--dsw-alias-label-primary-foreground, var(--dsw-alias-label-primary-inverted, #fff));
  box-shadow: 0 10px 26px color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, transparent);
}
.mw-btn-primary:hover { background: var(--dsw-alias-button-primary-hover, var(--dsw-alias-brand-primary)); }
.mw-btn-secondary {
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 66%, transparent);
  border-color: color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent);
}
.mw-btn-secondary:hover { background: var(--dsw-alias-interactive-bg-hover); }
.mw-btn-ghost {
  color: var(--dsw-alias-label-secondary);
  min-height: 30px;
  padding: 0 9px;
  border-radius: 9px;
  font-size: 12px;
}
.mw-btn-ghost:hover {
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-interactive-bg-hover);
}
.mw-btn-small { min-height: 30px; padding: 0 8px; font-size: 12px; }
.mw-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 14px;
}
.mw-card-title {
  margin: 0;
  font-size: 14px;
  font-weight: 650;
  line-height: 1.35;
  letter-spacing: -.01em;
}
.mw-card-hint {
  margin-top: 3px;
  color: var(--dsw-alias-label-tertiary);
  font-size: 11px;
  line-height: 1.4;
}
.mw-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 7px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent);
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.mw-recent, .mw-projects, .mw-focus, .mw-overview, .mw-quick-card { padding: 20px; }
.mw-session-list { display: flex; flex-direction: column; gap: 2px; }
.mw-session {
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  width: calc(100% + 12px);
  margin: 0 -6px;
  padding: 10px 8px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color .14s var(--mw-ease);
}
.mw-session:hover { background: var(--dsw-alias-interactive-bg-hover); }
.mw-session:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: -2px; }
.mw-session-main { display: flex; flex-direction: column; gap: 3px; min-width: 0; flex: 1; }
.mw-session-title-row { display: flex; align-items: center; gap: 7px; min-width: 0; }
.mw-live-dot {
  width: 6px;
  height: 6px;
  flex: none;
  border-radius: 50%;
  background: var(--dsw-alias-state-success-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-state-success-primary) 16%, transparent);
}
.mw-session-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 560;
  letter-spacing: -.006em;
}
.mw-session-meta {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--dsw-alias-label-tertiary);
  font-size: 11px;
}
.mw-session-time {
  flex: none;
  color: var(--dsw-alias-label-tertiary);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.mw-empty {
  padding: 16px 14px;
  border: 1px dashed color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent);
  border-radius: var(--mw-radius-sm);
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 36%, transparent);
}
.mw-empty-title { font-size: 13px; font-weight: 600; }
.mw-empty-body { margin-top: 4px; color: var(--dsw-alias-label-tertiary); font-size: 12px; line-height: 1.5; }
.mw-project-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; }
.mw-project {
  appearance: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  min-width: 0;
  padding: 12px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 9%, transparent);
  border-radius: var(--mw-radius-sm);
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 44%, transparent);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color .14s var(--mw-ease), border-color .14s var(--mw-ease), transform .14s var(--mw-ease);
}
.mw-project:hover {
  background: var(--dsw-alias-interactive-bg-hover);
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, transparent);
  transform: translateY(-1px);
}
.mw-project:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
.mw-project-name {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 600;
}
.mw-project-path {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--dsw-alias-label-tertiary);
  font-size: 10.5px;
}
.mw-project-meta { color: var(--dsw-alias-label-tertiary); font-size: 10.5px; }
.mw-focus-input, .mw-input, .mw-textarea {
  width: 100%;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 11%, transparent);
  border-radius: var(--mw-radius-sm);
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 58%, transparent);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 13px;
  line-height: 1.55;
  outline: none;
  transition: border-color .16s var(--mw-ease), background-color .16s var(--mw-ease), box-shadow .16s var(--mw-ease);
}
.mw-focus-input { min-height: 88px; padding: 12px; resize: vertical; }
.mw-input { height: 38px; padding: 0 12px; }
.mw-textarea { min-height: 84px; padding: 10px 12px; resize: vertical; }
.mw-focus-input::placeholder, .mw-input::placeholder, .mw-textarea::placeholder { color: var(--dsw-alias-label-tertiary); }
.mw-focus-input:focus, .mw-input:focus, .mw-textarea:focus {
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 54%, transparent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, transparent);
}
.mw-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.mw-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  padding: 10px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent);
  border-radius: 12px;
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 42%, transparent);
}
.mw-stat-value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 17px;
  font-weight: 650;
  letter-spacing: -.025em;
  font-variant-numeric: tabular-nums;
}
.mw-stat-label { color: var(--dsw-alias-label-tertiary); font-size: 10.5px; }
.mw-balance {
  margin-top: 9px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.mw-task-block { margin-top: 13px; }
.mw-task-title {
  color: var(--dsw-alias-label-tertiary);
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: .03em;
}
.mw-task-row { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; margin-top: 7px; }
.mw-task-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  min-width: 0;
  padding: 7px 4px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 32%, transparent);
}
.mw-task-count { font-size: 14px; font-weight: 650; font-variant-numeric: tabular-nums; }
.mw-task-label { color: var(--dsw-alias-label-tertiary); font-size: 10px; }
.mw-model {
  max-width: 58%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--dsw-alias-label-tertiary);
  font-size: 10.5px;
}
.mw-overview-empty {
  margin-top: 4px;
  color: var(--dsw-alias-label-tertiary);
  font-size: 11.5px;
  line-height: 1.5;
}
.mw-quick-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; }
.mw-quick {
  appearance: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  min-width: 0;
  padding: 12px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent);
  border-radius: var(--mw-radius-sm);
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 40%, transparent);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color .14s var(--mw-ease), border-color .14s var(--mw-ease), transform .14s var(--mw-ease);
}
.mw-quick:hover {
  background: var(--dsw-alias-interactive-bg-hover);
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 20%, transparent);
  transform: translateY(-1px);
}
.mw-quick:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
.mw-quick-icon { color: var(--dsw-alias-brand-primary); display: inline-flex; margin-bottom: 3px; }
.mw-quick-title { font-size: 12.5px; font-weight: 600; }
.mw-quick-desc { color: var(--dsw-alias-label-tertiary); font-size: 10.5px; line-height: 1.35; }
.mw-footer { display: flex; justify-content: space-between; gap: 16px; padding: 0 4px 4px; }
.mw-footer-note { color: var(--dsw-alias-label-tertiary); font-size: 10.5px; letter-spacing: .02em; }
.mw-settings { display: flex; flex-direction: column; gap: 18px; max-width: 760px; }
.mw-settings-head { display: flex; align-items: center; gap: 14px; padding-bottom: 4px; }
.mw-settings-copy { min-width: 0; }
.mw-settings-title { margin: 0; font-size: 20px; font-weight: 650; letter-spacing: -.02em; }
.mw-settings-subtitle { margin: 4px 0 0; color: var(--dsw-alias-label-secondary); font-size: 12.5px; line-height: 1.5; }
.mw-field { display: flex; flex-direction: column; gap: 6px; }
.mw-label { font-size: 12px; font-weight: 600; }
.mw-hint { color: var(--dsw-alias-label-tertiary); font-size: 11px; line-height: 1.45; }
.mw-toggle-list { display: flex; flex-direction: column; border-top: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent); }
.mw-toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 13px 0;
  border-bottom: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent);
}
.mw-toggle-copy { min-width: 0; }
.mw-toggle-label { font-size: 12.5px; font-weight: 600; }
.mw-toggle-hint { margin-top: 3px; color: var(--dsw-alias-label-tertiary); font-size: 11px; line-height: 1.45; }
.mw-switch {
  appearance: none;
  position: relative;
  width: 38px;
  height: 22px;
  flex: none;
  padding: 0;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 10%, transparent);
  cursor: pointer;
  transition: background-color .16s var(--mw-ease), border-color .16s var(--mw-ease);
}
.mw-switch[aria-checked="true"] {
  background: var(--dsw-alias-brand-primary);
  border-color: var(--dsw-alias-brand-primary);
}
.mw-switch:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
.mw-switch-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--dsw-alias-label-primary-foreground, #fff);
  box-shadow: 0 1px 3px color-mix(in srgb, var(--dsw-alias-label-primary) 24%, transparent);
  transition: transform .16s var(--mw-ease);
}
.mw-switch[aria-checked="true"] .mw-switch-thumb { transform: translateX(16px); }
.mw-settings-actions { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.mw-saved { color: var(--dsw-alias-label-tertiary); font-size: 11px; }
.mw-settings-note { margin: 0; color: var(--dsw-alias-label-tertiary); font-size: 11px; line-height: 1.5; }
.mw-brand-name {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -.01em;
}
.mw-brand-name-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mw-brand-dot {
  width: 5px;
  height: 5px;
  flex: none;
  border-radius: 50%;
  background: var(--dsw-alias-label-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-label-primary) 10%, transparent);
  opacity: .5;
}
.mw-mark { display: block; flex: none; filter: drop-shadow(0 6px 14px color-mix(in srgb, var(--dsw-alias-label-primary) 10%, transparent)); }
.mw-icon { display: block; flex: none; }
.mw-panel-icon { display: block; }
.mw-panel-icon-active rect:first-child {
  fill: color-mix(in srgb, var(--dsw-alias-brand-primary) 20%, transparent);
  stroke: var(--dsw-alias-brand-primary);
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .mw-glass { background: color-mix(in srgb, var(--dsw-alias-bg-layer-1) 94%, transparent); }
}
@container (max-width: 820px) {
  .mw-grid { grid-template-columns: minmax(0, 1fr); }
  .mw-header { flex-direction: column; gap: 14px; }
  .mw-header-meta { align-items: flex-start; flex-direction: row; flex-wrap: wrap; }
  .mw-project-grid, .mw-quick-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@container (max-width: 520px) {
  .mw-root { padding: 16px; }
  .mw-title { font-size: 30px; }
  .mw-project-grid, .mw-quick-grid { grid-template-columns: minmax(0, 1fr); }
  .mw-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .mw-footer { flex-direction: column; gap: 4px; }
}
@media (prefers-reduced-motion: reduce) {
  .mw-root *, .mw-root *::before, .mw-root *::after {
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
    animation-duration: .01ms !important;
  }
}

/* ── Sidebar: macOS surface ─────────────────────────────────────────
   Native menus are reused; only their surface and collapsed layout change. */
html[data-mine-sidebar="on"] [data-pane="sidebar"] {
  --mw-ease: cubic-bezier(.22,.61,.36,1);
  --mw-spring: cubic-bezier(.34,1.56,.64,1);
  overflow: visible !important;
  background: transparent !important;
  border-right: 0 !important;
}

html[data-mine-sidebar="on"] .mw-sidebar-surface [class*="brand"] {
  min-width: 0;
}

html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="false"] .mw-sidebar-surface [class*="panelRow"],
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="false"] .mw-sidebar-surface [class*="newSession"],
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="false"] .mw-sidebar-surface button[class*="toggle"] {
  transform: none !important;
}

html[data-mine-sidebar="on"] .mw-sidebar-surface {
  --mw-sidebar-edge: color-mix(in srgb, var(--dsw-alias-label-primary) 10%, transparent);
  margin: 10px 8px 10px 10px !important;
  height: calc(100% - 20px) !important;
  width: auto !important;
  padding: 10px 8px 8px !important;
  border: 1px solid var(--mw-sidebar-edge);
  border-radius: 24px;
  background:
    linear-gradient(145deg, color-mix(in srgb, #fff 34%, transparent), transparent 42%),
    color-mix(in srgb, var(--dsw-specific-sidebar-fill) 92%, transparent) !important;
  box-shadow:
    0 26px 64px color-mix(in srgb, var(--dsw-alias-label-primary) 13%, transparent),
    0 2px 8px color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent),
    inset 0 1px 0 color-mix(in srgb, #fff 58%, transparent);
  -webkit-backdrop-filter: blur(30px) saturate(128%);
  backdrop-filter: blur(30px) saturate(128%);
  overflow: hidden !important;
  transition: margin .25s ease, border-radius .25s ease, background .25s ease;
}

html[data-mine-sidebar="on"] .mw-sidebar-surface [class*="logoRow"] {
  height: 44px !important;
  margin: 0 0 7px !important;
  padding: 0 2px 4px !important;
  gap: 8px !important;
  overflow: visible !important;
  border: 0 !important;
  box-shadow: none !important;
}

html[data-mine-sidebar="on"] .mw-sidebar-surface [class*="newSession"] {
  margin-top: 8px !important;
  border: 0 !important;
  border-radius: 13px !important;
  background: transparent !important;
  box-shadow: none !important;
  transition: background .2s var(--mw-ease), color .18s var(--mw-ease);
}
html[data-mine-sidebar="on"] .mw-sidebar-surface [class*="newSession"]:hover {
  background: color-mix(in srgb, var(--dsw-specific-sidebar-fill) 38%, transparent) !important;
  box-shadow: none !important;
}

html[data-mine-sidebar="on"] .mw-sidebar-surface nav[class*="panelList"] {
  gap: 3px !important;
  padding: 2px !important;
}

html[data-mine-sidebar="on"] .mw-sidebar-surface [class*="panelRow"] {
  min-height: 36px !important;
  border-radius: 12px !important;
  padding: 0 10px !important;
  color: var(--dsw-alias-label-secondary) !important;
  background: transparent !important;
  transition: background .18s var(--mw-ease), color .18s var(--mw-ease), box-shadow .2s var(--mw-ease);
}

html[data-mine-sidebar="on"] .mw-sidebar-surface [class*="panelRow"]:hover {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent) !important;
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, #fff 42%, transparent),
    0 2px 8px color-mix(in srgb, var(--dsw-alias-label-primary) 4%, transparent);
}

html[data-mine-sidebar="on"] .mw-sidebar-surface [class*="panelActive"] {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 11%, transparent) !important;
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--dsw-alias-label-primary) 10%, transparent),
    inset 0 1px 0 color-mix(in srgb, #fff 42%, transparent);
}

html[data-mine-sidebar="on"] .mw-sidebar-surface [class*="regionArea"],
html[data-mine-sidebar="on"] .mw-sidebar-surface [class*="footArea"] {
  border-color: color-mix(in srgb, var(--dsw-alias-label-primary) 9%, transparent) !important;
}

html[data-mine-sidebar="on"] .mw-sidebar-surface [class*="regionArea"] {
  margin-top: 7px !important;
  padding-top: 2px !important;
}

html[data-mine-sidebar="on"] .mw-sidebar-surface [class*="footArea"] {
  margin-top: 4px !important;
  padding-top: 6px !important;
}

html[data-mine-sidebar="on"] .mw-sidebar-surface button,
html[data-mine-sidebar="on"] .mw-sidebar-surface a {
  position: relative;
}

html[data-mine-sidebar="on"] .mw-sidebar-surface button::before,
html[data-mine-sidebar="on"] .mw-sidebar-surface a::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(150px circle at var(--mw-mx, 50%) var(--mw-my, 50%),
    color-mix(in srgb, #fff 38%, transparent), transparent 72%);
  transition: opacity .2s ease;
  z-index: 0;
}
html[data-mine-sidebar="on"] .mw-sidebar-surface button:hover::before,
html[data-mine-sidebar="on"] .mw-sidebar-surface a:hover::before {
  opacity: 1;
}
html[data-mine-sidebar="on"] .mw-sidebar-surface button > *,
html[data-mine-sidebar="on"] .mw-sidebar-surface a > * {
  position: relative;
  z-index: 1;
}

html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] .mw-sidebar-surface {
  margin: 0 !important;
  height: 100% !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
  overflow: visible !important;
}

/* Fixed descendants must resolve against the viewport, not a filtered or
   transformed rail. */
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"],
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] > *,
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] .mw-sidebar-surface,
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] nav[class*="panelList"] {
  transform: none !important;
  filter: none !important;
  perspective: none !important;
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
}

html[data-mine-sidebar="on"] [data-pane="sidebar"] button[class*="toggle"] {
  position: static !important;
  top: auto !important;
  left: auto !important;
  width: 30px !important;
  height: 30px !important;
  margin-left: auto !important;
  border-radius: 10px !important;
  z-index: auto !important;
  color: var(--dsw-alias-label-secondary) !important;
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  background: transparent !important;
  transition: background .18s ease, color .18s ease, transform .18s ease;
}
html[data-mine-sidebar="on"] [data-pane="sidebar"] button[class*="toggle"]:hover {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent) !important;
}

html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] nav[class*="panelList"] {
  display: block !important;
  position: fixed !important;
  left: var(--mw-wheel-cx, 128px) !important;
  top: var(--mw-wheel-cy, 50vh) !important;
  width: 0 !important;
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  z-index: 82 !important;
  overflow: visible !important;
  pointer-events: none !important;
}

html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] nav[class*="panelList"] button[data-mw-wheel-item] {
  display: inline-flex !important;
  position: absolute !important;
  left: var(--mw-x, 0px) !important;
  top: var(--mw-y, 0px) !important;
  width: 54px !important;
  height: 54px !important;
  min-width: 54px !important;
  min-height: 54px !important;
  padding: 0 !important;
  margin: 0 !important;
  align-items: center;
  justify-content: center;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent) !important;
  border-radius: 50% !important;
  color: var(--dsw-alias-label-primary) !important;
  background:
    linear-gradient(150deg, color-mix(in srgb, #fff 38%, transparent), transparent 54%),
    color-mix(in srgb, var(--dsw-specific-sidebar-fill) 82%, transparent) !important;
  box-shadow:
    0 10px 24px color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent),
    inset 0 1px 0 color-mix(in srgb, #fff 56%, transparent);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  backdrop-filter: blur(24px) saturate(150%);
  transform: translate(-50%, -50%);
  pointer-events: auto !important;
  overflow: visible !important;
  z-index: 84 !important;
  touch-action: none;
  transition:
    transform .32s var(--mw-spring, cubic-bezier(.34,1.56,.64,1)),
    background .22s var(--mw-ease, cubic-bezier(.22,.61,.36,1)),
    border-color .22s var(--mw-ease, cubic-bezier(.22,.61,.36,1)),
    box-shadow .26s var(--mw-ease, cubic-bezier(.22,.61,.36,1)),
    opacity .2s var(--mw-ease, cubic-bezier(.22,.61,.36,1));
}

html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] button[class*="newSession"][data-mw-wheel-item] {
  display: inline-flex !important;
  position: fixed !important;
  left: calc(var(--mw-wheel-cx, 128px) + var(--mw-x, 0px)) !important;
  top: calc(var(--mw-wheel-cy, 50vh) + var(--mw-y, 0px)) !important;
  width: 54px !important;
  height: 54px !important;
  min-width: 54px !important;
  min-height: 54px !important;
  padding: 0 !important;
  margin: 0 !important;
  align-items: center;
  justify-content: center;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent) !important;
  border-radius: 50% !important;
  color: var(--dsw-alias-label-primary) !important;
  background:
    linear-gradient(150deg, color-mix(in srgb, #fff 38%, transparent), transparent 54%),
    color-mix(in srgb, var(--dsw-specific-sidebar-fill) 82%, transparent) !important;
  box-shadow:
    0 10px 24px color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent),
    inset 0 1px 0 color-mix(in srgb, #fff 56%, transparent);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  backdrop-filter: blur(24px) saturate(150%);
  transform: translate(-50%, -50%);
  pointer-events: auto !important;
  overflow: visible !important;
  z-index: 84 !important;
  touch-action: none;
  transition:
    transform .32s var(--mw-spring, cubic-bezier(.34,1.56,.64,1)),
    background .22s var(--mw-ease, cubic-bezier(.22,.61,.36,1)),
    border-color .22s var(--mw-ease, cubic-bezier(.22,.61,.36,1)),
    box-shadow .26s var(--mw-ease, cubic-bezier(.22,.61,.36,1));
}

html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] button[data-mw-wheel-item]:hover,
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] button[data-mw-wheel-item]:focus-visible {
  border-color: color-mix(in srgb, var(--dsw-alias-label-primary) 26%, transparent) !important;
  background:
    linear-gradient(150deg, color-mix(in srgb, #fff 54%, transparent), transparent 52%),
    color-mix(in srgb, var(--dsw-specific-sidebar-fill) 94%, transparent) !important;
  box-shadow:
    0 14px 34px color-mix(in srgb, var(--dsw-alias-label-primary) 18%, transparent),
    inset 0 1px 0 color-mix(in srgb, #fff 70%, transparent);
  transform: translate(-50%, -50%) scale(1.055);
}

html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] [data-mw-wheel-item]::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(90px circle at var(--mw-mx, 50%) var(--mw-my, 50%),
    color-mix(in srgb, #fff 64%, transparent), transparent 64%);
  transition: opacity .2s var(--mw-ease);
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] [data-mw-wheel-item]:hover::before,
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] [data-mw-wheel-item]:focus-visible::before {
  opacity: 1;
}

html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] [data-mw-wheel-item]::after {
  content: attr(data-mw-label);
  position: absolute;
  left: 50%;
  top: calc(100% + 6px);
  transform: translateX(-50%);
  width: max-content;
  max-width: 76px;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: none;
  box-shadow: none;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: .005em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: .82;
  pointer-events: none;
  text-shadow: 0 1px 2px color-mix(in srgb, var(--dsw-specific-sidebar-fill) 80%, transparent);
  transition: opacity .2s var(--mw-ease), color .2s var(--mw-ease), transform .24s var(--mw-spring);
  z-index: 90;
}

html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] [data-mw-wheel-item]:hover::after,
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] [data-mw-wheel-item]:focus-visible::after {
  opacity: 1;
  color: var(--dsw-alias-label-primary);
  transform: translateX(-50%) translateY(1px);
}

html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] [data-mw-wheel-item] svg {
  width: 18px;
  height: 18px;
  opacity: .86;
}

html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] [data-mw-wheel-item] [class*="panelTitle"],
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] [data-mw-wheel-item] [class*="newSessionLabel"],
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] [data-mw-wheel-item] [class*="newSessionShortcut"] {
  display: none !important;
}

html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] [data-mw-wheel-item] [class*="panelGlyph"] {
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
}

html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] button[class*="toggle"] {
  position: fixed !important;
  left: calc(var(--mw-wheel-cx, 128px) - 27px) !important;
  top: calc(var(--mw-wheel-cy, 50vh) - 27px) !important;
  width: 54px !important;
  height: 54px !important;
  margin: 0 !important;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 18%, transparent) !important;
  border-radius: 50% !important;
  color: var(--dsw-alias-label-primary) !important;
  background:
    linear-gradient(145deg, color-mix(in srgb, #fff 44%, transparent), transparent 52%),
    color-mix(in srgb, var(--dsw-specific-sidebar-fill) 90%, transparent) !important;
  box-shadow:
    0 16px 40px color-mix(in srgb, var(--dsw-alias-label-primary) 22%, transparent),
    inset 0 1px 0 color-mix(in srgb, #fff 68%, transparent) !important;
  -webkit-backdrop-filter: blur(28px) saturate(155%);
  backdrop-filter: blur(28px) saturate(155%);
  display: inline-flex !important;
  visibility: visible !important;
  opacity: 1 !important;
  pointer-events: auto !important;
  cursor: grab;
  touch-action: none;
  z-index: 94 !important;
  transition: transform .26s var(--mw-spring), box-shadow .24s var(--mw-ease), background .24s var(--mw-ease);
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] button[class*="toggle"]:hover {
  transform: scale(1.045);
  box-shadow:
    0 20px 48px color-mix(in srgb, var(--dsw-alias-label-primary) 26%, transparent),
    inset 0 1px 0 color-mix(in srgb, #fff 82%, transparent) !important;
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] button[class*="toggle"] [class*="panelIcon"] {
  display: none !important;
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] button[class*="toggle"]::before {
  content: 'M';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dsw-alias-label-primary);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", sans-serif;
  font-size: 19px;
  font-weight: 650;
  font-synthesis: none;
  line-height: 1;
  letter-spacing: -.045em;
  opacity: 1;
  transition: opacity .16s ease;
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] button[class*="toggle"]:hover::before {
  opacity: 1;
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] button[class*="toggle"]:hover [class*="panelIcon"] {
  display: none !important;
  opacity: 0;
}

.mw-wheel-halo {
  position: fixed;
  left: var(--mw-wheel-cx, 128px);
  top: var(--mw-wheel-cy, 50vh);
  width: 292px;
  height: 292px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: none;
  cursor: grab;
  touch-action: none;
  z-index: 78;
  opacity: 0;
  background:
    radial-gradient(circle at 50% 50%,
      transparent 0 55%,
      color-mix(in srgb, #fff 16%, transparent) 56%,
      transparent 57% 71%,
      color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent) 72%,
      transparent 73%);
  box-shadow:
    inset 0 0 34px color-mix(in srgb, #fff 7%, transparent),
    0 0 0 1px color-mix(in srgb, var(--dsw-alias-label-primary) 3%, transparent);
  transition: opacity .32s var(--mw-ease);
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] .mw-wheel-halo {
  opacity: 1;
  pointer-events: auto;
}

.mw-wheel-metrics {
  position: fixed;
  left: var(--mw-wheel-cx, 128px);
  top: calc(var(--mw-wheel-cy, 50vh) + 158px);
  transform: translateX(-50%);
  width: 112px;
  padding: 8px 10px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 10%, transparent);
  border-radius: 14px;
  background:
    linear-gradient(150deg, color-mix(in srgb, #fff 30%, transparent), transparent 58%),
    color-mix(in srgb, var(--dsw-specific-sidebar-fill) 82%, transparent);
  box-shadow: 0 10px 24px color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent);
  -webkit-backdrop-filter: blur(22px) saturate(140%);
  backdrop-filter: blur(22px) saturate(140%);
  color: var(--dsw-alias-label-primary);
  text-align: center;
  pointer-events: none;
  z-index: 86;
  opacity: 0;
  transition: opacity .28s var(--mw-ease), top .3s var(--mw-spring), left .3s var(--mw-spring);
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] .mw-wheel-metrics {
  opacity: 1;
}
.mw-wheel-metrics-label {
  display: block;
  margin-top: 4px;
  color: var(--dsw-alias-label-tertiary);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: .04em;
  line-height: 1.25;
  white-space: nowrap;
}
.mw-wheel-metrics-label:first-child { margin-top: 0; }
.mw-wheel-metrics-value {
  display: block;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.35;
  font-variant-numeric: tabular-nums;
}
.mw-wheel-metrics-empty { opacity: .38; }

@keyframes mw-wheel-item-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] [data-mw-wheel-item] {
  animation: mw-wheel-item-in .36s var(--mw-ease) both;
  animation-delay: calc(var(--mw-order, 0) * 34ms);
}

html.mw-wheel-dragging {
  cursor: grabbing !important;
  user-select: none !important;
}
/* Keep the drag repaint surface tiny: never touch every descendant, and never
   keep the blurred halo, metrics card or dock on screen while the M moves. */
html.mw-wheel-dragging [data-pane="sidebar"] button,
html.mw-wheel-dragging [data-pane="sidebar"] a {
  cursor: grabbing !important;
  user-select: none !important;
}
html.mw-wheel-dragging .mw-wheel-halo,
html.mw-wheel-dragging .mw-wheel-metrics,
html.mw-wheel-dragging .mw-action-dock {
  display: none !important;
}
html.mw-wheel-dragging [data-pane="sidebar"] [data-mw-wheel-item] {
  transition: none !important;
}
html.mw-wheel-dragging[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] button[class*="toggle"] {
  transition: none !important;
  opacity: 1 !important;
  transform: translate3d(var(--mw-drag-x, 0px), var(--mw-drag-y, 0px), 0) !important;
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
  box-shadow: 0 10px 22px color-mix(in srgb, var(--dsw-alias-label-primary) 18%, transparent) !important;
  will-change: transform;
}

@media (max-width: 1100px) {
  .mw-wheel-halo { width: 272px; height: 272px; }
}

/* -------------------------------------------------------------------------
   v2: quiet hover pipeline, M-first wheel, dock, palette and focus
   ------------------------------------------------------------------------- */

/* The expanded rail must not re-composite as a giant blurred card while a
   child button changes state. */
html[data-mine-sidebar="on"] .mw-sidebar-surface {
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
  transition: none !important;
  background:
    linear-gradient(145deg, color-mix(in srgb, #fff 32%, transparent), transparent 42%),
    linear-gradient(180deg, color-mix(in srgb, var(--dsw-specific-sidebar-fill) 96%, #fff 4%), var(--dsw-specific-sidebar-fill)) !important;
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="false"] .mw-sidebar-surface {
  contain: layout paint style;
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] .mw-sidebar-surface {
  contain: none !important;
}
html[data-mine-sidebar="on"] .mw-sidebar-surface button,
html[data-mine-sidebar="on"] .mw-sidebar-surface a {
  transform: none !important;
  transition: background .16s var(--mw-ease), color .16s var(--mw-ease), box-shadow .16s var(--mw-ease) !important;
}
html[data-mine-sidebar="on"] .mw-sidebar-surface button:not([class*="toggle"])::before,
html[data-mine-sidebar="on"] .mw-sidebar-surface a::before {
  display: none !important;
}

/* Closed wheel: only the M exists. */
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"][data-mw-wheel-open="false"] [data-pane="sidebar"] [data-mw-wheel-item],
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"][data-mw-wheel-open="false"] [data-pane="sidebar"] button[class*="newSession"][data-mw-wheel-item] {
  opacity: 0 !important;
  pointer-events: none !important;
  transform: translate(calc(-50% - var(--mw-x, 0px)), calc(-50% - var(--mw-y, 0px))) scale(.2) !important;
  transition:
    transform .16s cubic-bezier(.4, 0, .2, 1),
    opacity .1s var(--mw-ease),
    background .16s var(--mw-ease),
    box-shadow .16s var(--mw-ease) !important;
  transition-delay: 0s !important;
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"][data-mw-wheel-open="true"] [data-pane="sidebar"] [data-mw-wheel-item],
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"][data-mw-wheel-open="true"] [data-pane="sidebar"] button[class*="newSession"][data-mw-wheel-item] {
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto !important;
  transform: translate(-50%, -50%) scale(1) !important;
  transition:
    transform .42s var(--mw-spring),
    opacity .22s var(--mw-ease),
    background .2s var(--mw-ease),
    border-color .2s var(--mw-ease),
    box-shadow .24s var(--mw-ease) !important;
  transition-delay: calc(var(--mw-order, 0) * 28ms) !important;
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"][data-mw-wheel-open="true"] [data-pane="sidebar"] [data-mw-wheel-item]:hover,
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"][data-mw-wheel-open="true"] [data-pane="sidebar"] button[class*="newSession"][data-mw-wheel-item]:hover {
  transform: translate(-50%, -50%) scale(1.055) !important;
}
/* The native new-session row has label-only markup in the collapsed rail;
   give its wheel slot a quiet plus instead of an empty glass disc. */
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] button[class*="newSession"][data-mw-wheel-item]::before {
  display: grid !important;
  place-items: center;
  content: '+';
  inset: 0;
  border-radius: inherit;
  font-size: 22px;
  font-weight: 300;
  line-height: 1;
  color: var(--dsw-alias-label-primary);
  background: none;
  opacity: 1;
  z-index: 1;
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"][data-mw-wheel-open="false"] .mw-wheel-halo,
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"][data-mw-wheel-open="false"] .mw-wheel-metrics,
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"][data-mw-wheel-open="false"] .mw-action-dock {
  opacity: 0 !important;
  pointer-events: none !important;
  transition: opacity .16s var(--mw-ease), transform .26s var(--mw-ease) !important;
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"][data-mw-wheel-open="true"] .mw-wheel-halo,
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"][data-mw-wheel-open="true"] .mw-wheel-metrics,
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"][data-mw-wheel-open="true"] .mw-action-dock {
  opacity: 1 !important;
  visibility: visible !important;
  transition: opacity .2s var(--mw-ease), transform .32s var(--mw-spring), visibility 0s !important;
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"][data-mw-wheel-open="true"] .mw-wheel-halo {
  pointer-events: auto !important;
  transform: translate(-50%, -50%) scale(1);
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"][data-mw-wheel-open="true"] .mw-wheel-metrics {
  transform: translateX(-50%) translateY(0);
}
/* The native Tooltip primitive is a portal, so removing the title attribute is
   not enough. Suppress it only while the wheel is open; the wheel has its own
   labels and a black native bubble would cover them. */
/* Native tooltips are OS/portal surfaces, not part of the sidebar tree. In the
   collapsed rail they render as a white bar under the M (white-on-white text),
   so suppress the primitive for the whole collapsed state, not just when open. */
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [role="tooltip"],
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-dsh-tooltip],
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [class*="tooltip" i] {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] button[class*="toggle"]::before {
  opacity: 1 !important;
  content: 'M';
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] button[class*="toggle"]:hover::before {
  opacity: 1 !important;
}
html[data-mine-sidebar="on"][data-mine-sidebar-collapsed="true"] [data-pane="sidebar"] button[class*="toggle"] [class*="panelIcon"] {
  display: none !important;
}
html[data-mine-sidebar="on"][data-mine-wheel-idle="true"][data-mine-sidebar-collapsed="true"][data-mw-wheel-open="false"] [data-pane="sidebar"] button[class*="toggle"] {
  opacity: .48 !important;
  transform: scale(.94);
}
html[data-mine-sidebar="on"][data-mine-wheel-idle="true"][data-mine-sidebar-collapsed="true"][data-mw-wheel-open="false"] [data-pane="sidebar"] button[class*="toggle"]:hover,
html[data-mine-sidebar="on"][data-mine-wheel-idle="true"][data-mine-sidebar-collapsed="true"][data-mw-wheel-open="false"] [data-pane="sidebar"] button[class*="toggle"]:focus-visible {
  opacity: 1 !important;
  transform: scale(1.04) !important;
}

/* Dock under the metrics card. */
.mw-action-dock {
  position: fixed;
  left: var(--mw-wheel-cx, 128px);
  top: calc(var(--mw-wheel-cy, 50vh) + 258px);
  display: flex;
  gap: 5px;
  padding: 6px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 10%, transparent);
  border-radius: 14px;
  background:
    linear-gradient(150deg, color-mix(in srgb, #fff 30%, transparent), transparent 58%),
    color-mix(in srgb, var(--dsw-specific-sidebar-fill) 84%, transparent);
  box-shadow: 0 12px 30px color-mix(in srgb, var(--dsw-alias-label-primary) 13%, transparent);
  -webkit-backdrop-filter: blur(22px) saturate(145%);
  backdrop-filter: blur(22px) saturate(145%);
  transform: translateX(-50%) translateY(-5px);
  z-index: 88;
  opacity: 0;
  visibility: hidden;
  transition: opacity .22s var(--mw-ease), transform .3s var(--mw-spring);
}
html[data-mine-sidebar="on"][data-mw-wheel-open="true"] .mw-action-dock {
  transform: translateX(-50%) translateY(0);
}
.mw-dock-btn {
  position: relative;
  width: 31px;
  height: 31px;
  padding: 0;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-size: 15px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background .16s var(--mw-ease), color .16s var(--mw-ease), transform .18s var(--mw-spring);
}
.mw-dock-btn:hover,
.mw-dock-btn:focus-visible {
  color: var(--dsw-alias-label-primary);
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent);
  transform: translateY(-1px);
}
.mw-dock-btn::after {
  content: attr(aria-label);
  position: absolute;
  left: 50%;
  bottom: calc(100% + 5px);
  transform: translateX(-50%) translateY(2px);
  width: max-content;
  max-width: 150px;
  padding: 3px 7px;
  border-radius: 7px;
  background: color-mix(in srgb, var(--dsw-specific-sidebar-fill) 94%, transparent);
  box-shadow: 0 4px 14px color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent);
  color: var(--dsw-alias-label-primary);
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity .14s ease, transform .16s var(--mw-ease);
}
.mw-dock-btn:hover::after,
.mw-dock-btn:focus-visible::after {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* Wheel badges. */
.mw-wheel-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 17px;
  height: 17px;
  padding: 0 4px;
  border-radius: 999px;
  background: var(--dsw-alias-label-primary);
  color: var(--dsw-specific-sidebar-fill);
  font-size: 9px;
  font-weight: 700;
  line-height: 17px;
  text-align: center;
  box-shadow: 0 2px 7px color-mix(in srgb, var(--dsw-alias-label-primary) 24%, transparent);
  pointer-events: none;
  z-index: 95;
}
.mw-wheel-badge-dot {
  top: 1px;
  right: 1px;
  min-width: 8px;
  width: 8px;
  height: 8px;
  padding: 0;
  line-height: 8px;
}
html[data-mw-wheel-open="false"] .mw-wheel-badge {
  opacity: 0;
}

/* Focus timer line inside the metrics card. */
.mw-focus-line {
  display: none;
  margin-top: 6px;
  padding-top: 5px;
  border-top: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 9%, transparent);
  color: var(--dsw-alias-label-secondary);
  font-size: 9px;
  font-weight: 600;
  line-height: 1.25;
  white-space: nowrap;
}
.mw-focus-line.is-running { display: block; }
.mw-focus-time {
  display: block;
  color: var(--dsw-alias-label-primary);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}

/* Command palette. */
.mw-command-layer {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 14vh;
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 16%, transparent);
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
}
.mw-command-panel {
  width: min(560px, calc(100vw - 48px));
  max-height: min(520px, 70vh);
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent);
  border-radius: 20px;
  background:
    linear-gradient(150deg, color-mix(in srgb, #fff 24%, transparent), transparent 52%),
    color-mix(in srgb, var(--dsw-specific-sidebar-fill) 96%, transparent);
  box-shadow: 0 30px 80px color-mix(in srgb, var(--dsw-alias-label-primary) 26%, transparent);
  -webkit-backdrop-filter: blur(32px) saturate(150%);
  backdrop-filter: blur(32px) saturate(150%);
  color: var(--dsw-alias-label-primary);
  display: flex;
  flex-direction: column;
}
.mw-command-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-bottom: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent);
}
.mw-command-head svg { flex: none; opacity: .6; }
.mw-command-input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 14px;
}
.mw-command-input::placeholder { color: var(--dsw-alias-label-tertiary); }
.mw-command-kbd {
  padding: 2px 6px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent);
  border-radius: 6px;
  color: var(--dsw-alias-label-tertiary);
  font-size: 9px;
}
.mw-command-list {
  overflow: auto;
  padding: 7px;
  scrollbar-width: thin;
}
.mw-command-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 9px 11px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.mw-command-item.is-selected,
.mw-command-item:hover {
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent);
}
.mw-command-item-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 550;
}
.mw-command-item-meta {
  flex: none;
  max-width: 42%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--dsw-alias-label-tertiary);
  font-size: 10px;
}
.mw-command-empty {
  padding: 28px 16px;
  color: var(--dsw-alias-label-tertiary);
  text-align: center;
  font-size: 12px;
}
.mw-command-foot {
  display: flex;
  gap: 12px;
  padding: 8px 14px 10px;
  border-top: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent);
  color: var(--dsw-alias-label-tertiary);
  font-size: 9px;
}

/* Keep the whole workspace on the same graphite canvas as the workbench.
   DSH paints its own opaque surface on macOS; this restores the shared
   light/dark gradient instead of a flat white or black page. */
html[data-mine-sidebar="on"] body {
  background-color: #f2f2f4 !important;
  background-image:
    radial-gradient(1100px 760px at 12% -8%, #ffffff 0%, rgba(255, 255, 255, 0) 58%),
    radial-gradient(880px 640px at 96% 105%, rgba(255, 255, 255, .72) 0%, rgba(255, 255, 255, 0) 62%),
    linear-gradient(145deg, #fafafa 0%, #f0f0f2 46%, #e6e6e9 100%) !important;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
}
html[data-mine-sidebar="on"][data-dsh-theme="dark"] body {
  background-color: #0b0b0d !important;
  background-image:
    radial-gradient(1000px 700px at 15% -10%, rgba(255, 255, 255, .12) 0%, rgba(255, 255, 255, 0) 60%),
    radial-gradient(850px 600px at 90% 105%, rgba(255, 255, 255, .06) 0%, rgba(255, 255, 255, 0) 62%),
    linear-gradient(145deg, #19191c 0%, #111114 48%, #08080a 100%) !important;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
}
html[data-mine-sidebar="on"] #root,
html[data-mine-sidebar="on"] #root > div {
  background-color: transparent !important;
}

/* Native macOS shell fallback. The Mac desktop sidebar hides itself when
   collapsed, so the wheel's data attributes may not exist on first paint.
   Paint the canvas and the native expand control by platform alone. */
html[data-platform="darwin"] body,
html[data-platform="darwin"] #root {
  background-color: #f2f2f4 !important;
  background-image:
    radial-gradient(1100px 760px at 12% -8%, #ffffff 0%, rgba(255, 255, 255, 0) 58%),
    radial-gradient(880px 640px at 96% 105%, rgba(255, 255, 255, .72) 0%, rgba(255, 255, 255, 0) 62%),
    linear-gradient(145deg, #fafafa 0%, #f0f0f2 46%, #e6e6e9 100%) !important;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
}
html[data-platform="darwin"][data-dsh-theme="dark"] body,
html[data-platform="darwin"][data-dsh-theme="dark"] #root {
  background-color: #0b0b0d !important;
  background-image:
    radial-gradient(1000px 700px at 15% -10%, rgba(255, 255, 255, .12) 0%, rgba(255, 255, 255, 0) 60%),
    radial-gradient(850px 600px at 90% 105%, rgba(255, 255, 255, .06) 0%, rgba(255, 255, 255, 0) 62%),
    linear-gradient(145deg, #19191c 0%, #111114 48%, #08080a 100%) !important;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
}
html[data-platform="darwin"] #root > div,
html[data-platform="darwin"] body > div {
  background-color: transparent !important;
}
html[data-platform="darwin"] button[aria-label*="边栏"]:not([data-mw-drag-handle]),
html[data-platform="darwin"] button[aria-label*="sidebar" i]:not([data-mw-drag-handle]) {
  background: linear-gradient(145deg, rgba(255, 255, 255, .96), rgba(235, 235, 240, .84)) !important;
  border: 1px solid rgba(255, 255, 255, .72) !important;
  border-radius: 15px !important;
  color: #1d1d1f !important;
  box-shadow:
    0 10px 26px rgba(15, 23, 42, .13),
    0 1px 3px rgba(15, 23, 42, .10),
    inset 0 1px 0 rgba(255, 255, 255, .9) !important;
}
html[data-platform="darwin"][data-dsh-theme="dark"] button[aria-label*="边栏"]:not([data-mw-drag-handle]),
html[data-platform="darwin"][data-dsh-theme="dark"] button[aria-label*="sidebar" i]:not([data-mw-drag-handle]) {
  background: linear-gradient(145deg, rgba(58, 58, 62, .96), rgba(28, 28, 31, .88)) !important;
  border-color: rgba(255, 255, 255, .16) !important;
  color: #f5f5f7 !important;
  box-shadow:
    0 12px 30px rgba(0, 0, 0, .38),
    0 1px 3px rgba(0, 0, 0, .32),
    inset 0 1px 0 rgba(255, 255, 255, .18) !important;
}
html[data-platform="darwin"] button[aria-label*="边栏"]:not([data-mw-drag-handle]) [class*="badge"],
html[data-platform="darwin"] button[aria-label*="边栏"]:not([data-mw-drag-handle]) [data-dsh-badge],
html[data-platform="darwin"] button[aria-label*="sidebar" i]:not([data-mw-drag-handle]) [class*="badge"] {
  display: none !important;
}

@media (max-height: 720px) {
  .mw-action-dock { top: calc(var(--mw-wheel-cy, 50vh) + 240px); }
  .mw-wheel-metrics { top: calc(var(--mw-wheel-cy, 50vh) + 142px); }
}
@media (prefers-reduced-motion: reduce) {
  html[data-mine-sidebar="on"] .mw-sidebar-surface,
  html[data-mine-sidebar="on"] .mw-sidebar-surface *,
  .mw-wheel-halo,
  .mw-action-dock,
  .mw-command-layer {
    transition-duration: .01ms !important;
    animation-duration: .01ms !important;
  }
}
`;

    // ---------------------------------------------------------------------
    // Sidebar: native menus, macOS surface, collapsed radial wheel
    // ---------------------------------------------------------------------
    function installSidebarLayer() {
      if (typeof document === 'undefined' || !document.body) return () => {};
      const html = document.documentElement;
      const decorated = new Set();
      const savedStyles = new Map();
      let halo = null;
      let more = null;
      let pane = null;
      let surface = null;
      let paneObserver = null;
      let bodyObserver = null;
      let scheduled = 0;
      let disposed = false;

      const WHEEL_POS_KEY = 'dshMineWorkbench.wheelPos.v1';
      const clampWheel = (x, y) => {
        const minX = 112;
        const maxX = Math.max(minX, window.innerWidth - 112);
        const minY = 108;
        const maxY = Math.max(minY, window.innerHeight - 226);
        return {
          x: Math.round(Math.min(Math.max(x, minX), maxX)),
          y: Math.round(Math.min(Math.max(y, minY), maxY)),
        };
      };
      const readWheelPos = () => {
        try {
          const raw = window.localStorage.getItem(WHEEL_POS_KEY);
          if (!raw) return null;
          const parsed = JSON.parse(raw);
          if (parsed && Number.isFinite(parsed.x) && Number.isFinite(parsed.y)) {
            return clampWheel(parsed.x, parsed.y);
          }
        } catch {}
        return null;
      };
      let wheelPos = readWheelPos() || clampWheel(128, window.innerHeight * 0.5);
      const applyWheelPos = () => {
        html.style.setProperty('--mw-wheel-cx', wheelPos.x + 'px');
        html.style.setProperty('--mw-wheel-cy', wheelPos.y + 'px');
      };
      const persistWheelPos = () => {
        try {
          window.localStorage.setItem(WHEEL_POS_KEY, JSON.stringify(wheelPos));
        } catch {}
      };
      let suppressToggleClickUntil = 0;
      let dragState = null;
      applyWheelPos();

      if (!halo) {
        halo = document.createElement('div');
        halo.className = 'mw-wheel-halo';
        halo.setAttribute('aria-hidden', 'true');
        halo.dataset.mwDragHandle = 'wheel';
        document.body.appendChild(halo);
      }

      let metrics = document.querySelector('.mw-wheel-metrics');
      if (!metrics) {
        metrics = document.createElement('div');
        metrics.className = 'mw-wheel-metrics';
        metrics.setAttribute('aria-live', 'polite');
        const tokensLabel = document.createElement('span');
        tokensLabel.className = 'mw-wheel-metrics-label';
        tokensLabel.textContent = t('wheel.tokens');
        const tokensValue = document.createElement('span');
        tokensValue.className = 'mw-wheel-metrics-value';
        tokensValue.dataset.mwMetricTokens = '';
        tokensValue.textContent = '—';
        const costLabel = document.createElement('span');
        costLabel.className = 'mw-wheel-metrics-label';
        costLabel.textContent = t('wheel.cost');
        const costValue = document.createElement('span');
        costValue.className = 'mw-wheel-metrics-value';
        costValue.dataset.mwMetricCost = '';
        costValue.textContent = '—';
        metrics.append(tokensLabel, tokensValue, costLabel, costValue);
        document.body.appendChild(metrics);
      }
      let metricsTimer = 0;
      let metricsAbort = null;
      const paintMetrics = (usage) => {
        if (!metrics) return;
        metrics.classList.toggle('mw-wheel-metrics-empty', !usage);
        const tokens = metrics.querySelector('[data-mw-metric-tokens]');
        const cost = metrics.querySelector('[data-mw-metric-cost]');
        if (tokens) tokens.textContent = usage ? formatCompact(usage.tokens) : '—';
        if (cost) cost.textContent = usage && usage.cost != null ? formatMoney(usage.cost, 'CNY') : '—';
      };
      const loadMetrics = async () => {
        if (typeof fetch !== 'function') return;
        if (metricsAbort) metricsAbort.abort();
        const controller = typeof AbortController === 'function' ? new AbortController() : null;
        metricsAbort = controller;
        try {
          const response = await fetch('/api/dsh-usage/overview', {
            credentials: 'same-origin',
            cache: 'no-store',
            signal: controller ? controller.signal : undefined,
          });
          if (!response.ok) throw new Error('usage unavailable');
          paintMetrics(summarizeUsage(await response.json()));
        } catch (error) {
          if (error && error.name === 'AbortError') return;
          paintMetrics(null);
        }
      };
      loadMetrics();
      metricsTimer = setInterval(loadMetrics, 60000);

      const getPane = () => document.querySelector('[data-pane="sidebar"]');
      const getToggle = (root) => root && root.querySelector('button[class*="toggle"]');
      const isCollapsed = (root) => {
        if (!root) return false;
        if (document.querySelector('[data-sidebar-collapsed="true"]')) return true;
        return !!root.querySelector('[class*="collapsed"]');
      };
      const restore = (node) => {
        if (!node) return;
        const original = savedStyles.get(node);
        if (original !== undefined) {
          if (original === null) node.removeAttribute('style');
          else node.setAttribute('style', original);
        }
        savedStyles.delete(node);
        node.removeAttribute('data-mw-wheel-item');
        node.removeAttribute('data-mw-label');
        node.removeAttribute('data-mw-wheel-hidden');
        node.classList.remove('mw-wheel-more');
      };
      const remember = (node) => {
        if (!savedStyles.has(node)) savedStyles.set(node, node.getAttribute('style'));
      };
      const clearWheel = () => {
        for (const node of decorated) {
          restore(node);
        }
        decorated.clear();
        if (more) {
          more.remove();
          more = null;
        }
      };
      const sync = () => {
        if (disposed) return;
        const nextPane = getPane();
        if (!nextPane) {
          if (paneObserver) { paneObserver.disconnect(); paneObserver = null; }
          if (surface) surface.classList.remove('mw-sidebar-surface');
          surface = null;
          pane = null;
          html.dataset.mineSidebar = 'on';
          html.dataset.mineSidebarCollapsed = 'false';
          clearWheel();
          return;
        }
        if (nextPane !== pane) {
          pane = nextPane;
          if (paneObserver) paneObserver.disconnect();
          paneObserver = new MutationObserver(schedule);
          paneObserver.observe(pane, {
            attributes: true,
            attributeFilter: ['class', 'data-sidebar-collapsed', 'title'],
            childList: true,
            subtree: true,
          });
        }
        const nextSurface = (() => {
          const row = pane.querySelector('[class*="logoRow"]');
          const candidate = row ? row.closest('[class*="root"]') : null;
          if (candidate && pane.contains(candidate)) return candidate;
          return pane.firstElementChild || pane;
        })();
        if (surface !== nextSurface) {
          if (surface) surface.classList.remove('mw-sidebar-surface');
          surface = nextSurface;
        }
        surface.classList.add('mw-sidebar-surface');
        html.dataset.mineSidebar = 'on';

        const collapsed = isCollapsed(pane);
        html.dataset.mineSidebarCollapsed = collapsed ? 'true' : 'false';
        const toggle = getToggle(pane);
        if (toggle) {
          if (collapsed) {
            toggle.setAttribute('data-mw-drag-handle', 'hub');
          } else {
            toggle.removeAttribute('data-mw-drag-handle');
          }
          toggle.removeAttribute('title');
        }
        if (!collapsed) {
          clearWheel();
          return;
        }

        const nav = pane.querySelector('nav[class*="panelList"]');
        const panels = nav ? Array.from(nav.querySelectorAll('button')) : [];
        const newSession = pane.querySelector('button[class*="newSession"]');
        const items = [newSession, ...panels].filter(Boolean);
        const visible = items.slice(0, 7);
        const hidden = items.slice(7);
        const max = Math.max(visible.length, 1);
        const radius = max > 5 ? 96 : 92;
        const start = -Math.PI / 2;
        const step = (Math.PI * 2) / max;

        visible.forEach((node, index) => {
          if (!node.isConnected) return;
          remember(node);
          decorated.add(node);
          node.setAttribute('data-mw-wheel-item', '');
          const label = (node.getAttribute('aria-label') || node.textContent || '')
            .replace(/(?:Ctrl|⌘|Alt|Shift)\+.*$/i, '')
            .replace(/[\u00b7|].*$/, '')
            .trim();
          if (label) node.setAttribute('data-mw-label', label);
          const angle = start + step * index;
          const x = Math.round(Math.cos(angle) * radius);
          const y = Math.round(Math.sin(angle) * radius);
          node.style.setProperty('--mw-x', x + 'px');
          node.style.setProperty('--mw-y', y + 'px');
          node.style.setProperty('--mw-order', String(index));
        });

        hidden.forEach((node) => {
          if (!node.isConnected) return;
          remember(node);
          decorated.add(node);
          node.setAttribute('data-mw-wheel-hidden', '');
          node.style.display = 'none';
        });

        if (hidden.length > 0) {
          if (!more || !more.isConnected) {
            more = document.createElement('button');
            more.type = 'button';
            more.className = 'mw-wheel-more';
            more.textContent = '···';
            more.setAttribute('aria-label', 'More');
            more.addEventListener('click', () => {
              const toggle = getToggle(pane);
              if (toggle) toggle.click();
            });
            pane.appendChild(more);
          }
          more.style.setProperty('--mw-x', '0px');
          more.style.setProperty('--mw-y', '154px');
        } else if (more) {
          more.remove();
          more = null;
        }
      };
      const schedule = () => {
        if (scheduled) return;
        if (typeof requestAnimationFrame === 'function') {
          scheduled = requestAnimationFrame(() => {
            scheduled = 0;
            sync();
          });
        } else {
          sync();
        }
      };
      const onResize = () => {
        wheelPos = clampWheel(wheelPos.x, wheelPos.y);
        applyWheelPos();
        schedule();
      };
      const stopDrag = () => {
        if (!dragState) return;
        const moved = dragState.moved;
        window.removeEventListener('pointermove', dragState.move);
        window.removeEventListener('pointerup', dragState.end, true);
        window.removeEventListener('pointercancel', dragState.end, true);
        html.classList.remove('mw-wheel-dragging');
        if (moved) {
          suppressToggleClickUntil = Date.now() + 320;
          persistWheelPos();
        }
        dragState = null;
      };
      const onDragStart = (event) => {
        if (disposed || dragState) return;
        if (html.dataset.mineSidebarCollapsed !== 'true') return;
        if (!(event.target instanceof Element)) return;
        const handle = event.target.closest('[data-mw-drag-handle]');
        if (!handle) return;
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        const start = { x: event.clientX, y: event.clientY, cx: wheelPos.x, cy: wheelPos.y };
        dragState = {
          moved: false,
          move: null,
          end: null,
        };
        const move = (moveEvent) => {
          if (!dragState || moveEvent.pointerId !== event.pointerId) return;
          const dx = moveEvent.clientX - start.x;
          const dy = moveEvent.clientY - start.y;
          if (!dragState.moved && Math.hypot(dx, dy) < 4) return;
          if (!dragState.moved) {
            dragState.moved = true;
            html.classList.add('mw-wheel-dragging');
          }
          moveEvent.preventDefault();
          wheelPos = clampWheel(start.cx + dx, start.cy + dy);
          applyWheelPos();
        };
        const end = (endEvent) => {
          if (!dragState || (endEvent && endEvent.pointerId !== event.pointerId)) return;
          stopDrag();
        };
        dragState.move = move;
        dragState.end = end;
        window.addEventListener('pointermove', move, { passive: false });
        window.addEventListener('pointerup', end, true);
        window.addEventListener('pointercancel', end, true);
      };
      const onPointerMove = (event) => {
        const target = event.target instanceof Element
          ? event.target.closest('[data-mw-wheel-item], [data-pane="sidebar"] button, [data-pane="sidebar"] a')
          : null;
        if (!target || !pane || !pane.contains(target)) return;
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--mw-mx', Math.round(event.clientX - rect.left) + 'px');
        target.style.setProperty('--mw-my', Math.round(event.clientY - rect.top) + 'px');
      };
      const onClick = (event) => {
        const target = event.target instanceof Element
          ? event.target.closest('[data-pane="sidebar"] button[class*="toggle"]')
          : null;
        if (!target) return;
        if (Date.now() < suppressToggleClickUntil) {
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }
        setTimeout(schedule, 40);
      };
      const onPointerOver = (event) => {
        if (html.dataset.mineSidebarCollapsed !== 'true') return;
        if (!(event.target instanceof Element)) return;
        const toggle = event.target.closest('[data-pane="sidebar"] button[class*="toggle"]');
        if (toggle) toggle.removeAttribute('title');
      };

      html.dataset.mineSidebar = 'on';
      html.dataset.mineSidebarCollapsed = 'false';
      bodyObserver = new MutationObserver(schedule);
      bodyObserver.observe(document.body, { childList: true });
      document.addEventListener('pointerdown', onDragStart, true);
      document.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('pointerover', onPointerOver, true);
      document.addEventListener('click', onClick, true);
      window.addEventListener('resize', onResize, { passive: true });
      sync();

      return () => {
        disposed = true;
        stopDrag();
        if (scheduled) cancelAnimationFrame(scheduled);
        if (paneObserver) paneObserver.disconnect();
        if (bodyObserver) bodyObserver.disconnect();
        if (metricsTimer) clearInterval(metricsTimer);
        if (metricsAbort) metricsAbort.abort();
        document.removeEventListener('pointerdown', onDragStart, true);
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerover', onPointerOver, true);
        document.removeEventListener('click', onClick, true);
        window.removeEventListener('resize', onResize);
        clearWheel();
        if (more) more.remove();
        if (metrics) metrics.remove();
        if (halo) halo.remove();
        if (surface) surface.classList.remove('mw-sidebar-surface');
        html.style.removeProperty('--mw-wheel-cx');
        html.style.removeProperty('--mw-wheel-cy');
        delete html.dataset.mineSidebar;
        delete html.dataset.mineSidebarCollapsed;
      };
    }

    // ---------------------------------------------------------------------
    // Sidebar v2: quiet macOS rail, M-first wheel, dock and palette bridge
    // ---------------------------------------------------------------------
    function installWheelSidebar(ctx, actions) {
      if (typeof document === 'undefined' || !document.body) return () => {};
      const html = document.documentElement;
      const paneSelector = '[data-pane="sidebar"]';
      const WHEEL_POS_KEY = 'dshMineWorkbench.wheelPos.v1';
      const FOCUS_KEY = 'dshMineWorkbench.focus.v1';
      const FOCUS_MS = 25 * 60 * 1000;
      const savedStyles = new Map();
      const decorated = new Set();
      const listeners = [];
      let pane = null;
      let surface = null;
      let paneObserver = null;
      let bodyObserver = null;
      let scheduleFrame = 0;
      let halo = null;
      let metrics = null;
      let dock = null;
      let focusLine = null;
      let metricsTimer = 0;
      let metricsAbort = null;
      let taskTimer = 0;
      let taskAbort = null;
      let focusTick = 0;
      let focusDoneUntil = 0;
      let focusLabelNode = null;
      let runningDot = null;
      let badge = null;
      let badgeTarget = null;
      let decoratedKey = '';
      let disposed = false;
      let open = false;
      let openTimer = 0;
      let closeTimer = 0;
      let idleTimer = 0;
      let suppressClickUntil = 0;
      let dragState = null;
      let focusEndsAt = 0;

      const getService = (name) => {
        try {
          return ctx.get(name);
        } catch {
          return undefined;
        }
      };

      const isCollapsed = (root) => {
        if (!root) return false;
        if (document.querySelector('[data-sidebar-collapsed="true"]')) return true;
        return !!root.querySelector('[class*="collapsed"]');
      };

      const wheelBounds = () => {
        const compact = window.innerHeight < 720;
        const radius = compact ? 78 : 92;
        const horizontal = radius + 42;
        const minX = horizontal;
        const maxX = Math.max(minX, window.innerWidth - horizontal);
        const minY = radius + 52;
        const maxY = Math.max(minY, window.innerHeight - radius - (compact ? 285 : 330));
        return { minX, maxX, minY, maxY, compact, radius };
      };
      const clampWheel = (x, y) => {
        const bounds = wheelBounds();
        return {
          x: Math.round(Math.min(Math.max(x, bounds.minX), bounds.maxX)),
          y: Math.round(Math.min(Math.max(y, bounds.minY), bounds.maxY)),
        };
      };
      const readWheelPos = () => {
        try {
          const parsed = JSON.parse(window.localStorage.getItem(WHEEL_POS_KEY) || 'null');
          if (parsed && Number.isFinite(parsed.x) && Number.isFinite(parsed.y)) {
            return clampWheel(parsed.x, parsed.y);
          }
        } catch {}
        return null;
      };
      let wheelPos = readWheelPos() || clampWheel(146, window.innerHeight * 0.5);
      const applyWheelPos = () => {
        html.style.setProperty('--mw-wheel-cx', wheelPos.x + 'px');
        html.style.setProperty('--mw-wheel-cy', wheelPos.y + 'px');
      };
      const persistWheelPos = () => {
        try {
          window.localStorage.setItem(WHEEL_POS_KEY, JSON.stringify(wheelPos));
        } catch {}
      };
      const snapWheel = () => {
        const bounds = wheelBounds();
        const threshold = 28;
        if (wheelPos.x - bounds.minX < threshold) wheelPos.x = bounds.minX;
        else if (bounds.maxX - wheelPos.x < threshold) wheelPos.x = bounds.maxX;
        if (wheelPos.y - bounds.minY < threshold) wheelPos.y = bounds.minY;
        else if (bounds.maxY - wheelPos.y < threshold) wheelPos.y = bounds.maxY;
      };

      const cleanLabel = (node) => (node.getAttribute('aria-label') || node.textContent || '')
        .replace(/\s*(?:Ctrl|⌘|Alt|Shift)\s*\+[\s\S]*$/i, '')
        .replace(/\s*[·|][\s\S]*$/, '')
        .replace(/\s+/g, ' ')
        .trim();

      const restoreNode = (node) => {
        if (!node) return;
        const original = savedStyles.get(node);
        if (original !== undefined) {
          if (original === null) node.removeAttribute('style');
          else node.setAttribute('style', original);
        }
        savedStyles.delete(node);
        node.removeAttribute('data-mw-wheel-item');
        node.removeAttribute('data-mw-label');
        node.removeAttribute('data-mw-wheel-hidden');
        node.removeAttribute('title');
      };
      const clearDecorated = () => {
        if (badge) {
          badge.remove();
          badge = null;
        }
        if (runningDot) {
          runningDot.remove();
          runningDot = null;
        }
        badgeTarget = null;
        for (const node of decorated) restoreNode(node);
        decorated.clear();
        decoratedKey = '';
      };

      const setWheelOpen = (next) => {
        if (disposed) return;
        open = !!next;
        html.dataset.mwWheelOpen = open ? 'true' : 'false';
        html.dataset.mwWheelIdle = 'false';
        if (open) {
          window.clearTimeout(closeTimer);
          window.clearTimeout(idleTimer);
        } else {
          scheduleIdle();
        }
      };
      const openWheel = () => {
        if (disposed || dragState || !isCollapsed(pane) || open || openTimer) return;
        wakeIdle();
        openTimer = window.setTimeout(() => {
          openTimer = 0;
          if (disposed || !isCollapsed(pane) || open) return;
          setWheelOpen(true);
        }, 70);
      };
      const closeWheel = () => {
        window.clearTimeout(openTimer);
        openTimer = 0;
        if (!open) {
          scheduleIdle();
          return;
        }
        setWheelOpen(false);
      };
      const scheduleClose = () => {
        window.clearTimeout(closeTimer);
        // No grace delay on leave: the CSS close transition is already short.
        // Keeping a timer here was the source of the perceived "sticky" wheel.
        closeTimer = window.setTimeout(() => {
          if (open && !dragState) setWheelOpen(false);
        }, 0);
      };
      const scheduleIdle = () => {
        window.clearTimeout(idleTimer);
        if (open || !isCollapsed(pane)) {
          html.dataset.mwWheelIdle = 'false';
          return;
        }
        idleTimer = window.setTimeout(() => {
          if (!open && isCollapsed(pane) && !dragState) html.dataset.mwWheelIdle = 'true';
        }, 4000);
      };
      const wakeIdle = () => {
        html.dataset.mwWheelIdle = 'false';
        if (!open) scheduleIdle();
      };

      const ensureChrome = () => {
        if (!halo) {
          halo = document.createElement('div');
          halo.className = 'mw-wheel-halo';
          halo.setAttribute('aria-hidden', 'true');
          document.body.appendChild(halo);
        }
        if (!metrics) {
          metrics = document.createElement('div');
          metrics.className = 'mw-wheel-metrics';
          metrics.setAttribute('aria-live', 'polite');
          const tokenLabel = document.createElement('span');
          tokenLabel.className = 'mw-wheel-metrics-label';
          tokenLabel.textContent = t('wheel.tokens');
          const tokenValue = document.createElement('span');
          tokenValue.className = 'mw-wheel-metrics-value';
          tokenValue.dataset.mwMetricTokens = '';
          tokenValue.textContent = '—';
          const costLabel = document.createElement('span');
          costLabel.className = 'mw-wheel-metrics-label';
          costLabel.textContent = t('wheel.cost');
          const costValue = document.createElement('span');
          costValue.className = 'mw-wheel-metrics-value';
          costValue.dataset.mwMetricCost = '';
          costValue.textContent = '—';
          focusLine = document.createElement('div');
          focusLine.className = 'mw-focus-line';
          const focusText = document.createTextNode(t('wheel.focus') + ' ');
          focusLabelNode = focusText;
          const focusTime = document.createElement('span');
          focusTime.className = 'mw-focus-time';
          focusTime.dataset.mwFocusTime = '';
          focusLine.appendChild(focusText);
          focusLine.appendChild(focusTime);
          metrics.append(tokenLabel, tokenValue, costLabel, costValue, focusLine);
          document.body.appendChild(metrics);
        }
        if (!dock) {
          dock = document.createElement('div');
          dock.className = 'mw-action-dock';
          dock.setAttribute('role', 'toolbar');
          dock.setAttribute('aria-label', t('panel.title'));
          const defs = [
            ['new', '＋', 'action.new'],
            ['recent', '↺', 'action.recent'],
            ['project', '⌂', 'action.project'],
            ['search', '⌕', 'action.search'],
            ['theme', '◐', 'action.theme'],
            ['focus', '◷', 'action.focus'],
          ];
          for (const [id, glyph, key] of defs) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'mw-dock-btn';
            button.dataset.mwAction = id;
            button.setAttribute('aria-label', t(key));
            button.textContent = glyph;
            dock.appendChild(button);
          }
          document.body.appendChild(dock);
        }
      };

      const formatFocusTime = (milliseconds) => {
        const total = Math.max(0, Math.ceil(milliseconds / 1000));
        const minutes = Math.floor(total / 60);
        const seconds = total % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      };
      const paintFocus = () => {
        if (!focusLine) return;
        const value = focusLine.querySelector('[data-mw-focus-time]');
        if (!value) return;
        if (focusEndsAt > 0) {
          const left = focusEndsAt - Date.now();
          if (left > 0) {
            focusLine.classList.add('is-running');
            if (focusLabelNode) focusLabelNode.textContent = t('wheel.focus') + ' ';
            value.textContent = formatFocusTime(left);
            return;
          }
          focusEndsAt = 0;
          try { window.localStorage.removeItem(FOCUS_KEY); } catch {}
          focusLine.classList.add('is-running');
          if (focusLabelNode) focusLabelNode.textContent = t('wheel.focusDone');
          value.textContent = '✓';
          focusDoneUntil = Date.now() + 4200;
          return;
        }
        if (focusDoneUntil > Date.now()) return;
        focusLine.classList.remove('is-running');
      };
      const toggleFocus = () => {
        if (focusEndsAt > 0) {
          focusEndsAt = 0;
          try { window.localStorage.removeItem(FOCUS_KEY); } catch {}
        } else {
          focusEndsAt = Date.now() + FOCUS_MS;
          try {
            window.localStorage.setItem(FOCUS_KEY, JSON.stringify({ endsAt: focusEndsAt }));
          } catch {}
        }
        paintFocus();
      };

      const toggleTheme = () => {
        const theme = getService('theme');
        if (!theme || typeof theme.setTheme !== 'function') return;
        let next = 'light';
        try {
          if (theme.preference === 'light') next = 'dark';
          else if (theme.preference === 'dark') next = 'light';
          else next = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
          theme.setTheme(next);
        } catch {}
      };

      const requestCommand = () => {
        const layout = getService('layout');
        try {
          layout?.selectPanel?.(PANEL_ID);
        } catch {}
        closeWheel();
        const fire = () => commandBus.request();
        fire();
        window.setTimeout(fire, 90);
        window.setTimeout(fire, 240);
      };

      const recentAction = () => {
        const candidate = pane?.querySelector(
          '[class*="regionArea"] button, [class*="sessionRow"], [class*="sessionList"] button',
        );
        if (candidate && typeof candidate.click === 'function') {
          candidate.click();
          return;
        }
        try { getService('layout')?.selectPanel?.(PANEL_ID); } catch {}
      };

      const runDockAction = (id) => {
        if (id === 'new') actions.startSession?.();
        else if (id === 'recent') recentAction();
        else if (id === 'project') actions.addWorkspace?.();
        else if (id === 'search') requestCommand();
        else if (id === 'theme') toggleTheme();
        else if (id === 'focus') toggleFocus();
        wakeIdle();
      };

      const paintMetrics = (usage) => {
        if (!metrics) return;
        metrics.classList.toggle('mw-wheel-metrics-empty', !usage);
        const tokenNode = metrics.querySelector('[data-mw-metric-tokens]');
        const costNode = metrics.querySelector('[data-mw-metric-cost]');
        if (tokenNode) tokenNode.textContent = usage ? formatCompact(usage.tokens) : '—';
        if (costNode) costNode.textContent = usage && usage.cost != null ? formatMoney(usage.cost, 'CNY') : '—';
      };
      const loadMetrics = async () => {
        if (typeof fetch !== 'function') return;
        if (metricsAbort) metricsAbort.abort();
        const controller = typeof AbortController === 'function' ? new AbortController() : null;
        metricsAbort = controller;
        try {
          const response = await fetch('/api/dsh-usage/overview', {
            credentials: 'same-origin',
            cache: 'no-store',
            signal: controller?.signal,
          });
          if (!response.ok) throw new Error('usage unavailable');
          paintMetrics(summarizeUsage(await response.json()));
        } catch (error) {
          if (error && error.name === 'AbortError') return;
          paintMetrics(null);
        }
      };

      const setBadge = (node, value, dot = false) => {
        if (badge) {
          badge.remove();
          badge = null;
        }
        badgeTarget = node || null;
        if (!node || !value) return;
        const element = document.createElement('span');
        element.className = 'mw-wheel-badge' + (dot ? ' mw-wheel-badge-dot' : '');
        element.setAttribute('aria-hidden', 'true');
        element.textContent = dot ? '' : value > 99 ? '99+' : String(value);
        node.appendChild(element);
        badge = element;
      };
      const loadTaskBadge = async () => {
        if (!badgeTarget) return;
        if (taskAbort) taskAbort.abort();
        const controller = typeof AbortController === 'function' ? new AbortController() : null;
        taskAbort = controller;
        try {
          const response = await fetch('/api/task-board/state', {
            credentials: 'same-origin',
            cache: 'no-store',
            signal: controller?.signal,
          });
          if (!response.ok) throw new Error('tasks unavailable');
          const data = await response.json();
          const tasks = Array.isArray(data?.tasks) ? data.tasks : [];
          const pending = tasks.filter((task) => (
            task && task.archived !== true && task.column !== 'done' && task.column !== 'failed'
          )).length;
          const running = tasks.filter((task) => task && task.archived !== true && task.column === 'running').length;
          setBadge(badgeTarget, pending, false);
          if (runningDot) {
            runningDot.remove();
            runningDot = null;
          }
          if (running > 0) {
            const toggle = pane?.querySelector('button[class*="toggle"]');
            if (toggle) {
              const dot = document.createElement('span');
              dot.className = 'mw-wheel-badge mw-wheel-badge-dot';
              dot.setAttribute('aria-hidden', 'true');
              toggle.appendChild(dot);
              runningDot = dot;
            }
          }
        } catch (error) {
          if (error && error.name === 'AbortError') return;
          setBadge(null, 0);
        }
      };

      const decorate = () => {
        if (!pane || !isCollapsed(pane)) {
          clearDecorated();
          return;
        }
        const nav = pane.querySelector('nav[class*="panelList"]');
        const panels = nav ? Array.from(nav.querySelectorAll('button')) : [];
        const newSession = pane.querySelector('button[class*="newSession"]');
        const all = [newSession, ...panels].filter(Boolean);
        if (all.length === 0) return;
        const visible = all.slice(0, 6);
        const hidden = all.slice(6);
        const nextKey = visible.map((node) => cleanLabel(node)).join('|') + '#' + visible.length + ':' + hidden.length;
        if (nextKey === decoratedKey && visible.every((node) => decorated.has(node))) return;
        clearDecorated();
        decoratedKey = nextKey;
        const start = -Math.PI / 2;
        const step = (Math.PI * 2) / Math.max(visible.length, 1);
        const radius = wheelBounds().radius;
        visible.forEach((node, index) => {
          if (!node.isConnected) return;
          if (!savedStyles.has(node)) savedStyles.set(node, node.getAttribute('style'));
          decorated.add(node);
          node.setAttribute('data-mw-wheel-item', '');
          const label = cleanLabel(node);
          if (label) node.setAttribute('data-mw-label', label);
          node.removeAttribute('title');
          const angle = start + step * index;
          node.style.setProperty('--mw-x', Math.round(Math.cos(angle) * radius) + 'px');
          node.style.setProperty('--mw-y', Math.round(Math.sin(angle) * radius) + 'px');
          node.style.setProperty('--mw-order', String(index));
        });
        hidden.forEach((node) => {
          if (!node.isConnected) return;
          if (!savedStyles.has(node)) savedStyles.set(node, node.getAttribute('style'));
          decorated.add(node);
          node.setAttribute('data-mw-wheel-hidden', '');
          node.style.display = 'none';
        });
        const taskNode = visible.find((node) => /任务|task/i.test(cleanLabel(node)));
        if (taskNode) {
          setBadge(taskNode, 0);
          loadTaskBadge();
        }
        window.clearTimeout(taskTimer);
        taskTimer = window.setInterval(() => {
          if (badgeTarget) loadTaskBadge();
        }, 30000);
      };

      const sync = () => {
        if (disposed) return;
        const nextPane = document.querySelector(paneSelector);
        if (!nextPane) {
          if (paneObserver) { paneObserver.disconnect(); paneObserver = null; }
          if (surface) surface.classList.remove('mw-sidebar-surface');
          surface = null;
          pane = null;
          clearDecorated();
          html.dataset.mineSidebar = 'on';
          html.dataset.mineSidebarCollapsed = 'false';
          setWheelOpen(false);
          return;
        }
        if (nextPane !== pane) {
          pane = nextPane;
          if (paneObserver) paneObserver.disconnect();
          paneObserver = new MutationObserver(schedule);
          paneObserver.observe(pane, {
            attributes: true,
            attributeFilter: ['class', 'data-sidebar-collapsed', 'title'],
            childList: true,
            subtree: true,
          });
        }
        const nextSurface = (() => {
          const row = pane.querySelector('[class*="logoRow"]');
          const candidate = row ? row.closest('[class*="root"]') : null;
          if (candidate && pane.contains(candidate)) return candidate;
          return pane.firstElementChild || pane;
        })();
        if (surface !== nextSurface) {
          if (surface) surface.classList.remove('mw-sidebar-surface');
          surface = nextSurface;
        }
        surface.classList.add('mw-sidebar-surface');
        html.dataset.mineSidebar = 'on';
        const collapsed = isCollapsed(pane);
        html.dataset.mineSidebarCollapsed = collapsed ? 'true' : 'false';
        if (!collapsed) {
          setWheelOpen(false);
          clearDecorated();
          return;
        }
        html.dataset.mwWheelOpen = open ? 'true' : 'false';
        const toggle = pane.querySelector('button[class*="toggle"]');
        if (toggle) {
          toggle.setAttribute('data-mw-drag-handle', 'hub');
          toggle.removeAttribute('title');
          for (const titled of toggle.querySelectorAll('[title]')) titled.removeAttribute('title');
        }
        wakeIdle();
        decorate();
      };
      const schedule = () => {
        if (scheduleFrame) return;
        scheduleFrame = requestAnimationFrame(() => {
          scheduleFrame = 0;
          sync();
        });
      };

      const stripHubTitle = (node) => {
        if (!node) return;
        node.removeAttribute('title');
        for (const titled of node.querySelectorAll('[title]')) titled.removeAttribute('title');
      };

      const startDrag = (event) => {
        if (disposed || dragState || !isCollapsed(pane)) return;
        if (!(event.target instanceof Element)) return;
        const handle = event.target.closest('[data-mw-drag-handle="hub"]');
        if (!handle) return;
        stripHubTitle(handle);
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        const start = { x: event.clientX, y: event.clientY, cx: wheelPos.x, cy: wheelPos.y };
        dragState = {
          moved: false,
          pointerId: event.pointerId,
          start,
          toggle: handle,
          dx: 0,
          dy: 0,
          frame: 0,
          move: null,
          end: null,
        };
        const paint = () => {
          if (!dragState) return;
          dragState.toggle.style.setProperty('--mw-drag-x', dragState.dx + 'px');
          dragState.toggle.style.setProperty('--mw-drag-y', dragState.dy + 'px');
        };
        const move = (moveEvent) => {
          if (!dragState || moveEvent.pointerId !== dragState.pointerId) return;
          const dx = moveEvent.clientX - dragState.start.x;
          const dy = moveEvent.clientY - dragState.start.y;
          if (!dragState.moved && Math.hypot(dx, dy) < 4) return;
          if (!dragState.moved) {
            dragState.moved = true;
            html.classList.add('mw-wheel-dragging');
            setWheelOpen(false);
          }
          moveEvent.preventDefault();
          dragState.dx = dx;
          dragState.dy = dy;
          if (!dragState.frame) {
            dragState.frame = requestAnimationFrame(() => {
              if (!dragState) return;
              dragState.frame = 0;
              paint();
            });
          }
        };
        const end = (endEvent) => {
          if (!dragState || (endEvent && endEvent.pointerId !== dragState.pointerId)) return;
          const state = dragState;
          const moved = state.moved;
          if (state.frame) cancelAnimationFrame(state.frame);
          const finalDx = endEvent && Number.isFinite(endEvent.clientX) ? endEvent.clientX - state.start.x : state.dx;
          const finalDy = endEvent && Number.isFinite(endEvent.clientY) ? endEvent.clientY - state.start.y : state.dy;
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerup', end, true);
          window.removeEventListener('pointercancel', end, true);
          html.classList.remove('mw-wheel-dragging');
          state.toggle.style.removeProperty('--mw-drag-x');
          state.toggle.style.removeProperty('--mw-drag-y');
          dragState = null;
          if (moved) {
            wheelPos = clampWheel(state.start.cx + finalDx, state.start.cy + finalDy);
            snapWheel();
            applyWheelPos();
            persistWheelPos();
            suppressClickUntil = Date.now() + 360;
          }
        };
        dragState.move = move;
        dragState.end = end;
        window.addEventListener('pointermove', move, { passive: false });
        window.addEventListener('pointerup', end, true);
        window.addEventListener('pointercancel', end, true);
      };

      const wheelZoneContains = (x, y) => {
        for (const element of [halo, metrics, dock]) {
          if (!element || !element.isConnected || element.getClientRects().length === 0) continue;
          const rect = element.getBoundingClientRect();
          if (x >= rect.left - 28 && x <= rect.right + 28
            && y >= rect.top - 28 && y <= rect.bottom + 28) {
            return true;
          }
        }
        return false;
      };
      const onPointerMove = (event) => {
        wakeIdle();
        if (event.target instanceof Element) stripHubTitle(event.target.closest(`${paneSelector} button[class*="toggle"]`));
        if (!open) {
          if (html.dataset.mineSidebarCollapsed === 'true' && event.target instanceof Element) {
            const toggle = event.target.closest(`${paneSelector} button[class*="toggle"]`);
            if (toggle) {
              openWheel();
            } else {
              window.clearTimeout(openTimer);
              openTimer = 0;
            }
          }
          return;
        }
        if (!(event.target instanceof Element)) return;
        const inside = event.target.closest(
          '[data-mw-wheel-item], [data-mw-drag-handle="hub"], .mw-wheel-halo, .mw-wheel-metrics, .mw-action-dock',
        );
        if (inside || wheelZoneContains(event.clientX, event.clientY)) {
          window.clearTimeout(closeTimer);
          return;
        }
        scheduleClose();
      };
      const onClick = (event) => {
        if (Date.now() < suppressClickUntil) {
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }
        if (!(event.target instanceof Element)) return;
        const toggle = event.target.closest(`${paneSelector} button[class*="toggle"]`);
        if (toggle) {
          closeWheel();
          window.setTimeout(schedule, 40);
        }
      };
      const onPointerDown = (event) => {
        startDrag(event);
        wakeIdle();
      };
      const onKeyDown = (event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault();
          closeWheel();
          return;
        }
        if (event.altKey && (event.key === 'k' || event.key === 'K')
          && html.dataset.mineSidebarCollapsed === 'true') {
          event.preventDefault();
          setWheelOpen(true);
          requestCommand();
        }
      };
      const onBlur = () => closeWheel();
      const onResize = () => {
        wheelPos = clampWheel(wheelPos.x, wheelPos.y);
        applyWheelPos();
        schedule();
      };
      const onDockClick = (event) => {
        if (!(event.target instanceof Element)) return;
        const button = event.target.closest('[data-mw-action]');
        if (button) runDockAction(button.dataset.mwAction);
      };

      const initFocus = () => {
        try {
          const parsed = JSON.parse(window.localStorage.getItem(FOCUS_KEY) || 'null');
          if (parsed && Number.isFinite(parsed.endsAt) && parsed.endsAt > Date.now()) {
            focusEndsAt = parsed.endsAt;
          }
        } catch {}
        paintFocus();
        focusTick = window.setInterval(paintFocus, 1000);
      };

      ensureChrome();
      applyWheelPos();
      html.dataset.mineSidebar = 'on';
      html.dataset.mineSidebarCollapsed = 'false';
      html.dataset.mwWheelOpen = 'false';
      html.dataset.mwWheelIdle = 'false';
      bodyObserver = new MutationObserver(schedule);
      bodyObserver.observe(document.body, { childList: true });
      listeners.push([document, 'pointerdown', onPointerDown, true]);
      listeners.push([document, 'pointermove', onPointerMove, { passive: true }]);
      listeners.push([document, 'click', onClick, true]);
      listeners.push([document, 'keydown', onKeyDown, true]);
      listeners.push([window, 'blur', onBlur]);
      listeners.push([window, 'resize', onResize, { passive: true }]);
      dock?.addEventListener('click', onDockClick);
      for (const [target, name, handler, options] of listeners) {
        target.addEventListener(name, handler, options);
      }
      loadMetrics();
      metricsTimer = window.setInterval(loadMetrics, 60000);
      initFocus();
      sync();
      scheduleIdle();

      return () => {
        disposed = true;
        if (scheduleFrame) cancelAnimationFrame(scheduleFrame);
        if (dragState && dragState.frame) cancelAnimationFrame(dragState.frame);
        if (dragState) {
          dragState.toggle.style.removeProperty('--mw-drag-x');
          dragState.toggle.style.removeProperty('--mw-drag-y');
          dragState = null;
        }
        if (paneObserver) paneObserver.disconnect();
        if (bodyObserver) bodyObserver.disconnect();
        window.clearInterval(metricsTimer);
        window.clearInterval(taskTimer);
        window.clearInterval(focusTick);
        window.clearTimeout(openTimer);
        window.clearTimeout(closeTimer);
        window.clearTimeout(idleTimer);
        if (metricsAbort) metricsAbort.abort();
        if (taskAbort) taskAbort.abort();
        for (const [target, name, handler, options] of listeners) {
          target.removeEventListener(name, handler, options);
        }
        dock?.removeEventListener('click', onDockClick);
        clearDecorated();
        metrics?.remove();
        dock?.remove();
        halo?.remove();
        if (surface) surface.classList.remove('mw-sidebar-surface');
        html.style.removeProperty('--mw-wheel-cx');
        html.style.removeProperty('--mw-wheel-cy');
        delete html.dataset.mineSidebar;
        delete html.dataset.mineSidebarCollapsed;
        delete html.dataset.mwWheelOpen;
        delete html.dataset.mwWheelIdle;
        html.classList.remove('mw-wheel-dragging');
      };
    }

    // ---------------------------------------------------------------------
    // Mount
    // ---------------------------------------------------------------------

    function apply(ctx) {
      ctx.effect(() => {
        try {
          return ctx.locale.register(NS, { zh, en });
        } catch {
          return () => {};
        }
      }, 'mine-workbench: dictionaries');
      try {
        t = ctx.locale.bind(NS);
      } catch {
        t = (key) => key;
      }

      prefs = loadPrefs();
      try {
        document.documentElement.dataset.mwBuild = '1.1.2';
        console.info('[DSH·Mine] client build 1.1.2');
      } catch {}

      ctx.effect(() => {
        if (typeof document === 'undefined' || document.head === null) return () => {};
        const style = document.createElement('style');
        style.dataset.mineWorkbenchStyle = '';
        style.textContent = CSS;
        document.head.appendChild(style);
        return () => {
          style.remove();
        };
      }, 'mine-workbench: styles');

      const getService = (name) => {
        try {
          return ctx.get(name);
        } catch {
          return undefined;
        }
      };

      const actions = {
        startSession(workspaceId) {
          const ui = getService('uiWorkspace');
          if (!ui || typeof ui.startSession !== 'function') return;
          try {
            ui.startSession(workspaceId || undefined, { agentPreset: PRESET_ID });
          } catch (error) {
            console.warn('[mine-workbench] start session failed:', error);
          }
        },
        openSession(sessionId) {
          const ui = getService('uiWorkspace');
          if (!ui || typeof ui.openSession !== 'function') return;
          try {
            ui.openSession(sessionId);
          } catch (error) {
            console.warn('[mine-workbench] open session failed:', error);
          }
        },
        openWorkspace(workspaceId) {
          const ui = getService('uiWorkspace');
          if (!ui || typeof ui.openWorkspace !== 'function') return;
          try {
            Promise.resolve(ui.openWorkspace(workspaceId, undefined, { agentPreset: PRESET_ID }))
              .catch((error) => console.warn('[mine-workbench] open workspace failed:', error));
          } catch (error) {
            console.warn('[mine-workbench] open workspace failed:', error);
          }
        },
        openPanel(panelId) {
          const layout = getService('layout');
          if (layout && typeof layout.selectPanel === 'function') layout.selectPanel(panelId);
        },
        async addWorkspace() {
          const ui = getService('uiWorkspace');
          const workspaces = getService('workspaces');
          if (!ui || !workspaces
            || typeof ui.pickDirectory !== 'function'
            || typeof workspaces.create !== 'function'
            || typeof ui.openWorkspace !== 'function') {
            return { ok: false, error: 'unavailable' };
          }
          let path = null;
          try {
            path = await ui.pickDirectory();
          } catch (error) {
            console.warn('[mine-workbench] directory picker failed:', error);
            return { ok: false, error: 'unavailable' };
          }
          if (!path) return { ok: false, cancelled: true };
          try {
            const workspace = await workspaces.create({ path });
            await ui.openWorkspace(workspace.workspaceId, undefined, { agentPreset: PRESET_ID });
            return { ok: true };
          } catch (error) {
            console.warn('[mine-workbench] add workspace failed:', error);
            return { ok: false, error: 'failed' };
          }
        },
      };

      ctx.effect(() => installWheelSidebar(ctx, actions), 'mine-workbench: wheel sidebar');

      ctx.effect(() => {
        const disposers = [];
        const remember = (dispose) => {
          if (typeof dispose === 'function') disposers.push(dispose);
        };
        const register = (options, component) => {
          try {
            remember(ctx.slots.register(options, component));
            return;
          } catch (directError) {
            /* At boot the slot may not be declared yet. `inject` waits for the
               declaration, then registers at declaration time. */
            try {
              remember(ctx.slots.inject(options.name, () => {
                try {
                  return ctx.slots.register(options, component);
                } catch (error) {
                  console.error('[mine-workbench] register failed', options.name, error);
                  return () => {};
                }
              }));
            } catch (injectError) {
              console.error('[mine-workbench] register failed', options.name, directError, injectError);
            }
          }
        };

        register({
          name: 'sidebar.brand.mark',
          priority: -1,
        }, Mark);
        register({
          name: 'sidebar.brand.name',
          priority: -1,
        }, BrandName);
        register({
          name: 'conversation.hero.brand.mark',
        }, Mark);
        register({
          name: 'sidebar.panellist',
          id: PANEL_ID,
          order: -10,
          label: () => t('panel.label'),
        }, PanelIcon);
        register({
          name: 'main',
          key: PANEL_ID,
          inject: () => ({ actions }),
        }, WorkbenchPanel);
        register({
          name: 'settings.section',
          id: PANEL_ID,
          order: 5,
          label: () => t('settings.title'),
        }, SettingsPanel);

        return () => {
          for (const dispose of disposers.splice(0)) {
            try {
              dispose();
            } catch {
              /* The owning effect may already have disposed it. */
            }
          }
        };
      }, 'mine-workbench: slot registrations');
    }

    return {
      inject: ['slots', 'locale', 'layout', 'uiWorkspace', 'workspaces'],
      apply,
    };
  },
});
