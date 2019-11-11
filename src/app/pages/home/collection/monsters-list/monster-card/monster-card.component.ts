import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-monster-card',
  templateUrl: './monster-card.component.html',
  styleUrls: ['./monster-card.component.css'],
})
export class MonsterCardComponent implements OnInit, OnDestroy {
  @Input() selected: boolean;
  @Input() monster: any;
  x: number;
  y: number;
  interval: number;
  status = 'moving';

  constructor() {}

  ngOnInit(): void {
    this.x = this.monster.sprites[this.status].xMin;
    this.y = this.monster.sprites[this.status].y;
    this.interval = window.setInterval(() => {
      if (this.x < this.monster.sprites[this.status].xMax) {
        this.x += 1;
      } else {
        if (this.status === 'attacking') {
          this.status = 'moving';
          this.y = this.monster.sprites[this.status].y;
        }
        this.x = this.monster.sprites[this.status].xMin;
      }
    }, 200);
  }

  getBackground(): string {
    return `url(assets/img/monsters/enemies.png) ${-this.x * this.monster.sprites.width}px ${-this
      .y * this.monster.sprites.height}px`;
  }

  getScale() {
    return `scale(${this.selected ? '4' : '3'})`;
  }

  changeStatus() {
    this.status = 'attacking';
    this.x = this.monster.sprites[this.status].xMin;
    this.y = this.monster.sprites[this.status].y;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
