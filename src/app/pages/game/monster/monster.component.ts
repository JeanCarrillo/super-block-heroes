import { Component, OnInit, Input } from '@angular/core';
import { Monster } from '../monster';

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
    return `url(assets/img/monsters/enemies.png) ${-this.monster.spriteX *
      this.monster.sprites.width}px ${-this.monster.spriteY * this.monster.sprites.height}px`;
  }

  getBackgroundImg() {
    return `url(assets/img/backgrounds/${this.monster.background}/background.png)`;
  }

  getDirection() {
    return `scale(${this.monster.movingDirection === 1 ? '-3' : '3'}, 3)`;
  }

  getLifePercentage() {
    const percentage = (this.monster.currentLife * 100) / this.monster.startingLife;
    return `${percentage < 0 ? 0 : percentage}%`;
  }
}
