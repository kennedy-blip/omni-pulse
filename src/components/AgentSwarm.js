"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var clsx_1 = require("clsx");
var AgentSwarm = function () {
    var _a = (0, react_1.useState)([
        { id: 1, name: 'Code Review', status: 'completed', progress: 100, logs: ['Task completed successfully'] },
        { id: 2, name: 'Test Generation', status: 'running', progress: 45, logs: ['Initializing test suite', 'Generating tests...'] },
    ]), tasks = _a[0], setTasks = _a[1];
    var _b = (0, react_1.useState)(true), running = _b[0], setRunning = _b[1];
    var startTask = function (name) {
        var task = { id: Date.now(), name: name, status: 'running', progress: 0, logs: ["Dispatching ".concat(name, "...")] };
        setTasks(function (prev) { return __spreadArray(__spreadArray([], prev, true), [task], false); });
        var interval = setInterval(function () {
            setTasks(function (prev) { return prev.map(function (t) {
                if (t.id !== task.id)
                    return t;
                var progress = Math.min(100, t.progress + Math.random() * 15);
                var status = progress >= 100 ? 'completed' : 'running';
                var logs = __spreadArray(__spreadArray([], t.logs, true), ["Progress: ".concat(Math.round(progress), "%")], false);
                if (progress >= 100)
                    clearInterval(interval);
                return __assign(__assign({}, t), { progress: progress, status: status, logs: logs });
            }); });
        }, 1000);
    };
    var stopTask = function (id) {
        setTasks(function (prev) { return prev.map(function (t) { return t.id === id ? __assign(__assign({}, t), { status: 'failed', logs: __spreadArray(__spreadArray([], t.logs, true), ['Task cancelled by user'], false) }) : t; }); });
    };
    return (<div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <lucide_react_1.Bot className="w-5 h-5 text-cyber-emerald"/>
          <h2 className="text-lg font-semibold">Agent Swarm</h2>
        </div>
        <button onClick={function () { return setRunning(!running); }} className="px-4 py-2 rounded-lg bg-cyber-emerald/20 border border-cyber-emerald/50 hover:bg-cyber-emerald/30 transition-smooth flex items-center gap-2">
          <lucide_react_1.Play className="w-4 h-4"/>
          {running ? 'Stop Swarm' : 'Start Swarm'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {tasks.map(function (task) { return (<div key={task.id} className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <lucide_react_1.Cpu className={(0, clsx_1.default)('w-4 h-4', task.status === 'running' && 'animate-spin-slow text-cyber-emerald')}/>
                <span className="font-medium">{task.name}</span>
              </div>
              <span className={(0, clsx_1.default)('text-xs font-semibold uppercase', task.status === 'running' && 'text-cyber-emerald animate-pulse-glow', task.status === 'completed' && 'text-cyber-cyan', task.status === 'failed' && 'text-cyber-rose')}>
                {task.status}
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-cyber-emerald transition-all duration-500" style={{ width: "".concat(task.progress, "%") }}/>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <lucide_react_1.Terminal className="w-3 h-3"/>
              <span className="font-mono truncate">{task.logs.join(' | ')}</span>
            </div>
            {task.status === 'running' && (<button onClick={function () { return stopTask(task.id); }} className="mt-2 text-xs text-cyber-rose hover:underline">
                Cancel task
              </button>)}
          </div>); })}
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={function () { return startTask('Code Analysis'); }} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-smooth text-sm">
          + Code Analysis
        </button>
        <button onClick={function () { return startTask('Security Audit'); }} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-smooth text-sm">
          + Security Audit
        </button>
        <button onClick={function () { return startTask('Documentation'); }} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-smooth text-sm">
          + Documentation
        </button>
      </div>
    </div>);
};
exports.default = AgentSwarm;
