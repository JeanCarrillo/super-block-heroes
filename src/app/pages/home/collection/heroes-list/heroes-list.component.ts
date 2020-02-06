import { Component } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { DbService } from 'src/app/shared/services/db.service';
import { Hero } from 'src/app/shared/models/hero';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent {
  constructor(public dbService: DbService, public authService: AuthService) {}

  selectedHero: any = this.authService.user.hero;
  availableHeroes: Hero[];

  getFilter(heroId: number): string {
    return this.isOwned(heroId) ? '' : 'grayscale(1)';
  }

  msToSeconds(ms: number): number {
    return Math.floor(ms / 1000);
  }

  setSelectedHero(hero: Hero): void {
    this.selectedHero = hero;
    if (this.isOwned(hero.id)) {
      this.setUserHero(hero);
    }
  }

  setUserHero(hero: Hero): void {
    this.authService.updateUser({
      hero,
    });
  }

  canBuy(price: number): boolean {
    return this.authService.user.gold >= price;
  }

  buyHero(hero: Hero): void {
    const user = this.authService.user;
    user.gold = user.gold - hero.price;
    user.inventory.heroes.push(hero.id);
    this.authService.updateUser({
      gold: user.gold,
      inventory: JSON.stringify(user.inventory),
    });
  }

  isOwned(heroId: number): boolean {
    let owned;
    for (const i of this.authService.user.inventory.heroes) {
      if (i === heroId) {
        owned = true;
      }
    }
    return owned;
  }
}
