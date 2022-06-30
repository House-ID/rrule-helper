const { RRule } = require('rrule');

module.exports = rrule => {
  return new RRule(rrule).toText();
};