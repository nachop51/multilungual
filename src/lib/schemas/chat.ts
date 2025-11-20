import z from 'zod'

export const chatSchema = z.object({
  message: z
    .string()
    .min(1, 'Message is required')
    .max(500, 'Message is too long, maximum 500 characters'),
  conversationId: z.string(),
})
