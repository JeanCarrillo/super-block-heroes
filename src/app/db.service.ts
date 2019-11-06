import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { monsters } from './data/monsters';
import { heroes } from './data/heroes';
import { user } from './data/user';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  user: any;
  monsters: any[];
  heroes: any[];

  constructor() {
    this.monsters = monsters;
    for (const monster of this.monsters) {
      monster.sprites = JSON.parse(monster.sprites);
    }
    this.heroes = heroes;
    this.user = user;
  }

  getHeroes(): Observable<any[]> {
    return of(this.heroes);
  }

  getMonsters(): Observable<any[]> {
    return of(this.monsters);
  }
  getUser(): Observable<any> {
    return of(this.user);
  }
}
