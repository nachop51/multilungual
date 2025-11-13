import { GoogleGenAI } from '@google/genai'
import { GEMINI_MODEL } from './consts'
import type { Translation, WriterInput } from '@/types.d'

const ai = new GoogleGenAI({})

const translationPrompt = (
  text: string,
  sourceLang: string,
  targetLang: string,
) => `
You are a translation assistant.

Translate the text from ${sourceLang} to ${targetLang}.

Rules:
1. Preserve meaning and important details.
2. Use natural, fluent {targetLang}.
3. Match the original tone (formal/informal, serious/friendly, etc.).
4. Adapt idioms and expressions to natural equivalents in {targetLang}.
5. Do NOT add explanations, notes, or extra information.
6. Output ONLY the translated text.

Text:
${text}
`

export async function geminiTranslate({
  sourceText,
  sourceLanguage,
  targetLanguage,
}: Omit<Translation, 'translatedText'>): Promise<string> {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: translationPrompt(sourceText, sourceLanguage, targetLanguage),
  })

  return response.text ?? ''
}

const generateRewritePrompt = (
  text: string,
  style: string,
  language: string,
  tone: string,
  audience?: string,
  fluency?: string,
) => `
Role: You are an expert linguistic rewriter and editor. Your task is to revise and refine the provided user text based on a strict set of instructions for style, tone, audience, and linguistic fluency.

Rewrite the user's text using these settings:
- language: ${language}
- style: ${style}        // e.g. formal, informal, academic, marketing…
- tone: ${tone}          // e.g. friendly, neutral, professional…
- audience: ${audience}  // e.g. beginners, experts, general public…
- fluency: ${fluency}    // beginner, intermediate, advanced, native

Rules:
1. Write only in {language}.
2. Match the requested style and tone consistently.
3. Adapt complexity to {fluency}:
   - beginner: short sentences, basic words, no idioms.
   - intermediate: moderate complexity, mostly clear language.
   - advanced/native: natural, fluent, richer vocabulary.
4. Tailor explanations and jargon level to the audience.
5. Keep the original meaning and important details.
6. Improve clarity, grammar, and flow; you may reorder sentences.
7. Do NOT add new facts or commentary.
8. Output ONLY the rewritten text, no explanations.

Text:
{text}
`

export async function geminiRewrite({
  text,
  style,
  language,
  tone,
  audience,
  fluency,
}: WriterInput): Promise<string> {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: generateRewritePrompt(
      text,
      style,
      language,
      tone,
      audience,
      fluency,
    ),
  })

  // console.log('gemini response:', response)

  return response.text ?? ''
}
