import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEnumLanguage(value: string) {
  return (
    value.charAt(0).toUpperCase() +
    value.slice(1).toLowerCase().replaceAll('_', ' ')
  )
}
