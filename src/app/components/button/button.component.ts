import { Component, OnInit, Input } from '@angular/core';
import { type } from 'os';
import { logging } from 'protractor';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() buttonType: string;
  @Input() size = 1;
  @Input() url: string;
  @Input() selected: boolean;
  @Input() text: string;
  @Input() callback: any = () => {};

  constructor() {}

  ngOnInit() {}

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
