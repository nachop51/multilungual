import { heroui } from '@heroui/react'

export default heroui({
  themes: {
    light: {
      colors: {
        primary: '#7269FF',
        secondary: '#251F4B',
      },
    },
    dark: {
      colors: {
        background: '#0F0B21',
        primary: '#7269FF',
        secondary: '#B2A8EE',
        content1: '#1A1333',
        content2: '#251F4B',
        content3: '#3B3261',
        content4: '#4E456F',
        default: {
          100: '#1A1333',
          200: '#251F4B',
          300: '#3B3261',
          400: '#4E456F',
          500: '#6C5DD3',
        },
      },
    },
  },
})
