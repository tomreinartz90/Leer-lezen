import {nlNL} from "./words-nlNL.data";

export class WordUtil {
  private static localeData = {
    nlNL: nlNL,
  }

  static readonly ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
  static getTranslatedWords(locale:keyof typeof WordUtil.localeData) {
    return (WordUtil.localeData as any)[locale];
  }
  static calculateDifficulty(word: string) {
    console.log(word);
    let difficulty = 0;
    // increase difficulty on basis of length;
    switch (word.length) {
      case 1:
      case 2:
      case 3:
        difficulty = difficulty + 1;
        break;
      case 4:
      case 5:
        difficulty = difficulty + 1;
        break;
      case 6:
      case 7:
        difficulty = difficulty + 2;
        break;
      case 8:
      case 9:
      case 10:
        difficulty = difficulty + 4;
        break;
      default:
        difficulty = difficulty + 5;
        break;
    }

    // increase difficulty on basis of complex letters
    difficulty = difficulty + (word?.match(/[qyxz]/)?.length || 0)

    // increase difficulty on the basis of vower following each other
    difficulty = difficulty + (word?.match(/[ouiae]{2,}/)?.length || 0)

    // increase difficulty on the basis of complex vowel groups
    difficulty = difficulty + ((word?.match(/[ou|oe|oa|ui|ua|ue|uo|ie|ae|ao|au|eo|ei|ea|eu]{2,}/)?.length) ? 1 : 0)
    return difficulty;
  }
}
