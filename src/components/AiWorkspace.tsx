import React, { useState } from 'react'
import { Send, Bot, User, Cpu, Zap, Database } from 'lucide-react'
import clsx from 'clsx'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
}

const AiWorkspace: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'assistant', content: 'OmniPulse AI online. Select model to begin.' }
  ])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [selectedModel, setSelectedModel] = useState('omni-7b')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isStreaming) return
    const userMessage: Message = { id: Date.now(), role: 'user', content: input }
    const assistantMessage: Message = { id: Date.now() + 1, role: 'assistant', content: '' }
    setMessages(prev => [...prev, userMessage, assistantMessage])
    setInput('')
    setIsStreaming(true)

    // Simulate streaming response
    let response = `Processing via ${selectedModel}...`
    let i = 0
    const interval = setInterval(() => {
      i += 3
      const partial = response.substring(0, i)
      setMessages(prev => prev.map(m => m.id === assistantMessage.id ? { ...m, content: partial } : m))
      if (i >= response.length) {
        clearInterval(interval)
        setIsStreaming(false)
      }
    }, 30)
  }

  const models = [
    { id: 'omni-7b', name: 'Omni-7B', desc: 'Local General Purpose' },
    { id: 'code-13b', name: 'Code-13B', desc: 'Local Code Specialist' },
    { id: 'vision-3b', name: 'Vision-3B', desc: 'Local Multimodal' },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyber-violet" />
          <h2 className="text-lg font-semibold">AI Workspace</h2>
        </div>
        <div className="flex gap-2">
          {models.map(model => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-xs font-medium border transition-smooth',
                selectedModel === model.id
                  ? 'bg-cyber-violet/20 border-cyber-violet/50 text-cyber-violet'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
              )}
            >
              {model.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto glass rounded-xl p-4 mb-4">
        {messages.map(message => (
          <div key={message.id} className="mb-4 flex gap-3">
            <div className={clsx(
              'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
              message.role === 'user' ? 'bg-cyber-cyan/20' : 'bg-cyber-violet/20'
            )}>
              {message.role === 'user' ? <User className="w-4 h-4 text-cyber-cyan" /> : <Bot className="w-4 h-4 text-cyber-violet" />}
            </div>
            <div className={clsx(
              'flex-1 p-3 rounded-lg',
              message.role === 'user' ? 'bg-cyber-cyan/10 ml-auto' : 'bg-white/5'
            )}>
              <p className="text-sm whitespace-pre-wrap">{message.content || '...'}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask OmniPulse AI..."
          className="flex-1 bg-obsidian-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-violet focus:ring-2 focus:ring-cyber-violet/20 transition-smooth"
        />
        <button
          type="submit"
          disabled={isStreaming}
          className="px-4 py-3 bg-cyber-violet/20 border border-cyber-violet/50 rounded-lg hover:bg-cyber-violet/30 transition-smooth disabled:opacity-50"
        >
          <Send className="w-5 h-5 text-cyber-violet" />
        </button>
      </form>
    </div>
  )
}

export default AiWorkspace