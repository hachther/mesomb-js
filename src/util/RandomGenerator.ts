/**
 * RandomGenerator class
 */
export default class RandomGenerator {

  /**
   * Generate a random nonce
   *
   * @param {number} [length=40] - The length of the nonce
   * @returns {string}
   */
  public static nonce(length = 40) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
