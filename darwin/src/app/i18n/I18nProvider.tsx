'use client'

import { ReactNode } from 'react'
import { useTranslation } from './client'

interface I18nProviderProps {
  lng: string
  children: ReactNode
}

export default function I18nProvider({ lng, children }: I18nProviderProps) {
  useTranslation(lng)
  return <>{children}</>
}
