const toSwedish = require('./swedish');
const { RRule } = require('rrule');

test('Every day(s)', () => {
  expect(toSwedish(RRule.parseString('FREQ=DAILY'))).toBe('varje dag');
  expect(toSwedish(RRule.parseString('FREQ=DAILY;INTERVAL=1'))).toBe('varje dag');
  expect(toSwedish(RRule.parseString('FREQ=DAILY;INTERVAL=2'))).toBe('varannan dag');
  expect(toSwedish(RRule.parseString('FREQ=DAILY;INTERVAL=3'))).toBe('var tredje dag');
  expect(toSwedish(RRule.parseString('FREQ=DAILY;INTERVAL=8'))).toBe('var 8:e dag');
});

test('Every week(s)', () => {
  expect(toSwedish(RRule.parseString('FREQ=WEEKLY'))).toBe('varje vecka');
  expect(toSwedish(RRule.parseString('FREQ=WEEKLY;INTERVAL=1'))).toBe('varje vecka');
  expect(toSwedish(RRule.parseString('FREQ=WEEKLY;INTERVAL=2'))).toBe('varannan vecka');
  expect(toSwedish(RRule.parseString('FREQ=WEEKLY;INTERVAL=3'))).toBe('var tredje vecka');
  expect(toSwedish(RRule.parseString('FREQ=WEEKLY;INTERVAL=8'))).toBe('var 8:e vecka');
});

test('Every week(s) on weekdays', () => {
  expect(toSwedish(RRule.parseString('FREQ=WEEKLY;INTERVAL=1;BYDAY=MO'))).toBe('måndag varje vecka');
  expect(toSwedish(RRule.parseString('FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,SA'))).toBe('måndag och lördag varje vecka');
  expect(toSwedish(RRule.parseString('FREQ=WEEKLY;INTERVAL=1;BYDAY=TU,WE,SU'))).toBe('tisdag, onsdag och söndag varje vecka');
});

test('Every month(s)', () => {
  expect(toSwedish(RRule.parseString('FREQ=MONTHLY'))).toBe('varje månad');
  expect(toSwedish(RRule.parseString('FREQ=MONTHLY;INTERVAL=1'))).toBe('varje månad');
  expect(toSwedish(RRule.parseString('FREQ=MONTHLY;INTERVAL=2'))).toBe('varannan månad');
  expect(toSwedish(RRule.parseString('FREQ=MONTHLY;INTERVAL=3'))).toBe('var tredje månad');
  expect(toSwedish(RRule.parseString('FREQ=MONTHLY;INTERVAL=8'))).toBe('var 8:e månad');
});

test('Every month(s) on day X', () => {
  expect(toSwedish(RRule.parseString('FREQ=MONTHLY;BYMONTHDAY=1'))).toBe('dag 1 varje månad');
  expect(toSwedish(RRule.parseString('FREQ=MONTHLY;BYMONTHDAY=1,28'))).toBe('dag 1 och 28 varje månad');
  expect(toSwedish(RRule.parseString('FREQ=MONTHLY;BYMONTHDAY=1,12,28'))).toBe('dag 1, 12 och 28 varje månad');
});

test('Every month(s) on Xst weekday', () => {
  expect(toSwedish(RRule.parseString('FREQ=MONTHLY;BYDAY=1MO'))).toBe('första måndagen varje månad');
  expect(toSwedish(RRule.parseString('FREQ=MONTHLY;BYDAY=1MO,2TU'))).toBe('första måndagen och andra tisdagen varje månad');
  expect(toSwedish(RRule.parseString('FREQ=MONTHLY;BYDAY=1MO,2TU,-1SU'))).toBe('första måndagen, andra tisdagen och sista söndagen varje månad');
});

test('Every year(s)', () => {
  expect(toSwedish(RRule.parseString('FREQ=YEARLY'))).toBe('varje år');
  expect(toSwedish(RRule.parseString('FREQ=YEARLY;INTERVAL=1'))).toBe('varje år');
  expect(toSwedish(RRule.parseString('FREQ=YEARLY;INTERVAL=2'))).toBe('vartannat år');
  expect(toSwedish(RRule.parseString('FREQ=YEARLY;INTERVAL=3'))).toBe('vart tredje år');
  expect(toSwedish(RRule.parseString('FREQ=YEARLY;INTERVAL=8'))).toBe('vart 8:e år');
});

test('Every year(s)', () => {
  expect(toSwedish(RRule.parseString('FREQ=YEARLY'))).toBe('varje år');
  expect(toSwedish(RRule.parseString('FREQ=YEARLY;INTERVAL=1'))).toBe('varje år');
  expect(toSwedish(RRule.parseString('FREQ=YEARLY;INTERVAL=2'))).toBe('vartannat år');
  expect(toSwedish(RRule.parseString('FREQ=YEARLY;INTERVAL=3'))).toBe('vart tredje år');
  expect(toSwedish(RRule.parseString('FREQ=YEARLY;INTERVAL=8'))).toBe('vart 8:e år');
});

test('Every year(s) month X', () => {
  expect(toSwedish(RRule.parseString('FREQ=YEARLY;INTERVAL=1;BYMONTH=1'))).toBe('januari varje år');
  expect(toSwedish(RRule.parseString('FREQ=YEARLY;INTERVAL=1;BYMONTH=1,3'))).toBe('januari och mars varje år');
  expect(toSwedish(RRule.parseString('FREQ=YEARLY;INTERVAL=1;BYMONTH=1,3,12'))).toBe('januari, mars och december varje år');
});

test('Every year(s) month X on Yst weekday', () => {
  expect(toSwedish(RRule.parseString('FREQ=YEARLY;INTERVAL=1;BYMONTH=1;BYDAY=1MO'))).toBe('första måndagen januari varje år');
  expect(toSwedish(RRule.parseString('FREQ=YEARLY;INTERVAL=3;BYMONTH=1,2,3;BYDAY=1MO,-1WE'))).toBe('första måndagen och sista onsdagen januari, februari och mars vart tredje år');
});

test('Every year(s) month X on day Y', () => {
  expect(toSwedish(RRule.parseString('FREQ=YEARLY;INTERVAL=1;BYMONTH=3;BYMONTHDAY=4'))).toBe('den 4:e mars varje år');
});