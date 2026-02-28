export interface Translation {
  sourceText: string
  translatedText: string
  sourceLanguage: Language
  targetLanguage: Language
}

export type TranslationInput = Omit<Translation, 'translatedText'>

export interface WriterInput {
  text: string
  language: Language
  style: STYLES
  tone: TONES
  fluency?: FLUENCY_LEVELS
  audience?: AUDIENCES
}

export interface ChatInput {
  message: string
  history: ModelMessage[]
}
