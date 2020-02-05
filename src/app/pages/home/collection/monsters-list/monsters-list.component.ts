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

  constructor(public dbService: DbService) {}

  setSelectedMonster(index: number): void {
    this.selectedMonster = index;
  }
}
