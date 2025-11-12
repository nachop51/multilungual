import { HeroUIProvider, type HeroUIProviderProps } from '@heroui/react'

const heroUIProps: Omit<HeroUIProviderProps, 'children'> = {
  labelPlacement: 'outside',
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <HeroUIProvider {...heroUIProps}>{children}</HeroUIProvider>
}
