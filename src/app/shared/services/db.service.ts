import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  async getHeroes() {
    await this.http.get(this.API_SERVER + '/heroes').subscribe(heroes => {
      console.log({ heroes });
      this.heroes = heroes;
      this.getCapacities();
    });
  }

  async getCapacities() {
    await this.http.get(this.API_SERVER + '/capacities').subscribe(capacities => {
      console.log({ capacities });
      this.capacities = capacities;
      for (let i = 0; i < this.heroes.length; i++) {
        this.heroes[i].capacity = this.capacities[i];
      }
    });
  }

  async getMonsters() {
    await this.http.get(this.API_SERVER + '/monsters').subscribe(monsters => {
      this.monsters = monsters;
      for (const monster of this.monsters) {
        monster.sprites = JSON.parse(monster.sprites);
      }
      console.log('monsters :', this.monsters);
    });
  }

  async getHighscores() {
    await this.http.get(this.API_SERVER + '/users/highscores').subscribe(highscores => {
      console.log({ highscores });
      this.highscores = highscores;
    });
  }
}
