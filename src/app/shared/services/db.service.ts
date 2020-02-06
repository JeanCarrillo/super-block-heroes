import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import server from '../constants/server';
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

  private API_SERVER = `http://${server.ip}:${server.port}`;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.API_SERVER + '/heroes')
      .pipe(
        tap(async heroes => {
          console.log({ heroes });
          this.heroes = heroes;
          await this.getCapacities()
          .subscribe(res => {
            console.log('capacities getHeroes()', res);
            // this.authService.setUser(); //@TODO: Set user.hero.capacities
          });
        }));
  }

 getCapacities(): Observable<any> {
    return this.http.get(this.API_SERVER + '/capacities')
    .pipe(
      tap( capacities => {
        console.log({ capacities });
          this.capacities = capacities;
          for (let i = 0; i < this.heroes.length; i++) {
            this.heroes[i].capacity = this.capacities[i];
          }
      }));
      // .subscribe(capacities => {
      //   console.log({ capacities });
      //   this.capacities = capacities;
      //   for (let i = 0; i < this.heroes.length; i++) {
      //     this.heroes[i].capacity = this.capacities[i];
      //   }
      //   return true;
      // });
  }

  getMonsters(): Observable<Monster[]> {
    return this.http.get<Monster[]>(this.API_SERVER + '/monsters')
      .pipe(
        tap(monsters => {
          console.log('monsters :', this.monsters);
          this.monsters = monsters;
          for (const monster of this.monsters) {
            monster.sprites = JSON.parse(monster.sprites);
          }
        }));
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
