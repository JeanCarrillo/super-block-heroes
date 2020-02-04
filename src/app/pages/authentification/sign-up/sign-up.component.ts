import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { ShowPasswordDirective } from '../show-password.directive';

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
  faEye = faEye;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // this.monster = this.authService.monsters[1];
  }

  signup = async () => {
    await this.authService.register(this.user);
  };
}
