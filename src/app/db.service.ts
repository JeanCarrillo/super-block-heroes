import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  user: any = null;
  monsters: any = null;
  heroes: any = null;
  // monstersUpdated: EventEmitter<any> = new EventEmitter();

  private API_SERVER = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  async getHeroes() {
    await this.http.get(this.API_SERVER + '/heroes').subscribe(heroes => (this.heroes = heroes));
  }

  postUser(user: any): Observable<any> {
    return this.http.post(this.API_SERVER + '/users', {
      nickname: user,
      hero: 3,
    });
  }

  setUser(user: any) {
    this.user = user;
  }

  async getMonsters() {
    await this.http.get(this.API_SERVER + '/monsters').subscribe(monsters => {
      this.monsters = monsters;
      for (const monster of this.monsters) {
        monster.sprites = JSON.parse(monster.sprites);
      }
      // this.monstersUpdated.emit();
    });
    // return this.monsters;
  }

  getUser(nickname): Observable<any> {
    return of(this.http.get(this.API_SERVER + '/users/nickname/' + nickname));
  }

  postGame(game): void {
    console.log(game);
  }
}
