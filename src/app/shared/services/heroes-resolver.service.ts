import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero';

import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class HeroesResolverService implements Resolve<DbService> {
  constructor(private dbService: DbService) {}
  resolve(): Observable<any> {
    return this.dbService.getHeroes();
  }
}
