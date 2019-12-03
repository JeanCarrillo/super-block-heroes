import { Component, OnInit } from '@angular/core';
import { DbService } from '../../shared/services/db.service';
import { Router } from '@angular/router';
// import { Monster } from 'src/app/shared/models/monster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // monster: Monster;
  nickname: string;
  capacityName = "King's Grace";
  timer = 1000;
  cooldown = 5000;

  constructor(private dbService: DbService, private router: Router) {}

  ngOnInit() {
    // this.monster = this.dbService.monsters[1];
  }

  submit = async () => {
    await this.dbService.postUser(this.nickname).subscribe(async res => {
      await this.dbService.setUser(res);
      this.router.navigate(['/home']);
    });
  };
}
