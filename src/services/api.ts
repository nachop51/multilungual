import type { Translation, TranslationResponse } from '@/types'
import ky from 'ky'

const api = ky.create({
  prefixUrl: '/api',
})

export function translateText({
  sourceText,
  sourceLanguage,
  targetLanguage,
}: Omit<Translation, 'translatedText'>) {
  return api
    .post('translate', {
      json: {
        sourceText,
        sourceLanguage,
        targetLanguage,
      },
    })
    .json<TranslationResponse>()
}
