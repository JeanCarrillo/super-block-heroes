import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DbService } from './db.service';

import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = this.getToken();
  user: any = null;

  private API_SERVER = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router, private dbService: DbService) {}

  getUser(nickname: string): Observable<any> {
    return of(this.http.get(this.API_SERVER + '/users/nickname/' + nickname));
  }

  async register(user: any) {
    this.user = user;
    await this.http
      .post(this.API_SERVER + '/auth/register', {
        nickname: this.user.nickname,
        password: this.user.password,
        email: this.user.email,
        hero: 1,
      })
      .subscribe(
        async (res: any) => {
          if (res.email && res.nickname) {
            this.login(this.user);
            return;
          }
        },
        err => window.alert('Account already exists')
      );
  }

  login(user: any) {
    this.user = user;
    this.http
      .post(this.API_SERVER + '/auth/login', {
        password: this.user.password,
        email: this.user.email,
        nickname: this.user.nickname,
      })
      .subscribe(async (res: any) => {
        if (!res.access_token) {
          return;
        }
        localStorage.setItem('token', res.access_token);
        // this.token = res.access_token;
        console.log({ res });
        const decoded = jwt_decode(res.access_token);
        console.log({ decoded });
        this.http.get(this.API_SERVER + '/users/nickname/' + decoded.nickname).subscribe(res => {
          console.log({ res });
          this.setUser(res);
          this.router.navigate(['/home']);
        });
        // await this.setUser(res);
      });
  }

  updateUser(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
      }),
    };
    this.http.put(this.API_SERVER + '/users/' + this.user.id, data, httpOptions).subscribe(user => {
      if (user) {
        this.setUser(user);
      }
    });
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setUser(user: any) {
    // TEMP UNTIL BACKEND MANY TO MANY RESOLVED
    const heroId = user.hero.id;
    let capacity;
    for (const cap of this.dbService.capacities) {
      if (cap.id === heroId) {
        capacity = cap;
        break;
      }
    }
    user.hero.capacity = capacity;
    // END TEMP
    user.hero.sprites = JSON.parse(user.hero.sprites);
    user.inventory = JSON.parse(user.inventory);
    this.user = user;
    console.log({ user });
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
    console.log({ goldGained });
    // this.http.post(this.API_SERVER + '/games', data);
    this.updateUser({
      gold: this.user.gold + goldGained,
    });
  }
}
