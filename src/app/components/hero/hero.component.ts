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

  ngOnInit() {
    this.hero = new Hero(this.inputHero);
    this.interval = window.setInterval(() => {
      this.hero.move();
    }, 20);
  }

  getBackgroundImg(): string {
    console.log(this.dbService.images[this.hero.name][this.hero.status][this.hero.sprite]);
    return `url(${this.dbService.images[this.hero.name][this.hero.status][this.hero.sprite]})`;
    // return `url(assets/img/heroes/${this.hero.name}/${this.hero.status}/${this.hero.status}_0${
    //   this.hero.sprite < 10 ? '0' + this.hero.sprite : this.hero.sprite
    // }.png)`;
  }

  // TO DO
  changeStatus() {
    this.hero.changeStatus('Idle');
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
