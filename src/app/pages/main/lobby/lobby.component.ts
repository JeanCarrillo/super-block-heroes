import { Component, OnInit } from '@angular/core';
import { user } from '../../../data/user';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  user = {}

  constructor() { }

  ngOnInit() {
    this.user = user
  }

}
