import type { Language } from '@/lib/consts'
import { apiClient } from '@/lib/services/api'
import { useState } from 'react'

export const useDictionary = () => {
  const [meanings, setMeanings] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  const fecthMeanings = async ({
    word,
    sourceLang,
    targetLang,
  }: {
    word: string
    sourceLang: Language
    targetLang: Language
  }) => {
    if (isFetching) return

    setIsFetching(true)

    const res = await apiClient.api.dictionary.get({
      query: {
        word,
        sourceLang,
        targetLang,
      },
    })

    if (!res.error) {
      setMeanings(res.data)
    }

    setIsFetching(false)
  }

  return {
    meanings,
    isFetching,
    fecthMeanings,
  }
}
