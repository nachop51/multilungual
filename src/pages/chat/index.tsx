import ChatHistory from '@/lib/components/chat/chat-history'
import PromptInput from '@/lib/components/chat/prompt-input'
import Layout from '@/lib/components/common/layout'
import { useMultilingualChat } from '@/lib/hooks/use-multilingual-chat'
import { cn } from '@/lib/utils'
import { Button, ScrollShadow, Tooltip } from '@heroui/react'
import { Icon } from '@iconify/react'

const actions = [
  {
    label: 'Attach',
    icon: 'solar:paperclip-linear',
  },
  {
    label: 'Voice Commands',
    icon: 'solar:soundwave-linear',
  },
  {
    label: 'Templates',
    icon: 'solar:notes-linear',
  },
]

export default function ChatPage() {
  const { prompt, setPrompt, chatHistory, submitPrompt } = useMultilingualChat()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitPrompt()
    setPrompt('')
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === 'Enter' &&
      !(event.metaKey || event.ctrlKey || event.shiftKey)
    ) {
      event.preventDefault()
      submitPrompt()
      setPrompt('')
    }
  }

  return (
    <Layout className="grid h-[calc(100vh-64px)] max-w-7xl grid-rows-[1fr_auto] justify-stretch">
      <ScrollShadow className="w-full" hideScrollBar>
        <ChatHistory chatHistory={chatHistory} updatePrompt={setPrompt} />
      </ScrollShadow>

      <section className="w-full">
        <form
          className="rounded-medium bg-content2 hover:bg-content3/70 flex w-full flex-col items-start transition-colors"
          onSubmit={handleSubmit}
        >
          <PromptInput
            classNames={{
              inputWrapper: 'bg-transparent! shadow-none',
              innerWrapper: 'relative',
              input: 'pt-1 pl-2 pb-6 pr-10! text-medium text-lg',
            }}
            endContent={
              <div className="flex items-end gap-2">
                <Tooltip showArrow content="Send message">
                  <Button
                    isIconOnly
                    color={!prompt ? 'default' : 'primary'}
                    isDisabled={!prompt}
                    type="submit"
                    radius="lg"
                    size="sm"
                    variant="solid"
                  >
                    <Icon
                      className={cn(
                        '[&>path]:stroke-[2px]',
                        !prompt
                          ? 'text-default-600'
                          : 'text-primary-foreground',
                      )}
                      icon="solar:arrow-up-linear"
                      width={20}
                    />
                  </Button>
                </Tooltip>
              </div>
            }
            minRows={3}
            radius="lg"
            value={prompt}
            variant="flat"
            onValueChange={setPrompt}
            onKeyDown={handleKeyDown}
          />
          <div className="flex w-full items-center justify-between gap-2 overflow-auto px-4 pb-4">
            <div className="flex w-full gap-1 md:gap-3">
              {actions.map((action) => (
                <Button
                  key={action.label}
                  size="sm"
                  className="bg-white/5 hover:bg-white/10"
                  startContent={
                    <Icon
                      className="text-default-500"
                      icon={action.icon}
                      width={18}
                    />
                  }
                  variant="flat"
                >
                  {action.label}
                </Button>
              ))}
            </div>
            <p
              className={cn(
                'text-tiny py-1',
                prompt.length > 500 ? 'text-red-500' : 'text-default-400',
              )}
            >
              {prompt.length}/500
            </p>
          </div>
        </form>
      </section>
    </Layout>
  )
}
