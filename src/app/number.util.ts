export class NumberUtil {
  static getRandomNumberInRange(minimum: number = 0, maximum: number = 10) {
    return (Math.random() * (maximum - minimum + 1)) << 0
  }
}
