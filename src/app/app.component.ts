import { Component, OnInit } from '@angular/core';
import { DbService } from './shared/services/db.service';
import { Router } from '@angular/router';
import { SocketService } from './shared/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    public dbService: DbService,
    public socketService: SocketService,
    private router: Router
  ) {}
  async ngOnInit() {
    this.router.navigate(['/sign-in']);
    await this.dbService.getHeroes();
    await this.dbService.getMonsters();
    this.socketService.getRoom();
  }
}
