import { cn } from '@/lib/utils/fns'
import { Skeleton } from '@heroui/react'
import { marked } from 'marked'

interface MeaningsProps {
  meanings: string
  isFetching: boolean
}

export const Meanings = ({ meanings, isFetching }: MeaningsProps) => {
  return (
    <section className="bg-content1 mt-8 rounded-xl p-12">
      <header className="flex justify-between">
        <h2 className={cn('text-lg font-bold')}>Dictionary</h2>
      </header>

      {!meanings && (
        <p className="text- text-sm">
          Click over a word to see its meaning and definition
        </p>
      )}

      {meanings && (
        <Skeleton isLoaded={!isFetching} className="w-full">
          <div
            className="prose dark:prose-invert prose-sm"
            dangerouslySetInnerHTML={{ __html: marked(meanings || '') }}
          ></div>
        </Skeleton>
      )}
    </section>
  )
}
