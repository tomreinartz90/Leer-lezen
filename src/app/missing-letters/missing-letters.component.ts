import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IMAGES} from "../images.data";
import {WordUtil} from "../word.util";
import {NumberUtil} from "../number.util";
import {ArrayUtil} from "../array.util";

@Component({
  selector: 'app-missing-letters',
  templateUrl: './missing-letters.component.html',
  styleUrls: ['./missing-letters.component.scss']
})
export class MissingLettersComponent {
  @Input()
  category: keyof typeof IMAGES = "animals";

  @Input()
  difficulty: number = 1;

  @Input()
  locale: string = "nlNL";

  @Output()
  completedLevel: EventEmitter<any> = new EventEmitter()

  @Output()
  quitLevel: EventEmitter<any> = new EventEmitter()

  word: string = "";
  lastWord: string = "";

  image: string = "";

  letterOptions: string[] = [];
  hiddenLetter: string = "";

  complete: boolean = false;
  hiddenLetterIndex: number = 0;
  wrongLetter: string = "";

  ngOnInit() {
    this.setWordAndImage();
  }

  get wordAsList() {
    return (this.word || "").split('');
  }

  setWordAndImage() {
    const translatedWords = WordUtil.getTranslatedWords(this.locale as any);
    const wordsInCategory = Object.keys(IMAGES[this.category]);
    const translatedWordsIncategory: any = translatedWords[this.category];

    const wordsInDifficulty = wordsInCategory.filter(word => WordUtil.calculateDifficulty(translatedWordsIncategory[word]) <= this.difficulty)
    const wordIndex = NumberUtil.getRandomNumberInRange(0, wordsInDifficulty.length);
    const baseWord = wordsInDifficulty[wordIndex];
    this.word = translatedWordsIncategory[wordsInDifficulty[wordIndex]];
    this.image = (IMAGES as any)[this.category][baseWord];
    this.setLetterOptions();

    if (!this.word || !this.image || this.word == this.lastWord) {
      this.setWordAndImage();
    }
  }

  setLetterOptions() {
    if (!this.word) {
      return;
    }

    let letterIndex = 0;
    if (this.difficulty > 4) {
      letterIndex = this.word.length - 1;
    }
    //hide a letter from the word;
    this.hiddenLetterIndex = letterIndex;
    this.hiddenLetter = this.word[this.hiddenLetterIndex];

    this.letterOptions = ArrayUtil.shuffleArray(WordUtil.ALPHABET.split(''))
      .filter(option => option != this.hiddenLetter.toLowerCase())
      .slice(0, this.getNumberOfOptions() - 1); // remove one option as we manually add the missing letter to the list in on the next line

    this.letterOptions = ArrayUtil.shuffleArray([...this.letterOptions, this.hiddenLetter]);
  }

  getNumberOfOptions() {
    return 7;
    switch (this.difficulty) {
      case 1:
      case 2:
      case 3:
        return 3;
      case 4:
      case 5:
        return 5;
      default:
        return 7;
    }
  }

  checkLetter(option: string) {
    if (this.hiddenLetter == option) {
      this.completeLevel()
    } else {
      this.wrongLetter = option;
    }
  }

  completeLevel() {

    this.lastWord = this.word;
    this.complete = true;
    this.wrongLetter = "";

    setTimeout(() => {
      this.complete = false;
      this.setWordAndImage();
      this.completedLevel.emit(true);
    }, 2000);
  }
}
