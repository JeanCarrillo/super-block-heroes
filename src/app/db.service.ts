import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { monsters } from './data/monsters';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  monsters: any[];

  constructor() {
    this.monsters = monsters;
  }

  getMonsters(): Observable<any[]> {
    return of(this.monsters);
  }
}
