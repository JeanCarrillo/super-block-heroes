import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DbService } from './db.service';
import server from '../constants/server';

import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = this.getToken();
  user: any = null;

  private API_SERVER = `http://${server.ip}:${server.port}`;

  constructor(private http: HttpClient, private router: Router, private dbService: DbService) {}

  getUser(nickname: string) {
    return this.http.get(this.API_SERVER + '/users/nickname/' + nickname);
  }

  inviteUser(userId: number, userSendingInvitNickname: string) {
    const data = { nickname: userSendingInvitNickname };
    console.log('data: ', data);
    console.log('id ', userId);
    console.log(this.API_SERVER + '/users/invite/' + userId);
    this.http.put(this.API_SERVER + '/users/invite/' + userId, data).subscribe(
      res => console.log('res', res),
      err => console.log('err', err)
    );
  }

  addFriend(nickname: string, userSendingInvitNickname: string) {
    const data = { nickname: userSendingInvitNickname };
    console.log('data: ', data);
    console.log('id ', nickname);
    console.log(this.API_SERVER + '/users/addFriend/' + nickname);
    this.http.put(this.API_SERVER + '/users/addFriend/' + nickname, data).subscribe(() => {
      console.log('test');
    });
    const decoded = jwt_decode(this.getToken());
    setTimeout(() => {
      this.http
        .get(this.API_SERVER + '/users/nickname/' + decoded.nickname)
        .subscribe(res => this.setUser(res));
    }, 200);
  }

  getMyUser() {
    const decoded = jwt_decode(this.getToken());
    this.http
      .get(this.API_SERVER + '/users/nickname/' + decoded.nickname)
      .subscribe(res => this.setUser(res));
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
    return new Promise((resolve, reject) => {
      this.http
        .post(this.API_SERVER + '/auth/login', {
          password: this.user.password,
          email: this.user.email,
          nickname: this.user.nickname,
        })
        .subscribe(async (res: any) => {
          let access = false;
          if (!res.access_token) {
            console.log('access denied');
            access = false
            reject(access);
          }
          localStorage.setItem('token', res.access_token);
          // this.token = res.access_token;
          console.log({ res });
          const decoded = jwt_decode(res.access_token);
          console.log({ decoded });
          this.http.get(this.API_SERVER + '/users/nickname/' + decoded.nickname).subscribe(res => {
            console.log({ res });
            this.setUser(res);
            access = true
            resolve(access);
          });
        });


    })
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
    user.inventory = JSON.parse(user.inventory);
    this.user = user;
    console.log({ user });
  }

  postGame(game: any): void {
    const gameDuration = Date.now() - game.startTime;
    const victory = game.victory ? true : false;
    // TODO: SEND GAME DATA
    // const monsterId = game.monster.id;
    // const data = {
    //   gameDuration,
    //   victory,
    //   monsterId,
    // };
    // this.http.post(this.API_SERVER + '/games', data);
    const goldGained = victory
      ? Math.floor((game.monster.startingLife / 10) * (gameDuration / 1000))
      : 10;
    console.log({ goldGained });
    this.updateUser({
      highscore: this.user.highscore < goldGained ? goldGained : this.user.highscore,
      gold: this.user.gold + goldGained,
      games_played: this.user.games_played + 1,
    });
  }
}
