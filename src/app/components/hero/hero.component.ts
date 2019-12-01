import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Hero } from '../../shared/models/hero';
import { DbService } from 'src/app/shared/services/db.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit, OnDestroy {
  @Input() inputHero: Hero;
  @Input() selected: boolean;
  hero: Hero;
  interval: number;

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.createHero();
  }

  createHero(): void {
    this.hero = new Hero(this.inputHero);
    this.loop();
  }

  loop(): void {
    this.interval = window.setInterval(() => {
      if (this.inputHero.name !== this.hero.name) {
        clearInterval(this.interval);
        this.createHero();
      }
      this.hero.move();
    }, 20);
  }

  getImg(): string {
    return `/assets/img/heroes/${this.hero.name}/${this.hero.status}/${this.hero.status}_0${
      this.hero.sprite < 10 ? '0' + this.hero.sprite : this.hero.sprite
    }.png`;
  }

  // TO DO
  changeStatus(): void {
    this.hero.changeStatus('Idle');
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
