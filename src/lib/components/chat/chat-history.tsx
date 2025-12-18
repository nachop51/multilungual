import { marked } from 'marked'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import { CHAT_ROLES, type ChatMessage } from '@/types.d'
import { MultilingualLogo } from '@/assets/Logo'

interface ChatHistoryProps {
  chatHistory: ChatMessage[]
  updatePrompt: (prompt: string) => void
}

const examples = [
  {
    icon: 'gravity-ui:face-fun',
    label: 'How do I conjugate irregular verbs in Spanish present tense?',
  },
  {
    icon: 'lets-icons:book',
    label: 'Teach me some casual slang to use with friends in Italian',
  },
  {
    icon: 'lets-icons:world-2',
    label:
      'How do formal and informal speech differ across different languages?',
  },
]

export default function ChatHistory({
  chatHistory,
  updatePrompt,
}: ChatHistoryProps) {
  if (!chatHistory || chatHistory.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <header className="mb-8 flex flex-col items-center justify-center">
          <span className="bg-content2/30 mb-4 inline-flex h-24 w-24 items-center justify-center rounded-full">
            <MultilingualLogo className="text-primary size-13" />
          </span>
          <h1 className="text-default-600 font- text-3xl font-medium">
            How can I help you today?
          </h1>
          <p className="text-secondary/50 mt-2 text-lg">
            Choose a template or ask anything
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-3">
          {examples.map((example) => (
            <button
              key={example.label}
              className="text-default-700 bg-content2 hover:bg-content3 flex cursor-pointer flex-col items-center gap-4 rounded-xl p-4 text-center text-lg transition-colors lg:flex-row lg:items-start lg:text-left"
              onClick={() => updatePrompt(example.label)}
            >
              <span className="bg-background/20 inline-flex items-center justify-center rounded-full p-1 md:p-2">
                <Icon
                  icon={example.icon}
                  className="text-foreground size-6 md:size-10"
                />
              </span>
              {example.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {chatHistory.map(({ role, content }, idx) => (
        <article key={idx} className={'mb-6 flex flex-col gap-4'}>
          {role === CHAT_ROLES.AI && (
            <div className="bg-content2/30 grid size-12 place-items-center rounded-full">
              <MultilingualLogo className="text-primary size-6" />
            </div>
          )}
          <div
            className={cn(
              'prose prose-sm dark:prose-invert bg-content2 rounded-xl text-lg',
              {
                'mb-4 bg-transparent': role === CHAT_ROLES.AI,
                'max-w-lg self-end p-4': role === CHAT_ROLES.USER,
              },
            )}
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          ></div>
        </article>
      ))}
    </>
  )
}
