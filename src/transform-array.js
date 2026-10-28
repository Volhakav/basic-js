const { NotImplementedError } = require('../lib');

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

  const commands = new Set([
    '--double-next',
    '--discard-next',
    '--double-prev',
    '--discard-prev',
  ]);

  const discarded = new Set();
  const doubled = new Map();

  for (let i = 0; i < arr.length; i++) {
    const command = arr[i];

    if (!commands.has(command)) {
      continue;
    }

    let target;

    if (command === '--double-next' || command === '--discard-next') {
      target = i + 1;
    } else {
      target = i - 1;
    }

    if (
      target < 0 ||
      target >= arr.length ||
      commands.has(arr[target])
    ) {
      continue;
    }

    if (command === '--double-next' || command === '--double-prev') {
      doubled.set(target, (doubled.get(target) || 0) + 1);
    } else {
      discarded.add(target);
    }
  }

  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (commands.has(arr[i]) || discarded.has(i)) {
      continue;
    }

    result.push(arr[i]);

    const extraCopies = doubled.get(i) || 0;

    for (let j = 0; j < extraCopies; j++) {
      result.push(arr[i]);
    }
  }

  return result;
}

module.exports = { transform };
