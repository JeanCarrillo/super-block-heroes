import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { ShowPasswordDirective } from '../show-password.directive';
import { DbService } from 'src/app/shared/services/db.service';
import { SocketService } from 'src/app/shared/services/socket.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  user = {
    nickname: '',
    email: '',
    password: '',
  };
  errors = false;
  faEye = faEye;
  error: boolean = false;
  constructor(
    public authService: AuthService,
    private router: Router,
    public dbService: DbService,
    public socketService: SocketService
  ) {}

  signup = () => {
    this.authService
      .register(this.user)
      .then(res => {
        this.signin();
      })
      .catch(err => {
        this.error = true;
      });
  };

  signin = () => {
    this.authService
      .login(this.user)
      .then(res => {
        this.errors = false;

        if (res && !this.errors) {
          this.authService.getMyUser();
          this.dbService.getMonsters();
          this.dbService.getHeroes();
          this.socketService.getRoom();
          this.router.navigate(['/home']);
        }
      })
      .catch(err => {
        this.errors = true;
      });
  };
}
