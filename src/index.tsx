import type { Content } from '@google/genai'
import { serve } from 'bun'
import z from 'zod'
import index from './index.html'
import { chatSchema } from './lib/schemas/chat'
import { rewriteSchema } from './lib/schemas/rewrite'
import { translateSchema } from './lib/schemas/translate'
import { geminiChat, geminiRewrite, geminiTranslate } from './server/gemini'
import {
  CHAT_ROLES,
  type ChatResponse,
  type TranslationResponse,
  type WriterResponse,
} from './types.d'

export const chatHistory = new Map<string, Content[]>()

const server = serve({
  hostname: '0.0.0.0',
  port: 3000,
  routes: {
    // Serve index.html for all unmatched routes.
    '/*': index,

    '/api/translate': {
      async POST(req) {
        if (
          !req.body ||
          req.headers.get('content-type') !== 'application/json'
        ) {
          return new Response('Bad Request', { status: 400 })
        }

        const res = translateSchema.safeParse(await req.json())

        if (!res.success) {
          return new Response(
            JSON.stringify(z.flattenError(res.error).fieldErrors),
            {
              status: 400,
            },
          )
        }

        const text = await geminiTranslate(res.data)

        const translation: TranslationResponse = {
          translation: text,
        }

        return Response.json(translation)
      },
    },

    '/api/rewrite': {
      async POST(req) {
        if (
          !req.body ||
          req.headers.get('content-type') !== 'application/json'
        ) {
          return new Response('Bad Request', { status: 400 })
        }

        const res = rewriteSchema.safeParse(await req.json())

        if (!res.success) {
          return new Response(
            JSON.stringify(z.flattenError(res.error).fieldErrors),
            { status: 400 },
          )
        }

        const text = await geminiRewrite(res.data)

        const rewrite: WriterResponse = {
          improvedText: text,
        }

        return Response.json(rewrite)
      },
    },

    '/api/chat': {
      async POST(req) {
        if (
          !req.body ||
          req.headers.get('content-type') !== 'application/json'
        ) {
          return new Response('Bad Request', { status: 400 })
        }

        const res = chatSchema.safeParse(await req.json())

        if (!res.success) {
          return new Response(
            JSON.stringify(z.flattenError(res.error).fieldErrors),
            { status: 400 },
          )
        }

        const { message, conversationId } = res.data
        const previousHistory = chatHistory.get(conversationId) ?? []

        const text = await geminiChat({
          message,
          history: previousHistory.slice(-4), // send only last 4 messages for context
        })

        chatHistory.set(conversationId, [
          ...previousHistory,
          { role: CHAT_ROLES.USER, parts: [{ text: message }] },
          { role: CHAT_ROLES.AI, parts: [{ text }] },
        ])

        // console.log({ chatHistory, chat: chatHistory.get(conversationId) })

        const chatResponse: ChatResponse = {
          response: text,
        }

        return Response.json(chatResponse)
      },
    },
  },

  development: process.env.NODE_ENV !== 'production' && {
    hmr: true,
    console: true,
  },
})

console.log(`🚀 Server running at ${server.url}`)
