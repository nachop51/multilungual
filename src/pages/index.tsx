import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Textarea,
} from '@heroui/react'
import { Icon } from '@iconify/react'
import Layout from '@/lib/components/common/layout'
import { useTranslation } from '@/lib/translation/hooks/use-translation'
import { formatEnumLanguage } from '@/lib/utils/fns'
import { LANGUAGES } from '@/lib/consts'
import { useRef } from 'react'
import { useDictionary } from '@/lib/translation/hooks/use-dictionary'
import { Meanings } from '@/lib/translation/components/meanings'

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

  const {
    meanings,
    fecthMeanings,
    isFetching: isFetchingDictionary,
  } = useDictionary()

  const sourceTextareaRef = useRef<HTMLTextAreaElement>(null)
  const translationTextareaRef = useRef<HTMLTextAreaElement>(null)

  const handleClick = (origin: 'source' | 'translation') => {
    const idx =
      origin === 'source'
        ? (sourceTextareaRef.current?.selectionStart ?? 0)
        : (translationTextareaRef.current?.selectionStart ?? 0)

    const text = origin === 'source' ? source : translatedText

    let wordStart = 0
    let wordEnd = text.length

    for (let i = idx - 1; i >= 0; i--) {
      if (text[i] === ' ') {
        wordStart = i + 1
        break
      }
    }

    for (let i = idx; i < text.length; i++) {
      if (text[i] === ' ') {
        wordEnd = i
        break
      }
    }

    const word = text.slice(wordStart, wordEnd)

    if (word.length > 0) {
      fecthMeanings({
        word,
        sourceLang: origin === 'source' ? sourceLanguage : targetLanguage,
        targetLang: origin === 'source' ? targetLanguage : sourceLanguage,
      })
    }
  }

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
            ref={sourceTextareaRef}
            onClick={() => handleClick('source')}
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
            ref={translationTextareaRef}
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
            onClick={() => handleClick('translation')}
            value={isFetching ? 'Translating...' : translatedText}
          />
        </section>
      </div>

      <Meanings meanings={meanings} isFetching={isFetchingDictionary} />
    </Layout>
  )
}
