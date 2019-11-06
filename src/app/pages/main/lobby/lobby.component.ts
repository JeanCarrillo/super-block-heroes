import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../db.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  user = {}
  heroes: any[];

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.dbService.getHeroes().subscribe(heroes => (this.heroes = heroes));
    this.dbService.getUser().subscribe(user => (this.user = user));
  }
}
