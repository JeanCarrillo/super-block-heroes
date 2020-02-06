import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  myPlayerIndex: number;
  room = {
    players: [],
    messages: [],
    monster: {},
    started: false,
  };
  startTimer = '';
  interval: number;

  constructor(private socket: Socket, private authService: AuthService, private router: Router) {}

  sendEvent(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  getMessage(): Observable<any> {
    return this.socket.fromEvent('message');
  }

  getRoom() {
    this.socket.fromEvent('room').subscribe((room: any) => {
      this.myPlayerIndex = room.players.findIndex(
        player => player.nickname === this.authService.user.nickname
      );
      if (room.started && !this.room.started) {
        this.startGame();
      }
      this.room = room;
    });
  }

  startGame(): void {
    this.startTimer = environment.testMode ? '0' : '5';
    this.interval = window.setInterval(() => {
      const timeNumber = Number(this.startTimer);
      if (timeNumber > 0) {
        this.startTimer = timeNumber - 1 === 0 ? 'Go !' : (timeNumber - 1).toString();
      } else {
        clearInterval(this.interval);
        this.startTimer = '';
        if (this.router.url === '/game-lobby') {
          this.router.navigateByUrl('/game');
        }
      }
    }, 1000);
  }

  getGameEvent(): Observable<any> {
    return this.socket.fromEvent('gameEvent');
  }
}
