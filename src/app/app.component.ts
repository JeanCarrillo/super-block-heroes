import { Component, OnInit } from '@angular/core';
import { DbService } from './shared/services/db.service';
import { Router } from '@angular/router';
import { SocketService } from './shared/services/socket.service';
import { AuthService } from './shared/services/auth.service';
import { forkJoin } from 'rxjs';

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
    // DAns ton resolver
    // return forkJoin(.., .., ..)
    // await this.authService.getMyUser();
    // await this.dbService.getMonsters();
    // await this.dbService.getHeroes();
    // await this.socketService.getRoom();

    // dans un guard
    
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
    if (token === null) {
      console.log('no token');
       this.router.navigate(['/sign-in']);
    }
    else {
      console.log('token', token);
      await this.router.navigate(['/home']);
    }
  }
}
