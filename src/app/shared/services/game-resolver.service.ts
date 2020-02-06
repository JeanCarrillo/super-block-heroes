import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

import { AuthService } from './auth.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class GameResolverService implements Resolve<AuthService> {
  constructor(private authService: AuthService, private socketService: SocketService) {}
  resolve(): Observable<any> {
    console.log('GameResolver');
    return this.authService.getMyUser();
  }
}
