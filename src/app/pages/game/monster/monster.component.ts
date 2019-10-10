import { Component, OnInit, Input } from '@angular/core';
import { Monster } from '../monster';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css']
})
export class MonsterComponent implements OnInit {
  @Input() monster: Monster;

  constructor() {}

  ngOnInit() {}

  getPosition() {
    return `${this.monster.x}%`;
  }

  getBackgroundImg() {
    return `url(/assets/img/backgrounds/${this.monster.background}/background.png)`;
  }
}
