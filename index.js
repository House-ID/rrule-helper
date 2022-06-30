const toSwedish = require('./swedish');
const toEnglish = require('./english');
const languages = {
  'sv': toSwedish,
  'en': toEnglish,
};

module.exports = {
  toText: (rrule, lang) => {
    const translator = languages[lang] || toEnglish;
    return translator(rrule) || toEnglish(rrule);
  }
};