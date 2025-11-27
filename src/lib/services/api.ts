import type {
  ChatInput,
  ChatResponse,
  TranslationInput,
  TranslationResponse,
  WriterInput,
  WriterResponse,
} from '@/types'
import ky from 'ky'

const api = ky.create({
  prefixUrl: '/api',
})

export function translateText(data: TranslationInput) {
  return api
    .post('translate', {
      json: data,
    })
    .json<TranslationResponse>()
}

export function rewriteText(data: WriterInput) {
  return api
    .post('rewrite', {
      json: data,
    })
    .json<WriterResponse>()
}

export function chatWithAi(data: ChatInput) {
  return api
    .post('chat', {
      json: data,
    })
    .json<ChatResponse>()
}
