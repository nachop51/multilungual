import { marked } from 'marked'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import { CHAT_ROLES, type ChatMessage } from '@/types.d'

interface ChatHistoryProps {
  chatHistory: ChatMessage[]
}

// This has to be related to the examples shown when there's no chat history
// It has to be about Languages/Linguistics and curious facts about it
const examples = [
  {
    icon: 'emojione-monotone:clown-face',
    name: 'Fun',
    prompts: [
      '¿Cuáles son algunos trabalenguas divertidos en español?',
      'Can you tell me a joke in French?',
      'Was sind einige lustige Redewendungen auf Deutsch?',
    ],
  },
  {
    icon: 'emojione-monotone:books',
    name: 'Learning',
    prompts: [
      '¿Cuáles son las reglas gramaticales básicas del italiano?',
      'How do I conjugate verbs in Spanish?',
      'Quels sont les temps verbaux en français et comment les utiliser?',
    ],
  },
  {
    icon: 'emojione-monotone:globe-with-meridians',
    name: 'Culture',
    prompts: [
      '¿Puedes contarme sobre las diferencias culturales entre países de habla hispana?',
      'What are some unique customs in Japan related to language?',
      'Quelles sont les différences culturelles entre la France et le Canada francophone?',
    ],
  },
]

export default function ChatHistory({ chatHistory }: ChatHistoryProps) {
  if (!chatHistory || chatHistory.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <header className="mb-8 flex flex-col items-center justify-center">
          <Icon icon="lucide:book-open" className="text-default-600 text-4xl" />
          <h1 className="text-default-600 text-3xl">Multilingüal AI</h1>
        </header>

        <div className="grid grid-cols-3 gap-4">
          {examples.map((example) => (
            <article
              key={example.name}
              className="bg-content1 flex flex-col items-center gap-4 rounded-lg p-4"
            >
              <header className="flex flex-col items-center gap-2">
                <Icon
                  icon={example.icon}
                  className="text-default-600 size-10"
                />
                <h3 className="text-default-600 mb-2 text-xl">
                  {example.name}
                </h3>
              </header>

              <div className="flex flex-col gap-2">
                {example.prompts.map((prompt) => (
                  <button
                    key={prompt}
                    className="text-default-700 bg-content2 hover:bg-content3 cursor-pointer rounded-md px-4 py-2 text-sm transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(prompt)
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {chatHistory.map(({ role, content }, idx) => (
        <article key={idx} className={'flex flex-col gap-4'}>
          {role === CHAT_ROLES.AI && (
            <div className="bg-content3-foreground/5 grid size-12 place-items-center rounded-full">
              <Icon icon="lucide:book-open" className="size-5" />
            </div>
          )}
          <div
            className={cn('prose prose-sm rounded-xl bg-gray-100 text-lg', {
              'mb-4 bg-transparent': role === CHAT_ROLES.AI,
              'max-w-lg self-end p-4': role === CHAT_ROLES.USER,
            })}
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          ></div>
        </article>
      ))}
    </>
  )
}
