"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

// Define available languages
export type Language = "english" | "hindi" | "malayalam" | "tamil" | "kannada"

// Define translations for each language
const translations = {
  english: {
    welcomeBack: "Welcome Back",
    trackProgress: "Track your progress and stay connected.",
    overallProgress: "Overall Progress",
    activeCourses: "Active Courses",
    pendingAssignments: "Pending Assignments",
    upcomingSessions: "Upcoming Sessions",
    myCourses: "My Courses",
    messagesFromTeachers: "Messages from Teachers",
    reply: "Reply",
    sendMessage: "Send message...",
    dashboard: "Dashboard",
    profile: "Profile",
    schedule: "Schedule",
    group: "Group Chat",
  },
  hindi: {
    welcomeBack: "वापसी पर स्वागत है",
    trackProgress: "अपनी प्रगति को ट्रैक करें और जुड़े रहें।",
    overallProgress: "समग्र प्रगति",
    activeCourses: "सक्रिय पाठ्यक्रम",
    pendingAssignments: "लंबित असाइनमेंट",
    upcomingSessions: "आगामी सत्र",
    myCourses: "मेरे पाठ्यक्रम",
    messagesFromTeachers: "शिक्षकों से संदेश",
    reply: "जवाब दें",
    sendMessage: "संदेश भेजें...",
    dashboard: "डैशबोर्ड",
    profile: "प्रोफ़ाइल",
    schedule: "अनुसूची",
    group: "समूह चैट",
  },
  malayalam: {
    welcomeBack: "സ്വാഗതം തിരികെ",
    trackProgress: "നിങ്ങളുടെ പുരോഗതി ട്രാക്ക് ചെയ്യുകയും ബന്ധപ്പെട്ടിരിക്കുകയും ചെയ്യുക.",
    overallProgress: "മൊത്തത്തിലുള്ള പുരോഗതി",
    activeCourses: "സജീവ കോഴ്സുകൾ",
    pendingAssignments: "തീർപ്പാക്കാത്ത അസൈൻമെന്റുകൾ",
    upcomingSessions: "വരാനിരിക്കുന്ന സെഷനുകൾ",
    myCourses: "എന്റെ കോഴ്സുകൾ",
    messagesFromTeachers: "അധ്യാപകരിൽ നിന്നുള്ള സന്ദേശങ്ങൾ",
    reply: "മറുപടി",
    sendMessage: "സന്ദേശം അയയ്ക്കുക...",
    dashboard: "ഡാഷ്ബോർഡ്",
    profile: "പ്രൊഫൈൽ",
    schedule: "ഷെഡ്യൂൾ",
    group: "ഗ്രൂപ്പ് ചാറ്റ്",
  },
  tamil: {
    welcomeBack: "மீண்டும் வரவேற்கிறோம்",
    trackProgress: "உங்கள் முன்னேற்றத்தைக் கண்காணித்து இணைந்திருங்கள்.",
    overallProgress: "ஒட்டுமொத்த முன்னேற்றம்",
    activeCourses: "செயலில் உள்ள பாடநெறிகள்",
    pendingAssignments: "நிலுவையில் உள்ள பணிகள்",
    upcomingSessions: "வரவிருக்கும் அமர்வுகள்",
    myCourses: "எனது பாடநெறிகள்",
    messagesFromTeachers: "ஆசிரியர்களிடமிருந்து செய்திகள்",
    reply: "பதில்",
    sendMessage: "செய்தி அனுப்பு...",
    dashboard: "டாஷ்போர்டு",
    profile: "சுயவிவரம்",
    schedule: "அட்டவணை",
    group: "குழு அரட்டை",
  },
  kannada: {
    welcomeBack: "ಮರಳಿ ಸ್ವಾಗತ",
    trackProgress: "ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ಸಂಪರ್ಕದಲ್ಲಿರಿ.",
    overallProgress: "ಒಟ್ಟಾರೆ ಪ್ರಗತಿ",
    activeCourses: "ಸಕ್ರಿಯ ಕೋರ್ಸ್‌ಗಳು",
    pendingAssignments: "ಬಾಕಿ ಇರುವ ಕಾರ್ಯಗಳು",
    upcomingSessions: "ಮುಂಬರುವ ಸೆಷನ್‌ಗಳು",
    myCourses: "ನನ್ನ ಕೋರ್ಸ್‌ಗಳು",
    messagesFromTeachers: "ಶಿಕ್ಷಕರಿಂದ ಸಂದೇಶಗಳು",
    reply: "ಉತ್ತರಿಸಿ",
    sendMessage: "ಸಂದೇಶ ಕಳುಹಿಸಿ...",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    profile: "ಪ್ರೊಫೈಲ್",
    schedule: "ವೇಳಾಪಟ್ಟಿ",
    group: "ಗುಂಪು ಚಾಟ್",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof translations.english) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("english")

  const t = (key: keyof typeof translations.english): string => {
    return translations[language][key] || translations.english[key]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

