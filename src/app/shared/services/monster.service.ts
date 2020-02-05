import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  ref: any = [];

  constructor() {}

  setRef(ref) {
    this.ref = ref;
  }
}
