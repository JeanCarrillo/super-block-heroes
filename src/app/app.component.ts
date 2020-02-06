import { Component, OnInit } from '@angular/core';
import { DbService } from './shared/services/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public dbService: DbService, private router: Router) {}
  async ngOnInit() {
    // TODO: GUARDS
    const token = localStorage.getItem('token') || null;
    if (token === null) {
      this.router.navigate(['/sign-in']);
    } else {
      await this.router.navigate(['/home']);
    }
  }
}
