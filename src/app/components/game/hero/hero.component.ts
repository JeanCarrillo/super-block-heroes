import { Component, OnInit, Input } from '@angular/core';
import { heroSprites } from '../../../shared/constants/sprites';
import { Monster } from 'src/app/shared/models/monster';
import { Hero } from 'src/app/shared/models/hero';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  // @ViewChild('hero', { static: false }) heroRef: ElementRef;
  @Input() hero: Hero;
  @Input() monster: Monster;
  img: string;
  // initialX: number;
  // initialY: number;

  constructor() {}

  ngOnInit(): void {
    this.img = `url(/assets/img/heroes/${this.hero.name.replace(' ', '')}.png)`;
  }

  getBackgroundPosition(): string {
    return `0 ${this.hero.sprite === 0 ? 0 : (100 / heroSprites.total) * this.hero.sprite}%`;
  }

  getHeroPosition(): any {
    if (this.hero.status === 'Attack') {
      return {
        top: `calc(${window.innerHeight}px - 8vw - 4vh)`,
        left: `${this.monster.x - 8}vw`,
      };
    }
    return {
      top: '',
      left: '',
    };
  }
}
