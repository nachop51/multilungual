import { useState } from 'react'
import { CHAT_ROLES } from '@/types.d'
import { MAX_PROMPT_LENGTH } from '../consts'
import { chatWithAi } from '../services/api'
import type { ModelMessage } from 'ai'

export const useMultilingualChat = () => {
  const [prompt, setPrompt] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [chatHistory, setChatHistory] = useState<
    (ModelMessage & { id: number })[]
  >([])

  const submitAiResponse = (response: string) => {
    setChatHistory((p) => [
      ...p,
      { role: CHAT_ROLES.AI, content: response, id: p.length + 1 },
    ])
  }

  const submitPrompt = async () => {
    if (prompt.trim() === '' || prompt.length > MAX_PROMPT_LENGTH) return

    const userPrompt = prompt.trim()

    setChatHistory((p) => [
      ...p,
      { role: CHAT_ROLES.USER, content: userPrompt, id: p.length + 1 },
    ])

    const stream = await chatWithAi({
      message: userPrompt,
      history: chatHistory,
    })

    setChatHistory((p) => [
      ...p,
      { role: CHAT_ROLES.AI, content: '', id: p.length + 1 },
    ])
    setIsStreaming(true)

    const reader = stream.body?.pipeThrough(new TextDecoderStream()).getReader()

    if (!reader) return

    while (true) {
      const { done, value } = await reader.read()

      if (done) break
      setChatHistory((p) => [
        ...p.slice(0, -1),
        {
          role: CHAT_ROLES.AI,
          content: (p[p.length - 1]?.content ?? '') + value,
          id: p.length,
        },
      ])
    }

    setIsStreaming(false)
  }

  return {
    prompt,
    setPrompt,
    chatHistory,
    isStreaming,
    submitPrompt,
    submitAiResponse,
  }
}
