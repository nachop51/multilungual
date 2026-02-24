import { cn } from '@//lib/utils/fns'

export default function Layout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <main className={cn('mx-auto w-full max-w-7xl p-8', className)}>
      {children}
    </main>
  )
}
