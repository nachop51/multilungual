export enum Language {
  DETECT = 'detect',
  ENGLISH = 'english',
  UK_ENGLISH = 'uk_english',
  SPANISH = 'spanish',
  FRENCH = 'french',
  GERMAN = 'german',
  ITALIAN = 'italian',
  PORTUGUESE = 'portuguese',
  RUSSIAN = 'russian',
  CHINESE = 'chinese',
  JAPANESE = 'japanese',
  KOREAN = 'korean',
  HINDI = 'hindi',
  ARABIC = 'arabic',
  BENGALI = 'bengali',
  DUTCH = 'dutch',
  GREEK = 'greek',
  INDONESIAN = 'indonesian',
  MALAY = 'malay',
  NORWEGIAN = 'norwegian',
  POLISH = 'polish',
  SWEDISH = 'swedish',
  TURKISH = 'turkish',
  UKRAINIAN = 'ukrainian',
  VIETNAMESE = 'vietnamese',
  MAURITIAN_CREOLE = 'mauritian_creole',
  QUECHUA = 'quechua',
  IRISH = 'irish',
  WELSH = 'welsh',
}

export interface Translation {
  sourceText: string
  translatedText: string
  sourceLanguage: Language
  targetLanguage: Language
}

export type TranslationInput = Omit<Translation, 'translatedText'>

export interface TranslationResponse {
  translation: string
}
