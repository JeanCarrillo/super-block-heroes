import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {
  @Input() x: number;
  @Input() index: number;
  @Input() background: string;
  constructor() {}

  ngOnInit() {}

  getBackgroundPos() {
    return this.x / ((this.index + 1) / 2) + '%';
  }

  getBackgroundImg() {
    return `url(../../../assets/img/backgrounds/${this.background}/${this
      .index + 1}.png)`;
  }
}
