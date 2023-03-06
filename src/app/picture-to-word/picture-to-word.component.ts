import {Component, Input} from '@angular/core';
import {IMAGES} from "../images.data";
import {nlNL} from "../words-nlNL.data";

@Component({
  selector: 'app-picture-to-word',
  templateUrl: './picture-to-word.component.html',
  styleUrls: ['./picture-to-word.component.scss']
})
export class PictureToWordComponent {

  @Input()
  category: keyof typeof IMAGES = "animals";

  @Input()
  difficulty: number = 1;

  locale: string = "nlNL";

  word: string = "";
  lastWord: string = "";
  image: string = "";
  wordOptions: string[] = [];

  correctWords: number = 0;

  complete: boolean = false;
  wrongWord: string | null = null;

  get translatedWords() {
    const localeData = {
      nlNL: nlNL,
    }
    return (localeData as any)[this.locale];
  }

  ngOnInit() {
    this.setWordAndImage();
  }

  setWordAndImage() {
    const translatedWords = this.translatedWords;
    const wordsInCategory = Object.keys(IMAGES[this.category]);
    const translatedWordsIncategory: any = translatedWords[this.category];

    const wordsInDifficulty = wordsInCategory.filter(word => this.calculateDifficulty(translatedWordsIncategory[word]) <= this.difficulty)
    const wordIndex = this.getRandomNumberInRange(0, wordsInDifficulty.length);
    const baseWord = wordsInDifficulty[wordIndex];
    this.word = translatedWordsIncategory[wordsInDifficulty[wordIndex]];
    this.image = (IMAGES as any)[this.category][baseWord];
    this.generateOptions(wordsInDifficulty);

    if (!this.word || !this.image || this.word == this.lastWord) {
      this.setWordAndImage();
    }
  }

  generateOptions(words: Array<string>) {
    let nrOfOptions = 3;
    if (this.difficulty > 3 && this.difficulty < 6) {
      nrOfOptions = 4;
    } else if (this.difficulty >= 6) {
      nrOfOptions = 5;
    }
    const translatedWordsIncategory: any = this.translatedWords[this.category];
    const uniqueWords = this.uniqueArray(words.map(word => translatedWordsIncategory[word])).filter(word => word != this.word);
    this.wordOptions = this.shuffleArray([...uniqueWords.slice(0, nrOfOptions - 1), this.word]);
  }

  getRandomNumberInRange(minimum: number = 0, maximum: number = 10) {
    return (Math.random() * (maximum - minimum + 1)) << 0
  }

  calculateDifficulty(word: string) {
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

  checkWord(word: string) {
    if (this.word == word) {
      this.completeLevel()
    }
    this.wrongWord = word;
  }

  completeLevel() {

    this.lastWord = this.word;
    this.complete = true;
    this.wrongWord = null;
    this.correctWords = this.correctWords + 1;

    // increase the difficulty after every 5 correct answers
    if (this.correctWords == 5) {
      this.difficulty = this.difficulty + 1;
      this.correctWords = 0;
    }

    setTimeout(() => {
      this.complete = false;
      this.setWordAndImage();
    }, 2000);
  }

  uniqueArray(myArray: Array<any>) {
    return [...new Set(myArray)]
  }

  shuffleArray(array: Array<any>) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

}
