import Layout from '@/components/common/layout'
import { useTranslation } from '@/hooks/use-translation'
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
    <Layout>
      <section className="w-full">
        <Autocomplete
          className="max-w-xl"
          size="lg"
          spellCheck="false"
          defaultItems={Object.entries(Language)}
          label="Language"
          placeholder="Search a language"
          defaultSelectedKey="es"
          onSelectionChange={handleSourceLanguageChange}
          selectedKey={sourceLanguage}
        >
          {(item) => (
            <AutocompleteItem key={item[1]}>
              {item[0][0] + item[0].slice(1).toLowerCase().replaceAll('_', ' ')}
            </AutocompleteItem>
          )}
        </Autocomplete>

        <Textarea
          className="mt-4 max-w-xl"
          size="lg"
          spellCheck="false"
          label="Source Text"
          placeholder="Enter text to translate"
          value={source}
          onValueChange={(v) => setSource(v)}
          classNames={{
            innerWrapper: 'min-h-80',
            inputWrapper: 'py-4 px-5',
            input: 'text-xl field-sizing-content max-h-none h-auto!',
          }}
          style={{
            height: 'auto',
          }}
        />
      </section>

      <div>
        <Button
          size="lg"
          isIconOnly
          variant="flat"
          className="mt-6.5"
          onPress={swapLanguages}
          color="primary"
        >
          <Icon icon="mi:switch" />
        </Button>

        <div className="flex h-[calc(100%-26px-48px)] flex-col items-center justify-center">
          <Divider orientation="vertical" className="h-2/3" />
        </div>
      </div>

      <section className="w-full">
        <Autocomplete
          size="lg"
          className="max-w-xl"
          defaultItems={Object.entries(Language).filter(
            ([, value]) => value !== Language.DETECT,
          )}
          label="Language"
          placeholder="Search a language"
          defaultSelectedKey="en"
          selectedKey={targetLanguage}
          onSelectionChange={handleTargetLanguageChange}
        >
          {(item) => (
            <AutocompleteItem key={item[1]}>
              {item[0][0] + item[0].slice(1).toLowerCase().replaceAll('_', ' ')}
            </AutocompleteItem>
          )}
        </Autocomplete>

        <Textarea
          size="lg"
          className="mt-4 max-w-xl"
          classNames={{
            innerWrapper: 'h-80',
            inputWrapper: 'py-4 px-5',
            input: 'text-xl',
          }}
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
