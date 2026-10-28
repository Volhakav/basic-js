const { NotImplementedError } = require('../lib');

/**
 * Extract season from given date and expose the enemy scout!
 *
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 *
 * @example
 *
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 *
 */


function getSeason(date) {
  if (arguments.length === 0 || date === undefined) {
    throw new Error('Invalid date!');
  }

  if (date === null || typeof date.getMonth !== 'function') {
    throw new Error('Invalid date!');
  }

  let month;

  try {
    month = date.getMonth();
  } catch {
    throw new Error('Invalid date!');
  }

  if (!Number.isInteger(month) || month < 0 || month > 11) {
    throw new Error('Invalid date!');
  }

  if (month >= 2 && month <= 4) {
    return 'spring';
  }

  if (month >= 5 && month <= 7) {
    return 'summer';
  }

  if (month >= 8 && month <= 10) {
    return 'autumn';
  }

  return 'winter';
}

module.exports = { getSeason };

