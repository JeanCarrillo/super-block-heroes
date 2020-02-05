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

  public useCallback(): void {
    if (!this.disabled) {
      this.callback();
    }
  }

  public textSize(): number {
    return this.selected ? this.size * 1.3 : this.size;
  }

  /*
   * this method choose a button depends on its type
   */
  public whichBackground(): string {
    switch (this.buttonType) {
      case 'logout': {
        return 'linear-gradient(#ff1a1a, #b30000)';
      }
      default: {
        return 'linear-gradient(#00cc00, #579e3d)';
      }
    }
  }
}
