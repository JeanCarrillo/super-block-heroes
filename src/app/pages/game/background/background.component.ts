import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {
  @Input() background: string;
  @Input() index: number;
  @Input() x: number;
  constructor() {}

  ngOnInit() {}

  getBackgroundPos() {
    const indexMax = 4;
    const vmin = 0.1;
    return this.x * ((this.index * (1 - vmin)) / indexMax + vmin) + '%';

    // return this.x / ((5 - this.index + 1) / 2) + '%';
  }

  getBackgroundImg() {
    return `url(assets/img/backgrounds/${this.background}/${this.index +
      1}.png)`;
  }
}
