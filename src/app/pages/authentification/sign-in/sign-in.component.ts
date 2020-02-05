import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';
// import { Monster } from 'src/app/shared/models/monster';
import { ShowPasswordDirective } from '../show-password.directive';
import { Router } from '@angular/router';
import { DbService } from 'src/app/shared/services/db.service';
import { SocketService } from 'src/app/shared/services/socket.service';

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

  constructor(private authService: AuthService, public router: Router, private dbService: DbService, private socketService: SocketService) {}

  forgotPW = () => {
    window.alert('This feature will be enable soon!');
  };

  signin =  () => {
   this.authService.login(this.user)
   .then((res) => {
     this.errors = false;

     if (res && !this.errors) {

    this.authService.getMyUser();
    this.dbService.getMonsters();
    this.dbService.getHeroes();
    this.socketService.getRoom();  
      this.router.navigate(['/home']);
     }
   })
   .catch((err) => {
      this.errors = true;
   });
  };

  showPassword = () => {
    window.alert('show password');
  };
}
