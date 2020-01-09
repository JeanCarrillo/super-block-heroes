import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/shared/services/socket.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DbService } from 'src/app/shared/services/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.css'],
})
export class GameLobbyComponent implements OnInit {
  chatInput = '';
  constructor(
    public router: Router,
    private authService: AuthService,
    private socketService: SocketService,
    private dbService: DbService
  ) {}

  ngOnInit(): void {
    this.socketService.sendEvent('join', this.authService.user);
    this.socketService.getRoom();
  }

  submitChat(): void {
    this.socketService.sendEvent('chat', this.chatInput);
    this.chatInput = '';
  }

  launchGame(): void {
    const rdmMonster = this.dbService.monsters[
      Math.floor(Math.random() * this.dbService.monsters.length)
    ];
    this.socketService.sendEvent('start', rdmMonster);
  }
}
