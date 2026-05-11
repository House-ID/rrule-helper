import { Options, Weekday } from 'rrule';

type EachCounting = { n: string; t: string };

const eachCounting = (x: number): EachCounting => {
  switch (x) {
    case 1:  return { n: 'varje', t: 'varje' };
    case 2:  return { n: 'varannan', t: 'vartannat' };
    case 3:  return { n: 'var tredje', t: 'vart tredje' };
    case 4:  return { n: 'var fjärde', t: 'vart fjärde' };
    case 5:  return { n: 'var femte', t: 'vart femte' };
    default: return { n: `var ${x}:e`, t: `vart ${x}:e` };
  }
};

const CountingMap: Record<number, string> = {
  [-1]: 'sista',
  [1]: 'första',
  [2]: 'andra',
  [3]: 'tredje',
  [4]: 'fjärde',
  [5]: 'femte',
};

const counting = (x: number): string => CountingMap[x] || `${x}:e`;

const weekdays = [
  { singular: 'måndag' },
  { singular: 'tisdag' },
  { singular: 'onsdag' },
  { singular: 'torsdag' },
  { singular: 'fredag' },
  { singular: 'lördag' },
  { singular: 'söndag' },
];

const months = [
  'januari',
  'februari',
  'mars',
  'april',
  'maj',
  'juni',
  'juli',
  'augusti',
  'september',
  'oktober',
  'november',
  'december',
];

const getListText = (items: Array<string | number>): string =>
  items.reduce<string>((output, item, index, arr) => {
    if (index === 0) {
      return `${item}`;
    }
    if (index === arr.length - 1) {
      return `${output} och ${item}`;
    }
    return `${output}, ${item}`;
  }, '');

const getMonthList = (bymonth: Partial<Options>['bymonth']): string => {
  if (!bymonth) {
    return '';
  }
  if (Array.isArray(bymonth)) {
    return getListText(bymonth.map(m => months[m - 1]));
  }
  return months[bymonth - 1];
};

const getWeekdaysList = (byweekday: Partial<Options>['byweekday']): string => {
  if (!byweekday || !Array.isArray(byweekday) || !byweekday.length) {
    return '';
  }

  const listItems = byweekday.map(item => {
    if (typeof item === 'number') {
      return weekdays[item].singular;
    }

    const wd = item as Weekday;
    return wd.n
      ? `${counting(wd.n)} ${weekdays[wd.weekday].singular}en`
      : weekdays[wd.weekday].singular;
  });

  return getListText(listItems);
};

const getMonthDaysList = (bymonthday: Partial<Options>['bymonthday']): string => {
  if (!bymonthday) {
    return '';
  }
  if (Array.isArray(bymonthday)) {
    return `dag ${getListText(bymonthday)}`;
  }
  return `dag ${bymonthday}`;
};

const getMonthDaysCountList = (bymonthday: Partial<Options>['bymonthday']): string => {
  if (!bymonthday) {
    return '';
  }

  return getListText(
    (Array.isArray(bymonthday) ? bymonthday : [bymonthday]).map(d => `${d}:e`),
  );
};

export const toSwedish = (rrule: Partial<Options> | null | undefined): string => {
  if (!rrule) {
    return '';
  }

  const parts: Array<string> = [];

  if (rrule.freq === 3) { // DAILY
    parts.push(`${eachCounting(rrule.interval ?? 1).n} dag`);
  }

  if (rrule.freq === 2) { // WEEKLY
    const weekdayList = getWeekdaysList(rrule.byweekday);
    if (weekdayList !== '') {
      parts.push(weekdayList);
    }

    parts.push(`${eachCounting(rrule.interval ?? 1).n} vecka`);
  }

  if (rrule.freq === 1) { // MONTHLY
    const daylist = getMonthDaysList(rrule.bymonthday);
    if (daylist !== '') {
      parts.push(daylist);
    }

    const weekdayList = getWeekdaysList(rrule.byweekday);
    if (weekdayList !== '') {
      parts.push(weekdayList);
    }

    parts.push(`${eachCounting(rrule.interval ?? 1).n} månad`);
  }

  if (rrule.freq === 0) { // YEARLY
    const daylist = getMonthDaysCountList(rrule.bymonthday);
    if (daylist !== '') {
      parts.push(`den ${daylist}`);
    }

    const weekdayList = getWeekdaysList(rrule.byweekday);
    if (weekdayList !== '') {
      parts.push(weekdayList);
    }

    const monthList = getMonthList(rrule.bymonth);
    if (monthList !== '') {
      parts.push(monthList);
    }

    parts.push(`${eachCounting(rrule.interval ?? 1).t} år`);
  }

  return parts.join(' ');
};
