import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input()
  @HostBinding('class.success')
  success: boolean = false;

  @Input()
  @HostBinding('class.alert')
  alert: boolean = false;

}
