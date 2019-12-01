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

  constructor(private dbService: DbService) {}

  setSelectedHero(hero: Hero): void {
    this.selectedHero = hero;
    this.dbService.updateUser({
      hero,
    });
  }
}
