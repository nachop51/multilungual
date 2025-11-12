import { GoogleGenAI } from '@google/genai'
import { GEMINI_MODEL } from './consts'
import type { Translation } from '@/types'

const ai = new GoogleGenAI({})

const translationPrompt = (
  text: string,
  sourceLang: string,
  targetLang: string
) => `
Translate the following text from ${sourceLang} to ${targetLang}:
"${text}"

Provide only the translated text without any additional explanations.
`

export async function geminiTranslate({
  sourceText,
  sourceLanguage,
  targetLanguage,
}: Omit<Translation, 'translatedText'>): Promise<string> {
  console.log('asking gemini to translate:', {
    sourceText,
    sourceLanguage,
    targetLanguage,
  })
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: translationPrompt(sourceText, sourceLanguage, targetLanguage),
  })

  console.log('gemini response:', response)

  return response.text ?? ''
}
