import { Component } from '@angular/core';
import { DbService } from '../../../../db.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent {
  heroes: any[] = [];
  selectedHero = 0;

  constructor(private dbService: DbService) {}

  setSelectedHero(index: number): void {
    this.selectedHero = index;
  }
}
