import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../../db.service';

@Component({
  selector: 'app-monsters-list',
  templateUrl: './monsters-list.component.html',
  styleUrls: ['./monsters-list.component.css'],
})
export class MonstersListComponent implements OnInit {
  monsters: any[] = [];
  selectedMonster = 0;

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.getMonsters();
  }

  getMonsters(): void {
    this.dbService.getMonsters().subscribe(monsters => (this.monsters = monsters));
  }

  setSelectedMonster(index: number): void {
    this.selectedMonster = index;
  }
}
