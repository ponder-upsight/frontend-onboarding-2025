'use client'

import {createContext, ReactNode, useContext} from 'react'
import { TFunction } from 'i18next'
import { useTranslation } from './client'

interface I18nContextProps {
    lng: string
    t: TFunction
}

interface I18nProviderProps {
    lng: string
    children: ReactNode
}

export const I18nContext = createContext<I18nContextProps | undefined>(undefined)

export default function I18nProvider({ lng, children }: I18nProviderProps) {
  const { t } = useTranslation(lng)
  
  return <I18nContext.Provider value={{ lng, t }}>
      {children}
  </I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
