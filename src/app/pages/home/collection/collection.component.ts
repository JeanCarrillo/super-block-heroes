import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  selectedCategory = 'heroes';
  constructor(
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
  }

  setSelectedCategory(str: string): void {
    this.selectedCategory = str;
  }

  logout = () => {
    this.authService.logout();
  };

}
