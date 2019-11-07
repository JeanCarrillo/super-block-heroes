import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  selectedButton = 2;
  buttons = [
    {
      text: 'Store',
      link: 'store',
    },
    {
      text: 'Social',
      link: 'social',
    },
    {
      text: 'Lobby',
      link: 'home',
    },
    {
      text: 'Ranking',
      link: 'ranking',
    },
    {
      text: 'Collection',
      link: 'collection',
    },
  ];

  constructor() {}

  ngOnInit() {}

  setSelectedButton = (index: number): void => {
    this.selectedButton = index;
  };
}
