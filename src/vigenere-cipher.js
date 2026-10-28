const { NotImplementedError } = require('../lib');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */


class VigenereCipheringMachine {
  constructor(options = {}) {
    if (arguments.length === 0 || options == null) {
      throw new Error('Arguments are required!');
    }

    if (typeof options === 'boolean') {
      this.isDirect = options;
    } else {
      this.isDirect = options.isDirect !== false;
    }
  }

  encrypt(message, key) {
    return this.process(message, key, true);
  }

  decrypt(message, key) {
    return this.process(message, key, false);
  }

  process(message, key, encrypting) {
    if (typeof message !== 'string' || typeof key !== 'string' || !key.length) {
      throw new Error('Message and key are required!');
    }

    const normalizedKey = key.toUpperCase();
    let keyIndex = 0;
    let result = '';

    for (const char of message) {
      const code = char.toUpperCase().charCodeAt(0);

      if (code < 65 || code > 90) {
        result += char;
        continue;
      }

      const shift = normalizedKey.charCodeAt(keyIndex % normalizedKey.length) - 65;
      const direction = (encrypting === this.isDirect) ? 1 : -1;
      const transformed = (code - 65 + direction * shift + 26) % 26;

      result += String.fromCharCode(transformed + 65);
      keyIndex++;
    }

    return result;
  }
}

module.exports = { VigenereCipheringMachine };
