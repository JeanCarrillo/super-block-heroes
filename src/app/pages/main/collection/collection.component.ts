import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  selectedCategory = 'heroes';
  constructor() {}

  ngOnInit() {}

  setSelectedCategory(str: string) {
    this.selectedCategory = str;
  }
}
