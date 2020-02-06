import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DbService } from './db.service';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = this.getToken();
  user: any = null;

  private API_SERVER = `${environment.APIEndpoint}:${environment.APIPort}`;

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

  getMyUser(): Observable<any> {
    const decoded = jwt_decode(this.getToken());
    return this.http.get(this.API_SERVER + '/users/nickname/' + decoded.nickname).pipe(
      tap(res => {
        this.setUser(res);
        console.log('setUser() , ', res);
      })
    );
  }

  async register(user: any) {
    this.user = user;
    await this.http
      .post(this.API_SERVER + '/auth/token', {
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

  checkCredentials(token: string) {
    console.log('onInit Token', token);
    this.http
      .post(this.API_SERVER + '/auth/token', {
        token,
      })
      .subscribe(res => {
        console.log('checkCredentials');
      });
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
          if (!res.access_token) {
            console.log('access denied');
            reject(false);
          }
          localStorage.setItem('token', res.access_token);
          // this.token = res.access_token;
          console.log({ res });
          const decoded = jwt_decode(res.access_token);
          console.log({ decoded });
          this.http.get(this.API_SERVER + '/users/nickname/' + decoded.nickname).subscribe(res => {
            console.log({ res });
            this.setUser(res);
            resolve(true);
          });
        });
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
    user.inventory = JSON.parse(user.inventory);
    this.user = user;
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

  logout() {
    console.log('logOut');
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }
}
