import { Language } from '@/types.d'
import z from 'zod'

export const translateSchema = z.object({
  sourceText: z.string().min(1, 'Source text is required'),
  sourceLanguage: z.enum(Language),
  targetLanguage: z.enum(Language),
})
