import React, { useState } from 'react'
import { Bot, Play, Square, Terminal, Cpu } from 'lucide-react'
import clsx from 'clsx'

interface AgentTask {
  id: number
  name: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  progress: number
  logs: string[]
}

const AgentSwarm: React.FC = () => {
  const [tasks, setTasks] = useState<AgentTask[]>([
    { id: 1, name: 'Code Review', status: 'completed', progress: 100, logs: ['Task completed successfully'] },
    { id: 2, name: 'Test Generation', status: 'running', progress: 45, logs: ['Initializing test suite', 'Generating tests...'] },
  ])
  const [running, setRunning] = useState(true)

  const startTask = (name: string) => {
    const task: AgentTask = { id: Date.now(), name, status: 'running', progress: 0, logs: [`Dispatching ${name}...`] }
    setTasks(prev => [...prev, task])
    const interval = setInterval(() => {
      setTasks(prev => prev.map(t => {
        if (t.id !== task.id) return t
        const progress = Math.min(100, t.progress + Math.random() * 15)
        const status = progress >= 100 ? 'completed' : 'running'
        const logs = [...t.logs, `Progress: ${Math.round(progress)}%`]
        if (progress >= 100) clearInterval(interval)
        return { ...t, progress, status, logs }
      }))
    }, 1000)
  }

  const stopTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'failed', logs: [...t.logs, 'Task cancelled by user'] } : t))
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-cyber-emerald" />
          <h2 className="text-lg font-semibold">Agent Swarm</h2>
        </div>
        <button
          onClick={() => setRunning(!running)}
          className="px-4 py-2 rounded-lg bg-cyber-emerald/20 border border-cyber-emerald/50 hover:bg-cyber-emerald/30 transition-smooth flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          {running ? 'Stop Swarm' : 'Start Swarm'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Cpu className={clsx('w-4 h-4', task.status === 'running' && 'animate-spin-slow text-cyber-emerald')} />
                <span className="font-medium">{task.name}</span>
              </div>
              <span className={clsx(
                'text-xs font-semibold uppercase',
                task.status === 'running' && 'text-cyber-emerald animate-pulse-glow',
                task.status === 'completed' && 'text-cyber-cyan',
                task.status === 'failed' && 'text-cyber-rose'
              )}>
                {task.status}
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-cyber-emerald transition-all duration-500"
                style={{ width: `${task.progress}%` }}
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Terminal className="w-3 h-3" />
              <span className="font-mono truncate">{task.logs.join(' | ')}</span>
            </div>
            {task.status === 'running' && (
              <button onClick={() => stopTask(task.id)} className="mt-2 text-xs text-cyber-rose hover:underline">
                Cancel task
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={() => startTask('Code Analysis')} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-smooth text-sm">
          + Code Analysis
        </button>
        <button onClick={() => startTask('Security Audit')} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-smooth text-sm">
          + Security Audit
        </button>
        <button onClick={() => startTask('Documentation')} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-smooth text-sm">
          + Documentation
        </button>
      </div>
    </div>
  )
}

export default AgentSwarm