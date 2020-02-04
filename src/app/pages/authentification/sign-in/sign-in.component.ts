import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';
// import { Monster } from 'src/app/shared/models/monster';
import { ShowPasswordDirective } from '../show-password.directive';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  user = {
    nickname: '',
    email: '',
    password: '',
  };
  faEye = faEye;
  showPasswordDirective = ShowPasswordDirective;
  errors = false;

  constructor(private authService: AuthService, public router: Router) {}

  forgotPW = () => {
    window.alert('This feature will be enable soon!');
  };

  signin =  () => {
   this.authService.login(this.user)
   .then((res) => {
     this.errors = true;
     res && this.errors && this.router.navigate(['/home']);
   })
   .catch((err) => {
      this.errors = true;
   });
  };

  showPassword = () => {
    window.alert('show password');
  };
}
