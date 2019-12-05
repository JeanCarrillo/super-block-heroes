import { Component, OnInit } from '@angular/core';
import { DbService } from '../../shared/services/db.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// Property `icon` is required for `fa-icon`/`fa-duotone-icon` components.

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    nickname: '',
    email: '',
    password: '',
  };
  timer = 1000;
  cooldown = 5000;
  faUser = faUser;

  constructor(private dbService: DbService) {}

  ngOnInit() {}

  signup = async () => {
    await this.dbService.register(this.user);
  };

  signin = async () => {
    await this.dbService.login(this.user);
  };
}
