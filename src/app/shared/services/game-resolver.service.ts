import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable }  from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameResolverService implements Resolve<AuthService>{
constructor(private authService: AuthService) { }
  resolve(): Observable<any> {
    console.log('GameResolver');
    return this.authService.getMyUser();
  }
}
