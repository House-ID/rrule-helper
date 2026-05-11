import { test, expect } from 'vitest';
import { RRule } from 'rrule';
import { toText } from '../index';

test('Every day(s)', () => {
  expect(toText(RRule.parseString('FREQ=DAILY'), 'sv')).toBe('varje dag');
  expect(toText(RRule.parseString('FREQ=DAILY'), 'en')).toBe('every day');
});
