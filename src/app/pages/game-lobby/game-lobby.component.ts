import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { SocketService } from 'src/app/shared/services/socket.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.css'],
})
export class GameLobbyComponent implements OnInit {
  chatInput = '';
time=5;
  constructor(public router: Router, private authService: AuthService, private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.sendEvent('join', this.authService.user);
    this.socketService.getRoom();
  }
  counter(){
    setTimeout(() => { 
      if (this.time > 0) {
        this.time--; 
        this.counter()
      }else{
        this.router.navigateByUrl('/game')
      }
    }, 1000);
  }

  submitChat() {
    this.socketService.sendEvent('chat', this.chatInput);
    this.chatInput = '';
  }
}
