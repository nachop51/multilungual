import type {
  AssistantModelMessage,
  SystemModelMessage,
  UserModelMessage,
} from 'ai'

export const MAX_PROMPT_LENGTH = 2000

export const LANGUAGES = {
  DETECT: 'detect',
  ENGLISH: 'english',
  UK_ENGLISH: 'uk_english',
  SPANISH: 'spanish',
  FRENCH: 'french',
  GERMAN: 'german',
  ITALIAN: 'italian',
  PORTUGUESE: 'portuguese',
  RUSSIAN: 'russian',
  CHINESE: 'chinese',
  JAPANESE: 'japanese',
  KOREAN: 'korean',
  HINDI: 'hindi',
  ARABIC: 'arabic',
  BENGALI: 'bengali',
  DUTCH: 'dutch',
  GREEK: 'greek',
  INDONESIAN: 'indonesian',
  MALAY: 'malay',
  NORWEGIAN: 'norwegian',
  POLISH: 'polish',
  SWEDISH: 'swedish',
  TURKISH: 'turkish',
  UKRAINIAN: 'ukrainian',
  VIETNAMESE: 'vietnamese',
  MAURITIAN_CREOLE: 'mauritian_creole',
  HAITIAN_CREOLE: 'haitian_creole',
  JAVANESE: 'javanese',
  QUECHUA: 'quechua',
  IRISH: 'irish',
  WELSH: 'welsh',
  ZULU: 'zulu',
  AFRIKAANS: 'afrikaans',
  ALBANIAN: 'albanian',
  AMHARIC: 'amharic',
  ARMENIAN: 'armenian',
  AZERBAIJANI: 'azerbaijani',
  BANGLA: 'bangla',
  BOSNIAN: 'bosnian',
  BULGARIAN: 'bulgarian',
  CATALAN: 'catalan',
  CROATIAN: 'croatian',
  CZECH: 'czech',
  DANISH: 'danish',
  ESTONIAN: 'estonian',
  FINNISH: 'finnish',
  HUNGARIAN: 'hungarian',
}

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES]

export const CHAT_ROLES = {
  USER: 'user',
  AI: 'assistant',
} as const

export type ChatRole = (typeof CHAT_ROLES)[keyof typeof CHAT_ROLES]

export const TONES = {
  NEUTRAL: 'Neutral', // Unbiased, objective, no emotional coloring.
  FORMAL: 'Formal', // Serious, respectful, structured.
  CASUAL: 'Casual', // Relaxed, informal, conversational.
  EMPATHETIC: 'Empathetic', // Sympathetic, understanding, focuses on feelings.
  HUMOROUS: 'Humorous', // Lighthearted, witty, playful.
  FRIENDLY: 'Friendly', // Warm, welcoming, optimistic.
}

export type Tone = (typeof TONES)[keyof typeof TONES]

/**
 * STYLE: Defines the structural presentation and purpose of the writing.
 * This controls length, verbosity, persuasion, and narrative structure.
 */
export const STYLES = {
  NORMAL: 'Normal', // Standard style without any specific emphasis.
  CONCISE: 'Concise', // Focuses on brevity, eliminating filler (covers "Direct" and "Summarize").
  DESCRIPTIVE: 'Descriptive', // Focuses on detail, elaboration, and imagery (covers "Expand").
  PERSUASIVE: 'Persuasive', // Aims to convince the reader of a viewpoint or action (CTA).
  NARRATIVE: 'Narrative', // Tells a story, focuses on flow and plot structure.
  EXPOSITORY: 'Expository', // Explains, informs, or clarifies (suitable for educational text).
  ACTIVE_VOICE: 'Active Voice', // Focuses purely on rewriting from passive to active sentences.
}

export type Style = (typeof STYLES)[keyof typeof STYLES]

/**
 * FLUENCY: Adjusts the linguistic quality and sophistication of the output.
 * This is primarily for non-native writing or language level adjustment.
 */
export const FLUENCY_LEVELS = {
  BASIC: 'Basic (A1/A2)', // Simple vocabulary and sentence structure (A1/A2 level).
  CONVERSATIONAL: 'Conversational (B1/B2)', // Everyday language, common idioms (B1/B2 level).
  FLUENT: 'Fluent (C1)', // Complex sentence structures, varied vocabulary (C1 level).
  NATIVE: 'Native (C2)', // Perfect idioms, nuances, and cultural appropriateness (C2 level).
}

export type FluencyLevel = (typeof FLUENCY_LEVELS)[keyof typeof FLUENCY_LEVELS]

/**
 * AUDIENCE: Specifies the expected knowledge level of the reader.
 * This adjusts technical jargon and general complexity.
 */
export const AUDIENCES = {
  GENERAL: 'General Public', // Broad audience, no assumed specialized knowledge.
  PROFESSIONAL: 'Professional', // Business-specific language, suitable for colleagues/clients.
  ACADEMIC: 'Academic', // Formal structure, citations, research terminology.
  TECHNICAL: 'Technical Expert', // Highly specialized jargon for a domain expert.
  CHILDREN: 'Children', // Age-appropriate, very simple language.
}

export type Audience = (typeof AUDIENCES)[keyof typeof AUDIENCES]

export type ChatMessage =
  | SystemModelMessage
  | UserModelMessage
  | AssistantModelMessage
