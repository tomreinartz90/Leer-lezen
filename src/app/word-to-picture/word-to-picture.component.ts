import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IMAGES} from "../images.data";
import {WordUtil} from "../word.util";
import {NumberUtil} from "../number.util";
import {ArrayUtil} from "../array.util";

@Component({
  selector: 'app-word-to-picture',
  templateUrl: './word-to-picture.component.html',
  styleUrls: ['./word-to-picture.component.scss']
})
export class WordToPictureComponent {
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
  wordOptions: Array<{ word: string, image: string }> = [];

  correctWords: number = 0;

  complete: boolean = false;
  wrongWord: string | null = null;


  ngOnInit() {
    this.setWordAndImage();
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
    const translatedWordsIncategory: any = WordUtil.getTranslatedWords(this.locale as any)[this.category];
    const uniqueWords = ArrayUtil.uniqueArray(words.filter(word => translatedWordsIncategory[word] != this.word))
      .map(word => ({word: translatedWordsIncategory[word], image: (IMAGES as any)[this.category][word]}));
    this.wordOptions = ArrayUtil.shuffleArray([...uniqueWords.slice(0, nrOfOptions - 1), {
      word: this.word,
      image: this.image
    }]);
  }


  checkWord(word: string) {
    if (this.word == word) {
      this.completeLevel()
    } else {
      this.wrongWord = word;
    }
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
      this.completedLevel.emit(true);
      this.setWordAndImage();
    }, 2000);
  }
}
