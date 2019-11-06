import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../../db.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent implements OnInit {
  heroes: any[] = [];
  selectedHero = 0;

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.dbService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }

  setSelectedHero(index: number): void {
    this.selectedHero = index;
  }
}
