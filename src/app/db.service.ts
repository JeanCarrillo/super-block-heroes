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

  updateUser(id: number, data: any) {
    this.http.put(this.API_SERVER + '/users/' + id, data).subscribe(user => {
      this.user = user;
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

  getUser(nickname: string): Observable<any> {
    return of(this.http.get(this.API_SERVER + '/users/nickname/' + nickname));
  }

  postGame(game: any): void {
    const gameDuration = Date.now() - game.startTime;
    const victory = game.victory ? true : false;
    const monsterId = game.monster.id;
    const data = {
      gameDuration,
      victory,
      monsterId,
      // TO DO
    };
    const goldGained = victory
      ? Math.floor((game.monster.startingLife / 10) * (gameDuration / 1000))
      : 10;
    console.log(goldGained);
    // this.http.post(this.API_SERVER + '/games', data);
    this.updateUser(this.user.id, {
      gold: this.user.gold + goldGained,
    });
  }
}
