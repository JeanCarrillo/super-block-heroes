import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {
  @Input() monsterX: number;
  @Input() index: number;
  @Input() type: number;
  constructor() {}

  ngOnInit() {}

  getBackgroundPos() {
    return this.monsterX / ((this.index + 1) / 2) + '%';
  }

  getBackgroundImg() {
    return `url(../../../assets/img/backgrounds/${this.type}/${this.index +
      1}.png)`;
  }
}
