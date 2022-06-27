const eachCounting = x => {
  switch(x) {
    case 1:  return { n: 'varje', t: 'varje' };
    case 2:  return { n: 'varannan', t: 'vartannat' };
    case 3:  return { n: 'var tredje', t: 'vart tredje' };;
    case 4:  return { n: 'var fjärde', t: 'vart fjärde' };;
    case 5:  return { n: 'var femte', t: 'vart femte' };;
    default: return { n: `var ${x}:e`, t: `vart ${x}:e` };;
  }
}

const counting = x => {
  switch(x) {
    case -1:  return 'sista';
    case 1:  return 'första';
    case 2:  return 'andra';
    case 3:  return 'tredje';
    case 4:  return 'fjärde';
    case 5:  return 'femte';
    default: return `${x}:e`;
  }
}

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

const getListText = items => items.reduce((output, item, index, arr) => {
  if(index === 0) {
    return item;
  }
  if(index === arr.length - 1) {
    return `${output} och ${item}`;
  }
  return `${output}, ${item}`;
}, '');

const getMonthList = (bymonth) => {
  if(!bymonth) {
    return '';
  }
  if(Array.isArray(bymonth)) {
    return getListText(bymonth.map(m => months[m - 1]));
  }
  return months[bymonth - 1];
};
const getWeekdaysList = (byweekday) => {
  if(!byweekday || byweekday.length === 0) {
    return '';
  }

  return getListText(byweekday.map(w => {
    if(!w.n) {
      return weekdays[w.weekday].singular;
    }
    return `${counting(w.n)} ${weekdays[w.weekday].singular}en`;
  }));
};

const getMonthDaysList = (bymonthday) => {
  if(!bymonthday) {
    return '';
  }
  if(Array.isArray(bymonthday)) {
    return `dag ${getListText(bymonthday)}`;
  }
  return `dag ${bymonthday}`;
};

const getMonthDaysList2 = (bymonthday) => {
  if(!bymonthday) {
    return '';
  }

  return getListText((Array.isArray(bymonthday) ? bymonthday : [bymonthday]).map(d => `${d}:e`));
};

module.exports = rrule => {
  console.log(rrule);

  const parts = [];
  
  if(rrule.freq === 3) { // DAILY
    parts.push(`${eachCounting(rrule.interval ?? 1).n} dag`);
  }

  if(rrule.freq === 2) { // WEEKLY
    const weekdayList = getWeekdaysList(rrule.byweekday);
    if(weekdayList !== '') {
      parts.push(weekdayList);
    }

    parts.push(`${eachCounting(rrule.interval ?? 1).n} vecka`);
  }

  if(rrule.freq === 1) { // MONTHLY
    const daylist = getMonthDaysList(rrule.bymonthday);
    if(daylist !== '') {
      parts.push(daylist);
    }

    const weekdayList = getWeekdaysList(rrule.byweekday);
    if(weekdayList !== '') {
      parts.push(weekdayList);
    }

    parts.push(`${eachCounting(rrule.interval ?? 1).n} månad`);
  }

  if(rrule.freq === 0) { // YEARLY
    const daylist = getMonthDaysList2(rrule.bymonthday);
    if(daylist !== '') {
      parts.push(`den ${daylist}`);
    }   
    
    const weekdayList = getWeekdaysList(rrule.byweekday);
    if(weekdayList !== '') {
      parts.push(weekdayList);
    }

    const monthList = getMonthList(rrule.bymonth);
    if(monthList !== '') {
      parts.push(monthList);
    }

    parts.push(`${eachCounting(rrule.interval ?? 1).t} år`);
  }  

  return parts.join(' ');
};