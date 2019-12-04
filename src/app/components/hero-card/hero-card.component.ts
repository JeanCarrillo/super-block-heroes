import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Hero } from '../../shared/models/hero';
import { rdmFloor } from 'src/app/shared/helpers/functions';
import { heroSprites } from '../../shared/constants/sprites';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css'],
})
export class HeroCardComponent implements OnInit, OnDestroy {
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
    this.sprite = heroSprites[this.status].start;
    this.interval = window.setInterval(() => {
      if (this.sprite < heroSprites[this.status].end) {
        this.sprite += 1;
      } else {
        if (this.status !== 'Idle') {
          this.status = 'Idle';
        }
        this.sprite = heroSprites[this.status].start;
      }
    }, 50);
  }

  getBackgroundPosition(): string {
    return `0 ${this.sprite === 0 ? 0 : (100 / heroSprites.total) * this.sprite}%`;
  }

  changeStatus(): void {
    const status = ['Attack', 'Death', 'GetHit', 'Walk'];
    const rdmStatus = rdmFloor(status.length);
    this.status = status[rdmStatus];
    this.sprite = heroSprites[this.status].start;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
