import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Hero } from '../../shared/models/hero';
import { rdmFloor } from 'src/app/shared/helpers/functions';

const sprites = {
  Idle: { start: 0, end: 17 }, // 18
  Walk: { start: 18, end: 41 }, // 24
  Attack: { start: 42, end: 53 }, // 12
  Throw: { start: 54, end: 65 }, // 12
  GetHit: { start: 66, end: 77 }, // 12
  Death: { start: 78, end: 92 }, // 15
  total: 92,
};

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit, OnDestroy {
  @Input() inputHero: Hero;
  @Input() selected: boolean;
  hero: Hero;
  sprite: number;
  interval: number;
  status = 'Idle';
  img: string;

  constructor() {}

  ngOnInit(): void {
    this.img = `url(/assets/img/heroes/${this.inputHero.name.replace(' ', '')}.png)`;
    if (this.inputHero.name === 'Satyr') {
      this.img = `url(/assets/img/heroes/Paladin.png)`;
    }
    this.sprite = sprites[this.status].start;
    this.interval = window.setInterval(() => {
      if (this.sprite < sprites[this.status].end) {
        this.sprite += 1;
      } else {
        if (this.status !== 'Idle') {
          this.status = 'Idle';
        }
        this.sprite = sprites[this.status].start;
      }
    }, 50);
  }

  getBackgroundPosition(): string {
    return `0 ${this.sprite === 0 ? 0 : (100 / sprites.total) * this.sprite}%`;
  }

  changeStatus(): void {
    const status = ['Attack', 'Death', 'GetHit', 'Walk'];
    const rdmStatus = rdmFloor(status.length);
    this.status = status[rdmStatus];
    this.sprite = sprites[this.status].start;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
