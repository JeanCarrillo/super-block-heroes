import { Component, OnInit, Input } from '@angular/core';
import { Monster } from '../../../shared/models/monster';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css'],
})
export class MonsterComponent implements OnInit {
  @Input() monster: Monster;
  monsterImg: string;
  paddingBottom: string;
  marginTop: string;

  constructor() {}

  ngOnInit() {
    const { name, sprites } = this.monster;
    this.monsterImg = `url(/assets/img/monsters/${name.replace(' ', '')}.png)`;
    this.paddingBottom = sprites.paddingBottom + '%';
    this.marginTop = 100 - sprites.paddingBottom + '%';
  }

  getPosition() {
    return `${this.monster.x - 5}%`;
  }

  getMonsterBackgroundPosition(): string {
    const { sprite, sprites } = this.monster;
    return `0 ${sprite === 0 ? 0 : (100 / sprites.total) * sprite}%`;
  }

  getBackgroundFilter(): string {
    if (this.monster.isFrozen) {
      return 'grayscale(100%) invert(86%) sepia(4%) saturate(2310%) hue-rotate(187deg) brightness(108%) contrast(104%)';
    }
    return 'none';
  }

  getBackgroundImg() {
    return `url(assets/img/backgrounds/${this.monster.background}/background.png)`;
  }

  getDirection() {
    return `scale(${this.monster.movingDirection === 1 ? '-1' : '1'}, 1)`;
  }

  getLifePercentage() {
    const percentage = Math.ceil((this.monster.currentLife * 100) / this.monster.startingLife);
    return `${percentage < 0 ? 0 : percentage}%`;
  }
}
