import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { monsters } from './data/monsters';
import { user } from './data/user';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  monsters: any[];
  user: any;

  constructor() {
    this.monsters = monsters;
    this.user = user;
  }

  getMonsters(): Observable<any[]> {
    return of(this.monsters);
  }
  getUser(): Observable<any> {
    return of(this.user);
  }
}
