import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input() title: string = '';
  @Input() isLoading: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() customClass: string = '';
}
