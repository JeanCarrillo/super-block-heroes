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

  ngOnInit(): void {
    const { name, sprites } = this.monster;
    this.monsterImg = `url(/assets/img/monsters/${name.replace(' ', '')}.png)`;
    this.paddingBottom = sprites.paddingBottom + '%';
    this.marginTop = 100 - sprites.paddingBottom + '%';
  }

  getPosition(): string {
    return `${this.monster.x - 5}%`;
  }

  getMonsterBackgroundPosition(): string {
    const { sprite, sprites } = this.monster;
    return `0 ${sprite === 0 ? 0 : (100 / sprites.total) * sprite}%`;
  }

  getContainerFilterFrozen(): string {
    if (this.monster.isFrozen) {
      return 'invert(73%) sepia(28%) saturate(869%) hue-rotate(185deg) brightness(101%) contrast(102%)';
    }
    return 'none';
  }

  getFilterFrozen(): string {
    if (this.monster.isFrozen) {
      return 'invert(0%) sepia(94%) saturate(0%) hue-rotate(245deg) brightness(95%) contrast(105%)';
    }
    return 'none';
  }

  getBackgroundImg(): string {
    return `url(assets/img/backgrounds/${this.monster.background}/background.png)`;
  }

  getDirection(): string {
    return `scale(${this.monster.movingDirection === 1 ? '-1' : '1'}, 1)`;
  }

  getLifePercentage(): string {
    const percentage = Math.ceil((this.monster.currentLife * 100) / this.monster.startingLife);
    return `${percentage < 0 ? 0 : percentage}%`;
  }
}
