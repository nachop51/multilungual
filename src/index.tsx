import { serve } from 'bun'
import index from './index.html'
import {
  CHAT_ROLES,
  type ChatResponse,
  type TranslationResponse,
  type WriterResponse,
} from './types.d'
import { translateSchema } from './lib/schemas/translate'
import z from 'zod'
import { geminiChat, geminiRewrite, geminiTranslate } from './server/gemini'
import { rewriteSchema } from './lib/schemas/rewrite'
import { chatSchema } from './lib/schemas/chat'
import type { Content } from '@google/genai'

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

    // '/api/hello': {
    //   async GET(req) {
    //     const res = await sql<Translation[]>`SELECT * FROM translations`

    //     console.log('Database translations:', res)

    //     return Response.json(res)
    //   },
    //   async POST(req) {
    //     const body = await req.json()

    //     const res = await sql<Translation[]>`
    //     INSERT INTO translations (source_text, target_text, source_language, target_language)
    //     VALUES (${'Hello, world!'}, ${'Hola, mundo!'}, ${'EN'}, ${'ES'})
    //       RETURNING *
    //     `

    //     console.log({ res })

    //     return Response.json(res[0])
    //   },
    // },

    // '/api/hello/:name': async (req) => {
    //   const name = req.params.name
    //   return Response.json({
    //     message: `Hello, ${name}!`,
    //   })
    // },
  },

  development: process.env.NODE_ENV !== 'production' && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
})

console.log(`🚀 Server running at ${server.url}`)
