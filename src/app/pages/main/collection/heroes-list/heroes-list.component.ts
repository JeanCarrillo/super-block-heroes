import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent implements OnInit {
  heroes = [
    {
      name: 'Luigi',
      img: 'assets/img/heroes/Luigi.png',
    },
    {
      name: 'PacMan',
      img: 'assets/img/heroes/PacMan.png',
    },
    {
      name: 'Peach',
      img: 'assets/img/heroes/Peach.png',
    },
    {
      name: 'Pikachu',
      img: 'assets/img/heroes/Pikachu.png',
    },
    {
      name: 'Plant',
      img: 'assets/img/heroes/Plant.png',
    },
    {
      name: 'Sonic',
      img: 'assets/img/heroes/Sonic.png',
    },
    {
      name: 'Squirtle',
      img: 'assets/img/heroes/Squirtle.png',
    },
  ];
  selectedHero = 0;

  constructor() { }

  ngOnInit() { }

  setSelectedHero(index: number): void {
    this.selectedHero = index;
  }
}
