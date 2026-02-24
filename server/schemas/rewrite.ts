import { AUDIENCES, FLUENCY_LEVELS, Language, STYLES, TONES } from '@/types.d'
import z from 'zod'

export const rewriteSchema = z.object({
  text: z.string().min(1, 'Text is required'),
  language: z.enum(Language),
  style: z.enum(STYLES),
  tone: z.enum(TONES),
  audience: z.enum(AUDIENCES).optional(),
  fluency: z.enum(FLUENCY_LEVELS).optional(),
})
