import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { monsters } from '../monstersData';

@Component({
  selector: 'app-monster-card',
  templateUrl: './monster-card.component.html',
  styleUrls: ['./monster-card.component.css'],
})
export class MonsterCardComponent implements OnInit, OnDestroy {
  @Input() monsterIndex: number;
  monsters = monsters;
  x: number;
  y: number;
  interval: number;

  constructor() {}

  ngOnInit(): void {
    this.x = this.monsters[this.monsterIndex].sprites.moving.xMin;
    this.y = this.monsters[this.monsterIndex].sprites.moving.y;
    this.interval = window.setInterval(() => {
      if (this.x < this.monsters[this.monsterIndex].sprites.moving.xMax) {
        this.x += 1;
      } else {
        this.x = this.monsters[this.monsterIndex].sprites.moving.xMin;
      }
    }, 200);
  }

  getBackground(): string {
    return `url(assets/img/monsters/enemies.png) ${-this.x * 40}px ${-this.y * 40}px`;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
