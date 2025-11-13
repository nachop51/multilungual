import { useState } from 'react'

interface ChatHistory {
  role: 'user' | 'ai'
  content: string
}

export const useMultilingualChat = () => {
  const [prompt, setPrompt] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])

  const submitPrompt = () => {
    if (prompt.trim() === '') return
    setChatHistory([...chatHistory, { role: 'user', content: prompt }])
    setPrompt('')
  }

  const submitAiResponse = (response: string) => {
    setChatHistory([...chatHistory, { role: 'ai', content: response }])
  }

  return {
    prompt,
    setPrompt,
    chatHistory,
    submitPrompt,
    submitAiResponse,
  }
}
