import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { rdmFloor } from '../../shared/helpers/functions';

@Component({
  selector: 'app-monster-card',
  templateUrl: './monster-card.component.html',
  styleUrls: ['./monster-card.component.css'],
})
export class MonsterCardComponent implements OnInit, OnDestroy {
  @Input() selected: boolean;
  @Input() monster: any;
  sprite: number;
  interval: number;
  status = 'Idle';
  img: string;
  paddingBottom: string;
  marginTop: string;

  constructor() {}

  ngOnInit(): void {
    this.img = `url(/assets/img/monsters/${this.monster.name.replace(' ', '')}.png)`;
    this.paddingBottom = this.monster.sprites.paddingBottom + '%';
    this.marginTop = 100 - this.monster.sprites.paddingBottom + '%';
    this.sprite = this.monster.sprites[this.status].start;
    this.interval = window.setInterval(() => {
      if (this.sprite < this.monster.sprites[this.status].end) {
        this.sprite += 1;
      } else {
        if (this.status !== 'Idle') {
          this.status = 'Idle';
        }
        this.sprite = this.monster.sprites[this.status].start;
      }
    }, 50);
  }

  getBackgroundPosition(): string {
    return `0 ${this.sprite === 0 ? 0 : (100 / this.monster.sprites.total) * this.sprite}%`;
  }

  changeStatus(): void {
    const status = ['Attack', 'Death', 'GetHit'];
    const rdmStatus = rdmFloor(status.length);
    this.status = status[rdmStatus];
    this.sprite = this.monster.sprites[this.status].start;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
