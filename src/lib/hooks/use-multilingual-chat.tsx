import { useRef, useState } from 'react'
import { CHAT_ROLES, type ChatMessage } from '@/types.d'
import { MAX_PROMPT_LENGTH } from '../consts'
import { chatWithAi } from '../services/api'

export const useMultilingualChat = () => {
  const [prompt, setPrompt] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const chatId = useRef(`chat-${Date.now()}-${Math.random()}`)

  const submitAiResponse = (response: string) => {
    setChatHistory((p) => [...p, { role: CHAT_ROLES.AI, content: response }])
  }

  const submitPrompt = async () => {
    if (prompt.trim() === '' || prompt.length > MAX_PROMPT_LENGTH) return

    const userPrompt = prompt.trim()

    setChatHistory((p) => [
      ...p,
      { role: CHAT_ROLES.USER, content: userPrompt },
    ])
    setPrompt('')

    const { response } = await chatWithAi({
      message: userPrompt,
      conversationId: chatId.current,
    })

    submitAiResponse(response)
  }

  return {
    prompt,
    setPrompt,
    chatHistory,
    submitPrompt,
    submitAiResponse,
  }
}
