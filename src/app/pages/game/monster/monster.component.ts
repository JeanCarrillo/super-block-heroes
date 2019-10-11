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
    return `${this.monster.x - 5}%`;
  }

  getBackgroundImg() {
    return `url(assets/img/backgrounds/${this.monster.background}/background.png)`;
  }

  getDirection() {
    return `scaleX(${this.monster.movingDirection === 1 ? '1' : '-1'})`;
  }

  getLifePercentage() {
    const percentage =
      (this.monster.currentLife * 100) / this.monster.startingLife;
    return `${percentage < 0 ? 0 : percentage}%`;
  }
}
