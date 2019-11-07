import { Component, OnInit } from '@angular/core';
import { DbService } from './db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private dbService: DbService) {}
  ngOnInit() {
    this.dbService.getMonsters();
    this.dbService.getHeroes();
    // this.dbService.postUser({
    //   email: 'player5@email.com',
    //   nickname: 'player5',
    //   password: 'password',
    //   hero: 3,
    // });
  }
}
