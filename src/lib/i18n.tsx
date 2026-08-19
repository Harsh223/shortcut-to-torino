import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { it, en, type Copy } from "./copy";

export type Lang = "it" | "en";

const dict: Record<Lang, Copy> = { it, en };

const I18nContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; c: Copy }>({
  lang: "it",
  setLang: () => {},
  c: it,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("it");

  useEffect(() => {
    const stored = window.localStorage.getItem("shortcut-lang");
    if (stored === "en" || stored === "it") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("shortcut-lang", l);
    } catch {
      /* ignore */
    }
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, c: dict[lang] }}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
