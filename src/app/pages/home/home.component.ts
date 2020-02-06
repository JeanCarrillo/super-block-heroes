import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/shared/services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.sendEvent('mainMenu');
    this.socketService.getRoom();
  }
}
