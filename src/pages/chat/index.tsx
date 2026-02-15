import { useEffect, useRef } from 'react'
import { Button, ScrollShadow, Tooltip, useDisclosure } from '@heroui/react'
import { Icon } from '@iconify/react'
import ChatHistory from '@/lib/components/chat/chat-history'
import PromptInput from '@/lib/components/chat/prompt-input'
import Layout from '@/lib/components/common/layout'
import { useMultilingualChat } from '@/lib/hooks/use-multilingual-chat'
import { cn } from '@/lib/utils/fns'
import { MAX_PROMPT_LENGTH } from '@/lib/consts'
import TemplatePicker from '@/lib/components/chat/template-picker'

export default function ChatPage() {
  const { prompt, setPrompt, chatHistory, isStreaming, submitPrompt } =
    useMultilingualChat()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const shadowRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    setPrompt('')
    submitPrompt()

    setTimeout(() => {
      shadowRef.current?.scrollTo({
        top: shadowRef.current?.scrollHeight + 30000,
        behavior: 'smooth',
      })
    }, 50)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === 'Enter' &&
      !(event.metaKey || event.ctrlKey || event.shiftKey)
    ) {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <Layout className="grid h-[calc(100vh-64px)] max-w-7xl grid-rows-[1fr_auto] justify-stretch">
      <ScrollShadow ref={shadowRef} className="w-full" hideScrollBar>
        <div className="px-4 py-4">
          <ChatHistory
            chatHistory={chatHistory}
            isStreaming={isStreaming}
            updatePrompt={setPrompt}
          />
        </div>
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
              <Button
                size="sm"
                className="bg-content3/40 hover:bg-content3/70"
                startContent={
                  <Icon
                    className="text-default-500"
                    icon="solar:notes-linear"
                    width={18}
                  />
                }
                variant="flat"
                onPress={onOpen}
              >
                Templates
              </Button>
            </div>
            <p
              className={cn(
                'text-tiny py-1',
                prompt.length > MAX_PROMPT_LENGTH
                  ? 'text-red-500'
                  : 'text-default-400',
              )}
            >
              {prompt.length}/{MAX_PROMPT_LENGTH}
            </p>
          </div>
        </form>
      </section>

      <TemplatePicker
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSelect={setPrompt}
      />
    </Layout>
  )
}
