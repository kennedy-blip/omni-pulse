"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var clsx_1 = require("clsx");
var categories = [
    { id: 'repos', name: 'Repositories', color: '#8b5cf6' },
    { id: 'env', name: 'Environment', color: '#10b981' },
    { id: 'api', name: 'API Endpoints', color: '#06b6d4' },
    { id: 'vectors', name: 'Vector DB', color: '#f59e0b' },
    { id: 'workers', name: 'Background Workers', color: '#f43f5e' },
];
var nodes = [
    { id: 'repo-1', label: 'Project Alpha', type: 'repo', color: '#8b5cf6', size: 120 },
    { id: 'repo-2', label: 'Data Lake', type: 'repo', color: '#8b5cf6', size: 95 },
    { id: 'env-1', label: 'Dev Prod', type: 'env', color: '#10b981', size: 80 },
    { id: 'api-1', label: 'Auth Service', type: 'api', color: '#06b6d4', size: 110 },
    { id: 'vec-1', label: 'Embedding Store', type: 'vector', color: '#f59e0b', size: 90 },
    { id: 'worker-1', label: 'Task Queue', type: 'worker', color: '#f43f5e', size: 85 },
];
var Node = function (_a) {
    var node = _a.node, selected = _a.selected, onSelect = _a.onSelect;
    var isSelected = node.id === selected;
    return (<div key={node.id} onClick={function () { return onSelect(node.id); }} className={(0, clsx_1.default)('glass rounded-xl p-3 transition-all duration-300 cursor-pointer', isSelected
            ? 'border-2 border-cyber-violet/50 bg-cyber-violet/10 text-cyber-violet'
            : 'border border-white/10 bg-white/5')}>
      <div className={(0, clsx_1.default)('w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium', node.type === 'repo' ? 'bg-cyber-violet' :
            node.type === 'env' ? 'bg-cyber-emerald' :
                node.type === 'api' ? 'bg-cyan-500' :
                    node.type === 'vector' ? 'bg-amber-500' :
                        node.type === 'worker' ? 'bg-rose-500' :
                            'bg-white/5')}>
        {node.type === 'repo' ? 'R' : node.type === 'env' ? 'E' : node.type === 'api' ? 'A' : node.type === 'vector' ? 'V' : 'W'}
      </div>
      <div className="mt-1">
        <p className="text-xs font-medium">{node.label}</p>
        <p className="text-xs text-gray-500">{node.size}KB</p>
      </div>
    </div>);
};
var KnowledgeMesh = function () {
    var _a = (0, react_1.useState)(''), selected = _a[0], setSelected = _a[1];
    var _b = (0, react_1.useState)(''), search = _b[0], setSearch = _b[1];
    var filteredNodes = nodes.filter(function (n) {
        return n.label.toLowerCase().includes(search.toLowerCase()) ||
            n.type.toLowerCase().includes(search.toLowerCase());
    });
    return (<div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <lucide_react_1.Cloud className="w-5 h-5 text-gray-400"/>
          <h2 className="text-xl font-semibold">Knowledge Mesh</h2>
        </div>
        <input type="text" value={search} onChange={function (e) { return setSearch(e.target.value); }} placeholder="Search nodes..." className="px-3 py-2 bg-obsidian-900/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-cyber-violet"/>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredNodes.map(function (node) { return (<Node key={node.id} node={node} selected={selected} onSelect={setSelected}/>); })}
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={function () { return setSelected(''); }} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-smooth text-sm">All</button>
      </div>
    </div>);
};
exports.default = KnowledgeMesh;
