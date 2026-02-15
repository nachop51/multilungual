import {
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@heroui/react'
import { Icon } from '@iconify/react'

const TEMPLATE_PROMPTS = [
  {
    id: 'deep-translation',
    title: 'Deep Translation',
    prompt:
      "Translate the following text into [Target Language]. Don't just swap words; adapt any idioms, cultural references, or tone to ensure it sounds natural to a native speaker in [Region]:",
    icon: 'material-symbols:translate-rounded',
  },
  {
    id: 'nuance-finder',
    title: 'Nuance Finder',
    prompt:
      "Compare these two words/phrases: '[Word A]' and '[Word B]'. Explain the subtle differences in connotation, formality levels, and provide a specific scenario where one is better than the other.",
    icon: 'solar:document-text-linear',
  },
  {
    id: 'etymology-origin',
    title: 'Word Origins',
    prompt:
      "Explain the etymology and historical evolution of the word '[Word]'. How has its meaning shifted over time, and does it have any interesting cognates in other languages?",
    icon: 'solar:history-linear',
  },
  {
    id: 'cultural-formality',
    title: 'Adjust Formality',
    prompt:
      'I need to send this message to [Recipient Type] in [Language]. Rewrite it to strictly follow local cultural norms regarding honorifics and politeness levels:',
    icon: 'solar:user-speak-rounded-linear',
  },
  {
    id: 'idiom-hunter',
    title: 'Idiom Hunter',
    prompt:
      "What are some common idioms or slang terms in [Language] used to describe '[Concept]'? Provide the literal translation, the actual meaning, and an example sentence for each.",
    icon: 'solar:chat-round-dots-linear',
  },
  {
    id: 'grammar-deep-dive',
    title: 'Grammar Deep-Dive',
    prompt:
      "I'm struggling with [Grammar Concept] in [Language]. Give me a concise, stepwise explanation of the rules, three varied examples, and one 'pro-tip' to avoid common learner mistakes.",
    icon: 'solar:pen-2-linear',
  },
  {
    id: 'phonetic-guide',
    title: 'Pronunciation Guide',
    prompt:
      "Explain the pronunciation of '[Word/Phrase]' in [Language]. Break it down phonetically, highlight any silent letters or unique stress patterns, and describe how it differs from a typical English sound.",
    icon: 'solar:soundwave-linear',
  },
  {
    id: 'regional-variants',
    title: 'Regional Variants',
    prompt:
      "How does the word/phrase '[Word]' vary between [Region A] and [Region B]? Note differences in vocabulary choice, pronunciation, and local frequency.",
    icon: 'solar:globus-linear',
  },
  {
    id: 'expert-edit',
    title: 'Expert Edit',
    prompt:
      "Proofread the text below for grammar and spelling. Beyond corrections, suggest 'expert-level' vocabulary upgrades to make the writing more sophisticated and fluid while maintaining the original meaning:",
    icon: 'solar:check-read-linear',
  },
  {
    id: 'script-breakdown',
    title: 'Script Breakdown',
    prompt:
      "Explain the components of this [Script Type] character or phrase: '[Text]'. Break down the individual parts (radicals/letters) and explain how they contribute to the overall meaning or sound.",
    icon: 'solar:letter-opened-linear',
  },
  {
    id: 'bilingual-logic',
    title: 'Logic Gap',
    prompt:
      "I am trying to express the concept of '[Concept]' in [Language], but there doesn't seem to be a direct translation. How do native speakers usually communicate this idea naturally?",
    icon: 'solar:lightbulb-linear',
  },
  {
    id: 'linguistic-fun',
    title: 'Language Play',
    prompt:
      'Give me a challenging tongue twister or a clever pun in [Language]. Provide the original text, a phonetic guide, a translation, and explain why the wordplay is funny or difficult.',
    icon: 'solar:stars-linear',
  },
] as const

export type TemplatePickerProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (prompt: string) => void
}

export default function TemplatePicker({
  isOpen,
  onOpenChange,
  onSelect,
}: TemplatePickerProps) {
  const handleSelect = (prompt: string) => {
    onSelect(prompt)
    onOpenChange(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
      size="2xl"
      classNames={{
        base: 'bg-background',
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Choose a prompt template
            </ModalHeader>
            <ModalBody className="gap-4 pb-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {TEMPLATE_PROMPTS.map((template) => (
                  <Card
                    key={template.id}
                    isPressable
                    isHoverable
                    shadow="sm"
                    onPress={() => handleSelect(template.prompt)}
                  >
                    <CardHeader className="flex gap-2 pb-2">
                      <div className="bg-default-200 rounded-lg p-1.5">
                        <Icon
                          className="text-default-600 size-4"
                          icon={template.icon}
                          width={22}
                        />
                      </div>
                      <h3 className="text-medium font-normal">
                        {template.title}
                      </h3>
                    </CardHeader>
                    <CardBody className="pt-0">
                      <p className="text-tiny text-foreground-500 line-clamp-3">
                        {template.prompt}
                      </p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
