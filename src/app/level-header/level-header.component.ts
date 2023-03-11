import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-level-header',
  templateUrl: './level-header.component.html',
  styleUrls: ['./level-header.component.scss']
})
export class LevelHeaderComponent {

  @Input()
  heading: string = "";

  @Output()
  quitLevel: EventEmitter<any> = new EventEmitter()

}
