import React, { useState } from 'react'
import CommandBar from './components/CommandBar'
import AiWorkspace from './components/AiWorkspace'
import AgentSwarm from './components/AgentSwarm'
import KnowledgeMesh from './components/KnowledgeMesh'
import DbStudio from './components/DbStudio'
import SystemMonitor from './components/SystemMonitor'
import { LayoutDashboard, Cpu, Bot, Database, Network, Activity, Settings } from 'lucide-react'
import clsx from 'clsx'

type Module = 'dashboard' | 'ai' | 'agents' | 'knowledge' | 'db' | 'system'

const modules: { id: Module; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'ai', label: 'AI Workspace', icon: <Cpu className="w-5 h-5" /> },
  { id: 'agents', label: 'Agent Swarm', icon: <Bot className="w-5 h-5" /> },
  { id: 'knowledge', label: 'Knowledge Mesh', icon: <Network className="w-5 h-5" /> },
  { id: 'db', label: 'DB Studio', icon: <Database className="w-5 h-5" /> },
  { id: 'system', label: 'System Monitor', icon: <Activity className="w-5 h-5" /> },
]

const moduleComponents: Record<Module, React.FC> = {
  dashboard: () => <div className="flex items-center justify-center h-full text-gray-500">Dashboard Overview</div>,
  ai: AiWorkspace,
  agents: AgentSwarm,
  knowledge: KnowledgeMesh,
  db: DbStudio,
  system: SystemMonitor,
}

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<Module>('dashboard')

  return (
    <div className="min-h-screen bg-obsidian-900">
      <CommandBar />

      <div className="flex h-screen">
        <aside className="w-64 glass border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-violet to-cyber-cyan flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-white">OmniPulse</h1>
                <p className="text-xs text-gray-500">Sovereign Control Center</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {modules.map(module => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={clsx(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth text-sm font-medium',
                  activeModule === module.id
                    ? 'bg-cyber-violet/20 border border-cyber-violet/50 text-cyber-violet'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                )}
              >
                {module.icon}
                {module.label}
              </button>
            ))}
          </nav>

          <div className="p-3 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse-glow" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 overflow-auto">
          <div className="h-full">
            {(() => { const Component = moduleComponents[activeModule]; return <Component />; })()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App