import { Component, OnInit, Input } from '@angular/core';
import { DbService } from '../../../shared/services/db.service';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// Property `icon` is required for `fa-icon`/`fa-duotone-icon` components.

// import { Monster } from 'src/app/shared/models/monster';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  user = {
    nickname: '',
    email: '',
    password: '',
  };
  faUser = faUser;
  constructor(private dbService: DbService, private router: Router) {}

  ngOnInit() {
    // this.monster = this.dbService.monsters[1];
  }

  signup = async () => {
    await this.dbService.register(this.user);
  };
}
