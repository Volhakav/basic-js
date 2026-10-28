const { NotImplementedError } = require('../lib');

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */



function repeater(str, options = {}) {
  const {
    repeatTimes = 1,
    separator = '+',
    addition = '',
    additionRepeatTimes = 1,
    additionSeparator = '|',
  } = options;

  const base = String(str);
  const extra = String(addition);

  let additionText = '';

  for (let i = 0; i < additionRepeatTimes; i++) {
    if (i > 0) {
      additionText += additionSeparator;
    }

    additionText += extra;
  }

  const result = [];

  for (let i = 0; i < repeatTimes; i++) {
    result.push(base + additionText);
  }

  return result.join(separator);
}

module.exports = { repeater };

