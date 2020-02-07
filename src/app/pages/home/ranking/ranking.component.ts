import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/shared/services/db.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent implements OnInit {
  constructor(
    public dbService: DbService,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.dbService.getHighscores();
    console.log(this.authService.user);
  }

  logout = () => {
    this.authService.logout();
  };

}
