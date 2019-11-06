import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-monster-card',
  templateUrl: './monster-card.component.html',
  styleUrls: ['./monster-card.component.css'],
})
export class MonsterCardComponent implements OnInit, OnDestroy {
  @Input() monster: any;
  x: number;
  y: number;
  interval: number;

  constructor() {}

  ngOnInit(): void {
    this.x = this.monster.sprites.moving.xMin;
    this.y = this.monster.sprites.moving.y;
    this.interval = window.setInterval(() => {
      if (this.x < this.monster.sprites.moving.xMax) {
        this.x += 1;
      } else {
        this.x = this.monster.sprites.moving.xMin;
      }
    }, 200);
  }

  getBackground(): string {
    return `url(assets/img/monsters/enemies.png) ${-this.x * this.monster.sprites.width}px ${-this
      .y * this.monster.sprites.height}px`;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
