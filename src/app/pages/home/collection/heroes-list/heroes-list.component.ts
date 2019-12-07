import { Component } from '@angular/core';
import { DbService } from '../../../../shared/services/db.service';
import { Hero } from 'src/app/shared/models/hero';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent {
  selectedHero: Hero = this.dbService.user.hero;
  availableHeroes: Hero[];

  constructor(private dbService: DbService) {}

  getFilter(heroId: number): string {
    return this.isOwned(heroId) ? '' : 'grayscale(1)';
  }

  setSelectedHero(hero: Hero): void {
    console.log({ hero });
    this.selectedHero = hero;
    if (this.isOwned(hero.id)) {
      this.setUserHero(hero);
    }
  }

  setUserHero(hero: Hero): void {
    this.dbService.updateUser({
      hero,
    });
  }

  canBuy(price: number): boolean {
    return this.dbService.user.gold > price;
  }

  buyHero(hero: Hero): void {
    const user = this.dbService.user;
    user.gold = user.gold - hero.price;
    user.inventory.heroes.push(hero.id);
    console.log({ user });
    this.dbService.updateUser({
      gold: user.gold,
      inventory: JSON.stringify(user.inventory),
    });
  }

  isOwned(heroId: number): boolean {
    let owned;
    for (const i of this.dbService.user.inventory.heroes) {
      if (i === heroId) {
        owned = true;
      }
    }
    return owned;
  }
}
