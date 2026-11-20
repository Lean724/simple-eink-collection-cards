import * as en from './languages/en.json';
import * as es from './languages/es.json';
import * as zh_Hans from './languages/zh_Hans.json';
import * as de from './languages/de.json';
import * as it from './languages/it.json';
import * as fr from './languages/fr.json';
import * as pt from './languages/pt.json';
import * as ru from './languages/ru.json';
import * as pl from './languages/pl.json';
import * as nl from './languages/nl.json';

const languages: Record<string, any> = {
  en,
  es,
  'zh-Hans': zh_Hans,
  zh: zh_Hans,
  'zh-CN': zh_Hans,
  de,
  it,
  fr,
  pt,
  'pt-BR': pt,
  ru,
  pl,
  nl
};

export const SUPPORTED_LANGUAGES = ['en', 'es', 'zh-Hans', 'de', 'it', 'fr', 'pt', 'ru', 'pl', 'nl'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export function localize(string: string, language?: string): string {
  const lang = (language || 'en').replace('_', '-');
  const langKey = languages[lang] ? lang : languages[lang.split('-')[0]] ? lang.split('-')[0] : 'en';

  const parts = string.split('.');
  let translated: any = languages[langKey];

  for (const part of parts) {
    if (translated && typeof translated === 'object' && part in translated) {
      translated = translated[part];
    } else {
      translated = undefined;
      break;
    }
  }

  if (translated === undefined && langKey !== 'en') {
    // Fallback to English
    translated = languages.en;
    for (const part of parts) {
      if (translated && typeof translated === 'object' && part in translated) {
        translated = translated[part];
      } else {
        return string;
      }
    }
  }

  return translated !== undefined ? translated : string;
}
