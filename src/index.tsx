import { serve } from 'bun'
import z from 'zod'
import index from './index.html'
import { chatSchema } from './server/schemas/chat'
import { rewriteSchema } from './server/schemas/rewrite'
import { translateSchema } from './server/schemas/translate'
import { geminiChat, geminiRewrite, geminiTranslate } from './server/gemini'
import { type TranslationResponse, type WriterResponse } from './types.d'

const server = serve({
  hostname: '0.0.0.0',
  port: Bun.env.PORT ? parseInt(Bun.env.PORT) : 3000,
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

        const { message, history } = res.data

        const textStream = geminiChat({
          message,
          history,
        })

        return textStream
      },
    },
  },

  development: process.env.NODE_ENV !== 'production' && {
    hmr: true,
    console: true,
  },
})

console.log(`🚀 Server running at ${server.url}`)
