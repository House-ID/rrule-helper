import { Options } from 'rrule';
import { toSwedish } from './swedish';
import { toEnglish } from './english';

type Translator = (rrule: Partial<Options>) => string;

const languages: Record<string, Translator> = {
  sv: toSwedish,
  en: toEnglish,
};

export const toText = (rrule: Partial<Options>, lang: string): string => {
  const translator = languages[lang] || toEnglish;
  return translator(rrule) || toEnglish(rrule);
};
