import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent implements OnInit {
  heroes = [
    {
      name: 'Yoshi',
      img: 'assets/img/heroes/yoshi.png',
    },
    {
      name: 'Mario',
      img: 'assets/img/heroes/mario.png',
    },
    {
      name: 'Samus',
      img: 'assets/img/heroes/samus.png',
    },
    {
      name: 'Kirby',
      img: 'assets/img/heroes/kirby.png',
    },
    {
      name: 'Link',
      img: 'assets/img/heroes/link.png',
    },
  ];
  selectedHero = 0;

  constructor() {}

  ngOnInit() {}

  setSelectedHero(index: number): void {
    this.selectedHero = index;
  }
}
