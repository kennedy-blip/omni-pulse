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
var AiWorkspace = function () {
    var _a = (0, react_1.useState)([
        { id: 1, role: 'assistant', content: 'OmniPulse AI online. Select model to begin.' }
    ]), messages = _a[0], setMessages = _a[1];
    var _b = (0, react_1.useState)(''), input = _b[0], setInput = _b[1];
    var _c = (0, react_1.useState)(false), isStreaming = _c[0], setIsStreaming = _c[1];
    var _d = (0, react_1.useState)('omni-7b'), selectedModel = _d[0], setSelectedModel = _d[1];
    var handleSend = function (e) {
        e.preventDefault();
        if (!input.trim() || isStreaming)
            return;
        var userMessage = { id: Date.now(), role: 'user', content: input };
        var assistantMessage = { id: Date.now() + 1, role: 'assistant', content: '' };
        setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [userMessage, assistantMessage], false); });
        setInput('');
        setIsStreaming(true);
        // Simulate streaming response
        var response = "Processing via ".concat(selectedModel, "...");
        var i = 0;
        var interval = setInterval(function () {
            i += 3;
            var partial = response.substring(0, i);
            setMessages(function (prev) { return prev.map(function (m) { return m.id === assistantMessage.id ? __assign(__assign({}, m), { content: partial }) : m; }); });
            if (i >= response.length) {
                clearInterval(interval);
                setIsStreaming(false);
            }
        }, 30);
    };
    var models = [
        { id: 'omni-7b', name: 'Omni-7B', desc: 'Local General Purpose' },
        { id: 'code-13b', name: 'Code-13B', desc: 'Local Code Specialist' },
        { id: 'vision-3b', name: 'Vision-3B', desc: 'Local Multimodal' },
    ];
    return (<div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <lucide_react_1.Cpu className="w-5 h-5 text-cyber-violet"/>
          <h2 className="text-lg font-semibold">AI Workspace</h2>
        </div>
        <div className="flex gap-2">
          {models.map(function (model) { return (<button key={model.id} onClick={function () { return setSelectedModel(model.id); }} className={(0, clsx_1.default)('px-3 py-1.5 rounded-lg text-xs font-medium border transition-smooth', selectedModel === model.id
                ? 'bg-cyber-violet/20 border-cyber-violet/50 text-cyber-violet'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10')}>
              {model.name}
            </button>); })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto glass rounded-xl p-4 mb-4">
        {messages.map(function (message) { return (<div key={message.id} className="mb-4 flex gap-3">
            <div className={(0, clsx_1.default)('w-8 h-8 rounded-full flex items-center justify-center shrink-0', message.role === 'user' ? 'bg-cyber-cyan/20' : 'bg-cyber-violet/20')}>
              {message.role === 'user' ? <lucide_react_1.User className="w-4 h-4 text-cyber-cyan"/> : <lucide_react_1.Bot className="w-4 h-4 text-cyber-violet"/>}
            </div>
            <div className={(0, clsx_1.default)('flex-1 p-3 rounded-lg', message.role === 'user' ? 'bg-cyber-cyan/10 ml-auto' : 'bg-white/5')}>
              <p className="text-sm whitespace-pre-wrap">{message.content || '...'}</p>
            </div>
          </div>); })}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input type="text" value={input} onChange={function (e) { return setInput(e.target.value); }} placeholder="Ask OmniPulse AI..." className="flex-1 bg-obsidian-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-violet focus:ring-2 focus:ring-cyber-violet/20 transition-smooth"/>
        <button type="submit" disabled={isStreaming} className="px-4 py-3 bg-cyber-violet/20 border border-cyber-violet/50 rounded-lg hover:bg-cyber-violet/30 transition-smooth disabled:opacity-50">
          <lucide_react_1.Send className="w-5 h-5 text-cyber-violet"/>
        </button>
      </form>
    </div>);
};
exports.default = AiWorkspace;
