import { Component, OnInit, Input } from '@angular/core';
import { heroSprites } from '../../../shared/constants/sprites';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  @Input() hero: any;
  img: string;

  constructor() {}

  ngOnInit(): void {
    this.img = `url(/assets/img/heroes/${this.hero.name.replace(' ', '')}.png)`;
    if (this.hero.name === 'Satyr') {
      this.img = `url(/assets/img/heroes/Paladin.png)`;
    }
  }

  getBackgroundPosition(): string {
    return `0 ${this.hero.sprite === 0 ? 0 : (100 / heroSprites.total) * this.hero.sprite}%`;
  }
}
