"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useState } from "react"

type Language = "en" | "hi" | "mr" | "gu" | "kn" | "ta" | "te"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en")

  // Mock translations - replace with actual translation logic
  const translations = {
    en: { hello: "Hello", goodbye: "Goodbye" },
    hi: { hello: "नमस्ते", goodbye: "अलविदा" },
    mr: { hello: "नमस्कार", goodbye: "अलविदा" },
    gu: { hello: "કેમ છો", goodbye: "આવજો" },
    kn: { hello: "ನಮಸ್ಕಾರ", goodbye: "বিদায়" },
    ta: { hello: "வணக்கம்", goodbye: "பிரியாவிடை" },
    te: { hello: "నమస్కారం", goodbye: "వీడ్కోలు" },
  }

  const t = (key: string) => {
    // @ts-expect-error
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)

