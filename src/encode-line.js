const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  const arrOfLetters = str.split("");
  let encodedLine = "";
  if (str === "" || str.length === 1) {
    return str;
  }
  let counter = 1;
  for (let index = 1; index < arrOfLetters.length; index += 1) {
    if (arrOfLetters[index] == arrOfLetters[index - 1]) {
      counter += 1;
    } else {
      addLine(arrOfLetters[index - 1]);
      counter = 1;
    }
    if (index == arrOfLetters.length - 1) {
      addLine(arrOfLetters[index]);
    }
  }
  function addLine(elem) {
    encodedLine =
      counter > 1 ? encodedLine + counter + elem : encodedLine + elem;
  }

  return encodedLine;
}

module.exports = {
  encodeLine
};
