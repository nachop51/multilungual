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

export enum TONES {
  NEUTRAL = 'Neutral', // Unbiased, objective, no emotional coloring.
  FORMAL = 'Formal', // Serious, respectful, structured.
  CASUAL = 'Casual', // Relaxed, informal, conversational.
  EMPATHETIC = 'Empathetic', // Sympathetic, understanding, focuses on feelings.
  HUMOROUS = 'Humorous', // Lighthearted, witty, playful.
  FRIENDLY = 'Friendly', // Warm, welcoming, optimistic.
}

/**
 * STYLE: Defines the structural presentation and purpose of the writing.
 * This controls length, verbosity, persuasion, and narrative structure.
 */
export enum STYLES {
  NORMAL = 'Normal', // Standard style without any specific emphasis.
  CONCISE = 'Concise', // Focuses on brevity, eliminating filler (covers "Direct" and "Summarize").
  DESCRIPTIVE = 'Descriptive', // Focuses on detail, elaboration, and imagery (covers "Expand").
  PERSUASIVE = 'Persuasive', // Aims to convince the reader of a viewpoint or action (CTA).
  NARRATIVE = 'Narrative', // Tells a story, focuses on flow and plot structure.
  EXPOSITORY = 'Expository', // Explains, informs, or clarifies (suitable for educational text).
  ACTIVE_VOICE = 'Active Voice', // Focuses purely on rewriting from passive to active sentences.
}

/**
 * FLUENCY: Adjusts the linguistic quality and sophistication of the output.
 * This is primarily for non-native writing or language level adjustment.
 */
export enum FLUENCY_LEVELS {
  BASIC = 'Basic (A1/A2)', // Simple vocabulary and sentence structure (A1/A2 level).
  CONVERSATIONAL = 'Conversational (B1/B2)', // Everyday language, common idioms (B1/B2 level).
  FLUENT = 'Fluent (C1)', // Complex sentence structures, varied vocabulary (C1 level).
  NATIVE = 'Native (C2)', // Perfect idioms, nuances, and cultural appropriateness (C2 level).
}

/**
 * AUDIENCE: Specifies the expected knowledge level of the reader.
 * This adjusts technical jargon and general complexity.
 */
export enum AUDIENCES {
  GENERAL = 'General Public', // Broad audience, no assumed specialized knowledge.
  PROFESSIONAL = 'Professional', // Business-specific language, suitable for colleagues/clients.
  ACADEMIC = 'Academic', // Formal structure, citations, research terminology.
  TECHNICAL = 'Technical Expert', // Highly specialized jargon for a domain expert.
  CHILDREN = 'Children', // Age-appropriate, very simple language.
}

export interface WriterInput {
  text: string
  language: Language
  style: STYLES
  tone: TONES
  fluency?: FLUENCY_LEVELS
  audience?: AUDIENCES
}

export interface WriterResponse {
  improvedText: string
}

export enum CHAT_ROLES {
  USER = 'user',
  AI = 'model',
}

export interface ChatMessage {
  role: CHAT_ROLES
  content: string
}

export interface ChatInput {
  message: string
  conversationId: string
}

export interface ChatResponse {
  response: string
}
