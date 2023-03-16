import {Component} from '@angular/core';
import {LEVELS, levelType} from "./levels.data";

@Component({
  selector: 'app-level-select',
  templateUrl: './level-select.component.html',
  styleUrls: ['./level-select.component.scss']
})
export class LevelSelectComponent {

  levels = LEVELS;

  selectedLevel: typeof LEVELS[0] | null = null;
  selectedLevelIndex: number | null = null;

  get currentLevel() {
    return 1000 || parseInt(window.sessionStorage.getItem('currentLevel') || "0");
  }

  onCompleteLevel(level: number | null) {
    const levelIndex = (level || 0);
    if (levelIndex == this.currentLevel) {
      return window.sessionStorage.setItem('currentLevel', `${levelIndex + 1}`);
    }

    this.selectedLevel = this.levels[levelIndex + 1];
    this.selectedLevelIndex = levelIndex + 1;
  }

  selectLevel(level: typeof LEVELS[0], index: number) {
    if (index <= this.currentLevel) {
      this.selectedLevel = level;
      this.selectedLevelIndex = index;
    }
  }
}
