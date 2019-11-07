import { Component } from '@angular/core';
import { DbService } from '../../db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  nickname: string;

  constructor(private dbService: DbService, private router: Router) {}

  submit = async () => {
    await this.dbService.postUser(this.nickname).subscribe(async res => {
      await this.dbService.setUser(res);
      this.router.navigate(['/accueil']);
    });
  };
}
