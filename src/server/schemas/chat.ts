import z from 'zod'
import { CHAT_ROLES } from '@/types.d'

export const chatSchema = z.object({
  message: z
    .string()
    .min(1, 'Message is required')
    .max(500, 'Message is too long, maximum 500 characters'),
  history: z
    .array(
      z.object({
        role: z.enum(CHAT_ROLES),
        content: z.string().min(1, 'Content is required'),
      }),
    )
    .default([]),
})
