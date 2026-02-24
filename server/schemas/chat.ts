import z from 'zod'
import { CHAT_ROLES } from '@/types.d'
import { MAX_PROMPT_LENGTH } from '@//lib/consts'

export const chatSchema = z.object({
  message: z
    .string()
    .min(1, 'Message is required')
    .max(
      MAX_PROMPT_LENGTH,
      `Message is too long, maximum ${MAX_PROMPT_LENGTH} characters`,
    ),
  history: z
    .array(
      z.object({
        role: z.enum(CHAT_ROLES),
        content: z.string().min(1, 'Content is required'),
      }),
    )
    .default([]),
})
