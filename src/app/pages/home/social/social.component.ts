import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'],
})
export class SocialComponent implements OnInit {
  selectedCategory = 'friends';
  authService: any;
  constructor(
    public authservice: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.authservice.getMyUser();
  }

  setSelectedCategory(str: string): void {
    this.selectedCategory = str;
  }

  logout = () => {
    this.authService.logout();
  };

}
