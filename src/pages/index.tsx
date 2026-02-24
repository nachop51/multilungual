import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  Divider,
  Textarea,
} from '@heroui/react'
import { Icon } from '@iconify/react'
import Layout from '@/lib/components/common/layout'
import { useTranslation } from '@/lib/hooks/use-translation'
import { cn, formatEnumLanguage } from '@/lib/utils/fns'
import { marked } from 'marked'
import { LANGUAGES } from '@/lib/consts'

export default function TranslatorPage() {
  const {
    sourceLanguage,
    targetLanguage,
    source,
    setSource,
    isFetching,
    translatedText,
    meaningsAndDefinitions,
    handleSourceLanguageChange,
    handleTargetLanguageChange,
    swapLanguages,
    showMeaningsFromTarget,
    setShowMeaningsFromTarget,
  } = useTranslation()

  return (
    <Layout className="">
      <div className="flex flex-col gap-4 lg:flex-row">
        <section className="w-full">
          <Autocomplete
            size="lg"
            spellCheck="false"
            defaultItems={Object.entries(LANGUAGES)}
            label="Language"
            placeholder="Search a language"
            defaultSelectedKey={LANGUAGES.ENGLISH}
            onSelectionChange={handleSourceLanguageChange}
            selectedKey={sourceLanguage}
          >
            {(item) => (
              <AutocompleteItem key={item[1]}>
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
            <Divider orientation="vertical" className="h-2/3" />
          </div>
        </div>

        <section className="w-full">
          <Autocomplete
            size="lg"
            defaultItems={Object.entries(LANGUAGES).filter(
              ([, value]) => value !== LANGUAGES.DETECT,
            )}
            label="Language"
            placeholder="Search a language"
            defaultSelectedKey={LANGUAGES.SPANISH}
            selectedKey={targetLanguage}
            onSelectionChange={handleTargetLanguageChange}
          >
            {(item) => (
              <AutocompleteItem key={item[1]}>
                {item[0][0] +
                  item[0].slice(1).toLowerCase().replaceAll('_', ' ')}
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
              isFetching
                ? 'Translating...'
                : translatedText
                  ? translatedText
                  : ''
            }
          />
        </section>
      </div>

      <section className="bg-content1 mt-8 rounded-xl p-12">
        <header className="flex justify-between">
          <h2
            className={cn('text-lg font-bold', {
              'mb-6': !!meaningsAndDefinitions,
            })}
          >
            {meaningsAndDefinitions
              ? 'Possible meanings and definitions'
              : 'Here it will appear the possible meanings and definitions of the source text, if any.'}
          </h2>

          <Checkbox
            isSelected={showMeaningsFromTarget}
            onValueChange={setShowMeaningsFromTarget}
            className="flex-row-reverse gap-2"
          >
            Show meanings of target language
          </Checkbox>
        </header>

        {meaningsAndDefinitions && (
          <div
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: marked(meaningsAndDefinitions) }}
          ></div>
        )}
      </section>
    </Layout>
  )
}
