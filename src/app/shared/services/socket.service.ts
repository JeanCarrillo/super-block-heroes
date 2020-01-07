import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  room = {
    players: [],
    messages: [],
    game: {},
    started: false,
  };

  constructor(private socket: Socket) {}

  sendEvent(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  getMessage(): Observable<any> {
    return this.socket.fromEvent('message');
  }

  getRoom(): void {
    this.socket.fromEvent('room').subscribe((room: any) => {
      console.log({ room });
      this.room = room;
    });
  }
}
