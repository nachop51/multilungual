import { cn } from '@/lib/utils'

export default function Layout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <main
      className={cn(
        'relative mx-auto flex w-full max-w-7xl justify-center gap-4 p-8',
        className,
      )}
    >
      {children}
    </main>
  )
}
