const { toText } = require('./');
const { RRule } = require('rrule');

test('Every day(s)', () => {
  expect(toText(RRule.parseString('FREQ=DAILY'), 'sv')).toBe('varje dag');
  expect(toText(RRule.parseString('FREQ=DAILY'), 'en')).toBe('every day');
});