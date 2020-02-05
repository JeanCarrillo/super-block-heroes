import { Component, OnInit } from '@angular/core';
import { DbService } from './shared/services/db.service';
import { Router } from '@angular/router';
import { SocketService } from './shared/services/socket.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private dbService: DbService,
    private socketService: SocketService,
    private router: Router,
    private authService: AuthService
  ) {}
  async ngOnInit() {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

    if (token === null) {
        await this.router.navigate(['/sign-in']);
      }
      else {
        console.log('token', token);
        await this.authService.getMyUser();
        await this.dbService.getMonsters();
        await this.dbService.getHeroes();
        await this.socketService.getRoom();  
        await this.router.navigate(['/home']);
      }
  }
}
