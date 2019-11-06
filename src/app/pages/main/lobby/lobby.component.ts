import { Component } from '@angular/core';
import { DbService } from '../../../db.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
})
export class LobbyComponent {
  constructor(private dbService: DbService) {}
}
