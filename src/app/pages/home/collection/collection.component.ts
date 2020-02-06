import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  selectedCategory = 'heroes';
  constructor(private authService: AuthService) {}

  ngOnInit() {
  }

  setSelectedCategory(str: string): void {
    this.selectedCategory = str;
  }
}
