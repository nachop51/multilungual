import ChatHistory from '@/lib/components/chat/chat-history'
import PromptInput from '@/lib/components/chat/prompt-input'
import Layout from '@/lib/components/common/layout'
import { useMultilingualChat } from '@/lib/hooks/use-multilingual-chat'
import { cn } from '@/lib/utils'
import { Button, Tooltip } from '@heroui/react'
import { Icon } from '@iconify/react'

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
    <Layout className="grid h-[calc(100vh-64px)] max-w-5xl grid-rows-[1fr_auto] justify-stretch">
      <section className="w-full">
        <ChatHistory chatHistory={chatHistory} updatePrompt={setPrompt} />
      </section>

      <section className="w-full">
        <form
          className="rounded-medium bg-default-100 hover:bg-default-200/70 flex w-full flex-col items-start transition-colors"
          onSubmit={handleSubmit}
        >
          <PromptInput
            classNames={{
              inputWrapper: 'bg-transparent! shadow-none',
              innerWrapper: 'relative',
              input: 'pt-1 pl-2 pb-6 pr-10! text-medium text-xl',
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
              <Button
                size="sm"
                startContent={
                  <Icon
                    className="text-default-500"
                    icon="solar:paperclip-linear"
                    width={18}
                  />
                }
                variant="flat"
              >
                Attach
              </Button>
              <Button
                size="sm"
                startContent={
                  <Icon
                    className="text-default-500"
                    icon="solar:soundwave-linear"
                    width={18}
                  />
                }
                variant="flat"
              >
                Voice Commands
              </Button>
              <Button
                size="sm"
                startContent={
                  <Icon
                    className="text-default-500"
                    icon="solar:notes-linear"
                    width={18}
                  />
                }
                variant="flat"
              >
                Templates
              </Button>
            </div>
            <p className="text-tiny text-default-400 py-1">
              {prompt.length}/500
            </p>
          </div>
        </form>
      </section>
    </Layout>
  )
}
