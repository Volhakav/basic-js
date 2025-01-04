const { NotImplementedError } = require('../extensions/index.js');

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
  if (arguments.length === 0) {
    return "Unable to determine the time of year!";
  }
  if (!(date instanceof Date) || Object.keys(date).length) {
    throw new Error("Invalid date!");
  }

  const month = date.getMonth();
  let season =
    month < 2 || month == 11
      ? "winter"
      : month < 5
      ? "spring"
      : month < 8
      ? "summer"
      : "autumn";

  return season;
}

module.exports = {
  getSeason,
};