import { Component, OnInit, Input } from '@angular/core';
import { DbService } from '../../shared/services/db.service';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// Property `icon` is required for `fa-icon`/`fa-duotone-icon` components.

// import { Monster } from 'src/app/shared/models/monster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // monster: Monster;
  user = {
    nickname: '',
    email: '',
    password: '',
  };
  // nickname: string;
  // email: string;
  capacityName = "King's Grace";
  timer = 1000;
  cooldown = 5000;
  faUser = faUser;
  constructor(private dbService: DbService, private router: Router) {}

  ngOnInit() {
    // this.monster = this.dbService.monsters[1];
  }

  submit = async () => {
    console.log(this.user);
    await this.dbService.postUser(this.user).subscribe(async res => {
      await this.dbService.setUser(res);
      this.router.navigate(['/home']);
    });
  };
}