import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/shared/services/db.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  constructor(private dbService: DbService, private authService: AuthService) {}

  ngOnInit() {
    this.dbService.getHighscores();
    console.log(this.authService.user);
  }
}
