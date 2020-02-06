import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Monster } from '../models/monster';

import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class MonsterResolverService implements Resolve<DbService> {
  constructor(private dbService: DbService) {}
  resolve(): Observable<any> {
    console.log('MonsterResolver');
    return this.dbService.getMonsters();
  }
}
