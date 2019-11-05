import { Component, OnInit } from '@angular/core';
import { monsters } from './monstersData';

@Component({
  selector: 'app-monsters-list',
  templateUrl: './monsters-list.component.html',
  styleUrls: ['./monsters-list.component.css'],
})
export class MonstersListComponent implements OnInit {
  monsters = monsters;
  selectedMonster = 0;

  constructor() {}

  ngOnInit() {}
}
