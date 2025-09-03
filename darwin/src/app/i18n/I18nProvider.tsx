"use client";

import { ReactNode, createContext, useCallback, useContext } from "react";

import { useRouter } from "next/navigation";

import i18next, { TFunction } from "i18next";

import { useTranslation } from "./client";

interface I18nContextProps {
  lng: string;
  t: TFunction;
  changeLanguage: (newLanguage: string) => Promise<void>;
}

interface I18nProviderProps {
  lng: string;
  children: ReactNode;
}

export const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export default function I18nProvider({ lng, children }: I18nProviderProps) {
  const { t } = useTranslation(lng);
  const router = useRouter();

  const changeLanguage = useCallback(
    async (newLanguage: string) => {
      if (newLanguage === lng) {
        return;
      }

      await i18next.changeLanguage(newLanguage);
      router.push(window.location.href.replace(`/${lng}`, `/${newLanguage}`));
    },
    [lng, router]
  );

  return (
    <I18nContext.Provider value={{ lng, t, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
