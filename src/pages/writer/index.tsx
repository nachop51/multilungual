import Layout from '@/lib/components/common/layout'
import { useWriter } from '@/lib/hooks/use-writer'
import { formatEnumLanguage } from '@/lib/utils/fns'
import { AUDIENCES, FLUENCY_LEVELS, Language, STYLES, TONES } from '@/types.d'
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from '@heroui/react'

export default function WriterPage() {
  const {
    text,
    setText,
    language,
    handleLanguageChange,
    isFetching,
    improvedText,
    tone,
    handleToneChange,
    style,
    handleStyleChange,
    fluency,
    handleFluencyChange,
    audience,
    handleAudienceChange,
  } = useWriter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <Layout className="flex-col">
      <header className="bg-content1/40 border-primary/20 mb-8 space-y-4 rounded-xl border p-6">
        <h1 className="text-primary text-3xl font-bold">Writer</h1>

        <div className="[&>p]:text-lg [&>p]:not-last-of-type:mb-2">
          <p>
            Multilingual AI will help you to write better and faster. It will
            automatically fix your grammar, suggest better words, and fix any
            spelling mistakes. You can also choose from a variety of choices to
            suit your writing style.
          </p>

          <p>
            You can choose, for example, to write in a more formal or casual
            style, or to make your text more concise or elaborate.
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-8 lg:flex-row">
        <section className="w-full">
          <Autocomplete
            fullWidth
            defaultItems={Object.entries(Language).filter(
              ([, value]) => value !== Language.DETECT,
            )}
            label="Language"
            placeholder="Search a language"
            defaultSelectedKey={Language.ENGLISH}
            selectedKey={language}
            onSelectionChange={handleLanguageChange}
          >
            {(item) => (
              <AutocompleteItem key={item[1]}>
                {formatEnumLanguage(item[0])}
              </AutocompleteItem>
            )}
          </Autocomplete>

          <Textarea
            className="mt-4"
            classNames={{
              inputWrapper: 'py-4 px-5',
              input: 'text-xl',
            }}
            placeholder="Write your text here..."
            minRows={12}
            maxRows={100}
            value={text}
            onValueChange={setText}
          />
        </section>

        <div className="flex w-8 items-center">
          <Divider orientation="vertical" className="mx-auto h-2/3" />
        </div>

        <section className="w-full">
          <div className="flex gap-4">
            <Select
              className="max-w-[200px]"
              label="Style"
              placeholder="Select a style"
              defaultSelectedKeys={[STYLES.NORMAL]}
              disallowEmptySelection
              selectedKeys={[style]}
              onSelectionChange={handleStyleChange}
            >
              {Object.entries(STYLES).map(([, value]) => (
                <SelectItem key={value}>{value}</SelectItem>
              ))}
            </Select>
            <Select
              className="max-w-[200px]"
              label="Tone"
              placeholder="Select a tone"
              defaultSelectedKeys={[TONES.NEUTRAL]}
              disallowEmptySelection
              selectedKeys={[tone]}
              onSelectionChange={handleToneChange}
            >
              {Object.entries(TONES).map(([, value]) => (
                <SelectItem key={value}>{value}</SelectItem>
              ))}
            </Select>

            <Button
              className="w-full grow self-end"
              color={
                fluency !== FLUENCY_LEVELS.FLUENT ||
                audience !== AUDIENCES.GENERAL
                  ? 'primary'
                  : 'default'
              }
              variant="flat"
              onPress={onOpen}
            >
              More tweaks
            </Button>
          </div>

          <Textarea
            placeholder="Improved text will appear here..."
            isReadOnly
            className="mt-4"
            classNames={{
              inputWrapper: 'py-4 px-5',
              input: 'text-xl',
            }}
            value={isFetching ? 'Improving your text...' : improvedText}
            minRows={12}
            maxRows={100}
          />
        </section>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        classNames={{
          base: 'bg-background',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                More tweaks
              </ModalHeader>
              <ModalBody className="gap-4">
                <div className="flex gap-4">
                  <Select
                    className="max-w-[200px]"
                    label="Style"
                    placeholder="Select a style"
                    defaultSelectedKeys={[STYLES.NORMAL]}
                    disallowEmptySelection
                    selectedKeys={[style]}
                    onSelectionChange={handleStyleChange}
                  >
                    {Object.entries(STYLES).map(([, value]) => (
                      <SelectItem key={value}>{value}</SelectItem>
                    ))}
                  </Select>
                  <Select
                    className="max-w-[200px]"
                    label="Tone"
                    placeholder="Select a tone"
                    defaultSelectedKeys={[TONES.NEUTRAL]}
                    disallowEmptySelection
                    selectedKeys={[tone]}
                    onSelectionChange={handleToneChange}
                  >
                    {Object.entries(TONES).map(([, value]) => (
                      <SelectItem key={value}>{value}</SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="flex gap-4">
                  <Select
                    className="max-w-[200px]"
                    label="Audience"
                    placeholder="Select an audience"
                    defaultSelectedKeys={[AUDIENCES.GENERAL]}
                    disallowEmptySelection
                    selectedKeys={[audience]}
                    onSelectionChange={handleAudienceChange}
                  >
                    {Object.entries(AUDIENCES).map(([, value]) => (
                      <SelectItem key={value}>{value}</SelectItem>
                    ))}
                  </Select>
                  <Select
                    className="max-w-[200px]"
                    label="Fluency"
                    placeholder="Select a fluency"
                    defaultSelectedKeys={[FLUENCY_LEVELS.FLUENT]}
                    disallowEmptySelection
                    selectedKeys={[fluency]}
                    onSelectionChange={handleFluencyChange}
                  >
                    {Object.entries(FLUENCY_LEVELS).map(([, value]) => (
                      <SelectItem key={value}>{value}</SelectItem>
                    ))}
                  </Select>
                </div>

                <div>
                  <Input
                    label="Length constraint"
                    placeholder="Maximum 5 sentences of 10 words..."
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Layout>
  )
}
