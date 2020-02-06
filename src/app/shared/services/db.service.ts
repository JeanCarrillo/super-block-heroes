import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero';
import { Monster } from '../models/monster';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  monsters: any = [];
  heroes: any = [];
  capacities: any = [];
  highscores: any = [];

  private API_SERVER = `${environment.APIEndpoint}:${environment.APIPort}`;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.API_SERVER + '/heroes').pipe(
      tap(async heroes => {
        console.log({ heroes });
        this.heroes = heroes;
      })
    );
  }

  getMonsters(): Observable<Monster[]> {
    return this.http.get<Monster[]>(this.API_SERVER + '/monsters').pipe(
      tap(monsters => {
        console.log('monsters :', this.monsters);
        this.monsters = monsters;
        for (const monster of this.monsters) {
          monster.sprites = JSON.parse(monster.sprites);
        }
      })
    );
    // .subscribe(monsters => {
    //   this.monsters = monsters;
    //   for (const monster of this.monsters) {
    //     monster.sprites = JSON.parse(monster.sprites);
    //   }
    //   console.log('monsters :', this.monsters);
    //   return true;
    // });
  }

  async getHighscores() {
    await this.http.get(this.API_SERVER + '/users/highscores').subscribe(highscores => {
      console.log({ highscores });
      this.highscores = highscores;
    });
  }
}
