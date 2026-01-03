import { useEffect, useState } from 'react'
import { translateText } from '@/lib/services/api'
import { Language } from '@/types.d'
import useDebounce from './use-debounce'

export const useTranslation = () => {
  const [sourceLanguage, setSourceLanguage] = useState<Language>(
    Language.SPANISH,
  )
  const [targetLanguage, setTargetLanguage] = useState<Language>(
    Language.ENGLISH,
  )
  const [source, setSource] = useState('')
  const [debouncedValue] = useDebounce(source, 1000)
  const [translatedText, setTranslatedText] = useState('')

  const [isFetching, setIsFetching] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: isFechting does not need to trigger the effect
  useEffect(() => {
    if (!debouncedValue || debouncedValue.trim() === '') {
      setTranslatedText('')
      return
    }

    const fetchTranslation = async () => {
      if (!debouncedValue || debouncedValue.trim() === '') return

      if (isFetching) return

      setIsFetching(true)

      const res = await translateText({
        sourceText: debouncedValue,
        sourceLanguage: sourceLanguage,
        targetLanguage: targetLanguage,
      })

      setTranslatedText(res.translation)
    }

    fetchTranslation().finally(() => setIsFetching(false))
  }, [debouncedValue, sourceLanguage, targetLanguage])

  const handleSourceLanguageChange = (key: string | number | null) => {
    if (!key || key.toString().trim() === '') return
    setSourceLanguage(key.toString() as Language)

    if (key.toString() === targetLanguage) {
      const newTarget = Object.values(Language).find((lang) => lang !== key)
      if (newTarget) {
        setTargetLanguage(newTarget)
      }
    }
  }

  const handleTargetLanguageChange = (key: string | number | null) => {
    if (!key || key.toString().trim() === '') return
    setTargetLanguage(key.toString() as Language)

    if (key.toString() === sourceLanguage) {
      const newSource = Object.values(Language).find((lang) => lang !== key)
      if (newSource) {
        setSourceLanguage(newSource)
      }
    }
  }

  const swapLanguages = () => {
    if (sourceLanguage === targetLanguage) return
    if (sourceLanguage === Language.DETECT) return

    const oldSourceLanguage = sourceLanguage

    setSourceLanguage(targetLanguage)
    setTargetLanguage(oldSourceLanguage)

    setSource(translatedText)
    setTranslatedText('')
  }

  return {
    sourceLanguage,
    targetLanguage,
    source,
    setSource,
    translatedText,
    isFetching,
    handleSourceLanguageChange,
    handleTargetLanguageChange,
    swapLanguages,
  }
}
