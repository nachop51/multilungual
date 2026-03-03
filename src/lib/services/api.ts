import type { ChatInput, TranslationInput, WriterInput } from '@/lib/types.d'

import { treaty } from '@elysiajs/eden'
import type { App } from '../../../server/src/index'

// @ts-expect-error - Elysia types are compatible
export const apiClient = treaty<App>(
  import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
)

export function translateText(data: TranslationInput) {
  return apiClient.api.translate.post(data)
}

export function rewriteText(data: WriterInput) {
  return apiClient.api.rewrite.post({
    text: data.text,
    language: data.language,
    style: data.style,
    tone: data.tone,
    audience: data.audience,
    fluency: data.fluency,
  })
}

export function chatWithAi(data: ChatInput) {
  return apiClient.api.chat.post({
    message: data.message,
    history: data.history,
  })
}
