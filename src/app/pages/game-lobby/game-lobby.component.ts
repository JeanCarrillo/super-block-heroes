import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/shared/services/socket.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.css'],
})
export class GameLobbyComponent implements OnInit {
  constructor(private authService: AuthService, private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.sendEvent('join', this.authService.user);
    this.socketService.getRoom();
  }
}
