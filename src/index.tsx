import { serve, sql } from 'bun'
import index from './index.html'
import type { Translation, TranslationResponse } from './types'
import { translateSchema } from './schemas/translate'
import z from 'zod'
import { geminiTranslate } from './server/gemini'

const server = serve({
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
            }
          )
        }

        const text = await geminiTranslate(res.data)

        const translation: TranslationResponse = {
          translation: text,
        }

        return Response.json(translation)
      },
    },

    '/api/hello': {
      async GET(req) {
        const res = await sql<Translation[]>`SELECT * FROM translations`

        console.log('Database translations:', res)

        return Response.json(res)
      },
      async POST(req) {
        const body = await req.json()

        const res = await sql<Translation[]>`
        INSERT INTO translations (source_text, target_text, source_language, target_language)
        VALUES (${'Hello, world!'}, ${'Hola, mundo!'}, ${'EN'}, ${'ES'})
          RETURNING *
        `

        console.log({ res })

        return Response.json(res[0])
      },
    },

    '/api/hello/:name': async (req) => {
      const name = req.params.name
      return Response.json({
        message: `Hello, ${name}!`,
      })
    },
  },

  development: process.env.NODE_ENV !== 'production' && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
})

console.log(`🚀 Server running at ${server.url}`)
