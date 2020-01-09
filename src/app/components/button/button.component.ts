import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() disabled: boolean;
  @Input() buttonType: string;
  @Input() size = 1;
  @Input() url: string;
  @Input() selected: boolean;
  @Input() text: string;
  @Input() callback: any = () => {};

  constructor() {}

  private useCallback(): void {
    if (!this.disabled) {
      this.callback();
    }
  }

  private textSize(): number {
    return this.selected ? this.size * 1.3 : this.size;
  }

  /*
   * this method choose a button depends on its type
   */
  private whichButton(): string {
    switch (this.buttonType) {
      case 'play': {
        return 'url(../../../assets/img/buttons/playButton.png)';
      }
      case 'login': {
        return 'url(../../../assets/img/buttons/loginButton.png)';
      }
      default: {
        return 'url(../../../assets/img/buttons/menuButton.png)';
      }
    }
  }
}
