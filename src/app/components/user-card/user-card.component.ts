import { Component, OnInit } from '@angular/core';
import { DbService } from '../../db.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  user: {};

  constructor(private DbService: DbService) { }

  ngOnInit() {
    this.user = this.DbService.user;

    console.log(this.user);
  }

}
