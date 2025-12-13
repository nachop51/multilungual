import Layout from '@/lib/components/common/layout'
import { useTranslation } from '@/lib/hooks/use-translation'
import { formatEnumLanguage } from '@/lib/utils'
import { Language } from '@/types.d'
import {
  Autocomplete,
  AutocompleteItem,
  Textarea,
  Button,
  Divider,
} from '@heroui/react'
import { Icon } from '@iconify/react'

export default function TranslatorPage() {
  const {
    sourceLanguage,
    targetLanguage,
    source,
    setSource,
    isFetching,
    translatedText,
    handleSourceLanguageChange,
    handleTargetLanguageChange,
    swapLanguages,
  } = useTranslation()

  return (
    <Layout className="flex-col gap-6 lg:flex-row">
      <section className="w-full">
        <Autocomplete
          size="lg"
          spellCheck="false"
          defaultItems={Object.entries(Language)}
          label="Language"
          placeholder="Search a language"
          defaultSelectedKey={Language.ENGLISH}
          onSelectionChange={handleSourceLanguageChange}
          selectedKey={sourceLanguage}
        >
          {(item) => (
            <AutocompleteItem
              key={item[1]}
              classNames={{
                base: 'aria-selected:bg-primary/30! hover:bg-primary/10!',
              }}
            >
              {formatEnumLanguage(item[0])}
            </AutocompleteItem>
          )}
        </Autocomplete>

        <Textarea
          size="lg"
          spellCheck="false"
          label="Source Text"
          placeholder="Enter text to translate"
          value={source}
          onValueChange={(v) => setSource(v)}
          className="mt-4"
          classNames={{
            inputWrapper: 'py-4 px-5',
            input: 'text-xl',
          }}
          minRows={12}
          maxRows={40}
        />
      </section>

      <div>
        <Button
          size="lg"
          isIconOnly
          variant="flat"
          className="mt-6.5 w-full lg:w-auto"
          onPress={swapLanguages}
          color="primary"
        >
          <Icon icon="mi:switch" />
        </Button>

        <div className="flex h-[calc(100%-26px-48px)] flex-col items-center justify-center">
          <Divider orientation="vertical" className="bg-secondary h-2/3" />
        </div>
      </div>

      <section className="w-full">
        <Autocomplete
          size="lg"
          defaultItems={Object.entries(Language).filter(
            ([, value]) => value !== Language.DETECT,
          )}
          label="Language"
          placeholder="Search a language"
          defaultSelectedKey={Language.SPANISH}
          selectedKey={targetLanguage}
          onSelectionChange={handleTargetLanguageChange}
        >
          {(item) => (
            <AutocompleteItem
              key={item[1]}
              classNames={{
                base: 'aria-selected:bg-primary/30! hover:bg-primary/10!',
              }}
            >
              {item[0][0] + item[0].slice(1).toLowerCase().replaceAll('_', ' ')}
            </AutocompleteItem>
          )}
        </Autocomplete>

        <Textarea
          size="lg"
          className="mt-4"
          classNames={{
            inputWrapper: 'py-4 px-5',
            input: 'text-xl',
          }}
          minRows={12}
          maxRows={40}
          label="Translation"
          placeholder="Translated text will appear here"
          isReadOnly
          spellCheck="false"
          value={
            isFetching ? 'Translating...' : translatedText ? translatedText : ''
          }
        />
      </section>
    </Layout>
  )
}
