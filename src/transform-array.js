const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }
  let i;
  let prevAbsent = false;

  const sequences = [
    "--discard-next",
    "--discard-prev",
    "--double-next",
    "--double-prev",
  ];

  const resultArr = [...arr];
  function controlSequences(sequence, index) {
    if (sequence == "--discard-next") {
      if (index !== resultArr.length - 1) {
        makeSequence(index, 2);
        i -= 1;
        prevAbsent = true;
      } else {
        makeSequence(index, 1);
      }
    } else if (sequence == "--discard-prev") {
      if (index && !prevAbsent) {
        makeSequence(index - 1, 2);
        i -= 1;
      } else {
        makeSequence(index, 1);
      }
    } else if (sequence == "--double-next") {
      if (index !== resultArr.length - 1) {
        makeSequence(index, 1, resultArr[index + 1]);
      } else makeSequence(index, 1);
    } else {
      makeSequence(index, 1);
      if (index !== 0 && !prevAbsent) {
        makeSequence(index - 1, 0, resultArr[index - 1]);
      }
    }
  }

  function makeSequence(startIndex, deleteCount, item) {
    if (item === undefined) {
      resultArr.splice(startIndex, deleteCount);
    } else {
      resultArr.splice(startIndex, deleteCount, item);
    }
  }

  if (arr.length === 0) {
    return [];
  }

  for (i = 0; i < resultArr.length; i += 1) {
    if (typeof resultArr[i] === "string" && sequences.includes(resultArr[i])) {

      controlSequences(resultArr[i], i);
    } else {
      prevAbsent = false;
    }
  }
  return resultArr;
}

module.exports = {
  transform
};
