import {
  AUDIENCES,
  FLUENCY_LEVELS,
  STYLES,
  TONES,
  LANGUAGES,
  type Language,
  type Tone,
  type Style,
  type Audience,
  type FluencyLevel,
} from '@/lib/consts'
import { useEffect, useState } from 'react'
import useDebounce from './use-debounce'
import { rewriteText } from '../services/api'
import type { SharedSelection } from '@heroui/react'

export const useWriter = () => {
  const [text, setText] = useState('')
  const [debouncedValue] = useDebounce(text, 1000)
  const [tone, setTone] = useState<Tone>(TONES.NEUTRAL)
  const [style, setStyle] = useState<Style>(STYLES.NORMAL)
  const [audience, setAudience] = useState<Audience>(AUDIENCES.GENERAL)
  const [fluency, setFluency] = useState<FluencyLevel>(FLUENCY_LEVELS.FLUENT)
  const [language, setLanguage] = useState<Language>(LANGUAGES.ENGLISH)
  const [isFetching, setIsFetching] = useState(false)

  const [improvedText, setImprovedText] = useState('')

  const handleLanguageChange = (key: string | number | null) => {
    if (!key || key.toString().trim() === '') return

    setLanguage(key.toString() as Language)
  }

  const handleStyleChange = (key: SharedSelection) => {
    if (typeof key === 'string') return

    setStyle(Array.from(key)[0] as Style)
  }

  const handleToneChange = (key: SharedSelection) => {
    if (typeof key === 'string') return

    setTone(Array.from(key)[0] as Tone)
  }

  const handleFluencyChange = (key: SharedSelection) => {
    if (typeof key === 'string') return

    setFluency(Array.from(key)[0] as FluencyLevel)
  }

  const handleAudienceChange = (key: SharedSelection) => {
    if (typeof key === 'string') return

    setAudience(Array.from(key)[0] as Audience)
  }

  useEffect(() => {
    if (!debouncedValue || debouncedValue.trim() === '') {
      // setImprovedText('')
      return
    }

    const fetchResponse = async () => {
      if (debouncedValue.trim() === '') return

      setIsFetching(true)

      const res = await rewriteText({
        text: debouncedValue,
        language,
        style,
        tone,
        fluency,
        audience,
      })

      setImprovedText(res.data || '')
    }

    fetchResponse().then(() => setIsFetching(false))
  }, [debouncedValue, language, style, tone, fluency, audience])

  return {
    text,
    tone,
    style,
    fluency,
    audience,
    language,
    isFetching,
    improvedText,
    setText,
    handleLanguageChange,
    handleStyleChange,
    handleToneChange,
    handleFluencyChange,
    handleAudienceChange,
  }
}
