import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() notifs: number;
  @Input() disabled: boolean;
  @Input() size: number = 1;
  @Input() url: string;
  @Input() selected: boolean;
  @Input() text: string;
  @Input() backgrnd: string;
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

  public backgroundColor(): string {
    if (this.backgrnd === 'red') {
      return 'linear-gradient(#f79da6, #d7091d)';
    }
    return 'linear-gradient(#13f446, #118a2d)';
  }
}
