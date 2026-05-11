import { RRule, Options } from 'rrule';

export const toEnglish = (rrule: Partial<Options>): string =>
  new RRule(rrule).toText();
