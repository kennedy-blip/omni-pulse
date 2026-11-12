import React, { useState } from 'react'
import { Command, Search, X, CheckCircle, AlertCircle, Wifi, WifiOff } from 'lucide-react'
import clsx from 'clsx'

const CommandBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isOnline, setIsOnline] = useState(true)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Search:', searchQuery)
      setSearchQuery('')
      setIsOpen(false)
    }
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="flex items-center gap-3">
        <div className={clsx(
          'glass px-4 py-2 rounded-lg flex items-center gap-3',
          'border border-white/10',
          isOnline ? 'border-glow-emerald' : 'border-glow-rose'
        )}>
          <Command className="w-5 h-5 text-cyber-violet" />
          <span className="text-sm font-medium text-gray-300">Cmd+K</span>
          <div className="h-4 w-px bg-white/20" />
          <span className={clsx(
            'text-xs font-semibold',
            isOnline ? 'text-cyber-emerald' : 'text-cyber-rose'
          )}>
            {isOnline ? 'Master Control: Online' : 'Master Control: Offline'}
          </span>
          {isOnline ? (
            <CheckCircle className="w-4 h-4 text-cyber-emerald" />
          ) : (
            <WifiOff className="w-4 h-4 text-cyber-rose" />
          )}
        </div>

        {isOpen && (
          <div className="absolute top-full mt-2 w-96 glass-strong rounded-xl p-4 border border-white/10">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to search..."
                className="w-full bg-obsidian-900/50 border border-white/10 rounded-lg px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-violet focus:ring-2 focus:ring-cyber-violet/20 transition-smooth"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-smooth"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </form>

            <div className="mt-4 space-y-2">
              <div className="text-xs text-gray-500 uppercase tracking-wider">Quick Actions</div>
              <div className="grid grid-cols-2 gap-2">
                {['New Agent', 'AI Chat', 'DB Query', 'System Stats'].map((action) => (
                  <button
                    key={action}
                    onClick={() => setSearchQuery(action.toLowerCase())}
                    className="text-left px-3 py-2 rounded bg-white/5 hover:bg-cyber-violet/20 hover:border hover:border-cyber-violet/30 transition-smooth text-sm"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommandBar