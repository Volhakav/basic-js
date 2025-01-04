const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array with heights, sort them except if the value is -1.
 *
 * @param {Array} arr
 * @return {Array}
 *
 * @example
 * arr = [-1, 150, 190, 170, -1, -1, 160, 180]
 *
 * The result should be [-1, 150, 160, 170, -1, -1, 180, 190]
 */
function sortByHeight(arr) {
  const arrWithout1 = [];
  arr.forEach((el) => {
    if (el !== -1) {
      arrWithout1.push(el);
    }
  });
  const sortedArr = arrWithout1.sort((a, b) => a - b);

  const resultArr = [];
  let index = 0;
  arr.forEach((el) => {
    if (el === -1) {
      resultArr.push(el);
    } else {
      resultArr.push(sortedArr[index]);
      index += 1;
    }
  });
  return resultArr;
}

module.exports = {
  sortByHeight
};
