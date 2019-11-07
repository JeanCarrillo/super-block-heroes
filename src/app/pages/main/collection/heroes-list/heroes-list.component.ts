import { Component } from '@angular/core';
import { DbService } from '../../../../db.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent {
  selectedHero: any = this.dbService.user.hero;

  constructor(private dbService: DbService) {}

  setSelectedHero(hero: any): void {
    this.dbService.updateUser(this.dbService.user.id, {
      hero,
    });
  }
}
