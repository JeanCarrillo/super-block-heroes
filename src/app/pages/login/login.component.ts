import { Component } from '@angular/core';
import { DbService } from '../../shared/services/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  nickname: string;

  constructor(private dbService: DbService, private router: Router) {}

  submit = async () => {
    await this.dbService.postUser(this.nickname).subscribe(async res => {
      await this.dbService.setUser(res);
      this.router.navigate(['/home']);
    });
  };
}
