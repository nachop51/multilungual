import { Elysia, t } from 'elysia'
import { geminiChat, geminiRewrite, geminiTranslate } from './lib/gemini'
import {
  AUDIENCES,
  CHAT_ROLES,
  FLUENCY_LEVELS,
  LANGUAGES,
  MAX_PROMPT_LENGTH,
  STYLES,
  TONES,
} from './lib/consts'
import { cors } from '@elysiajs/cors'

const app = new Elysia()
  .use(cors())
  .post(
    '/api/translate',
    async ({ body }) => {
      const { translation, sourceMeaning } = await geminiTranslate(body)

      return {
        translation,
        sourceMeaning,
      }
    },
    {
      body: t.Object({
        sourceText: t.String({ minLength: 1 }),
        sourceLanguage: t.Enum(LANGUAGES),
        targetLanguage: t.Enum(LANGUAGES),
      }),
    },
  )
  .post(
    '/api/rewrite',
    async ({ body }) => {
      const text = await geminiRewrite(body)

      return {
        improvedText: text,
      }
    },
    {
      body: t.Object({
        text: t.String({ minLength: 1 }),
        language: t.Enum(LANGUAGES),
        style: t.Enum(STYLES),
        tone: t.Enum(TONES),
        audience: t.Enum(AUDIENCES, { default: AUDIENCES.GENERAL }),
        fluency: t.Enum(FLUENCY_LEVELS, { default: FLUENCY_LEVELS.FLUENT }),
      }),
    },
  )
  .post(
    '/api/chat',
    async ({ body }) => {
      const textStream = geminiChat({
        message: body.message,
        history: body.history,
      })

      return textStream
    },
    {
      body: t.Object({
        message: t.String({ minLength: 1, maxLength: MAX_PROMPT_LENGTH }),
        history: t.Array(
          t.Object({
            role: t.Enum(CHAT_ROLES),
            content: t.String({ minLength: 1 }),
          }),
          { default: [] },
        ),
      }),
    },
  )
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)

export type App = typeof app
