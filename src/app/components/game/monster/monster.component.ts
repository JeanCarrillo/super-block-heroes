import { Component, OnInit, Input } from '@angular/core';
import { Monster } from '../../../shared/models/monster';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css'],
})
export class MonsterComponent implements OnInit {
  @Input() monster: Monster;

  constructor() {}

  ngOnInit() {}

  getPosition() {
    return `${this.monster.x - 5}%`;
  }

  getMonsterImg(): string {
    // tslint:disable-next-line: max-line-length
    return `url(assets/img/monsters/${this.monster.name.replace(' ', '_')}/${
      this.monster.status
    }/skeleton-${this.monster.status}_${this.monster.sprite}.png)`;
  }

  getBackgroundImg() {
    return `url(assets/img/backgrounds/${this.monster.background}/background.png)`;
  }

  getDirection() {
    return `scale(${this.monster.movingDirection === 1 ? '-1' : '1'}, 1)`;
  }

  getLifePercentage() {
    const percentage = (this.monster.currentLife * 100) / this.monster.startingLife;
    return `${percentage < 0 ? 0 : percentage}%`;
  }
}
