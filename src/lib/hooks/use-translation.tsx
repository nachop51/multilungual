import { useEffect, useState } from 'react'
import { translateText } from '@/lib/services/api'
import useDebounce from './use-debounce'
import { LANGUAGES, type Language } from '../consts'

export const useTranslation = () => {
  const [sourceLanguage, setSourceLanguage] = useState<Language>(
    LANGUAGES.SPANISH,
  )
  const [targetLanguage, setTargetLanguage] = useState<Language>(
    LANGUAGES.ENGLISH,
  )
  const [source, setSource] = useState('')
  const [debouncedValue] = useDebounce(source, 1000)
  const [translatedText, setTranslatedText] = useState('')
  const [meaningsAndDefinitions, setMeaningsAndDefinitions] = useState<
    string | null
  >(null)
  const [showMeaningsFromTarget, setShowMeaningsFromTarget] = useState(false)

  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    if (!debouncedValue || debouncedValue.trim() === '') {
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
      setMeaningsAndDefinitions(res.sourceMeaning)
    }

    fetchTranslation().finally(() => setIsFetching(false))
  }, [debouncedValue, sourceLanguage, targetLanguage, isFetching])

  const handleSourceLanguageChange = (key: string | number | null) => {
    if (!key || key.toString().trim() === '') return
    setSourceLanguage(key.toString() as Language)

    if (key.toString() === targetLanguage) {
      const newTarget = Object.values(LANGUAGES).find((lang) => lang !== key)
      if (newTarget) {
        setTargetLanguage(newTarget)
      }
    }
  }

  const handleTargetLanguageChange = (key: string | number | null) => {
    if (!key || key.toString().trim() === '') return
    setTargetLanguage(key.toString() as Language)

    if (key.toString() === sourceLanguage) {
      const newSource = Object.values(LANGUAGES).find((lang) => lang !== key)
      if (newSource) {
        setSourceLanguage(newSource)
      }
    }
  }

  const swapLanguages = () => {
    if (sourceLanguage === targetLanguage) return
    if (sourceLanguage === LANGUAGES.DETECT) return

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
    meaningsAndDefinitions,
    isFetching,
    showMeaningsFromTarget,
    setShowMeaningsFromTarget,
    handleSourceLanguageChange,
    handleTargetLanguageChange,
    swapLanguages,
  }
}
