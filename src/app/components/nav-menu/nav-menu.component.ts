import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {
  selectedButton = 0;
  buttons = [
    {
      text: 'Lobby',
      link: 'home',
    },
    {
      text: 'Social',
      link: 'social',
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
