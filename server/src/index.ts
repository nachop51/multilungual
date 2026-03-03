import { Elysia, t } from 'elysia'
import {
  geminiChat,
  geminiRewrite,
  geminiTranslate,
  getDefinition,
} from './lib/gemini'
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
import { logger } from '@tqman/nice-logger'

export const app = new Elysia()
  .use(new Elysia().all('/api', () => 'Hello World'))
  .use(
    logger({
      mode: 'combined', // "live" or "combined" (default: "combined")
      withTimestamp: true, // optional (default: false)
      enabled: Bun.env.NODE_ENV !== 'test',
      withBanner: true,
    }),
  )
  .use(
    cors({
      origin: [
        'http://127.0.0.1:5173',
        'http://localhost:5173',
        'https://multilingual.local.nachop.dev',
      ],
    }),
  )
  .post(
    '/api/translate',
    async ({ body }) => {
      const translation = await geminiTranslate(body)

      return translation
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

      return text
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
  .get(
    '/api/dictionary',
    async ({ query: { word, sourceLang, targetLang } }) => {
      const definition = await getDefinition({ word, sourceLang, targetLang })

      return definition
    },
    {
      query: t.Object({
        word: t.String({ minLength: 1 }),
        sourceLang: t.Enum(LANGUAGES),
        targetLang: t.Enum(LANGUAGES),
      }),
    },
  )
  .listen({
    hostname: Bun.env.HOSTNAME ?? '0.0.0.0',
    port: Bun.env.PORT ?? 3000,
  })

export type App = typeof app
