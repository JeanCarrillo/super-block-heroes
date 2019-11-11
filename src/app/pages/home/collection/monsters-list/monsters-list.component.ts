import { Component } from '@angular/core';
import { DbService } from '../../../../shared/services/db.service';

@Component({
  selector: 'app-monsters-list',
  templateUrl: './monsters-list.component.html',
  styleUrls: ['./monsters-list.component.css'],
})
export class MonstersListComponent {
  monsters: any[] = [];
  selectedMonster = 0;

  constructor(private dbService: DbService) {}

  // async getMonsters() {
  //   // this.dbService.getMonsters().subscribe(monsters => {
  //   //   this.monsters = monsters;
  //   //   console.log(monsters);
  //   // });
  //   this.monsters = await this.dbService.getMonsters();
  //   console.log(this.monsters);
  // }

  setSelectedMonster(index: number): void {
    this.selectedMonster = index;
  }
}
