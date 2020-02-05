import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';
// import { Monster } from 'src/app/shared/models/monster';
import { ShowPasswordDirective } from '../show-password.directive';
import { Router } from '@angular/router';
import { dev } from '../../../shared/constants/dev';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  user = {
    nickname: dev ? 'test' : '',
    email: '',
    password: dev ? 'test' : '',
  };
  faEye = faEye;
  showPasswordDirective = ShowPasswordDirective;

  constructor(private authService: AuthService, public router: Router) {}

  forgotPW = () => {
    window.alert('This feature will be enable soon!');
  };

  signin = async () => {
    await this.authService.login(this.user);
  };

  showPassword = () => {
    window.alert('show password');
  };
}
